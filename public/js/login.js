const endpoint = 'http://localhost:3000'

const signUpBtn = document.querySelector('button')
const togglePasswordButton = document.getElementById('toggle-password');
let passwordcontent = document.getElementById('password');




async function postSignupPage() {
    let email = document.getElementById('email').value;
    let password = passwordcontent.value;


    clearValidationErrors();
    let emptyField = false;
        
        if (!email) {
            showValidationError('email-error', 'Email is required*');
            emptyField = true;
        }
        
        
        
        if (!password ) {
            
                showValidationError('password-error', 'Password is required*');
            emptyField = true;
        }
        if(emptyField){
            return;
        }

    const data = {
        email,
        password
    }
    try{
    const response = await axios.post(`${endpoint}/user/login`,data);
    console.log(response.status);
     alert("Logged in successfull")
    //  window.location.href = "/login"; 
    }catch(err){
        // if(err.response.status=409){
        //     showValidationError('email-error', 'User already exists, Please Sign In');
        //     console.log("first")
        // }
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
