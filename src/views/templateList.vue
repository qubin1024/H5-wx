<template>
    <div class="templateList">
        <van-search placeholder="请输入搜索关键词" v-model="value" />
        <van-tabs v-model="active" sticky>
        <van-tab v-for="(item, index) in tabList" :title="item" :key="index">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="- 已经到底了 -"
                @load="onLoad"
            >
            </van-list>
        </van-tab>
        </van-tabs>
        <div class="footer-bar">
            <div class="item">
                <van-icon name="wap-home" />
                <span>首页</span>
            </div>
            <div class="item">
                <van-icon name="invition" />
                <span>精选案例</span>
            </div>
            <div class="item" @click="makeActive">
                <van-icon name="add"/>
                <span style=" color: rgb(53, 126, 235);">制作</span>
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
  name: "template-list",
  data() {
    return {
      tabList: ["全部", "未开始", "进行中", "已结束", "已下架"],
      loading: false,
      finished: true
    };
  },
  methods: {
    makeActive(){
      this.$router.push({path: 'activityList'})
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
    .van-icon-add {
      position: relative;
      top: -15px;
      color: rgb(53, 126, 235);
    }
  }
}
/deep/ .van-tabs__line {
  background: rgb(53, 126, 235);
}
</style>

