const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UuidSchema = new Schema({
 uuid:{type:mongoose.Schema.ObjectId, ref:"Movie", required: true, index: true}
,
 stickers:[]
,
 reviews:[]
});


const Uuid = mongoose.model("Uuid", UuidSchema);


module.exports = Uuid