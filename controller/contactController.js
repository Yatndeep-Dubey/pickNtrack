require('dotenv').config()
const nodemailer= require('nodemailer')
const contactModel= require('../models/contactModel')
const quickenquiryModel= require('../models/quickenquiryModel')
const adminModel = require('../models/adminModel')
const subscriberModel =require('../models/subscribersModels')
const adminmail=process.env.SMAIL
const adminpass=process.env.SPASS
const sendmail2 = async (receiver,subject,messageusr)=>
{
   const smail= adminmail
   const spass = adminpass
    var subjectto = subject
    var message = messageusr
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


const acceptcontact= async function(req,res)
{
  const recieveremail = req.body.email
  const queryofuser = req.body.queryusr
  const messageofuser = req.body.message
  const phoneofuser = req.body.phone
  const nameofuser = req.body.name
  const subject = "Query Submitted"
  const messageusr = 'Dear '+ nameofuser + `<!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8" />
  
          <body>
          <p>Thanks for your enquiry with PickNTrack</p>
          </br>
          <p>We are excited you have taken the first step towards getting results.</p>
          </br>
          <p>You will recieve a call from one of our representatives shortly . </p>
          </br>
          <p>We look forward to speaking with you soon.</p>
          </br>
          <p>Kind Regards , </p>
          </br>
          <p>PickNTrack</p>
      </body>
  </html>
  `
  const today = new Date();
  const singleusercontact=new contactModel(
    {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      countrycode:req.body.countrycode,
      location:req.body.location,
      queryusr:req.body.query,
      message:req.body.message,
      date:today
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
}
const acceptquickenquiry = async function(req,res)
{
  const recieveremail = req.body.email
  const todate =new Date();
  const subject = "Enquiry Submitted"
  const message = "Your Enquiry is submitted"
  const singleenquiry=new quickenquiryModel(
    {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      countrycode:req.body.countrycode,
      location:req.body.location,
      message:req.body.message,
      date:todate
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
}
const quickemails = async function(req,res)
{
    const allquickemails = await quickenquiryModel.find()
    res.render('quick',{allmails:allquickemails})
}
const contactemails = async function(req,res)
{
    const allcontactemails = await contactModel.find()
    if(allcontactemails)
    {
      res.render('contactmails',{allemails:allcontactemails,message:false})
    }
    else{
      res.render('contactmails',{message:"No Mails Yet"})
    }
}
const subscribers = async function (req,res)
{
    const subscribersmail = req.body.email
    try{
       const singlesubscriber = new subscriberModel(
        {
          email:subscribersmail
        }
       )
       const subscribe = singlesubscriber.save()
       res.render('index',{message:'swal'})
    }
    catch(error)
    {

    }
}
const subscribermail = async function (req,res)
{
  try{
         const allsubscribers = await subscriberModel.find()
         if(allsubscribers)
    {
      res.render('subscribers',{allsubscribersemails:allsubscribers,message:false})
    }
    else{
      res.render('subscribers',{message:"No Mails Yet"})
    }
  }
  catch(error)
  {
    console.log(error.message)
  }
}
const adminlogin = async function(req,res){
  const adminname = req.body.username
  const pass = req.body.password
  const singleadmin = await adminModel.findOne({username:adminname})
  if(singleadmin)
  {
    
    if(singleadmin.pass == pass)
    {
      req.session.admin_id = singleadmin._id
      res.redirect('/adminpage')
    }
    else
    {
      res.render('adminloginpage',{message:'swal'})
    }
  }
  else
  {
    res.render('adminloginpage',{message:'swal'})
  }
}
const renderadminpage = async function(req,res){
  await res.render('adminpage')
}
module.exports=
{
    acceptcontact,
    acceptquickenquiry,
    quickemails,
    contactemails,
    adminlogin,
    renderadminpage,
    subscribers,
    subscribermail
}