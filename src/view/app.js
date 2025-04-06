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
const Policy =require("../route/admin_policy")
const Faq =require("../route/admin_faq")
const Member=require("../route/admin_member")
const About =require("../route/admin_about")
const Blog=require("../route/admin_blog")




const User_product=require("../route/User/user_product")
const User_category=require("../route/User/user_category")
const User_product_search=require("../route/User/user_product_search")
const User_login=require("../route/User/user_login")
const User_registation=require("../route/User/user_register")
const User_cart=require("../route/User/user_cart")

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

app.use("/member", express.static("src/member_image"))

app.use("/about", express.static("src/about_image"))

app.use("/blog", express.static("src/blog_image"))




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
app.use(Policy)

app.use(CatagorySearch)

app.use(Faq)

app.use(Member)

app.use(About)

app.use(Blog)


app.use(User_product_search)
app.use(User_category)
app.use(User_product)
app.use(User_cart)
app.use(User_login)
app.use(User_registation)


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