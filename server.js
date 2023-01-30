const express = require('express');
const connect = require('./config/db');
const path = require('path');

const app = express();

connect();

//middleware
app.use(express.json({ extended: false }));

//define routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));

// server static assets
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
