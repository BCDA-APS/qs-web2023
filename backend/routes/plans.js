const express = require("express")
const router = express.Router()
const axios = require('axios');

router.get("/", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get("http://otz.xray.aps.anl.gov:60610/api/plans/allowed");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ plans: val })
    } catch(error) {
        next(error)
    }
})

/*
http POST http://localhost:60610/api/re/pause option="deferred"
http POST http://localhost:60610/api/re/pause option="immediate"
http POST http://localhost:60610/api/re/resume
http POST http://localhost:60610/api/re/stop
http POST http://localhost:60610/api/re/abort
http POST http://localhost:60610/api/re_halt
*/

router.post("/halt", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/re/halt");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ re: val })
    } catch(error) {
        next(error)
    }
})

router.post("/abort", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/re/abort");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ re: val })
    } catch(error) {
        next(error)
    }
})

router.post("/stop", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/re/stop");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ re: val })
    } catch(error) {
        next(error)
    }
})

router.post("/resume", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/re/resume");
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ re: val })
    } catch(error) {
        next(error)
    }
})

router.post("/pause", async (req, res, next) => {
    try {
        let val = null;
        console.log("Re:", req.body);
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/re/pause", req.body);
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ re: val })
    } catch(error) {
        next(error)
    }
})

router.post("/stop/manager", async (req, res, next) => {
    try {
        let val = null;
        //console.log("Re:", req.body);
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/manager/stop", {option: 'safe_on'});
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ re: val })
    } catch(error) {
        next(error)
    }
})
module.exports = router;