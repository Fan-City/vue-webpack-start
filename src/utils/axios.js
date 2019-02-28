import request from '@/utils/request'
const axios = {
  async get (url, config) {
    try {
      let res = await request.get(url, config)
      return res
    } catch (e) {
      console.log(e)
    }
  },
  async post (url, data, config) {
    try {
      let res = await request.post(url, data, config)
      return res
    } catch (e) {
      console.log(e)
    }
  },

  async put (url, data, config) {
    try {
      let res = await request.put(url, data, config)
      return res
    } catch (e) {
      console.log(e)
    }
  },

  async delete (url, config) {
    try {
      let res = await request.delete(url, config)
      return res
    } catch (e) {
      console.log(e)
    }
  },
}

export default axios