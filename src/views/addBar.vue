<template>
    <div class="activityList">
        <div style="background: rgb(248, 248, 248);">
            <div class="active-wrap">
                <div v-for="item in bar" :key="item.id" class="item" :class="{'active': item.active || false}" @click="itemClick(item)">
                    {{item.name}} <span>{{item.remark}}</span>
                </div>
            </div>
            <van-button type="primary" size="large" @click="show = true">添加标签</van-button>
            <div class="title">
                <span style="color: red;font-size: 16px;">选择模板添加标签</span>
            </div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          :offset="20"
          finished-text="没有更多了"
          class="activity"
          @load="onLoad"
        >
          <div class="item" v-for="item in list" :key="item.id" :class="{'active': item.active}" @click="choose(item)">
                <div class="img-wrap">
                    <img :src="item.thumbnail" width="100%" height="100%"/>
                </div>
                <h2>{{item.activityName}}</h2>
            </div>
        </van-list>
        <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '50%' }"
            >
            <van-field v-model="name" required placeholder="标签名称" />
            <van-field v-model="remark"  placeholder="标红tag" />
            <van-button type="info" size="small" @click="save">保存</van-button>
        </van-popup>
    </div>
</template>
<script>
export default {
  name: "add-bar",
  data(){
    return {
      bar: [],
      show: false,
      loading: false,
      finished: false,
      list: [],
      page: 1,
      size: 5,
      actives: "",
      loading: false,
      finished: false,
      name: "",
      remark: ""
    }
  },
  mounted(){
    this.queryByType()
  },
  methods: {
    async save(){
        if(!this.list.some(e => e.active === true)){
            return this.$notify({type: "danger", message: "请选择模版"})
        }
        if(!this.name){
            return this.$notify({type: "danger", message: "标签名称必填"})
        }
        let value = [];
        this.list.map(e=>{
            if(e.active) value.push(e.id);
        })
        let {data: res} = await this.$api.common.tempaleSave({
            "code": "", 
            "id": "",
            "name": this.name,
            "orderNum": 0, 
            "remark": this.remark, 
            "type": "bar",
            "value": value.join(',')
        })
        if(res.code === '0000'){
            this.queryByType();
            this.show = false;
            this.$notify({ type: 'success', message: "新建成功" })
        }else{
            this.$notify({ type: 'danger', message: res.msg })
        }
    },
    choose(item){
        item.active = !item.active;
    },
    onLoad() {
      // 异步更新数据
      this.queryAllTemplate()
    },
    async queryAllTemplate(){
      let {data: res} = await this.$api.common.queryAllTemplate({
        pageSize: this.size,
        pageNum: (this.page - 1) * 5 + 1,
        activityId: !!this.actives ? this.actives : undefined
      })
      this.loading = false;
      this.page++;
      if(res.code === '0000'){
        if(res.result.data.length == 0){
          this.finished = true;
        }else{
            res.result.data.filter(e=>{
                e.active = false   
            })
            this.list = this.list.concat(res.result.data);
        }
      }else{
        this.finished = true;
        this.$notify({ type: 'danger', message: res.msg })
      }
    },
    itemClick(item){
      if(item.active){
        item.active = false;
        this.list = [];
        this.page = 1;
        this.actives = "";
      }else{
        this.bar.filter( e => {
          e.active = false;
        })
        item.active = true;
        this.list = [];
        this.page = 1;
        this.actives = item.value;
      }
      this.queryAllTemplate();
    },
    async queryByType(){
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      });
      let {data: res} = await this.$api.common.queryByType({
        "type": "bar"
      });
      this.$toast.clear();
      if(res.code === "0000"){
        res.result.data.filter( e => {
          e.active = false;
        })
        this.bar = res.result.data
      }else{
        this.$notify({ type: 'warning', message: res.msg });
      }
    },
    myActive(){
      this.$router.push({path: 'templateList'})
    }
  }
};
</script>

<style lang="scss" scoped>

.title {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}
.activity {
  padding: 0px 5px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 1.5rem;
  background: rgb(248, 248, 248);
  /deep/ .van-list__loading{
    width: 375px;
  }
  /deep/ .van-list__finished-text{
    width: 375px;
  }
  .item.active{
      border: 3px solid rgba(100, 248, 81, 1);
      box-shadow: 0px 0px 15px 1px #64f851;
  }

  .item {
    width: 156px;
    height: 200px;
    border: 3px solid rgba(100, 248, 81, 0);
    margin: 10.25px;
    .img-wrap {
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
      overflow: hidden;
      height: 160px;
      position: relative;
      span {
        position: absolute;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background: rgba(0, 0, 0, 0.541);
        bottom: 0;
        left: 0;
        z-index: 100;
        font-size: 16px;
      }
    }
    h2 {
      font-size: 14px;
      margin: 2px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 5px;
    }
    /deep/ .van-button {
      margin: 10px;
      width: 60px;
    }
  }
}
.active-wrap {
  padding: 10px 5px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item {
    margin: 5px;
    padding: 5px 5px;
    height: 15px;
    border-radius: 3px;
    font-size: 12px;
    background: #fff;
    border: 1px solid rgb(74, 156, 250);
    span {
      color: red;
      font-size: 6px;
      margin: 0 0 0 5px;
      position: relative;
      top: -3px;
    }
  }
  .item.active {
    background: rgb(74, 156, 250);
    color: #fff;
  }
}
/deep/ .van-button--large{
    width: 75%;
    margin: 0 12.5%;
}
/deep/ .van-button{
    width: 75%;
    margin: 20px 12.5%;
}
</style>
