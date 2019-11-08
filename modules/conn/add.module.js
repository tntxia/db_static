(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('conn/add', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        $("#connTypeSpan").hide();
let choosePath;

var fileChoose = new FileChoose({
    id: 'fileChoose',
    onChange: function(path) {
        choosePath = path;
        renderDefaultValue();
    }
});

let fileChooseComp = {
    render: function(h) {

        if (!this.showFlag) {
            return h();
        }

        let me = this;
        let domTree = new VueRenderDomTree(h);
        domTree.setOptions({
            'class': 'file-choose'
        });
        let title = domTree.createElement('div', {
            'class': 'title-bar'
        });
        title.createElement('button', {
            text: '关闭',
            on: {
                click: function() {
                    me.showFlag = false;
                }
            }
        });
        let treeDiv = domTree.createElement("div", {
            'class': 'tree'
        });

        appendToTree(treeDiv, this.tree);
        return domTree.render();

        function appendToTree(parent, data) {
            data.forEach(d => {
                let el = parent.createElement('div', {
                    text: d.name,
                    'class': 'tree-node',
                    on: {
                        click: function(e) {
                            e.stopPropagation();
                            console.log(d);
                        }
                    }
                });
                if (d.children) {
                    appendToTree(el, d.children);
                }
            })
        }
    },
    data() {
        return {
            showFlag: false,
            tree: [{
                name: "C:",
                path: 'c:',
                children: [{
                    name: 'windows',
                    path: 'c:\\windows'
                }]
            }]
        }
    },
    methods: {
        show() {
            this.showFlag = true;
        },
        choose(file) {
            this.$emit("choose", file);
        }
    }
}

new Vue({
    el: '#app',
    components: {
        'file-choose': fileChooseComp
    },
    methods: {
        chooseFile() {
            this.$refs.fileChoose.show();
        }
    }
});

let form = $("#form").buildform({
    actions: {
        dbTypeChange(value) {
            if (value == "h2") {
                $("#connTypeSpan").show();
            } else {
                $("#connTypeSpan").hide();
            }
            renderDefaultValue();
        },
        chooseFile() {
            fileChoose.show();
        },
        sub() {
            let params = this.getParamMap();
            http.post({
                url: 'dbconn!add.do',
                data: params
            }).then(res => {
                if (res.success) {
                    router.goRoute("operate");
                } else {
                    alert("操作失败");
                }

            }, e => {

            })
        }
    }
});

function renderDefaultValue() {
    let params = form.getParamMap();
    let dbType = form.getValue("dbType");
    if (dbType == "h2") {
        let url = "jdbc:h2:tcp://localhost:9394/";
        if (choosePath && choosePath.indexOf(".h2.db") > 0) {
            url += choosePath.replace(".h2.db", "");
        }
        form.setValue("url", url);
        form.setValue("driver", "org.h2.Driver");
        form.setValue("username", "sa");
        form.setValue("password", "sa");
    } else if (dbType == "sqlserver") {
        form.setValue("url", "jdbc:sqlserver://<host>:<port>;DatabaseName=<dbName>");
    }


}

var fileChooseStore = [];
    };
    return module.exports;
});