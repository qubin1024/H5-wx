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
    <img v-else src="@/assets/img/jizan.jpg" width="100%" />
    <div class="activity-name">{{metaData.activityName}}</div>
    <content-wrap v-if="!!metaData.startTime && metaData.endTime">
      <count-down class="time-wrap" :startTime="metaData.startTime" :endTime="metaData.endTime"></count-down>
    </content-wrap>
    <content-wrap>
        <div v-if="!!shareId && b_userId != user_id" @click="linkreload" class="btn animate">参加活动</div>
        <div v-if="!this.shareId" @click="() => {this.shown = !this.shown}" class="btn animate">参加活动</div>
        <div v-if="!!this.shareId" @click="addZan" class="btn animate">帮忙集赞</div>
        <div class="wrap-3">
            <div v-for="(item, index) in tlist" :key="index">
                <img :src="item.headimgurl" />
                <span>{{item.username}}</span>
            </div>
        </div>
        <span style="font-size: 0.3rem;color: #ccc;">已经有{{tlist.length}}个人帮你点赞</span>
      
    </content-wrap>

    <content-wrap v-if="!!metaData.priceDescription  && metaData.priceDescription.length">
        <div >
            <div v-for="item in metaData.priceDescription" :key="item.key" style="line-height: 0.4rem;">
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
          :src="metaData.thumbnail"
          v-if="!!metaData.thumbnail"
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

    <img v-if="metaData.footImage" :src="metaData.footImage" width="100%" />


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
    <div class="phone" v-if="metaData.phone">
      <a
        :href="'tel:' + metaData.phone"
        style="font-size: 0.4rem; width: 1rem;
        color: #7eceef;
        font-weight: bold;margin: 0.1rem;
        line-height: 0.4rem;"
      >联系商家</a>
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
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "jizan-pro",
  data() {
    return {
      metaData: {
        id: '',
        activityName: '',
        startTime: '',
        endTime: '',
        priceNum: '',
        gift: '',
        targetNum: '',
        restrictTime: '',
        priceDescription: [],
        activityRule: '',
        priceInfo: '',
        companyName: '',
        companyInfo: [],
        companyDescription: '',
        thumbnail: '',
        discount: [],
        updateUser: '',
        createTime: '',
        updateTime: '',
        qrImg: '',
        prizeLeft: '',
        latitude: '',
        longitude: '',
        headImage:'',
        footImage:'',
        bgImage:'',
        phone: '',
        address: '',
        question1: "姓名",
        question2: "电话",
        question3: "",
        question4: "",
        question5: "",
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
      orderList: [],
      user_id: "",
      b_userId: "",
      userName: "",
      name: "",
      shareId: "",
      like: 0,
      prize: null,
      shown: false,
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
      jizanData: "jizanData"
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
    addZan() {
      if (!this.shareId) {
        // 显示文字
        return this.$toast("请参加活动！");
      }
      this.gatherLike({
          activityId: this.urlParams.id,
          id: this.shareId,
          likes: this.user_id
        })
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

      let { data: res } = await this.$api.common.jizanMakeLike(
          {
            activityId: this.urlParams.id,
            userId: this.user_id,
            prizeNum: this.metaData.targetNum.toString(),
            mobile: this.dialogInfo.mobile,
            userName: this.dialogInfo.user_name,
            prizeTime: this.metaData.restrictTime
          }
      );
      if (res.code == "0000") {
        this.$toast("参加成功！分享好友集赞获爱心，赢礼品。");
        this.shown = false;
        this.shareId = res.result.data.id;
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
            success: (res) => {
              this.$api.common.updateActivityState({
                createUser: this.user_id,
                id: this.urlParams.id,
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
          this.show = false;
        });
        this.queryPrizeLog(this.shareId);
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
    async queryPrizeLog(shareId){
      let {data: res} = await this.$api.common.queryPrizeLog({
        id: this.shareId
      })
      if (res.code == "0000") {
        this.b_userId = res.result.data.user_id;
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
        let params = Object.assign({}, this.jizanData);
        params.companyInfo = JSON.parse(params.companyInfo);
        params.priceDescription = JSON.parse(params.priceDescription);
        params.discount = JSON.parse(params.discount);
        this.metaData = params;
        this.$refs["bgimage"].style.background = !this.metaData.bgImage.length
        ? "#a6141d"
        : `url(${this.metaData.bgImage[0].url})`;
        return;
      }
      if (!!params.shareId) {
        this.shareId = params.shareId;
        this.queryPrizeLog(this.shareId);
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
        let { data: infoRes } = await this.$api.common.jizanInfo({
          type: "info",
          id: params.id
        });
        if (infoRes.code === "0000") {
          let params = infoRes.result.gather;
          this.orderList = infoRes.result.order;
          params.companyInfo = JSON.parse(params.companyInfo);
          params.priceDescription = JSON.parse(params.priceDescription);
          params.discount = JSON.parse(params.discount);
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
            console.log(self)
            var shareParam = {
              title: `我是${self.userName}, 参加了${self.metaData.activityName}`, // 分享标题
              desc: `${self.metaData.activityName}, 联系电话: ${self.metaData.phone}`, // 分享描述
              link: location.origin + 
                "/statics/dist/redirect.html?id=" +
                self.urlParams.id +
                "&userid=" +
                self.user_id +
                "&shareId=" +
                self.shareId +
                "&hash=jizanPro", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
      this.$router.push({ path: "jizanDev", query: { userVuex: true , isAdmin: this.$route.query.isAdmin} });
    },
    //被分享者参加活动
    linkreload() {
      location.href =
        location.origin +
        "statics/dist/redirect.html" +
        "?id=" +
        this.urlParams.id +
        "&hash=jizanPro&shown=1";
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
      let { data: res } = await this.$api.common.jizanSave(this.jizanData);
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
    Comment
  }
};
</script>
<style lang="scss" scoped>
.commond-wrap{
  height: 100%;
}
.wrap {
  background: #010b27;
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
</style>


