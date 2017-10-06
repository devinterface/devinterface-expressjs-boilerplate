# devinterface-expressjs-boilerplate

A DevInterface Express.js boilerplate app

## Install It
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
Go to http://localhost:1080/, Send mail through smtp://localhost:1025)

#### Run in *production* mode:

```
npm run compile
npm run start
```

#### Run tests:

```
npm run test
```
   
