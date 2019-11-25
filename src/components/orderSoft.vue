<template>
    <content-wrap title="排行榜">
      <img width="100%" src="../assets/img/softOrder.png" />
      <table>
        <thead>
            <th>排名</th>
            <th>姓名</th>
            <th>当前价格</th>
        </thead>
        <tbody>
            <tr v-for="(item, index) in list" :key="index">
                <td>
                    <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{index+1}}</div>
                </td>
                <td>
                    <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.username | filterusername(item.username)}}</div>
                </td>
                <td>
                    <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.total_price == formD.floorPrice ? "已经降至底价": item.total_price}}</div>
                </td>
            </tr>
        </tbody>
    </table>
    </content-wrap>
</template>
<script>
import ContentWrap from "../components/contentWrap";
export default {
  name: "order-soft",
  components: {
    ContentWrap
  },
  data() {
    return {
      list: []
    };
  }
};
</script>

<style lang="scss" scoped>
img {
  height: 3rem;
}
table {
  width: 100%;
  text-align: center;
  line-height: 0.8rem;
}

table th {
  color: #f43530;
}
</style>

