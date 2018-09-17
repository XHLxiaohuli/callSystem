    <template>
        <div class="listContainer">
            <div class="crumbs">
                <div v-for="item in crumbsData" :style="'width:'+item.widths/20*100+'%'">{{item.text}}</div>
            </div>
            <hr class="listHr">
            <div class="accommodateUl">
                <ul class="listUl">
                    <li class="listLi" v-for="(item,index) in listData" @click="recordDisplay(item)">
                        <div v-for="(items,indexs) in colNumber" :style="'width:'+items/20*100+'%'" >
                            <span v-if="indexs<(colNumber.length-1)">{{item[indexs]}}</span>
                            <button :disabled="isDisabled" class="icon" @click="dialing(index,iconPic[index].state)"  v-if="indexs==(colNumber.length-1)"><img :src="iconPic[index].url" alt=""></button><!--<img :src="iconPic[index].url" alt="">-->
                        </div>
                    </li>
                </ul>
            </div>
            <dialing :user="dialingInformation" v-if="ifDial" @onColsesMask="colsesMask"></dialing>
        </div>
    </template>
    <script>
        import dialing from '../assembly/dialing'
        export default{
            props: {
                listCrumbs:{
                    type:Array,
                    required: true,
                },
                userInformation:{
                    type:Array,
                    required: true,
                }
            },
            data(){
                return{
                    listWidth:"",
                    crumbsData:"",
                    listData:"",
                    colNumber:[],
                    iconPic:[],
                    ifDial:false,
                    dialingInformation:"",
                    isDisabled:false,
                }
            },
            components: {dialing},
            watch:{
                userInformation: {
            　　　　handler(newValue, oldValue) {//父组件param对象改变会触发此函数
                        this.listData=newValue
                        if(this.listData.length!=0){
                        for(var i=0;i<this.userInformation.length;i++){
                            this.iconPic.push({"url":require("../static/img/拨打.png"),"state":false})
                        }
                    }
            　　　　},
            　　　　deep: true
            　　}
            },
            created(){
                this.initializationList()
            },
            mounted(){
                
            },
            methods:{
                initializationList(){//初始化页面数据
                    this.listWidth=window.innerWidth*0.73
                    this.crumbsData=this.listCrumbs
                    this.listData=this.userInformation
                    for(var i=0;i<this.listCrumbs.length;i++){
                        this.colNumber.push(this.listCrumbs[i].widths)
                    }
                    // for(var i=0;i<this.userInformation.length;i++){
                    //     //this.iconPic.push(require("../static/img/拨打.png"))
                    //     this.iconPic.push({"url":require("../static/img/拨打.png"),"state":false})
                    // }
                },
                dialing(index,state){//拨打电话
                    this.ifDial=true
                    this.isDisabled=true
                    this.dialingInformation=this.listData[index]
                    let iconPicLength=this.iconPic.length
                    this.iconPic=[]
                    for(var i=0;i<iconPicLength;i++){
                        // if(state==true){
                        //     this.iconPic.push({"url":require("../static/img/拨打.png"),"state":false})
                        // }else{
                            if(i==index){
                                this.iconPic.push({"url":require("../static/img/Shape.png"),"state":true})
                            }else{
                                this.iconPic.push({"url":require("../static/img/拨打.png"),"state":false})
                            }
                        // }
                    }
                },
                colsesMask(msg){
                    this.ifDial=false
                    this.isDisabled=false
                    let iconPicLengths=this.iconPic.length
                    this.iconPic=[]
                    for(var i=0;i<iconPicLengths;i++){
                        this.iconPic.push({"url":require("../static/img/拨打.png"),"state":false})
                    }
                },
                recordDisplay(item){
                    //console.log(item[10])

                    this.$emit('triggerRecord',item[10])
                }
            },
             
        }
    </script>
    <style>
    .listContainer{
        width:70%;
        position: absolute;
        top: 0;
        left: 4%;
        bottom: 0;
        background: #fff;
    }
    .crumbs{
        width: 100%;
        height: 63px;
    }
    .crumbs:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
    .crumbs>div{
        float: left;
        height: 100%;
        font-size: 14px;
        color:#999999;
        line-height: 63px;
    }
    .listHr{
        width: 74.5%;
        border:0;
        border-bottom: 1px solid #E7E7E7;
        position: relative;
        left: -4%;
        margin: 0;
    }
    .accommodateUl{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 135px;
        top: 64px;
        margin: auto;
        background: #fff;
        overflow: auto;
    }
    .listUl{
        width: 100%;
    }
    .listLi{
        width: 100%;
        height: 72px;
    }
    .listLi:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
    .listLi>div{
        float: left;
        height: 100%;
        line-height: 72px;
        font-size: 14px;
        color:#333333;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    .icon{
        cursor: pointer;
        position: relative;
        top: 5px;
        border: 0;
        padding: 0;
        border-radius: 50%;
        background: transparent;
    }
    </style>