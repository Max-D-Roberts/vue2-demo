import request from './request.js'

// 登录方法
export function login(data) {
  return request({
    url: 'getToken',
    headers: {
      isToken: false
    },
    method: 'get',
    params: data
  })
}

// 站点同步
export function getSites(data) {
  return request({
    url: 'sites',
    headers: {
      isToken: false
    },
    method: 'get',
    params: data
  })
}

// 查询字典
export function getDictionary(data) {
  return request({
    url: 'dict/defaultDict',
    method: 'get',
    params: data
  })
}

// 登记-列表查询
export function listRegisterQuery(data) {
  return request({
    url: 'cloudEcgRegister/getCheckInPageList',
    method: 'get',
    params: data
  })
}

// 登记-列表查询详情
export function registerDetail(data) {
  return request({
    url: 'cloudEcgRegister/cloudEcgRegisterEdit',
    method: 'get',
    params: data
  })
}

// 登记-列表新增和修改
export function registerAddEdit(data) {
  return request({
    url: 'cloudEcgRegister/EditRegistrationElement',
    method: 'post',
    data: data
  })
}

// 登记-报告
export function getReportList(data) {
  return request({
    url: 'report/getReportList',
    method: 'get',
    params: data
  })
}

// 登记-报告上传
export function reportUpload(data) {
  return request({
    url: 'file/reportUpload',
     headers: {
      'Content-Type': 'multipart/form-data;'
    },
    method: 'post',
    data: data
  })
}

// 登记-大文件上传
export function reportUploadMd(data) {
  return request({
    url: 'file/sliceUpload',
     headers: {
      'Content-Type': 'multipart/form-data;'
    },
    method: 'post',
    data: data
  })
}

// 登记-大文件和并
export function reportUploadSum(data) {
  return request({
    url: `file/sliceMerge/${data}`,
  method: 'get',
  })
}

// 登记-大文件取消
export function reportUploadCancel(data) {
  return request({
    url: `file/cancelUpload/${data}`,
  method: 'get',
  })
}

// 登记-文件存在
export function reportUpExist(data) {
  return request({
    url: `file/isExist/${data}`,
  method: 'get',
  })
}
// 登记-文件下载
export function reportUploadDown(data) {
  return request({
    url: `file/download/${data}`,
  method: 'get',
  })
}

// 登记-报告预览
export function PDFisExist(data) {
  return request({
    url: `report/isExist/${data}`,
  method: 'get',
  })
}

// 登记-报告预览
export function PDFview(data) {
  return request({
    url: `report/review/${data}`,
    headers: {
      'Content-Type': 'application/pdf;'
    },
  method: 'get',
  })
}