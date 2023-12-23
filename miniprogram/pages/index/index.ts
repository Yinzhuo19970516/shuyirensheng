Page({
  data: {
    dataText: '请选择公历日期',
    show: false,
    obj: {
      id: '',
      name: '',
      keyword: '',
      advantage:'',
      disadvantage: '',
      baseDes:'',
      detail:'',
      chartar: '',
      talent:''
    }
  },
  bindDateChange(e) {
    this.setData({
      dataText: e.detail.value,
    });
  },
  generateRandomNumber() {
    const min = 200;
    const max = 2000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  },
  
  onClose(){
    this.setData({
      show: false
    })

  },
  computed() {
    if(this.data.dataText === '请选择公历日期') {
      wx.showToast({
        title: '请先选择出生日期',
        icon:'none',
        duration: 2000
      })
    } else {
      const value = this.calculateBirthNumber(new Date(this.data.dataText))
      wx.showLoading({
        title: '正在推演请稍后',
      })
      
      setTimeout( ()=> {
       
    // 在弹窗打开时，将 scrollTop 设置为初始值 0
    // const query = wx.createSelectorQuery();
    // query.select('.van-popup').fields({scrollTop: true},  (res)=> {
    //   if (true) {   
    //     console.log(222)
     
    //   }
    // }).exec();
        wx.hideLoading()
        this.setData({
          show: true,
          obj: getApp().globalData.myObject[value]
        })
        wx.pageScrollTo({
          selector:'.chartar-box',
          scrollTop: 0,
          duration: 300
        })
      }, this.generateRandomNumber())
      
      
    }
  },
  calculateBirthNumber(date) {
    // 将日期转换为数字字符串
    const dateString = date.getFullYear().toString() + 
                       (date.getMonth() + 1).toString().padStart(2, '0') + 
                       date.getDate().toString().padStart(2, '0');
    
    // 计算数字字符串中每位数字之和
    let sum = 0;
    for (let i = 0; i < dateString.length; i++) {
      sum += parseInt(dateString[i]);
    }
    
    // 将和的每位数字继续相加，直到得到一个介于1和9之间的单个数字
    while (sum > 9) {
      let tempSum = 0;
      while (sum !== 0) {
        tempSum += sum % 10;
        sum = Math.floor(sum / 10);
      }
      sum = tempSum;
    }
    
    return sum;
  }
});