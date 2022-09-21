const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menuSerial: state => state.app.menuSerial,
  showMainMenu: state => state.app.showMainMenu,
  refreshTime: state => state.app.refreshTime,
  yesterdayTime:state => state.app.yesterdayTime,
}
export default getters
