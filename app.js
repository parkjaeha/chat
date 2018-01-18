var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);


io.on("connection", function(socket){
	console.log("Co nguoi ket noi " + socket.id);
	//console.log(socket.adapter.rooms);
	//console.log(socket);

	socket.on("tao-room", function(data){
		socket.join(data);
		socket.Phong=data;
		//console.log(socket.adapter.rooms);
		var mang= [];
		for(r in socket.adapter.rooms){
			//console.log(r);
			mang.push(r);
		}
		io.sockets.emit("server-send-rooms",mang);
		socket.emit("server-send-room-socket",data);
		
	});
	
	socket.on("user-chat",function(data){
		console.log(data);
		//io.sockets.emit("server-chat",data);
		io.sockets.in(socket.Phong).emit("server-chat",data);
	});
	
	/*socket.on("tao-room",function(data){
		//console.log(data); room data 
		socket.join(data);
	});*/
	
});

app.get("/",function(req,res){
	res.render("index");
});