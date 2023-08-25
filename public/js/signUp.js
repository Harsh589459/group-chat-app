const endpoint = 'http://localhost:3000'


async function getSignupPage(){
    console.log("first")
    axios.get(`${endpoint}`)
}
addEventListener("DOMContentLoaded",getSignupPage);
