import * as types from './mutation-types'

const mutations = {
  [types.SET_APPNAME](state, appName) {
    state.appName = appName
  },
  [types.SET_APPSEX](state, appSex) {
    state.appSex = appSex
  },
  [types.SET_AREA](state, area) {
    state.area = area
  },
  [types.SET_OCCUPATION](state, occupation) {
    state.occupation = occupation
  },
  [types.SET_APPAGE](state, appAge) {
    state.appAge = appAge
  },
  [types.SET_APPBIRTHDAY](state, appBirthday) {
    state.appBirthday = appBirthday
  },
  [types.SET_INSAGE](state, insAge) {
    state.insAge = insAge
  },
  [types.SET_INSBIRTHDAY](state, insBirthday) {
    state.insBirthday = insBirthday
  },
  [types.SET_COVERPERIOD](state, coverPeriod) {
    state.coverPeriod = coverPeriod
  },
  [types.SET_PAYMENTPERIOD](state, paymentPeriod) {
    state.paymentPeriod = paymentPeriod
  }
}

export default mutations