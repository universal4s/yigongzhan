import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    UserData: {
      Uid: '162210702234',
      role: null,
    },
    auto: false,
    AllMyActiveList: [],
    publisherList: []
  },
  mutations: {
    // change:state => state.UserData.isSuper=!state.UserData.isSuper
  }
})
