<template>
  <div>
       <div class="wrap-file" v-for="(item, index) in activeList" :key='index'>
            <div class="tool-bar">
                <span @click="upData(index)" v-if="index != 0">上移</span>
                <span v-if="index != activeList.length-1" @click="downData(index)">下移</span>
            </div>
                <span  @click="deleteThis(index)" class="delete">删除</span>
                <van-tag round type="primary" class="tag">{{index + 1}}</van-tag>
                <v-textarea class="text" v-model="item.text"></v-textarea>
                <!-- <span v-html="item.html" v-if='item.type == "uploadImg" && !!item.image'></span> -->
                <!-- <img-upload  ref="activelist" @uploadCallback="getUrl($event, item)" v-if='item.type == "uploadImg" && !item.image'></img-upload>
                <x-textarea title="文字" v-model="item.image"  v-if='item.type == "uploadText"' :rows="5" :show-clear="false" @on-focus="blurq($event)"></x-textarea> 
                <x-textarea title="视频链接" v-model="item.image"  v-if='item.type == "uploadVedio"' :rows="5" :show-clear="false" @on-focus="blurq($event)"></x-textarea>  -->
        </div>
        <div class='add'  @click="addActive('uploadText')"><i class="fa fa-plus" aria-hidden="true"></i>继续添加（还能添加 {{20 - activeList.length}} 条） </div>
  </div>
</template>

<script>
import VTextarea from "./textarea";
import ImgUpload from "./imgupload.vue";

export default {
  name: "add-file",
  data() {
    return {
    };
  },
  components: {
    VTextarea,
    ImgUpload
  },
  props: {
    // type: {
    //   type: String,
    //   default: ""
    // }
    activeList: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
  methods: {
    blurq(e) {
      var scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop; //获取软键盘唤起前浏览器滚动部分的高度
      document.documentElement.scrollTop = scrollTop;
    },
    addActive(type) {
      this.activeList.push({
        type: type,
        text: ""
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
  background: #0b206d;
  color: #ffffff;
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
  background: #0b206d;
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
  top: 0.6rem;
  font-size: 14px;
  z-index: 100;
  color: #0f97e6;
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
</style>
