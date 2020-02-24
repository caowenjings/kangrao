import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null,
    menuInfor:null,//导航菜单
    btnInfor:null,//按钮
    topMenu:null,
    defaultactive:false,
  },
  mutations: {
    set_token(state, token) {
      state.token = token
      localStorage.token = token
      sessionStorage.token = token
    },
    set_menuInfor(state, menuInfor){
            state.menuInfor = JSON.stringify(menuInfor);
            localStorage.menuInfor = menuInfor
          },
    set_btnInfor(state, btnInfor){
            state.btnInfor = btnInfor
            localStorage.btnInfor = btnInfor
                },
    del_token(state) {
      state.token = ''
      sessionStorage.removeItem('token')
      localStorage.removeItem('menuInfor')
      localStorage.removeItem('btnInfor')
      localStorage.removeItem('topMenu')
    },
  },
  actions: {

  }
})
