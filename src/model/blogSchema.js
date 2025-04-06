const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
   login_id: {
        type: String
    },
    blog_Image: {
        type: String
    },
    blog_Title: {
        type: String
    },
    blog_Description: {
        type: String
    }
}, {
    timestamps: true
})
const BlogSchema = new mongoose.model("admin_blog", blogSchema)
module.exports = BlogSchema