<template>
    <div class="user-center" @click="goHome">
        商户中心
    </div>   
</template>

<script>
export default {
    name: "user-center",
    methods: {
        goHome(){
            this.$router.push({path: 'peopleHome'})
        }
    }
}
</script>

<style scoped>
.user-center{
    position: fixed;
    right: 0.53333rem;
    top: 0.26667rem;
    font-size: 0.8rem;
    color: #000;
    z-index: 1000;
    width: 1rem;
    height: 1rem;
    font-size: 13px;
    background: #000;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    line-height: 14px;
    display: flex;
    align-items: center;      
}
</style>