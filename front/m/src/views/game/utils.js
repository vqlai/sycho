export default {
  /**
   * 精确计算浮点height/width
   * author chennan
   * data 8/22
   * @params
   * classname: css类名
   * isHeight: true 返回高度, false 返回宽度
   */
  computeDomHeight(classname, isHeight = true) {
    let dom = document.querySelector(classname).getBoundingClientRect()
    return isHeight ? dom.height : dom.width
  },
  /**
   * 当前 or 符合条件所有dom的二维、XY
   * author chennan
   * data 8/22
   * @params
   * classname: css类名
   * all: true 返回符合条件所有dom的二维, false 返回单个dom的二维
   */
  computeDom(classname, all = false) {
    if (!all) return document.querySelector(classname).getBoundingClientRect()
    else {
      let allDom = Array.prototype.slice.call(
        document.querySelectorAll(classname)
      )
      let newDimension = allDom.map(c => c.getBoundingClientRect())
      return newDimension
    }
  },
  /**
   * setInterVal动画
   * author chennan
   * data 8/27
   * @params
   * sWidth: 距离
   * dom: dom_node节点
   * direction: 动画的css属性
   * animateTime: 动画时长
   */
  animateDom(sWidth, dom, direction, animateTime = 1) {
    let time = 0
    var scrolltimer = setInterval(() => {
      let speed = sWidth / (animateTime * 100)
      time++
      if (parseInt(dom.style[direction]) != 0) {
        dom.style[direction] = speed * time + 'px'
      } else {
        dom.style[direction] = speed * time + 'px'
      }
      if (time >= animateTime * 100) {
        clearInterval(scrolltimer)
      }
    }, animateTime / 1000)
  }
}