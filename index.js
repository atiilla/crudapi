const express = require('express')
const PORT = 1377
const app = express();
const fs = require('fs');
let users=[]
const User = require('./usermodel')

const mongoose = require('mongoose');

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/myDB', {
    useNewUrlParser: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


app.get('/',function(req,res){
// http://localhost:1377/?username=root&password=23232323 >>> url query
  //  console.log(req.query)

  // new user object
    let getData = {
        username: req.query.username,
        password: req.query.password
    }

    // READ USERS.JSON FILE
    fs.readFile('users.json','utf8',(err,data)=>{
       // console.log(typeof data)
       // converted from string to object
        let tempUsers = JSON.parse(data)

        // inserted new object into array
        tempUsers.push(getData)

        // get type of data
        console.log(typeof tempUsers)

        // print array in console
        console.log(tempUsers)

        fs.writeFile('users.json',JSON.stringify(tempUsers),()=>{
            console.log('data is saved!')
        })

    })



    // fs.writeFile('users.json',JSON.stringify(getData),()=>{
    //     console.log('USER IS SAVED!!!!!')
    // })
    console.log(getData)
    // fs.writeFile
  //  console.log(req.params)
    res.send('hello homepage')
})

app.get('/contact',function(req,res){
    res.send('hello contact')
})

app.get('/checkuser',function(req,res){
    // do filter here
    
})


app.get('/saveuser',function(req,res){
    const user = req.query
    console.log(user)
    new User(user).save()
    res.json({
        message:user
    })
})


app.get('/getusers',function(req,res){
    
    User.find({},(err,users)=>{
      //  console.log(users)
        res.json(users)
    })
})


app.get('/getusers/:id',function(req,res){
    console.log(req.params)
    let id = req.params.id
    User.findById(id,(err,singleuser)=>{
        console.log(singleuser)
        res.json(singleuser)
    })
})

// http://localhost:1377/contact
// req.params


// http://localhost:1377/1 >> url params

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})