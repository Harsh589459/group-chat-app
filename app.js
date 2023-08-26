const express = require('express')
const app =express();
// const cors = require('cors')

//routes imported
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')




app.use(express.json());
// app.use(cors({

// }));
app.use('/',userRoutes);
app.use('/user',userRoutes);
app.use('/chat',chatRoutes)

app.listen(3000);