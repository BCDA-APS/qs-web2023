# qs-web2023

Using ReactJS, develop a web client for the bluesky queueserver.

## Goals

- minimum: implement features in (PyQt) queue-monitor
- ideal: demo with BDP project
- stretch: data visualization

## Web Links

- https://github.com/bluesky/bluesky-webclient
- https://github.com/bluesky/bluesky-queueserver
- https://blueskyproject.io/bluesky-queueserver/introduction_for_users.html
- https://github.com/bluesky/bluesky-httpserver

## How to run this code?
- Git clone the repository
- Make sure that nodejs and npm are installed to your computer
- Start a terminal and navigate to the folder backend and run the command `npm install` to install all of the packages for the backend
- This web application uses .env files, so create a .env file and add the variable **PORT** which defines the port the backend should be running on, you can use **PORT** 3001
- Define another variable **API_URL** which is the url for the api that we started elsewhere using uvicorn
- To start the backend server run the command `npm start`
- The backend of the web application should start running on [http://localhost:3001](http://localhost:3001)
- Start a new terminal, navigate to the folder frontend and run the command npm install to install all of the packages for the frontend
- Create a .env file in the root directory of frontend folder, in the .env file, create the variable **BACKEND_URL** which should define the url of the backend, for local development it would be [http://localhost:3001](http://localhost:3001)
- To start the web application run the command `npm start`
- The frontend of the web application should start running on [http://localhost:3000](http://localhost:3000)
