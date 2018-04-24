const login = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');

const EmailError = document.getElementById('emailError');
const passworderror = document.getElementById('passworderror');
login.addEventListener('submit', (e) => {
  e.preventDefault();
  const checkEmail = function() {
    if (email.validity.typeMismatch){
      displayErr(EmailError ,"please enter a valid email")
      }else{
        if (email.validity.valueMissing){
          displayErr(EmailError,"please Enter an email address")
        }else{
          displayErr(EmailError,"");
          return true;
        }

    }
  }

  const checkPw = function(){
  if (password.validity.patternMismatch) {
    displayErr(
      passworderror,
      "Password must contain at least eight characters, including one letter and one number"
    );
  } else if (password.validity.valueMissing) {
    displayErr(passworderror, "Please enter a password");
  } else {
    displayErr(passworderror, "");
    return true;
  }
};
function displayErr(errElem,errMes) {
  errElem.innerText = errMes;

}
email.addEventListener("focusout", checkEmail);
password.addEventListener("focusout", checkPw);

});



const data = {
  email:email.value,
  password: password.value
}
// console.log(data);


// fetch('/login',(err,res)=>{
//
// })
