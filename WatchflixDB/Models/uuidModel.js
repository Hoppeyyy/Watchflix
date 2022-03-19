const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UuidSchema = new Schema({
 item:{type:mongoose.Types.ObjectId, ref:"Movie"}
,
 stickers:[{}]
,
 reviews:[{}]
});


const Uuid = mongoose.model("Uuid", UuidSchema);


module.exports = Uuid