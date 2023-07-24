require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const API_URL = process.env.API_URL? process.env.API_URL : 'http://otz.xray.aps.anl.gov:60610';
console.log("PORT:".blue, PORT);
console.log("API_URL:".green, API_URL);

module.exports = {
    PORT,
    API_URL
}
