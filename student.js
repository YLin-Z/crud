//数据操作文件

//获取学生列表
var dbPath = './db.json'
var fs = require('fs')
exports.find = function(callback){
    fs.readFile(dbPath,'utf8',function (err, data) {
        if(err){
           return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}

//加学生
exports.save = function(student,callback){
    fs.readFile(dbPath,'utf8',function (err, data) {
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = students[students.length-1].id+1//id唯一
       students.push(student)
        var fileData=JSON.stringify({
            students:student
        })
        fs.writeFile(dbPath,fileData,function (err) {
            if(err){
                return callback(err)
            }
            callback(null)
        })

})}



//更新学生
exports.updateById = function(student,callback){
    fs.readFile(dbPath,'utf8',function (err, data) {
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id=parseInt(student.id)
        var stu=students.find(function (item) {
            return item.id === student.id
        })
        for (var key in student){
            stu[key] = student [key]
        }
        var fileData = JSON.stringify({
            students:students
        })

        fs.writeFile(dbPath,fileData,function (err) {
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}


exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',function (err, data) {
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        var ret = students.find(function(item){
            return item.id === parseInt(id)
        })
        callback(null,ret)
    })
}

//删学生
exports.deleteById = function(id,callback){
    fs.readFile(dbPath,'utf8',function (err, data) {
        if(err){
            return callback(err)
        }
        var students =JSON.parse(data).students
        var deleteId=students.findIndex(function (item) {
            return item.id === parseInt(id)
        })
        students.splice(deleteId,1)
        var fileData=JSON.stringify({
            students:students
        })

        fs.writeFile(dbPath,fileData,function (err) {
            if(err){
                return callback(err)
            }
            callback(null)
        })
})}