/* eslint-disable camelcase */
import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import argon2 from 'argon2';
import ClientError from './lib/client-error.js';
import jwt from 'jsonwebtoken';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("email", "password")
        values ($1, $2)
        returning "userId", "email"
    `;
    const params = [email, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { email, password: Password } = req.body;
    if (!email || !Password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "password"
        from "users"
        where "email" = $1
    `;
    const params = [email];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, password } = user;
    const isMatching = await argon2.verify(password, Password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, email };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.post('/api/saved', async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const {
      id,
      image_url,
      name,
      rating,
      review_count,
      location,
      price = '$',
      categories,
      display_phone,
      url,
    } = req.body.restaurant;
    if (
      !image_url ||
      !name ||
      !rating ||
      !review_count ||
      !location ||
      !price ||
      !categories ||
      !display_phone ||
      !url ||
      !userId
    ) {
      throw new ClientError(400, 'missing fields');
    }
    const sql = `
      insert into "entries" ("yelpId", "photoUrl", "title", "rating", "reviews", "city", "price", "categories", "address", "phone", "yelpUrl", "userId")
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        returning "yelpId", "photoUrl", "title", "rating", "reviews", "city", "price", "categories", "address", "phone", "yelpUrl", "userId"
    `;
    const params = [
      id,
      image_url,
      name,
      rating,
      review_count,
      location.city,
      price,
      JSON.stringify(
        categories.map((category) => category.title).join(', ')
      ).replace(/"([^"]+)":/g, '$1:'),
      JSON.stringify(location.display_address.join(' ')).replace(/"/g, ''),
      display_phone,
      url,
      userId,
    ];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

app.get('/api/saved/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const sql = `
    select *
      from "entries"
      where "userId" = $1
  `;

  const params = [userId];
  const result = await db.query(sql, params);
  const entries = result.rows;
  res.status(201).json(entries);
});

app.get('/api/saved/details/:restaurantId', async (req, res, next) => {
  const restaurantId = req.params.restaurantId;
  const userId = req.query.userId;

  const sql = `
    select *
      from "entries"
      where "userId" = $1 and "yelpId" = $2
  `;
  const params = [userId, restaurantId];
  const result = await db.query(sql, params);
  const [entry] = result.rows;
  res.status(201).json(entry);
});

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
