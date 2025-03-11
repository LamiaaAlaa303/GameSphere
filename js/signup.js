var signup=document.getElementById("signup");
var username=document.getElementById("username");
var useremail=document.getElementById("useremail");
var userpassword=document.getElementById("userpassword");
var emailMessage=document.getElementById("emailMessage");
var emailexist=document.getElementById("emailexist");
var incorrect=document.getElementById("incorrect");
var correct=document.getElementById("correct");
var nameMessage=document.getElementById("nameMessage");
var passMessage=document.getElementById("passMessage");
var userslist=[];

if (localStorage.getItem("users")!=null){
    userslist=JSON.parse(localStorage.getItem("users"));
    }
signup.addEventListener("click",function(){
    signupfunc()

})


function signupfunc() {
    var user = {
      uname: username.value,
      uemail: useremail.value,
      upassword: userpassword.value,
    };
  
    if (isEmpty() === true) {
      incorrect.classList.remove("d-none");
      correct.classList.add("d-none");
    } else if (emailvaildation() === false) {
      emailMessage.classList.remove("d-none");
      correct.classList.add("d-none");
    } else if (nameVaildation() === false) {
        nameMessage.classList.remove("d-none");
        correct.classList.add("d-none");
      
    }  else if (passwordVaildation() === false) {
        passMessage.classList.remove("d-none");
        correct.classList.add("d-none");
      
    } else {
      if (emailExists(user.uemail.toLowerCase())) {
        emailexist.classList.remove("d-none");
        correct.classList.add("d-none");
      } else {
        userslist.push(user);
        localStorage.setItem("users", JSON.stringify(userslist));
        console.log(userslist);
        correct.classList.remove("d-none");
        emailexist.classList.add("d-none");
      }
    }
  }


function emailExists(email) {
    for (var i = 0; i < userslist.length; i++) {
      if (userslist[i].uemail.toLowerCase() === email.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
function isEmpty(){
    if(username.value==""||userpassword.value==""||useremail.value==""){
        incorrect.classList.remove("d-none")
     
     return true; 
    }else{
        incorrect.classList.add("d-none")  
        return false;
    }
}

function emailvaildation(){
    var text=useremail.value;
    var regexEmail= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com)$/
    if(regexEmail.test(text)){
     
        emailMessage.classList.add("d-none")
      return true;
    }else{
       
        emailMessage.classList.remove("d-none")
      return false;
  
    }
}
function nameVaildation(){
    var text=username.value;
    var regexname= /^[A-Z a-z]{3,}$/
    if(regexname.test(text)){
     
        nameMessage.classList.add("d-none")
      return true;
    }else{
       
        nameMessage.classList.remove("d-none")
      return false;
  
    }
}
function passwordVaildation(){
    var text=userpassword.value;
    var regexpass= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{4,}$/gm
    if(regexpass.test(text)){
     
        passMessage.classList.add("d-none")
      return true;
    }else{
       
        passMessage.classList.remove("d-none")
      return false;
  
    }  
}