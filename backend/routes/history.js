const express = require("express")
const router = express.Router()
const axios = require('axios');

router.get("/", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get("http://otz.xray.aps.anl.gov:60610/api/history/get");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ history: val })
    } catch(error) {
        next(error)
    }
})

router.post("/clear", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/history/clear");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ history: val })
    } catch(error) {
        next(error)
    }
})
module.exports = router;