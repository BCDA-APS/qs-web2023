const express = require("express")
const router = express.Router()
const axios = require('axios');

router.get("/", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get("http://otz.xray.aps.anl.gov:60610/api/console_output");
        if (value.status === 200) {
            val = value.data;
        }
        //console.log("value: ", value);
        return res.status(200).json({ console: val })
    } catch(error) {
        next(error)
    }
});

router.get("/uid", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get("http://otz.xray.aps.anl.gov:60610/api/console_output/uid");
        if (value.status === 200) {
            val = value.data;
        }
        //console.log("value: ", value);
        return res.status(200).json({ consoleUid: val })
    } catch(error) {
        next(error)
    }
});

module.exports = router;