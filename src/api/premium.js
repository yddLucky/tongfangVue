import {commonParams, options} from './config'
import axios from 'axios'
import qs from 'qs'

export function getPremium() {
  const url = '/api/getPremium'

  let data = Object.assign({}, commonParams, {
    insBirthday: '1988-11-13',
    insGender: 30,
    primaryAmount: 10000,
    insuredDuration: 1,
    openId: 'oE_9ws-ixv7aC7KsG6YnoPMLmvxc',
    paymentType: 12,
    paymentYear: 1,
    sid: '123456',
    sourceFrom: 'aegon-cnooc'
  })
  data = qs.stringify(data)

  // return axios.get(url, data).then((res) => {
  //   return Promise.resolve(res.data)
  // })
}
