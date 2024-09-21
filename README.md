# Pingpong Elo App

Backend repo only - for frontend repo see https://github.com/hesterbergnl/pingpong_elo

App uses reactjs, nodejs, expressjs, and mongodb

---

## Installation Instructions

Clone the backend end (this) repo and frontend repo (linked above)

Install node.js and node package manager (npm)

In the frontend repo folder, run the following command to install all dependencies

`npm install`

Run the same command in the backend repo folder to install all dependencies

In the backend folder, create a .env file to store secrets. Include the following lines

    PORT=####
    MONGODB_URL="mongodbconnectionstring"
    SECRET="A secret string"
    DEFAULT_IMG="defaultimagefile.jpeg"

In the above .env file, PORT is the port number to run the repository. MONGODB_URL is the mongodb connection string (can be found in mongodb atlas or mongodb compass for desktop). SECRET is a secret string that is used for json web token authentication.

To run the project in dev mode, enter the following command in the root directory of both the frontend folder and backend folders.

`npm run dev`

Enjoy!
