import { Save, Read } from "@/utils/helpers";
import ax from 'axios';
export default async function handler(req, res) {

  if (req.method === "PUT") {
    const {uuid} = req.body;
    console.log(uuid);
    const newuuid = {
      uuid,
      
  }
    //console.log(newuuid)
    const put = await ax.put("http://localhost:3001/putuuid",newuuid)

    //await Save(uuid,item);
   // res.status(200).json({ name: "John Doe" });
  }

if(req.method === "PATCH"){
  const { uuid, stickers, reviews} = req.body;
  //console.log(uuid, stickers, reviews);

  const updates = {
    uuid,
    stickers,
    reviews
}
//console.log(newuuid)
const patch = await ax.patch("http://localhost:3001/updateuuid", updates)
}

  if (req.method === "GET") {
  const { uuid } = req.query;
  console.log("this is uuid",uuid);
  try {
      //const json = await import(`@/saves/${uuid}.json`)
      const uuids = await ax.get("http://localhost:3001/getuuid?uuid=" + uuid)
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
