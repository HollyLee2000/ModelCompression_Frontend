import request from '@/utils/request'

export const shareData = function ({ file_id, file_type, is_public }) {
  console.log('share data', file_id, file_type)
  let url
  if (file_type === 'm') {
    url = `/api/model/share_link`
  } else if (file_type === 'd') {
    url = `/api/dataset/share_link`
  } else {
    this.is_dialog_open = true
    this.dialog_content = '错误的数据类型'
    return
  }
  if (is_public) {
    this.is_dialog_open = true
    this.dialog_content = '已公开，不需分享'
  } else {
    request.post(url, {
      file_id: file_id,
      file_type: file_type,
      duration: 7
    })
      .then((response) => {
        const url = `${window.origin}/#/share/${file_type}/${response.data}`
        console.log('share success', response.data)
        this.is_dialog_open = true
        this.dialog_content = url
      })
      .catch((errors) => {
        this.errors = errors
        this.is_dialog_open = true
        this.dialog_content = '分享失败'
      })
  }
}

export const getPrivilege = function ({ file_type, share_link }) {
  console.log('getPrivilege', share_link, file_type)
  let url
  if (file_type === 'm') {
    url = `/api/model/share_model`
  } else if (file_type === 'd') {
    url = `/api/dataset/share_dataset`
  } else {
    this.is_dialog_open = true
    this.dialog_content = '错误的数据类型'
    return
  }

  request.post(url, {
    share_link: share_link
  })
    .then((response) => {
      console.log('get privilege success', response.data)
      this.is_dialog_open = true
      this.dialog_content = '权限获取成功'
    })
    .catch((errors) => {
      console.log('errors', errors)
      this.errors = errors
      this.is_dialog_open = true
      this.dialog_content = `权限获取失败：${errors.response.data}`
    })
}
