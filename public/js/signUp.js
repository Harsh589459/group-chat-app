const endpoint = 'http://localhost:3000'

const signUpBtn = document.querySelector('button')
const userExist = document.getElementById('user-exists')
const togglePasswordButton = document.getElementById('toggle-password');
let passwordcontent = document.getElementById('password');




async function postSignupPage() {
    let name = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let number = document.getElementById('phone').value;
    let password = passwordcontent.value;


    clearValidationErrors();
    let emptyField = false;
        
        if (!name) {
            showValidationError('username-error', 'Username is required*');
            emptyField = true;
        }
        
        if (!email) {
            showValidationError('email-error', 'Email is required*');
            emptyField = true;
        }
        
        if (!number) {
            showValidationError('phone-error', 'Phone number is required*');
            emptyField = true;
        }
        
        if (!password || password.length<8) {
            if(password.length<8){
                showValidationError('password-error', 'Password should be of 8 characters*');
            }
            else{
                showValidationError('password-error', 'Password is required*');


            }
            emptyField = true;
        }
        if(emptyField){
            return;
        }

    const data = {
        name,
        email,
        number,
        password
    }
    try{
    const response = await axios.post(`${endpoint}/user/signup`,data);
    console.log(response.status);
    console.log(response.data)
     alert("Successfully Signed Up")
     window.location.href = "/login"; 
    }catch(err){
        if(err.response.status=409){
            userExist.style.display='block';
            console.log("first")
        }
        console.log(err);
        
    }
}


function showValidationError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.validation-error');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function showHidePassword(){
    console.log(passwordcontent)
    if (passwordcontent.type === 'password') {
        passwordcontent.type = 'text';
        togglePasswordButton.textContent = 'Hide';
    } else {
        passwordcontent.type = 'password';
        togglePasswordButton.textContent = 'Show';
    }

}

togglePasswordButton.addEventListener('click',showHidePassword);

signUpBtn.addEventListener('click',postSignupPage);
