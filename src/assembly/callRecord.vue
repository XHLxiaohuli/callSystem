<template>
    <div class="callContainer">
        <div class="callRecordBox"  @scroll="roll">
            <div class="recordBox">
                <div class="recordingBox" v-for="(iten,index) in conversationData">
                    <div class="recordingBoxTop">
                        <span>{{iten.calledName}}</span><img class="playClass" @click="playFun(index,playIocn[index].state)" :src=playIocn[index].url alt="">
                    </div>
                    <div class="recordingBoxCenter">
                        <span>{{iten.initialTime}}</span><span>{{iten.timeLength}}</span>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="simulationPlayer" v-show="isPlayer">
            <div class="playerStae">
                <span>{{names}}</span><img @click="playAndpause" :src=playerIocn alt="">
            </div>
            <!-- <div class="allProgressBar">
                <div class="readProgress" :style="'width:'+progress+'%'"></div>
                <div class="scale" :style="'left:'+scalePoint+'%'">
                    <div class="whiteSpot"></div>
                </div>
            </div> -->
            <div class="lengthOfTime">
                <span>{{starTimes}}</span><span>{{endTimes}}</span>
            </div>
            <!-- <audio id="player" controls="controls" ref="music" >
                <source data-callid="" id="sourcePlayer" :src="playerUrl"/>
            </audio> -->
            <div class="platerDiv">
                <div>
                    <audio id="player" controls="controls" ref="music" :style="'width:'+playerWidth+'px;left:-'+leftDeviation+'%'" >
                        <source data-callid="" id="sourcePlayer" :src="playerUrl"/>
                    </audio>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    // import publicMethods from '../static/js/publicMethods'
    import { timestampToTime,secondTurnTime } from "../static/js/publicMethods";
    export default{
        props:{
            soundRecording:{
                type:Array,
                required: true,
            },
        },
        data(){
            return{
                playerWidth:0,
                conversationData:"",
                playIocn:[],
                names:"",
                starTimes:"",
                endTimes:"",
                isPlayer:false,
                playerUrl:"",
                playerIocn:require("../static/img/Group 3.png"),
                playerState:true,
                selectIndex:"",
                progressTimer:"",
                // progress:0,//进度条
                // scalePoint:0,//进度点
                callRecordBoxHeigth:"",
                recordBoxHeigth:"",
                leftDeviation:"",
            }
        },
        watch:{
            soundRecording: {
            　　handler(newValue, oldValue) {//父组件param对象改变会触发此函数
                this.conversationData=newValue
                console.log(this.conversationData)
                for(var i=0;i<this.conversationData.length;i++){
                    this.conversationData[i]["initialTime"]=timestampToTime(this.conversationData[i].startTime)
                    this.conversationData[i]["timeLength"]=secondTurnTime((this.conversationData[i].endTime)-(this.soundRecording[i].startTime))
                }
                if(this.conversationData.length!=0){
                    for(var i=0;i<this.conversationData.length;i++){
                        this.playIocn.push({"url":require("../static/img/Shape 2.png"),"state":false})
                    }
                }
                
            　　},
            　　　deep: true
            },
            recordBoxHeigth(newVal,oldVal){
                console.log(newVal)
                console.log(oldVal)
               this.recordBoxHeigth=newVal
            }
        },
        updated(){
            this.recordBoxHeigth=document.getElementsByClassName("recordBox")[0].offsetHeight
            // console.log(document.getElementsByClassName("recordBox")[0].offsetHeight)
        },
        created(){
            this.conversationData=this.soundRecording
            console.log(document.body.clientWidth)
            var windowW=document.body.clientWidth
            if(windowW>=1725){
                this.playerWidth=windowW*0.32
                this.leftDeviation=31
            }else if(1725>windowW&&windowW>=1500){
                this.playerWidth=windowW*0.34
                this.leftDeviation=37
            }else if(1500>windowW&&windowW>=1350){
                this.playerWidth=windowW*0.35
                this.leftDeviation=42
            }else if(1350>windowW&&windowW>=1250){
                this.playerWidth=windowW*0.36
                this.leftDeviation=45
            }else if(1250>windowW&&windowW>=1100){
                this.playerWidth=windowW*0.38
                this.leftDeviation=50
            }else if(1100>windowW&&windowW>=1000){
                this.playerWidth=windowW*0.409
                this.leftDeviation=55
            }else if(1000>windowW&&windowW>=900){
                this.playerWidth=windowW*0.43
                this.leftDeviation=63
            }else{
                this.playerWidth=windowW*0.44
                this.leftDeviation=67
            }
            console.log(this.playerWidth)
            // console.log(timestampToTime(1425142851000))
            // console.log(this.conversationData)
            // for(var i=0;i<this.soundRecording.length;i++){
            //     this.playIocn.push({"url":require("../static/img/Shape 2.png"),"state":false})
            // }
            //console.log(this.conversationData)
        },
        mounted(){
            this.callRecordBoxHeigth=document.getElementsByClassName("callRecordBox")[0].offsetHeight
            // console.log(document.getElementsByClassName("callRecordBox")[0].offsetHeight)
            //console.log(document.getElementsByClassName("recordBox")[0].offsetHeight)
            
        },
        methods:{
            playFun(index,state){//播放
                var this_=this
                var playIocnLength=this.playIocn.length
                this.selectIndex=index
                this.playIocn=[]
                this.isPlayer=true
                var audio = this.$refs.music;
                console.log(audio)
                this.names=this.conversationData[index].calledName
                this.starTimes="00:00:00"
                this.endTimes=this.conversationData[index].timeLength
                this.playerUrl=this.conversationData[index].recordUrl
                for(var i=0;i<playIocnLength;i++){
                    if(state==true){1
                        audio.pause();/*暂停*/
                        this.playIocn.push({"url":require("../static/img/Shape 2.png"),"state":false})
                    }else{
                        audio.load()
                        audio.play(); /*播放*/
                        if(i==index){
                            this.playIocn.push({"url":require("../static/img/Group 3.png"),"state":true})
                        }else{
                            this.playIocn.push({"url":require("../static/img/Shape 2.png"),"state":false})
                        }
                    }
                    
                }
                this.progressTimerFun()
            },
            progressTimerFun(){
                var this_=this
                var playIocnLength=this.playIocn.length
                var audio = this.$refs.music;
                this_.progressTimer=setInterval(()=>{
                    console.log(secondTurnTime(audio.currentTime))
                    this.starTimes=secondTurnTime(audio.currentTime)
                    if(audio.ended){
                        clearInterval(this_.progressTimer)
                        for(var i=0;i<playIocnLength;i++){
                            abc.push({"url":require("../static/img/Shape 2.png"),"state":false})
                        }
                    }
                },1000)
            },
            playAndpause(){
                var audio = this.$refs.music;
                var playIocnLength=this.playIocn.length
                //this.playIocn=[]
                var abc=[]
                if(this.playerState){
                    this.playerState=false
                    this.playerIocn=require("../static/img/Shape 2.png")
                    audio.pause();/*暂停*/
                    clearInterval(this.progressTimer)
                    for(var i=0;i<playIocnLength;i++){
                        abc.push({"url":require("../static/img/Shape 2.png"),"state":false})
                    }
                }else{
                    this.playerState=true
                    this.playerIocn=require("../static/img/Group 3.png")
                    audio.play(); /*播放*/
                    this.progressTimerFun()
                    for(var i=0;i<playIocnLength;i++){
                        if(i==this.selectIndex){
                            abc.push({"url":require("../static/img/Group 3.png"),"state":true})
                        }else{
                            abc.push({"url":require("../static/img/Shape 2.png"),"state":false})
                        }
                    }
                }
                this.playIocn=abc
            },
            roll(){
                // console.log(document.getElementsByClassName("callRecordBox")[0].scrollTop)
                // console.log(this.recordBoxHeigth-document.getElementsByClassName("callRecordBox")[0].offsetHeight)
            }
        }
         
    }
</script>
<style>
.callContainer{
    width:24%;
    position: absolute;
    top: 0;
    right:0.7%;
    bottom: 0;
    background: #fff;
}
.callRecordBox{
    width: 95.6%;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 152px;
    margin: auto;
    overflow: auto;
    /* background: paleturquoise; */
}
.recordingBox:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.recordingBox{
    padding-top: 19px;
    padding-bottom: 16px;
    border-bottom: 1px solid #EEEEEE;
}
.callRecordBox>div:first-child{
    padding-top: 31px;
}
.recordingBoxTop{
    width: 100%;
}
.recordingBoxTop:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.recordingBoxCenter:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.recordingBoxTop>span{
    font-size: 14px;
    color:#000000;
    float: left; 
    margin-left: 4.5%;   
}
.recordingBoxTop>img{
    float: right;
    margin-right: 6.19%;
}
.recordingBoxCenter{
    font-size: 12px;
    color: #666666;
    padding-top: 8px;
}
.recordingBoxCenter>span:nth-child(1){
    float: left; 
    margin-left: 4.5%;
}
.recordingBoxCenter>span:nth-child(2){
    float: right;
    margin-right: 4.5%;
}
.playClass{
    cursor:pointer;
}
.simulationPlayer {
    width: 95.6%;
    position: absolute;
    height: 143px;
    bottom: 0;
    right: 0;
    border-top: 1px solid #EEEEEE;
}
.playerStae{
    width: 100%;
    position: absolute;
    top: 14px;
    z-index: 10000;
    /* padding: 15px 0; */
}
.playerStae:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.playerStae>span{
    font-size: 14px;
    color: #000000;
    float: left;
    margin-left: 4.5%;
}
.playerStae>img{
    float: right;
    margin-right: 6.19%;
    cursor:pointer;
}
/* .allProgressBar {
    position: absolute;
    top: 49px;
    width: 88.9%;
    height: 1px;
    margin-left: 4.5%;
    background: #CCCCCC;
    z-index: 10000;
} */
.readProgress{
    height: 100%;
    background: #0077FF;
}
.scale{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #0077FF;
}
.whiteSpot{
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.lengthOfTime {
    width: 88.9%;
    margin-left: 5.7%;
    /* padding-top: 6px; */
    position: absolute;
    top: 56px;
    z-index: 10000;
}
.lengthOfTime>span{
    font-size: 10px;
    color:#666666;
}
.lengthOfTime:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.lengthOfTime>span:nth-child(1){
    float: left;
}
.lengthOfTime>span:nth-child(2){
    float: right;
}
.platerDiv{
    position: absolute;
    top: 43px;
    height: 14px;
    width: 92%;
    margin-left: 3.5%;
    background: #CCCCCC;
    overflow: hidden;
}
#player{
    /* width: 154%; */
    position: absolute;
    /* left: -32%; */
    top: -140%;
}






.bbb{
    width: 139%;
    position: absolute;
    left: -25%;
    top: 15.8%;
}
</style>