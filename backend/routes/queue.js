const express = require("express")
const router = express.Router()
const axios = require('axios');
const { API_URL } = require("../config");

//Routes to get information regarding queue

router.get("/", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get(`${API_URL}/api/queue/get`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ queue: val })
    } catch(error) {
        next(error)
    }
})

router.post("/clear", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/queue/clear`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ queueClear: val })
    } catch(error) {
        next(error)
    }
})

router.post("/delete", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/queue/item/remove`, req.body);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ queueDelete: val })
    } catch(error) {
        next(error)
    }
})

router.post("/move", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/queue/item/move`, req.body);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ queueMove: val })
    } catch(error) {
        next(error)
    }
})

router.post("/start", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/queue/start`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ queueStart: val })
    } catch(error) {
        next(error)
    }
})

router.post("/stop", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/queue/stop`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ queueStop: val })
    } catch(error) {
        next(error)
    }
})

router.post("/cancel", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.post(`${API_URL}/api/queue/stop/cancel`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ queueCancel: val })
    } catch(error) {
        next(error)
    }
})

router.post("/add", async (req, res, next) => {
    try {
        const value = await axios.post(`${API_URL}/api/queue/item/add`, req.body);
        return res.status(200).json({ queue: value?.data })
    } catch(error) {
        next(error)
    }
})


router.post("/add/batch", async (req, res, next) => {
    try {
        const value = await axios.post(`${API_URL}/api/queue/item/add/batch`, {items: req.body});
        return res.status(200).json({ queue: value?.data })
    } catch(error) {
        next(error)
    }
})

router.post("/update", async (req, res, next) => {
    try {
        const value = await axios.post(`${API_URL}/api/queue/item/update`, {item: req.body});
        return res.status(200).json({ queue: value?.data })
    } catch(error) {
        next(error)
    }
})

router.post("/loop", async (req, res, next) => {
    try {
        const value = await axios.post(`${API_URL}/api/queue/mode/set`, req.body);
        return res.status(200).json({ loop: value?.data })
    } catch(error) {
        next(error)
    }
})

router.post("/execute", async (req, res, next) => {
    try {
        const value = await axios.post(`${API_URL}/api/queue/item/execute`, req.body);
        return res.status(200).json({ execute: value?.data })
    } catch(error) {
        next(error)
    }
})

router.get("/runs/active", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get(`${API_URL}/api/re/runs/active`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ runsActive: val })
    } catch(error) {
        next(error)
    }
})

router.get("/runs/closed", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get(`${API_URL}/api/re/runs/closed`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ runsClosed: val })
    } catch(error) {
        next(error)
    }
})

router.get("/runs/open", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get(`${API_URL}/api/re/runs/open`);
        if (value.status === 200) {
            val = value.data;
        }
        return res.status(200).json({ runsOpen: val })
    } catch(error) {
        next(error)
    }
})


module.exports = router;