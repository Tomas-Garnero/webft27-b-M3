//            pending -> no tengo ningun valor
//          /
// PROMESAS - resolved / fullfiled / resuelto -> valor de resolucion
//         \
//          rejected /rechazado -> razon de rechazo
//
// fetch("https://jsonplaceholder.typicode.com/posts/q3423508350")
//                    /                 \
//                resolved            rejected
//                 value               reason
//
// fetch("https://jsonplaceholder.typicode.com/posts/q3423508350").then(succesfullHandler, errorHandler)
//
// succesfullHandler = function <- si mi promesa fue resuelta se ejecuta success
// errorHandler = function <- si mi promesa fue rechazada se ejecuta error
//
// fetch("https://jsonplaceholder.typicode.com/posts/q3423508350")
//   .then((value) => console.log(value), (reason) => console.log(reason))
//
//
// let compre = 8;
// let caramelos = new Promise(function(resolve, reject){
//     // esto va a tardar un poco en resolverse
//     setTimeout(function(){
//         if (compre >= 10) resolve(compre);
//         else reject("no tenia plata")    
//     }, 2000);
// })
//
// console.log(caramelos);  // value: undefined, status: pending
//  // .then(successH, errorH)
//  // .then(fs, fe)
// caramelos.then((value) => console.log(value), (err) => console.log("rechazo: ", err));
// caramelos.then(value => console.log("hola soy un valor de resolucion ", value));

//-----------------------------------------------------------------------------------------------------------------------
// RESUMEN:
// promesas -> nueva instancia de Promise
// si yo quiero definir una nueva promesa, instancio a Promise.
//    let promiseA = new Promise(function(resolve, reject){
//        tarea asincronica
//        resuelvo o rechazo segun corresponda
//    })

// TODA promesa -> {status: ["pending", "fullfiled", "rejected"], value: [undefined, valor], then: function}
//          una vez alcanzado un valor, no se puede cambiar, idem estado
// .then(successH, errorH) => devuelve una NUEVA promesa
//                         => dependiendo de los valores que devuelva cada sH, eH, es el comportamiento que tendra la
//                            nueva promesa
//
//