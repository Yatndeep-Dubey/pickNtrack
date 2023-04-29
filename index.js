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
const nodemailer = require('nodemailer')
app.listen(port, () => {
    console.log('Server is running at :'+ port);
  });
  app.set('view engine', 'ejs');
  app.set('views','./views')
  app.use(express.static('public'))

  
 app.get("/" ,function(req,res)
 {
     res.render('index')
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
 // mail ka khel ..........................................
 const sendmail2 = async (receiver,subject,messageusr)=>
{
   const smail= "apppicknt@gmail.com"
   const spass = "qymaivyomqzbuipb"
    var subjectto = subject
    var message = messageusr
console.log(subjectto + ' ' + message + ' ' + receiver)
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: smail, // generated ethereal user
        pass: spass // generated ethereal password
    }
}); 
//Sending mail to provided emailid
let info = transporter.sendMail({
        from: smail, // sender address
        to: receiver, // list of receivers
        subject: subjectto, // Subject line
        html: message
       
    },
    function(error) {
        
        console.log(error.message)
    })

}
 // mail ka khel ..........................................
app.post('/contact', async function(req,res)
{
  const recieveremail = req.body.email
  const queryofuser = req.body.queryusr
  const messageofuser = req.body.message
  const phoneofuser = req.body.phone
  const nameofuser = req.body.name
  const subject = "Query Submitted"
  const messageusr = "Your query is Submitted to us"
  const singleusercontact=new contactModel(
    {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      countrycode:req.body.countrycode,
      location:req.body.location,
      queryusr:req.body.query,
      message:req.body.message
    });
    try
    {
        const singlecontact = await singleusercontact.save();

        res.render('contact',{message:true})
        // receiverEmailID Subject Messageusr
        const adminmail="apppicknt@gmail.com"
        const messageadmin = nameofuser+' has submitted the query his/her phonenumber is '+phoneofuser+' and the message is "'+ messageofuser+'"'
        sendmail2(recieveremail,subject,messageusr)
        sendmail2(adminmail,queryofuser,messageadmin)
    }
    catch(error)
    {
      console.log(error.message)
    }
})
app.post('/about', async function(req,res)
{
  const recieveremail = req.body.email
  const subject = "Enquiry Submitted"
  const message = "Your Enquiry is submitted"
  const singleenquiry=new quickenquiryModel(
    {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      countrycode:req.body.countrycode,
      location:req.body.location,
      message:req.body.message
    });
    try
    {
        const singleenqmodel = await singleenquiry.save();
        res.render('about',{message:true})
        sendmail2(recieveremail,subject,message)
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
