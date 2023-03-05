const express = require("express");
const router = express.Router();
const activity = require('../model/activity');
const valid = require('../validator/data_valid');
const { isLoggedIn } = require('./middleware');


router.get('/list', async (req, res) => {

    let keys = Object.keys(req.query);
    let values = Object.values(req.query);

    let compare = Boolean;

    if (keys.length === 0)
        compare = true;
    else if(keys.length === 1)
        compare = ([ keys[0] ].toString() === [ 'idx' ].toString())
    
    if (keys.length === 0 && compare) {
        // http://localhost:8080/activity/list
        await activity.getAll((err, data) => {
            try {
                if(data !== null)
                    res.json(data);
                else if(err !== null)
                    res.json(err);
            }
            catch (err) {
                console.log("activity list by period router error " + err);
                res.status(503).json({ message : "internal server error" });
            }
        })
    }
    else if (keys.length === 1 && compare) {
        // http://localhost:8080/activity/list?idx=
        await activity.getActivityById(values, (err, data) => {
            try {
                if (data.length === 0)
                    res.status(404).json({ message: "Not Found" });
                else
                    res.json(data);
            }
            catch (err) {
                console.log("specific activity router error " + err);
            }
        })
    }
    else
        res.status(400).json({ message: "Forbidden" });
});

// http://localhost:8080/activity/post
router.post('/post', valid.CheckActivityInfo, valid.errorCallback, isLoggedIn, async(req, res) => {
    
    let inputData = {
        year : req.body.year,
        semester : req.body.semester, 
        details : req.body.details,
        title : req.body.title,
        complete : req.body.complete
    }

    await activity.create(inputData, (err, data) => {
        try {
            if(data !==  null)    {
                res.json({
                    title: "post processing",
                    message: "Successfully post."
                })
            }
            else if(err !== null)
                res.json(err);
        }
        catch(err)  {
            console.log("activity post router error " + err);
        }
    })
})

router.put('/post', valid.CheckActivityInfo, valid.errorCallback, isLoggedIn, async(req, res) => {
    let key = Object.keys(req.query);
    let value = Object.values(req.query);
    let compare = Boolean;

    if(key.length === 1)
        compare = ([ key ].toString() === [ 'idx' ].toString())

    if(compare) {

        let updateData = {
            year : req.body.year,
            semester : req.body.semester, 
            details : req.body.details,
            title : req.body.title,
            complete : req.body.complete
        }

        await activity.modify(value, updateData, (err, data) => {
            try {
                if(data !== null)    {
                    res.json({
                        title: "modify processing",
                        message: "Successfully modify."
                    })
                }
                else if(err !== null)
                    res.json(err);
            }
            catch(err)  {
                console.log("activity post router error " + err);
            }
        })
    }
    else
        res.status(404).json({ message : "Not found" });
})

router.delete('/list', isLoggedIn, async(req, res) => {
    let id = req.query.idx;

    await activity.destroy(id, (err, data) => {
        try {
            if(data !== null && data.affectedRow === 1)   {
                res.json({
                    title: "delete processing",
                    message: "Successfully deleted."
                })
            }
            else if(data !== null && data.affectedRow === 0)
                res.status(404).json({ message : "Not found" });
            else
                res.json(err);
        }
        catch (err) {
            console.log("member delete router error " + err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
})

module.exports = router;