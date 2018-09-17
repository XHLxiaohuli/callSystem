<template>
  <div class="pagingModule_">
    <!-- 页面数据显示 -->
    <div class="pagingLeft">
      <span class="pagingText_span">共<span class="zong_ye">{{totalNum}}</span>页</span>&nbsp;&nbsp;
      <span class="pagingText_span">每页<span class="zong_span">{{valShowNum}}</span>条</span>&nbsp;&nbsp;
      <span class="pagingText_span">第<span class="di_ye">{{conversion}}</span>页</span>
      <!-- 页显示个数 -->
      <div class="ShowNumDiv" v-if="ShowNumBoll">
        <p class="ShowNumDiv_p" v-for="(val,i) in ShowNumArr" :key="i">{{val}}</p>
      </div>
    </div>
    <!-- 分页按钮 -->
    <div class="pagingRight">
      <ul>
        <li @click="onFun">上一页</li>
        <li @click="firstFun"><<</li>
        <li 
          v-for="(val,i) in numArr" 
          :key="i" 
          :class="val==conversion?'selectedLi':''" 
          @click=" val != conversion && specified(val)"
        >{{val}}</li>
        <li @click="lastFun">>></li>
        <li @click="underFun">下一页</li>
        <div style="clear: both;"></div>
      </ul>
    </div>
    <!-- 清楚浮动 -->
    <div style="clear: both;"></div>
  </div>
</template>

<script>
export default {
  // 总页码  // 当前页码 // 数据显示个数
  props:[ "totalNum" ,"currentNum","showValNum"],
  data() {
    return {
      // 点击后,当前页码
      conversion:this.currentNum,
      // 页码显示个数
      btnShowNum:this.totalNum,
      // 前后保留个数
      keepNum:'',
      // 按钮显示数组
      numArr:[],
      // 页面当前显示个数
      valShowNum:this.showValNum,
      // 页面显示个数选中数组
      ShowNumArr:[10,20,30,50,80,100],
      // 切换页面数据显示个数选项框隐藏
      ShowNumBoll:false
    }
  },
  watch:{
      totalNum(newVal, oldVal){//普通的watch监听
        this.btnShowNum = newVal>=5?5:newVal;
        // 执行初始设置函数
        this.initialSetup();
        // 初始页码显示
        this.selectedcurrentFun();
      },
      currentNum(newVal, oldVal){//普通的watch监听
        this.conversion = newVal;
      }
  },
  mounted() {
    // 执行初始设置函数
    this.initialSetup();
    // 初始页码显示
    this.selectedcurrentFun();
    // 页面数据显示个数筛选函数初始化
    this.ShowNumFun();
  },
  methods:{
    // 选中当前页面高亮操作
    selectedcurrentFun:function(){
      this.numArr.length=0;
      // 当前页码小于等于前后保留个数
      if((this.conversion-this.keepNum)<=0){
        for(var i=0;i<this.btnShowNum;i++){
          this.numArr.push(i+1);
        }
      }else 
      // 当前页码大于总页码减去前后保留个数
      if((this.totalNum-this.keepNum)<this.conversion){
        var num_ = (this.totalNum-this.btnShowNum)+1;
        for(var i=0;i<this.btnShowNum;i++){
          this.numArr.push(num_++);
        }
      }else{
        var num_=this.conversion-this.keepNum;
        for(var i=0;i<this.btnShowNum;i++){
          this.numArr.push(num_++);
        }
      };
    },
    // 初始设置数据
    initialSetup:function(){
      // 判断总页码是否小于显示页码
      if(this.totalNum<this.btnShowNum){
        // 当总页码小于显示页码时，显示页码数等于总页码
        this.btnShowNum=this.totalNum;
      };
      // 判断选中居中
      // 获取前后保留数
      this.keepNum=parseInt(this.btnShowNum/2);
    },
    // 上一页函数
    onFun:function(){
      if(this.conversion-1>0){
        this.conversion=this.conversion-1;
      };
      this.selectedcurrentFun();
      // 执行父组件函数传递当前页码
      this.$emit('pagingFun',{
        conversion:this.conversion,
        valShowNum:this.valShowNum
      });
    },
    // 下一页
    underFun:function(){
      if((this.conversion+1)<=this.totalNum){
        this.conversion=this.conversion+1;
      };
      this.selectedcurrentFun();
      // 执行父组件函数传递当前页码
      this.$emit('pagingFun',{
        conversion:this.conversion,
        valShowNum:this.valShowNum
      });
    },
    // 返回首页
    firstFun:function(){
      this.conversion=1;
      this.selectedcurrentFun();
      // 执行父组件函数传递当前页码
      this.$emit('pagingFun',{
        conversion:this.conversion,
        valShowNum:this.valShowNum
      });
    },
    // 最后一页
    lastFun:function(){
      this.conversion=this.totalNum;
      this.selectedcurrentFun();
      // 执行父组件函数传递当前页码
      this.$emit('pagingFun',{
        conversion:this.conversion,
        valShowNum:this.valShowNum
      });
    },
    // 点击是定页面
    specified:function(num){
      this.conversion = num;
      this.selectedcurrentFun();
      // 执行父组件函数传递当前页码
      this.$emit('pagingFun',{
        conversion:this.conversion,
        valShowNum:this.valShowNum
      });
    },
    // 页面数据显示个数选择函数
    ShowNumFun:function(){
      var this_ = this;
      $('.zong_span').click(function(){
        if(this_.ShowNumBoll){
          this_.ShowNumBoll = false;
        }else{
          this_.ShowNumBoll = true;
        };
        setTimeout(function(){
          $('.ShowNumDiv_p').bind('click',function(){
            var num_ = parseInt($(this).html());
            this_.valShowNum = num_;
            this_.ShowNumBoll = false;
            // 执行父组件函数传递当前页码
            this_.$emit('pagingFun',{
              valShowNum:this_.valShowNum
            });
          });
        });
      });
    },

  }
}
</script>

<style>

.pagingModule_{
  width: 100%;
  height: auto;
  color: #474e5f;
}
.pagingText_span{
  line-height: 30px;
}
.pagingLeft{
  position: relative;
  float: left;
}
.zong_ye{
  margin: 0 5px;
}
.zong_span{
  color:#fff;
  background:rgba(0,119,255,1);
  display:inline-block;
  width:25px;
  height:25px;
  margin: 0 10px;
  border-radius: 5px;
  margin-top: 2.5px;
  line-height: 25px;
  text-align: center;
}
.di_ye{
  margin: 0 5px;
  color:rgba(0,119,255,1);
}
.pagingRight{
  float: right;
}
.pagingRight>ul{
  width: 100%;
  height:30px;
}
.pagingRight>ul>li{
  width: auto;
  min-width: 25px;
  height: 25px;
  box-sizing: border-box;
  padding: 0 5px;
  border: 1px solid rgba(205,205,213,1);
  float: left;
  line-height: 25px;
  border-radius: 5px;
  margin-top: 2.5px;
  margin-left: 10px;
  color: rgba(0,119,255,1);
  font-size: 14px;
  cursor:pointer;
  background: #fff;
  text-align: center;
}
.selectedLi{
  background: rgba(0,119,255,1)!important;
  border:none!important;
  color:#fff!important;
}
.ShowNumDiv{
  position: absolute;
  width: 50px;
  height: 100px;
  bottom: 30px;
  left: 82px;
  box-sizing: border-box;
  padding: 5px 0;
  border-radius: 3px;
  background:#fff;
  overflow: auto;
}
.ShowNumDiv_p{
  cursor:pointer;
}
.ShowNumDiv_p:hover{
  background: rgba(0,119,255,1);
  color:#fff;
}
/*公共按钮*/
.exit_btn{
  width: auto;
  height:32px;
  white-space : nowrap;
  border-radius:5px;
  background:rgba(0,119,255,1);
  font-size: 10px;
  font-family:PingFangSC-Regular;
  color:#fff;
  margin-right: 20px;
  cursor:pointer;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  box-sizing: border-box;
  padding: 0 10px;
}
</style>
