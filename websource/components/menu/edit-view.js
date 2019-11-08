module.exports = {
    props: ['id'],
    data() {
        return {
            form: {}
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            let me = this;
            let id = this.id;
            $.ajax({
                url: 'menu!detail.do',
                data: {
                    id: id
                }
            }).done(res => {
                me.form = res;
            })
        },
        sub() {
            let me = this;
            let form = this.form;
            $.ajax({
                url: 'menu!update.do',
                type: "post",
                data: form,
                cache: false,
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    me.back();
                } else {
                    alert("操作失败");
                }
            })
            console.log(form);
        }
    },
    watch: {
        id() {
            this.loadData();
        }
    }
}