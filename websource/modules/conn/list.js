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