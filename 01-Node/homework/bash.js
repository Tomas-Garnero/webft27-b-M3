const commands = require("./commands/index.js");
// commands = {echo: function, date: function, ls: function, ...}

const print = function(output){
    process.stdout.write(args);
    process.stdout.write("\nprompt > ")
};

// console.log(process)
// console.log(Object.keys(process))


// // Output un prompt
// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) {
//     var cmd = data.toString().trim(); // remueve la nueva línea vacia generada por el enter
//     process.stdout.write('You typed: ' + cmd);
//     process.stdout.write('\nprompt > ');
// });


// // Output un prompt
// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) {
//     // "echo hola como andas"
//     let args = data.toString().trim().split(" "); // remueve la nueva línea vacia generada por el enter
    
//     // args = ["echo", "hola", "como", "andas", "?"]
//     let cmd = args.shift();  // "echo"
//     // args = ["hola", "como", "andas", "?"]
//     if (cmd === "echo") {
//         process.stdout.write(args.join(" "));
//     } else if (cmd === "ls") {

//     } else if (cmd === "pwd") {

//     } else if (cmd === "date") {
//          process.stdout.write(Date());
//     } else {
//         process.stdout.write("command not found");
//     }
//     process.stdout.write('\nprompt > ');
// });


// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    // "echo hola como andas"
    let args = data.toString().trim().split(" "); // remueve la nueva línea vacia generada por el enter
    
    // args = ["echo", "hola", "como", "andas", "?"]
    let cmd = args.shift();  // "echo"
    // args = ["hola", "como", "andas", "?"]
    
    if (commands[cmd]){  // Se podria utlizar hasOwnProperty()
        commands[cmd](args, print);
    }else {
        // command not found
        print("cmd not found");
    }
});