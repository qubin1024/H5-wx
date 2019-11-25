<template>
  <div class="wrap">
    <music></music>
    <user-center></user-center>
    <special></special>
    <img src="@/assets/img/bargain-head.jpeg" width="100%" />
    <title-active v-model="metaData.activityName"></title-active>
    <order-soft></order-soft>
    <div class="footer">
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
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "bargain-pro",
  data() {
    return {
      metaData: {
        id: "",
        activityName: "", //活动名称
        startTime: "", //开始时间
        endTime: "", //结束时间
        originalPrice: "", //原价
        floorPrice: "", //底价
        minReduction: "", //最少砍价
        maxReduction: "", //最多砍价
        targetNum: "",
        restrictTime: "", //砍价间隔时间
        prizeDescription: [], //奖品描述
        activityRule: "", //活动规则
        prizeInfo: "", //领奖信息
        companyDescription: "", //机构介绍
        companyName: "", //机构名称
        thumbnail: [], //机构图片
        discount: [],
        updateUser: "",
        createTime: "", //创建时间
        updateTime: "",
        qrImg: "", //二维码
        gift: [], //礼物图片
        prizeLeft: "",
        latitude: "",
        longitude: "",
        headImage: "",
        giftName: "",
        footImage: "",
        total_price: "",
        bgImage: "",
        prizeNum: "",
        phone: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        barginNum: "", //砍价次数
        address: ""
      },
      user_id: "",
      userName: "",
      shareId: "",
      prize: "",
      b_userId: "",
      barginLogList: []
    };
  },
  provide: {
    isEdit: false
  },
  computed: {
    ...mapGetters("common", {
      bargainData: "bargainData"
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
  mounted() {
    this.init();
    if (!!this.$route.query.shareId) {
      this.$api.common
        .getOrderByOrderId({
          orderId: this.$route.query.shareId
        })
        .then(({ data: res }) => {
          if (data.code == "0000") {
            this.prize = data.result.data.total_price;
            this.b_userId = data.result.data.user_id;
          }
        });
      this.$api.common
        .queryBarginLog({
          orderId: params.shareId
        })
        .then(({ data }) => {
          if (data.code == "0000") {
            this.barginLogList = data.result.data;
          }
        });
    }
  },
  methods: {
    async init() {
      let params = this.$route.query;
      if (!params.id) {
        let params = Object.assign({}, this.bargainData);
        params.prizeDescription = JSON.parse(params.prizeDescription);
        params.discount = JSON.parse(params.discount);
        params.gift = JSON.parse(params.gift);
        params.thumbnail = JSON.parse(params.thumbnail);
        this.metaData = params;
        return;
      }
      if (!!params.shareId) {
        this.shareId = params.shareId;
      }
      if (!!params.shown) {
        this.shown = !!params.shown ? true : false;
      }
      if (!!params.code) {
        let { data: res } = this.$api.common.getUserInfo({
          code: params.code,
          state: params.state
        });
        if (res.code == "0000") {
          this.user_id = res.result.data.user.userId;
          this.userName =
            res.result.data.user.username || res.result.data.user.nickname;
        }
        let { data: infoRes } = await this.$api.common.barginInfo({
          type: "info",
          id: params.id
        });
        if (infoRes === "0000") {
          let params = infoRes.result.bargin;
          params.prizeDescription = JSON.parse(params.prizeDescription);
          params.discount = JSON.parse(params.discount);
          params.gift = JSON.parse(params.gift);
          params.thumbnail = JSON.parse(params.thumbnail);
          this.metaData = params;
          document.title = params.activityName;

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
          wx.ready(() => {
            wx.error(function(res) {
              // config 信息验证失败会执行 error 函数，如签名过期导致验证失败，具体错误信息可以打开 config 的 debug 模式查看，也可以在返回的 res 参数中查看，对于 SPA 可以在这里更新签名。
              console.log(res);
            });
            wx.checkJsApi({
              jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "chooseWXPay"
              ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                // console.log("checkJsApi" + res);
              }
            });
            var shareParam = {
              title: `我是${this.userName}, 参加了${this.metaData.activityName}`, // 分享标题
              desc: `${this.metaData.activityName}, 联系电话: ${this.metaData.phone}`, // 分享描述
              link:
                "/statics/dist/redirect.html?id=" +
                this.metaData +
                "&userid=" +
                this.user_id +
                "&shareId=" +
                this.shareId +
                "&hash=bargainPro", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.metaData.thumbnail, // 分享图标
              // type: 'link', // 分享类型,music、video或link，不填默认为link
              // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              trigger: function(res) {
                console.log("用户点击发送给朋友");
              },
              success: function(res) {
                console.log("已分享");
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
    goback() {
      this.$router.back(-1);
    },
    async save() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0
      });
      let { data: res } = await this.$api.common.barginSave(this.bargainData);
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
    CreateTime
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  background: #a6141d;
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
.upload-div {
  width: 375px;
  height: 174px;
  background: #ccc;
}
/deep/ .center.van-uploader {
  position: relative;
  left: 50%;
  transform: translateX(-51px);
}
/deep/ .round .van-uploader__upload {
  border-radius: 50%;
}
.v-input {
  display: inline-block;
  width: 70px;
  border: 1px dashed #0d1a31;
  border-radius: 5px;
  /deep/ .van-field__control {
    color: red;
  }
}
.upload {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px dashed #0d1a31;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0d1a31;
}
.label-item {
  font-size: 14px;
  display: flex;
  align-items: center;
}
.x-area {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 10px 0;
}
.x-title {
  font-size: 14px;
  color: #696969;
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
</style>


