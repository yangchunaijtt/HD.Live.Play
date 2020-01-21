import Vue from 'vue'
import Vuex from 'vuex'
import createLoadingPlugin from 'utils/vuex-loading'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
  plugins: [createLoadingPlugin()],
  state: {
    direction: 'forward', // 页面切换方向
    title: '首页', // 页面title
    msgDetailsMask:false,
    msgItemData:{},
    appCode:'',
    appDefine:null,
  },
  mutations: {
    // 更新页面切换方向
    updateDirection (state, direction) {
      state.direction = direction
    },
    // 更新页面title
    updateTitle (state, title) {
      state.title = title
    },
    // 隐藏消息页的显示
    HIDDEN_MSG_DETAILS(state){
      // console.log("hidden");
        state.msgDetailsMask = false; 
    },

    // 显示消息页
    SHOW_MSG_DETAILS(state,newsvalue){
        // console.log("show");
        state.msgItemData = newsvalue;
        state.msgDetailsMask  = true ;
    },
    // 登录的操作方法
    SetAppDefine (state,value) {
     
      if ( state.appCode === null  || state.appCode === '') {
        state.appCode = value 
        let appCaller = new DE.Sys.SysAppDefine.Caller()
        
        return new Promise((resolve, reject) => { 
          appCaller.getAppDefine(value).then( (res) => {
            
            if ( !res ) {
              reject('获取appdefin报错');
            }
            // console.log("vuex数据",res);
            state.appDefine = res;
            
            resolve(res)

          }).catch( (err) => {
            reject(err);
          })  
        })
      }
   
    },
  },
  actions: {},
  modules
})
