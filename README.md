# Taroko Contacts Server

Sample servers allowing for basic CRUD operations on a small json database of contacts

Public URL: https://taroko-contacts-server.herokuapp.com

Go to https://taroko-contacts-server.herokuapp.com/api-docs for Swagger docs and test the endpoints

There is a secret admin endpoint which is not documented on purpose:
```
POST /api/admin
```

This endpoints replace the current data into the DB with the original seed. It becomes handy when interviewing new candidates as we can easily give a pristine sample set.

## Local Development

Simply clone the repo and run

```
npm install
npm run dev
```

To start the server in development mode at http://localhost:3000.


