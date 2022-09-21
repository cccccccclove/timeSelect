import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  menuSerial: Cookies.get('menuSerial') ? !!+Cookies.get('menuSerial') : 0,
  showMainMenu: false,
  refreshTime: '',
  refreshStatus:0,
  yesterdayTime:''
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false

    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_MENUSERIAL: (state, menuSerial) => {
    Cookies.set('menuSerial', menuSerial)
    state.menuSerial = menuSerial
  },
  TOGGLE_MAINMENU: (state, isShow) => {
    state.showMainMenu = isShow
  },
  GET_REFRESHTIME: (state, isShow) => {
    state.refreshTime = isShow
  },
  GET_REFRESHSTATUS: (state, isShow) => {
    state.refreshStatus = isShow
  },
  GET_YESHTIME: (state, isShow) => {
    state.yesterdayTime = isShow
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleMenuSerial({ commit }, menuSerial) {
    commit('TOGGLE_MENUSERIAL', menuSerial)
  },
  toggleMainMenu({ commit }, isShow) {
    commit('TOGGLE_MAINMENU', isShow)
  },
  updateRefreshTime({ commit }, time) {
    commit('GET_REFRESHTIME', time)
  },
  updateRefreshStatus({ commit }, time) {
    commit('GET_REFRESHSTATUS', time)
  },
  updateYesterdayTime({ commit }, time) {
    commit('GET_YESHTIME', time)
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
