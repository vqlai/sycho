// 短信验证码
// 只需绑定codeText和isActive即可
let timer = null
class MsgCode{
  constructor(vm){
    this.vm = vm
  }
  start(time,text){
    if(this.isRun()){
      return
    }
    time = time ? time : 60
    if(!text){
        text = "S后重发"
    }
    if(timer && timer != ""){
      clearInterval(timer)
    }
    this.vm.isActive = true
    this.vm.codeText = (time--) + text
    timer = setInterval(() => {
      if(time == 0){
        this.stop()
        return
      }
      this.vm.codeText = (time--) + text
    },1000)
  }
  stop(){
    this.vm.codeBtnActive = false
    this.vm.codeText = "获取验证码"
    clearInterval(timer)
    timer = null
  }
  isRun(){
    return timer && timer != ""
  }
}

export default MsgCode