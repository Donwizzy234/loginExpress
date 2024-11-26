
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000; 


app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ 
    secret: 'your_secret_key', 
    resave: false, 
    saveUninitialized: true 
}));

const users = {
    user1: 'password123' 
};


app.use(express.static('public'));


app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html'); 
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    
    if (users[username] && users[username] === password) {
        req.session.user = username; 
        res.send('Login successful! Welcome ' + username); 
    } else {
        res.send('Invalid username or password'); 
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(); 
    res.send('Logged out successfully'); 
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});