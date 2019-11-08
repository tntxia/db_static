module.exports = {
    props: ['id'],

    data() {
        return {
            parent: null,
            form: {}
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            if (this.id) {
                let me = this;
                let pid = this.id;
                $.ajax({
                    url: 'menu!detail.do',
                    data: {
                        id: pid
                    }
                }).done(res => {
                    me.parent = res.name;
                })
            } else {
                this.parent = "无";
            }
        },
        sub() {
            let me = this;
            let form = this.form;
            form.pid = this.id;
            $.ajax({
                url: 'menu!add.do',
                type: "post",
                data: form,
                cache: false,
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    me.$parent.loadData();
                } else {
                    alert("操作失败");
                }
            })
            console.log(form);
        }
    },
    watch: {
        id() {
            debugger
            this.loadData();
            this.form = {};
        }
    }
}