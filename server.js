// Установите: npm install express socket.io pg cors
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Pool } = require('pg');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); 

const pool = new Pool(/* ваши данные подключения к БД */);

io.on('connection', (socket) => {
    // Определяем IP пользователя при подключении (работает на хостинге)
    const userIp = socket.handshake.headers['x-forwarded-for'] || socket.conn.remoteAddress;
    console.log(`Пользователь ${userIp} подключился`);

    // 1. При подключении отдаем историю из БД
    pool.query('SELECT * FROM messages ORDER BY timestamp ASC', (err, res) => {
        if (!err) {
            socket.emit('history', res.rows); // Отправляем историю клиенту
        }
    });

    // 2. Ловим новое сообщение от этого пользователя
    socket.on('chat-message', (data) => {
        const messageText = data.text;
        
        // Сохраняем в БД с его IP
        pool.query('INSERT INTO messages (user_ip, message_text) VALUES ($1, $2)', [userIp, messageText]);
        
        // Отправляем всем остальным с указанием IP отправителя
        io.emit('new-message', { user_ip: userIp, message_text: messageText, timestamp: new Date() });
    });
});

server.listen(3000, () => console.log('Чат-сервер запущен на порту 30
                                      00'));
