# ResQNet Backend Migration

The ResQNet platform is now running on a full-stack architecture, utilizing a Node.js Express backend and a vanilla JavaScript frontend wrapper. 

## Project Structure
- `index.html`: The single-page frontend. Now heavily lightened by removing `localStorage` mock databases and instead using `axios` to query the backend and `Socket.io` for live updates.
- `backend/server.js`: The Express & Socket.io entry point.
- `backend/models/Schemas.js`: All Mongoose MongoDB schemas (User, SOSAlert, MissingReport, Volunteer, Donation).
- `backend/routes/api.js`: The central Express API routing controller.

## How to Run

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- A local MongoDB server running on port `27017` (or you can edit `backend/.env` with your own MongoDB Atlas URI).

### 2. Start the Backend
```bash
cd backend
npm install
npm run dev
# Server will start on http://localhost:5000
```

### 3. Open the Frontend
Simply open `index.html` in your web browser, or use a tool like VS Code Live Server.

## Real-time Data
Logging into the application with an `admin` user account will open the Command Center War Room. The dashboard connects to the backend via WebSockets (`Socket.io`). Whenever a civilian triggers an SOS, reports a missing person, or volunteers, the dashboard will immediately auto-refresh without user interaction.
