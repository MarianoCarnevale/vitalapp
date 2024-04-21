export const filter = (array, condition, value) => {
  //SI el valor existe
  if(value){
    //Agregamos una condicion
    array.push(` AND ${condition} = ${value}`)
  }
}