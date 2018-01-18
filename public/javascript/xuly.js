var socket = io("https://onlineparkjaeha.herokuapp.com/");

socket.on("server-send-rooms", function(data){
	$("#dsRoom").html("");
	data.map(function(r){
		$("#dsRoom").append("<h4 lcass='room'>"+r+"</h4>");
	});
});

socket.on("server-send-room-socket", function(data){
	$("#roomHienTai").html(data);
});

socket.on("server-chat",function(data){
	$("#right").append("<div>"+ data +"</div>");
	//alert(data);
});

$(document).ready(function(){
	
	$("#btnTaoRoom").click(function(){
		socket.emit("tao-room",$("#txtRoom").val());
	});
	
	$("#btnChat").click(function(){
		socket.emit("user-chat",$("#txtMessage").val());
	});
	
	
	/*$("#btnTaoRoom").click(function(){
		socket.emit("tao-room",$("#txtRoom").val());
	});*/
});