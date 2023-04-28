const express = require('express')
const userRouter = require('./routers/userRoutes/userRouter')
const venueRouter = require('./routers/venueRoutes/venueRouter')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json())
app.use(cors())
app.use(userRouter)
app.use(venueRouter)
app.listen(3001,()=>{
    console.log('server started...');
})