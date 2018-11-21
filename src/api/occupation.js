import axios from 'axios'
import { getRootPath } from 'common/js/util'

export function getOccupation() {
  const url = getRootPath() + '/occupation/occupation_doQueryOccupationByLevel.action'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}