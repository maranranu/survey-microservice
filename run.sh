#!/bin/bash

#copy config files
cp config/database.js.example config/database.js

cp .env.example .env
#update path in env file

npm install
node_modules/.bin/sequelize db:migrate

#Unit test run
npm run test:unit

#start nodejs server
npm run dev
