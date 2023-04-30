
const nodemailer= require('nodemailer')
const contactModel= require('../models/contactModel')
const quickenquiryModel= require('../models/quickenquiryModel')

const sendmail2 = async (receiver,subject,messageusr)=>
{
   const smail= "apppicknt@gmail.com"
   const spass = "qymaivyomqzbuipb"
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
}
const acceptquickenquiry = async function(req,res)
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
}
module.exports=
{
    acceptcontact,
    acceptquickenquiry
}