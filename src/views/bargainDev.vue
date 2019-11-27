<template>
  <div class="wrap">
    <music></music>
    <user-center></user-center>
    <theme-activity></theme-activity>
    <special></special>
    <img src="@/assets/img/bargain-head.jpeg" width="100%" />
    <title-active v-model="metaData.activityName"></title-active>
    <content-wrap>
      <create-time :startTime.sync="metaData.startTime" :endTime.sync="metaData.endTime"></create-time>
    </content-wrap>
    <content-wrap>
      <van-uploader class="center" v-model="metaData.gift" @delete="imgDelete('gift')" :max-count="1" :after-read="afterRead" @click.native="clickItem('gift')">
        <div class="upload">
          <van-icon name="photo" style="font-size: 50px;" />
          <span style="font-size: 10px;">上传商品图片</span>
        </div>
      </van-uploader>
      <div class="x-area">
        <span class="label-item">
          原价：
          <van-field class="v-input"  v-model="metaData.originalPrice"/>
          <span style="color: red;">元</span>
        </span>
        <span class="label-item">
          底价：
          <van-field class="v-input" v-model="metaData.floorPrice"/>
          <span style="color: red;">元</span>
        </span>
      </div>
      <div class="x-title">每次减价减少范围</div>
      <div class="x-area" style="margin: 10px 0;">
        <span class="label-item">
          最少：
          <van-field class="v-input" v-model="metaData.minReduction"/>
          <span style="color: red;">元</span>
        </span>
        <span class="label-item">
          最多：
          <van-field class="v-input" v-model="metaData.maxReduction"/>
          <span style="color: red;">元</span>
        </span>
      </div>
      <div
        class="x-title"
        style="text-align: center;"
      >参考公式：（原价-底价）➗ 大致帮减人数=帮减范围平均数，帮减范围平均数-5=最小值，帮减范围平均数+5=最大值。建议设置30-40人帮减即可减至底价</div>
      <div class="x-area" style="margin: 10px 0;">
        <span class="label-item">
          报名者每隔
          <van-field class="v-input"  v-model="metaData.restrictTime"/>
          <span style="color: red;">小时</span>可再次给自己减价
        </span>
      </div>
      <div class="x-title" style="text-align: center;">每个报名者可在活动时间内多次自己减价，帮忙者仅有一次机会；如有用户报名，此时间可减不可增</div>
      <!-- <div class="x-area" style="margin: 10px 0;">
        <span class="label-item x-title">
          活动首页显示需要多少人帮忙获得奖品
          <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
        </span>
      </div> -->
    </content-wrap>
    <content-wrap title="奖品描述">
      <div class="x-area" style="margin: 10px 0;justify-content: center;">
        <span class="label-item">
          本期奖品
          <van-field class="v-input" v-model="metaData.giftName"/>
        </span>
      </div>
      <div class="x-title" style="text-align: center;">如有用户报名，奖品数量可增不可减，谨慎填写</div>
      <add-component :activeList.sync="metaData.prizeDescription"></add-component>
    </content-wrap>
    <content-wrap title="主办方名片">
      <div class="x-title" style="text-align: center;">
        <van-icon name="warning" />完善的主办方信息可以让用户更全方位地了解主办方，可以很好的提高活动效果
      </div>
      <!-- <div class="x-area" style="margin: 10px 0;">
        <span class="label-item x-title">
          显示/隐藏 主办方名片
          <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
        </span>
      </div> -->
      <!-- <div class="x-area" style="margin: 10px 0;">
        <span class="label-item x-title">
          显示/隐藏 活动主页顶部logo
          <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
        </span>
      </div> -->
      <div class="title-23">
        <span style="color: #10aeff;background: #fff;padding: 0 10px;">基本信息</span>
      </div>
      <!-- <div class="x-area" style="margin: 10px 0;">
        <span class="label-item x-title">
          显示/隐藏 基本信息
          <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
        </span> 
      </div> -->
      <div class="x-area" style="margin: 10px 0;">
        <van-uploader class="round"  v-model="metaData.thumbnail" @delete="imgDelete('thumbnail')" :max-count="1" :after-read="afterRead" @click.native="clickItem('thumbnail')"/>
        <div style="width: 200px;">
          <van-field
            class="c-textarea"
            v-model="metaData.companyName"
            rows="1"
            autosize
            type="textarea"
            maxlength="15"
            placeholder="此处输入主办方名称或品牌名"
            show-word-limit
          />
          <van-field
            style="margin-top: 20px;"
            class="c-textarea"
            v-model="metaData.companyDescription"
            rows="1"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="此处输入主办方简要介绍"
            show-word-limit
          />
        </div>
      </div>
      <div class="title-23">
        <span style="color: #10aeff;background: #fff;padding: 0 10px;">咨询电话</span>
      </div>
      <div class="x-area" style="margin: 10px 0;">
        <span class="label-item" style="width: 100%;">
          <van-field class="v-input" v-model="metaData.phone" style="width: 100%;" />
        </span>
      </div>
      <div class="x-title">提示：客户可以通过此电话直接咨询，建议留下手机号保持手机畅通（不留电话则不显示）</div>
      <div class="title-23">
        <span style="color: #10aeff;background: #fff;padding: 0 10px;">选择位置</span>
      </div>
      <div class="location" @click="choosePosition">
        <van-icon name="location" />选择主办方地址
      </div>
      <span style="display: block;font-size: 0.3rem;color: #843493;padding: 0 15px;">{{metaData.address}}</span>
        <div id="container" style="height: 5rem"></div>
      <div class="x-title" style="text-align: center;">提示：不选择则不显示</div>
    </content-wrap>
    <content-wrap title="信息收集设置">
      <div class="x-title">
        <van-icon name="info" />可以根据活动具体需求来设定需要收集客户的信息字段
      </div>
      <div class="x-title">
        <van-icon name="info" />自定义项为空则不显示，最多可以填写6个字
      </div>
      <div class="x-title">
        <van-icon name="info" />如果用户报名，此内容不可再做任何修改
      </div>
      <div class="x-title">
        <van-icon name="info" />
        <span style="color: red;">谨慎设定自定义信息收集，要求填写过多信息，报名数将大大降低</span>
      </div>
      <div class="x-area">
        <span class="label-item">
          <van-field class="v-input" v-model="metaData.question1" placeholder="信息项名称" disabled style="width: 3rem;" />
        </span>
        <span class="label-item">
          <!-- <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" /> -->
          必填项
        </span>
      </div>
      <div class="x-area">
        <span class="label-item">
          <van-field class="v-input" v-model="metaData.question2" placeholder="信息项名称" disabled style="width: 3rem;" />
        </span>
        <span class="label-item">
          <!-- <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" /> -->
          必填项
        </span>
      </div>
      <div class="x-area">
        <span class="label-item">
          <van-field class="v-input" v-model="metaData.question3" placeholder="信息项名称" style="width: 3rem;" />
        </span>
        <span class="label-item">
          <!-- <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" /> -->
          必填项
        </span>
      </div>
      <div class="x-area">
        <span class="label-item">
          <van-field class="v-input" v-model="metaData.question4" placeholder="信息项名称" style="width: 3rem;" />
        </span>
        <span class="label-item">
          <!-- <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" /> -->
          必填项
        </span>
      </div>
      <div class="x-area">
        <span class="label-item">
          <van-field class="v-input" v-model="metaData.question5" placeholder="信息项名称" style="width: 3rem;" />
        </span>
        <span class="label-item">
          <!-- <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" /> -->
          必填项
        </span>
      </div>
    </content-wrap>
    <content-wrap title="活动规则">
      <v-textarea v-model="metaData.activityRule"></v-textarea>
    </content-wrap>
    <content-wrap title="领奖信息">
      <v-textarea v-model="metaData.prizeInfo"></v-textarea>
    </content-wrap>
    <!-- <content-wrap title="评论设置">
      <div class="x-area" style="margin: 10px 0;">
        <span class="label-item x-title">
          开启语音评论
          <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
        </span>
      </div>
      <div class="x-area" style="margin: 10px 0;">
        <span class="label-item x-title">
          报名后才能评论
          <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
        </span>
      </div>
      <div class="x-area" style="margin: 10px 0;">
        <span class="label-item x-title">
          只显示精华评论
          <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
        </span>
      </div>
      <div class="x-title">温馨提示：如果开启，活动首页评论列表只显示精华评论（可在活动管理=>留言管理下进行移入精华操作；如果关闭，将显示所有评论</div>
    </content-wrap> -->
    <content-wrap title="店内优惠">
      <div class="x-title">
        <van-icon name="info" />在此填写您的店内优惠或者活动优惠内容
      </div>
      <div class="x-title">
        <van-icon name="info" />第一条不填写，则不显示
      </div>
      <div class="x-title">
        <van-icon name="info" />最多可设置20条优惠内容
      </div>
      <add-file :activeList.sync="metaData.discount"></add-file>
    </content-wrap>
    <order-soft></order-soft>
    <div class="footer">
      <van-button
        round
        type="info"
        @click="proview"
        style="background:#ececec;border-color: #ececec; color: #0b206d;"
      >预览活动</van-button>
      <van-button round type="info" style="background:#0b206d;border-color: #0b206d;" @click="save">保存活动</van-button>
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
  name: "bargain-dev",
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
        createUser: "",
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
        question1: "姓名",
        question2: "电话",
        question3: "",
        question4: "",
        question5: "",
        barginNum: "", //砍价次数
        address: ""
      },
      itemIndex: '',
      loading: false,
      checked: false,
      message: ""
    };
  },
  provide: {
    isEdit: true
  },
  computed: {
    ...mapGetters("common", {
      userInfo: 'userInfo',
      bargainData: "bargainData"
    })
    // metaData: {
    //   set(meta){
    //     this.setBargainData(meta);
    //   },
    //   get(){
    //     return this.bargainData;
    //   }
    // }
  },
  watch: {
    metaData: {
      handler: function(newData){
        console.log(newData)
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    if(this.$route.query.userVuex && this.bargainData != null){
        let params = Object.assign({}, this.bargainData);
        params.prizeDescription = JSON.parse(params.prizeDescription);
        params.discount = JSON.parse(params.discount);
        params.gift = JSON.parse(params.gift);
        params.thumbnail = JSON.parse(params.thumbnail);
        this.metaData = params;
        this.mapInit();
        return;
    }

    if (!this.$route.query.id) {
      this.mapInit();
      return;
    }
    this.getInfo(this.$route.query.id)
  },
  methods: {
    ...mapMutations("common", {
      setBargainData: "setBargainData"
    }),
    mapInit() {
      navigator.geolocation.getCurrentPosition(
        position => {
          var self = this;
          var map = new qq.maps.Map(document.getElementById("container"), {
            center: new qq.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            zoom: 13
          });
          var geocoder = new qq.maps.Geocoder({
            complete: function(result) {
              map.setCenter(result.detail.location);
              self.metaData.address = result.detail.address;
            }
          });
          if (self.metaData.latitude != "" && self.metaData.longitude != "") {
            var marker = new qq.maps.Marker({
              position: new qq.maps.LatLng(
                parseFloat(self.metaData.latitude),
                parseFloat(self.metaData.longitude)
              ),
              map: map
            });
            geocoder.getAddress(
              new qq.maps.LatLng(
                parseFloat(self.metaData.latitude),
                parseFloat(self.metaData.longitude)
              )
            );
          }
          qq.maps.event.addListener(map, "click", function(event) {
            var lat = parseFloat(event.latLng.lat);
            var lng = parseFloat(event.latLng.lng);
            self.metaData.latitude = lat;
            self.metaData.longitude = lng;
            var latLng = new qq.maps.LatLng(lat, lng);
            //调用获取位置方法
            geocoder.getAddress(latLng);
            var marker = new qq.maps.Marker({
              position: event.latLng,
              map: map
            });
            qq.maps.event.addListener(map, "click", function(event) {
              marker.setMap(null);
            });
          });
        },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("您拒绝对获取地理位置的请求");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("位置信息是不可用的");
              break;
            case error.TIMEOUT:
              alert("请求您的地理位置超时");
              break;
            case error.UNKNOWN_ERROR:
              alert("未知错误");
              break;
          }
        }
      );
    },
    imgDelete(key){
        this.metaData[key] = [];
    },
    clickItem(index){
        this.itemIndex = index;
    },
    afterRead(file){
        this.upload(file.file)
    },
    async upload(file) {
        let form = new metaDataata();
        form.append("upfile ", file);
        let config = {
            headers: { "Content-Type": "multipart/form-data" }
        };
        let {data: res} = await this.$api.common.upload(form)    
        if (res.code == "0000") {
            this.metaData[this.itemIndex] = [{url: res.result.data}];
        } else {
            this.$notify({type: "danger", message: res.msg})
        }
    },
    async getInfo(id){
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      });
      let {data: res} = await this.$api.common.barginInfo({
        type: "edit",
        id: id
      });
      this.$toast.clear();
      this.mapInit();
      if(res.code === "0000"){
        let params = res.result.bargin;
        params.prizeDescription = JSON.parse(params.prizeDescription);
        params.discount = JSON.parse(params.discount);
        params.gift = JSON.parse(params.gift);
        params.thumbnail = JSON.parse(params.thumbnail);
        this.metaData = params;
      }else {
         this.$notify({ type: 'danger', message: res.msg });
      }
    },
    dataFormate(){
      let params = Object.assign({}, this.metaData);
      params.prizeDescription = JSON.stringify(params.prizeDescription);
      params.discount = JSON.stringify(params.discount);
      params.gift = JSON.stringify(params.gift);
      params.thumbnail = JSON.stringify(params.thumbnail);
      params.createUser = this.userInfo.userId;
      this.setBargainData(params);
    },
    proview(){
      this.dataFormate()
      this.$router.push({path: 'bargainPro'})
    },
    async save(){
      this.dataFormate();
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      });
      let {data: res} = await this.$api.common.barginSave(this.bargainData);
      this.$toast.clear();
      if(res.code === "0000"){
         this.$notify({ type: 'success', message: "保存成功！" });
      }else {
         this.$notify({ type: 'danger', message: res.msg });
      }
    },
    async choosePosition(){
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
          "openLocation"
        ] // 必填，需要使用的JS接口列表
      });
      wx.ready(() => {
        wx.openLocation({
          latitude: '',
          longitude: '',
          success(res){
            this.metaData.latitude = res.latitude;
            this.metaData.longitude = res.longitude;
            this.metaData.address = res.address;
          }
        })
      })
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


