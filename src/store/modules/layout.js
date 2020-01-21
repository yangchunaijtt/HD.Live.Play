const SetTopHeight = 'SetTopHeight' // 存储底部footer的高度
const SetCalendarHeight = 'SetCalendarHeight' // 存储日历的高度
const SetClassHeight = 'SetClassHeight'     

export default {
  namespaced: true,
  state: {
    topHeight: 50,
    calendarHeight: 300,
    viewHeight:800,
    classHeight:450
  },
  mutations: {
    [SetTopHeight] (state, data) {
      state.topHeight = data
    },
    [SetCalendarHeight] (state, data) {
      state.calendarHeight = data
    },
    [SetClassHeight] (state, data) {
      state.viewHeight = data
    },
  },
  getters: {
    topHeight (state) {
      return state.topHeight
    },
    calendarHeight (state) {
      return state.calendarHeight
    },
    classHeight ( state ) {
      return state.classHeight
    }
  }
}
