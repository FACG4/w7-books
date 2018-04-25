const select = (selector) => document.querySelector(selector);
var form = select('#signUpForm')

form.addEventListener('submit',function(event){

  var lname = select('#lname').value
  var fname= select('#fname').value
  var email = select('#email').value
  var password = select('#password').value
  var cPassword = select('#psw-repeat').value
  var message=select('#message')

 select('#isa_error').classList.add("isa_error");

  var emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}/
  
 if (!email) {
    message.textContent='Should enter an email address'
    event.preventDefault();
  }
  else if (!email.match(emailRegex)) {
    message.textContent='Please enter a valid email address '
    event.preventDefault();
  }
  else if (password.length<8) {
    message.textContent='Your password must be at least 8 characters long.'
    event.preventDefault();
  }
  else if (!password.match(/^(?=.*[a-z]).+$/)) {
    message.textContent='Your password must contain a lowercase letter.'
    event.preventDefault();
  }
  else if (!password.match(/^(?=.*[A-Z]).+$/)) {
    message.textContent='Your password must contain an uppercase letter.'
    event.preventDefault();
  }
  else if (!password.match(/^(?=.*[0-9_\W]).+$/)) {
    message.textContent='Your password must contain a number or special character.'
    event.preventDefault();
  }

  else if (password!=cPassword) {
    message.textContent='Opps password not matching';
    event.preventDefault();
    
  }
  else{
    select('#isa_error').classList.remove("isa_error");
  }

})
