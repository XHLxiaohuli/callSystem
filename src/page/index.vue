<template>
    <div class="indexContainer">
        <topTab :topTabLeft="leftText" :topTabRight="rightText"></topTab>
        <div class="indexBody">
            <callRecord  :soundRecording="soundRecordingData"></callRecord>
            <div class="paging">
                <!-- 分页组件 -->
                <pagingModule
                    :totalNum=totalNumber
                    :currentNum=currentNum
                    :showValNum=showValNum
                    @pagingFun="soundListPagingFun"
                />
            </div>
            <div class="line"></div>
            <customerList :listCrumbs="listCrumbsTest" :userInformation="userInformationData" @triggerRecord="triggerRecords"></customerList>
        </div>
        
    </div>
</template>
<script>
    import topTab from '@/assembly/topTab'
    import callRecord from '@/assembly/callRecord'
    import customerList from '@/assembly/customerList'
    import pagingModule from '@/assembly/pagingModule'
    export default{
        data(){
            return{
                leftText:"客户列表",
                rightText:"通话记录",
                historyID:"",
                conversationPages:10,
                conversationNumber:1,

                listCrumbsTest:[
                    {"text":"姓名","widths":3},
                    {"text":"电话","widths":3},
                    {"text":"需求","widths":4},
                    {"text":"备注","widths":4},
                    {"text":"来源","widths":3},
                    {"text":"操作","widths":3},
                ],
                
                ifCallRecord:false,//是否显示录音

                 // 总数据页码
                totalNumber:0,
                // 第几页
                currentNum:1,
                // 显示个数
                showValNum:10,

                userInformationData:[
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    // ["ice","13800138000","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","公测","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨","分离小三 婚内出轨 分离小三 婚内出轨",],
                    
                ],
                soundRecordingData:[
                    // {
                    //     "customerService":"客服米鹿1",
                    //     "time":"2018/09/07 12:30:31",
                    //     "timeLength":"34:20",
                    //     "url":"",
                    // },
                   
                ],
                
            }
        },
        components: {topTab,callRecord,customerList,pagingModule},
        watch:{
            // soundRecordingData(newValue,oldValue){
            //     console.log(this.soundRecordingData)
            //     this.soundRecordingData=newValue
            //     console.log(this.soundRecordingData)
            // }
        },
        created(){
           this.initialPage() 
           this.loginInformation()
        },
        mounted(){
            
        },
        methods:{
            initialPage(){
                // console.log(this.$cookie.getCookie('userKey'))
                var this_ = this;
                    this_.$axios({
                    method: 'get',
                    url: "http://"+api+"/api/1.0/customer/page/ticket",
                    headers:{
                        'content-type': 'application/x-www-form-urlencoded',
                        'ticket':this.$cookie.getCookie('userKey')
                    },
                    params: {
                        pageNum : this_.currentNum,
                        pageSize  : this_.showValNum,
                        name        : "",
                        channel    : "",
                    }
                    }).then((response)=>{
                        var soundListVal = response.data.result;
                        console.log(response.data.result)
                        if(soundListVal){
                        // 设置总页数
                        var page_n=Math.ceil(soundListVal.total/this_.showValNum);
                        if(page_n==0){page_n=1};
                        this_.totalNumber=page_n;
                        // 对象数据转换成列表数据个数
                        // this_.dataConversionFun(soundListVal.content);
                        }


                        //名字，电话，需求，备注，来源，微信，分配客服，公司id，添加时间，修改时间,客户id
                        // console.log(this.userInformationData)

                        for(var i=0;i<response.data.result.content.length;i++){
                            var arr=[]
                            arr.push(response.data.result.content[i].name)
                            arr.push(response.data.result.content[i].phone)
                            arr.push(response.data.result.content[i].requirement)
                            arr.push(response.data.result.content[i].comment)
                            arr.push(response.data.result.content[i].channel)
                            arr.push(response.data.result.content[i].wxAccount)
                            arr.push(response.data.result.content[i].customerService)
                            arr.push(response.data.result.content[i].companyId)
                            arr.push(response.data.result.content[i].createTime)
                            arr.push(response.data.result.content[i].updataTime)
                            arr.push(response.data.result.content[i].id)
                            this.userInformationData.push(arr)
                            // console.log(this.userInformationData)
                        }
                    }).catch((error)=>{
                    console.log(error);
                    });
            },
            // 分页回调函数
            soundListPagingFun:function(data){
                // 判断是否搜索触发
                if(data.conversion){  this.currentNum=data.conversion  }else{this.currentNum=1;}
                if(data.valShowNum){  this.showValNum=data.valShowNum  };
                this.conditionRequest();
            },
            // 条件请求数据
            conditionRequest(){
                var _this=this
                this.soundRecordingList({
                    pageNum:_this.currentNum,
                    pageSize:_this.showValNum,
                });     
            },
            //通讯录管理数据请求
            soundRecordingList(obj={pageNum:'',pageSize:''}){
                var this_ = this;
                this_.$axios.get(
                    "http://"+api+"/api/1.0/customer/page/ticket"+'?pageNum='+obj.pageNum+'&pageSize='+obj.pageSize,
                    {headers:{
                    'content-type': 'application/x-www-form-urlencoded',
                    'ticket':this.$cookie.getCookie('userKey')
                    }}
                )
                .then((response)=>{
                    var soundListVal = response.data.result;
                    if(soundListVal){
                    // 设置总页数
                    var page_n=Math.ceil(soundListVal.total/this_.showValNum);
                    if(page_n==0){page_n=1};
                    this_.totalNumber=page_n;
                    // 对象数据转换成列表数据个数
                    // console.log(soundListVal.content)
                    // console.log(this_.userInformationData)
                    this_.userInformationData=[]
                    for(var i=0;i<soundListVal.content.length;i++){
                        var arr=[]
                        arr.push(response.data.result.content[i].name)
                        arr.push(response.data.result.content[i].phone)
                        arr.push(response.data.result.content[i].requirement)
                        arr.push(response.data.result.content[i].comment)
                        arr.push(response.data.result.content[i].channel)
                        arr.push(response.data.result.content[i].wxAccount)
                        arr.push(response.data.result.content[i].customerService)
                        arr.push(response.data.result.content[i].companyId)
                        arr.push(response.data.result.content[i].createTime)
                        arr.push(response.data.result.content[i].updataTime)
                        arr.push(response.data.result.content[i].id)
                        this_.userInformationData.push(arr)
                        // console.log(this.userInformationData)
                    }
                    // console.log(this_.userInformationData)
                    // this_.dataConversionFun(soundListVal.content);
                    }
                })
                    .catch((error)=>{
                    console.log(error);  
                });

            },
            //登录者信息
            loginInformation(){
                var this_=this
                this_.$axios.get(
                    "http://"+api+"/api/1.0/user/ticket",
                    {
                        headers:{
                        'content-type': 'application/x-www-form-urlencoded',
                        'ticket':this.$cookie.getCookie('userKey')
                        }
                    }
                    
                )
                .then((response)=>{
                    // console.log(response.data.result)
                    // console.log(response.data.result.accountId)
                    // console.log(response.data.result.account.phone)
                    // console.log(response.data.result.account.username)
                    window.localStorage.setItem("loginID",response.data.result.accountId);
                    window.localStorage.setItem("loginPhone",response.data.result.account.phone);
                    window.localStorage.setItem("loginName",response.data.result.account.username);

                })
                    .catch((error)=>{
                    console.log(error);  
                });

            },
            triggerRecords(msg){
                // console.log(msg)
                this.ifCallRecord=true
                var this_ = this;   
                if(this_.historyID!=msg){
                    this_.historyID=msg
                    this_.conversationPages=10
                    this_.conversationNumber=1
                    this_.soundRecordingData=[]
                }
                this_.$axios({
                    method: 'get',
                    //url: "http://"+api+"/api/1.0/call/page/ticket",
                    url: "http://"+api+"/api/1.0/call/find/ticket",
                    headers:{
                        'content-type': 'application/x-www-form-urlencoded',
                        'ticket':this.$cookie.getCookie('userKey')
                    },
                    params: {
                        // pageSize:this_.conversationPages,
                        // pageNum:this_.conversationNumber,
                        callerId:msg,// 客户ID
                        
                    }
                }).then((response)=>{
                    console.log(response.data.result)
                    var arr=response.data.result
                    if(response.data.code==200){
                        for(var i=0;i<arr.length;i++){
                            this_.soundRecordingData.push(arr[i])
                        }
                    }
                    // var abc={
                    //     "calledName":"打磨",
                    //     "startTime":1425784515000,
                    //     "endTime":  1425784525000,
                    //     "recordUrl":"http://audio.xmcdn.com/group31/M02/2A/8D/wKgJSVmO0PnC2HWBABsapgzF5is987.m4a",
                        
                    // }
                    // for(var i=0;i<5;i++){
                    //     this_.soundRecordingData.push(abc)
                    // }
                    
                })
                .catch((error)=>{
                    console.log(error);  
                });
                
            }
        }
         
    }
</script>
<style>
.indexContainer{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #EEEEEE;
}
.indexBody{
    position: absolute;
    top: 72px;
    right: 0;
    left: 0;
    bottom: 31px;
    background: #fff;
}
.line{
    width: 0;
    border: 0;
    border-right: 1px solid #C2C2C2;
    position: fixed;
    top: 73px;
    bottom: 55px;
    right: 25.2%;
    z-index: 100;
}
.paging{
    width:70%;
    position: absolute;
    left: 4%;
    bottom: 63px;
    z-index: 999;
}
</style>