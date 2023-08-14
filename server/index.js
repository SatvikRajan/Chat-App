const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('../server/routes/UserRoutes')
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use("/api/auth",userRoutes)
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chat');
    console.log('DB connected succesfully')
}
main() .catch((err)=>{
    console.log(err)
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})