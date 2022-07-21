function* generatorShowInstructors() {
  console.log("Iniciando generator function");
  yield "Franco"; // pause y hace un "mini return" y devuelve "franco"
  yield "Toni"
  console.log("Generator function terminada");
}

var generatorObject = generatorShowInstructors();

console.log(generatorObject.next()); // .next() -> devuelve un objeto {value: "Franco", done: false}
console.log(generatorObject.next()); // .next() -> devuelve un objeto {value: "Toni", done: false} 
console.log(generatorObject.next()); // .next() -> {value: undefined, done: true}
console.log(generatorObject.next()); // .next() -> {value: undefined, done: true}

function* generatorShowInstructorsWithParameter() {
  console.log("Iniciando generator function with parameter");
  console.log(1, yield);
  console.log(2, yield);
}

var generatorObjectParameter = generatorShowInstructorsWithParameter();

generatorObjectParameter.next();
generatorObjectParameter.next('Franco');
generatorObjectParameter.next('Toni');
