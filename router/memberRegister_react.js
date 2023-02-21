const express = require("express");
const router = express.Router();
const MEMBER = require('../model/member');

//등록 멤버 확인 전체&특정
router.get('/list', async (req, res) => {

    let id = req.query.idx;
    let number = Object.values(req.query);

    if (!(id)) {
        // http://localhost:8080/member/list
        await MEMBER.getAll((err, data) => {
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
        await MEMBER.getByidx(number, (err, data) => {
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

//등록
// http://localhost:8080/post
router.post('/post', async (req, res) => {

    let registerInfo = {
        studentID: req.body.studentID,
        name: req.body.name,
        first_track: req.body.first_track,
        second_track: req.body.second_track,
        git_hub: req.body.git_hub,
        email: req.body.email,
        graduation: 0
    }

    await MEMBER.create(registerInfo, (err, data) => {
        try {
            res.json(data);
        }
        catch (err) {
            console.error("member post router error " + err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
})

// http://localhost:8080/post?idx=
router.put('/post', async (req, res) => {
    let id = req.query.idx;

    let updateInfo = {
        name: req.body.name,
        first_track: req.body.first_track,
        second_track: req.body.second_track,
        git_hub: req.body.git_hub,
        email: req.body.email,
        graduation: req.body.graduation
    }

    if (id) {
        await MEMBER.modify(id, updateInfo, (err, data) => {
            try {
                if(data)    {
                    res.json({
                        title: "modify processing",
                        message: "Successfully modify."
                    })
                }
                else if (err)
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
router.delete('/list', async (req, res) => {
    let id = req.query.idx;

    await MEMBER.destroy(id, (err, data) => {
        try {
            res.json({
                title: "delete processing",
                message: "Successfully deleted."
            })
        }
        catch (err) {
            console.log("member delete router error " + err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
})

module.exports = router;