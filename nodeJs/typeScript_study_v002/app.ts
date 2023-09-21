import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(bodyParser.json());

// 간단한 유저 데이터 배열
const users: { id: number; name: string }[] = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
];

// 모든 유저를 반환
app.get('/api/users', (req: Request, res: Response) => {
    res.json(users);
});

// 특정 ID의 유저를 반환
app.get('/api/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// 새로운 유저 추가
app.post('/api/users', (req: Request, res: Response) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});