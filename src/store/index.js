import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    UserData: {
      Uid: '15751512041',
      UserName: '',
      DepartMent: '',
      isSuper: false,
      permission: 'user'
    },
    isLogin: false,
    auto: true,
    AllMyActiveList: [],
    publisherList: []
  },
  mutations: {
    // change:state => state.UserData.isSuper=!state.UserData.isSuper
  }
})
