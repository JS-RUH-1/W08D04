const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const books = require('./routes/books');
const authors = require('./routes/authors');
const app = express()
const port = 8080;
// base64 to avoid my email getting spam with protection services
const connectionLink = Buffer.from('bW9uZ29kYitzcnY6Ly9yaXlhZGh0aWNrZXRzOlQxMjMxMjMxMjNAY2x1c3RlcjAudG42d24ubW9uZ29kYi5uZXQvVzA4RDAzSFc/YXV0aFNvdXJjZT1hZG1pbiZyZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHk=','base64').toString('ascii');
mongoose.connect(connectionLink);

app.use(cors());
app.use(express.json());
app.use('/books', books);
app.use('/authors', authors);


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
