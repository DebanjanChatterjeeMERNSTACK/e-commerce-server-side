const mongoose = require("mongoose")


const memberSchema = new mongoose.Schema({
   login_id: {
        type: String
    },
    member_Image: {
        type: String
    },
    member_Fullname: {
        type: String
    },
    member_Position: {
        type: String
    }
}, {
    timestamps: true
})
const MemberSchema = new mongoose.model("admin_member", memberSchema)
module.exports = MemberSchema