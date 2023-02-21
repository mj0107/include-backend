const express = require("express");
const router = express.Router();
const activity = require('../model/activity');


router.get('/list', async (req, res) => {

    let keys = Object.keys(req.query);
    let values = Object.values(req.query);
    let compare = ([ keys[0], keys[1] ] === [ 'year', 'semester' ])
    
    if (!(keys) && compare) {
        // http://localhost:8080/activity/list?year= & semester=
        await activity.getActivityByPeriod(values, (err, data) => {
            try {
                res.json(data);
            }
            catch (err) {
                //추가로 뭘 반환하지?
                console.log("member list router error " + err);
            }
        })
    }
    else if (id) {
        // http://localhost:8080/member/list?idx=
        await activity.getActivityById(number, (err, data) => {
            try {
                if (data.length === 0)
                    res.status(404).json({ message: "Not Found" });
                else
                    res.json(data);
            }
            catch (err) {
                console.log("specific member  router error " + err);
            }
        })
    }
    else
        res.status(400).json({ message: "Forbidden" });
});

router.post('/post', async(req, res) => {

})

router.put('/post', async(req, res) => {

})

router.delete('/list', async(req, res) => {

})

module.exports = router;