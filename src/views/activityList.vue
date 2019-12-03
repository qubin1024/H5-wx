<template>
    <div class="activityList">
        <div style="background: rgb(248, 248, 248);">
            <div class="active-wrap">
                <div v-for="item in bar" :key="item.id" class="item" :class="{'active': item.active || false}" @click="itemClick(item)">
                    {{item.name}} <span>{{item.remark}}</span>
                </div>
            </div>
            <div class="title">
                <span style="color: red;font-size: 16px;">请根据您的活动需求选择活动模板</span>
                <span style="font-size: 12px;">【不清楚选啥活动？不知道咋做？ <span style="color: #0955c5;">查看案例</span>】</span>
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
          <div class="item" v-for="item in list" :key="item.id">
                <div class="img-wrap">
                    <img :src="item.thumbnail" width="100%" height="100%"/>
                    <span>{{`已有${!!item.useNum ? item.useNum : 0}次制作`}}</span>
                </div>
                <h2>{{item.activityName}}</h2>
                <van-button round type="default" size="mini" @click="look(item)">查看示例</van-button>
                <van-button round type="info" size="mini" @click="make(item)">开始制作</van-button>
            </div>
        </van-list>
        <div class="footer-bar">
            <div class="item" @click="myActive">
                <van-icon name="todo-list" />
                <span>我的活动</span>
            </div>
            <div class="item">
                <van-icon name="invition" />
                <span>精选案例</span>
            </div>
            <div class="item">
                <van-icon name="like"/>
                <span>客服</span>
            </div>
            <div class="item">
                <van-icon name="column" />
                <span>活动教程</span>
            </div>
            <div class="item">
                <van-icon name="question" />
                <span>常见问题</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "activit-list",
  data(){
    return {
      bar: [],
      type: {
        key: '1分销， 2积赞，3砍价，4拼团，5抽奖',

      },
      loading: false,
      finished: false,
      list: [],
      page: 1,
      size: 5,
      actives: "",
      loading: false,
      finished: false
    }
  },
  mounted(){
    this.queryByType()
  },
  methods: {
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
    },
    make(item){
      if(item.activityType == '3'){
        this.$router.push({path: 'bargainDev', query: {
          id: item.id
        }})
      }
    },
    look(item){
      if(item.activityType == '3'){
        location.href = location.origin +  "/statics/dist/redirect.html?id=" + item.id + "&hash=bargainPro";
        // this.$router.push({path: 'bargainPro', query: {
        //   id: item.id
        // }})
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-bar {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  border-top: 1px solid#ccc;
  background: #fffffff0;
  z-index: 200;
  display: flex;
  justify-content: space-around;
  .item {
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #a2a2a2;
    i {
      font-size: 38px;
    }
    .van-icon-like {
      position: relative;
      top: -15px;
      color: red;
    }
  }
}
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
  .item {
    width: 160px;
    height: 250px;
    border: 1px solid rgba(255, 255, 255, 0);
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
</style>
