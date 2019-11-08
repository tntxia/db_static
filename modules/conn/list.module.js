(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('conn/list', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
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
        add() {
            router.goRoute("conn/add");
        },
        toEdit(row) {
            router.goRoute('conn/edit', {
                id: row.id
            })
        }
    }
});
    };
    return module.exports;
});