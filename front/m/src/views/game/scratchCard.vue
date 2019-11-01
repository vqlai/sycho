<template>
  <div class="scratch_card_box">
    刮刮乐
    <div id="div1">恭喜您中奖了</div>
    <canvas id="mycanvas" width="300" height="80"></canvas>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {
    // 预先填充
    var canvas = document.getElementById('mycanvas')
    var ctx = canvas.getContext('2d')
    ctx.fillStyle = 'gray'
    ctx.fillRect(0, 0, 300, 80)
    // 绑定处理
    canvas.addEventListener('touchmove', this.moveFunc, false)
    canvas.addEventListener('touchend', this.endFunc, false)
  },
  computed: {},
  methods: {
    moveFunc(e) {
      let canvas = document.getElementById('mycanvas')
      let ctx = canvas.getContext('2d')
      let l = canvas.offsetLeft
      let t = canvas.offsetTop
      let touch = e.touches[0]
      let posX = touch.clientX - l
      let posY = touch.clientY - t
      ctx.globalCompositeOperation = 'destination-out'
      ctx.strokeStyle = '#eee' // 触笔的颜色 随便  因为它终究变成透明
      ctx.lineWidth = 30 // 拖动时开始画线的线宽
      ctx.lineCap = 'round' // 画笔变成圆形
      ctx.beginPath()
      ctx.arc(posX, posY, 15, 0, Math.PI * 2, 0)
      ctx.fill()
    },
    endFunc() {
      let canvas = document.getElementById('mycanvas')
      let ctx = canvas.getContext('2d')
      let w = canvas.width
      let h = canvas.height
      let area = w * h
      let data = ctx.getImageData(0, 0, w, h).data // 获取每一个像素
      let scrapeNum = 0
      for (var i = 3, len = data.length; i < len; i += 4) {
        if (data[i] === 0) {
          scrapeNum++
        }
      }
      if (scrapeNum > area * 0.7) {
        // 大于70%则全放开
        ctx.clearRect(0, 0, w, h)
        canvas.removeEventListener('touchmove', this.moveFunc, false)
        canvas.removeEventListener('touchend', this.endFunc, false)
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
  .scratch_card_box{
    font-size: 20px;
    #div1{
      width: 120px;
      height: 40px;
      color: red;
      position: absolute;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
    }
    #mycanvas{
      position: absolute;
      left: 0;
    }
  }
  
</style>