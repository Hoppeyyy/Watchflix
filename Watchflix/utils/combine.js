// --------------------------- filtering ---------------------------------- //

function filtering(
  arr = [],

  config = {
    Title: null,
    Genre: null,
  }
) {
  const { Title, Genre } = config;
  const keyword = arr.value;

  if (Title || Genre) {

    const filtered_arr = arr.filter((o, i) => {
      var cond = false;

      if (Title) {
        cond = cond || o.Title.toUpperCase().includes(Title.toUpperCase());
      }

      if (Genre) {
        cond = cond || o.Genre.toUpperCase().includes(Genre.toUpperCase());
      }

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

export { filtering, sortArr };
