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
    //console.log(options.newsId)
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: options.newsId,
      },
      success: res => {
        console.log(res)
        let result = res.data.result

        //fix date format
        let date = new Date(result.date);
        result.date = `${date.getMonth() + 1}月${date.getDate()}日`

        //set fisrtNews
        this.setData({
          detailNewsTitle: result.title,
          detailNewsSrc: ((result.source) || '网友提供') + "  " + ((result.date) || '时间不详'),
          detailNewsReadCount: "阅读量:" + result.readCount,
          detailNewsFig: result.firstImage,
          detailNewsContent: result.content,
        })

      }
    })
  },


})