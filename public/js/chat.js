const endpoint = 'http://localhost:3000'

const sendMessage = document.getElementById("messageTextArea");
const sendBtn = document.getElementById("messageSendBtn");

async function messageSend() {
  try {
    const message = sendMessage.value;
    sendMessage.value="";
    const token = localStorage.getItem("token");
    const data={
        message
    }
    const res = await axios.post(
      `${endpoint}/chat/sendMessage`,
      data,
      { headers: { Authorization: token } }
    );
  } catch (error) {
    console.log("something went wrong");
  }
}

sendBtn.addEventListener("click", messageSend);