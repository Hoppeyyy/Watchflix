// --------------------------- filtering ---------------------------------- //
const rating = 'IMDB Score';

function filtering(
  arr = [],
  
  config={Title: null, Genre:null, duration:null, rating:null, country:null, listed_in:null, director:null}
  
){

  const {Title, Genre, duration, rating, country, listed_in, director} = config;
  const keyword = arr.value;
  
  if(Title || Genre || duration || rating || country || listed_in || director ){
    
    const filtered_arr = arr.filter((o)=>{
      var cond = false;

      if(Title){
        cond = cond || o.Title.toUpperCase().includes(Title.toUpperCase());
      }

      if(Genre){
        cond = cond || o.Genre.toUpperCase().includes(Genre.toUpperCase());
      }

      // if(listed_in){
      //   cond = cond || o.listed_in.toUpperCase().includes(listed_in.toUpperCase());
      // }

      if(director){
        cond = cond || o.director.toUpperCase().includes(director.toUpperCase());
      }      

      if(country){
        cond = cond || o.country.toUpperCase().includes(country.toUpperCase());
      }   
      
      // if(duration){
      //   // cond = cond && o.duration.includes(duration); 
      //   cond = cond || Number(o.duration) >= Number(duration);
      //  }

      if(rating){
        // cond = cond && o.duration.includes(duration); 
        cond = cond || Number(o.IMDB_Score) >= Number(rating);
       }
 
      //  if(rating){
      //    cond = cond || o.rating.toUpperCase().includes(rating.toUpperCase());
      //  }

      return cond;
    })
    return filtered_arr;
    console.log(filtered_arr);
  } 
}
/*
console.log(filtering(movie(),{
  duration:120
}))
*/
// -------------------- sorting ---------------------------- //
function sortArr(
  arr=[],
  config={key:null, type:null }
){

  const {key, type} = config;

  if(key){

  arr.sort((cur,next) =>{

    var num1 = Number(cur[key]);
    var num2 = Number(next[key]);

    if(isNaN(cur[key])){
      num1 = cur[key];
      num2 = next[key];
    }

    if(num1 > num2){    
     
      if(type && type == "asc"){
      return 1;
    }
    else { 
      return -1;
    }

    }

      if(num1 < num2){

        if(type && type === "asc"){
          return -1;
        }
        else{ 
          return 1;
        }
    }

    return 0;
  })
  return arr;
}
}


/*
console.log(sortArr(movie(),{
  //key:'IMDB Score',type:'asc',
  //key:'duration', type:"asc"
}))
*/
// export {movie, filtering, sortArr }
export { filtering, sortArr }


