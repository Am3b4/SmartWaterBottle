import * as argon2 from "argon2";

const loginButton = document.getElementById("registerButton");
const email = document.getElementById("email");
const pw = document.getElementById("password");
const cpw = document.getElementById("ConfirmPassword");
const errorMsg = document.getElementById("ErrorText")

const xhr = new XMLHttpRequest();

loginButton.addEventListener("click", registerButton);

async function registerButton() {

  if ((!email.value) || (!pw.value) || (!cpw.value)){
    errorMsg.textContent = 'Missing Parameter'
    console.log(email.value);
    console.log(pw.value);
    console.log(cpw.value);
    return ;
  }
  else{

    if (pw.value!=cpw.value){
        errorMsg.textContent = 'Passwords not matching';
        return ;
    }

    
    salt = await SendRequest('http://127.0.0.1:8000/getSalt', '', 'GET')
    hashed = argon2.hash({pw: 'password', salt: 'somesalt' })
    console.log(hashed)

    bodyRequst = JSON.stringify({
        email: email.value, 
        password: pw.value
    })

    response = await SendRequest('http://127.0.0.1:8000/login', bodyRequst, 'POST');
    console.log(salt)

  }
}

async function SendRequest(url, jsonBody, requestMethod) {
  try {
    if (requestMethod=='GET'){
      (async () => {
        const rawResponse = await fetch(url, {
          method: requestMethod});

        const content = await rawResponse.json();
      
        console.log(content);
        return content;
      })();
    }
    else{
      (async () => {
          const rawResponse = await fetch(url, {
            method: requestMethod,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: jsonBody});

          const content = await rawResponse.json();
        
          console.log(content);
          return content;
        })();}

  } catch (error) {
      console.log(response.body)
    console.error(error);
    return error;
  }
}