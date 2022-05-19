class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        //openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {

        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);
        fetch('http://127.0.0.1:5000/predict', {
            //  fetch('http://201.185.43.141:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "Char", message: r.answer[1] };
                if(r.answer[0] == 'N')
                {
                    msg2 = { name: "Char", message: "No entendí tu pregunta, ¿podrías intentar de nuevo?"};

                }
                this.messages.push(msg2);
                this.updateChatText(chatbox)
                textField.value = ''
                //console.log(r.answer[0]);
                actualizarVideo(r.answer[0]);
            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                textField.value = ''
            });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "Char") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


document.getElementById("char-media").style.display = "flex";
document.getElementById("video").style.display = "none";
function actualizarVideo(nombreVideo) {  
    document.getElementById("video").style.height="0rem";
    setTimeout(() => {    
    if (nombreVideo === "pregunta 2") {
        document.getElementById("video").style.height="25rem";
        document.getElementById("video").style.display = "flex";
        document.getElementById("char-media").style.display = "none";
        document.getElementById("video").src = "https://www.youtube.com/embed/wJoTjpf6lF0?start=18";
    }
    else if (nombreVideo === "pregunta 1") {
        document.getElementById("video").style.height="25rem";
        document.getElementById("video").style.display = "flex";
        document.getElementById("char-media").style.display = "none";
        document.getElementById("video").src = "https://www.youtube.com/embed/0Uh0fzVrZtA";
    } else if (nombreVideo === "pregunta 5") {
        document.getElementById("video").style.height="25rem";
        document.getElementById("video").style.display = "flex";
        document.getElementById("char-media").style.display = "none";
        document.getElementById("video").src = "https://www.youtube.com/embed/wJoTjpf6lF0?start=128";
    } else if (nombreVideo === "pregunta 6") {
        document.getElementById("video").style.height="25rem";
        document.getElementById("video").style.display = "flex";
        document.getElementById("char-media").style.display = "none";
        document.getElementById("video").src = "https://www.youtube.com/embed/wJoTjpf6lF0?start=24";
    } else {
        document.getElementById("video").style.height="0rem";
        document.getElementById("video").style.display = "none";
        document.getElementById("video").src="";
        document.getElementById("char-media").style.display = "flex";
    }
}, 1000);
}




const chatbox = new Chatbox();
chatbox.display();