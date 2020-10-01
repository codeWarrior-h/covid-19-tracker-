export const sortData = (data) => {
  const sortedData = [...data]; //pass the data as it is in the sortedData as array

  sortedData.sort((a, b) => {
    if (a.cases < b.cases) {
      return 1;
    } else {
      return -1;
    }
  })
  return sortedData; //return the sorted array
}
