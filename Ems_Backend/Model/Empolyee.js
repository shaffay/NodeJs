const mongoose = require('mongoose');


const EmployeeSc = new mongoose.Schema({
    
    name:String,
    email:String,
    phone:String,
    picture:String,
    salary:String,
    position:String,

})

mongoose.model("employee",EmployeeSc);

