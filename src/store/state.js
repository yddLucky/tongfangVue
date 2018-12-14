const state = {
  plan: 0,
  age: 0,
  birthday: '',
  sex: 1,
  appName: '',
  appIdNo: '',
  appAddress: '',
  appZipcode: '',
  appPhone: '',
  appEmail: '',
  tbRelation: '',
  insName: '',
  insIdNo: '',
  amount: '请选择',
  premium: '--',
  appSex: 0,
  area: {},
  occupation: {},
  appAge: 0,
  appBirthday: '',
  insAge: 0,
  insBirthday: '',
  renewBankName: '',
  renewBankLocation: '',
  renewBankAccount: '',
  coverPeriod: {
    selectList: [
      {
        text: '30年',
        value: '30'
      },
      {
        text: '至70周岁',
        value: '70'
      },
      {
        text: '终身',
        value: '105'
      }
    ],
    selected: '请选择'
  },
  paymentPeriod: {
    selectList: [
      {
        text: '30年',
        value: '30'
      }
    ],
    selected: '30'
  }
}

export default state