Page({

  data: {
    detailNewsTitle: '',
    detailNewsSrc: '',
    detailNewsDate: '',
    detailNewsReadCount: '',
    detailNewsFig: '',
    detailNewsContent:[],
  },

  onLoad(options) {
    console.log(options.newsId)
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: options.newsId,
      },
      success: res => {
        console.log(res)
        let result = res.data.result

        //set fisrtNews
        this.setData({
          detailNewsTitle: result.title,
          detailNewsDate: result.date,
          detailNewsSrc: result.source,
          detailNewsReadCount: "阅读量:" + result.readCount,
          detailNewsFig: result.firstImage,
          detailNewsContent: result.content,
        })

      }
    })
  }

})