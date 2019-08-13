(function(name,module){
if(!window.modules){
window.modules=Object.create(null);
};
window.modules[name]=module();
})('operate',function(){
var module=Object.create(null);
var exports = Object.create(null);
module.exports=exports;
exports.init = function(){
	
	var rightClickTable;
	var form = $(".toolbar").buildform({
		actions:{
			changeConn:function(val){
				showConnDetail(val);
			}
		}
	});
	
	var contextmenuData = [{
		label:'数据导出',
		click:function(){
			console.log("数据导出。。。。。",rightClickTable);
		}
	}]
	
	$("#tables").delegate('li','contextmenu',function(e){
		
		rightClickTable = $(this).text();
		e.preventDefault();
		var x = e.pageX;
		var y = e.pageY;
		if($(".context-menu-jquery").length){
			$(".context-menu-jquery").css({
				top:y,
				left:x
			});
		}else{
			var div = $("<div>",{
				'class':'context-menu-jquery'
			});
			
			var ul = $("<ul>");
			
			$.each(contextmenuData,function(i,d){
				var li = $("<li>",{
					text:d.label
				});
				li.click(function(){
					var table = $(this).text();
					var action = $(this).data("action");
					action();
				});
				li.data("action",d.click);
				ul.append(li);
			});
			div.append(ul);
			
			div.css({
				position:'absolute',
				top:y,
				left:x
			})
			$(document.body).append(div);
		}
		console.log("右键点击。。。");
	});
	
	function showConnDetail(id){
	
		$.ajax({
			url:'dbconn!detail.do',
			data:{
				id:id
			}
		}).done(res=>{
			
			$("#tables").empty();
			
			var tables = res.tables;
			$.each(tables,function(i,t){
				var li = $("<li>");
				var div = $("<div>");
				div.css({
					"padding-left":20,
					position:'relative'
				});
				var spanIconTrigger = $("<span>",{
					'class':'fa fa-caret-right'
				});
				div.append(spanIconTrigger);
				var spanIconTable = $("<span>",{
					'class':'fa fa-table'
				});
				div.append(spanIconTable);
				div.append(t.name);
				li.append(div);
				
				$("#tables").append(li);
			});
			console.log("detail",res);
			
		}).fail(e=>{
			console.error(e);
		});
	}
	
	new Vue({
		el:'#app',
		data:{
			connId: '',
			result:null,
			connList:[],
			historyList:[],
			sql:null,
			currentId:null,
			current:{
				
			},
			resultModel:{
				cols:[],
				list:[]
			},
			tables:[{
				cols:["test1112222"]
			}],
			selectedTable:null
		},
		components:{
			"table-item":{
				"template":'<li @click="selectTable">\
							<div style="padding-left: 20px;position:relative;">\
						<span class="fa fa-caret-right" @click.stop="troggleTableCols"></span>\
						<span class="fa fa-table"></span>\
						 {{table.name }}\
					</div>\
					<div v-if="showChild">\
						<ul>\
							<li v-for="(c,index) in cols" :key="index">{{c}}</li>\
						</ul>\
					</div>\
				</li>',
				data(){
					return {
						cols:[],
						showChild:false
					}
				},
				props:{
					connid:{
						type:Number
					},
					table:{
						type:Object
					}
				},
				methods:{
					selectTable(){
						this.$emit("table-select");
					},
					troggleTableCols(){
						let vm = this;
						vm.showChild = !vm.showChild;
						if(!vm.showChild){
							return;
						}
						let tableName = vm.table.name;
						$.ajax({
							url:"table!getCols.do",
							data:{
								connid:vm.connid,
								tableName:tableName
							}
						}).done(function(data){
							vm.cols = data;
						}).fail(e=>{
							console.error(e);
						})
		
					}
				}
			}
		},
		mounted() {
			this.loadData();
		},
		methods:{
			loadData() {
				$.ajax({
					url: 'dbconn!list.do'
				}).done(res=> {
					this.connList = res.rows;
				})
			},
			del(event,id){
				event.stopPropagation();
				
				$.ajax({
					url : 'dbconn.do',
					data : {
						method:'delete',
						id : id
					},
					success : function(data) {
						list();
					}
				});
			},
			register(conn){
				
				let connectId = conn.id;
				let vm = this;
				$.ajax({
					url : 'register.do',
					data : {
						id : connectId
					},
					success : function(data) {
						if (data.success) {
							
							$.each(vm.connList,function(i,conn){
								if(conn.id==connectId){
									conn.selected = true;
									vm.current = conn;
								}else{
									conn.selected = false;
								}
								
							});
							
						} else {
							alert("操作失败！" + data.msg);
						}

					}
				});
			},
			addConn(){
				router.goRoute("conn_add");
				$scope.model = {};
				$scope.model.method = "conn_add";
				$("#createModal").modal('show');
			},
			doAdd(){
				$.ajax({
					url : 'dbconn.do',
					data : $scope.model,
					success : function(data) {
						if (data.success) {
							alert("操作成功");
							list();
						} else {
							alert("操作失败");
						}
					}
				});
			},
			dbTypeChange(){
				var type = $scope.model.db_type;
				
				if (type == "h2") {
					$scope.model.url = "jdbc:h2:<path>";
					$scope.model.driver = "org.h2.Driver";
				} else if(type== "jndi"){
					$scope.model.url = "java:";
				}
			},
			chooseFile(event){
				event.stopPropagation();
				fileChoose.show();
			},
			clearFileChoose(){
				fileChoose.hide();
			},
			execute(){
				
				let vm = this;
				
				var textarea = document.getElementById("sql");
				
				var start = textarea.selectionStart;
				var end = textarea.selectionEnd;
				var sql;
				if (end > start)
					sql = textarea.value.substring(start, end);
				else
					sql = textarea.value;
				
					debugger
				let id = this.connId;
				
				$.ajax({
					url : 'execute.do',
					type : 'post',
					data : {
						connid:id,
						sql : sql
					},
					success : function(data) {
						
						if (data.success) {
							
							if(data.cols){
								var opt = {};
								
								if(!vm.resultModel){
									vm.resultModel = {};
								}
								vm.resultModel.cols = data.cols;
								vm.resultModel.list = [];
								for(var i=0;i<data.list.length;i++){
									var item = data.list[i];
									
									$.each(item,function(i,d){
										if(d && d.length>40){
											item[i] = "...";
										}
									});
									
									vm.resultModel.list.push(item);
								}
								vm.resultModel.hasResult = true;
							}else{
								vm.result = "操作成功";
								vm.getTables();
							}
							
						} else {
							alert("操作失败"+data.exception);
						}

					}
				});
			},
			openHistoryDialog(){
				var connid= $scope.current.id;
				
				$.ajax({
					url : 'dbconn!getHistory.do',
					type : 'post',
					data : {
						connectId:connid
					},
					success : function(data) {
						$scope.historyList = data.rows;
						$scope.$apply();
					}
				})
				$("#historyModal").modal('show');
			},
			setSql(sql){
				$scope.sql = sql;
				$("#historyModal").modal('hide');
			},
			changeConn(){
				
			},
			dropTable(){
				let vm = this;
				let connid = vm.currentId;
				let selectedTable = vm.selectedTable;
				let sql = "drop table "+selectedTable;
				http.post({
					url:'execute.do',
					data:{
						connid,
						sql
					}
				}).then(function(res){
					if(res.success){
						
					}else{
						alert("操作失败");
					}
				},function(e){})
				
			}
		}
	});
	
};
return module.exports;});