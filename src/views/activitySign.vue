<template>
    <div class="activitySign">
        <van-search placeholder="请输入搜索关键词" v-model="value" />
        <div class="bullhorn"><van-icon name="bullhorn-o" /> 选中报名人信息向左拖动，可看到隐藏信息以及操作按钮</div>
        <div class="bullhorn"><van-icon name="bullhorn-o" /> 点击“姓名”可跳转到该报名者的主页</div>
        <div class="bullhorn"><van-icon name="bullhorn-o" /> 点击【……】可对用户进行删除以及改名等操作</div>
        <div class="bullhorn" style="color: red;"><van-icon name="bullhorn-o" /> 如需导出报名信息，请至我的活动，->更多操作中导出</div>
        <div class="btn" @click="scane">
            <span style="color: #61d854; font-size: 22px;"><van-icon name="search" /> 扫码兑奖</span>
            <span style="color: red;">(续费后使用)</span>
        </div>
        <div class="search-bar">
            <van-tag round mark @click="click(0)" :type="flag === 0 ? 'danger' : 'primary'">未完成</van-tag>
            <van-tag round mark @click="click(1)" :type="flag === 1 ? 'danger' : 'primary'" >已完成</van-tag>
            <van-tag round @click="click('')" :type="flag === '' ? 'danger' : 'primary'">全部</van-tag>
        </div>
        <table>
            <thead>
                <th>序号</th>
                <th>姓名</th>
                <th>手机</th>
                <th>当前价格</th>
                <th>报名时间</th>
                <th>操作</th>
            </thead>
            <tbody>
                <tr v-for="(item, index ) in list" :key="index">
                    <td>{{index}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.mobile}}</td>
                    <td>{{item.total_price}}</td>
                    <td>{{item.createTime}}</td>
                    <td>
                        <van-icon name="ellipsis" @click="itemClick(item)" />
                    </td>
                </tr>
            </tbody>

        </table>
        <a ref="phone" :href="'tel:' + mobile" style="display: hidden;"> </a>
        <van-action-sheet
            v-model="show"
            @select="select"
            :actions="actions"
            cancel-text="取消"
            />
    </div>    
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "activity-sign",
  data() {
    return {
        value: '',
        show: false,
        mobile: '',
        itemCache: {},
        flag: '',
        list: [],
        actions: [
            { name: '标记/兑奖', color: '#07c160' },
            { name: '打电话' }
        ]
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'userInfo'
    })
  },
  mounted(){
      this.getOrderByActivityId();
      let currentUrl = encodeURIComponent(location.href.split("#")[0]);
          this.$api.common.initwxjs({
            url: currentUrl
          }).then(({data: jsRes}) => {
              wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: jsRes.result.data.appId, // 必填，公众号的唯一标识
            timestamp: jsRes.result.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: jsRes.result.data.nonceStr, // 必填，生成签名的随机串
            signature: jsRes.result.data.signature, // 必填，签名s
            jsApiList: [
              'checkJsApi', 'scanQRCode'
            ] // 必填，需要使用的JS接口列表
          });
          
        })
          
  },
  methods: {
      itemClick(item){
          this.show = true;
          this.itemCache = item;
          this.mobile = this.itemCache.mobile;
      },

      click(i){
          this.flag = i;
          this.getOrderByActivityId();
      },
      select(item, index){
          if(index){
               if(this.itemCache.mobile){
                this.mobile = this.itemCache.mobile;
                this.$nextTick(() => {
                    this.$refs['phone'].click()
                })
                }
          }else{
              this.$api.common.sendFlag({
                  orderId: this.itemCache.orderId,
                  sendFlag: !!this.itemCache.send_Flag ? 0 : 1
              }).then(({data: res})=>{
                  if(res.code === "0000"){
                      this.show = false;
                      this.getOrderByActivityId();
                      this.$notify({type: "success", message: "标记成功"})
                  }else{
                      this.$notify({type: "danger", message: res.msg})
                  }
              })
          }
      },
      scane: function(){
          wx.ready(() => {
              wx.scanQRCode({
                needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType : [ "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success : function(res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                 window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
                }
            });
          });
      },
    async getOrderByActivityId(activityState){
        let {data: res} = await this.$api.common.getOrderByActivityId({
          "user_id": this.userInfo.userId,
          "activityId": this.$route.query.id,
          "sendFlag": this.flag.toString()
        });
        if(res.code === "0000"){
          this.list = res.result.data;
        }else{
            this.$notify({type: "danger", message: res.msg})
        }
    }
  }
};
</script>
<style lang="scss" scoped>
.bullhorn{
    font-size: 12px;
    padding: 5px;
    color: #5d5d5d;
}
.btn{
    width: 200px;
    height: 60px;
    margin: 10px auto;
    border-radius: 30px;
    border: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
}

table {
    font-size: 12px;
    width: 100%;
    td{
        text-align: center;
    }
}
.search-bar{
    margin: 20px 10px;
    display: flex;
    flex-direction: row-reverse;
    /deep/ .van-tag{
        margin: 0 5px;
    }
}
</style>

