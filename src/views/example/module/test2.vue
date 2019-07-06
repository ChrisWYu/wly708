<template>
    <div>
        <div>test2</div>
    </div>
</template>

<script>


    export default {
        components: {},
        data: function () {
            return {}
        },
        methods: {
            routeGo(e) {
                console.log(e);
                this.$router.push(
                    {
                        name: 'test'
                    }
                );

            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style>
    .el-submenu .el-menu {
        background-color: #fff !important;
    }

</style>