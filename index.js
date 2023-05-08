require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express");
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 7000;
const mongourl= process.env.MONGO ;
const contactModel = require('./models/contactModel')
const quickenquiryModel = require('./models/quickenquiryModel')
const contactController = require('./controller/contactController')
const auth = require('./middleware/auth');
const adminModel = require('./models/adminModel')
const nodemailer = require('nodemailer')
const session= require("express-session");
app.use(session({secret:"My Secret"}))
app.listen(port, () => {
    console.log('Server is running at :'+ port);
  });
  app.set('view engine', 'ejs');
  app.set('views','./views')
  app.use(express.static('public'))

  
 app.get("/" ,function(req,res)
 {
     res.render('index',{message:false})
 })
 app.get("/contact", function(req,res)
 {
     res.render('contact',{message:false})
 })
 app.get("/about", function(req,res)
 {
     res.render('about',{message:false})
 })
 app.get('/privacy', function(req,res)
 {
     res.render('privacy')
 })
 app.get('/tandc', function(req,res)
 {
     res.render('tandc')
 })
app.get('/adminlogin',auth.userisLogout,function(req,res)
{
    res.render('adminloginpage',{message:'anything'})
}) 
app.post('/',contactController.subscribers)
app.get("/adminpage",auth.userisLogin,contactController.renderadminpage)
app.post('/contact',contactController.acceptcontact)
app.post('/about',contactController.acceptquickenquiry)
app.get('/adminquickmails',auth.userisLogin,contactController.quickemails)
app.get('/admincontactusmails',auth.userisLogin,contactController.contactemails)
app.get('/adminemailsubscribers',auth.userisLogin,contactController.subscribermail)
app.post("/adminlogin",auth.userisLogout,contactController.adminlogin)
app.post('/sendadmin',async function(req,res)
{
   try{
       const admin = new adminModel(
        {
            username:"pickntrack@gmail.com",
            pass:"@pickntrack2023"
        }
       )
       const singleadmin = await admin.save();
       res.send("admin saved")
   }
   catch(error)
   {
     console.log(error.message)
   }
})
 //Database Connection
 mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("Database Connected"));

  // Using Assets and images
app.use('/assets',express.static('assets'));
app.use("/public/images",express.static('./public/images'));
