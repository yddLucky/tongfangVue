import * as types from './mutation-types'

const mutations = {
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
  }
}

export default mutations