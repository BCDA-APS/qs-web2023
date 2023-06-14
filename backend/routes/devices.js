const express = require("express")
const router = express.Router()
const axios = require('axios');

router.get("/allowed", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get("http://otz.xray.aps.anl.gov:60610/api/devices/allowed");
        console.log("value: ", value);
        if (value.status === 200) {
            val = value.data.devices_allowed;
        }
        return res.status(200).json({ devices: val })
    } catch(error) {
        next(error)
    }
})

module.exports = router;