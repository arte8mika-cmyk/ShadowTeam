CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_ip VARCHAR(45), -- Изменили user_name на user_ip
    message_text TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
