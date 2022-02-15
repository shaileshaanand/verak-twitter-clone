# Twitter Clone API

A Twitter clone API written in `express` with mongoDB database.

## Documentation

Documentation can be found at `/api/v1/docs` on the server or at [ https://verak-twitter-clone-docs.netlify.app/ ](https://verak-twitter-clone-docs.netlify.app/)

## Libraries Used

| Library              | Purpose                                                                    |
| -------------------- | -------------------------------------------------------------------------- |
| bcryptjs             | To encrypt passwords                                                       |
| dotenv               | To store all Environment vars in `.env` file                               |
| express              | To serve the API (duh.)                                                    |
| express-async-errors | To be able to handle async function errors in the error handler middleware |
| http-status-codes    | Gives pretty names to status codes (Eg. 200 -> OK)                         |
| jsonwebtoken         | To issue JWTs                                                              |
| mongoose             | as ORM                                                                     |
| swagger-ui-express   | To server the Swagger UI Documentation at /docs                            |

## Running

- with Docker

  ```bash
  docker-compose run --rm app sh -c "npm install"
  docker-compose up
  ```

- Locally without docker

  1. Make `.env` from `.env.example`

     ```bash
     cp .env.example .env
     ```

  2. Edit `.env` with required details

  3. Install Dependencies
     ```bash
     npm install
     ```
  4. Run Server
     ```bash
     npm run dev
     ```
