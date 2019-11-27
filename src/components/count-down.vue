  
<template>
    <span class="time-wrap" :endTime="endTime"  :endText="endText">
        <slot>
            <span><i class="fa fa-clock-o" style="color: #de261d" aria-hidden="true"></i>活动倒计时</span>
            <span v-html="content"></span>
        </slot>
    </span>
</template>
<script>
export default {
  name: "count-down",
  data() {
    return {
      content: ""
    };
  },
  props: {
    endTime: {
      type: String,
      default: ""
    },
    startTime: {
      type: String,
      default: ""
    },
    endText: {
      type: String,
      default: "已结束"
    }
    // callback : {
    //     type : Function,
    //     default :''
    // }
  },
  mounted() {
    this.countdowm(this.endTime, this.startTime);
  },
  methods: {
    countdowm(timestamp, startime) {
      let self = this;
      let timer = setInterval(function() {
        let startTime = new Date(startime);
        let nowTime = new Date();
        let endTime = new Date(timestamp);
        
        if(endTime.getTime() > nowTime.getTime() && nowTime.getTime() > startTime.getTime()){
          let t = endTime.getTime() - nowTime.getTime(); 
          if (t > 0) {
            let day = Math.floor(t / 86400000);
            let hour = Math.floor((t / 3600000) % 24);
            let min = Math.floor((t / 60000) % 60);
            let sec = Math.floor((t / 1000) % 60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let format = "";
            if (day > 0) {
              format = `<span class="time-v">0${
                day + "" == 1 ? "0" + day : day
              }</span>天<span class="time-v">${hour}</span>小时<span class="time-v">${min}</span>分<span class="time-v">${sec}</span>秒`;
            }
            if (day <= 0 && hour > 0) {
              format = `<span class="time-v">${hour}</span>小时<span class="time-v">${min}</span>分<span class="time-v">${sec}</span>秒`;
            }
            if (day <= 0 && hour <= 0) {
              format = `<span class="time-v">${min}</span>分<span class="time-v">${sec}</span>秒`;
            }
            self.content = format;
          } 
        } 
        if(endTime.getTime() < nowTime.getTime()){
          clearInterval(timer);
          return self.content = "已经结束"
        }
        if(startTime.getTime() > nowTime.getTime()){
          clearInterval(timer);
          return self.content = "还未开始"
        }
        
     }, 1000);
    }
  }
};
</script>
<style >
.time-wrap {
  display: block;
  font-size: 0.4rem;
  font-family: "yahei";
  line-height: 1rem;
  background: #fff;
  display: flex;
  justify-content: space-around;
}
.time-v {
  display: inline-block;
  background: #f5a0a0;
  height: 0, 6rem;
  line-height: 0.6rem;
  margin: 0 5px;
  padding: 2px;
  border-radius: 5px;
}
</style>
