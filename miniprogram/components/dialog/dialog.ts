Component({
  properties: {
    showDialog: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '提示'
    },
    content: {
      type: String,
      value: ''
    }
  },
  lifetimes: {
    attached() {
      this.animate('#dialog', [
        { opacity: 0, translateY: '100rpx' },
        { opacity: 1, translateY: '10rpx' },
      ], 200, function() {
        console.log('动画执行完毕');
      })
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
      
    },
  },
  methods: {
    hideDialog() {
      this.animate('#dialog', [
        { opacity: 1, translateY: '10rpx' },
        { opacity: 0, translateY: '100rpx' },
      ], 200, () => {
        console.log('移除动画执行完毕');
        //this.setData({ showDialog: false });
        this.triggerEvent('close');
      });
    }
  }
})