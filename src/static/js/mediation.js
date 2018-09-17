window.crossDomainVal = function(){
	var str = 'http://test.52jcm.cn/';
    
    //初始设置传递数据
    function setCrossVal(obj_={
        key:'',
        value:'',
    }){
        executeCode(function(){
			document.querySelector('#loadIframeSite').contentWindow.postMessage(JSON.stringify({
	            type:'set',
	            key:obj_.key,
	            value:obj_.value,
	       	}),str);
		});
    };
    
    //初始获取数据
    function getCrossVal(obj_={
        key:[],
        func:function(){}
    }){
        executeCode(function(){
			document.querySelector('#loadIframeSite').contentWindow.postMessage(JSON.stringify({
	            type:'get',
	            key:obj_.key,
	        }),str);
        	if(obj_.func!=undefined){
                window.addEventListener("message",function(e){
                    obj_.func(e.data);
                });	
        	}
		});
    };
    
    //删除指定数据
    function delCrossVal(obj_={
        key:''
    }){
        executeCode(function(){
			document.querySelector('#loadIframeSite').contentWindow.postMessage(JSON.stringify({
	            type:'remove',
            	key:obj_.key,
	       	}),str);
		});
    };
    
    //实时传递数据
    function realTimeSet(obj_={
    	key:'',
        value:'',
    }){
		executeCode(function(){
			document.querySelector('#loadIframeSite').contentWindow.postMessage(JSON.stringify({
	            type:'realTimeSet',
	            key:obj_.key,
	            value:obj_.value
	       	}),str);
		});
    };
    
    //实时获取数据
    function realTimeGet(obj_={
        key:[],
        func:function(){}
    }){
    	var contrast;
		setInterval(function(){
			executeCode(function(){
				document.querySelector('#loadIframeSite').contentWindow.postMessage(JSON.stringify({
		            type:'get',
		            key:obj_.key
		        }),str);
		        if(obj_.func!=undefined){
	            	window.addEventListener("message",setIntervalFun);
            	};
			});
			function setIntervalFun(e){
            	if(contrast !== e.data.join(',')){
            		contrast = e.data.join(',');
            		obj_.func(e.data);
            	};	
            	window.removeEventListener('message', setIntervalFun);
           	};
		},1000);
    };

	//创建加载窗
    function executeCode(perform){
    	var child = document.getElementById("loadIframeSite");
		if(child){ child.parentNode.removeChild(child) };
    	
    	var src_url="http://test.52jcm.cn/crm/mediation.html";
    	var iframe = document.createElement("iframe");
        iframe.id="loadIframeSite";
        iframe.src =src_url; 
        iframe.style.display="none";
    	
    	if (iframe.attachEvent){ 
            iframe.attachEvent("onload", function(){
                perform();
            }); 
        } else { 
            iframe.onload = function(){
                perform();
            }; 
        };
        document.body.appendChild(iframe);
    };
    
    return {
		setCrossVal,
		getCrossVal,
		delCrossVal,
		realTimeSet,
		realTimeGet,
	};
};
