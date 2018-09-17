export default {
  // 根据路由切换数据
  setRouterStr:function(str){
    var obj = require(`./typePage_0/${str}.js`);
    console.log(obj.default);
  },
  // 变量数据
  dataValue:{},

  // 数据请求函数
  getRequest:function(requestArr=[{
    url,                //请求地址
    type,               //请求类型
    parameType,         //请求传参类型
    parameter,          //参数数据
    callbackFunction,   //请求回调函数
  }]){
    // 判断是否对象
    var bool_0 = typeof(requestArr) == 'object';
    // 判断对象或数组
    var bool_1 = Array.isArray(requestArr);

    if(bool_0 && bool_1){
      // 数组类型参数
      this.$axios.all(
        multipleRequests(requestArr)
      ).then(this.$axios.spread((...res)=>{

        for(var i=0;i<res.length;i++){
          console.log(res[i]);
        };

      })).catch((err)=>{
        console.logt(err);
      });
    }else if(bool_0){
      // 对象类型参数
    }else{
      alert('请求函数参数必须为对象类型');
    };

    // 多请求函数
    function multipleRequests(requestArrVal){
      var array_ = [];
      for(var i=0;i<requestArrVal.length;i++){
        array_.push(
          this.$axios({
            method:     requestArrVal[i].type,
            url:        requestArrVal[i].url,
            headers:{
              'content-type':     
              requestArrVal[i].parameType=='json'?'application/json':
              requestArrVal[i].parameType=='form'?'application/x-www-form-urlencoded':'',
              'ticket': ticket
            },
            data:
            requestArrVal[i].parameType=='json'?parameter:
            requestArrVal[i].parameType=='form'?{}:{},
            params:
            requestArrVal[i].parameType=='json'?{}:
            requestArrVal[i].parameType=='form'?parameter:{},
          })
        )
      };
      return array_;
    };

    // 

  },

  // 自定义函数
  methods:function(){},

  // 初始化执行函数
  beforeCreate:function(){},

  // 创建完成执行函数
  created:function(){},

  // 挂载前执行函数
  beforeMount:function(){},

  // 挂载后执行函数
  mounted:function(){},

  // 数据更新前执行函数
  beforeUpdate:function(){},

  // 数据更新后执行函数
  updated:function(){},

  // 模块销毁前执行函数
  beforeDestroy:function(){},

  // 模块销毁后执行函数
  destroyed:function(){},





};