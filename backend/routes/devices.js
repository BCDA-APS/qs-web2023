const express = require("express")
const router = express.Router()
const axios = require('axios');
const { API_URL } = require("../config");

//Routes to get information regarding devices

router.get("/allowed", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get(`${API_URL}/api/devices/allowed`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ devices: val })
    } catch(error) {
        next(error)
    }
})

module.exports = router;