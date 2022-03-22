const Uuid = require('../Models/uuidModel')

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
  console.log("uuid",req.body.uuid)
  Uuid.findOneAndUpdate(req.body.uuid,req.body,(err,updates)=>{
    if(err) return res.status(400).send("not found")
      res.json(updates)
      console.log("updates",updates)
});
}
module.exports = {
  putUuid,
  getUuid,
  updateUuid,

}