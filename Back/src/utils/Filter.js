export const filter = (array, condition, value) => {
  //SI el valor existe
  if(value){
    //Agregamos una condicion
    return array = array.push(` AND ${condition} = "${value}"`)
  }
}