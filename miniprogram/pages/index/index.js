const headerMap= {
  '国内': 'gn',
  '国际': 'gj',
  '财经':'cj',
  '娱乐':'yl' ,
  '军事': 'js',
  '体育':'ty',
  '其他':'other'
    }

Page({

  data: {
    headerTitle: ['国内', '国际', '财经', '娱乐', '军事', '体育','其他',],
    currentHeader: 'gn',
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
        type: this.data.currentHeader,
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
          firstNewsId: result[0].id,
        })

        //set gnNewsTitle
        let gnNewsTitle = []
        for (let i = 0; i < result.length-1; i += 1) {
          gnNewsTitle.push({
            title: result[i + 1].title,
            date: result[i + 1].date,
            src: result[i + 1].source,
            fig: result[i + 1].firstImage,
            newsId: result[i + 1].id,
          })
        }
        this.setData({
          gnNewsTitle: gnNewsTitle
        })
      }
    })
  },

  onTapHeader(event){
    var headerId = event.currentTarget.dataset.headerid
    console.log(headerMap[headerId])

  },

  onTapContent(event){
    var newsId = event.currentTarget.dataset.newsid
    wx.navigateTo({
      url: '/pages/content/content?newsId=' + newsId
    })
  }
})