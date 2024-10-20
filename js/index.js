//!El programa es un carrito de compras, en el cual hay que ingresar el producto a comprar y te indica si esta disponible o no. Si el producto esta disponible se tiene que ingresar la cantidad a comprar y te avisa hay stock o no. Luego te devuelve el total de la compra cuando el usuario indica que no quiere seguir comprando.

let total = 0; // creo la variable global para poder mostrar el valor total cuando el usuario no quiera seguir comprando y la inicializo en 0 

const PRODUCTOS = [ //creo un array en el cual tiene varios objetos (productos, precio, tipo y stock) para asi poder acceder a este y filtrar el tipo de producto, encotrar si se encutra el producto, saber si tiene el stock y sumar el precio de los productos.
    {
        id: 1,
        nombre: `jorgito`,
        precio: 900,
        tipo: `alfajores`,
        stock: 1
    },
    {
        id: 2,
        nombre: `gomitas`,
        precio: 3000,
        tipo: `caramelos`,
        stock: 0
    },
    {
        id: 3,
        nombre: `fantoche negro`,
        precio: 700,
        tipo: `alfajores`,
        stock: 2
    },
    {
        id: 4,
        nombre: `flynn paff`,
        precio: 2000,
        tipo: `caramelos`,
        stock: 3
    },
    {
        id: 5,
        nombre: `pico dulce`,
        precio: 3800,
        tipo: `caramelos`,
        stock: 0
    }
]

function mostrar_prod(FILTRADO_PRODUCTOS){ //la funcion muestra los producto a elegir 
    const PRODUCTOS_SECTION = document.getElementById('productos')
    PRODUCTOS_SECTION.innerHTML = '' // limpia la pantalla al iniciar y cuando se elige un tipo de productos

    FILTRADO_PRODUCTOS.forEach(producto =>{ // se usa un FOREACH para que se cree una tarjeta para cada objeto del array
        const DIV_PRODUCT = document.createElement('div')
        DIV_PRODUCT.className = 'contenedor'
        DIV_PRODUCT.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button id = 'cantidad'>Comprar</button>
        `
    PRODUCTOS_SECTION.appendChild(DIV_PRODUCT)
    })
}

function filtado(tipo){ //esta funcion filta los productos por determinado tipo 
    let FILTRADO_PRODUCTOS;
    if(tipo){
        FILTRADO_PRODUCTOS = PRODUCTOS.filter(producto => producto.tipo === tipo) //se usa filter para que encuentre el tipo de producto y los devuelva en un array para poder mostrarlos en pantalla
    }
    else{
        FILTRADO_PRODUCTOS = PRODUCTOS // sino encuentra el tipo o se preciona el boton "todos" muestra todos los productos
    }
    mostrar_prod(FILTRADO_PRODUCTOS)
}

function eleccion(){ // la funcion sirve para que se elija el producto y la cantidad a comprar
    let product = prompt("Ingrese el producto a comprar:").toLocaleLowerCase()
    buscar(product) 

    function buscar(product){ // esta funcion busca si el producto esta disponible y si se encuntra que especifique la cantidad
        let BUSCADOR = PRODUCTOS.find(producto => producto.nombre.toLocaleLowerCase() === product) // uso FIND  para que encutre el producto y me lo devuelva el objeto completo y poder obtener el stock y precio
        if (BUSCADOR){ 
            let cantidad = parseInt(prompt('ingresar la cantidad:'))
            if (cantidad > BUSCADOR.stock) {
                console.log(`No hay suficiente stock. Stock disponible: ${BUSCADOR.stock}`);
            }else{
                let multiplicacion = cantidad * BUSCADOR.precio;
                console.log(`El total es del producto ${multiplicacion}.`)
                total += multiplicacion;
            }
        }else {
            console.log("Producto no encontrado.");
        }
        
    }

}

document.getElementById('todos').addEventListener('click',()=>filtado(''))
document.getElementById('caramelos').addEventListener('click',()=>filtado('caramelos'))
document.getElementById('alfajores').addEventListener('click',()=>filtado('alfajores'))

mostrar_prod(PRODUCTOS)

eleccion()

while(true){ //uso el while porque no se cuantas veces se quiere comprar
    let continuar = prompt('¿Desea continuar comprando? si/no').toLocaleLowerCase()
    if(continuar == 'si'){
        eleccion()
    }else{
        console.log(`El total de la compra es: ${total}.`)
        break
    }
}





