const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Message, User } = require("./db");
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", async (req, res) => {
	const message = await Message.find();
	console.log(message);
	res.send(message);
});

io.on("connection", (socket) => {
	console.log(socket.id);
	socket.on("send_message", (message, user, room) => {
		io.emit("write_message", message, user, room);
	});
});

app.post("/", async (req, res) => {
	const message = new Message({
		author: req.body.author,
		message: req.body.message,
		room: req.body.room,
	});
	try {
		await message.save();
		res.status(201).send(message);
	} catch (err) {
		res.sendStatus(400);
	}
});

app.post("/chatters", async (req, res) => {
	const user = new User({
		username: req.body.username,
	});
	try {
		await user.save();
		res.status(201).send(user);
	} catch (err) {
		res.sendStatus(400);
	}
});
