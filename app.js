async function loadProfile() {
    const infoElement = document.getElementById('user-info');
    const statsElement = document.getElementById('user-stats');

    try {
        const response = await fetch('http://localhost:3000/get-my-profile');
        
        if (!response.ok) {
            infoElement.innerText = "Профиль не найден для вашего IP.";
            return;
        }

        const data = await response.json();

        // Отображаем данные на странице
        infoElement.innerText = `Ваш ID: ${data.id}`;
        statsElement.innerHTML = `
            <p>Ваш зарегистрированный IP: <b>${data.ip}</b></p>
            <p>Дата регистрации: ${new Date(data.registered).toLocaleDateString()}</p>
        `;
    } catch (error) {
        infoElement.innerText = "Ошибка соединения с сервером.";
    }
}

// Запускаем при загрузке
window.onload = loadProf
  ile;
