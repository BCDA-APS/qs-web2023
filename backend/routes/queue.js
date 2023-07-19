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

router.post("/add", async (req, res, next) => {
    try {
        console.log("req: ", req.body);
        
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/item/add", req.body);
       /* if (value.status === 200) {
            val = value.data;
        }*/
        console.log("value: ", value);
        return res.status(200).json({ queue: value?.data })
    } catch(error) {
        next(error)
    }
})


router.post("/add/batch", async (req, res, next) => {
    try {
        console.log("req: ", req.body);
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/item/add/batch", {items: req.body});
       /* if (value.status === 200) {
            val = value.data;
        }*/
        console.log("value: ", value);
        return res.status(200).json({ queue: value?.data })
    } catch(error) {
        next(error)
    }
})
//api/queue/item/update

router.post("/update", async (req, res, next) => {
    try {
        console.log("req: ", req.body);
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/item/update", {item: req.body});
       /* if (value.status === 200) {
            val = value.data;
        }*/
        //console.log("value: ", value);
        return res.status(200).json({ queue: value?.data })
    } catch(error) {
        next(error)
    }
})

router.post("/loop", async (req, res, next) => {
    try {
        console.log("req: ", req.body);
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/mode/set", req.body);
       /* if (value.status === 200) {
            val = value.data;
        }*/
        //console.log("value: ", value);
        return res.status(200).json({ loop: value?.data })
    } catch(error) {
        next(error)
    }
})
//http POST http://localhost:60610/api/queue/item/execute item:='{"name":"count", "args":[["det1", "det2"]], "kwargs":{"num":10, "delay":1}, "item_type": "plan"}'

router.post("/execute", async (req, res, next) => {
    try {
        console.log("req: ", req.body);
        let val = null;
        const value = await axios.post("http://otz.xray.aps.anl.gov:60610/api/queue/item/execute", req.body);
       /* if (value.status === 200) {
            val = value.data;
        }*/
        //console.log("value: ", value);
        return res.status(200).json({ execute: value?.data })
    } catch(error) {
        next(error)
    }
})

router.get("/runs/active", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get("http://otz.xray.aps.anl.gov:60610/api/re/runs/active");
        if (value.status === 200) {
            val = value.data;
        }
        //console.log("value: ", value);
        return res.status(200).json({ queue: val })
    } catch(error) {
        next(error)
    }
})

router.get("/runs/closed", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get("http://otz.xray.aps.anl.gov:60610/api/re/runs/closed");
        if (value.status === 200) {
            val = value.data;
        }
        //console.log("value: ", value);
        return res.status(200).json({ queue: val })
    } catch(error) {
        next(error)
    }
})

router.get("/runs/open", async (req, res, next) => {
    try {
        let val = null;
        const value = await axios.get("http://otz.xray.aps.anl.gov:60610/api/re/runs/open");
        if (value.status === 200) {
            val = value.data;
        }
        //console.log("value: ", value);
        return res.status(200).json({ queue: val })
    } catch(error) {
        next(error)
    }
})

router.get("/get/item", async (req, res, next) => {
    try {
        console.log("reqBsta: ", req.body);
        let val = null;
        const value = await axios.post(`http://otz.xray.aps.anl.gov:60610/api/queue/item/get?pos="front"`);
        if (value.status === 200) {
            val = value.data;
        }
        console.log("value: ", value);
        return res.status(200).json({ item: val, id: req.body })
    } catch(error) {
        next(error)
    }
})

//http GET http://localhost:60610/api/re/runs/active  # Get the list of active runs
//http GET http://localhost:60610/api/re/runs/open    # Get the list of open runs
//http GET http://localhost:60610/api/re/runs/closed  # Get the list of closed runs
//http GET http://localhost:60610/api/queue/item/get uid:='<uid>'

module.exports = router;