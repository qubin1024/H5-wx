<template>
    <div class="people-home">
        <div class="head bg">
            <img src="@/assets/img/water-bg.png" width="100%" height="100%"/>
            <div class="content">
                <div class="start">
                    <van-button icon="arrow-left" type="default" @click="logout">退出登录</van-button>
                    <van-button icon="edit" type="default" @click="changePassword">修改密码</van-button>
                </div>
                <div class="end">
                    <div class="head-img">
                        <img :src="userInfo.headimgurl" width="95%" height="95%"/>
                    </div>
                    <van-button icon="phone-o" type="default">{{userInfo.mobile}}</van-button>
                </div>
            </div>
        </div>
        <div class="center">
            <span class="t1">还有<span v-html="timeElapse(userInfo.endTime)"></span>小时到期 <van-button type="info" size="small">充值</van-button></span>
            <span class="t2">{{dateFtt('yyyy年MM月dd日hh:mm到期', new Date(userInfo.endTime))}}</span>
        </div>
        <van-grid :column-num="3" style="margin-top: 20px;">
            <van-grid-item
                @click="click(item)"
                v-if="item.icon != 'fire' || userInfo.userFlag =='admin'"
                v-for="item in list"
                :key="item.label"
                :icon="item.icon"
                :text="item.label"
            />
        </van-grid>
        <div class="center link"  @click="makeActive" style="margin-top: 20px;">
            <div class="icon">制作活动</div>
            <div class="cont">
                <span class="t1">点我制作新的活动</span>
                <span class="t2">不定期更新各种爆款活动</span>
            </div>
            <van-icon name="arrow" style="color: #ccc;" />
        </div>
        <div class="center link" @click="myActive" style="margin-bottom: 20px;">
            <div class="icon">管理活动</div>
            <div class="cont">
                <span class="t1">我的活动</span>
            </div>
            <van-icon name="arrow" style="color: #ccc;" />
        </div>    
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "people-home",
  data() {
    return {
      list: [
        {
          label: "推广赚钱",
          icon: "friends"
        },
        {
          label: "我的钱包",
          icon: "coupon"
        },
        {
          label: "收费方式",
          icon: "gold-coin"
        },
        {
          label: "案例库",
          icon: "send-gift"
        },
        {
          label: "常见问题",
          icon: "question"
        },
        {
          label: "活动教程",
          icon: "column"
        },
        {
          label: "联系客服",
          icon: "chat"
        },
        {
          label: "关注公众号",
          icon: "chat"
        },
        {
          label: "砍价",
          icon: "fire"
        },
        {
          label: "标签",
          icon: "bookmark"
        }
      ]
    };
  },
  mounted (){
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'userInfo',
      code: 'code'
    })
  },
  methods: {
    ...mapMutations('common', {
      setUser: "setUser"
    }),
    async logout(){
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      let {data: res} =  await this.$api.common.logout();
      this.$toast.clear();
      if(res.code === "0000"){
        this.$router.push({path: "login"})
        this.setUser(null)
        this.$notify({type: "success", message: "退出成功"})
      } else {
        this.$notify({type: "danger", message: res.msg})
      }
    },
    changePassword(){
      this.$router.push({path: "retrieve"})
    },
    makeActive(){
      this.$router.push({path: 'activityList'})
    },
    myActive(){
      this.$router.push({path: 'templateList'})
    },
    timeElapse(date){
      var current = new Date();
      var seconds = (Date.parse(date) - Date.parse(current)) / 1000;
      var days = Math.floor(seconds / (3600 * 24));
      seconds = seconds % (3600 * 24);
      var hours = Math.floor(seconds / 3600);
      if (hours < 10) {
        hours = "0" + hours;
      }
      seconds = seconds % 3600;
      var minutes = Math.floor(seconds / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      seconds = seconds % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return '<span style="color: red;">' + days + '</span>天<span style="color: red;">' + hours + '</span>';
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
    },
    click(item){
      if(item.label === '砍价'){
        this.$router.push({path: 'bargainDev', query: {
          isAdmin: true
        }})
      }
      if(item.label === '标签'){
        this.$router.push({path: 'addbar'})
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.people-home {
  background: rgb(241, 241, 241);
}
.center {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid rgb(231, 231, 231);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .t1 {
    font-size: 20px;
    color: rgb(136, 136, 136);
  }
  .t2 {
    font-size: 12px;
    color: rgb(212, 211, 211);
  }
}
.center.link {
  height: 90px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .icon {
    width: 70px;
    height: 70px;
    font-size: 24px;
    background: rgb(97, 132, 247);
    line-height: 35px;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
  .cont {
    display: flex;
    flex-direction: column;
    width: 200px;
    justify-content: center;
    .t1 {
      font-size: 24px;
      color: rgb(22, 22, 22);
    }
    .t2 {
      font-size: 16px;
      color: red;
    }
  }
}
.head-img {
  img {
    border-radius: 50%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
}
.end {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.head-img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid #ccc;
}
/deep/ .van-button--default {
  background: #fff0;
  border: 0;
  .van-icon,
  .van-button__text {
    color: #fff;
    font-weight: bold;
  }
}
.start {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.head {
  height: 200px;
  position: relative;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.bg {
  background-color: #e74c3c;

  animation: bg-color 20s infinite;

  -webkit-animation: bg-color 20s infinite;
}

@-webkit-keyframes bg-color {
  0% {
    background-color: #e74c3c;
  }

  20% {
    background-color: #f1c40f;
  }

  40% {
    background-color: #1abc9c;
  }

  60% {
    background-color: #3498db;
  }

  80% {
    background-color: #9b59b6;
  }

  100% {
    background-color: #e74c3c;
  }
}

@keyframes bg-color {
  0% {
    background-color: #e74c3c;
  }

  20% {
    background-color: #f1c40f;
  }

  40% {
    background-color: #1abc9c;
  }

  60% {
    background-color: #3498db;
  }

  80% {
    background-color: #9b59b6;
  }

  100% {
    background-color: #e74c3c;
  }
}
</style>


