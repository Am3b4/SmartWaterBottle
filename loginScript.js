const loginButton = document.getElementById("loginButton");
const email = document.getElementById("email");
const pw = document.getElementById("password");

const xhr = new XMLHttpRequest();

loginButton.addEventListener("click", loginRequest);

async function loginRequest() {

  if ((!email.value) || (!pw.value)){
    console.log('Missing Param');
    console.log(email.value);
    console.log(pw.value);
  }
  else{

    bodyRequst = JSON.stringify(
      {email: email.value, 
      password: pw.value}
    )

    requestMethod = 'POST'

    response = await SendRequest('http://127.0.0.1:8000/login', bodyRequst, requestMethod)

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