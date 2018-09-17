<template>
    <div>
        <div class="dialingContainer">
            <p class="maskUserName">{{user[0]}}</p>
            <p class="timeLength">{{lengthOfTime}}</p>
            <div class="hangUp" @click="hangUpPhone"></div>
            <p class="score" v-show="isShow" @click="scoreFun">发起评分 ></p>
        </div>
    </div>
</template>
<script>
export default{
    props:{
        user:{
            type:Array,
            required: true,
        }
    },
    data(){
        return{
            lengthOfTime:"正在接通中...",
            information:"",
            isShow:false,
            i:0,
            timerOne:"",
            hangingParameter:"",
        }
    },
    created(){
        // console.log(this.user)
        this.information=this.user
        this.score()
    },
    mounted(){
        this.connectPhone()     
    },
    methods:{
        hangUpPhone(){
            var this_ = this;
            // console.log(this_.user)
            this_.$axios({
            method: 'post',
            url: "http://call.ellxy.com/api/1.0/call/disConnect",
            headers:{
                'content-type': 'application/x-www-form-urlencoded',
                'ticket':this.$cookie.getCookie('userKey')
            },
            params: {
                callId:this_.hangingParameter,
            }
            }).then((response)=>{
                console.log(response)
            }).catch((error)=>{
            console.log(error);
            });
            clearTimeout(this .timerOne)
            this.$emit('onColsesMask',this.user[1])
        },
        score(){
            var this_=this
            this.timerOne=setInterval(()=>{
                this_.i+=1
                // console.log(this_.i)
                if(this_.i>=60){
                    clearTimeout(this_.timerOne)
                    this_.isShow=true
                }
            },1000)
        },
        connectPhone(){   
            console.log(this.user)
            console.log(window.localStorage.getItem("loginPhone"))
            console
            // console.log(window.localStorage.getItem("loginID"))
            // console.log(window.localStorage.getItem("loginPhone"))
            // console.log(window.localStorage.getItem("loginName"))
            var this_ = this;
            // console.log(this_.user)
            this_.$axios({
            method: 'post',
            url: "http://call.ellxy.com/api/1.0/call/call",
            headers:{
                'content-type': 'application/x-www-form-urlencoded',
                // 'ticket':this.$cookie.getCookie('userKey')
            },
            params: {
                caller:this_.user[1],// 客户电话号码 this_.user[1]
                callerId:this_.user[10],// 客户id
                callerName:this_.user[0],// 客户名称
                called:window.localStorage.getItem("loginPhone"),// 销售电话号码
                calledId:window.localStorage.getItem("loginID"),// 销售id
                calledName:window.localStorage.getItem("loginName"),// 销售名称
                companyId:this_.user[7],// 公司id
            }
            }).then((response)=>{
                 console.log(response.data.msg)
                 this_.hangingParameter=response.data.msg
            }).catch((error)=>{
            console.log(error);
            });
        },
        scoreFun(){
            console.log("开始评分")
            var this_ = this;
            // console.log(this_.user)
            this_.$axios({
            method: 'post',
            url: "http://call.ellxy.com/api/1.0/call/play",
            headers:{
                'content-type': 'application/x-www-form-urlencoded',
                'ticket':this.$cookie.getCookie('userKey')
            },
            params: {
                callId:this_.hangingParameter,
                voiceStr:"祝你中秋节快乐，我是嫦娥，我在新营家等你哦",
            }
            }).then((response)=>{
                console.log(response)
            }).catch((error)=>{
            console.log(error);
            });
        },

    }
}
</script>
<style>
.dialingContainer{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 322px;
    height: 425px;
    background: url('../static/img/copy.png') no-repeat;
    background-size: 100% 100%;
}
.maskUserName{
    font-size:21px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 94px;
}
.timeLength{
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 10px;
    text-align: center;
}
.hangUp{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
    margin-top: 126px;
    background: #fff;
    background: url('../static/img/bigShape.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
}
.score{
    font-size: 19px;
    text-align: center;
    color:#fff;
    margin-top: 32px;
    cursor: pointer;
}
</style>