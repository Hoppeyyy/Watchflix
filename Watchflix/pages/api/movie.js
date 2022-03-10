import { Save, Read } from "@/utils/helpers";
import { filtering, sortArr } from "@/utils/combine";
//import newmovie from "@/utils/newmovie.json";
import { GoToPage } from "@/utils/func";
import ax from "axios";
export default async function handler(req, res) {
  //HELPER FUNCTIONS FOR YOU TO USE!
  //console.log(req.query, req.body)
  //await Save("test", json);
  //const files = await Read();

  //detect if filter/save/read
  //const lists = [];
  //res.status(200).json([]);

  const { txt, sort_alpha, sba_type, sort_rating, sbr_type, sort_type } = req.query;
  const movies = await ax.get("http://localhost:3001/getmovies")
  var lists = [];
  //console.log(movies.data)
  // if(!txt){
  //   lists = newmovie
  // }

  if (txt) {
    lists = filtering(movies.data, {
      Title: txt,
      Genre: txt,
      director: txt,
      country: txt,
      rating: txt,
    });
  } else {
    lists = movies.data;
  }

  if(sort_rating){
    lists = lists.sort((a, b) => {
      if(sort_rating === "asc") {
        if( a.IMDB_Score > b.IMDB_Score) return 1
        if( a.IMDB_Score < b.IMDB_Score) return -1

      } else {
        if( a.IMDB_Score > b.IMDB_Score) return -1
        if( a.IMDB_Score < b.IMDB_Score) return 1
      }
      return 0
    })
  }

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
 
  const nummovies = lists.length;

  if (req.query.page) {
    const numresults = req.query.num;

    lists = GoToPage(req.query.page, lists, numresults);
  }

  //lists = lists.slice(0,10);

  res.status(200).json({ lists, nummovies });
}
