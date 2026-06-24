# Amazon Clone

A simple Amazon-style clone built with a React + Vite frontend and an Express + MongoDB backend.

## Project structure

- `client/` - React frontend application
- `server/` - Node.js backend with Express, MongoDB, and authentication support
- `server/config/db.js` - MongoDB connection setup
- `server/server.js` - Express server entry point

## Setup

1. Install dependencies for the frontend:

```bash
cd client
npm install
```

2. Install dependencies for the backend:

```bash
cd ../server
npm install
```

3. Create a `.env` file in `server/` with these variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Running the app

### Start the backend

```bash
cd server
node server.js
```

### Start the frontend

```bash
cd client
npm run dev
```

Then open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Notes

- The backend uses `server/config/db.js` to connect to MongoDB.
- The frontend is served by Vite from the `client/` folder.
- If you want to change ports, update the `PORT` value in `server/.env`.

## Recommended workflow

- Run backend and frontend in separate terminals.
- Make sure MongoDB is running and `MONGO_URI` is valid.
- Use the browser to test routes and frontend functionality.

## Optional improvements

- Add start scripts to `server/package.json` for convenience, such as `"start": "node server.js"`.
- Add proper authentication, product pages, and cart state management in the frontend.
- Add deployment instructions once the project is production-ready.
