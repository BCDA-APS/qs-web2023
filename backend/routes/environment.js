const express = require("express")
const router = express.Router()
const axios = require('axios');

router.post("/open", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/environment/open");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ environment: val })
    } catch(error) {
        next(error)
    }
})

router.post("/close", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/environment/close");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ environment: val })
    } catch(error) {
        next(error)
    }
})

router.post("/destroy", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/environment/destroy");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ environment: val })
    } catch(error) {
        next(error)
    }
})

module.exports = router;