// Import the enviroment variables
require("dotenv").config({path: "variables.env"});
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// Handle Cookies (JWT)


// Populate the current user


server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, deets => {
  console.log(`Server is now running on ${deets.port}`)
});