const express = require("express")
const router = express.Router()
const axios = require('axios');

router.get("/", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get("http://otz.xray.aps.anl.gov:60610/api/queue/get");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ queue: val })
    } catch(error) {
        next(error)
    }
})

router.post("/clear", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/clear");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ queue: val })
    } catch(error) {
        next(error)
    }
})

router.post("/delete", async (req, res, next) => {
    try {
        console.log("req: ", req.body);
        
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/item/remove", req.body);
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ queue: 'sure' })
    } catch(error) {
        next(error)
    }
})

router.post("/move", async (req, res, next) => {
    try {
        console.log("req: ", req.body);
        
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/item/move", req.body);
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ queue: 'sure' })
    } catch(error) {
        next(error)
    }
})

router.post("/start", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/start");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ queue: val })
    } catch(error) {
        next(error)
    }
})

router.post("/stop", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/stop");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ queue: val })
    } catch(error) {
        next(error)
    }
})

router.post("/cancel", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/stop/cancel");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ queue: val })
    } catch(error) {
        next(error)
    }
})

module.exports = router;