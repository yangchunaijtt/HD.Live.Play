<template>
  <div class="timetable">
    <div class="datetime">
      <Calendar type="week"   :currdate='selectedDay'  @getDay="handleDayClick" @rangeChange="handlerRangeChange" :events="calendarEvents"  @twinkling='twinkling' @divAuto='divAuto'></Calendar>
    </div>
    <classTmp :classListData="classListData"  :dayTime = "selectedDay"  :classHeight="classHeight"></classTmp>
  </div>
</template>

<script>
import classTmp from '@/components/biz/class/TcList/index.vue'
import Calendar from '@/components/public/Calendar'
import { mapGetters, mapMutations } from 'vuex'

export default {

  components: {
    classTmp,
    Calendar
  },
  data () {
    return {
      classListData: [],
      calendarEvents: [],
      teacherCaller: {},
      selectedDay: '今天',
      IDs: this.$store.getters['global/teacherIDs'],
      timer: null,
      documentHeight: 0
    }
  },
  computed: {
    ...mapGetters([
      'layout/topHeight',
      'global/teacher'
    ]),
    classHeight () {
      this.documentHeight = document.documentElement.offsetHeight
      const topHeight = this.$store.getters['layout/topHeight']
      const calendarHeight = this.$store.getters['layout/calendarHeight']
      return (this.documentHeight - calendarHeight - topHeight) + 'px'
    }
  },
  created () {
    this.teacherCaller = new DE.Sch.SchTeacher.Caller()
    let dt = DETBrowser.getUrlParamByName('day', '')
    if (dt) {
      this.selectedDay = dt
    }
  },
  mounted () {
    let dtdef = new Date().Format('yyyy-MM-dd')
    let dt = DETBrowser.getUrlParamByName('day', dtdef)
    this.fetchCourseList(dt)
    let that = this
    window.onresize = () => {
      return (() => {
        that.documentHeight = document.body.clientHeight
      })()
    }
  },
  methods: {
    handleDayClick: function (day) {
      if (day.today) {
        this.selectedDay = '今天'
      } else {
        this.selectedDay = new Date(day.date).Format('MM月dd日')
      }

      this.fetchCourseList(new Date(day.date).Format('yyyy-MM-dd'))
    },
    handlerRangeChange: function (range) {
      const begin = range.begin.Format('yyyy-MM-dd')
      const end = range.end.Format('yyyy-MM-dd')

      this.teacherCaller.getLessonsByRange(begin, end, this.IDs).then(res => {
        this.calendarEvents = res
      })
    },
    fetchCourseList (date) {
      // 设置url时间的公共方法
      let params = DETBrowser.getUrlParam()
      params['day'] = date
      var arr = new Array()
      for (var key in params) {
        arr.push(key + '=' + params[key])
      }
      var sparam = arr.join('&')
      window.location.hash = window.location.hash.split('?')[0] + '?' + sparam

      this.teacherCaller.getLessonsByDay(
        date, this.IDs
      ).then(res => {
        this.classListData = res
        // console.log('teacher',res)
        if (this.timer === null && this.selectedDay === '今天') {
          this.currentTime()
        }
      })
    },
    twinkling () {
      document.querySelector('.router').style.overflow = 'hidden'
      document.querySelector('.class').style.overflow = 'hidden'
    },
    divAuto () {
      document.querySelector('.router').style.overflow = 'auto'
      document.querySelector('.class').style.overflow = 'auto'
    },
    // 定时器
    currentTime () {
      const that = this
      this.classListData.forEach((item, value) => {
        // 未开始
        if (item.iStatus === 0) {
          let isTimeOut = new Date().Force(item.dtBegin).getTime() - new Date().getTime()
          let isTimeEnd = new Date().Force(item.dtEnd).getTime() - new Date().getTime()
          if (isTimeOut > 0) {
            that.timer = setTimeout(() => {
              that.fetchCourseList(new Date().Format('yyyy-MM-dd'))
            }, isTimeOut + 60000)
          }
          that.timer = setTimeout(() => {
            that.fetchCourseList(new Date().Format('yyyy-MM-dd'))
          }, isTimeEnd + 60000)
        } else if (item.iStatus === 1) {
          // 上课中
          let isTimeTo = new Date().Force(item.dtEnd).getTime() - new Date().getTime()

          if (isTimeTo > 0) {
            that.timer = setTimeout(() => {
              that.fetchCourseList(new Date().Format('yyyy-MM-dd'))
            }, isTimeTo + 60000)
          }
        }
      })
    }
  },
  beforeDestroy: function () {
    if (this.timer) {
      window.clearTimeout(this.timer)
      console.log('teacher销毁定时器', this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
  .timetable {
    box-sizing: border-box;
    padding-top: 50px;
    z-index: 100;
    overflow-x:hidden;
    overflow-y:auto;
    .datetime {
    }
  }
</style>
