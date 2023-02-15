const express = require("express");
const router = express.Router();
const MEMBER = require('../model/member');

// http://localhost:8080/member/:idx
router.get('/:idx', async(req, res) => {
    
    await MEMBER.getByidx((err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error("router error " + err);
        }
    })
})

// http://localhost:8080/member/list
router.get('/list', async(req, res) => {
    
    await MEMBER.getAll((err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error("router error " + err);
        }
    })
})

// html과 연결시, 주석해제 필요함
// router.get('/create', async(req, res) => {
//     res.render('admin/admin_member.html');
// })

// http:localhost:8080/member/create
router.post('/create', async(req, res) => {
    
    //로그인되어있는게 맞는지, 그렇지 않다면 list로 되돌아가게끔

    let registerInfo = {
        idx: req.body.idx,
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
        catch(err)  {
            console.error(err);
        }
    })
})

//CRUD

//Read - select, get
//Create - insert, post
//Update - update, put

//update
// http://localhost:8080/member/update/:idx
router.put('/update/:idx', async(req, res) => {

    let member = {
        name: req.body.name,
        first_track: req.body.first_track,
        second_track: req.body.second_track,
        git_hub: req.body.git_hub,
        email: req.body.email,
        graduation: 0
    }

    await MEMBER.modify(req.params.idx, member, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})

// http://localhost:8080/member/delete/:idx
router.delete('/delete/:idx', async(req, res) => {
    
    await MEMBER.destroy(req.params.idx, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error(err);
        }
    })
})

module.exports = router