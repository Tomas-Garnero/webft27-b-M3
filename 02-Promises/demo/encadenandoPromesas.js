var primerMetodo = function() {
   // SIEMPRE new Promise(function(arg1, arg2){
   //   
   // })
   // tira error en algun momento? NO!
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el primer método');
         reject({num: '123'}); //pasamos unos datos para ver como los manejamos
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   // siemrpe se resuelve a un valor 
   // que valor va a tener la promesa? {num: 123}
   return promise; // {status: fullfiled, value: {num: 123}}
};

console.log(primerMetodo);
// primerMetodo > promesa > fullfiled > value: {num: 123}

// uno.then(function(data) {
//    return segundoMetodo(data);
// }).then(function(data) {
//    return tercerMetodo(data);
// }).then(function(data) {
//    console.log(data);
// })


var segundoMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el segundo método');
         resolve({nuevosDatos: datos.num + ' concatenamos texto y lo pasamos'});
      }, 2000);
   });
   return promise;
   // promise: {status: fullfiled, value: {nuevosDatos: 123 concatenamos texto y lo pasamos}}
   // promise > resolve > fullfiled > value: {nuevosDatos}
};

var tercerMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el tercer método');
         console.log(datos.nuevosDatos); //imprimos los datos concatenados
         resolve('hola');
      }, 3000);
   });
   return promise;
   // promise > resolve > fullfiled > value: "hola"
};

var p = primerMetodo() // {rejected, value: "123"}
   .then((data) => segundoMetodo(data)) // .then(successH, null)
   .then((data) => tercerMetodo(data))
   .then(function(datos){
      console.log(datos); //debería ser el 'hola' que pasamos en tercerMetodo
      return datos;
   })
   .catch(err => err);

p.then(data => console.log("p", data));

// promiseA = rejected, reason: {num: 123}
// promiseB = promiseA.then() -> rejected, reason: {num: 123}
// promiseC = promiseB.then() -> rejected, reason: {num: 123}
// promiseD = primiseC.then() -> rejected, reason: {num: 123}
// promiseE = primiseD.then(null, err => console.log("error", err)) 
// promiseF = p = resolve undefined 

// ------------------------------------CAMBIAMOS EL PRIMER REJECT POR RESOLVE ---------------------------------

var primerMetodo = function() {
   // SIEMPRE new Promise(function(arg1, arg2){
   //   
   // })
   // tira error en algun momento? NO!
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el primer método');
         resolve({num: '123'}); //pasamos unos datos para ver como los manejamos
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   // siemrpe se resuelve a un valor 
   // que valor va a tener la promesa? {num: 123}
   return promise; // {status: fullfiled, value: {num: 123}}
};

console.log(primerMetodo);
// primerMetodo > promesa > fullfiled > value: {num: 123}

// uno.then(function(data) {
//    return segundoMetodo(data);
// }).then(function(data) {
//    return tercerMetodo(data);
// }).then(function(data) {
//    console.log(data);
// })


var segundoMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el segundo método');
         resolve({nuevosDatos: datos.num + ' concatenamos texto y lo pasamos'});
      }, 2000);
   });
   return promise;
   // resolve
};

var tercerMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el tercer método');
         console.log(datos.nuevosDatos); //imprimos los datos concatenados
         resolve('hola');
      }, 3000);
   });
   return promise;
   // promise > resolve > fullfiled > value: "hola"
};

var p = primerMetodo() 
   .then((data) => segundoMetodo(data)) 
   .then((data) => tercerMetodo(data))
   .then(function(datos){
      console.log(datos);
      return datos;
   })
   .catch(err => err);

p.then(data => console.log("p", data));

// promiseA -> resolve, {num: 123}
// promiseB = promiseA.then({num: 123} => segundoMetodo({num: 123})) -> resolve, {nuevosDatos: {num: 123} + ' concatenamos texto y lo pasamos'}
// promiseC = promiseB.then({nuevosDatos: {num: 123} + ' concatenamos texto y lo pasamos'} => tercerMetodo({nuevosDatos: {num: 123} + ' concatenamos texto y lo pasamos'})) -> resolve


// -----------------------------------------------------------------------------------------------------------------------
//              3 dias         5 minutos          3 ms
Promise.all([primerMetodo(), segundoMetodo(), tercerMetodo()])
.then(resultado => console.log("resultado: ", resultado )) // [rtaPrimerMetodo, rtaSegundoMetodo, rtaTercerMetodo]
.catch(err => console.log("err: ", err));