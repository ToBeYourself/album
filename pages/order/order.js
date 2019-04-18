var util=require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    openId:'',
    showModal: false,
    typeList:[],
    addTagName:''
  },
tagInput:function(e){
  console.log(e.detail.value);
  this.setData({ addTagName:e.detail.value});
 
},

  preventTouchMove: function () {

  },

addTag:function(e){
  this.setData({
    showModal: true
  })

},
addTagCancel:function(){
  this.setData({
    showModal: false
  })
},
  addTagCfm: function (e) {
    var tagName = this.data.addTagName;
    var openId=this.data.openId;
  var that=this;
    wx.request({
      url: util.addTagUrl+'?tagName='+tagName+'&openId='+openId,
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
       /** var _typeList=[];
        console.log(res.data);
        for(var i in res.data){
          _typeList.push(res.data[i].type_name);
        }*/
        that.setData({
          typeList:res.data
        })
        app.globalData.typeList = res.data;
      }
    })
    this.setData({
      showModal: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.data.openId=app.globalData.openId;

  },
  chooseImage:function(e){
    var that=this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function(res) {
        var images = res.tempFilePaths
    
        that.setData({ images:images});
       /** wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000  

        })
        */
        console.log(e.currentTarget.dataset);
        for(var i=0,h=images.length;i<h;i++){
          wx.uploadFile({
            url: util.uploadFileUrl + '?openId=' + that.data.openId,
            filePath: images[i],
            formData: { typeId: e.currentTarget.dataset.index},
            name: 'fulAvatar',
            header:{
              'content-type':'multipart/form-data'
            },
            success:function(res){
              console.log(res);
            }
          })
        }
      },
    })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var _openId = app.globalData.openId;
    if (_openId == '' || _openId == undefined) {
      wx.login({
        success: res => {

          var that = this;
          wx.request({
            url: util.getOpenIdUrl + '?openId=' + res.code,
            success: function (res) {
              var _open = JSON.parse(res.data).openid;
              console.log(res.data);
              // that.globalData.openId = JSON.parse(res.data).openid;

              wx.request({
                url: util.getTypeList+"?openId="+_open,
                method: "POST",
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                  console.log(res);

                }
              })
            }
          })

          return;
        }
      })}

    var that=this;
    wx.request({
      url: util.getTypeList + '?openId=' + _openId,
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      method:"GET",
      success:function(res){
        console.log(res.data);
        that.setData({
          typeList: res.data
        });
      }
    })
  

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})