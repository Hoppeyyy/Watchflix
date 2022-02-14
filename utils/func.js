export function GoToPage(p=1, movies=[]){
  const lists = movies.slice((p-1)*10, p*10);

  console.log(lists);
  return lists;
}