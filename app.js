const express = require('express')
const app =express();
// const cors = require('cors')

//routes imported
const userRoutes = require('./routes/userRoutes')




app.use(express.json());
// app.use(cors({

// }));
app.use('/',userRoutes);
app.use('/user',userRoutes);

app.listen(3000);