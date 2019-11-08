(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('<%=name%>', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        <%=init%>
        return module.exports;
    })(),

)