import * as types from './mutation-types'

const mutations = {
  [types.SET_PLAN](state, plan) {
    state.plan = plan
  },
  [types.SET_AGE](state, age) {
    state.age = age
  },
  [types.SET_BIRTHDAY](state, birthday) {
    state.birthday = birthday
  },
  [types.SET_SEX](state, sex) {
    state.sex = sex
  },
  [types.SET_AMOUNT](state, amount) {
    state.amount = amount
  },
  [types.SET_PREMIUM](state, premium) {
    state.premium = premium
  },
  [types.SET_APPNAME](state, appName) {
    state.appName = appName
  },
  [types.SET_APPIDNO](state, appIdNo) {
    state.appIdNo = appIdNo
  },
  [types.SET_APPADDRESS](state, appAddress) {
    state.appAddress = appAddress
  },
  [types.SET_APPZIPCODE](state, appZipcode) {
    state.appZipcode = appZipcode
  },
  [types.SET_APPPHONE](state, appPhone) {
    state.appPhone = appPhone
  },
  [types.SET_APPEMAIL](state, appEmail) {
    state.appEmail = appEmail
  },
  [types.SET_TBRELATION](state, tbRelation) {
    state.tbRelation = tbRelation
  },
  [types.SET_INSNAME](state, insName) {
    state.insName = insName
  },
  [types.SET_INSIDNO](state, insIdNo) {
    state.insIdNo = insIdNo
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
  [types.SET_RENEWBANKNAME](state, renewBankName) {
    state.renewBankName = renewBankName
  },
  [types.SET_RENEWBANKLOCATION](state, renewBankLocation) {
    state.renewBankLocation = renewBankLocation
  },
  [types.SET_RENEWBANKACCOUNT](state, renewBankAccount) {
    state.renewBankAccount = renewBankAccount
  },
  [types.SET_COVERPERIOD](state, coverPeriod) {
    state.coverPeriod = coverPeriod
  },
  [types.SET_PAYMENTPERIOD](state, paymentPeriod) {
    state.paymentPeriod = paymentPeriod
  }
}

export default mutations