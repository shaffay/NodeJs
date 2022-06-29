const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require("./Model/Empolyee");
const Empolyee = mongoose.model("employee");
const con = "mongodb+srv://bajwa:lRzDVZ5VtJODaAXi@cluster0.958ffxu.mongodb.net/?retryWrites=true&w=majority"



app.use(bodyParser.json());

// mongoose.connect(con ,{
//     useNewUrlParser: true,

//     useUnifiedTopology: true
// })

mongoose.connect(con,{

    useNewUrlParser: true,
    useUnifiedTopology: true

})

mongoose.connection.on("connected",()=>{
    console.log("Yeah Im Connected to MongoDb")
})
mongoose.connection.on("error",(err)=>{
    console.log("Error",err)
})


app.post('/send-data',(req,res)=>{

    const emp = new Empolyee({

        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position,

    })

    emp.save()
    .then(
        (data)=>{
                console.log(data)
                res.send(data);
        }
        )
    res.send("Posted")

    .catch((err) => {
        console.log(err);
      });
 

})

app.post('/delete',(req,res)=>{

        Empolyee.findByIdAndDelete({_id: req.body.id})
        .then(
            (data)=>{
                    console.log(data)
                    res.send(data);
            }
            )
        res.send("Data Deleted")
    
        .catch((err) => {
            console.log(err);
          });
})


app.post('/update',(req,res)=>{

        Empolyee.findByIdAndUpdate({_id: req.body.id},{

            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            picture: req.body.picture,
            salary: req.body.salary,
            position: req.body.position,
    
        })
        .then(
            (data)=>{
                    console.log(data)
                    res.send(data);
            }
            )
        res.send("Data Updated")
    
        .catch((err) => {
            console.log(err);
          });
})



app.get('/',(req,res)=>{

 Empolyee.find({})

    .then((data)=>{
        
        res.send(data)
    })
    

})

// app.get('/Profile',(req,res)=>{

//     res.send("This is Profile Page");

// })

app.listen((process.env.PORT || 3000),(req,res)=>{

    console.log("Server Is On Check");

})
