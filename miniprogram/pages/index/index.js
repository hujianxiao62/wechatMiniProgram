Page({

  data: {

    headerTitleC: ['国际', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    headerTitle : ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other'],
    currentHeader: 'gn',
    gnNewsTitle:[],
    firstNewsTitle:'',
    firstNewsDate: '',
    firstNewsSrc: '',
    firstNewsFig: '',
  },

  onLoad(){
    this.loadNews()
  },

  onShow() {
    this.loadNews()
  },

  loadNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.currentHeader,
      },
      success: res => {
        console.log(res)
        let result = res.data.result

        // revise date format
        result.forEach(d => {
          let date = new Date(d.date);
          d.date = `${date.getMonth() + 1}月${date.getDate()}日`
        })

        //set fisrtNews
        this.setData({
          firstNewsTitle: result[0].title,
          firstNewsSrc: ((result[0].source) || '网友提供') + '   ' + ((result[0].date) || '网友提供'),
          firstNewsFig: (result[0].firstImage) || '/figs/noPic.jpg',
          firstNewsId: result[0].id,
        })

        //set rest News
        let gnNewsTitle = []
        for (let i = 0; i < result.length - 1; i += 1) {
          gnNewsTitle.push({
            title: result[i + 1].title,
            src: ((result[i + 1].source) || '网友提供') + '   ' + ((result[i + 1].date) || '网友提供'),
            fig: (result[i + 1].firstImage) || '/figs/noPic.jpg',
            newsId: result[i + 1].id,
          })
        }
        this.setData({
          gnNewsTitle: gnNewsTitle
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },

//get news type
  onTapHeader(event){
    var headerId = event.currentTarget.dataset.headerid
    this.setData({ currentHeader: headerId}),
      this.loadNews()
  },

//get news detail
  onTapContent(event){
    var newsId = event.currentTarget.dataset.newsid
    wx.navigateTo({
      url: '/pages/content/content?newsId=' + newsId
    })
  },

  onPullDownRefresh() {
    this.loadNews(() => {
      wx.stopPullDownRefresh()
    })
  }
})