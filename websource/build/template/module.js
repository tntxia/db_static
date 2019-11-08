(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('<%=name%>', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        <%=init%>
    };
    return module.exports;
});