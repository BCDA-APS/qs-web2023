const express = require("express")
const router = express.Router()
const axios = require('axios');
const { API_URL } = require("../config");

//Routes to get information regarding status

router.get("/", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get(`${API_URL}/api/status`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ status: val })
    } catch(error) {
        next(error)
    }
})

module.exports = router;