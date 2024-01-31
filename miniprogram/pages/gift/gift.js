const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    autoSizeData1: {
      maxHeight: 50, 
      minHeight: 20
    },
    autoSizeData2: {
      minHeight: 60
    },
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    name: '',
    phone: '',
    address: '',
    message: ''
  },
  onLoad: function() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile: function(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        userInfo: this.data.userInfo,
        name: e.detail.value.name,
        phone: e.detail.value.phone,
        region: this.data.region,
        address: e.detail.value.address
      },
      success: res => {
        console.log('用户添加成功')
      }
    })
  }
})
