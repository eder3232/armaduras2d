export function twoDimensionArray(a, b) {
  // a= filas
  // b=columnas
  let arr = []

  // creating two dimensional array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i] = []
    }
  }

  // inserting elements to array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i][j] = 0
    }
  }
  return arr
}
