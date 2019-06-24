var fs = require('fs')
var Student = require('./student')
var express = require('express')
var router = express.Router()//把路由挂载到路由容器中

    router.get('/students',function (req,res) {
    //下面第二个参数 2进制转UTF-8
//     fs.readFile('./db.json', 'utf-8',function (err,data) {
//         if(err){
//             return res.status(500).send('Server error')//500是状态码 告诉服务器出错了
//         }
//         var students = JSON.parse(data).students//使用 JSON.parse() 方法将字符串转换为 JavaScript 对象。
//         res.render('index.html',{
//             fruits:[
//                 'apple',
//                 'banana',
//                 'orange'
//             ],
//             students:students
//         })
//     })
//
// })

    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Server error')//500是状态码 告诉服务器出错了
        }
        res.render('index.html',{
            fruits:[
                'apple',
                'banana',
                'orange'
            ],
            students:students
        })
    })})

    router.get('/students/new',function (req,res){
        res.render('new.html')
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

    router.post('/students/edit',function (req,res){
        Student.updateById(req.body,function (err) {
            if (err){
                return res.status(500).send('Server error')
            }
            res.redirect('/students')
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