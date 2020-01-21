<template>
  <div class="class" :style="{'height':classHeight}">
    <div class="center">
      <div class="top">
        <h3 class="timetext">{{nowTimeDate}}</h3>
        <span class="suntable ">{{classListData.length>0 ? classListData.length+'节课' :'暂无课程' }}</span>
      </div>
      <classList :timeListData="classListData" v-if="classListData.length > 0"  @toVideData='toVideData'  @videoDomChange='videoDomChange'  ></classList>
      <p v-else class="noData">所选日期暂无课程</p>
    </div>
  </div>
</template>

<script>
import classList from "./list"


export default {
  
  components: {
    classList,
  },
  props: {
    classListData: {
      type: Array,
      default: () => []
    },
    dayTime:{
      type:String,
      default: ''
    },
    classHeight: {
      type: String,
      default: ''
    }
  },
  computed:{
    nowTimeDate(){
      if ( this.dayTime.split(new Date().getFullYear() + '-').length > 1) {
        return  (((this.dayTime.split(new Date().getFullYear() + '-'))[1]).replace(/-/g,'月'))+'日'
      }else {
        return this.dayTime
      }
    },
    newListData(){
      let arr = []
      this.classListData.forEach( (item,value) => {
        if ( item.iStatus === 9 ) {
          arr.push(item)
        }
      })
      return arr 
    }
  },
  methods:{
    toVideData(vid,siteid){
      this.$emit('toVideData',vid,siteid)
    },
    videoDomChange(value){
      this.$emit('videoDomChange',value)
    },
  },
}
</script>

<style lang="scss" scoped>
  .class {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 30px 30px 22px 20px;
    background-color:#fff;
    .center {

      padding-top: 20px;
      &:first-child {
        padding-top: 0px;
      }
      .noData{
        font-size: 14px;
        color: #CCCCCC;
        text-align: center;
        @include center();
      }
      .top {
        .timetext {
          display: inline-block;
          padding-right: 10px;
          font-size: 22px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
        }

        .suntable {
          font-size: 14px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 18px;
        }
      }
    }
  }
</style>