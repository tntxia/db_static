(function(name,module){
if(!window.modules){
window.modules=Object.create(null);
};
window.modules[name]=module();
})('conn',function(){
var module=Object.create(null);
var exports = Object.create(null);
module.exports=exports;
exports.init = function(){
	
	new Vue({
		el: '#app',
		data: {
			form: {
				id: null,
				name: null,
				url: null
			},
			dataset: {
				url: "dbconn!list.do"
			}
		},
		mounted() {
			
		},
		methods: {
			toEdit(row) {
				router.goRoute('conn_edit', {
					id: row.id
				})
			}
		}
	})
	
	$("#toolbar").buildform({
		actions:{
			add(){
				router.goRoute("conn_add");
			}
		}
	});
	
};
return module.exports;});