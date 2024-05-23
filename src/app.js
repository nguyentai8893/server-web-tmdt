const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./ulti/dataBase');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const PORT = 8000;
const http = require('http');
const { setupSocket } = require('./socket');
// const { Server } = require('socket.io');
const userRouter = require('./routers/userRouter');
const productsRouter = require('./routers/productsRouter');
const messageRouter = require('./routers/messageRouter');
const cors = require('cors');
// Middleware Cors được trả về từ hàm cors()
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, 'access.log'),
	{ flags: 'a' }
);
const server = http.createServer(app);
// const io = new Server(server);
setupSocket(server);

// const authenticate = require('./Middleware/authenticate');

app.use(express.json()); // Middleware để phân tích dữ liệu JSON
app.use(express.urlencoded({ extended: true })); // Middleware để phân tích dữ liệu được mã hóa trong URL
app.use(morgan('combined', { stream: accessLogStream }));

app.use(
	cors({
		origin: ['http://localhost:3000', 'http://localhost:3001'],
		credentials: true,
	})
);

app.use(
	session({
		secret: 'your-secret-key', // Key bí mật để mã hóa phiên
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false, // Set true nếu sử dụng HTTPS
			httpOnly: true, // Cookie chỉ được truy cập thông qua HTTP, không qua JavaScript
			maxAge: 24 * 60 * 60 * 1000, // Thời gian sống của cookie, ở đây là 1 ngày
		},
	})
);
// Sử dụng cookie-parser middleware
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(userRouter);
app.use(productsRouter);
app.use(messageRouter);

// Xử lý lỗi khi không có tệp được tải lên
app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		res.status(400).json({ message: 'File upload error: ' + err.message });
	} else {
		res.status(500).json({ message: 'Internal server error' });
	}
});
db.connect()
	.then(() => {
		server.listen(process.env.PORT, () => {
			console.log(`app runing on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(console.log(err));
	});
