
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

// Retrieve the token from the cookie
function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}


const socket = io('http://localhost:4304', {
    auth: {
        id: getCookie("jwt"),
        username: 'tester1',
    }
})

const name = 'Kim'
appendMessage('You joined')

socket.on('chat-message', data => {
    console.log(data);
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const messageData = {}
    messageData.message = messageInput.value.split(' ')[1]
    messageData.to = messageInput.value.split(' ')[0]
    messageData.from = ''
    messageData.name = 'Tester'
    appendMessage(`You: ${messageData.message}`)
    socket.emit('chat-message', messageData)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}