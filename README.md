# reactode
A productivity app to manage books

# Link to lessons

Please refer to [lessons](./lessons/chapter1.md) to start the curriculum.

## Installation and Running

- `/server` folder contains a mock server written using `json-server`. It reads data from a json file and provides APIs to interact with it.
- `/client` folder contains the project files related to the course.
- `yarn` will install project dependencies for your server.
- `cd client && yarn` will install your project dependencies for client application.
- `yarn prestart:api` will create a `db.json` file from which the data is read from. This is a temporary DB.
- `yarn start:api` will start your server on port 3001.
- `yarn start` will start your client app on port 3000.

Please follow through from [chapter1.md](./lessons/chapter1.md) to understand better on how to build a react application from scratch.