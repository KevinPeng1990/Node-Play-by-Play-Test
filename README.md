# Node-Play-by-Play-Test

## Overview
This is a simple example of Node.js app from Pluralsight course: Play by Play: Building a Node Web API with Sam Artioli and John Papa.

## Requirement
* [Node.js](https://nodejs.org/) for server.
* [MongoDB](https://www.mongodb.com/) for DB.
* [Redis](http://redis.io/) for caching.

## Installation
1. Open a command prompt in the project's root folder.
2. Type: `npm install`.

## Tests
1. Start MongoDB.

2. Start Redis.

3. Start all servers, using following commands:

  * `node pig_server.js`
  * `node duck_server.js`
  * `node pet_server.js`

4. Using [Forever](https://github.com/foreverjs/forever) to start all 3 servers in 1 command prompt is recommended.

5. You can use [nodemon](https://github.com/remy/nodemon) to start node server for development.