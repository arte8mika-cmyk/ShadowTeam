const socket = io('https://shadowteam8.netlify.app/'); // Адрес вашего сервера

// ... (messagesEl, inputEl DOM элементы) ...

// Загрузка истории при старте
socket.on('history', (messages) => {
    messages.forEach(msg => addMessage(msg.user_ip, msg.message_text));
});

// Получение новых сообщений
socket.on('new-message', (data) => {
    addMessage(data.user_ip, data.message_text);
});

function sendMessage() {
    const text = document.getElementById('messageInput').value;
    if (text.trim() === '') return;

    // Отправляем ТОЛЬКО текст, сервер определит IP сам
    socket.emit('chat-message', { text: text });
    
    // Очищаем поле ввода
    document.getElementById('messageInput').value = '';
}

function addMessage(userIdentifier, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.innerHTML = `<strong>${userIdentifier}:</strong> ${text}`;
    messagesEl.appendChild(msgDiv);
    messagesEl.scrollTop = messagesEl.scrollHei
      ght;
}
