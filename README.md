# Fine-Dine

A fullstack web application for food enthusiasts who want to find new restaurants.

## Why I built this

As a food enthusiast myself, I wanted to build an application that helps people decide on trying something not only new, but nearby and convenient.

## Technologies Used

- React.js
- PostgreSQL
- JavaScript (ES5/ES6)
- CSS3
- HTML5
- REST API
- AWS
- Visual Studio Code

## Live Demo

Try the application live at [final-project-dev22222.us-west-1.elasticbeanstalk.com](final-project-dev22222.us-west-1.elasticbeanstalk.com)

## Features

- Users can create an account to sign in
- Users can search for restaurants in surrounding area
- Users can view restaurant details
- Users can add to a saved list
- Users can view a saved list
- Users can remove from a saved list (In progress)

## Preview

![Feature 2](client/public/feature2.gif)
![Feature 3](client/public/feature3.gif)

### Stretch Features

- Users can rate a restaurant
- Users can leave a review
- Users can view photos of the restaurant

### System Requirements

- Node 18 or higher
- Postgresql 14 or higher
- React 18 or higher

### Getting Started

1. Clone the repository.

   ```shell
   git clone https://github.com/derrenpamintuan/final-project.git
   cd final-project
   ```

1. Install all dependencies with NPM.

   ```shell
   npm install
   ```

1. Start up PostgreSQL.

   ```shell
   sudo service postgresql start
   ```

1. Import the example database to PostgreSQL.

   ```shell
   npm run db:import
   ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

   ```shell
   npm run dev
   ```
