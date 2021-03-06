# A boilerplate project for writing applications using Koa2 and React

## What?
I became disillusioned with frameworks for Node.js, so here is a comprehensive MVC boilerplate project with most of the modern application components implemented in a consistent code style without any frameworks (well, on backend anyway). Note that this stack assumes you have intermediate to advanced understanding of Node.js. It is not for beginners.

### Stack supports
 - Koa2 (i.e. async await - you need Node.js 7.6, 8+ highly recommended for debugging with inspector protocole)
 - React for frontend using Webpack
  - Modules
  - Async functions
 - Gulp asset pipeline (disabled by default - may conflict with some of the ports webpack uses)
 - MongoDB
 - MariaDB/MySQL
 - Migrations
 - SASS css preprocessor (uses .scss syntax by default)
 - Basic security (CSRF)
 - Both ejs and pug view engines

## How?
Get started with
```
git clone https://github.com/megakoresh/koa2-react.git yourprojectname
cd yourprojectname
rm -rf .git
git init .
```
You now have the code base for a new project. The base classes are documented as to what they do. Project is meant to allow easy extensibility without breaking code style. You might want to
  - Inject ORM (e.g. Sequelize or Mongoose) - wrap it with Database class methods, or Model class methods, then extend from it.
  - Security - place it in middleware package, then use where needed
  - Policies - Add them as static methods to Authenticator, then use them when setting routes in controllers
  - Foundation/Bootstrap - see comments in webpack config
  - Migrations - `npm install -g db-migrate` and `db-migrate create:sql my-new-migration -e test-maria`, see https://db-migrate.readthedocs.io/en/latest/ for details
  - Global configuration - place it to common package where appropriate, then require. For database-related things, place to database package
  - File uploads - change the body parser to something that supports files, or add a separate file handling middleware like multer

I highly recommend you use Visual Studio Code for developing Node.js applications and this one in particular. It already includes launch configurations for both frontend and backend debugging, and in general VSCode is nowadays the best Node.js development IDE. You will save a lot of time with it.

## Why?
I have used Sails.js for a long time, and in every single project, I spent more time fighting Sails and specifically - Waterline than building the actual application. I have used Meteor several times, and in every project when I wanted to change small details that made a lot of difference, I found it was impossible because "That's not how Meteor works". Same thing with Hapi. In the end, when you are building a more or less unique project (i.e. not yet another blog or web store or another kind of template site), you'll run into the framework's limitations sooner rather than later. Yes, building something without framework makes it more verbose, but with modern Javascript techniques and consistent code conventions that can be an avantage as well.

This project aims to give you a quick start by eliminating the tedium of setting up an application, as well as providing you with a reasonably flexible, yet consistent and robust coding style and architecture with proper error handling and an example of every boilerplate feature both in implementation and usage. It is *not* a generic solution that will cover every possible use case. It is a solution that will help cover *your* use case.

## TODO
  - Some kind of visual diagram for how the project is organized when I have time.
  - Some actual boilerplate functionality for React/Redux

## License
MIT
