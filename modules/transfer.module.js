(function(name,module){
if(!window.modules){
window.modules=Object.create(null);
};
window.modules[name]=module();
})('transfer',function(){
var module=Object.create(null);
var exports = Object.create(null);
module.exports=exports;
exports.init = function(){
	
	$("#form").buildform({
		actions:{
			changeLeft:function(value){
				
				getTables(value,function(res){
					$("#left-table").empty();
					$.each(res,function(i,d){
						let li = $("<li>",{
							text:d
						});
						$("#left-table").append(li);
						li.click(function(){
							
							$("#left-table li").removeClass("selected");
							$(this).addClass("selected");
							
						})
					});
				})
				
			},
			changeRight:function(value){
				
				getTables(value,function(res){
					
					$("#right-table").empty();
					$.each(res,function(i,d){
						let li = $("<li>",{
							text:d
						});
						$("#right-table").append(li);
						li.click(function(){
							
							$("#right-table li").removeClass("selected");
							$(this).addClass("selected");
							
						})
					})
					console.log(res);
					
				});
			},
			trans(){
				let params = this.getParamMap();
				let leftTable = $("#right-table").find("li.selected").text();
				let rightTable = $("#right-table").find("li.selected").text();
				params.leftTable = leftTable;
				params.rightTable = rightTable;
				
				$.ajax({
					url:'transfter!trans.do',
					data:params,
					type:'post'
				}).done(res=>{
					console.log(res);
				})
			}
		}
	})
	
};
return module.exports;});