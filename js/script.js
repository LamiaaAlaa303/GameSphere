 var loginbtn=document.getElementById("loginbtn")
 var useremail=document.getElementById("useremail");
 var  userpassword=document.getElementById("userpassword");
 var incorrect=document.getElementById("incorrect");
 var correct=document.getElementById("correct");
 var wrong=document.getElementById("wrong");

function login(){
  var email = useremail.value;
  var password = userpassword.value;

  var userslist = JSON.parse(localStorage.getItem("users")) || [];
    if (isEmpty()==true){
      incorrect.classList.remove("d-none") ;
        document.getElementById('incorrect').innerHTML ="All inputs is required"    
        wrong.classList.add("d-none") ;
        
    }else if (userslist.length==0){
      incorrect.classList.add("d-none") ;
        wrong.classList.remove("d-none") ;
       wrong.innerText = "Incorrect Email or Password";
       
     }
    
 
    else{
  console.log(userslist)
    for(var i=0;i<userslist.length;i++){
       
        if (
            userslist[i].uemail.toLowerCase() == email.toLowerCase() &&
            userslist[i].upassword.toLowerCase() == password.toLowerCase()
          ) {
            localStorage.setItem("logInUser", userslist[i].uname);
            console.log("success");
            correct.innerText = "Success";
            window.location="./pages/games.html";
            
          } else {
            
            incorrect.classList.add("d-none") ;
            wrong.classList.remove("d-none") ;
            wrong.innerText = "Incorrect Email or Password";
          }
    }
}}
    
// }
function isEmpty(){
    if(useremail.value==""||userpassword.value==""){
     return true;
    }
}
loginbtn.addEventListener("click",function(){
    login()

})

