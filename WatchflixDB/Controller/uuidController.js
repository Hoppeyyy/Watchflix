const Uuid = require('../Models/uuidModel')


/*
const postUuid = (req, res)=>{
  console.log("uuid", req.body)
  const newuuid = new Uuid()
  newuuid.uuid = req.body.uuid
  newuuid.stickers= req.body.stickers
  newuuid.reviews = req.body.reviews
  newuuid.save((err, done)=>{
  console.log(err)
  if(err) return res.status(500).send("cannot post id, stickers, and reviews")
  res.status(201).send("posted successfully")

})
}*/

const putUuid = (req,res)=>{
  console.log("put uuid", {uuid:req.body.uuid})
Uuid.findOne({uuid:req.body.uuid}, function(err, newuuid){
  if(!err){
    if(!newuuid){
      newuuid = new Uuid();
      newuuid.uuid = req.body.uuid;
    }
    newuuid.status = req.status;
    newuuid.save(function(err){
     console.log(err)
     if(err) return res.status(500).send("cannot put uuid")
     res.status(201).send("new uuid created")
    });
  }
});
}

const getUuid = (req, res)=>{
  //console.log("uuid",{uuid:req.query.uuid})
  Uuid.findOne({uuid:req.query.uuid})
  .populate("uuid")
  .exec((err,newuuid)=>{
   //console.log(newuuid)
    res.json(newuuid) 
  })
}

const updateUuid = (req,res)=>{
  console.log("update uuid",{uuid:req.body.uuid})
  console.log("uuid",req.body)
  Uuid.findByIdAndUpdate(req.body.uuid,req.body,(err,updates)=>{
    if(err) return res.status(400).send("not found")
      res.json(updates)
      console.log(updates)
});
}
module.exports = {
  putUuid,
  getUuid,
  updateUuid,

}