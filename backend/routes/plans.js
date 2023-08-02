const express = require("express")
const router = express.Router()
const axios = require('axios');
const { API_URL } = require("../config");

//Routes to get information regarding plans

router.get("/", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get(`${API_URL}/api/plans/allowed`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ plans: val })
    } catch(error) {
        next(error)
    }
})

router.post("/halt", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/re/halt`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ reHalt: val })
    } catch(error) {
        next(error)
    }
})

router.post("/abort", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/re/abort`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ reAbort: val })
    } catch(error) {
        next(error)
    }
})

router.post("/stop", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/re/stop`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ reStop: val })
    } catch(error) {
        next(error)
    }
})

router.post("/resume", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/re/resume`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ reResume: val })
    } catch(error) {
        next(error)
    }
})

router.post("/pause", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/re/pause`, req.body);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ re: val })
    } catch(error) {
        next(error)
    }
})

router.post("/stop/manager", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/manager/stop`, {option: 'safe_on'});
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ reStopManager: val })
    } catch(error) {
        next(error)
    }
})
module.exports = router;