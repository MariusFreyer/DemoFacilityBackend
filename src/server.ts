import app from './App';
const PORT = process.env.HTTP_PORT;

app.listen (PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
