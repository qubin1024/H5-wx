<template>
    <div class="retrieve">
         <van-cell-group>
            <van-field required v-model="mobile" placeholder="请输入手机号" />
            <van-field
                v-model="sms"
                center
                required
                clearable
                placeholder="请输入短信验证码"
            >
                <van-button slot="button" @click="sendMessage" size="small" :disabled="sendLoading" :loading="sendLoading" :loading-text="total + 's重发'" loading-type="spinner" type="primary">发送验证码</van-button>
            </van-field>
            <van-field v-model="npd" type="password" required placeholder="请输入新密码（6-20位字母和数字组合）" />
            <van-field v-model="opd" type="password" required placeholder="请输入新密码" />
        </van-cell-group>
        <van-button round type="info" class="btn" @click="changePassword">重置密码</van-button>
        <van-button round type="default" class="btn" @click="goBack">返回</van-button>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import {regExp} from "@/util"
export default {
  name: "retrieve",
  data(){
    return {
      sendLoading: false,
      total: 60,
      timeId: null,
      mobile: "",
      npd: "",
      sms: "",
      opd: ""
    }
  },
  methods: {
    ...mapMutations('common', {
      setUser: "setUser"
    }),
    goBack(){
      this.$router.go(-1)
    },
    changePassword(){
      if(this.npd != this.opd){
        this.$notify({type: "danger", message: "密码不一致"})
      }
      if(!!this.npd && !!this.opd && !!this.mobile && !!this.sms){
        this.$api.common.changePassword({
          "captcha": this.sms,
          "password": this.npd,
          "mobile": this.mobile
        }).then(({data: res}) => {
          if(res.code === "0000"){
            this.$notify({type: "success", message: "修改成功"})
            this.setUser(null);
            this.$router.push({path: "login"});
          }else {
            this.$notify({type: "danger", message: res.msg});
          }
        })
      }else{
        this.$notify({ type: 'danger', message: '请完成必填信息'})
      }
    },
    async sendMessage(){
      if(regExp.mPattern.test(this.mobile)){
        let {data: res} = await this.$api.common.sendMessage({
          mobile: this.mobile,
          salt: 'pass'
        });
        if(res.code === "0000" && res.result.status === "success"){
          this.$notify({ type: 'success', message: "验证码已发送，请注意查收" });
          this.sendLoading = true;
          this.timeId = setInterval(() => {
            this.total--
            if(this.total === 0){
              this.total = 60;
              clearInterval(this.timeId);
              this.sendLoading = false;
            }
          },1000)
        }else{
          this.$notify({ type: 'danger', message: res.msg });
        }
      }else{
        this.$notify({ type: 'warning', message: '手机号输入格式不正确' });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.retrieve {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 0;
  background: #f7f7f7;
}
.btn {
  width: 300px;
  margin: 5px 37.5px;
}
</style>

