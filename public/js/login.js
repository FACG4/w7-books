const login = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');

const EmailError = document.getElementById('emailError');
const passworderror = document.getElementById('passworderror');
login.addEventListener('submit', (e) => {
  e.preventDefault();
  var checkEmail => {
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

  function displayErr(errElem,errMes) {
    errElem.innerText = errMes;

  }
      // const data = {
  //   email:email.value,
  //   password: password.value
  // }
// console.log(data);
});




// fetch('/login',(err,res)=>{
//
// })
