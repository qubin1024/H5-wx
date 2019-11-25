<template>
    <div class="register">
        <van-cell-group>
            <van-field v-model="companyName" required placeholder="请输入机构名称" />
            <van-field
                readonly
                clickable
                label="行业"
                required
                :value="companyIndustry"
                placeholder="请选择行业"
                @click="showPicker = true"
                />
        </van-cell-group>
        <van-cell-group>
            <van-field
                readonly
                clickable
                label="省份"
                required
                :value="companyProvince"
                placeholder="请选择省份"
                @click="pPicker = true"
                />
            <van-field
                readonly
                clickable
                label="城市"
                required
                :value="companyCity"
                placeholder="请选择城市"
                @click="cPicker = true"
                />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="username" placeholder="请输入姓名或者联系人"  required />
            <van-field v-model="mobile" placeholder="请输入手机号" :error-message="merror" required @input="mblur"/>
            <van-field
                v-model="sms"
                required
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
            >
                <van-button slot="button" @click="sendMessage" size="small" :disabled="sendLoading" :loading="sendLoading" :loading-text="total + 's重发'" loading-type="spinner" type="primary">发送验证码</van-button>
            </van-field>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="password" type="password" required placeholder="请设置新密码（6-20位数字和字母组合）" />
        </van-cell-group>
        <van-cell-group>
            <van-cell>
                <template slot="title">
                    <van-radio v-model="isAggre" name="1">阅读并同意 <span style="color: rgb(31, 106, 198);">《商家恋用户协议》</span></van-radio>
                </template>
            </van-cell>
        </van-cell-group>
        <van-button round type="info" class="btn" @click="register">提交注册，即可注册活动</van-button>
        <van-button round type="default" class="btn" @click="login">已有账号，马上登录</van-button>
        <van-popup v-model="showPicker" position="bottom">
        <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
        </van-popup>
        <van-popup v-model="pPicker" position="bottom">
        <van-picker
            show-toolbar
            :columns="province"
            @cancel="pPicker = false"
            @confirm="selectProvince"
        />
        </van-popup>
        <van-popup v-model="cPicker" position="bottom">
        <van-picker
            show-toolbar
            :columns="cityList"
            @cancel="cPicker = false"
            @confirm="selectCity"
        />
        </van-popup>
    </div>  
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import {regExp, area} from "@/util"
export default {
  name: "register",
  data() {
    return {
      value: "",
      showPicker: false,
      pPicker: false,
      cPicker: false,
      isAggre: false,
      merror: '',
      columns: [],
      industryList: [],
      provinceList: area.province_list,
      cityList: [],
      companyCity: '',
      companyProvince: '',
      companyIndustry: '',
      companyName: '',
      password: '',
      username: '',
      mobile: '',
      sms: '',
      total: 60,
      timeId: null,
      sendLoading: false,
    };
  },
  mounted(){
    this.queryByType()
  },
  computed: {
      ...mapGetters('common', {
        userInfo: 'userInfo',
        code: 'code'
      }),
      province(){
        let array = [];
        for(let key in this.provinceList){
          array.push(this.provinceList[key])
        }
        return array;
      }
  },
  methods: {
    register(){
      if(!this.isAggre){
        return this.$notify({ type: 'danger', message: '请同意用户协议' })
      }
      if(this.code == null){
        return this.$notify({ type: 'danger', message: 'code缺失' })
      }

      if(!!this.companyName && !!this.companyCity && !!this.companyIndustry && !!this.companyProvince && !!this.username && !!this.mobile && !!this.password && !!this.sms ){
        let industryCode;
        this.industryList.map(e => {
          if(e.name == this.companyIndustry){
            industryCode = e.code
          }
        });
        this.$api.common.signIn({
          "captcha": this.sms,
          "code": this.code,
          "companyCity": this.companyCity,
          "companyIndustry": industryCode,
          "companyName": this.companyName,
          "companyProvince": this.companyProvince,
          "mobile": this.mobile,
          "password": this.password,
          "username": this.username
        }).then(({data: res}) => {
          if(res.code === "0000"){
            this.$notify({type: "success", message: "注册成功"})
            this.$router.push({path: "peopleHome"})
          }else {
            this.$notify({type: "danger", message: res.msg})
          }
        })
      }else{
        this.$notify({ type: 'danger', message: '请完成必填信息'})
      }
    },
    login(){
      this.$router.push({path: 'login'})
    },
    mblur(){
      if(RegExp.mPattern.test(this.mobile)){
        this.merror= "";
      }else{
        this.merror = "手机号格式错误";
      }
    },
    onConfirm(value) {
      this.companyIndustry = value;
      this.showPicker = false;
    },
    selectCity(value){
      this.companyCity = value;
      this.cPicker = false;
    },
    selectProvince(value) {
      this.companyProvince = value;
      let id = -1;
      for(let key in this.provinceList){
          if(this.provinceList[key] == value){
            id = key
          }
      }
      this.pPicker = false;
      this.companyCity = '';
      let citys = [];
      for(let key in area.city_list){
          if(key.toString().slice(0, 2) == id.toString().slice(0, 2)){
            citys.push(area.city_list[key]) 
          }
      }
      this.cityList = citys;
    },
    async queryByType(){
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      });
      let {data: res} = await this.$api.common.queryByType({
        "type": "industry"
      });
      this.$toast.clear();
      this.industryList = res.result.data;
      if(res.code === "0000"){
        let columns = []
        res.result.data.map(e => {
          columns.push(e.name)
        })
        this.columns = columns;
      }
    },
    async sendMessage(){
      if(regExp.mPattern.test(this.mobile)){
        let {data: res} = await this.$api.common.sendMessage({
          mobile: this.mobile,
          salt: 'login'
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
/deep/ .van-cell-group {
  margin: 20px 0;
}

.btn {
  width: 300px;
  margin: 5px 37.5px;
}

.register {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f2fbff;
}
</style>
