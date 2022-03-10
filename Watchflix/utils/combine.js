// --------------------------- filtering ---------------------------------- //
const rating = "IMDB_Score";
const year = "release_year";

function filtering(
  arr = [],

  config = {
    Title: null,
    Genre: null,
    // country: null,
    // director: null,
    // rating: null,
    // year: null,
    // listed_in: null,
    // duration: null,
  }
) {
  const { Title, Genre, country, director, rating } = config;
  const keyword = arr.value;

  if (Title || Genre || country || director || rating) {

    const filtered_arr = arr.filter((o, i) => {
      var cond = false;

      if (Title) {
        cond = cond || o.Title.toUpperCase().includes(Title.toUpperCase());
      }

      if (Genre) {
        cond = cond || o.Genre.toUpperCase().includes(Genre.toUpperCase());
      }

      // if (director) {
      //   cond = cond || o.director.toUpperCase().includes(director.toUpperCase());
      // }

      // if (country) {
      //   cond = cond || o.country.toUpperCase().includes(country.toUpperCase());
      // }

      // if (rating) {
      //   cond = cond || Number(o.IMDB_Score) >= Number(rating);
      // }

      // if (year) {
      //   cond = cond || Number(o.release_year) >= Number(year);
      // }

      //  if(rate){
      //    cond = cond || o.rating.toUpperCase().includes(rating.toUpperCase());
      //  }

      // if (listed_in) {
      //   cond = cond || o.listed_in.toUpperCase().includes(listed_in.toUpperCase());
      // }

      return cond;
    });
    return filtered_arr;
    console.log(filtered_arr);
  }
}

// -------------------- sorting ---------------------------- //
function sortArr(arr = [], config = { key: null, type: null }) {
  const { key, type } = config;

  if (key) {
    arr.sort((cur, next) => {
      var num1 = Number(cur[key]);
      var num2 = Number(next[key]);

      if (isNaN(cur[key])) {
        num1 = cur[key];
        num2 = next[key];
      }

      if (num1 > num2) {
        if (type && type == "asc") {
          return 1;
        } else {
          return -1;
        }
      }

      if (num1 < num2) {
        if (type && type === "asc") {
          return -1;
        } else {
          return 1;
        }
      }

      return 0;
    });
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
export { filtering, sortArr };
