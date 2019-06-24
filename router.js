var fs = require('fs')
var Student = require('./student')
var express = require('express')
var router = express.Router()//把路由挂载到路由容器中

    router.get('/login',function (req,res) {
        res.render('login.html')
    })

    router.get('/students',function (req,res) {

    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Server error')//500是状态码 告诉服务器出错了
        }
        res.render('index.html',{

            students:students
        })
    })})

router.get('/tc',function (req,res) {
    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Server error')//500是状态码 告诉服务器出错了
        }
        res.render('indexfortc.html',{

            students:students
        })
    })})


router.get('/studentsforstudent',function (req,res) {

    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Server error')//500是状态码 告诉服务器出错了
        }
        res.render('indexforstudent.html',{

            students:students
        })
    })})

    router.get('/students/new',function (req,res){
        res.render('new.html')
    })

    router.post('/students/newforstudent',function (req,res){
        Student.save(req.body,function (err) {
            if (err){
                return res.status(500).send('Server error')
            }
            res.redirect('/studentsforstudent')//去首页

        })
    })

    router.post('/students/new',function (req,res){
        // console.log(req.body)
        //读字符转对象 往对象中push 再转回字符
        Student.save(req.body,function (err) {
            if (err){
                return res.status(500).send('Server error')
            }
            res.redirect('/students')//去首页

        })

    })

    router.get('/students/edit',function (req,res){


        Student.findById(parseInt(req.query.id),function(err,student){
            if(err){
                return res.status(500).send('Server error')
            }
            res.render('edit.html',{
                student:student
            })

        })
    })

router.get('/students/edittc',function (req,res){


    Student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('Server error')
        }
        res.render('edittc.html',{
            student:student
        })

    })
})

    router.post('/students/edit',function (req,res){
        Student.updateById(req.body,function (err) {
            if (err){
                return res.status(500).send('Server error')
            }
            res.redirect('/students')
        })
    })

router.post('/students/edittc',function (req,res){
    Student.updateById(req.body,function (err) {
        if (err){
            return res.status(500).send('Server error')
        }
        res.redirect('/tc')
    })
})

    router.get('/students/delete',function (req,res){
        Student.deleteById(req.query.id,function (err) {
            if (err){
                return res.status(500).send('Server error')
            }
            res.redirect('/students')
        })
    })


module.exports = router