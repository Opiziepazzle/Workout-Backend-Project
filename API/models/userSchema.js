const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
_id: mongoose.Types.ObjectId,
email: {
     type: String,
     required: true,
      unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},

password: { type: String, 
    required: true 
},

createdAt : {
    type: Date,
    default: Date.now
}
    
});

module.exports = mongoose.model('User', userSchema)