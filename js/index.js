const CONTADOR = document.getElementById(`contador`)
const SPAN_TOTAL = document.getElementById(`precio-total`)
const SECCION = document.getElementById(`mostrarcart`)
const UL = document.getElementById(`items-carrito`)

const CARRITO = JSON.parse(localStorage.getItem(`carrito`)) || [] // En esta variable obtengo el localstorage o sino hay nada inicia en vacio

document.getElementById('todos').addEventListener('click',()=>filtado(''))
document.getElementById('caramelos').addEventListener('click',()=>filtado('caramelos'))
document.getElementById('alfajores').addEventListener('click',()=>filtado('alfajores'))

async function obtenerProductos() {
    const response = await fetch(`../datos.Json`)    
    const PRODUCTOS = await response.json()

    mostrar_prod(PRODUCTOS)
}


obtenerProductos()

document.addEventListener("DOMContentLoaded", () => { //esta funcion al cargar la pagina muestra los productos, total y contador que habia en el carrito del localstorage
    MostrarCart();
    ActualizarContador();
    ActualizarTotal();
        
        /* si el producto esta en el carrito btn.disabled = true  */
});

function actualizarbtn(indice){
    //tenemos una funcion en la cual si en el carrito la cantidad = stock => disable = true
    //tenemos otro que si el stock es igual a 0 => disable = false
    //tenemos otro que busca si el producto esta en el carrito y sino lo encuentre (undefined) entonces disable = false
    const PROD_CARRITO = CARRITO.find(product => product.id === indice)
    CARRITO.forEach(producto => {
        if(producto.stock == producto.cantidad ){
            document.getElementById(`btn${producto.id}`).disabled = true
        }
        else if( (producto.cantidad < producto.stock || !PROD_CARRITO)){
            document.getElementById(`btn${indice}`).disabled = false
            console.log(indice)
        }
    })
}

//!FUNCTIONS

function filtado(tipo){ //esta funcion filta los productos por determinado tipo 

    fetch(`../datos.Json`)
        .then(respuesta => respuesta.json())
        .then(PRODUCTOS => {
            let FILTRADO_PRODUCTOS;

            tipo ?  FILTRADO_PRODUCTOS = PRODUCTOS.filter(producto => producto.tipo === tipo) : FILTRADO_PRODUCTOS = PRODUCTOS

            mostrar_prod(FILTRADO_PRODUCTOS)
        })
        .catch(error => console.log(`Ocurrio un error al filtar los productos.`, error))
    /*
    se usa filter para que encuentre el tipo de producto y los devuelva en un array para poder mostrarlos en pantalla
    sino encuentra el tipo o se preciona el boton "todos" muestra todos los productos
    */
}

//!MOSTRAR

function mostrar_prod(FILTRADO_PRODUCTOS){ //la funcion muestra los producto a elegir 

    const PRODUCTOS_SECTION = document.getElementById('productos')
    PRODUCTOS_SECTION.innerHTML = '' // limpia la pantalla al iniciar y cuando se elige un tipo de productos

    FILTRADO_PRODUCTOS.forEach(producto =>{ // se usa un FOREACH para que se cree una tarjeta para cada objeto del array
        const DIV_PRODUCT = document.createElement('div')
        DIV_PRODUCT.className = 'contenedor'
        DIV_PRODUCT.innerHTML = `
            <img src ="${producto.imagen}" alt ="foto del producto ${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button onclick ="AgregarCarrito(${producto.id})" id ='btn${producto.id}'>Comprar</button> 
        `
    PRODUCTOS_SECTION.appendChild(DIV_PRODUCT)
    })
}

function MostrarCart(){
    UL.innerHTML=``  //inicia el carrito en vacio para limpiarlo
    CARRITO.forEach((producto,index) =>{ //En esta funcion muestra en el carrito los elementos seleccionados o los que se encontraban en localstorage
        const LI = document.createElement(`li`)
        LI.className=`prodCart`
        LI.innerHTML = `
            [${producto.cantidad}] ${producto.nombre} - ${producto.precio} C/U
            <button onclick="EliminarCarrito(${index})"> X </button>
        `
        UL.appendChild(LI)
    })
}



//!FUNCIONTS CARRITO
function AgregarCarrito(id){

    fetch(`../datos.Json`)
        .then(respuesta => respuesta.json())
        .then(PRODUCTOS => {
            const PRODUCTO = PRODUCTOS.find(producto => producto.id === id); //esta funcion sirve para buscar si se encuentra el producto en el array

            const PROD_CARRITO = CARRITO.find(product => product.id === id) //esta funcion sirve para saber si el producto ya se encuentra en el carrito

            if (PROD_CARRITO) { // si encuentra el producto en el carrito entra al if
                if (PROD_CARRITO.cantidad < PRODUCTO.stock) {  // si la cantidad es menor al stock entra al if y aumenta la cantidad del producto
                        PROD_CARRITO.cantidad++;
                        Toastify({
                            text: "Se agrego cantidad",
                            duration: 1000,
                            position: "left",
                            gravity: "top",
                            style:{
                                background: "#5b5ba8"
                            }
                            }).showToast();
                } else{ // si la cantidad es mayor al stock muestra el mensaje
                    Swal.fire({
                        icon: "error",
                        title: "No Stock",
                        text: "No hay suficiente stock",
                    });
                    /* document.getElementById(`btn${PRODUCTO.id}`).disabled = true */
                }
            } else { // sino encuentra el prod en el carrito entra al else y agrega el prod al carrito
                    CARRITO.push({ ...PRODUCTO, cantidad: 1 });
                    Toastify({
                        text: "Producto agregado",
                        duration: 1000,
                        position: "right",
                        gravity: "top",
                        style:{
                            background: "#ADADF3"
                        }
                        }).showToast();
            }

            localStorage.setItem(`carrito`, JSON.stringify(CARRITO)) // guardo los cambios del carrito en el localstorage

            ActualizarContador();
            ActualizarTotal();
            MostrarCart();
            actualizarbtn(id)
        })
        .catch(error => console.log(`Ocurrio un error al agregar al carrito`, error))
}


function EliminarCarrito(index){ //elimina los productos del carrito
    CARRITO.splice(index,1) //elimino el producto seleccionado del carrito
    
    localStorage.setItem(`carrito`, JSON.stringify(CARRITO)) //guardo los cambios en el localstorage


    /* const productoEliminado = CARRITO[index]; // Guarda el producto eliminado antes de eliminarlo
    console.log(CARRITO)
    fetch(`../datos.Json`)
        .then(respuesta => respuesta.json())
        .then(CARRITO => {
            CARRITO.find(producto =>{ 

                

                const btn = document.getElementById(`btn${producto.id}`);
                if (btn.disabled) {
                    btn.disabled = false; // Rehabilita el botón
                } })

            })
        
        .catch(error => console.log(`Ocurrio un error al borrar un producto`, error))   */
    

    ActualizarContador()
    ActualizarTotal()   
    MostrarCart() 
    actualizarbtn(index)
}

function finalizarCompra(){ //se finaliza la compra
    if(CARRITO.length == 0){ // si el carrito no tiene productos muestra la alerta
        Swal.fire({
            icon: "error",
            title: "Producto no seleccionado",
            text: "Por favor, seleccionar productos.",
        });
    }else{
        Swal.fire({ // sino muestra el mensaje de exito y vacia el carrito y localstorage
            icon: "success",
            title: "Compra finalizada",
            text: "La compra se realizo con exito.",
        });
        CARRITO.length = 0;

        localStorage.setItem(`carrito`, JSON.stringify(CARRITO));

        ActualizarContador();
        ActualizarTotal();
        MostrarCart();
    }
    
}
//!ACTUALIZAR
function ActualizarContador(){ // actualiza el contador del carrito al sumar los productos en el carrito
    CONTADOR.textContent = CARRITO.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
}

function ActualizarTotal(){ //actualiza el total del carrito al sumar los precios de los productos por la cantidad que haya de este
    const TOTAL = CARRITO.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    SPAN_TOTAL.textContent = TOTAL;
}

function altenarCarrito(){ // esta funcion muestra o oculta el carrito al hacer click sobre la seccion
    SECCION.style.display = SECCION.style.display === `none` || SECCION.style.display ===`` ?  `block` : `none`
} 

