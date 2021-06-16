const chatBtn = document.querySelector('#chatBtn');
const chatRoom = document.querySelector('#chatRoom');
let socket = io();
let flag = undefined;

chatBtn.addEventListener('click', ()=>{
    switch(flag){
        case true:
            flag = false;
            chatRoom.style.display = 'none';
        break;
        case false:
            flag = true;
            chatBtn.innerHTML = '채팅';
            chatBtn.dataset.value = 0;
            chatRoom.style.display = 'block';
        break;
        case undefined:
            flag = true;
            getChatRoom();
        break;
    }
})

async function getChatRoom(){
    let url = 'http://localhost:3000/chat'
    let options = {method:'get'}
    let response = await fetch(url,options)
    let result = await response.text();

    if(isJson(result)){
        let json = JSON.parse(result);
        if(json.result == false) alert(json.msg)
            return
    } else{
        chatRoom.innerHTML = result;
        socketChat();
    }
}

function socketChat(){
    socket.on('connect',()=>{});

    socket.on('msg',data=>{
        chatBtn.dataset.value = parseInt(chatBtn.dataset.value)+1;
        if(flag==false){
            chatBtn.innerHTML = `채팅<span style="color:red; padding:2px;">${chatBtn.dataset.value}</span>`
        }
        addCard(data,'you')
    })
}


function send(){
    const msg = document.querySelector('#msg');
    console.log(msg.value);
    socket.emit('send',msg.value);
    addCard(msg.value,'my')
}

function addCard(){
    const div = document.createElement('div');
    const span = document.createElement('span');
    const chat = document.querySelector('#chat');

    span.innerHTML = text;
    span.classList.add(type);
    div.appendChild(span);
    chat.appendChild(div);
}

function isJson(str){
    try{
        let json = JSON.parse(str);
        return (typeof json == 'object')
    } catch(e){
        return false;
    }
}