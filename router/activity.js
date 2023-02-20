const express = require("express");
const router = express.Router();
const ACTIVITY = require('../model/activity');


// http://localhost:8080/activity/:reservedWord
router.get('/:reservedWord', async(req, res) => {

    let result = {
        code : 404,
        message : "Not found"
    }
    
    //html 
    // if(isNaN(req.params.reservedWord))  {
    //     (req.params.reservedWord === 'create') 
    //     ? res.render('activity/create') //혹시 원하는 페이지로 이동하지 않는다면 여길 손봐주세요
    //     : (req.params.reservedWord === 'list')
    //     ? res.render('activity/list')   //아마 이거,, 이동이 안될거 같은데, 어떻게 값이 넘어갈지 정확하게 감이 안잡히네요
    //     : (req.params.reservedWord === 'update')
    //     ? res.render('activity/update') //혹시 원하는 페이지로 이동하지 않는다면 여길 손봐주세요
    //     : res.json(result)
    // }
    // else    {
    //     await MEMBER.getByidx(req.params.reservedWord, (err, data) => {
    //         try {
    //             res.json(data);
    //             //res.render('member/detail', {data});
    //         }
    //         catch(err) {
    //             console.error("router error " + err);
    //             res.json(result);
    //         }
    //     })
    // }

    // react
    // // ex) http://localhost:8080/activity/list?year=22&semester=2
    if(isNaN(req.params.reservedWord))  {
        let period = req.query;

        if (period === "") {
            await ACTIVITY.getActivityByPeriod(period, (err, data) => {
                try {
                    //데이터가 없을때 뭘 보내야 좋을까
                    if(data.length === 0)
                        res.json("null");
                    else
                        res.json(data);
                }
                catch(err) {
                    console.error("router error " + err);
                    res.json(result);
                }
            })
        }
        else {
            res.json({
                "code" : 400,
                "message" : "Bad Request"
            })
        }
    }
    // ex) http://localhost:8080/activity/1
    else    {
        await ACTIVITY.getActivityById(req.params.reservedWord, (err, data) => {
            try {
                //데이터가 없을때 뭘 보내야 좋을까
                if(data.length === 0)
                    res.json("null");
                else
                    res.json(data);
            }
            catch(err) {
                console.error("router error " + err);
            }
        })
    }
})

// http://localhost:8080/activity/create
router.post('/create', async(req, res) => {
    
    let activity = {
        year : req.body.year,
        semester : req.body.semester,
        details : req.body.details,
        title : req.body.title,
        complete : req.body.complete
    }

    await ACTIVITY.create(activity, (err, data) => {
        try {
            //html
            res.redirect('/member/list');

            //react
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})

//update
// http://localhost:8080/member/:idx
router.put('/:idx', async(req, res) => {

    let activity = {
        year : req.body.year,
        semester : req.body.semester,
        details : req.body.details,
        title : req.body.title,
        complete : req.body.complete
    }

    await ACTIVITY.modify(req.params.idx, activity, (err, data) => {
        try {
            //html
            // res.redirect('/member/list');
            
            //react
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})

// http://localhost:8080/member/:idx
router.delete('/:idx', async(req, res) => {
    
    await ACTIVITY.destroy(req.params.idx, (err, data) => {
        try {
            //html
            // res.redirect('/member/list');
            
            //react
            res.json(data);
        }
        catch(err) {
            console.error(err);
        }
    })
})


module.exports = router;