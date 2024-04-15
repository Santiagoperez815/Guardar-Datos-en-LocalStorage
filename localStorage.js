// // declaracion de variables 

// //let informacion = [{
// //    nombre:  "Santiago ",
// //    profesion: "programador",
// //    salario: 600000
// //},
// //{
// //    nombre:  "johana ",
// //    profesion: "Contadora",
// //    salario: 222000
// //},
// //{//
// //    nombre:  "Matias ",
// //    profesion: "Estudiante",
// //    salario: 1000
// //}
// //]

// // guardar informacion en localStorage

// //localStorage.setItem("info",JSON.stringify(informacion));
// //alert("datas guardados con exito");





// // mostrar informacion en el navegador 

// let datos = JSON.parse(localStorage.getItem("info"));
// let info = [];

// if(datos != null){
//     info = datos;
// }

// info.forEach((d,i)=>{
//     document.write(
//         ` Id: ${i} <br>
//           Nombre: ${d.nombre} <br>
//           Profesion: ${d.profesion} <br>
//           Salario: ${d.salario} <br>
//           <hr>
//         `
//     );

    
// });



// // borrar datos guardados en localStorage

// //localStorage.removeItem("info");




///// DECLARACION DE VARIABLES 

let nombrePro = document.querySelector(".nombre-producto");
let precioPro = document.querySelector(".precio-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let imagenPro = document.querySelector(".imagen-producto");
let botonGuardar = document.querySelector(".btn-guardar");
let tabla = document.querySelector(".table tbody");
let searchInput = document.querySelector(".buscar-producto");



//evento para el boton guardar
botonGuardar.addEventListener("click", function() {
    //alert(nombrePro.value);
    let inventario = validarFormulario();
    guardarDatos(inventario);
    borrarTable();
    mostrarDatos();

});

//funcion para validar  los datos del formulario




function validarFormulario() {
    let producto;
    if( nombrePro.value == "" || precioPro.value == "" ||  presentacionPro.value == "" || imagenPro.value == "" ){
        alert("TODOS LOS CAMPOS DEBEN DE SER OBLIGATORIOS... ")
    }else{
        producto = {
            nombre: nombrePro.value,
            precio: precioPro.value,
            presentacion: presentacionPro.value,    
            imagen: imagenPro.value
        }

    }  
    //  console.log(producto)

        nombrePro.value = "";
        precioPro.value = "";
        presentacionPro.value = "";
        imagenPro.value = "";

        return producto;
}

// FUNCION GUARDAR DATOS EN LOCALSTORAGE
const listadoInventario = "Inventario"
function guardarDatos(datos){

    let inventario = [];
    //traer datos guardados previamente en localStorage
    let productosGuardados = JSON.parse( localStorage.getItem(listadoInventario));

    // validar los datos guardados en localStorage

    if( productosGuardados != null){
        inventario = productosGuardados;
    }

    // agregar pedido nuevo al array 

    inventario.push(datos);

    //guardar en localStorage

    localStorage.setItem(listadoInventario ,JSON.stringify( inventario));
    //validar que los datos fueron guardados 
    alert("datos guardados con EXITO "); 
}


// funcion para extraer los datos guardados en el localStorage
function mostrarDatos() {
    let inventario = [];
    let productosGuardados = JSON.parse(localStorage.getItem(listadoInventario));
    if (productosGuardados != null) {
        inventario = productosGuardados;
    }   

    inventario.forEach((p, i) => { 
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>${p.presentacion}</td>
            <td><img src="${p.imagen}" width="30%"></td>
            <td><span onclick="actualizarPedido(${i})" class="btn-editar btn btn-warning">📄</span></td>
            <td><span onclick="eliminarProducto(${i})" class="btn-eliminar btn btn-danger">❌</span></td>
        `;
        tabla.appendChild(fila);
    });
}


//quitar los datos de la tabla para mostrar los datos nuevos 
function borrarTable(){
    let filas = document.querySelectorAll(".table tbody tr");
    filas.forEach((f)=>{
        f.remove();
    });

}

// FUNCION ELIMINAR UN PRODUCTO DE LA TABLA
function eliminarProducto( pos ){
    let inventario = [];
    let productosGuardados = JSON.parse( localStorage.getItem(listadoInventario));
    if( productosGuardados != null){
        inventario = productosGuardados;
    }   

    //confirmar pedido a eliminar 
    let confirmar = confirm("DESEAS ELIMINAR ESTE PRODUCTO " +inventario[pos].nombre  );
    if(confirmar){
        let eliminado = inventario.splice(pos,1); 
        alert("EL PEDIDO "+eliminado.nombre+ " FUE ELIMINADO CORRECTAMENTE " );
        
        //guardar los datos que quedaron en el localStorage
        localStorage.setItem(listadoInventario, JSON.stringify(inventario));
        borrarTable();
        mostrarDatos();

        nombrePro.value = "";
        precioPro.value = "";
        presentacionPro.value = "";
        imagenPro.value = "";
    }

}


// actualizar pedido del localStore

function actualizarPedido(pos) {
    let inventario = [];
    let productosGuardados = JSON.parse(localStorage.getItem(listadoInventario));
    if (productosGuardados != null) {
        inventario = productosGuardados;
    }

    // Pasar los datos al formulario para editar
    nombrePro.value = inventario[pos].nombre;
    precioPro.value = inventario[pos].precio;
    presentacionPro.value = inventario[pos].presentacion;
    imagenPro.value = inventario[pos].imagen;

    // Seleccionar el botón de actualizar
    let btnActualizar = document.querySelectorAll(".btn-actualizar");
    btnActualizar.classList.toggle("d-nome");
    botonGuardar.classList.toggle("d-none");

    // agregar evento al boton de actualizar 
    btnActualizar.addEventListener("click", function(){
        inventario[pos].nombre = nombrePro.value;
        inventario[pos].precio = precioPro.value;
        inventario[pos].presentacion = presentacionPro.value;
        inventario[pos].imagen = imagenPro.value;

        // guardar los datos en localStorage
        localStorage.setItem(listadoInventario, JSON.stringify(inventario));
        alertÇ("EL DATO FUE ACTUALIZADO CON EXITO !!    ")
        borrarTable();
        mostrarDatos();

    })
}


// FUNCION BUSCAR 

searchInput.addEventListener("keyup", function() {
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoInventario));
    if(pedidosPrevios!=null){
        pedidos = pedidosPrevios;
    } 
    //mostrar los datos en la tabla
    borrarTable();
    const texto = (searchInput.value).toLowerCase();
    let i = 0;
    for(let producto of pedidos){
        let nombreP = (producto.nombre).toLowerCase();
        if(nombreP.indexOf(texto) !==-1){
            let fila = document.createElement("tr");
            fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${producto.nombre}</td>
            <td> ${producto.precio}</td>
            <td> ${producto.presentacion}</td>
            <td><img src="${producto.imagen}" width="20%" /></td>
            <td>
                <span class="btn-editar btn" onclick="actualizarPedido(${i})">✏️</span>
            </td>
            <td>
            <span class="btn-eliminar btn" onclick="eliminarPedido(${i})">❌</span>
            </td>
        `;
            tabla.appendChild(fila); 
            i++;   
        }
    }
    
});





// mostrar los daros de localStorage al recargar la pagina 
document.addEventListener("DOMContentloaded",function(){
    borrarTable();
    mostrarDatos();
   
});


    



