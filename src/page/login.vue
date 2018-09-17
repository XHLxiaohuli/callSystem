<template>
  <div class="index_">
    <div class="index_container">
      <span class="index_title">新营家微信风控管理系统</span>
      <div class="index_form">
        <div class="index_form_container">
          <span class="index_denglu">登陆</span>
          <div class="index_biaodan">
            <p class="index_shuru">
              <img src="../static/img/账号.png" alt="">
              <input type="text" placeholder="请输入登录账号" v-model="account_" @keydown.13="loginFun"/>
            </p>
            <p class="index_shuru">
              <img src="../static/img/密码.png" alt="">
              <input type="password" placeholder="请输入登录密码" v-model="password_" @keydown.13="loginFun"/>
            </p>
            <p class="btn_login" @click="loginFun()">登陆</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password_:'',
      account_:''
    }
  },
  beforeCreate(){
  },
  mounted() {
    if(this.$cookie.getCookie('userKey')){
      var ticket = this.$cookie.getCookie('userKey');
      this.getIinforma(ticket);
    }
  },
  methods:{
    loginFun:function(){
      var this_=this;
      
      if(this_.password_==''){alert('密码不能为空!');return};
      if(this_.account_==''){alert('账号不能为空!');return};

      // 获取公钥
      // $.support.cors = true;
      // $.ajax({
      //   type:"get",
      //   url:"http://"+api+"/api/1.0/pem/publicKey",
      //   contentType: 'application/x-www-form-urlencoded',
      //   success:function (res) {

      //     // RSA加密(公钥)
      //     var pubkey=res.result;
      //     var encrypt = new JSEncrypt();
      //         encrypt.setPublicKey(pubkey);

      //     // 密码加密
      //     var passwordRas = encrypt.encrypt(this_.password_);

      //     // 通过账号密码获取ticket
      //     this_.getTicketFun(this_.account_ , passwordRas);
         
      //   },
      //   error:function (response) {
      //     alert('获取公钥失败');
      //   }
      // });

      this_.$axios({
          method: 'get',
          url: "http://"+api+"/api/1.0/pem/publicKey",
          headers:{
              'content-type': 'application/x-www-form-urlencoded',
              'ticket':this.$cookie.getCookie('userKey')
          },
          params: {
              pageNum : 1,
              pageSize  : 20,
              name        : "",
              channel    : "",
          }
          }).then((response)=>{
            // RSA加密(公钥)
            var pubkey=response.data.result;
            var encrypt = new JSEncrypt();
                encrypt.setPublicKey(pubkey);

            // 密码加密
            var passwordRas = encrypt.encrypt(this_.password_);

            // 通过账号密码获取ticket
            this_.getTicketFun(this_.account_ , passwordRas);
          }).catch((error)=>{
            console.log(error);
          });

    },
    // 获取ticket
    getTicketFun:function(account_,passwordRas){
      var this_ = this;

      // ajax获取ticket;
      // $.support.cors = true;
      // $.ajax({
      //   type:"post",
      //   url:"http://"+api+"/api/1.0/account/login",
      //   data:{
      //     username:account_,
      //     password:passwordRas
      //   },
      //   contentType: 'application/x-www-form-urlencoded',
      //   success:function (res) {
      //     console.log(res);
      //     if(res.success){
      //       var ticket = res.result;

      //       this_.$cookie.setCookie('userKey',ticket,1);


      //       // 获取个人信息以及好友列表信息
      //       this_.getIinforma(ticket);
      //     }else{
      //       alert(res.msg);
      //     };
      //   },
      //   error:function (response) {
      //     alert('获取ticket失败');
      //   }
      // });
        

        this_.$axios({
          method: "post",
          url: "http://"+api+"/api/1.0/account/login",
          headers:{
              'content-type': 'application/x-www-form-urlencoded',
              'ticket':this.$cookie.getCookie('userKey')
          },
          params: {
            username:account_,
            password:passwordRas
          }
          }).then((response)=>{
              if(response.data.success){
              var ticket = response.data.result;

              this_.$cookie.setCookie('userKey',ticket,1);


              // 获取个人信息以及好友列表信息
              this_.getIinforma(ticket);
            }else{
              alert(response.data.msg);
            };
          }).catch((error)=>{
            console.log(error);
          });

    },
    // 获取个人信息
    getIinforma:function(Iticket){
      var this_ = this;

      this.$axios.all([
        //获取用户信息
        this.$axios.get(
          "http://"+api+"/api/1.0/user/ticket",
          {headers:{
            'content-type': 'application/x-www-form-urlencoded',
            'ticket':Iticket
          }}
        ),
        //获取菜单
        this.$axios.get(
          "http://"+api+"/api/1.0/menu/ticket",
          {headers:{
            'content-type': 'application/x-www-form-urlencoded',
            'ticket':Iticket
          }}
        )
      ]).then(this.$axios.spread((res1,res2)=>{

        if(res1.data.success && res2.data.success){
          
          var res1_Val=res1.data.result;
          var res2_Val=res2.data.result;

          if(!res2_Val){alert('该账号无菜单，没权限登入！');return;};

          // 创建indexedDB本地存储数据表
          window.indexedDBopt = indexedDBoptFun
          (res1_Val.id,1,[
            {name:'userData',keyPath:'type'}			//用户信息
          ]);
          
          // 本地保存用户id
          localStorage.setItem(`userId`, res1_Val.id);
          // 本地保存个人信息
          indexedDBopt.putData('userData',[{type:'userVal',val:res1_Val}]);
          // 本地导航权限数组
          indexedDBopt.putData('userData',[{type:'navArr',val:res2_Val}]);

          var userVal_bool=false,
              navArr_bool=false;

          var this_setTime = setInterval(function(){
            indexedDBopt.getData('userData','userVal',function(data){
              if(data && data!=undefined){  userVal_bool = true;  }
            });

            indexedDBopt.getData('userData','navArr',function(data){
              if(data && data!=undefined && isSameArray(data.val,res2_Val)){  navArr_bool = true;  }
            });
            
            if(userVal_bool && navArr_bool){
              clearInterval(this_setTime);
              this_.$router.push({
                path:'/index',
                query:{  }
              });
            };
          },200);

          // 判断数组是否相等函数
          function isSameArray(array1, array2) {
            array1 = array1.join('');
            array2 = array2.join('');
            return array1 === array2;
          };

        }else{
          alert(res1.data.msg);
          alert(res2.data.msg);
        };

      })).catch((err)=>{
        alert('获取用户信息失败');
      });
    },


  }
}
</script>
<style>


.index_{
  position: fixed;
  width: 100%;
  height: 100%;
  /* // background-image: url('../assets/img/loginbg.jpg'); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}
.index_container{
  width: 100%;
  height: 100%;
  position: relative;
}
.index_title{
  font-size:28px;
  font-family:PingFangSC-Medium;
  color:rgba(51,51,51,1);
  text-align: center;
  z-index: 20;
  position: absolute;
  left: 50%;
  top:15%;
  transform: translate(-50%, 0);
}
.index_form{
  width:460px;
  height:380px;
  background:rgba(255,255,255,1);
  box-shadow:0px 18px 46px 22px rgba(0,0,0,0.07);
  border-radius:20px;
  z-index: 20;
  position: absolute;
  left: 50%;
  top:26%;
  transform: translate(-50%, 0);
}
.index_form_container{
  width: 100%;
  height: 100%;
  position: relative;
}
.index_denglu{
  font-size:20px;
  font-family:PingFangSC-Medium;
  color:rgba(51,51,51,1);
  font-weight: bold;
  position: absolute;
  left: 50%;
  top:5%;
  transform: translate(-50%, 0);
}
.index_biaodan{
  width: 75%;
  height: auto;
  position: absolute;
  left: 50%;
  top:25%;
  transform: translate(-50%, 0);
}
.index_shuru{
  width: 100%;
  height:50px;
  box-sizing: border-box;
  border-radius:35px;
  border:1px solid rgba(153,153,153,1);
  position: relative;
  margin-bottom: 35px;
}
.index_shuru>img{
  height: 28px;
  width: auto;
  position: absolute;
  left: 5%;
  top:50%;
  transform: translate(0, -50%);
}
.index_shuru>input{
  height: 90%;
  width: 70%;
  font-size: 18px;
  outline: none;
  border:none;
  text-align: center;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
}
.btn_login{
  width: 100%;
  height:50px;
  font-size: 24px;
  font-family:PingFangSC-Medium;
  color:rgba(255,255,255,1);
  line-height: 50px;
  box-sizing: border-box;
  border-radius:35px;
  background:rgba(0,119,255,1);
  text-align: center;
}
</style>
