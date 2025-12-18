// Переключение вкладок (Исправлено)
function switchView(btn, viewId) {
    // Убираем активность у всех кнопок и страниц
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Активируем нужную вкладку
    btn.classList.add('active');
    const targetPage = document.getElementById(viewId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Меняем заголовок в хедере
    const names = {
        'dashboard': 'Главная панель',
        'chat': 'Анонимный чат воркеров',
        'manuals': 'База знаний (Мануалы)',
        'services': 'Наши инструменты',
        'settings': 'Настройки профиля'
    };
    document.getElementById('current-tab-name').innerText = names[viewId];
}

// Авторизация по IP и работа с ником
async function initSession() {
    try {
        const res = await fetch('api.ipify.org');
        const data = await res.json();
        const ip = data.ip;
        
        document.getElementById('user-ip').innerText = ip;
        
        // Загружаем ник из памяти
        let savedNick = localStorage.getItem(`shadow_nick_${ip}`);
        if (!savedNick) {
            savedNick = `Worker_${ip.split('.').pop()}`;
            localStorage.setItem(`shadow_nick_${ip}`, savedNick);
        }
        
        applyNickname(savedNick);
    } catch (e) {
        applyNickname("Worker_Offline");
    }
}

function updateNickname() {
    const newNick = document.getElementById('input-nick').value;
    const ip = document.getElementById('user-ip').innerText;
    
    if (newNick.length < 3) return alert("Ник слишком короткий");
    
    localStorage.setItem(`shadow_nick_${ip}`, newNick);
    applyNickname(newNick);
    alert("Никнейм успешно изменен!");
}

function applyNickname(nick) {
    document.getElementById('display-nick').innerText = nick;
    document.getElementById('hero-name').innerText = nick;
    document.getElementById('input-nick').value = nick;
}

// Работа чата
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const chat = document.getElementById('chat-messages');
    const nick = document.getElementById('display-nick').innerText;
    
    if (input.value.trim() !== "") {
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        chat.innerHTML += `
            <div style="margin-bottom: 15px; border-left: 2px solid var(--accent); padding-left: 15px;">
                <small style="color: #777; font-size: 11px;">${nick} • ${time}</small>
                <div style="margin-top: 5px;">${input.value}</div>
            </div>
        `;
        input.value = "";
        chat.scrollTop = chat.scrollHeight;
    }
}

window.onload = initSession;
