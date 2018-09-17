window.formHeight = function(search_h){
  var winHeight;
  // 获取窗口高度
  if (window.innerHeight)
  winHeight = window.innerHeight;
  else if ((document.body) && (document.body.clientHeight))
  winHeight = document.body.clientHeight;

  return winHeight-(275+search_h);
};

// 时间转换
window.getdateTime=function(num){
  var now = new Date(num),
      y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate();

      m = (m < 10 ? "0" + m : m);
      d = (d < 10 ? "0" + d : d);
  
  return y + "-" + m + "-" + d + " " + now.toTimeString().substr(0, 8);
};

