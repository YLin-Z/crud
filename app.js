//入口模块
var express = require('express')

var router=require('./router')
var bodyParser = require('body-parser')
var app = express()

app.use('/node_modules/',express.static('./node_modules/'))//因为index访问了这个文件的bootstrap资源
app.use('/public/',express.static('./public/'))
app.use('/views/',express.static('./views/'))

app.engine('html',require('express-art-template'))
//在挂载路由前配置posT的模板引擎
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use(router)//挂载路由

app.listen(3000,function () {
    console.log('running 3000...')
})

module.exports = app