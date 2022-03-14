import {Save, Read} from '@/utils/helpers';

export default async function handler(req, res) {

  if(req.method === 'POST'){
  const {uuid,result, ns} = req.body;
  console.log(uuid,result);
  await Save (uuid,result,ns);
  res.status(200).json({ name: 'John Doe' })
  }
  
  if(req.method === 'GET'){
    const { uuid, ns }= req.query;
    console.log(uuid, ns);
  try{
    const results = await import (`@/saves/${uuid}.json`);
    res.status(200).json(results);
  
    }catch(e){
  
      res.status(200).json(false);
    }
   
  }
}


// export default async function handler(req, res) {   

//   const{uuid, movies} = req.body;

//   await Save(uuid, {movies});
//   res.status(200).json({ name: 'John Doe' })  
// }


