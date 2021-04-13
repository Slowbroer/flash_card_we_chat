// pages/flash_card/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first_show: true,
    book: null,
    cards: [
      // {
      //   id: 1,
      //   name:"主键" 
      // },
      // {
      //   id: 2,
      //   name:"外键"
      // }
    ]
  },

  cardClick: function(event){
    var id = event.currentTarget.dataset.id
    var book_id = event.currentTarget.dataset.book_id
    if (id) {
      wx.navigateTo({
        url:'../flash_card/info?card_id=' + id + '&book_id=' + book_id
      })
    }
    return false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var book_id = options.book_id
    // var book_name = options.book_name
    this.setData({
      "book.id": book_id
    })
    if (! book_id) {
      wx.showModal({
        content: '必须先选择抽记本，如果没有请新建抽记本',
        mask: true,
        complete: function() {
          wx.navigateTo({
            url: '../book/list',
          })
        }
      })
    }
    var that = this

    app.wxRequest("GET","flash_card/book/" + book_id,{},function(res){
      that.setData({
        book: {
          id: book_id,
          name: res.data.data.name
        }
      }) 
    })
    
    app.wxRequest(
      "GET",
      "flash_card/card",
      {
        "book_id": book_id
      },
      function(res){
        console.log(that)
        console.log('get cards success')
        that.setData({
          cards: res.data.data.items
        })
      },
      function(err){
        console.log('get cards error')
        return false
      })

      that.setData({
        first_show: false
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
    if (! this.data.first_show){
      var that = this
      let pages = getCurrentPages(); //页面栈
      let currPage = pages[pages.length - 1]; //当前页面
      let book_id = currPage.options.book_id
      app.wxRequest(
        "GET",
        "flash_card/card",
        {
          "book_id": book_id
        },
        function(res){
          console.log(that)
          console.log('get cards success')
          that.setData({
            cards: res.data.data.items
          })
        },
        function(err){
          console.log('get cards error')
          return false
        })
      }
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