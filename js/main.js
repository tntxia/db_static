

$(function(){
	
	let menu = new SimpleMenu({
		target:$("#nav"),
		url:'json/menu.json'
	});
	
	let target = $("#mainDiv");	
	// 绑定路由，设置路由变化影响的区域
	router.register({
		target:target,
		defaultModule:'operate',
		resourcePath: '/db_static'
	});
	
})

function getTables(id,callback){
	$.ajax({
		url:'transfter!getTables.do',
		data:{
			id
		}
	}).done(res=>{
		callback(res);
	});
}
