// import defaultSettings from '@/settings'

// const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  authInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {
    userId:'',
    user:' ',
  },
  moniConfig:JSON.parse(sessionStorage.getItem('moniConfig')) || {
    zoneName:'',
    areaName:' ',
    dealerOptionsEnable:false,
    regionOptionsEnable:false,
    zoneOptionsEnable:false,
    areaList:[],
    zoneList:[],
    logoUrl:''
  },
  authClue:JSON.parse(sessionStorage.getItem('authClue')) || 0,
  intendedClue:JSON.parse(sessionStorage.getItem('intendedClue')) || 0, // 意向用户
  clueVolume:JSON.parse(sessionStorage.getItem('clueVolume')) || 0,  //声量线索


  
}

const mutations = {
  CHANGE_USER: (state, data) => {
    state.authInfo = data
  },
  CHANGE_MONI({ commit }, data) {
    state.moniConfig = data
  },
  CHANGE_MONI_CLUE({ commit }, data) {
    state.authClue = data
  },
  CHANGE_MONI_INTCLUE({ commit }, data) {
    state.intendedClue = data
  },
  CHANGE_MONI_CLUEVOLUME({ commit }, data) {
    state.clueVolume = data
  },
}

const actions = {
  CHANGE_USER({ commit }, data) {
    commit('CHANGE_USER', data)
  },
  CHANGE_MONI({ commit }, data) {
    commit('CHANGE_MONI', data)
  },
  CHANGE_MONI_CLUE({ commit }, data) {
    commit('CHANGE_MONI_CLUE', data)
  },
  CHANGE_MONI_INTCLUE({ commit }, data) {
    commit('CHANGE_MONI_INTCLUE', data)
  },
  CHANGE_MONI_CLUEVOLUME({ commit }, data) {
    commit('CHANGE_MONI_CLUEVOLUME', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
