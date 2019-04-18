const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/* api接口promise 柯里化*/
var Promise = require('../lib/es6-promise.min.js');
function wxPromisify(fn, scope) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {

      obj.success = function (res) {
        resolve(res);
      }

      obj.fail = function (res) {
        reject(res);
      }
      if (scope) {
        //改变this指向
        var newFn = fn.bind(scope);
        newFn(obj);
      } else {
        fn(obj);
      }
    })
  }
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/* request 封装*/
var wxrequest = wxPromisify(wx.request);
function wxRequest(options, tokenNotRequired) {

  return wxrequest(options).then(res => {
    
    var data=res.data;
    return Promise.resolve(data);
  }).catch(err => {
    console.log(err);
    return Promise.reject(err);
  });
}
var wxlogin = wxPromisify(wx.login);
function wxLogin(options, tokenNotRequired) {
  return wxlogin(options).then(res => {

    var data=res.code;
    return Promise.resolve(data);
  }).catch(err => {
    return Promise.reject(err);
  });
}
//加载
const domainUrl ="https://www.tangyc.xyz:443/";
module.exports = {
  formatTime: formatTime,
  uploadFileUrl: domainUrl +'uploadFile',
  getOpenIdUrl: domainUrl + 'getOpenId',
  addTagUrl:domainUrl+'addTag',
  getTypeList: domainUrl + 'getTypeId',
  getItemUrl: domainUrl + 'getItemUrl',
  wxRequest: wxRequest,
  wxLogin:wxLogin,
  getBannerUrl: domainUrl + 'getBannerUrl',
}
