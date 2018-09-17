/**
 * 设置cookie
 * name cookie的名称
 * value cookie的值
 * day cookie的过期时间
 */
function setCookie(name, value, day) {
  if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var expires = day * 24 * 60 * 60 * 1000;
    var date = new Date(+new Date()+expires);
    document.cookie = name + "=" + value + ";expires=" + date + ";path=/";
  }else{
    document.cookie = name + "=" + value + ";path=/";
  }
};

/**
 * 获取对应名称的cookie
 * name cookie的名称
 * {null} 不存在时，返回null
 */
function getCookie(name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)){  	
  	return unescape(arr[2]);
  }else{	
  	return null;  
  }
};

/**
 * 删除cookie
 * name cookie的名称
 */
function delCookie(name) {
  setCookie(name,null,-1);
};


export default {
  setCookie,
  getCookie,
  delCookie,
}