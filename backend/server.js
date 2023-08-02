const express = require('express');
const cors = require("cors");
const devicesRouter = require("./routes/devices");
const historyRouter = require("./routes/history");
const plansRouter = require("./routes/plans");
const statusRouter = require("./routes/status");
const queueRouter = require("./routes/queue");
const consoleRouter = require("./routes/console");
const environmentRouter = require("./routes/environment");
const { PORT } = require("./config")

const app = express();

app.use(cors());

app.use(express.json());

app.use("/devices", devicesRouter);

app.use("/history", historyRouter);

app.use("/plans", plansRouter);

app.use("/status", statusRouter);

app.use("/queue", queueRouter);

app.use("/console", consoleRouter);

app.use("/environment", environmentRouter);

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})