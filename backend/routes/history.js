const express = require("express")
const router = express.Router()
const axios = require('axios');
const { API_URL } = require("../config");

//Routes to get information regarding history

router.get("/", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get(`${API_URL}/api/history/get`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ history: val })
    } catch(error) {
        next(error)
    }
})

router.post("/clear", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/history/clear`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ historyClear: val })
    } catch(error) {
        next(error)
    }
})
module.exports = router;