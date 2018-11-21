import axios from 'axios'
import { getRootPath } from 'common/js/util'

export function getArea() {
  const url = getRootPath() + '/dictionary/dictionary_doQueryAreaByLevel.action'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
