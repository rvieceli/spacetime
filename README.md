# Spacetime fullstack

## Backend

Using NestJS (Rest) and Prisma, with S3rver to mock AWS S3 and GitHub social authentication

To start the project, first install the dependencies

```bash
npm install
```

Then configure the `.env` using [.env.example](./server/.env.example)

For the Github social authentication, first you must create a new [Github app](https://github.com/settings/apps) with the following callback URLs

1. `http://localhost:3000/api/auth/callback` for web
1. `exp://<your ip not localhost>:19000` for mobile

> For the **Github** App is preferred because it supports multiples callback URLs

Then set the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables.

> ATTENTION: AWS_ENDPOINT_URL must be your IP Address not `localhost`, so you can test the mobile app using your own device.

Now, run the following command to create the SQlite file and run the migrates:

```bash
npx prisma migrate dev
```

and finally run server and S3rver to mock AWS s3 locally:

```bash
npm run dev
```

You can use `npm run start:dev` to start on the server and `npm run s3-local` to run S3rver.

---

## Web

It's a NextJS app router application with tailwind.

> IMPORTANT: calls done from the client (nor SSR) calls `/api/proxy/**` and it proxies the request to the backend attaching the Bearer token, stored in the a `HttpOnly` cookie.

To start the project, first install the dependencies:

```bash
npm install
```

Then configure the `.env.local` using [.env.local.example](./web/.env.local.example)

> ATTENTION: BACKEND_URL must be your IP Address not `localhost`.

Finally, run the following command to start the project:

```bash
npm run dev
```

Then access [http://localhost:3000](http://localhost:3000) to access the web application.

---

### Mobile

React Native app using Expo routes, React-query, and Nativewind.

To start the project, first install the dependencies:

```bash
npm install
```

Then configure the `.env` using [.env.example](./mobile/.env.example)

> ATTENTION: BACKEND_URL must be your IP Address not `localhost`.

Finally, run the following command to start the project:

```bash
npm run start
```

And use Expo app to run the app in the simulator or your device.
