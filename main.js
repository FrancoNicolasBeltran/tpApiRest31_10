const creaTarjetas=document.getElementById("tarjetas");
const btnVer=document.getElementById("btnVer");
const api='https://6536f64bbb226bb85dd2c3c4.mockapi.io/api/v1/employees/';
function buscarEnArray(array,nombre){
    return array.indexOf(nombre)
}
async function getApi(id){
  const dato=await fetch(`${api}${id}`);
  if(dato.status="200"){
    const jsonDato= await dato.json();
    return jsonDato;
  }
}
const callAPI = () => {
  fetch(api)
    .then((res) => res.json())
    .then((res) => {
      const fila=document.createElement("tr");
      fila.className="fila1";
      fila.innerHTML=`
      <tr>
              <td >ID</td>
              <td >Nombre y apellido</td>
              <td >Foto</td>
              <td >Edad</td>
              <td >Info</td>
              <td >Area</td>
      </tr>`;
      creaTarjetas.appendChild(fila);
      for (let i = 0; i <res.length; i++) {
        console.log(i);
        const filaCrear = document.createElement("tr");
        filaCrear.className="filas";
        filaCrear.innerHTML= `
        <td class="td1">${res[i].id}</td>
        <td class="td2">${res[i].name} ${res[i].lastname}</td>
        <td class="td3">
          <img src=${res[i].img}>
        </td>
        <td class="td4">${res[i].age}</td>
        <td class="td5">${res[i].info}</td>
        <td class="td6">${res[i].area}</td> `;
        creaTarjetas.appendChild(filaCrear);
      }
    });
};
btnVer.addEventListener("click", callAPI);

//BUSCAR POR ID
let encontrar=document.getElementById("encontrado");
let btnBuscar=document.getElementById("buscar");
btnBuscar.addEventListener("click",()=>{
  //console.log(encontrar.hasChildNodes());//busca si tiene hijo
  //console.log(encontrar.firstChild);//busca el hijo
  try {
    if(encontrar.hasChildNodes()===true){
      encontrar.removeChild(encontrar.firstChild); //elimina o limpia lo que creo la busqueda anterior
    }
    console.log("buscar");
    let id1=document.getElementById("buscarID").value;
    fetch(`${api}${id1}`)
    .then((datos) =>{return datos.json();})
    .then((datos)=>{
      console.log(datos);
    const divCrear = document.createElement("div");
    divCrear.id="divID";
    if(datos.id===undefined){
        divCrear.innerHTML= `<h1 class="noEncontrado">No se encontro...</h1>`
     }
    else{
        divCrear.innerHTML= `
        <h6 class="aa">ID: ${datos.id}</h1>
        <h1 class="aa">${datos.name} ${datos.lastname}</h1>
        <div class="datos">
          <img src=${datos.img}>
          <h1 class="edad">EDAD:${datos.age}</h1>
        </div>
        <p>INFO:${datos.info}</p>
        <h1 class="tipo">${datos.area}</h1> `;

      }
      encontrar.appendChild(divCrear);
})
    .catch(err=>(console.log(err)));
  } catch (error) {
    
  }
})

// subir datos en la API usando POST

  let btnPost=document.getElementById("btnSubir");
  btnPost.addEventListener("click",()=>{
    try {//El Post solo lo agregue a la variable como referencia a POST, le puedo poner cualquier nombre(Y PARA QUE NO QUEDE IGUAL A LOS NOMBRES DE LOS ATRIBUTOS)
      let namePost=document.getElementById("subirName").value;
      let lasNamePost=document.getElementById("subirLastName").value;
      let imgUrlPost=document.getElementById("subirUrlImg").value;
      let agePost=document.getElementById("subirAge").value;
      let infoPost=document.getElementById("subirInfo").value;
      let areaPost=document.getElementById("subirArea").value;
      const data={
        name:namePost,
        lastname:lasNamePost,
        img:imgUrlPost,
        age:agePost,
        info:infoPost,
        area:areaPost
      }
      
      console.log(data);
      //fetch es para consumir la api
      fetch(api,{
        method:'POST',
        body: JSON.stringify(data), //Aca pasa a JSON la informacion
        headers: {'Content-Type':'application/json'}  //esto para indicar que lo que esta viajando es un JSON
      })
      .then(datos=>{return datos.json()})
      .then(datos=> console.log(datos))
      .catch(err => {
        alert("Actualice la pagina..se GUARDO el usuario con exito.")
        console.log(err)});
    } catch (error) {
      
    }
  })
  //PUT
  const btnModificar=document.getElementById("btnMod");
  btnModificar.addEventListener("click",async()=>{
    try {
      const idEmpleado=document.getElementById("modID").value;
      let namePut=document.getElementById("modName").value;
      let lasNamePut=document.getElementById("modLastName").value;
      let imgUrlPut=document.getElementById("modUrlImg").value;
      let agePut=document.getElementById("modAge").value;
      let infoPut=document.getElementById("modInfo").value;
      let areaPut=document.getElementById("modArea").value;
      let arregloDatos=[namePut,lasNamePut,imgUrlPut,agePut,infoPut,areaPut];
      let arregloDatoAPI=['name','lastname','img','age','info','area'];
      let data={};
      let {name,lastname,img,age,info,area}=await getApi(idEmpleado);
      // PUEDO USAR EL GET PARA COMPARAR DATOS ACA ADENTRO....
        console.log(arregloDatos);
      arregloDatos.forEach((element,index)=> {
        console.log({name});
        console.log(element);
        if(element.length>0){
         data[arregloDatoAPI[index]]=arregloDatos[index];
        }
        else{
          data[arregloDatoAPI[index]]=[name,lastname,img,age,info,area][index];
        }console.log([name,lastname,img,age,info,area][index]);
      });
      console.log(data);
      fetch(`${api}${idEmpleado}`,{
        method:'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type':'application/json'} 
      })
      .then(datos=>{
        alert("Actualice la pagina..se MODIFICO el usuario con exito.");
        return datos.json()})
      .catch(error=>{console.log(error)});
    } catch (error) {
      
    }
  })

  //DELETE

  const btnDelete=document.getElementById("btnDelete");
  btnDelete.addEventListener("click",()=>{
    try {
      let id1=document.getElementById("deleteID").value;
      fetch(`${api}${id1}`,{
        method:'DELETE'
      })
        .then(datos=> {return datos.json()})
        .catch(error=>{
          console.log(error);
          alert("Actualice la pagina..se borro el usuario con exito.");});
      
    } catch (error) {
      
    }
  })
  //formularios
  const form1=document.getElementById("form1");
  const form2=document.getElementById("form2");
  const form3=document.getElementById("form3");
  form1.addEventListener("click",function(e){
    e.preventDefault();
  })
  form2.addEventListener("click",function(e){
    e.preventDefault();
  })
  form3.addEventListener("click",function(e){
    e.preventDefault();
  })