import request from '@/utils/request'
import { parseTime, addSelectField } from '@/utils/index'

export const getServers = function () {
  request.get(`/api/admin/servers`, {
  })
    .then((response) => {
      let servers = response.data.servers
      for (let s of servers) {
        s.last_login = parseTime(s.last_login)
      }
      servers = servers.map(addSelectField)
      console.log('getservers')
      this.servers = servers
    })
    .catch((errors) => {
      console.log('error', errors)
      this.servers = []
      this.errors = errors
    })
}
