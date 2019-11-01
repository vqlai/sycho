// h5与原生交互
function isApp(){
  if(typeof webkit != "undefined" && webkit.messageHandlers && webkit.messageHandlers.purcottonApp){
    //ios
    window.purcottonApp = {};
    return function(mehtodName,params){
      webkit.messageHandlers.purcottonApp.postMessage({mehtodName: mehtodName,params:params});
    };
  }else if(typeof purcottonApp != "undefined"){
    //android
    return function(mehtodName,params){
      var str = JSON.stringify(params);
      eval("purcottonApp."+mehtodName+'('+(str=="{}"?"":"'"+str+"'")+')');
    }
  }
  return false;
}

// app回调示例
// purcottonApp.callback = function(name,data){
//   if(name == "pay"){
//     // do somrthing
//   }
// }

// h5调用示例
// purcottonApp.pay({});

export default isApp;