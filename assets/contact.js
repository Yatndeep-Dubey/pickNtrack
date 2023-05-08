  // to get user location code................
  let locationButton = document.getElementById("get-location");
  let locationDiv = document.getElementById("location-details");
  locationButton.addEventListener("click", () => {
//Geolocation APU is used to get geographical position of a user and is available inside the navigator object
if (navigator.geolocation) {
//returns position(latitude and longitude) or error
navigator.geolocation.getCurrentPosition(showLocation, checkError);
} else {
//For old browser i.e IE
locationDiv.innerText = "The browser does not support geolocation";
}
});
//Error Checks
const checkError = (error) => {
switch (error.code) {
case error.PERMISSION_DENIED:
locationDiv.innerText = "Please allow access to location";
break;
case error.POSITION_UNAVAILABLE:
//usually fired for firefox
locationDiv.innerText = "Location Information unavailable";
break;
case error.TIMEOUT:
locationDiv.innerText = "The request to get user location timed out";
}
};
const showLocation = async (position) => {
//We user the NOminatim API for getting actual addres from latitude and longitude
let response = await fetch(
`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
);
//store response object
let data = await response.json();
locationDiv.innerText = `${data.address.city}, ${data.address.country}`;
};
// COde for navbar
const burger = document.getElementById('burger')
const navbar = document.getElementById('navbar')
const navlist = document.getElementById('nav-list')
const closemenu = document.getElementById('closemenu')
burger.addEventListener('click',function openmenu()
{
  navbar.style.maxHeight='300px'
  navlist.style.opacity='1'
  navlist.style.pointerEvents='auto'
  closemenu.style.display='block'
  burger.style.display='none'
})
closemenu.addEventListener('click',function closenav()
{
burger.style.display='block'
closemenu.style.display='none'
navlist.style.opacity='0'
navbar.style.maxHeight='60px'
navlist.style.pointerEvents='none'
})

// Privacy popup
const privacypopup = document.getElementById('privacypopup')
document.getElementById('closeprivacypopup').addEventListener('click',closepopup)
function closepopup()
{
console.log("button chal rha hai")
privacypopup.style.display='none'
var struct = document.getElementById('struct')
struct.style.opacity='1'
struct.style.pointerEvents='auto'
}  
//open popuop
document.getElementById('openprivacypopup').addEventListener('click',openpopup)
document.getElementById('openmobprivacypopup').addEventListener('click',openpopup)
function openpopup()
{
console.log(" open button chal rha hai")
privacypopup.style.display='block'
privacypopup.style.opacity='1'
var struct=document.getElementById('struct');
struct.style.opacity='0.2'
struct.style.pointerEvents='none'
}  
// terms popup
const termspopup = document.getElementById('termspopup')
document.getElementById('closetermspopup').addEventListener('click',closetermspopup)
function closetermspopup()
{
console.log("button chal rha hai")
termspopup.style.display='none'
var struct = document.getElementById('struct')
struct.style.opacity='1'
struct.style.pointerEvents='auto'
}  
//open popuop
document.getElementById('opentermspopup').addEventListener('click',opentermspopup)
document.getElementById('openmobtermspopup').addEventListener('click',opentermspopup)
function opentermspopup()
{
console.log(" open button chal rha hai")
termspopup.style.display='block'
termspopup.style.opacity='1'
var struct=document.getElementById('struct');
struct.style.opacity='0.2'
struct.style.pointerEvents='none'
} 
// Faq popup
const faqpopup = document.getElementById('faqpopup')
document.getElementById('closefaqpopup').addEventListener('click',closefaqpopup)
function closefaqpopup()
{
console.log("button chal rha hai")
faqpopup.style.display='none'
var struct = document.getElementById('struct')
struct.style.opacity='1'
struct.style.pointerEvents='auto'
}  
//open popuop
document.getElementById('openfaqpopup').addEventListener('click',openfaqpopup)
document.getElementById('openmobfaqpopup').addEventListener('click',openfaqpopup)
function openfaqpopup()
{
console.log(" open button chal rha hai")
faqpopup.style.display='block'
faqpopup.style.opacity='1'
var struct=document.getElementById('struct');
struct.style.opacity='0.2'
struct.style.pointerEvents='none'
}       
const varbody= document.getElementById('struct');
function blurbody()
{
varbody.style.opacity='0.2'
varbody.style.pointerEvents='none'
varbody.style.userSelect='none'
}
function freebody()
{
   varbody.style.opacity='1'
   varbody.style.pointerEvents='auto'
   varbody.style.userSelect='auto'
}

       //closethankspopup
       document.getElementById('closethankspopup').addEventListener('click',closethankspopup)
       document.getElementById('closemobthankspopup').addEventListener('click',closethankspopup)
       function closethankspopup()
       {
          document.getElementById('thankspopup').style.display='none'
          freebody()
       }
       // open thankspopoup
        const thanksmessage = '<%=message%>'
        console.log(thanksmessage)
        if(thanksmessage=='true')
        {
          document.getElementById('thankspopup').style.display='flex'
          document.getElementById('thankspopup').style.opacity='1'
          document.getElementById('thankspopup').style.zIndex='400'
           blurbody()
        }