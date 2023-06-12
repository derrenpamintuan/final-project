-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

  insert into "users"
    ("email", "password")
    values
      ('dummyData', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

  insert into "entries"
  ("photoUrl", "title", "rating", "reviews", "city", "price", "categories", "address", "phone", "yelpUrl", "userId")
    values
      ('https://s3-media1.fl.yelpcdn.com/bphoto/7Y7DBXEwIg3xW2ZTNs0R4g/o.jpg', 'Pizza Hut', '4.5', '365', 'Lakewood', '$$$', 'Pizza Chicken Wings Fastfood', '23301 Main St Carson, CA 90745', '(310) 549-5000', 'https://www.yelp.com/biz/pizza-hut-carson-2?adjust_creative=JRx_Q5nhRD17oNarKi3RvQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=JRx_Q5nhRD17oNarKi3RvQ', '1')
