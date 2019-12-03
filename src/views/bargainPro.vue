<template>
  <div class="wrap" ref="bgimage">
    <music></music>
    <user-center></user-center>
    <special></special>
        <div class="user-info">
          <span> <van-icon name="like" />12 </span>
          <span> <van-icon name="eye" />12 </span>
          <span> <van-icon name="friends" />12 </span>
          <span> <van-icon name="chat-o" />写评论 </span>
        </div>
    <img v-if="metaData.headImage.length" :src="metaData.headImage[0].url" width="100%" />
    <img v-else src="@/assets/img/bargain-head.jpeg" width="100%" />
    <div class="activity-name">{{metaData.activityName}}</div>
    <content-wrap v-if="!!metaData.startTime && metaData.endTime">
      <count-down class="time-wrap" :startTime="metaData.startTime" :endTime="metaData.endTime"></count-down>
    </content-wrap>
    <content-wrap>
      <dd class="barline" v-if="prize != null">
        <div
          w="50"
          :style="{
                            'width': parseFloat((metaData.originalPrice-prize) / (metaData.originalPrice - metaData.floorPrice)) * 100 + '%'
                        }"
          class="charts"
        >
          <img src="../assets/img/yuan.png" />
          <div class="price">
            ¥{{prize}}
            <i></i>
          </div>
        </div>
      </dd>
      <div class="x-area">
        <span class="label-item">
          原价：
          <span style="color: red;">{{metaData.originalPrice}}元</span>
        </span>
        <span class="label-item">
          底价：
          <span style="color: red;">{{metaData.floorPrice}}元</span>
        </span>
      </div>
      <div v-if="!!this.shareId" @click="addZan" class="btn animate">帮忙砍价</div>
      <div v-if="!this.shareId" @click="openDialog" class="btn animate">参加活动</div>
      <div v-if="!!shareId && b_userId != user_id" @click="linkreload" class="btn animate">参加活动</div>
      <div v-if="!!this.shareId && b_userId == user_id && metaData.floorPrice == prize" class="btn animate">支付</div>
      <ul class="wrap-wx" v-if="barginLogList.length">
        <li v-for="(item, index) in barginLogList" :key="index">
          <img :src="item.headimgurl" />
          <div>
            <p>{{item.username | filterusername(item.username)}}</p>
            <p>{{item.create_time.split(' ')[0]}}</p>
          </div>
          <span>
            帮砍
            <span style="color: red;">{{parseInt(item.bargin_price)}}</span>
          </span>
        </li>
      </ul>
    </content-wrap>

    <content-wrap title="奖品描述">
      <div style="text-align: center;margin: 0.4rem;">
        本期奖品
        <span style="color: red;">{{metaData.prizeNum}} 份</span>， 剩余
        <span style="color: red;">{{metaData.prizeLeft}} 份</span>
      </div>
      <div style="text-align: center;margin: 0.4rem;">
        <span style="color: red;">{{metaData.giftName}} 商品</span>，原价
        <span style="color: red;">{{metaData.originalPrice}}元</span>活动亏本卖， 最低降到
        <span style="color: red;">{{metaData.floorPrice}}元</span>，数量有限，售完即止。
      </div>

      <div v-if="!!metaData.prizeDescription  && metaData.prizeDescription.length">
        <div v-for="item in metaData.prizeDescription" :key="item.key" style="line-height: 0.4rem;">
          <img
            v-if="item.type == 'img' && !!item.imgUrl.length"
            :src="item.imgUrl[0].url"
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
    </content-wrap>

    <content-wrap title="活动规则" v-if="!!metaData.activityRule">
      <pre
        style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;"
      >{{metaData.activityRule}}</pre>
    </content-wrap>

    <content-wrap title="领奖信息" v-if="!!metaData.prizeInfo">
      <pre
        style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;"
      >{{metaData.prizeInfo}}</pre>
    </content-wrap>

    <content-wrap title="机构介绍" v-if="!!metaData.companyDescription">
      <pre
        style="white-space: pre-line;font-size: 0.4rem;padding: 0.2rem 0.4rem;word-wrap: break-word;line-height: 0.6rem;display: inline-block;"
      >{{metaData.companyDescription}}</pre>
    </content-wrap>

    <content-wrap title="主办方名片">
      <div style="margin: 1rem auto;height: 3rem;width:3rem;position: relative;">
        <img
          :src="metaData.thumbnail[0].url"
          v-if="metaData.thumbnail.length"
          style="width: 100%;height: 100%;"
        />
      </div>
      <div class="title-23">
        <span style="color: #10aeff;background: #fff;padding: 0 10px;">咨询电话</span>
      </div>
      <span
        style="
                    text-align: center;
                    width: 100%;
                    display: inline-block;
                    color: red;
                    font-weight: bold;
                "
      >{{metaData.phone}}</span>
      <div class="title-23">
        <span style="color: #10aeff;background: #fff;padding: 0 10px;">坐标位置</span>
      </div>
      <span
        style="display: block;font-size: 0.3rem;color: #ccc;padding: 0 15px;text-align: center;"
      >（点击下方位置，直接导航）</span>
      <br />
      <span
        style="display: block;font-size: 0.5rem;color: #843493;padding: 0 15px;text-align: center;"
        @click="initQQMap"
      >
        <van-icon name="location" />
        {{metaData.address}}
      </span>
    </content-wrap>
    <content-wrap title="店内优惠" v-if="!!metaData.discount.length">
      <div>
        <div v-for="item in metaData.discount" :key="item.key" style="line-height: 0.4rem;">
          <pre
            v-if="item.type == 'uploadText'"
            style="white-space: pre-line;font-size: 0.8rem;padding: 0.2rem 0;overflow-wrap: break-word;line-height: 1.2rem;display: inline-block;font-weight: bold;color: #f76800;text-align: center;width: 100%;"
          >{{item.text}}</pre>
        </div>
      </div>
    </content-wrap>
    <order-soft :list="orderList" :floorPrice="metaData.floorPrice"></order-soft>

    <img v-if="metaData.footImage.length" :src="metaData.footImage[0].url" width="100%" />


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
    <div class="phone">
      <a
        :href="'tel:' + metaData.phone"
        style="font-size: 0.4rem; width: 1rem;
        color: #7eceef;
        font-weight: bold;margin: 0.1rem;
        line-height: 0.4rem;"
      >联系商家</a>
    </div>
    <van-dialog
      v-model="show"
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
      orderList: [],
      user_id: "",
      b_userId: "",
      userName: "",
      name: "",
      shareId: "",
      prize: null,
      show: false,
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
    if (!!this.$route.query.shareId) {
      this.getOrderByOrderId(this.$route.query.shareId);
      this.queryBarginLog(this.$route.query.shareId);
    }
  },
  methods: {
    async getOrderByOrderId(shareId) {
      let { data: res } = await this.$api.common.getOrderByOrderId({
        orderId: shareId
      });
      if (res.code == "0000") {
        this.prize = parseInt(res.result.data.total_price);
        this.b_userId = res.result.data.user_id;
      }
    },
    async queryBarginLog(shareId) {
      let { data: barginLog } = await this.$api.common.queryBarginLog({
        orderId: shareId
      });
      if (barginLog.code == "0000") {
        this.barginLogList = barginLog.result.data;
      }
    },
    async addZan() {
      if (!this.shareId) {
        // 显示文字
        return this.$toast("请参加活动！");
      }

      let { data: res } = await this.$api.common.bargin({
        activityId: this.urlParams.id,
        orderId: this.shareId,
        total_price: this.prize,
        user_id: this.user_id
      });
      if (res.code == "0000") {
        this.$toast(`恭喜你成功砍价${res.result.data.total_price}元`);
        this.getOrderByOrderId(this.shareId);
        this.queryBarginLog(this.shareId);
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
    async dialogConfirm() {
      if (!this.dialogInfo.user_name || !this.dialogInfo.mobile) {
        // 显示文字
        return this.$notify({ type: "danger", message: "请填写姓名，电话!" });
      }

      let { data: res } = await this.$api.common.saveOrder(
        Object.assign(
          {},
          {
            activityId: this.urlParams.id,
            from_user: "",
            red_packets: "",
            total_price: this.metaData.originalPrice,
            user_name: "",
            orderType: "3",
            user_type: "",
            mobile: "",
            user_id: this.user_id,
            question3: "",
            question4: "",
            question5: ""
          },
          this.dialogInfo
        )
      );
      if (res.code == "0000") {
        this.$toast("参加成功！分享好友帮砍价，赢礼品。");
        this.shareId = res.result.order.orderId;
        wx.ready(() => {
          var shareParam = {
            title: `我是${this.dialogInfo.user_name || this.userName}, 参加了${
              this.metaData.activityName
            }`, // 分享标题
            desc: `${this.metaData.activityName}, 联系电话: ${this.dialogInfo.mobile}`, // 分享描述
            link:
            location.origin + 
              "/statics/dist/redirect.html?id=" +
              this.urlParams.id +
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
          this.show = false;
        });
        this.getOrderByOrderId(res.result.order.orderId);
        this.queryBarginLog(this.shareId);
      } else {
        this.$toast("res.msg");
      }
    },
    linkPay() {
      if (!this.shareId || !this.prize) {
        return this.$toast("订单不存在或者金额异常");
      }
      location.href = location.origin + 
        "/statics/dist/pay.html?user_id=" +
        this.b_userId +
        "&total_fee=" +
        this.prize +
        "&orderId=" +
        this.shareId;
    },
    async init() {
      let params = this.$route.query;
      this.urlParams = params;
      if (!params.id) {
        let params = Object.assign({}, this.bargainData);
        params.prizeDescription = JSON.parse(params.prizeDescription);
        params.discount = JSON.parse(params.discount);
        params.gift = JSON.parse(params.gift);
        params.thumbnail = JSON.parse(params.thumbnail);
        params.headImage = JSON.parse(params.headImage);
        params.bgImage = JSON.parse(params.bgImage);
        params.footImage = JSON.parse(params.footImage);
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
        let { data: infoRes } = await this.$api.common.barginInfo({
          type: "info",
          id: params.id
        });
        if (infoRes.code === "0000") {
          let params = infoRes.result.bargin;
          this.orderList = infoRes.result.order;
          params.prizeDescription = JSON.parse(params.prizeDescription);
          params.discount = JSON.parse(params.discount);
          params.gift = JSON.parse(params.gift);
          params.thumbnail = JSON.parse(params.thumbnail);
          params.headImage = JSON.parse(params.headImage);
          params.bgImage = JSON.parse(params.bgImage);
          params.footImage = JSON.parse(params.footImage);
          this.metaData = params;
          document.title = params.activityName;
          this.$refs["bgimage"].style.background = !this.metaData.bgImage.length
          ? "#a6141d"
          : `url(${this.metaData.bgImage[0].url})`;

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
              link: location.origin + 
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
    openDialog() {
      this.show = true;
    },
    goback() {
      this.$router.push({ path: "bargainDev", query: { userVuex: true , isAdmin: this.$route.query.isAdmin} });
    },
    //被分享者参加活动
    linkreload() {
      location.href =
        location.origin +
        "statics/dist/redirect.html" +
        "?id=" +
        this.urlParams.id +
        "&hash=bargainPro&shown=1";
    },
    //地图初始化
    initQQMap() {
      console.log({
        latitude: this.metaData.latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: this.metaData.longitude, // 经度，浮点数，范围为180 ~ -180。
        name: "活动地点", // 位置名
        address: this.metaData.address, // 地址详情说明
        scale: 10 // 地图缩放级别,整形值,范围从1~28。默认为最大
      });
      wx.ready(() => {
        wx.openLocation({
          latitude: this.metaData.latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: this.metaData.longitude, // 经度，浮点数，范围为180 ~ -180。
          name: "活动地点", // 位置名
          address: this.metaData.address, // 地址详情说明
          scale: 10, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: `http://apis.map.qq.com/uri/v1/marker?marker=coord:${this.metaData.latitude},${this.metaData.longitude};title:活动地点;addr:${this.metaData.address}` // 在查看位置界面底部显示的超链接,可点击跳转
        });
      });
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
    CreateTime,
    CountDown
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
}
</style>


