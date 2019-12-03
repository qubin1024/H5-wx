<template>
    <div class="time-wrap">
        <div>
            活动时间：
            <van-field class="v-input" v-model="startTime" placeholder="开始时间"  @click="selectStart" disabled/>
            到
            <van-field class="v-input" v-model="endTime" placeholder="结束时间" @click="selectEnd" disabled/>
            <van-popup v-model="startShow" position="bottom">
                    <van-datetime-picker
                        type="datetime"
                        :formatter="formatter"
                        :min-date="new Date()"
                        @cancel="cancel"
                        @confirm="sconfirm"
                    />
            </van-popup>
            <van-popup v-model="endShow" position="bottom">
                    <van-datetime-picker
                        type="datetime"
                        :formatter="formatter"
                        :min-date="startTime != '' ? new Date(startTime) : new Date()"
                        @cancel="cancel"
                        @confirm="econfirm"
                    />
            </van-popup>
        </div>
        <div style="font-size: 14px; color: #0d1a31;">（活动周期建议5～7天）</div>
    </div>
</template>
<script>
export default {
    name: "create-time",
    data(){
        return {
            // startTime: "",
            // endTime: "",
            startShow: false,
            endShow: false,
            minDate: new Date(),
            currentDate: new Date()
        }
    },
    props: {
        startTime: {
            type: String,
            default: ''
        },
        endTime: {
            type: String,
            default: ''
        } 
    },
    methods:{
        selectStart(){
            this.startShow = true;
        },
        selectEnd (){
            this.endShow = true;
        },
        cancel(){
            this.startShow = false;
            this.endShow = false;
        },
        sconfirm(value){
            this.startShow = false;
            let startTime = this.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(value));
            this.$emit("update:startTime", startTime);
        },
        econfirm(value){
            this.endShow = false;
            let endTime = this.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(value));
            this.$emit("update:endTime", endTime);
        },
        formatter(type, value){
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`
            } else if (type === 'day' ) {
                return `${value}日`
            } else if (type === 'hour' ) {
                return `${value}小时`
            } else {
                return `${value}分`
            }
            return value;
        },
        dateFtt(fmt,date) { //author: meizz   
            var o = {   
                "M+" : date.getMonth()+1,                 //月份   
                "d+" : date.getDate(),                    //日   
                "h+" : date.getHours(),                   //小时   
                "m+" : date.getMinutes(),                 //分   
                "s+" : date.getSeconds(),                 //秒   
                "q+" : Math.floor((date.getMonth()+3)/3), //季度   
                "S"  : date.getMilliseconds()             //毫秒   
            };   
            if(/(y+)/.test(fmt))   
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
            for(var k in o)   
                if(new RegExp("("+ k +")").test(fmt))   
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
            return fmt;   
        } 
    }
}
</script>

<style scoped>
.v-input {
    display: inline-block;
    width: 100px;
    border: 1px dashed #0d1a31;
    border-radius: 5px;
}
.time-wrap{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
}
div.time-wrap > div {
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>