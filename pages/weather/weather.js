//weather.js
var app = getApp();//获取当前小程序实例，方便使用全局方法和属性
Page({
  //1、页面数据部分
  data:{cur_id:app.curid,basic:"",now:"",suggestion:"",update:""},//设置页面数据，后面空值将在页面显示时通过请求服务器获取
  //2、系统事件部分
  onShow:function(){
    var that = this;
    wx.showToast({title: '加载中',icon: 'loading',duration: 10000})//设置加载模态框
    that.getnow(function(d){//获取到数据的回调函数
      wx.hideToast();
      d.now.src = "https://cdn.heweather.com/cond_icon/" + d.now.cond_code+".png";
      that.setData({basic:d.basic,now:d.now,update:d.update})//更新数据，视图将同步更新
    })
    that.getsuggestion(function(d){
      that.setData({suggestion:d.lifestyle})//更新数据
    })},
  //3、自定义页面方法：获取当前天气API
  getnow:function(fn){
    wx.request({//请求服务器，类似ajax
      url: 'https://free-api.heweather.net/s6/weather/now', 
      data: { location: app.curid, key:'b1d00956c7694988bbbaa98357d7d744'},//和风天气提供用户key，可自行注册获得
      header: {'Content-Type': 'application/json'},
      success: function(res) {fn(res.data.HeWeather6[0]);}//成功后将数据传给回调函数执行
    })
  },
  //获取生活指数API
  getsuggestion:function(fn){
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/lifestyle', 
      data: { location: app.curid, key:'b1d00956c7694988bbbaa98357d7d744'},
      header: {'Content-Type': 'application/json'},
      success: function(res) {fn(res.data.HeWeather6[0]);}
    })
  },
  //4、页面事件绑定部分
  bindViewTap:function(){wx.switchTab({url: '../city/city'})}//跳转菜单页面 
})

