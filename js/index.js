//!El programa permite cargar hasta 3 productos de los cuales se puede elegir entre: jabon - esponja - shampoo, luego calcula el impuesto y muestra el valor total del o los productos con el impuesto

function calculoImpuesto(parametro){ //funcion para calcular el impuesto de los producto
    const impuesto = 0.05 //es un 5% del valor producto
    let valorimpuesto //creo una variable para que se almacene el valor del impuesto del producto

    valorimpuesto = parametro * impuesto //calculo cuanto es el impuesto
    parametro = parametro + valorimpuesto //le sumo el impuesto al importe del producto
    
    return parametro //de vuelvo el valor del producto con el impuesto
}

function valorTotal(parametro){ //funcion para calcular el valor total dependiendo de la cantidad de producto
    parametro = parametro + aux //uso la variable aux para almacenar el valor anterior del producto y luego sumarselo al siguente
    aux = parametro

    return parametro
}

let valorProducto //var designada para aplicarle el valor al producto
let cantidad //variable para designar la cantidad de productos a comprar
let aux = 0; // variable auxiliar para guardar el valor del producto cuando son mas de 1

console.log("Ingrese la cantidad de productos a comprar: ")
cantidad = parseInt(prompt("Se puede comprar hasta 3 productos"))

while(isNaN(cantidad) || cantidad > 3 || cantidad < 1){
    console.log("Ingrese la cantidad de productos a comprar: ")
    cantidad = parseInt(prompt("Se puede comprar hasta 3 productos"))
}

switch(cantidad){
    case 1:
        for(let i = 0; i<1; i++){
            console.log("ingrese el producto a comprar: \njabon-esponja-shampoo")
            producto = prompt()
            if (producto == 'jabon'){
                valorProducto = 3000
            }
            else if(producto == 'esponja'){
                valorProducto = 2000
            }
            else if(producto == 'shampoo'){
                valorProducto = 4000
            }
            else{
                alert("Ingresar un producto valido")
                i-- // i = 0 para que vuelva a pedir el producto
            }
        }
        console.log("El producto elegido es:\n", producto)
        console.log("El valor del producto con el impuesto es: ", calculoImpuesto(valorProducto))
        break;
    case 2:
        for(let i = 0; i<2; i++){
            console.log("ingrese el producto a comprar: \njabon-esponja-shampoo")
            producto = prompt()
            if (producto == 'jabon'){
                valorProducto = 3000
                valorTotal(calculoImpuesto(valorProducto))
                console.log("El producto elegido es: ", producto)
            }
            else if(producto == 'esponja'){
                valorProducto = 2000
                valorTotal(calculoImpuesto(valorProducto))
                console.log("El producto elegido es: ", producto)
            }
            else if(producto == 'shampoo'){
                valorProducto = 4000
                valorTotal(calculoImpuesto(valorProducto))
                console.log("El producto elegido es: ", producto)
            }
            else{
                alert("Ingresar un producto valido")
                i-- // le resto uno a i para que vuelva a hacer el for
            } 
        }
        break;
    case 3:
        for(let i = 0; i<3; i++){
            console.log("ingrese el producto a comprar: \njabon-esponja-shampoo")
            producto = prompt()
            if (producto == 'jabon'){
                valorProducto = 3000
                valorTotal(calculoImpuesto(valorProducto))
                console.log("El producto elegido es: ", producto)
            }
            else if(producto == 'esponja'){
                valorProducto = 2000
                valorTotal(calculoImpuesto(valorProducto))
                console.log("El producto elegido es: ", producto)
            }
            else if(producto == 'shampoo'){
                valorProducto = 4000
                valorTotal(calculoImpuesto(valorProducto))
                console.log("El producto elegido es: ", producto)
            }
            else{
                alert("Ingresar un producto valido")
                i--
            }
            
        }
        break;
}
if(cantidad == 2 || cantidad == 3){
    console.log("El valor total de los producto es:",aux)
}


