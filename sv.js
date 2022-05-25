const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    /* options */
});

const {PRODUCTS} = require('./product.js')

var readline = require('readline');
var log = console.log;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("user_uttered", (...args) => {
        var msg = args[0].message;
        log(msg)
        if (msg.includes("mua")) {
            socket.emit("bot_uttered", {
              text: "kkk",
              product: PRODUCTS.at(0)
            });
        } else if (msg.includes("bán")) {
            socket.emit("bot_uttered", { 
              text: "Bạn muốn bán gì" 
            });
        }
    });

    var recursiveAsyncReadLine = function () {
      rl.question('Command: ', function (answer) {
        if (answer == 'exit') //we need some base case, for recursion
          return rl.close(); //closing RL and returning from function.
          if (answer.length < 3) {
          socket.emit("bot_uttered", {
            text: "",
            product: PRODUCTS.at(parseInt(answer))
          });
        }
        else {
          socket.emit("bot_uttered", {
            text: answer,
            product: null
          });
        }
        recursiveAsyncReadLine(); //Calling this function again to ask new question
      });
    };
    
    recursiveAsyncReadLine(); //we have to actually start our recursion somehow
    
});
httpServer.listen(3000);

