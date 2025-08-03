import express  from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("App is running...");
})

app.listen(PORT, () => {
    console.log("Server  is  running  at post: ", PORT);
})