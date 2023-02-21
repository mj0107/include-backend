const express = require("express");
const router = express.Router();
const ACTIVITY = require('../model/activity');

// 전체 & 부분


router.get('/list', async(req, res) => {
    let keys = Object.keys(req.query);
    let values = Object.values(req.query);

    let compare = Boolean;
    if (keys.length === 2)
        compare = ([ keys[0], keys[1] ].toString() === [ 'year', 'semester' ].toString())
    else if(keys.length === 1)
        compare = ([ keys[0] ].toString() === [ 'idx' ].toString())
    
    if (keys.length === 2 && compare) {
        // ex) ttp://localhost:8080/activity/list?year=22&semester=2
        await activity.getActivityByPeriod(values, (err, data) => {
            try {
                if(data !== null)
                    res.render('activity/list', { activityListByPeriod : data });
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
                if (data !== null)  {
                    if(data.length === 0)
                        res.status(404).json({ message: "Not Found" });
                    else
                        res.render('activity/detail', { activityById : data[0] });
                }
                else if(err !== null)
                    res.json(data);
            }
            catch (err) {
                console.log("specific member router error " + err);
            }
        })
    }
    else
        res.status(400).json({ message: "Forbidden" });
})

router.post('/post', async(req, res) => {
    let key = Object.keys(req.query);
    let value = Object.values(req.query);
    let compare = Boolean;

    if(key.length === 1)
        compare = ([ key ].toString() === [ 'idx' ].toString())
    else if(key.length === 0)
        compare = true;

    if(compare) {
        // http://localhost:8080/activity/post?idx=
        let updateInfo = {
            year : req.body.year,
            semester : req.body.semester,
            details : req.body.details,
            title : req.body.title,
            complete : req.body.complete
        }
        await activity.modify(value, updateInfo, (err, data) => {
            try {
                if(data !== null)    {
                    res.redirect('back');
                }
                else if(err !== null)
                    res.json(err);
            }
            catch(err)  {
                console.log("activity post router error " + err);
            }
        })
    }
    else if(compare)    {
        // http://localhost:8080/activity/post
        let activityInfo = {
            year : req.body.year,
            semester : req.body.semester,
            details : req.body.details,
            title : req.body.title,
            complete : req.body.complete
        }
        
        await activity.create(activityInfo, (err, data) => {
            try {
                if(data !==  null)    {
                    res.redirect('back');
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

// http://localhost"8080/activity/list?idx=
router.delete('/list', async(req, res) => {
    let id = req.query.idx;

    await activity.destroy(id, (err, data) => {
        try {
            if(data !== null) {
                res.redirect('back');
            }
            else if(err !== null)
                res.json(err);
        }
        catch (err) {
            console.log("member delete router error " + err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
})


module.exports = router;