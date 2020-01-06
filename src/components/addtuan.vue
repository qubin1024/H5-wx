<template>
  <div>
       <div class="wrap-tuan" v-for="(item, index) in activeList" :key='index'>
           <van-icon name="clear"  @click="deleteThis(index)"  style="position: absolute;right: 0.2rem;    top: 0.6rem;
    font-size: 0.6rem;
    z-index: 100;
    color: #fff;z-index: 100;" class="delete"/>
            <div class="people-wrap">
                <input v-model="item.num" type="number"/>人团
            </div>
            <div class="prize-wrap">
                拼团价：<input v-model="item.price" type="number"/>元/人</div>
        </div>
        <div class='add' @click="addActive"><i class="fa fa-plus" aria-hidden="true"></i> 添加(最多5档)</div>
  </div>
</template>

<script>
export default {
  name: 'add-tuan',
  data () {
    return {
    }
  },
  props: {
    activeList: {
      type: Array,
      default: function(){
          return []
      }
    }
  },
  methods: {
      blurq(e){
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
        document.documentElement.scrollTop = scrollTop;
      },
      addActive(type){
          if(this.activeList.length === 5)
            return;
          this.activeList.push({
              num: '',
              price: ''
          })
          this.$emit('update:activeList', this.activeList)
      },
      deleteThis(index){
          this.activeList.splice(index, 1)
          this.$emit('update:activeList', this.activeList)
      },
      upData (index) {
        this.activeList = this.swapItems(this.activeList, index, index - 1)
        this.$emit('update:activeList', this.activeList)
      },
      downData (index) {
          this.activeList = this.swapItems(this.activeList, index, index + 1)
          this.$emit('update:activeList', this.activeList)
      },
      swapItems: function(arr, index1, index2){
    　　  arr[index1] = arr.splice(index2,1,arr[index1])[0]
    　　  return arr
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add {
  height: 1rem;
  border: 1px dashed #2196f3;
  border-radius: 0.5rem;
  width: 100%;
  margin: 0.3rem auto;
  display: flex;
  justify-content: center;
  color: #2196f3;
  color: 0.3rem;
  align-items: center;
}
.tool-bar{
 position: absolute;
 height: 0.8rem;
 top: -0.8rem;
 width: 8.5rem;
 display: flex;
 justify-content: flex-start;
 align-items: center;
    color: #fff;
}
.tool-bar span{
    display: inline-block;
    width: 1.5rem;
    height: 0.6rem;
    font-size: 0.4rem;
    line-height: 0.6rem;
    text-align: center;
    border-radius: 5px;
    margin: 0 5px;
    background: #000;
}
.wrap-tuan{
    position: relative;
    margin: 0.2rem auto;
    height:2rem;
    border-radius: 5px;
    background: #ff2020;
    padding: 0.1px;
}
.people-wrap{
    width: 3rem;
    margin: 0.1rem;
    height: 1.8rem;
    background: #fff;
    line-height: 1.8rem;
    text-align: center;
    float: left;
}
.prize-wrap{
    width: 4rem;
    margin: 0.1rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    float: left;
}
input {
    border: 2px dashed #ccc;
    width: 1rem;
    height: 1rem;
    border-radius: 5px;
}
input:focus{
    outline: none;
}
</style>
