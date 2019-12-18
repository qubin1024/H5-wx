<template>
  <div class="upload-wrap">
    <input type="file"  size="1" id="file" name="file" :ref="'myFile'" accept="image/*" @change="fileChange($event)" style="display:none"/>
    <van-icon name="plus" style="font-size: 1rem;" @click="uploadAction('myFile')" v-show="!image" />
    <span v-show="!image">{{placeholder}}</span>
    <img v-show="!!image" :src="image" width="100%" @click="uploadAction('myFile')" />
  </div>
</template>

<script>
export default {
  name: "img-upload",
  data() {
    return {
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "上传图片"
    },
    image: {
      type: String,
      default: ""
    },
  },
  methods: {
    uploadAction: function(myFile) {
      this.$refs[myFile].click();
    },
    fileChange: function(e) {
      let fileName = e.target.value;
      const extName = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (e.target.value === "") {
        return false;
      }
      this.upload(e.target.files[0]);
    },
    fileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picavalue = files[0];
      if (picavalue.size / 1024 / 1024 > 10) {
        alert("图片大小不能超过10M");
      } else {
        this.imgPreview(picavalue);
      }
    },
    //获取图片
    imgPreview(file, callback) {
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();
        //读取成功后的回调
        reader.onloadend = function(e) {
          let result = e.target.result;
          let img = new Image();
          console.log("********未压缩前的图片大小********");
          console.log(result.length);
          img.onload = function() {
            let data = self.compress(img);
            self.imgUrl = result;
            let blob = self.dataURItoBlob(data);
            //console.log(blob);
            self.upload(file);
          };
          img.src = result;
        };
        //将图片转成base64格式
        reader.readAsDataURL(file);
      }
    },
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      // console.log("*******压缩后的图片大小*******");
      // console.log(ndata)
      // console.log(ndata.length);
      return ndata;
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      else byteString = unescape(base64Data.split(",")[1]);
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    async upload(file) {
        let form = new FormData();
        form.append("upfile ", file);
        let config = {
            headers: { "Content-Type": "multipart/form-data" }
        };
        let {data: res} = await this.$api.common.upload(form)    
        if (res.code == "0000") {
            this.$emit('update:image', res.result.data)
        } else {
            this.$notify({type: "danger", message: res.msg})
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload-wrap {
  height: 100%;
  border: 1px dashed #2196f3;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #2196f3;
  color: 0.3rem;
  align-items: center;
  min-height: 2rem;
}
</style>