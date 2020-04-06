const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log('listening on '+PORT)
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ikmv:ikmv@cluster0-hnnbh.mongodb.net/TravelQueries?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err));

app.get('/',(req,res)=>{
    res.send('happy')
})

// app.get('/decode', require('./utils/auth-token').authenticateToken,(req,res)=>{
//     res.send(req.val)
// })

app.use('/query',require('./api/routes/query'))

app.use('/response',require('./api/routes/response'))

app.use('/comment',require('./api/routes/comment'))

app.use('/test',require('./test'))
//console.log(app._router.stack)
