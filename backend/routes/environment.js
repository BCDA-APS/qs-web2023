const express = require("express")
const router = express.Router()
const axios = require('axios');
const { API_URL } = require("../config");

//Routes to get information regarding environment

router.post("/open", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/environment/open`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ environmentOpen: val })
    } catch(error) {
        next(error)
    }
})

router.post("/close", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/environment/close`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ environmentClose: val })
    } catch(error) {
        next(error)
    }
})

router.post("/destroy", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/environment/destroy`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ environmentDestroy: val })
    } catch(error) {
        next(error)
    }
})

module.exports = router;