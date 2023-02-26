const express = require("express");
const router = express.Router();
const MEMBER = require('../model/member');

// http://localhost:8080/member/:reservedWord
router.get('/:reservedWord', async (req, res) => {
    //html
    if (isNaN(req.params.reservedWord)) {
        if (req.params.reservedWord === 'post') {

            let query = req.query;
            let key = Object.keys(query);
            let value = Object.values(query);

            if (key.length === 2) {
                if (key[0] === 'type' && key[1] === 'idx' && value[0] === 'update') {
                    if (!isNaN(value[1])) {
                        await MEMBER.getByidx(value[1], (err, data) => {
                            try {
                                if (data.length === 0)
                                    res.status(404).json({ message: "Not Found" });
                                // http://localhost:8080/post?type=update&idx=
                                else
                                    res.render('member/post', { type: value[0], memberDetail: data[0] });
                            }
                            catch (err) {
                                console.error("router error " + err);
                                res.status(404).json({ message: "Not Found" });
                            }
                        })
                    }
                    else
                        res.status(400).json({ message: "Forbidden" });
                }
                else
                    res.status(400).json({ message: "Forbidden" });
            }
            // http://localhost:8080/post?type=create
            else if (key.length === 1 && key.toString() === 'type' && value.toString() === 'create')
                res.render('member/post', { type : value.toString(), memberDetail : '' });
            else
                res.status(400).json({ message: "Forbidden" });
        }
        // http://localhost:8080/list
        else if (req.params.reservedWord === 'list') {
            await MEMBER.getAll((err, data) => {
                try {
                    res.render('member/list', { memberList: data });
                }
                catch (err) {
                    console.error("router error " + err);
                    res.status(503);
                }
            })
        }
    }
    else {
        // http://localhost:8080/:idx
        await MEMBER.getByidx(req.params.reservedWord, (err, data) => {
            try {
                if (data.length === 0)
                    res.status(404).json({ message: "Not Found" });
                else
                    res.render('member/detail', { memberDetail: data[0] });
            }
            catch (err) {
                console.error("router error " + err);
                res.status(500).json({ message: "Internal Server Error" });
            }
        })
    }
})

// http://localhost:8080/member/post?type=create
//http://localhost:8080/member/post?type=update&idx=

// http:localhost:8080/member/post?type=create
router.post('/post', async (req, res) => {

    //html
    let key = Object.keys(req.query);
    let value = Object.values(req.query);

    if (key.length === 1 && key.toString() === 'type' && value.toString() === 'create') {
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
                res.redirect('/member/list');
            }
            catch (err) {
                console.error(err);
            }
        })
    }
    else if (key.length === 2 && key[0].toString() === 'type' && value[0].toString() === 'update')  {
        let member = {
            name: req.body.name,
            first_track: req.body.first_track,
            second_track: req.body.second_track,
            git_hub: req.body.git_hub,
            email: req.body.email,
            graduation: 0
        }
        await MEMBER.modify(value[1], member, (err, data) => {
            try {

                res.redirect(`/member/${value[1]}`);
            }
            catch (err) {
                console.error(err);
            }
        })
    }
    else
        res.status(400).json({ message: "Forbidden" });
})

router.delete('/:idx', async (req, res) => {

    await MEMBER.destroy(req.params.idx, (err, data) => {
        try {
            res.redirect('/member/list');
        }
        catch (err) {
            console.error(err);
        }
    })
})

module.exports = router;