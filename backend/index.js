const express = require('express');
const aiRoutes = require('./src/routes/ai.route')
const cors = require('cors')
const app = express();
// require('dotenv').config();
const PORT =3000;

app.use(cors({origin: "*"}));
app.use(express.json());
app.use('/ai',aiRoutes);

app.get('/',(req,res)=>{
    res.send("Naimish Omar");
})


app.listen(PORT,()=>{
    console.log('Server is running on PORT:',PORT);
})