const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
_id: mongoose.Types.ObjectId,

title: { type: String, 
    required: true 
},

reps : {
    type: Number,
    required: true
},
load : {
    type: Number,
    required: true
},

createdAt : {
    type: Date,
    default: Date.now
}
    
});

module.exports = mongoose.model('Workout', workoutSchema)