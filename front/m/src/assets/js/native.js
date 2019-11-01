  // 经测试app内的url安卓不能识别#，需转为%23，ios可识别#,但不识别%23
  // 在app里因为打开新的窗口需要调用原生的方法进行，如果页面已经在窗口模式，则该页面的跳转可以直接使用location.href，
  // 但首页不能这样使用，因为首页不是窗口模式，没有顶部栏，需要调用原生方法进行跳转
  
    /*
    * 打开商品详情
    * @param goodsId 商品编号  未测试
    */
    function openGoodsDetail(goodsId){
        sendAction("mobile",{type:1,data:goodsId});
    }

    /*
    * 打开商品列表
    * @param firstTypeId 一级类型编号   未测试
    */
    function openGoodsList (firstTypeId){
        sendAction("mobile",{type:2,data:firstTypeId});
    }

    /*
    * 打开订单列表   可用
    */
    function openOrderList(){
        sendAction("mobile",{type:3});
    }

    /*
    * 打开网页
    * @param url 网页地址
    * @param title 网页标题,可以为空,为空时标题栏将显示网页自身的标题   可用
    * @param canShare 是否在标题栏显示分享网页按钮
    */
    function openWeb(url,title,canShare){
        var param = {type:7,data:url,title:title};
        if(canShare){
            param.share = "1";
        }
        sendAction("mobile",param);
    }

    /*
    * 打开登录界面   可用(登录后无法带回token，导致一直登录失败)
    */
    function openLogin(){
        sendAction("mobile",{type:8});
    }

    /*
    * 分享
    * @param linkUrl 分享内容的链接地址
    * @param title 分享内容标题   可用
    * @param content 分享内容描述
    * @param imgUrl 分享内容的图标地址,如果为空,则取app本身的图标
    */
    function share (linkUrl,title,content,imgUrl){   
        var param = {type:10,linkUrl:linkUrl};
        if(title){
            param.title = title;
        }
        if(content){
            param.content = content;
        }
        if(imgUrl){
            param.imgUrl = imgUrl;
        }
        sendAction("mobile",param);
    }

    /*
     *
     * ios打开消息通知
     *
     */
    function openNotificationSettings (){
        sendAction("openNotificationSettings");
    }

    /*
    * 打开优惠券列表   不可用不报错无反应
    */
    function openCouponList (){
        sendAction("couponlist");
    }

    /*
    * 打开积分明细列表  不可用不报错无反应
    */
    function openScoreList(){
        sendAction("scorelist");
    }

    /*
    * 打开购物车   可用
    */
    function openShopCart(){
        sendAction("cart");
    }

    /*
    * 打开注册页面    安卓可用ios无反应不报错
    */
    function openRegister(){
        sendAction("register");
    }

    /*
    * 打开AppStore   都无反应且报错
    */
    function openAppStore(){
        sendAction("openAppStore");
    }
  
    /**
    * 打开单场直播   未测试
    */
    function openLive (pliveId, pliveTitle){
        sendAction("openLive",{pliveId:pliveId, pliveTitle:pliveTitle});
    }
  
    /*
    * 打开点播  未测试
    */
    function openLiveRecord(pliveId, pliveTitle){
        sendAction("openLiveRecord",{pliveId:pliveId, pliveTitle:pliveTitle});
    }
  
    /*
    * 打开直播   可用
    */
    function openLiveList (){
        sendAction("liveList");
    }

    /*
    * 选择收货地址
    * 注:必须注册地址回传函数   可用
    * 函数名:onSelectAppAddress
    * 回传参数结构:
    * {name:"张三",phone:"130xxxxxxxx",province:"广东省",city:"深圳市",area:"龙华新区",detail:"布龙路稳健工业园"}
    */
    function selectAddress (callback){
      sendAction("selectAddress");
      window.onSelectAppAddress = function(address){
          callback(address);
      }
    }
    // 发送请求action至App
    function sendAction(action,params){
    var paramsStr = "";
    if(params){
        var index = 0;
        for(var key in params){
        paramsStr += (index == 0 ? "?" : "&");
        paramsStr += (key + "=" + params[key]);
        index++;
        }
    }
    var frame = document.getElementById("nativeIframe");
    if(frame){
        frame.remove();
    }
    frame = document.createElement("iframe");
    frame.setAttribute('id',"nativeIframe");
    frame.setAttribute('style', "width:0;height:0;border:0;margin:0;padding:0;position:fixed;top:0;");
    frame.setAttribute('src', "purcotton://" + action + paramsStr);
    frame.setAttribute('width', 0);
    frame.setAttribute('height', 0);
    frame.setAttribute('scrolling', "no");
    frame.setAttribute('border', 0);
    document.getElementsByTagName("body")[0].appendChild(frame);
    frame.remove();
    }

  let AppNative = {
    openGoodsDetail, // 可用
    openGoodsList, // 可用
    openOrderList, // 可用
    openWeb, // 可用
    openLogin, // 可用
    share, // 可用 
    openCouponList,  // 可用
    openScoreList,   // 可用
    openShopCart,  // 可用
    openRegister, // 可用 
    openAppStore, // ios可跳，android无需跳
    openLive,  // 未测试
    openLiveList,  // 未测试
    openLiveList,  // 可用
    selectAddress, // 可用
    openNotificationSettings,
    sendAction
  }
  
  export default AppNative;