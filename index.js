const express = require('express');
const app = express();
app.use(express.json());

const connectDatabase = require("./src/database/database");
const User = require('./src/userModel/schema');

require("dotenv").config({
    path: "./src/config/.env"
});

const port = process.env.port;
const url = process.env.url;

app.listen(port, async() => {
    try {
        await connectDatabase(url);
        console.log(`Server is running on port ${port}`);
    }
    catch(error) {
        console.log(error)
    }
})

app.post("/api/users", async(request, response) => {
	try {
		const user = new User(request.body);
		await user.save();

		response.status(201).json({ message: 'User created successfully', user });
	} 
	catch (err) {
		if (err.code === 400) {
		return response.status(400).json({ error: err.message });
		}
		if (err.code === 11000) {
		return response.status(400).json({ error: 'Email already exists' });
		}
		response.status(500).json({ error: 'Internal Server Error' });
	}
})