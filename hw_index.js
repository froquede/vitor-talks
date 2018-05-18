var five = require("johnny-five");
var board = new five.Board();
var left_switch, up_switch, right_switch, down_switch;
var left_key, up_key, right_key, down_key;
var io = require("socket.io")(81);
var express = require('express');
var app = express();
var http = require("http").Server(app);

board.on("ready", function() {
  left_switch = new five.Button(7);
  up_switch = new five.Button(8);
  right_switch = new five.Button(12);
  down_switch = new five.Button(13);

  bindEvents(left_switch, "left");
  bindEvents(up_switch, "up");
  bindEvents(right_switch, "right");
  bindEvents(down_switch, "down");

  potentiometer = new five.Sensor({
    pin: "A3",
    freq: 1000
  });

  board.repl.inject({
    pot: potentiometer
  });

  potentiometer.on("data", function() {
	io.emit("potentiometer", { value: this.value });
  });
});

function bindEvents(sw, key) {
  sw
    .on("hit", function() {
      console.log("hit " + key);
    })
    .on("hold", function() {
      console.log("hold " + key);
    })
    .on("release", function() {
      io.emit("release", { key: key });
    });
}

app.use(express.static('public'));	
http.listen(3000, function() {
  console.log("listening on *:3000");
});
