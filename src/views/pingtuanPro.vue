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
    <img v-else src="@/assets/img/pingtuan-head.jpg" width="100%" />
    <div class="activity-name">{{metaData.activityName}}</div>
    <content-wrap v-if="!!metaData.startTime && metaData.endTime">
      <count-down class="time-wrap" :startTime="metaData.startTime" :endTime="metaData.endTime"></count-down>
    </content-wrap>
    <content-wrap>
        <div v-if="!!metaData.commodityDescription  && metaData.commodityDescription.length">
          <div v-for="item in metaData.commodityDescription" :key="item.key" style="line-height: 0.4rem;">
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
        <div class="t-o">
            <div>原价：<span style="color: red;">{{metaData.originalPrice}}元</span></div>
        </div>
        <div v-if="metaData.discount.length">
            <div class="wrap-tuan" v-for="item in metaData.discount" :key="item.key" style="line-height: 0.4rem;">
                <div class="people-wrap">
                    {{item.num}}人团
                </div>
                <div class="prize-wrap">
                    拼团价：{{item.price}} 元/人
                </div>
            </div>
        </div>
        <div v-if="!!this.shareId && !this.orderId" @click="() => {this.shown = !this.shown}"  class="btn animate">参加活动</div>
        <div v-if="!this.shareId" @click="() => {this.shown = !this.shown}" class="btn animate">参加活动</div>
        <div v-if="!!this.orderId && list.length >= metaData.discount[0].num"  @click="linkPay" class="btn animate">支付</div>
      <div class="wrap-3">
          <div v-for="(item, index) in list" :key="index">
              <img :src="item.headimgurl" />
              <span>{{item.username}}</span>
          </div>
      </div>
      <span style="font-size: 0.3rem;color: #ccc;">已经有{{list.length}}个人参加拼团</span>
    </content-wrap>

    <content-wrap title="领奖信息" v-if="!!metaData.prizeInfo.length">
      <div v-if="!!metaData.prizeInfo  && metaData.prizeInfo.length">
          <div v-for="item in metaData.prizeInfo" :key="item.key" style="line-height: 0.4rem;">
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

    <content-wrap title="机构介绍" v-if="!!metaData.companyInfo.length">
     <div v-if="!!metaData.companyInfo  && metaData.companyInfo.length">
          <div v-for="item in metaData.companyInfo" :key="item.key" style="line-height: 0.4rem;">
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
  name: "pingtuan-pro",
  data() {
    return {
      metaData: {
        id: '',
        activityName: '',
        startTime: '',
        endTime: '',
        originalPrice: '',
        floorPrice: '',
        minReduction: '',
        maxReduction: '',
        targetNum: '',
        restrictTime: '',
        prizeDescription: '',
        activityRule: '',
        prizeInfo: [],
        companyDescription: '',
        commodityDescription: [],
        thumbnail: '',
        discount: [],
        updateUser: '',
        createTime: '',
        updateTime: '',
        qrImg: '',
        gift:'',
        prizeLeft: '',
        latitude: '',
        longitude: '',
        headImage:'',
        footImage:'',
        total_price: '',
        bgImage:'',
        prizeNum:'',
        phone: '',
        address: '',
        companyName: '',
        companyInfo: [],
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
      orderId: null,
      like: 0,
      prize: null,
      shown: false,
      commentShow: false,
      list: []
    };
  },
  provide: {
    isEdit: false
  },
  computed: {
    ...mapGetters("common", {
      pingtuanData: "pingtuanData"
    })
  },
  watch: {
    metaData: {
      handler: function(newData) {
        console.log(  );
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
    async getOrderByOrderId(shareId) {
      let { data: res } = await this.$api.common.getOrderByOrderId({
        orderId: shareId
      });
      if (res.code == "0000") {
        this.prize = parseInt(res.result.data.total_price);
        this.b_userId = res.result.data.user_id;
        return {
          prize: parseInt(res.result.data.total_price),
          b_userId: res.result.data.user_id
        }
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
            orderType: "4",
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
        this.$toast("参加成功！邀请好友，加入拼团 ");
        this.shareId = res.result.order.groupId;
        this.orderId = res.result.order.orderId;
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
              "&hash=pingtuanPro", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this.metaData.thumbnail, // 分享图标
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
        this.queryGrouponId(this.shareId);
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
    linkPay() {
      if (!this.shareId) {
        return this.$toast("订单不存在或者金额异常");
      }
      this.getOrderByOrderId(this.orderId).then(({prize, b_userId}) => {
        location.href = location.origin + 
          "/statics/dist/pay.html?user_id=" +
          b_userId +
          "&total_fee=" +
          prize +
          "&orderId=" +
          this.orderId;
      })
    },
    async queryGrouponId(shareId){
      let {data: res} =  await this.$api.common.queryGrouponId({
        groupId: shareId
      })
      if (res.code == "0000") {
        this.list = res.result.data;
        res.result.data.forEach(item => {
          if (item.user_id == this.user_id) {
            this.orderId = item.order_id;
          }
        });
      } 
    },
    async init() {
      let params = this.$route.query;
      this.urlParams = params;
      if (!params.id) {
        let params = Object.assign({}, this.pingtuanData);
        params.commodityDescription = JSON.parse(params.commodityDescription);
        params.discount = JSON.parse(params.discount);
        params.companyInfo = JSON.parse(params.companyInfo);
        params.prizeInfo = JSON.parse(params.prizeInfo);
        this.metaData = params;
        this.$refs["bgimage"].style.background = !this.metaData.bgImage.length
        ? "#0b084a"
        : `url(${this.metaData.bgImage[0].url})`;
        return;
      }
      
      if (!!params.shown) {
        this.shown = !!params.shown ? true : false;
      }
      if (!!params.code) {
        let { data: res } = await this.$api.common.getUserInfo({
          code: params.code,
          state: params.state
        });
        if (!!params.shareId) {
          this.shareId = params.shareId;
          this.queryGrouponId(this.shareId);
        }
        if (res.code == "0000") {
          this.user_id = res.result.data.user.userId;
          this.userName =
            res.result.data.user.username || res.result.data.user.nickname;
        }
        let { data: infoRes } = await this.$api.common.pingtuanInfo({
          type: "info",
          id: params.id
        });
        if (infoRes.code === "0000") {
          let params = infoRes.result.groupon;
          this.orderList = infoRes.result.order;
          params.commodityDescription = JSON.parse(params.commodityDescription);
          params.discount = JSON.parse(params.discount);
          params.companyInfo = JSON.parse(params.companyInfo);
          params.prizeInfo = JSON.parse(params.prizeInfo);
          this.metaData = params;
          document.title = params.activityName;
          this.$refs["bgimage"].style.background = !this.metaData.bgImage
          ? "#0b084a"
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
                "&shareId=" +
                self.shareId +
                "&hash=pingtuanPro", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
      this.$router.push({ path: "pingtuanDev", query: { userVuex: true , isAdmin: this.$route.query.isAdmin} });
    },
    //被分享者参加活动
    linkreload() {
      location.href =
        location.origin +
        "statics/dist/redirect.html" +
        "?id=" +
        this.urlParams.id +
        "&hash=pingtuanPro&shown=1";
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
      let { data: res } = await this.$api.common.pingtuanSave(this.pingtuanData);
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
.wrap-tuan {
  position: relative;
  margin: 0.2rem auto;
  height: 2rem;
  border-radius: 5px;
  background: #ff5800;
  padding: 0.1px;
}
.people-wrap {
  width: 3rem;
  margin: 0.1rem;
  height: 1.8rem;
  background: #fff;
  line-height: 1.8rem;
  text-align: center;
  float: left;
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
.prize-wrap {
  width: 4rem;
  margin: 0.1rem;
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
  float: left;
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
</style>


