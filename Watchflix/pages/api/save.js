import { Save, Read } from "@/utils/helpers";
import ax from 'axios';
export default async function handler(req, res) {

  if (req.method === "POST") {
    const { uuid,stickers, reviews} = req.body;
    console.log(uuid, stickers, reviews);
  
    const newuuid = {
      uuid,
      stickers,
      reviews
  }
console.log(newuuid)
    const post = await ax.post("http://localhost:3001/postuuid",newuuid)

    //await Save(uuid,item);
   // res.status(200).json({ name: "John Doe" });
  }
  
if(req.method === "PATCH"){
  const { uuid, stickers, reviews} = req.body;
  console.log(uuid, stickers, reviews);

  const newuuid = {
    uuid,
    stickers,
    reviews
}
console.log(newuuid)
const patch = await ax.patch("http://localhost:3001/updateuuid",newuuid)
}

  if (req.method === "GET") {
    const {uuid} = req.query;
    //console.log(uuid);
  try {
      //const json = await import(`@/saves/${uuid}.json`)
      const uuids = await ax.get("http://localhost:3001/getuuid")
      //console.log(uuids)
      //const favs = await import(`@/saves/${uuid}.json`);
      //res.status(200).json(json,favs);
      //res.status(200).json(json.default);
      res.status(200).json(uuids.data);
    } catch (e) {
      res.status(200).json(false);
    }
  }
}
