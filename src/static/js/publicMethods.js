export const timestampToTime = (timestamp)=>{
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "/";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "/";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    var s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}
export const secondTurnTime=(secondValues)=>{
    //var day;
    var hour='00';
    var minute='00';
    var second='00';
    var secondValue=parseInt(secondValues)
    if(secondValue>=3600){
        hour=parseInt(secondValue/3600)>=10?parseInt(secondValue/3600):("0"+parseInt(secondValue/3600))
        minute=parseInt((secondValue%3600)/60)>0?(parseInt((secondValue%3600)/60)>=10?parseInt((secondValue%3600)/60):("0"+parseInt((secondValue%3600)/60))):"00"
        second=parseInt((secondValue%3600)%60)>0?(parseInt((secondValue%3600)%60)>=10?parseInt((secondValue%3600)%60):("0"+parseInt((secondValue%3600)%60))):"00"
    }else{
        hour="00"
        if(secondValue>=60){
        minute=parseInt(secondValue/60)>=10?parseInt(secondValue/60):("0"+parseInt(secondValue/60))
        second=parseInt(secondValue%60)>0?(parseInt(secondValue%60)>=10?parseInt(secondValue%60):("0"+parseInt(secondValue%60))):"00"
        }else{
        minute="00"
        if(secondValue>0){
            second=secondValue>=10?secondValue:("0"+secondValue)
        }else{
            second="00"
        }
        }
    }
    return hour+":"+minute+":"+second
}