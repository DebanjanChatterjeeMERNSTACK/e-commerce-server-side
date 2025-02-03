const express = require("express")
const app = express()
const cors = require("cors")
require("../db/db")
const Registation = require("../route/admin_register")
const Slider = require("../route/admin_slider")
const Login = require("../route/admin_login")
const Product = require("../route/admin_product")
const Forget = require("../route/admin_forget")
const ProductSearch = require("../route/admin_product_search")
//const Productpagenation = require("../route/admin_product_pagination")
//const Contact = require("../route/admin_contact")
const Catagory = require("../route/admin_catagory")
//const Review = require("../route/admin_review")
//const Catagorypagenation = require("../route/admin_catagory_pagination")
const CatagorySearch =require("../route/admin_catagory_search")


// const socketIO = require('socket.io');
// const http = require("http")
// const Products = require("../model/productSchema")



const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT


// const server = http.createServer(app);
// const io = socketIO(server);



app.use(cors())

app.use(express.json())



app.use("/upload", express.static("src/upload"))

app.use("/slider", express.static("src/slider"))

app.use("/catagory", express.static("src/catagory"))



app.use(Registation)

app.use(Login)

app.use(Product)

app.use(Forget)

app.use(Slider)

app.use(ProductSearch)

//app.use(Productpagenation)

//app.use(Contact)

//app.use(Review)

app.use(Catagory)

//app.use(Catagorypagenation)

app.use(CatagorySearch)





// io.on('connection', (socket) => {
//     console.log('A user connected');


//     socket.on('getTasks', async () => {
//         const tasks = await Products.find({});
//         io.to(socket.id).emit('tasks', tasks);
//         io.emit('tasks', tasks);
//     });
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// })


app.listen(PORT, () => {
    console.log("Server Connact")
})