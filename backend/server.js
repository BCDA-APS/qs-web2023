const express = require('express');
const cors = require("cors");
const devicesRouter = require("./routes/devices");
const historyRouter = require("./routes/history");
const { PORT } = require("./config")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/devices", devicesRouter);

app.use("/history", historyRouter);

app.use("/", (req,res,next) => {
  res.send({"ping":"pong"})
})

/** Handle 404 errors -- this matches everything */
/*app.use((req, res, next) => {
  return next(new NotFoundError())
})*/

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})