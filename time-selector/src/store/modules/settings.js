import defaultSettings from '@/settings'
import Cookies from 'js-cookie'

const { fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme:localStorage.getItem('themes') ? !!+localStorage.getItem('themes') : 'dark',
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
}

const mutations = {
  CHANGE_SETTING: (state, object) => {
    for(let key in object){
      state[key] = object[key]
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
