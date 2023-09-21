"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// 미들웨어 설정
app.use(body_parser_1.default.json());
// 간단한 유저 데이터 배열
const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
];
// 모든 유저를 반환
app.get('/api/users', (req, res) => {
    res.json(users);
});
// 특정 ID의 유저를 반환
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
// 새로운 유저 추가
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
