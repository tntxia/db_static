(function(name,module){
if(!window.modules){
window.modules=Object.create(null);
};
window.modules[name]=module();
})('conn_add',function(){
var module=Object.create(null);
var exports = Object.create(null);
module.exports=exports;
exports.init = function(){
	
	$("#connTypeSpan").hide();
	
	let choosePath;
	
	var fileChoose = new FileChoose({
		id:'fileChoose',
		onChange:function(path){
			choosePath = path;
			renderDefaultValue();
		}
	});
	
	let form = $("#form").buildform({
		actions:{
			dbTypeChange(value){
				if(value=="h2"){
					$("#connTypeSpan").show();
				}else{
					$("#connTypeSpan").hide();
				}
				renderDefaultValue();
			},
			chooseFile(){
				fileChoose.show();
			},
			sub(){
				let params = this.getParamMap();
				http.post({
					url:'dbconn!add.do',
					data:params
				}).then(res=>{
					if(res.success){
						router.goRoute("operate");
					}else{
						alert("操作失败");
					}
					
				},e=>{
					
				})
			}
		}
	});
	
	function renderDefaultValue(){
		let params = form.getParamMap();
		let dbType = form.getValue("dbType");
		if(dbType=="h2"){
			let url = "jdbc:h2:tcp://localhost:9394/";
			if(choosePath && choosePath.indexOf(".h2.db")>0){
				url+=choosePath.replace(".h2.db","");
			}
			form.setValue("url",url);
			form.setValue("driver","org.h2.Driver");
			form.setValue("username","sa");
			form.setValue("password","sa");
		}else if(dbType=="sqlserver"){
			form.setValue("url","jdbc:sqlserver://<host>:<port>;DatabaseName=<dbName>");
		}
			
		
	}
	
	var fileChooseStore = [];
	
};
return module.exports;});