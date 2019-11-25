<template>
    <div class="wrap">
      <music></music>
      <theme-activity></theme-activity>
      <special></special>
      <title-active></title-active>
      <van-uploader>
        <div class="upload-div"></div>
      </van-uploader>
      <content-wrap >
        <create-time></create-time>
      </content-wrap>
      <content-wrap title="测试标题">
        <v-textarea></v-textarea>
      </content-wrap>
      <content-wrap title="图片测试上传">
        <add-file></add-file>
      </content-wrap>
      <order-soft></order-soft>
      <div class="footer">
        <van-button round type="info" style="background:#ececec;border-color: #ececec; color: #0b206d;">预览活动</van-button>
        <van-button round type="info" style="background:#0b206d;border-color: #0b206d;">保存活动</van-button>
      </div>
    </div>
</template>
<script>
import Music from "../components/music";
import ContentWrap from "../components/contentWrap";
import VTextarea from "../components/textarea";
import AddFile from "../components/addFile";
import OrderSoft from "../components/orderSoft";
import TitleActive from "../components/titleActive";
import ThemeActivity from "../components/theme";
import Special from "../components/special";
import CreateTime from "../components/time";
export default {
  name: "active-dev",
  data() {
    return {
      loading: false,
      finished: false
    };
  },
  provide: {
    isEdit: true
  },
  methods: {},
  components: {
    Music,
    ContentWrap,
    VTextarea,
    AddFile,
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
  background: red;
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
</style>


