const express = require("express");
const router = express.Router();
const MEMBER = require('../model/member');
const valid = require('../validator/data_valid');
const { isLoggedIn } = require('./middleware');


//등록 멤버 확인 전체&특정
router.get('/list', async (req, res) => {

    let id = req.query.idx;
    let number = Object.values(req.query);

    if (!(id)) {
        // http://localhost:8080/member/list
        await MEMBER.getAll((err, data) => {
            try {
                if(data !== null)
                    res.json(data);
                else
                    res.json(err);
            }
            catch (err) {
                //추가로 뭘 반환하지?
                res.json(err);
                console.log("member list router error " + err);
            }
        })
    }
    else if (id) {
        // http://localhost:8080/member/list?idx=
        await MEMBER.getByidx(number, (err, data) => {
            try {
                if(data !== null) {
                    if (data.length === 0)
                        res.status(404).json({ message: "Not Found" });
                    else
                        res.json(data);
                }
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

//등록
// http://localhost:8080/member/post
router.post('/post', valid.CheckRegisterInfo, valid.errorCallback, isLoggedIn, async(req, res) => {

    await MEMBER.create(req.body, (err, data) => {
        try {
            if(data !== null)   {
                res.json({
                    title: "post processing",
                    message: "Successfully post."
                })
            }
            else
                res.json(err);       
        }
        catch (err) {
            console.error("member post router error " + err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
})

// http://localhost:8080/member/post?idx=
router.put('/post', valid.CheckUpdateInfo, valid.errorCallback, isLoggedIn, async(req, res) => {
    let id = req.query.idx;

    if (id) {
        await MEMBER.modify(id, req.body, (err, data) => {
            try {
                if(data !== null)    {
                    res.json({
                        title: "modify processing",
                        message: "Successfully modify."
                    })
                }
                else
                    res.json(err);
            }
            catch (err) {
                console.log("member modify router error " + err);
                res.status(500).json({ message: "Internal Server Error" });
            }
        })
    }
    else
        res.status(400).json({ message: "Forbidden" });
})

// http://localhost:8080/member/list?idx=
router.delete('/list', isLoggedIn, async (req, res) => {
    let id = req.query.idx;

    await MEMBER.destroy(id, (err, data) => {
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