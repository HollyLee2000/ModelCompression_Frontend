import request from '@/utils/request'
import request2 from "@/api";
import { parseTime, addSelectField } from '@/utils/index'

export const postServer = function (server_info) {
  if (server_info.username === '') {
    this.is_dialog_open = true
    this.dialog_content = '服务器名不得为空'
  } else if (server_info.password === '') {
    this.is_dialog_open = true
    this.dialog_content = '密码不得为空'
  } else if (server_info.password !== server_info.password2) {
    this.is_dialog_open = true
    this.dialog_content = '两次密码不一致'
  } else {
    request.post(`/api/admin/servers`, {
      server_info
    })
      .then((response) => {
        console.log('post ok', response)
        this.is_dialog_open = true
        this.dialog_content = '新建成功'
        this.getServers()
      })
      .catch((errors) => {
        console.log('post error', errors)
        this.errors = errors
        this.is_dialog_open = true
        this.dialog_content = '新建失败'
      })
  }
}
export const getServers = function () {
  request.get(`/api/admin/servers`, {
  })
    .then((response) => {
      let servers = response.data.servers
      console.log("servers: ", servers)
      for (let s of servers) {
        s.last_login = parseTime(s.last_login)
        s.online = false
        let now = parseTime(new Date())
        if ((new Date(now) - new Date(s.last_login)) < 60 * 1000) {
          s.online = true
        }
        s.total_memory = s.total_memory
        s.processes_info = s.processes_info
        // console.log(s.processes_info)
        if (s.processes_info == null) continue
        for (let i = 0; i < s.processes_info.length; i++) {
          let colors = [
            '#006400',
            '#008000',
            '#2e8b57',
            '#228b22',
            '#3cb371',
            '#32cd32',
            '#adff2f',
            '#7cfc00',
            '#98fb98',
            '#90ee90'
          ]
          s.processes_info[i].color = colors[i % colors.length]
        }
      }
      servers = servers.map(addSelectField)
      for (let server of servers) {
        server.link = '详情'
      }
      console.log('getservers')
      this.servers = servers
    })
    .catch((errors) => {
      console.log('error', errors)
      this.servers = []
      this.errors = errors
    })
}

// getCurrentrank

export const getCurrentrank = function () {
    request2.post(`/user/getUsrRank`, {
    })
    .then((response) => {
        let ranks = response.data.data.ranklistinfo
        console.log("response.data.data", response.data.data)
        console.log("ranks: ", ranks)
        // ranks = ranks.map(addSelectField)
        // for (let rank of ranks) {
        //     rank.link = '详情'
        // }
        // console.log('getranks')
        this.servers = ranks
    })
    .catch((errors) => {
        console.log('error', errors)
        this.servers = []
        this.errors = errors
    })
}

export const getQualitativeComparison = function () {
    let dataset = this.dataset
    let model = this.model
    if(dataset===' '){
        dataset = ''
    }
    if(model===' '){
        model = ''
    }
    request2.post(`/user/getQualitativeComparison`, {
        morfpath: dataset, //懒得重命名了
        lerfpath: model  //懒得重命名了
    })
        .then((response) => {
            let ranks = response.data.data.qualitativeinfo
            console.log("response.data.data", response.data.data)
            console.log("ranks: ", ranks)
            // ranks = ranks.map(addSelectField)
            // for (let rank of ranks) {
            //     rank.link = '详情'
            // }
            // console.log('getranks')
            this.servers = ranks
            this.currentPage = 1
        })
        .catch((errors) => {
            console.log('error', errors)
            this.servers = []
            this.errors = errors
        })
}

export const getLeaderboard = function () {
    let dataset = this.dataset
    let model = this.model
    if(dataset===' '){
        dataset = ''
    }
    if(model===' '){
        model = ''
    }
    request2.post(`/user/getLeaderboard`, {
        morfpath: dataset, //懒得重命名了
        lerfpath: model  //懒得重命名了
    })
        .then((response) => {
            let ranks = response.data.data.leaderboardinfo
            console.log("response.data.data", response.data.data)
            console.log("ranks: ", ranks)
            // ranks = ranks.map(addSelectField)
            // for (let rank of ranks) {
            //     rank.link = '详情'
            // }
            // console.log('getranks')
            this.leaderboards = ranks
            this.currentPage = 1
        })
        .catch((errors) => {
            console.log('error', errors)
            this.leaderboards = []
            this.errors = errors
        })
}







export const deleteServers = function () {
  let server_ids = []
  this.servers.forEach(server => { if (server.selected) { server_ids.push(server.id) } })
  console.log('selected', server_ids)
  request.delete(`/api/admin/servers`, {
    params: {
      server_ids: server_ids
    }
  })
    .then((response) => {
      console.log('delete success')
      this.is_dialog_open = true
      this.dialog_content = '删除成功'
      this.getServers()
    })
    .catch((errors) => {
      console.log('delete failure')
      this.errors = errors
      this.is_dialog_open = true
      this.dialog_content = '删除失败'
      this.getServers()
    })
}
