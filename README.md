# GhostSwap Backend

This is the backend service for GhostSwap, handling API endpoints, database operations, and business logic.

## Features
- Tracks market highlights, orders, and chart data
- RESTful APIs for data access and updates
- Secure database connection using MongoDB

## Installation
1. Clone the repository.
2. Create a `.env` file with your MongoDB URI and desired port.
3. Run `npm install` to install dependencies.
4. Start the server with `npm start`.

## Deployment
This backend is ready for deployment on services like Heroku.

## API Endpoints
- **Highlights**
  - `GET /api/highlights`
  - `PUT /api/highlights`

- **Charts**
  - `GET /api/charts/:ticker`
  - `POST /api/charts/:ticker`

- **Orders**
  - `POST /api/orders`
  - `GET /api/orders/:ticker`