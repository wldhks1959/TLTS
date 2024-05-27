const express = require('express');
const app = express();
const path = require('path');

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on url : http://localhost:${PORT}/`);
});