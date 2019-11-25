<template>
    <div class="login">
        <img src="@/assets/img/logo.png"/>
        <van-cell-group>
            <van-field v-model="username" placeholder="请输入注册手机号" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="password"  type="password" placeholder="请输入登录密码" />
        </van-cell-group>
        <van-button class="btn" round type="info" :loading="loading" @click="login">登录</van-button>
        <div class="link-phone">联系客服</div>
        <div class="flex-wrap">
            <div class="link-phone" @click="linkRegister">注册账号</div>
            <div class="line"></div>
            <div class="link-phone">联系电话</div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "login",
  data() {
    return {
      loading: false,
      password: "",
      username: ""
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'userInfo'
    })
  },
  methods: {
    ...mapMutations('common', {
      setUser: "setUser"
    }),
    linkRegister(){
      this.$router.push({path: 'register'})
    },
    async login(){
      if(!!this.username && !!this.password){
        this.loading = true;
        let {data: res} = await this.$api.common.login({
          password: this.password,
          username: this.username
        })
        this.loading = false;
        if(res.code === "0000"){
          this.$notify({type: "success", message: "登录成功"})
          this.setUser(res.result.user);
          this.$router.push({path: 'peopleHome'});

        }else{
          this.$notify({type: "danger", message: res.msg})
        }
      }else{
        this.$notify({type: "danger", message: "请填写正确的用户名密码"})
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f2fbff;
  img {
    width: 150px;
    height: 150px;
    margin: 37.5px 112.5px 0 112.5px;
  }
  .link-phone {
    color: #1989fa;
    width: 375px;
    font-size: 16px;
    text-align: center;
    margin: 16px 0px;
  }
  .van-button--info.btn {
    width: 200px;
    margin: 0 87.5px;
  }
  .flex-wrap {
    display: flex;
    justify-content: space-around;
    margin-top: 150px;
  }
  .line {
    border: 1px solid #eaeaea;
  }
  /deep/ .van-button--info {
    margin: 20px;
    box-shadow: -2px 5px 6px 2px #b0d4f8;
  }
  /deep/ [class*=van-hairline]::after {
    border: 0px solid transparent;
  }
  /deep/ .van-cell-group {
    margin: 10px 50px;
    background: inherit;
    /deep/ .van-cell {
      background: #edf4f7;
      border-radius: 1rem;
      border: 2px solid #fff;
      color: #000;
      input::-webkit-input-placeholder {
        color: #c7c7c7;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #c7c7c7;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #c7c7c7;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #c7c7c7;
      }
    }
  }
}
</style>

