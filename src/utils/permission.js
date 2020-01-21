import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/get-page-title'

router.beforeEach(async (to, from, next) => {
  async function getUserData () {
    if ( isStudent ||  isTeacher ) {
      if ( hasStudent &&  hasTeacher ) {
        next()
      } else if ( hasStudent === null &&  hasTeacher ) {
        await store.dispatch('global/getStudent')
        next()
      } else if ( hasTeacher === null &&   hasStudent ) {
        await store.dispatch('global/getTeacher')
        next()
      } else if (  hasTeacher === null  &&  hasTeacher === null ) {
        await store.dispatch('global/getStudent')
        await store.dispatch('global/getTeacher')
        next()
      }
    }else {
      next()
    }
  }

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  store.commit('updateTitle', to.meta.title)

  const type = to.path.split('/')[1]
  const isStudent = type === 'student'
  const isTeacher = type === 'teacher'
  const hasAppDefine = store.getters['global/appDefine']
  const hasStudent = store.getters['global/student']
  const hasTeacher = store.getters['global/teacher']

 

  if (hasAppDefine) {
   
    if ( isStudent ||  isTeacher ) {
      if ( hasStudent &&  hasTeacher ) {
        next()
      } else if ( hasStudent === null &&  hasTeacher ) {
        await store.dispatch('global/getStudent')
        next()
      } else if ( hasTeacher === null &&   hasStudent ) {
        await store.dispatch('global/getTeacher')
        next()
      } else if (  hasTeacher === null  &&  hasTeacher === null ) {
        await store.dispatch('global/getStudent')
        await store.dispatch('global/getTeacher')
        next()
      }
    }else {
      next()
    }
  } else {
    await store.dispatch('global/getAppDefine')

    if ( isStudent ||  isTeacher ) {
      if ( hasStudent &&  hasTeacher ) {
        next()
      } else if ( hasStudent === null &&  hasTeacher ) {
        await store.dispatch('global/getStudent')
        next()
      } else if ( hasTeacher === null &&   hasStudent ) {
        await store.dispatch('global/getTeacher')
        next()
      } else if (  hasTeacher === null  &&  hasTeacher === null ) {
        await store.dispatch('global/getStudent')
        await store.dispatch('global/getTeacher')
        next()
      }
    }else {
      next()
    }

  }
})
