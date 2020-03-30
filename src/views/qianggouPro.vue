<template>
  <div class="wrap" ref="bgimage">
    <!-- <music></music> -->
    <user-center></user-center>
    <special></special>
        <div class="user-info">
          <span @click="likeClick"> <van-icon name="like" :class="{'like': !!metaData.likeflag }" />{{metaData.likeNum}}</span>
          <span> <van-icon name="eye" />{{metaData.viewNum}}</span>
          <span> <van-icon name="friends" />{{metaData.shareNum}} </span>
          <span @click="commentShow = true"> <van-icon name="chat-o" />写评论 </span>
        </div>
    <img v-if="metaData.headImage" :src="metaData.headImage" width="100%" />
    <img v-else src="@/assets/img/qianggou.jpeg" width="100%" />
    <div class="activity-name">{{metaData.activityName}}</div>
     <div class="head-cell">
        <div>
            <span><i class="fa fa-eercast" aria-hidden="true"></i> 目标量</span>
            <span>{{metaData.targetQuantity}}</span>
        </div>
        <div class="line"></div>
        <div>
            <span><i class="fa fa-snowflake-o" aria-hidden="true"></i> 参与者</span>
            <span>{{users.length}}</span>
        </div>
        <div class="line"></div>
        <div>
            <span><i class="fa fa-share-alt" aria-hidden="true"></i> 访问量</span>
            <span>{{metaData.visits + metaData.virtualPopularity}}</span>
        </div>    
    </div>   
    <content-wrap v-if="!!metaData.startTime && metaData.endTime">
      <count-down class="time-wrap" :startTime="metaData.startTime" :endTime="metaData.endTime"></count-down>
    </content-wrap>

    <div class="wrap-2" v-show="active == 'pay'">
        <div class="img"><img width="100%" height="100%" :src="headimgurl" /></div>
        <div class="text">
            <span style="font-size: 0.3rem;">{{userName}}</span>
            <span style="color: #a5a5a5;">邀请您参与本活动，机不可失，失不再来哦！</span>
        </div>
    </div>

    <div class="wrap-3" v-show="active == 'pay'" >
        <div v-for="(item, index) in users" :key="index">
            <img :src="item.headimgurl"/>
            <span>{{item.nickname}}</span>
        </div>
    </div>
    <div class="panel" v-show="active == 'pay'">
        <span class="panel-head">购买记录</span>
        <div>
            <scroll :list="order"></scroll>
        </div>
    </div>

    <div class="panel"  v-show="active == 'pay'" v-if="!!metaData.activityRules  && metaData.activityRules.length">
        <span class="panel-head">活动介绍</span>
        <div v-for="item in metaData.activityRules" :key="item.key" style="line-height: 0.4rem;">
          <img
            v-if="item.type == 'img' && !!item.imgUrl"
            :src="item.imgUrl"
            style=" width: 100%;display: block;"
          />
          <pre
            v-if="item.type == 'text'"
            style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;"
          >{{item.text}}</pre>
          <video
            v-if="item.type == 'media'"
            :src="item.link"
            ontrols="controls"
            preload="meta"
            width="100%"
            height="240"
            x-webkit-airplay="true"
            webkit-playsinline="true"
            playsinline="true"
            x5-video-player-fullscreen="true"
            x5-video-player-type="h5"
            controls
          ></video>
        </div>
    </div>
    <div  v-show="active == 'pay'" class="phone" @click="phone">
      <a :href="'tel:' + metaData.phone" style="font-size: 0.4rem; width: 1rem;
color: #7eceef;
font-weight: bold;margin: 0.1rem;
line-height: 0.4rem;">联系商家</a>
    </div>
     <div class="phone" v-if="metaData.phone">
      <a
        :href="'tel:' + metaData.phone"
        style="font-size: 0.4rem; width: 1rem;
        color: #7eceef;
        font-weight: bold;margin: 0.1rem;
        line-height: 0.4rem;"
      >联系商家</a>
    </div>
    <div class="panel"  v-show="active == 'order'" >
        <span class="panel-head">我的订单</span>
        <div>
            <div class="head-cell" style="background: rgb(236, 236, 236);border-radius: 0.1rem;border: 1px solid #ccc;height:1rem;">
              <div style="color:#ef5a5a;">
                  <span><i class="fa fa-user-circle" aria-hidden="true"></i> 头像</span>
              </div>
              <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
              <div style="color:#ef5a5a;">
                  <span><i class="fa fa-jpy" aria-hidden="true"></i> 金额</span>
              </div>
              <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
              <div style="color:#ef5a5a;">
                  <span><i class="fa fa-recycle" aria-hidden="true"></i> 状态</span>
              </div>    
          </div>  
          <div v-for="item in orderList" :key="item.order_id" class="head-cell" style="background: rgb(236, 236, 236);border-radius: 0.1rem;border: 1px solid #ccc;height:1rem;border-top:0;">
              <div style="color:#ef5a5a;">
                  <span><img :src="item.headimgurl" style="width: 0.7rem;height: 0.7rem;" /></span>
              </div>
              <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
              <div style="color:#ef5a5a;">
                  <span>{{item.total_price}}</span>
              </div>
              <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
              <div style="color:#ef5a5a;">
                  <span>{{item.order_status}}</span>
              </div>    
          </div>  
          
        </div>
    </div>
    <div class="panel" v-show="active == 'order'" v-if="!!metaData.redRules && metaData.redRules.length" >
        <span class="panel-head">红包发放说明</span>
        <div v-for="item in metaData.redRules" :key="item.key" style="line-height: 0.4rem;">
          <img
            v-if="item.type == 'img' && !!item.imgUrl"
            :src="item.imgUrl"
            style=" width: 100%;display: block;"
          />
          <pre
            v-if="item.type == 'text'"
            style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;"
          >{{item.text}}</pre>
          <video
            v-if="item.type == 'media'"
            :src="item.link"
            ontrols="controls"
            preload="meta"
            width="100%"
            height="240"
            x-webkit-airplay="true"
            webkit-playsinline="true"
            playsinline="true"
            x5-video-player-fullscreen="true"
            x5-video-player-type="h5"
            controls
          ></video>
        </div>
    </div>
    <div class="panel"  v-show="active == 'package'" >
        <span class="panel-head">我的推广红包 </span>
        <div>
          <div class="head-cell" style="background: rgb(236, 236, 236);border-radius: 0.1rem;border: 1px solid #ccc;height:1rem;">
            <div style="color:#ef5a5a;">
                <span><i class="fa fa-user-circle" aria-hidden="true"></i> 客户</span>
            </div>
            <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
            <div style="color:#ef5a5a;">
                <span><i class="fa fa-recycle" aria-hidden="true"></i>状态</span>
            </div>
            <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
            <div style="color:#ef5a5a;">
                <span><i class="fa fa-jpy" aria-hidden="true"></i> 收益</span>
            </div>    
        </div> 
          <div v-for="item in packageList" :key="item.order_id" class="head-cell" style="background: rgb(236, 236, 236);border-radius: 0.1rem;border: 1px solid #ccc;height:1rem;border-top:0;">-->
            <div style="color:#ef5a5a;">
                <span><img :src="item.headimgurl" style="width: 0.7rem;height: 0.7rem;" /></span>
            </div>
            <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
            <div style="color:#ef5a5a;">
                <span>{{item.order_status}}</span>
            </div>
            <div class="line" style="background: #ccc; height: 100%;width: 2px;"></div>
            <div style="color:#ef5a5a;">
                <span>{{item.total_price}}</span>
            </div>   
          </div> 
        <span style="font-size: 0.3rem;">红包领取请到微信“服务通知”查看领取</span>
        </div>
    </div>
    <img v-if="metaData.footImage" :src="metaData.footImage" width="100%" />
    <div class="footer2">
        <div class="btn-c" v-show="home" @click="show" style="width: 50%;" :style="{'background': active == 'pay' ? '#fdd926' : ''}">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i> 我要抢购
        </div>
        <div class="btn-c" v-show="home" @click="getorder" style="width: 50%;" :style="{'background': active == 'order' ? '#fdd926' : ''}">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i> 我的订单
        </div>
        <div class="btn-c" v-show="!home" @click="goback">
            <i class="fa fa-bullhorn" aria-hidden="true"></i> 返回首页
        </div>
        <div class="btn-c" v-show="!home"  @click="getorder" :style="{'background': active == 'order' ? '#fdd926' : ''}">
            <i class="fa fa-list-alt" aria-hidden="true"></i>  我的订单
        </div>
        <div class="btn-c" v-show="!home" @click="package2" :style="{'background': active == 'package' ? '#fdd926' : ''}">
            <i class="fa fa-bullhorn" aria-hidden="true"></i> 我的推广红包
        </div>
    </div>
    <div class="footer" v-if="!urlParams.id">
      <van-button
        round
        type="info"
        @click="goback"
        style="background:#ececec;border-color: #ececec; color: #0b206d;"
      >返回编辑</van-button>
      <van-button
        round
        type="info"
        style="background:#0b206d;border-color: #0b206d;"
        @click="save"
      >保存活动</van-button>
    </div>
   
    <van-popup 
      v-model="commentShow"
      position="bottom"
      round
      :style="{ height: '50%' }">
      <div class="commond-wrap">
        <comment v-if='commentShow' :id='urlParams.id'  ispro="1" :user-id="user_id"></comment>
      </div>
      </van-popup>

    <van-dialog
      v-model="shown"
      title="报名信息"
      @close="dialogClose"
      @confirm="dialogConfirm"
      show-cancel-button
    >
      <van-cell-group>
        <van-field
          v-model="dialogInfo.user_name"
          required
          clearable
          v-if="metaData.question1"
          :label="metaData.question1"
          :placeholder="`请输入${metaData.question1}`"
        />
        <van-field
          v-model="dialogInfo.mobile"
          required
          clearable
          v-if="metaData.question2"
          :label="metaData.question2"
          :placeholder="`请输入${metaData.question2}`"
        />
        <van-field
          v-model="dialogInfo.question3"
          required
          clearable
          v-if="metaData.question3"
          :label="metaData.question3"
          :placeholder="`请输入${metaData.question3}`"
        />
        <van-field
          v-model="dialogInfo.question4"
          required
          clearable
          v-if="metaData.question4"
          :label="metaData.question4"
          :placeholder="`请输入${metaData.question4}`"
        />
        <van-field
          v-model="dialogInfo.question5"
          required
          clearable
          v-if="metaData.question5"
          :label="metaData.question5"
          :placeholder="`请输入${metaData.question5}`"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script>
import Music from "../components/music";
import UserCenter from "../components/userCenter";
import ContentWrap from "../components/contentWrap";
import VTextarea from "../components/textarea";
import AddFile from "../components/addFile";
import AddComponent from "../components/addComponent";
import OrderSoft from "../components/orderSoft";
import TitleActive from "../components/titleActive";
import ThemeActivity from "../components/theme";
import Special from "../components/special";
import CreateTime from "../components/time";
import CountDown from "../components/count-down";
import Comment from "../components/comment";
import Scroll from "../components/scroll";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "qianggou-pro",
  data() {
    return {
      metaData: {
        id: '',
        templateId: '',
        page1Title: '默认标题',
        headImage: '',
        footImage: '',
        bgImage: '',
        focusOnPop: 1,
        focusOnRed: 1,
        shareRedEnvelopes: 1,
        distributionSeries: 0,
        activityTheme: '',
        triggerKeywords: '',
        wechatDescription: '',
        thumbnail: '',
        virtualPopularity: 0,
        music: '',
        autoPlayMusic: 1,
        phone: '',
        targetQuantity: 0,
        productPrice: '',
        noPaymentNum: 1,
        maxValue: 0,
        minValue: 0,
        redEnvelopesName: '',
        redEnvelopesBlessings: '',
        oneKeyConcern: '',
        wechatPic: '',
        templateStyle: '',
        activityRules: [],
        redRules: [],
        activityDestription: [],
        activityName: '',
        activityType: '',
        startTime: '',
        endTime: '',
        upUser: '',
        upTime: '',
        activityState: '',
        createUser: '',
        question1: "姓名",
        question2: "电话",
        question3: "",
        question4: "",
        question5: "",
        address: "",
        viewNum: 0,
        likeflag: 1,
        likeNum: 0,
},
      urlParams: {
        id: null
      },
      dialogInfo: {
        name: "",
        mobile: "",
        question3: "",
        question4: "",
        question5: ""
      },
      home: true,
      active: "pay",
      headimgurl: "",
      users: [],
      order: [],
      orderList: [],
      packageList: [],
      user_id: "",
      b_userId: "",
      userName: "",
      name: "",
      shareId: "",
      like: 0,
      prize: null,
      shown: false,
      pshown: false,
      commentShow: false,
      tlist: [],
      barginLogList: []
    };
  },
  provide: {
    isEdit: false
  },
  computed: {
    ...mapGetters("common", {
      qianggouData: "qianggouData"
    })
  },
  watch: {
    metaData: {
      handler: function(newData) {
        console.log(newData);
      },
      immediate: true,
      deep: true
    }
  },
  filters: {
    filterusername(userName) {
      if (typeof userName == "string") {
        return userName.replace(
          /^(.{1})(?:[\u4e00-\u9fa5, \w]+)(.{1})$/,
          "$1*$2"
        );
      } else {
        return userName;
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
     show() {
      this.active = "pay";
      this.shown = true;
    },
    goback() {
      this.home = true;
      this.active = "pay";
    },
    phone() {
      this.pshown = true;
    },
    package2() {
      this.active = "package";
      this.$api.common.getOrderByFromUserId({
        activityId: this.urlParams.id,
        from_user: this.urlParams.userid || ""
      })
        .then(({ data: res }) => {
          this.loading = false;
          this.packageList = res.result.data;
        });
    },
    getorder() {
      this.active = "order";
      this.home = false;
      this.$api.common.getOrderByUserIdAndActivityId({
        activityId: this.urlParams.id,
        user_id: this.user_id || ""
      }).then(({ data: res }) => {
        this.orderList = res.result.data;
      });
    },
    async gatherLike(params){
      let {data: res} = await this.$api.common.gatherLike(params)
      if (res.code == '0000') {
            this.$toast(`恭喜你点赞成功！`);
            let {data: res2} = await this.$api.common.queryLikeLog({
              id: this.shareId
            });
            if (res2.code == "0000") {
              this.tlist = res2.result.data;
            }
          } else {
            this.$toast(res.msg);
          }
    },
    dialogClose() {
      this.dialogInfo = {
        user_name: "",
        mobile: "",
        question3: "",
        question4: "",
        question5: ""
      };
    },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
    async dialogConfirm() {
      if (!this.dialogInfo.user_name || !this.dialogInfo.mobile) {
        // 显示文字
        return this.$notify({ type: "danger", message: "请填写姓名，电话!" });
      } 
      let max = this.metaData.maxValue;
      let min = this.metaData.minValue;
      let { data: res } = await this.$api.common.save(
          {
            activityId: this.urlParams.id,
            from_user: this.urlParams.userid || "",
            red_packets: this.randomNum(min, max),
            total_price: this.metaData.productPrice,
            user_name: this.dialogInfo.user_name,
            user_type: 0,
            mobile: this.dialogInfo.mobile,
            user_id: this.user_id
          }
      );
      if (res.code == "0000") {
        location.href = location.origin + 
              "/statics/dist/pay.html?user_id=" +
              this.user_id +
              "&total_fee=" +
              this.metaData.productPrice.toFixed(2) +
              "&orderId=" +
              res.result.orderId;
      } else {
        this.$toast(res.msg);
      }
    },
    async likeClick(){
      let {data: res} = await this.$api.common.updateActivityState({
        createUser: this.user_id,
        id: this.urlParams.id,
        likeNum: !!this.metaData.likeflag ? -1 : 1
      });
      if(res.code == '0000'){
        let val = !!this.metaData.likeflag ? -1 : 1
        this.metaData.likeNum = this.metaData.likeNum + val
        this.metaData.likeflag = !!this.metaData.likeflag ? 0 : 1
      }else{
        this.$toast(res.msg);
      }
    },
    
    async init() {
      let params = this.$route.query;
      this.urlParams = params;
      if (!params.id) {
        let params = Object.assign({}, this.qianggouData);
        params.activityRules = JSON.parse(params.activityRules);
        params.redRules = JSON.parse(params.redRules);
        params.activityDestription = JSON.parse(params.activityDestription);
        this.metaData = params;
        this.$refs["bgimage"].style.background = !this.metaData.bgImage.length
        ? "#a6141d"
        : `url(${this.metaData.bgImage[0].url})`;
        return;
      }
      if (!!params.shareId) {
        this.shareId = params.shareId;
      }
      if (!!params.shown) {
        this.shown = !!params.shown ? true : false;
      }
      if (!!params.code) {
        let { data: res } = await this.$api.common.getUserInfo({
          code: params.code,
          state: params.state
        });
        if (res.code == "0000") {
          this.user_id = res.result.data.user.userId;
          this.userName =
            res.result.data.user.username || res.result.data.user.nickname;
        }
        let { data: infoRes } = await this.$api.common.distributionInfo({
          type: "info",
          id: params.id
        });
        if (infoRes.code === "0000") {
          let params = infoRes.result.distribution;
          this.orderList = infoRes.result.order;
          params.activityRules = JSON.parse(params.activityRules);
          params.redRules = JSON.parse(params.redRules);
          params.activityDestription = JSON.parse(params.activityDestription);
          this.metaData = params;
          document.title = params.activityName;
          this.$refs["bgimage"].style.background = !this.metaData.bgImage
          ? "#a6141d"
          : `url(${this.metaData.bgImage})`;

          let currentUrl = encodeURIComponent(location.href.split("#")[0]);
          let { data: jsRes } = await this.$api.common.initwxjs({
            url: currentUrl
          });
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: jsRes.result.data.appId, // 必填，公众号的唯一标识
            timestamp: jsRes.result.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: jsRes.result.data.nonceStr, // 必填，生成签名的随机串
            signature: jsRes.result.data.signature, // 必填，签名s
            jsApiList: [
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "chooseWXPay",
              "openLocation"
            ] // 必填，需要使用的JS接口列表
          });
          var self = this;
          wx.ready(() => {
            var shareParam = {
              title: `我是${self.userName}, 参加了${self.metaData.activityName}`, // 分享标题
              desc: `${self.metaData.activityName}, 联系电话: ${self.metaData.phone}`, // 分享描述
              link: location.origin + 
                "/statics/dist/redirect.html?id=" +
                self.urlParams.id +
                "&userid=" +
                self.user_id +
                "&hash=qianggouPro", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: self.metaData.thumbnail, // 分享图标
              // type: 'link', // 分享类型,music、video或link，不填默认为link
              // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              trigger: function(res) {
                console.log("用户点击发送给朋友");
              },
              success: (res) => {
                this.$api.common.updateActivityState({
                  createUser: self.user_id,
                  id: self.urlParams.id,
                  shareNum: 1
                });
              },
              cancel: function(res) {
                console.log("已取消");
              },
              fail: function(res) {}
            };
            wx.onMenuShareTimeline(shareParam);
            wx.onMenuShareAppMessage(shareParam);
          });
        }
      }
    },
    openDialog() {
      this.show = true;
    },
    goback() {
      this.$router.push({ path: "qianggouDev", query: { userVuex: true , isAdmin: this.$route.query.isAdmin} });
    },
    //被分享者参加活动
    linkreload() {
      location.href =
        location.origin +
        "statics/dist/redirect.html" +
        "?id=" +
        this.urlParams.id +
        "&hash=qianggouPro";
    },
    async save() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0
      });
      let { data: res } = await this.$api.common.distributionSave(this.qianggouData);
      this.$toast.clear();
      if (res.code === "0000") {
        this.$notify({ type: "success", message: "保存成功！" });
        this.goback();
      } else {
        this.$notify({ type: "danger", message: res.msg });
      }
    }
  },
  components: {
    Music,
    ContentWrap,
    UserCenter,
    VTextarea,
    AddFile,
    AddComponent,
    OrderSoft,
    TitleActive,
    ThemeActivity,
    Special,
    CreateTime,
    CountDown,
    Comment,
    Scroll
  }
};
</script>
<style lang="scss" scoped>
.panel {
  background: #fff;
  padding: 0 1rem;
}
.panel-head {
  display: inline-block;
  font-family: "yahei";
  font-size: 0.4rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #ef5a5a;
  border-bottom: 2px solid #ef5a5a;
}
.head-cell {
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #ef5a5a;
}
.head-cell2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #ef5a5a;
}
.head-cell > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.4rem;
  font-family: "yahei";
  color: #fff;
}
.head-cell > div.line {
  width: 5px;
  background: #fff;
}
.commond-wrap{
  height: 100%;
}
.wrap {
  background: #ff9a50;
  padding-bottom: 1.5rem;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.5rem;
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;
  /deep/ .van-button {
    width: 150px;
  }
}

.activity-name {
  text-align: center;
  color: #fff;
  font-size: 24px;
  line-height: 30px;
  padding: 5px 20px;
  font-weight: bold;
  margin: 10px 0;
}

.c-textarea {
  border: 1px dashed #0d1a31;
  padding: 10px 15px;
  border-radius: 5px;
}
.location {
  background: url("../assets/img/position.jpg") no-repeat;
  background-size: 100% 100%;
  height: 1rem;
  width: 6rem;
  margin: 0 1rem 10px 1rem;
  color: #fff;
  text-align: center;
  line-height: 1rem;
}
dd.barline {
  width: 100%;
  background: #fce877;
  height: 0.25rem;
  display: inline-block;
  border-radius: 0.15rem;
  position: relative;
  margin-left: 0;
}
.barline img {
  width: 0.5rem;
  margin-top: -0.11rem;
  margin-right: -0.1rem;
}
.barline .price {
  position: absolute;
  right: -0.5rem;
  background: #ff5041;
  padding: 0.1rem 0.15rem;
  border-radius: 0.1rem;
  top: -0.65rem;
}
.barline .price i {
  top: 0.35rem;
  right: 0.45rem;
  width: 0;
  height: 0;
  border-left: 0.2rem solid transparent;
  border-right: 0.2rem solid transparent;
  border-top: 0.2rem solid #ff5041;
  position: absolute;
}
dd.barline div.charts {
  height: 0.25rem;
  position: relative;
  color: #fff;
  line-height: 0.25rem;
  text-indent: 0.05rem;
  background: #eb0000;
  border-radius: 0.15rem;
  text-align: right;
  font-size: 0.24rem;
}
.x-area {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;
}
.btn {
  border: 0.05333rem solid #ccc;
  background: red;
  text-align: center;
  height: 1.2rem;
  line-height: 1.2rem;
  color: #fff;
  font-size: 20px;
  border-radius: 0.6rem;
  margin: 0.2rem 1rem;
}
.title-23 {
  border: 1px solid #ccc;
  text-align: center;
  height: 0;
  font-size: 0.4rem;
  line-height: 0rem;
  width: 60%;
  left: 20%;
  position: relative;
  margin: 0.5rem 0;
}
.wrap-wx {
  padding: 0.2rem;
  border-top: 1px dashed #ccc;
}
.wrap-wx li {
  display: flex;
  height: 2rem;
  justify-content: space-between;
  align-items: center;
}
.wrap-wx img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.wrap-wx span {
  width: 4rem;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wrap-wx p {
  font-size: 0.2rem;
  color: #000;
}
.animate {
  animation: myfirst 0.5s ease-in-out infinite alternate running;
}
@keyframes myfirst {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}
.phone {
  height: 1rem;
  width: 2rem;
  position: fixed;
  bottom: 5rem;
  right: 0;
  border: 1px solid #ccc;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-right: 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.1rem;
}
.user-info{
   position: fixed;
    right: 0.26667rem;
    bottom: 1.6rem;
    min-width: 2rem;
    height: 1rem;
    background: #000000a6;
    z-index: 997;
    border-radius: 0.13333rem;
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 5rem;
    justify-content: space-around;
    .like{
      color: red;
    }
}
.wrap-3 {
  display: flex;
  padding: 0.5rem;
  overflow: auto;
  justify-content: flex-start;
  border-top: 1px solid #ccc;
  background: #fff;
  flex-wrap: wrap;
}
.wrap-3 > div {
  display: flex;
  width: 1rem;
  height: 1.7rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0.2rem;
}
.wrap-3 img {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
}
.wrap-3 span {
  font-size: 0.2rem;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 1rem;
  text-align: center;
}
.wrap-2 {
  display: flex;
  justify-content: center;
  height: 2rem;
  padding: 0 1rem;
  background: #fff;
}
.wrap-2 .img {
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  overflow: hidden;
}
.wrap-2 .text {
  width: 6rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: "yahei";
  font-size: 0.2rem;
  line-height: 0.5rem;
}
.phone {
  height: 1rem;
  width: 2rem;
  position: fixed;
  bottom: 5rem;
  right: 0;
  border: 1px solid #ccc;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-right: 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.1rem;
}
.phone-wrap {
  list-style: none;
  font-size: 0.6rem;
  text-align: left;
  color: #2b2a2a;
  font-family: yahei;
}
.phone-wrap li a {
  color: #2b2a2a;
}
.phone-wrap li {
  color: #2b2a2a;
  border-bottom: 1px solid #ccc;
  padding: 0.2rem 1rem;
}
.head-cell {
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #ef5a5a;
}
.head-cell2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #ef5a5a;
}
.head-cell > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.4rem;
  font-family: "yahei";
  color: #fff;
}
.head-cell > div.line {
  width: 5px;
  height: 80%;
  background: #fff;
}
.footer2 {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.5rem;
  background: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.btn-h {
  width: 33%;
  height: 100%;
  line-height: 1.6rem;
  text-align: center;
  background: #ef5a5a;
  color: #fff;
  font-size: 0.3rem;
}
.btn-c {
  border-radius: 0;
  width: 33%;
  height: 100%;
  line-height: 1.6rem;
  text-align: center;
  background: #ef5a5a;
  color: #fff;
  font-size: 0.3rem;
}
</style>


