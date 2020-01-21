const SetAppDefine = 'SetAppDefine' // 存储全局配置信息
const SetPhone = 'SetPhone'
const SetStudent = 'SetStudent'
const SetStudentNull = 'SetStudentNull'
const SetStudentIDs = 'SetStudentIDs'
const SetTeacher = 'SetTeacher'
const SetTeacherIDs = 'SetTeacherIDs'
const SetTeacherNull = 'SetTeacherNull'

export default {
  namespaced: true,
  state: {
    appDefine: null,
    student: null,
    studentIDs: [],
    teacher: null,
    teacherIDs: [],
    phone: '',
  },
  mutations: {
    [SetAppDefine] (state, record = {}) {
      state.appDefine = record
    },
    [SetPhone] (state, record = '') {
      state.phone = record
    },
    [SetStudent] (state, record = {}) {
      state.student = record
    },
    [SetStudentNull] (state, record = null ){
      state.student = record
    },
    [SetStudentIDs] (state, record = []) {
      state.studentIDs = record
    },
    [SetTeacher] (state, record = {}) {
      state.teacher = record
    },
    [SetTeacherNull] (state, record = null ){
      state.teacher = record
    },
    [SetTeacherIDs] (state, record = []) {
      state.teacherIDs = record
    },
  },
  actions: {
    getAppDefine ({ commit, state }) {
      return new Promise((resolve, reject) => {
        resolve() 
        
      })
    },
    getStudent ({ commit, state }) {
      const studentCaller = new DE.Sch.SchStudent.Caller()
      return new Promise((resolve, reject) => {
        studentCaller.getStudentsByPhone(state.phone).then(response => {
          if (!response) {
            commit(SetStudent, response)
            commit(SetStudentIDs, response.map(item => item.sID))
            reject('获取学生信息失败')
          }
          commit(SetStudent, response)
          commit(SetStudentIDs, response.map(item => item.sID))
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTeacher ({ commit, state }) {
      const teacherCaller = new DE.Sch.SchTeacher.Caller()
      return new Promise((resolve, reject) => {
        teacherCaller.getTeachersByPhone(state.phone).then(response => {
          if (!response) {
            // eslint-disable-next-line
            reject('获取教师信息失败')
          }
          commit(SetTeacher, response)
          commit(SetTeacherIDs, response.map(item => item.sID))
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    appDefine (state) {
      return state.appDefine
    },
    phone (state) {
      return state.phone
    },
    student (state) {
      return state.student
    },
    studentIDs (state) {
      return state.studentIDs
    },
    teacher (state) {
      return state.teacher
    },
    teacherIDs (state) {
      return state.teacherIDs
    },
  }
}
