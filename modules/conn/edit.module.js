(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('conn/edit', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        form: {
            id: null,
            name: null,
            db_type: 'h2',

        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            $.ajax({
                url: 'dbconn!detail.do',
                data: {
                    id: id
                }
            }).done(res => {
                this.form = res;
            })
        },
        sub() {
            let params = this.form;
            http.post({
                url: 'dbconn!update.do',
                data: params
            }).then(res => {
                if (res.success) {
                    router.goRoute("conn");
                } else {
                    alert("操作失败");
                }
            }, e => {

            })
        }
    }
})

// $("#connTypeSpan").hide();

let choosePath;

var fileChoose = new FileChoose({
    id: 'fileChoose',
    onChange: function(path) {
        choosePath = path;
        renderDefaultValue();
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