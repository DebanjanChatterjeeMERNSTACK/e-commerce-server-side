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
const Contact = require("../route/admin_contact")
const Catagory = require("../route/admin_catagory")
const Social = require("../route/admin_social_media")
const Logo=require("../route/admin_logo")
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




const corsOptions = {
  origin: '*', // Allow only frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "login_id"], // Allow custom headers
};
app.use(cors(corsOptions));
app.use(cors())

app.use(express.json())



app.use("/upload", express.static("src/product_image"))

app.use("/slider", express.static("src/slider_image"))

app.use("/catagory", express.static("src/catagory_image"))

app.use("/logo", express.static("src/logo_image"))



app.use(Registation)

app.use(Login)

app.use(Product)

app.use(Forget)

app.use(Slider)

app.use(ProductSearch)

//app.use(Productpagenation)

app.use(Contact)

app.use(Social)

app.use(Catagory)

app.use(Logo)

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