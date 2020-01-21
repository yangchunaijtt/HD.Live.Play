<template>
  <div class="calendar" ref="calendar" :class="collapsed ? ' collapsed' : ''">
    <div class="toolbar">
      <div class="tl" @click="prev">
        <IconSvg icon="de-arrow-a-left" @bindClick="(e) => prev(e)"></IconSvg>
      </div>
      <div class="tc">{{Calendar.month.Format('yyyy年MM月') + (curType === 'week' ? `第${Calendar.monthWeek}周` : '')}}
      </div>
      <div class="tr" @click="next">
        <IconSvg icon="de-arrow-a-right" @bindClick="(e) => next(e)"></IconSvg>
      </div>
    </div>
    <table class="days">
      <tr class="thead">
        <td>一</td>
        <td>二</td>
        <td>三</td>
        <td>四</td>
        <td>五</td>
        <td class="weekend">六</td>
        <td class="weekend">日</td>
      </tr>
      <tbody class="tbody">
      <tr v-for="(week, index) in Calendar.weeks" :key="index"
          :class="week.days.filter(day => day.sel).length > 0 ? 'curWeek' : ''">
        <td v-for="(day, i) in week.days" :key="i"
            :class="(day.inRange ? ' ' : ' opacity') + (day.sel ? ' active' : ' ')"
            @click="() => handleDayClick(day)">
          <span class="today" v-if="day.today" @click="(e) => handleDayClick(day, e)">今</span>
          <span @click="(e) => handleDayClick(day, e)" v-else>{{day.date.Format('d')}}</span>
          <div class="events" @click="(e) => handleDayClick(day, e)">
            <em v-for="(event, index) in day.events" :key="index">
              <span v-if="index < 3"></span>
              <IconSvg icon="de-op-math-add" v-if="index === 3"></IconSvg>
            </em>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="tc collapsedBtn">
      <span @click="collapsedChange" class='cursor'>
        <IconSvg :icon="!collapsed ? 'de-arrow-a-down' : 'de-arrow-a-up'" @bindClick="collapsedChange" />
      </span>
    </div>
  </div>
</template>
<script>
import Calendar from './calendar'
import { mapMutations } from 'vuex'

export default {
  name: 'Calendar',
  components: {},
  props: {
    type: {
      type: String,
      default: 'month'
    },
    currdate :{
      type : String,
      default:''
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      collapsed: false, // 日历折叠状态
      Calendar: new Calendar(),
      curType: this.type,
      selectedDay: null
    }
  },
  created () {
    console.log('time',this.currdate)
    if ( new Date().Force(this.currdate) === new Date() ) {
      this.selectedDay = new Date()
    }else if ( this.currdate === '' || this.currdate ==='今天' ) {
      this.selectedDay = new Date()
    }else {
      this.selectedDay  = new Date().Force( this.currdate ) 
    }
    this.Calendar.rangeCallBack = (range) => {
      this.$emit('rangeChange', range)
    }
    this.Calendar.dayCallBack = (date) =>{
      this.$emit('getDay', {
        date : date
      })
    }
  },
  updated () {
    
    setTimeout(() => {
      let curHeight = this.$refs.calendar.offsetHeight
      this['layout/SetCalendarHeight'](curHeight)
      this.divAuto()
    }, 400)
  },
  mounted () {

    this.Calendar.setRange(this.selectedDay.Format('yyyy-MM-dd'), true, this.curType)
  },
  methods: {
    ...mapMutations([
      'layout/SetCalendarHeight'
    ]),
    prev: function(e) {
      if(e){
        e.stopPropagation()
      }

      this.twinkl()
      this.curType === 'week' ? this.Calendar.prevWeek() : this.Calendar.prevMonth()
    },
    next: function(e) {
      if(e){
        e.stopPropagation()
      } 
      this.twinkl()
      this.curType === 'week' ? this.Calendar.nextWeek() : this.Calendar.nextMonth()
    },
    collapsedChange: function (e) {
      if(e){
        e.stopPropagation()
      }
      this.twinkl()
      this.collapsed = !this.collapsed
      this.curType = this.curType === 'month' ? 'week' : 'month'
      this.Calendar.setRange(this.selectedDay.Format('yyyy-MM-dd'), false, this.curType)
      this.Calendar.setEvents(this.events)
    },
    handleDayClick: function (day, e) {
      if(e){
         e.stopPropagation()
      }
      this.Calendar.setDate(day.date)
      this.selectedDay = day.date
      this.Calendar.setEvents(this.events)
      this.$emit('getDay', day);
    },
    divAuto(){
      this.$emit('divAuto')
    },
    twinkl(){
      this.$emit('twinkling')
    },
  },
  watch: {
    events (newV) {
      this.Calendar.setEvents(newV)
    }
  }
}
</script>
<style lang="scss" scoped>
  $duration: .4s;
  $tdHeight: 36px;
  .calendar {
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.07);
    box-sizing: border-box;

    .collapsedBtn {
      padding: 10px 0;
      .cursor{
        cursor: pointer;
      }
      & > span {
        display: inline-block;
      }
      svg {
        font-size: 16px;
        color: #ccc;
      }
    }
  }

  table {
    width: 98%;
    margin: 0 1%;
    td {
      width: calc(100% / 7);
      height: $tdHeight;
      @extend .tc;
      cursor: pointer;

      &.opacity {
        @include opacity(.5)
      }

      .today,
      &.weekend {
        color: $color;
      }

      &.active {
        background-color: $color;
        color: #fff;
        border-radius: 4px;
        box-shadow: 0 8px 8px 0 rgba(255, 102, 1, 0.2);

        .today {
          color: #fff;
        }

        .events {
          svg {
            color: #fff;
          }

          span {
            background-color: #fff;
          }
        }
      }

      .events {
        height: 6px;
        line-height: 6px;
        vertical-align: middle;

        & > * {
          font-size: 0;
        }

        svg {
          font-size: 10px;
          color: $color;
          vertical-align: top;
        }

        span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: $color;
          display: inline-block;
          margin: 0 1px;
        }
      }
    }

    .thead {
      font-size: 12px;
      color: #999;
    }

    .tbody {
      font-size: 14px;
      color: #333;
    }
  }

  .toolbar {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 17px;
    color: #333333;
    transition: height $duration;
    justify-content: space-between;
    .tl{
      cursor: pointer;
    }
    .tr{
      cursor: pointer;
    }
    svg {
      color: #999;
      padding: 0 20px;
    }
  }
</style>
