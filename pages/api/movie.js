import {Save, Read} from '@/utils/helpers';
import {movie, filtering, sortArr} from '@/utils/combine';


export default async function handler(req, res) {

  //HELPER FUNCTIONS FOR YOU TO USE!
  //console.log(req.query, req.body)
  //await Save("test", json);
  //const files = await Read();

  //detect if filter/save/read
  //const lists = [];
  //res.status(200).json([]);

  const { txt,sort_rating,sbr_type } = req.query;
  var lists =[];
  if(txt){
    lists = filtering(movie(),{
      Title:txt,
     })
  }
  if(sort_rating){
    lists = sortArr(lists,{
      key:'IMDB Score',
      type:sbr_type
    })
  }
  //lists = lists.slice(0,10);
  res.status(200).json(lists);
}
