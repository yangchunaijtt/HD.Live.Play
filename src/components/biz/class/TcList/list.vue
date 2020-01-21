<template>
    <div class="timelist" >
        <div class="center" v-for="(item,index) in timeListData" :key="index">
            <div class="listcenter">
                <div class="hd" >
                    <TDisplay class="state" :class="stateColor(item.iStatus)" code='School.Lesson.Status' :value='item.iStatus'></TDisplay>
                    <h4 class="name">{{item.Ext.Class.sName}}</h4>
                </div>
                <div class="accact">
                    <div class="left">
                        <div class="time">
                        <div class="lessoninfo clearfix" v-if="item.sName">
                            <span class="display">
                                授课内容：
                            </span>
                            <span class="">
                                {{item.sName}}
                            </span>
                        </div>                          
                        <div class="looktime">
                            <DisplayDate :date="item.dtBegin" FMT="HH:mm"></DisplayDate>
                            至
                            <DisplayDate :date="item.dtEnd" FMT="HH:mm"></DisplayDate>
                        </div>
                        <span class="lookcalss dc">第{{item.iIndex}}课</span>
                        <i class="border"></i>
                        <span class="partClass">共{{item.Ext.Class.iLessonCount}}课</span>
                        </div>
                    </div>
                    <div class="right">
                        <TButton class="placyback" @callJoinLive="callJoinLive" :state='item.iStatus' :item= 'item' ></TButton>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { Progress } from 'vant'
import DisplayDate from '@/components/public/Date/display'
import ImgDisplay from '@/components/public/Image/BgImage/display.vue'
import TDisplay  from "./display.vue"
import TButton  from "@/components/biz/StateButton/TButton"

export default {
  components: {
    [Progress.name]: Progress,
    DisplayDate,
    ImgDisplay,
    TDisplay,
    TButton
  },
  props: {
    timeListData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
		liveCaller:{}
    }
  },
  computed: {
    stateColor () {
      return (value) => {
        let colorClass = ''
        switch (value) {
          case 9 :
            colorClass = 'finished'
            break
          case 1 :
            colorClass = 'underway'
            break
          case 0 :
            colorClass = 'pending'
            break
          default :
            colorClass = ''
        }
        return colorClass
      }
    },
    lookVideo () {
      let videoVlaue = ''
      return (state) => {
        if ( state === 9 || state === 0  ) {
          videoVlaue = 'nolook'
        }else {
          videoVlaue = 'underway'
        }
        return videoVlaue
      }
    }
  },
  methods: {

    // 加入直播
    callJoinLive (item) {
     
         this.liveCaller.callTeacherJoin(item.sID, item.Ext.userID)
      
    }

  },
  created () {
    // 直播处理对象
    this.liveCaller = new DE.Sch.SchLessonLiveAPI.Caller()
  }
}
</script>

<style lang="scss" scoped>
    .timelist {
        .center {
            box-sizing:border-box;
            padding-top:30px;
            padding-bottom:10px;
            border-bottom:1px solid #f4f4f4;
            &:last-child{
              border-bottom:none;
            }
            .listcenter
                .hd {
                    .state {
                        display:inline-block;
                        padding:0px 5px;
                        height:20px;
                        vertical-align:text-top;
                        background:rgba(204,204,204,1);
                        border-radius:2px;
                        text-align:center;
                        line-height:20px ;
                        font-size:12px;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        border-radius:2px;
                         &.finished {  // 已下课 9
                            background:rgba(255,84,71,1);
                        }
                        &.underway {   // 进行中  1
                             background:rgba(87,191,119,1);
                        }
                        &.pending {   // 未开始 0
                            background:rgba(204,204,204,1);
                        }
                    }
                    .name {
                        display:inline-block;
                        margin-left:10px ;
                        line-height:20px;
                        font-size:16px;
                        min-width:200px ;
                        vertical-align:text-top;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                    }
                }
                .accact {
                    display:flex;
                    box-sizing:border-box;
                    margin-top:10px;
                }
                .left {
                    flex:1 ;
                    line-height:30px;
                    .lessoninfo{
                        font-size:14px;
                        line-height:30px;
                        .display{
                          color:rgba(153,153,153,1);                          
                        }
                    }                    
                    .time {
                        // padding-bottom:10px ;
                        .looktime {
                            display: inline-block;
                            font-size:14px ;
                            font-weight:400;
                            color:rgba(51,51,51,1);

                        }
                        .lookcalss {
                            margin-left:15px ;
                            font-size:14px;
                            font-weight:400;

                        }
                        .border {
                            display:inline-block;
                            border-right:1px solid #EDEDEE;
                            height:8px ;
                            margin:5px ;
                            vertical-align: middle;
                        }
                        .partClass {
                            font-size:12px;
                            font-weight:400;
                            color:rgba(153,153,153,1);

                        }
                    }
                }
                .right  {
                    box-sizing:border-box;
                    padding-left:57px;
                    min-width:140px ;
                    .placyback {
                        box-sizing:border-box;
                        width:83px;
                        height:30px;
                        padding:0px 10px ;
                        border-radius:4px;
                        line-height:30px;
                        font-size:14px ;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        text-align: center;
                        cursor: pointer;
                      }

                }
        }
        &:first-child {
            padding-top:0px;
        }
    }

</style>
