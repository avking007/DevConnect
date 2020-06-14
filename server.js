const express = require('express');
const connect = require('./config/db');

const app = express();

connect();
app.get('/', (req, res) => res.send('API running'));

//middleware
app.use(express.json({ extended: false }));

//define routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
