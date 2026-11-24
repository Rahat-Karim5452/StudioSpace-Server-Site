# StudioSpace Server

The server for StudioSpace, built with Express and MongoDB.

Protected routes read the token from the `Authorization: Bearer <token>` header. The token is
created by BetterAuth in the client. The server checks it with `jose`, using the public keys at
`CLIENT_URL/api/auth/jwks`. A request without a valid token gets `401 Unauthorized!`.

## Local setup

```bash
npm install
```

Create a `.env` file:

```bash
MONGODB_URI=<your MongoDB connection string>
CLIENT_URL=http://localhost:3000
```

Add the demo studios once, then start the server:

```bash
npm run seed
npm run dev
```

The server runs at http://localhost:8000

## Routes

| Method | Route | Who can use it |
| --- | --- | --- |
| GET | `/studios?search=&category=&sort=` | Everyone |
| GET | `/featured-studios` | Everyone (6 studios) |
| GET | `/studio/:id` | Everyone |
| POST | `/add-studio` | Logged in user |
| GET | `/my-studios/:email` | Logged in user, own email only |
| PATCH | `/studio/:id` | The host of the studio |
| DELETE | `/studio/:id` | The host of the studio |
| POST | `/booking` | Logged in user. 409 if the time overlaps a confirmed booking |
| GET | `/my-bookings/:email` | Logged in user, own email only |
| PATCH | `/my-bookings/:id/cancel` | The creator, pending bookings only |
| GET | `/host-bookings/:email` | Logged in user, own email only |
| PATCH | `/booking/:id/status` | The host of the studio |

## Deploy

The project has a `vercel.json` file, so it can be deployed on Vercel. Add `MONGODB_URI` and
`CLIENT_URL` in the Vercel project settings. `CLIENT_URL` is the live link of the client.
