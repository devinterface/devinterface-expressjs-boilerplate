# devinterface-expressjs-boilerplate

A DevInterface Express.js boilerplate app.

This boilerplate sets up a starter application with built in authorization, authentication (email, Facebook, password forget) and internationalization. 

`master` branch is based on [`Bookshelf`](http://bookshelfjs.org/) ORM. Please check out the `sequelize` branch to see the same boilerplate with [`Sequelize`](http://docs.sequelizejs.com/) ORM

## Install It
Setup a PostgreSQL 9.6 database with following extensions:
* pgcrypto
* uuid-ossp
* postgis

```
cp .env.example .env
npm install
npm run db:install
gem install mailcatcher
```

## Run It
#### Run in *development* mode:

```
npm run dev (or npm run debug)
```
and in an other window
```
mailcatcher
```
Go to http://localhost:1080/; Send mail through smtp://localhost:1025)

#### Run in *production* mode:

```
npm run compile
npm run start
```

#### Run tests:

```
npm run test
```

## Linter:

Linting is performed through [`standardjs`](https://standardjs.com/). Just open a console and type
```
npm run linter
```

## Availables routes:
```
http://localhost:3000/:lang (GET)
http://localhost:3000/:lang/login (GET,POST)
http://localhost:3000/:lang/logout (GET)
http://localhost:3000/:lang/signup (GET,POST)
http://localhost:3000/:lang/forgot (GET,POST)
http://localhost:3000/:lang/reset/:token (GET,POST)
http://localhost:3000/:lang/users/ (GET)
http://localhost:3000/:lang/users/:id (GET)
http://localhost:3000/auth/facebook (POST)
http://localhost:3000/auth/facebook/unlink (GET))
http://localhost:3000/auth/facebook/callback (GET)
http://localhost:3000/api/v1/examples (GET, POST)ì
http://localhost:3000/api/v1/examples/:id (GET)
http://localhost:3000/api/v1/users (GET)
http://localhost:3000/api/v1/users/:id (GET)

```

## Notable modules:
* authentication via [`Passport`](http://passportjs.org/)
* authorization via [`CanCan`](https://github.com/vadimdemedes/cancan)
* mail with [`nodemailer`](https://nodemailer.com/about/)
* i18n via [`i18n-node`](https://github.com/mashpie/i18n-node)
* logging via [`Pino`](https://github.com/pinojs/pino)
* ORM via [`Sequelize.js`](http://docs.sequelizejs.com/)
* flash messages via [`express-flash-2`](https://github.com/jack2gs/express-flash-2)
* input validation via [`express-validator`](https://github.com/ctavan/express-validator)
* templating via [`Pug`](https://github.com/pugjs)
* stylesheets via [`Sass`](https://github.com/sass/node-sass)
* environment variables via [`dotenv`](https://github.com/motdotla/dotenv)

## Testing:
The boilerplate has a minimal testing scenario but it is really untested :-(
   
