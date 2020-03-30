<template>
  <div id="scroll-box">
        <ul>
          <li v-for="item in list" :key="item.key"><span v-if="item.order_status=='3'"><img :src="item.headimgurl" style="width: 0.6rem; height: 0.6rem; border-radius: 50%;margin: 0 0.2rem;position: relative; top: 0.08rem;"/>{{"恭喜 "  + item.username + ' 已完成支付￥' + item.total_price + '元'}}</span></li>
        </ul>
        <ul></ul>
    </div>
</template>

<script>
export default {
  name: "scroll",
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      defaultData: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var box = document.getElementById("scroll-box");
      var parent = document.getElementsByTagName("ul")[0];
      var parent2 = document.getElementsByTagName("ul")[1];
      parent2.innerHTML = parent.innerHTML;
      /*启动定时器*/ var timer = setInterval(autoScrollLine, 30);
      /*单行向上滚动效果*/ function autoScrollLine() {
        /*判断滚动内容是否已经滚完，滚完了则滚动的值重新设置到0     否则就每隔30毫秒向上滚动1px*/ if (
          box.scrollTop >= parent.offsetHeight
        ) {
          box.scrollTop = 0;
        } else {
          box.scrollTop++;
        }
        /*判断滚动的距离刚好为一条公告的高度时停掉定时器，       隔1s之后重新启动定时器即可实现公告滚动停留效果 */ if (
          box.scrollTop % box.offsetHeight ==
          0
        ) {
          clearInterval(timer);
          setTimeout(() => {
            timer = setInterval(autoScrollLine, 30);
          }, 0);
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#scroll-box {
  height: 2rem;
  padding: 0 1rem;
  background: #fff;
  overflow: hidden;
}
#scroll-box ul {
  margin: 0;
  list-style: none;
}
#scroll-box li {
  color: #000;
  font-size: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>