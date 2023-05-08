const userisLogin = async (req,res,next)=>
{
    try{
         if(req.session.admin_id)
         {
            
         }
         else
         {
           return res.redirect("/adminlogin")
         }
          next();
    }
    catch(error)
    {
        console.log(error.message)
    }
    
}
const userisLogout = async (req,res,next)=>
{
    try{
         if(req.session.admin_id)
         {
           return res.redirect("/adminpage")
            
         }
       
    }
    catch(error)
    {
        console.log(error.message)
    }
    next();
}
module.exports= {
    userisLogin,
    userisLogout
}