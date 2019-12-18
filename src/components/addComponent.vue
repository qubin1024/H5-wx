。<template>
  <div>
       <div class="wrap-file" v-for="(item, index) in activeList" :key='index'>
            <div class="tool-bar">
                <span @click="upData(index)" v-if="index != 0">上移</span>
                <span @click="downData(index)" v-if="index != activeList.length-1">下移</span>
            </div>
                <van-icon name="clear"  @click="deleteThis(index)" class="delete"/>
                <img-upload  v-if="item.type == 'img'" :image.sync="item.imgUrl" placeholder="上传图片"></img-upload>
                <van-field
                    v-if="item.type == 'media'"
                    class="c-textarea"
                    v-model="item.link"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="100"
                    placeholder="请输入视频地址【支持优酷、腾讯视频】"
                    show-word-limit
                />
                <van-field
                    v-if="item.type == 'text'"
                    class="c-textarea"
                    v-model="item.text"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="100"
                    placeholder="建议填写机构的成立时间、经营范围、产品优势、场地图片、产品图片、以及荣誉介绍"
                    show-word-limit
                />
                <van-field
                    v-if="item.type == 'textLink'"
                    class="c-textarea"
                    v-model="item.link"
                    rows="1"
                    autosize
                    type="textarea"
                    maxlength="100"
                    placeholder="输入需要跳转的网址"
                    show-word-limit
                />
                <van-field
                    v-if="item.type == 'textLink'"
                    class="c-textarea"
                    style="margin: 20px 0 0 0;"
                    v-model="item.des"
                    rows="1"
                    autosize
                    type="textarea"
                    maxlength="100"
                    placeholder="输入超链接的文字描述"
                    show-word-limit
                />
        </div>
        <div class='add'  @click="addActive('img')"><van-icon name="plus" />添加图片（最多添加10张图片） </div>
        <div class='add'  @click="addActive('text')"><van-icon name="plus" />添加文本（最多添加10个文本内容） </div>
        <div class='add'  @click="addActive('media')"><van-icon name="plus" />添加视频（最多添加5个视频） </div>
        <div class='add'  @click="addActive('textLink')"><van-icon name="plus" />添加文字链接（最多添加10个链接） </div>
  </div>
</template>

<script>
import VTextarea from "./textarea";
import ImgUpload from "./imgupload.vue";
export default {
  name: "add-component",
  data() {
    return {
      itemIndex: ''
    };
  },
  components: {
    VTextarea,
    ImgUpload
  },
  props: {
    activeList: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
  methods: {
    async upload(file) {
        let form = new FormData();
        form.append("upfile ", file);
        let config = {
            headers: { "Content-Type": "multipart/form-data" }
        };
        let {data: res} =  await this.$api.common.upload(form)    
        if (res.code == "0000") {
            this.activeList[this.itemIndex].imgUrl = res.result.data;
            this.$emit('update:activeList', this.activeList)
        } else {
            this.$notify({type: "danger", message: res.msg})
        }
    },
    blurFunction(e) {
      var scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop; //获取软键盘唤起前浏览器滚动部分的高度
      document.documentElement.scrollTop = scrollTop;
    },
    addActive(type) {
      this.activeList.push({
        type: type,
        link: "",
        des: "",
        text: "",
        imgUrl: ''
      });
      this.$emit('update:activeList', this.activeList)
    },
    deleteThis(index) {
      this.activeList.splice(index, 1);
      this.$emit('update:activeList', this.activeList)
    },
    upData(index) {
      this.activeList = this.swapItems(this.activeList, index, index - 1);
      this.$emit('update:activeList', this.activeList)
    },
    downData(index) {
      this.activeList = this.swapItems(this.activeList, index, index + 1);
      this.$emit('update:activeList', this.activeList)
    },
    swapItems: function(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add {
  height: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  margin: 0.3rem auto;
  display: flex;
  justify-content: center;
  color: 0.3rem;
  border: 1px dashed #0b206d;
  color: #0b206d;
  align-items: center;
}
.tool-bar {
  position: absolute;
  height: 0.8rem;
  top: -0.8rem;
  width: 8.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.tool-bar span {
  display: inline-block;
  width: 1.5rem;
  height: 0.6rem;
  font-size: 0.4rem;
  line-height: 0.6rem;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  margin: 0 5px;
  background: #171717;
}
.wrap-file {
  position: relative;
  margin: 1rem auto 0.2rem auto;
  min-height: 3rem;
  padding: 1px;
}
.delete {
  position: absolute;
  right: 0rem;
  top: -0.6rem;
  font-size: 24px;
  z-index: 100;
  color: #171717;
}
.text {
  width: 5rem;
  margin: 0.5rem 2rem;
}
.tag {
  position: absolute;
  left: 0.5rem;
  top: 0.8rem;
  font-size: 14px;
  z-index: 100;
}
.c-textarea {
  border: 1px dashed #0d1a31;
  padding: 10px 15px;
  border-radius: 5px;
}
</style>
