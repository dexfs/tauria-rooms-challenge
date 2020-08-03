# Video Rooms Challenge

## ❯ Table of contents

- [Introduction](#-introduction)
- [Requirements](#-requirements)
- [Libraries](#-libraries)
- [Installation](#-installation)
- [Enviroment file](#-environment-file)
- [Migrations and Seeders](#-migrations-and-seeders)
- [Running the app](#-running-the-app)
- [Tests](#-tests)

- [Routes and Payloads](#-routes-and-payloads)

## ❯ Introduction

This project is for Video Server Challenge
It's an API for handle users and video rooms.

## ❯ Requirements

- [Node.js](https://nodejs.org/en/)
- npm
- [PostgresSQL](https://www.postgresql.org/download/)
- [Docker(optional)](https://docs.docker.com/get-docker/)

## ❯ Libraries
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM Seeding](https://github.com/w3tecch/typeorm-seeding)
- [Jest](https://expressjs.com/)
- [Jest Extended](https://github.com/jest-community/jest-extended)
- [Eslint](https://eslint.org/)
-

## ❯ Installation

```bash
$ yarn
```

Database with docker

```
$ docker-compose up -d
```
> It will create 2 containers with app database and test database.

## ❯ Enviroment file

create .env file
```bash
$ cp .env.example .env.dev
```
> the .env.example is with database info to run the project with docker.


## ❯ Migrations and Seeders

```bash
# migration
$ yarn typeorm -c development|test migration:run
```

```bash
# seed
$ yarn seed:run -c development|test -s CreateRoomsAndUsers
```
> It will create users and rooms data

## ❯ Running the app

```bash
# development
$ yarn dev:server
```

## ❯ Tests

```bash
# creating .env.test file
$ cp .env.test.example .env.test

# running tests
$ yarn test
```

## ❯ Routes and Payloads

### For Authenticated routes you need pass a token

```json
{
  "Authorization": "Bearer <token>",
}
```


## Register

```
POST - /users/register
```

**Payload**

```json
{
	"username": "username",
	"password": "12345678",
	"mobileToken": "token"
}
```

## Authentication

```
POST - /authenticate
```

**Payload**

```json
{
	"username": "username",
	"password": "12345678",
}
```

## Users
### Get users (no auth required): returns a list of all users

```
GET - /users
```
### Get users (no auth required): return the user with matching username

```
GET - /users/:username
```

### Get the rooms that a user is in: given a username, returns a list of rooms
that the user is in.

```
GET - /users/:username/rooms
```


### Update users (must be signed in as the user): updates password and/or mobile_token of the user

```
PUT - /users
```
**Payload**

```json
{
	"currentPassword": "12345678",
	"newPassword": "123456",
	"mobileToken": "mobile_token"
}
```

### Get users (no auth required): return the user with matching username

```
GET - /users/:username
```

### Delete User (must be signed in as the user): deletes the user

```
DELETE - /users
```

## Rooms

### Create a room (signed in as a user): creates a room hosted by the current user,with an optional capacity limit. Default is 5

```
POST - /rooms
```

**Payload**

```json
{
	"name": "ROOM_NAME",
	"capacityLimit": 12
}
```

### Change host (must be signin as the host): changes the host of the user from the current user to another user

```
PUT - /rooms/change-room-host
```

**Payload**

```json
{
	"newHost": "uuid",
	"roomId": "uuid"
}
```

### Join/leave (signed in as a user): joins/leaves the room as the current user

```
POST - /rooms/:roomId/join
```
```
POST - /rooms/:roomId/leave
```

### Get info (no auth): given a room guid, gets information about a room
```
GET - /rooms/:roomId/info
```
