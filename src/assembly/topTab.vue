<template>
   <div class="topTabContainer">
       <div class="leftTab">
            <span>{{topTabLeft}}</span>
       </div>
       <div class="rightTab">
            <span>{{topTabRight}}</span>
       </div>
 
   </div>
</template>
<script>
    export default{
        props: {
            topTabLeft:{
                type:String,
                required: true
            },
            topTabRight:{
                type:String,
                required: true
            },
        },
        data(){
            return{
               
            }
        },
        components: {},
        created(){
            
        },
        mounted(){
            
        },
        methods:{

        }
         
    }
</script>
<style>
.topTabContainer{
    width: 100%;
    height: 72px;
    background: #FFF;
    position: relative;
}
.topTabContainer>div{
    border-bottom:2px solid rgba(194,194,194,1);
    box-sizing: border-box;
}
.topTabContainer>div>span{
    display: inline-block;
    height: 100%;
    font-size: 18px;
    color:#333333;
}
.leftTab{
    float: left;
    width: 73%;
    height: 100%;
    line-height: 72px;
    margin-left: 1%;
}
.rightTab{
    width: 24%;
    height: 100%;
    line-height: 72px;
    float: right;
    margin-right: 0.7%;
}
.rightTab>span{
    margin-left: 5%;
    border-bottom:2px solid rgba(0,121,254,1);
    box-sizing: border-box;
}
</style>