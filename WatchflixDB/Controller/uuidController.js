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
  Uuid.findOne({uuid:req.query.uuid})
  .populate("uuid")
  .exec((err,newuuid)=>{
    res.json(newuuid) 
  })
}

const updateUuid = (req,res)=>{
  console.log(req.body)
  Uuid.findOneAndUpdate(req.body.uuid,req.body,(err,updates)=>{
    if(err) return res.status(400).send("not found")
      res.json(updates)
      console.log("updates",updates)
});
// Uuid.findOne({uuid: req.body.uuid},(err,uuid)=>{
//   uuid.reviews.push(req.body.review)
//   uuid.save()
// })
}


module.exports = {
  putUuid,
  getUuid,
  updateUuid,

}