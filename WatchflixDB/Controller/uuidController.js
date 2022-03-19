const Uuid = require('../Models/uuidModel')

const postUuid = (req, res)=>{
  console.log("uuid",req.body)
  const newuuid = new Uuid()
  newuuid.item = req.body.uuid
  newuuid.stickers= req.body.stickers
  newuuid.reviews = req.body.reviews
  newuuid.save((err, done)=>{
  console.log(err)
  if(err) return res.status(500).send("cannot post uuid info")
  res.status(201).send("uuid posted successfully")

})
}

const getUuid = (req,res)=>{
  console.log("uuid",req.body)
  Uuid.findOne({item:req.query.uuid},(err,newuuid)=>{
    console.log(newuuid)
    res.json(newuuid) 
  }).populate("item")

}
const updateUuid = (req,res)=>{
  Uuid.findByIdAndUpdate(req.body.id,req.body,(err,newuuid)=>{
      if(err) return res.status(400).send("item not found")
      res.json(newuuid)
  })
}
module.exports = {
  postUuid,
  getUuid,
  updateUuid
}