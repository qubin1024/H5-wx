<template>
  <div>
    <div class="wrap" v-show="!show">
      <!-- <music></music> -->
      <user-center></user-center>
      <!-- <theme-activity v-if="!isAdmin"></theme-activity> -->
      <special></special>
      <img src="@/assets/img/qianggou.jpeg" width="100%" />
      <title-active v-model="metaData.page1Title"></title-active>
      <content-wrap>
        <create-time :startTime.sync="metaData.startTime" :endTime.sync="metaData.endTime"></create-time>
      </content-wrap>
      <content-wrap>
        <div class="center">
          <img-upload :image.sync="metaData.thumbnail"></img-upload>
        </div>
        <van-field v-model="metaData.activityTheme" label="活动主题" />
        <van-field v-model="metaData.activityName" label="活动名称" />
        <van-field v-model="metaData.virtualPopularity" type="number" label="虚拟人气值" />
        <van-field v-model="metaData.phone" label="电话" />
        <van-field v-model="metaData.productPrice" label="产品价格" />
        <van-field v-model="metaData.redEnvelopesName" label="红包名称" />
        <van-field v-model="metaData.maxValue" type="number" label="红包最大值" />
        <van-field v-model="metaData.minValue" type="number" label="红包最小值" />
        <van-field
              class="c-textarea"
              v-model="metaData.redEnvelopesBlessings"
              rows="1"
              autosize
              type="textarea"
              maxlength="15"
              placeholder="红包祝福语"
              show-word-limit
            />
      </content-wrap>
       <content-wrap title="活动规则">
        <add-component :activeList.sync="metaData.activityRules"></add-component>
      </content-wrap>
      <content-wrap title="活动说明">
        <add-component :activeList.sync="metaData.activityDestription"></add-component>
      </content-wrap>
      <content-wrap title="红包规则">
        <add-component :activeList.sync="metaData.redRules"></add-component>
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
      <content-wrap title="上传首中尾" v-if="isAdmin">
          <img-upload :image.sync="metaData.headImage" placeholder="上传头部图片"></img-upload>
          <img-upload :image.sync="metaData.bgImage" placeholder="上传背景图片"></img-upload>
          <img-upload :image.sync="metaData.footImage" placeholder="上传底部图片"></img-upload>
      </content-wrap>
      <div class="footer" v-if="!show">
        <van-button
          round
          type="info"
          @click="proview"
          style="background:#ececec;border-color: #ececec; color: #0b206d;"
        >预览活动</van-button>
        <van-button round type="info" style="background:#0b206d;border-color: #0b206d;" @click="save">保存活动</van-button>
      </div>
      
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
import MapInit from "./mapInit.vue";
import ImgUpload from "../components/imgupload.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "bargain-dev",
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
}
,
      show: false,
      itemIndex: '',
      loading: false,
      checked: false,
      isAdmin: false,
      message: ''
    };
  },
  provide: {
    isEdit: true
  },
  computed: {
    ...mapGetters("common", {
      userInfo: 'userInfo',
      qianggouData: "qianggouData"
    })
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
    if(typeof this.$route.query.isAdmin ==  'string'){
      this.isAdmin = this.$route.query.isAdmin == 'true' ? true : false;
    } else {
      this.isAdmin = this.$route.query.isAdmin
    }
    if(this.$route.query.userVuex && this.qianggouData != null){
        let params = Object.assign({}, this.qianggouData);
        params.activityRules = JSON.parse(params.activityRules);
        params.redRules = JSON.parse(params.redRules);
        params.activityDestription = JSON.parse(params.activityDestription);
        this.metaData = params;
        return;
    }

    if (!this.$route.query.id) {
      return;
    }
    this.getInfo(this.$route.query.id)
  },
  methods: {
    ...mapMutations("common", {
      setQianggouData: "setQianggouData"
    }),
    async getInfo(id){
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      });
      let {data: res} = await this.$api.common.distributionInfo({
        type: "edit",
        id: id
      });
      this.$toast.clear();

      if(res.code === "0000"){
        let params = res.result.distribution;
        params.activityRules = JSON.parse(params.activityRules);
        params.redRules = JSON.parse(params.redRules);
        params.activityDestription = JSON.parse(params.activityDestription);
        this.metaData = params;
      }else {
         this.$notify({ type: 'danger', message: res.msg });
      }
    },
    dataFormate(){
      let params = Object.assign({}, this.metaData);
      params.activityRules = JSON.stringify(params.activityRules);
      params.redRules = JSON.stringify(params.redRules);
      params.activityDestription = JSON.stringify(params.activityDestription);
      //params.createUser = this.userInfo.userId;
      this.setQianggouData(params);
    },
    proview(){
      this.dataFormate()
      this.$router.push({path: 'qianggouPro', query: { isAdmin: this.isAdmin }})
    },
    async save(){
      this.dataFormate();
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      });
      if(!this.isAdmin && !this.$route.query.isUpdate){
        this.qianggouData.templateId = this.qianggouData.id;
        this.qianggouData.id = "";
      }
      let {data: res} = await this.$api.common.distributionSave(this.qianggouData);
      this.$toast.clear();
      if(res.code === 0){
         this.$notify({ type: 'success', message: "保存成功！" });
      }else {
         this.$notify({ type: 'danger', message: res.msg });
      }
    },
    async choosePosition(){
      this.show = true;
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
    MapInit,
    ImgUpload
  }
};
</script>
<style lang="scss" scoped>
.location-wrap{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: #fff;
  transform: translateX(10rem);
}
.location-wrap.show{
  transform: translateX(0px);
}
.position {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2000;
  background: #fff;
} 
.wrap {
  background: #fe7626;
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
.center{
  width: 3rem;
  margin: 0 auto;
}
.round{
  width: 2rem;
    border-radius: 50%;
}
</style>


