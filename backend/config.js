require("dotenv").config()
require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

console.log("PORT:".blue, PORT);

module.exports = {
    PORT,
  }