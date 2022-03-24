import {Save, Read} from '@/utils/helpers';
import ax from 'axios';

export default async function handler(req, res) {
  
  const {uuid} = req.query;
  //console.log(uuid)
  try{
  //const json = await import(`@/saves/${uuid}.json`)
  //const book = await import(`@/saves/${uuid}.json`)
  const uuids = await ax.get("http://localhost:3001/getuuid?uuid=" + uuid)
  //console.log(json);
  //console.log(book);
  console.log(uuids.data);
 
  //res.status(200).json(json.default);
  res.status(200).json(uuids.data);
  //res.status(200).json(book);
}catch (e){
  res.status(200).json(false)
}
}