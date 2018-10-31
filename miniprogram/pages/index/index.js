Page({

  data: {
    headerTitle: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    gnNewsTitle:[],
    firstNewsTitle:'',
    firstNewsDate: '',
    firstNewsSrc: '',
    firstNewsFig: '',
  },

  onLoad(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'gn',
      },
      success: res => {
        console.log(res)
        let result = res.data.result
    
    
        //set fisrtNews
        this.setData({
          firstNewsTitle: result[0].title,
          firstNewsDate: result[0].date,
            firstNewsSrc: result[0].source,
          firstNewsFig: result[0].firstImage,
        })


        //set gnNewsTitle
        let gnNewsTitle = []
        for (let i = 0; i < result.length-1; i += 1) {
          gnNewsTitle.push({
            title: result[i + 1].title,
            date: result[i + 1].date,
            src: result[i + 1].source,
            fig: result[i + 1].firstImage,
          })
        }
        this.setData({
          gnNewsTitle: gnNewsTitle
        })
      }
    })
  },

  onTapHeader(){
    wx.showToast()
  },

  onTapContent(){
    wx.navigateTo({
      url: '/pages/content/content',
    })
  }
})