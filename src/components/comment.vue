<template>
    <div class="comment">
        <ul v-if="!isedit">
            <li v-for="(item, index) in comments" :key="'commond-' + index" >
                <div class="li">
                    <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
                    <div class="head">
                        <span class="name">{{item.username}}:</span>
                        <span class="time">【{{item.createTime}}】</span>
                    </div>
                    <div class="commond" style="border-bottom: 1px solid #eaeaea;padding-bottom: 20px;">{{item.comment}}</div>
                    <div class="feedback" v-if="item.feedbackId.trim()">
                        <span>回复：</span>
                        <div class="commond" style="padding: 11px 0.5rem;">{{item.feedbackComment}}</div>
                        <div class="head">
                            <span class="time">【{{item.feedbackTime}}】</span>
                            <span class="delete" v-if="ishide" @click="remove(item.feedbackId)">删除</span>
                        </div>
                    </div>
                </div>
                <div class="foot" v-if='ishide'>
                    <span @click="remove(item.id)"><van-icon name="cross" />删除</span>  
                    <span @click="feedback(item)"><van-icon name="chat" />{{!!item.feedbackId ? "已回复": "未回复" }}</span> 
                </div>  
            </li>
        </ul>
        <div v-else style="padding: 1rem;">
            <VTextarea v-model="commond"></VTextarea>
            <van-button type="info" style="width: 100%; margin: 20px 0;" :disabled="!commond" @click="commit">写好了，提交</van-button>
        </div>
        <van-button v-if="ispro && !isedit" type="info" @click="profeedback" style="width: 8rem;margin: 1rem;">去评论</van-button>
    </div>
</template>

<script>
import VTextarea from './textarea.vue';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: "comment",
  data() {
    return {
        isedit: false,
        commond: '',
        params: {},
        comments: []
    };
  },
  components: {
      VTextarea
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'userInfo',
      code: 'code'
    })
  },
  props: ['id', 'ishide', 'ispro', 'userId'],
  mounted(){
      this.queryCommentByActivityId(this.id);
  },
  methods: {
    async queryCommentByActivityId(activityId){
        let {data: res} = await this.$api.common.queryCommentByActivityId({
            activityId: activityId
        })
        if(res.code == '0000'){
            this.comments = res.result.data
        }
    },
    async remove(id){
        let {data: res} = await this.$api.common.deleteCommentById({
            id: id
        })
        if(res.code == '0000'){
            this.$notify({type: "success", message: "删除成功！"})
            this.queryCommentByActivityId(this.id);
        }
    },
    feedback(item){
        if(!!item.feedbackId){
            return;
        }
        this.isedit = true;
        this.commond = '';
        this.params = {
            userId: this.userInfo.userId,
            comment: '',
            toUser: item.userId,
            activityId: item.activityId
        }
    },
    profeedback(){
        this.isedit = true;
        this.commond = '';
    },
    async commit(){
        if(!this.ispro){
            this.params.comment = commond;
            let {data: res} = await this.$api.common.saveComment(this.params)
            if(res.code == '0000'){
                this.isedit = false;
                this.$notify({type: "success", message: "评论成功"})
                this.queryCommentByActivityId(this.id);
            }
        }else{
            let {data: res} = await this.$api.common.saveComment({
                userId: this.userId,
                comment: this.commond,
                toUser: '',
                activityId: this.id
            })
            if(res.code == '0000'){
                this.isedit = false;
                this.$notify({type: "success", message: "评论成功"})
                this.queryCommentByActivityId(this.id);
            }
        }
        
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.comment{
    height: 100%;
    overflow: auto;
}
.head{
    font-size: 18px;
    display: flex;
    justify-content: flex-start;
    height: 1rem;
    align-items: center;
    padding: 0 0.5rem;
} 
.time{
    font-size: 12px;
    color: #929292;
}
.name{
    font-size: 12px;
    color: #929292;
}
.commond{
    padding: 0.1rem 0.5rem;
    font-size: 14px;
    color: #464646;
}
.feedcommond{
    margin: 0 0.5rem;
    font-size: 16px;
    padding: 5px;
    border-radius: 3px;
}
.li{
    padding: 0 0 0 1.5rem;
    border-bottom: 1px solid #e7e7e7;
    position: relative;
}
.li /deep/ .van-icon{
    position: absolute;
    left: 20px;
    top: 15px;
    font-size: 40px;
    border-radius: 50%;
}
.feedback{
    padding-left: 1.5rem;
    position: relative;
}
.feedback > span{
    position: absolute;
    left: 20px;
    top: 10px;
    font-size: 14px;
    font-weight: bold;
}
.delete{
    font-size: 14px;
    color: red;
}
.foot{
  height: 40px;
  border-bottom: 1px solid #e7e7e7;
  margin: 0 0 10px 0;
  font-size: 14px;
    color: #2b568e;
    display: flex;
    align-items: center;
    justify-content: space-around;
  > span{
    display: flex;
    align-items: center;
  }
}
</style>
