import {Save, Read} from '@/utils/helpers';
import {filtering, sortArr} from '@/utils/combine';
import newmovie from '@/utils/newmovie.json';
import { GoToPage } from '@/utils/func';


export default async function handler(req, res) {

  //HELPER FUNCTIONS FOR YOU TO USE!
  //console.log(req.query, req.body)
  //await Save("test", json);
  //const files = await Read();

  //detect if filter/save/read
  //const lists = [];
  //res.status(200).json([]);

  const { txt, sort_rating, sbr_year, sbr_type, sbd_type, sby_type } = req.query;
  
  var lists =[];

  // if(!txt){
  //   lists = newmovie
  // } 
  
  if(txt){
    lists = filtering(newmovie,{
      Title:txt,
      Genre:txt,
      director:txt,
      country:txt,
      listed_in:txt,
      rating:txt
    })
    
  } else {
    lists = newmovie
  } 

  if(sort_rating){
    lists = sortArr(lists,{
      key:'IMDB Score',
      type:sbr_type
    })
  }  

  // if(sbr_year){
  //   lists = sortArr(lists,{
  //     key:'release_year',
  //     type:sby_type
  //   })
  // }

  // let sort_direct = "asc"
  // if(sort_direct){
  //   lists = lists.sort((a, b) => {
  //     if(sort_direct === "asc") {
  //       if( a.Title > b.Title) return 1
  //       if( a.Title < b.Title) return -1

  //     } else {
  //       if( a.Title > b.Title) return -1
  //       if( a.Title < b.Title) return 1
  //     }

  //     return 0
  //   })
  // }

  let sort_alpha = "asc"
  if(sort_alpha){
    lists = lists.sort((a, b) => {
      if(sort_alpha === "asc") {
        if( a.Title > b.Title) return 1
        if( a.Title < b.Title) return -1

      } else {
        if( a.Title > b.Title) return -1
        if( a.Title < b.Title) return 1
      }
      return 0
    })
  }
  

  // if(sort_direct){
  //   lists = sortArr(lists,{
  //     key:'director',
  //     type:sbd_type
  //   })
  // }

  const nummovies = lists.length;
  
  if(req.query.page){
    const numresults = req.query.num ;
    
    lists = GoToPage(req.query.page, lists, numresults);
  }
  
  //lists = lists.slice(0,10);

  res.status(200).json({lists, nummovies});
}
