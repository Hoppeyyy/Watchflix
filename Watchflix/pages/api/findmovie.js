import ax from "axios";
export default async function handler(req, res) {

  const { uuid } = req.query;
  //console.log("this is uuid",uuid);

  const movie = await ax.get("http://localhost:3001/findmovie?id=" + uuid)
  //var thismovie = {}; 
    //console.log("clicked movie",movie.data)
    //res.status(200).json(false);


    res.status(200).json(movie.data);
    console.log(movie.data)

    //res.status(200).json(false);

}  
