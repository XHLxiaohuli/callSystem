window.indexedDBoptFun = function(name , version , buildTable){
	var db='';
	var idbRequest='';
	
	openDB (name , version , buildTable);
	
	return {
		addData:addData,
		putData:putData,
		getData:getData,
		getAllData:getAllData,
		clearObjectStore:clearObjectStore,
		deleteDataByKey:deleteDataByKey,
		closeDatabase:closeDatabase,
		delDB:delDB
	}
	
	//创建数据库 以及 数据表
	function openDB (name , version , buildTable) {
		//需要打开的版本号
		version = version || 1;
		
		//打开或创建数据库
		idbRequest = window.indexedDB.open(name, version);
		
		//错误回调
		idbRequest.onerror = function (e) {//异步的
			console.warn('error: %s', e.currentTarget.error.message);
		};
		
		//正确回调
		idbRequest.onsuccess = function (e) { //异步的
			db = e.target.result; //indexedDB对象
			// console.log('idbRequest === e.target: %o', idbRequest === e.target);
			// console.log('db: %o, idbRequest: %o', db, idbRequest);
		};

		//  大于当前版本号, 则触发 onupgradeneeded, 
		//  小于当前版本号，则触发 onerror
		idbRequest.onupgradeneeded = function (e) {//异步的
			// console.log('DB version change to ' + version);
			db = e.target.result; //indexedDB对象
			//判断是否存在该表
			
			for(var i=0; i<buildTable.length; i++){
				if(!db.objectStoreNames.contains(buildTable[i].name)){
					db.createObjectStore(buildTable[i].name,{keyPath:buildTable[i].keyPath});
				}
			}
			
			// console.log('onupgradeneeded: db->', db);
		};
	}
	
	//保存表新数据
	function addData (storeName, data) {
		asynchronous(function(){
			var store = db.transaction(storeName,'readwrite').objectStore(storeName);
			data.forEach(function (item) {
				store.add(item);//保存数据
			});
		});
	}
	
	//更新表新数据
	function putData (storeName, data) {
		asynchronous(function(){
			var store = db.transaction(storeName,'readwrite').objectStore(storeName);
			data.forEach(function (item) {
				store.put(item);//更新数据
			});
		});
	}
	
	//使用索引查找数据库表信息
	function getData(storeName, key , function_){
		asynchronous(function(){
			dataRequestFun(storeName, key , function_);
		});

		function dataRequestFun(storeName, key , function_){
			var store = db.transaction(storeName,'readwrite').objectStore(storeName);
			var dataRequest = store.get(key);

			// 获取成功回调
			dataRequest.onsuccess = function(){
				function_(this.result);
			}

			// 获取失败回调
			dataRequest.onerror = function(){
				console.log('本地获取数据失败');
			}
		};
	}
	
	//使用游标查找数据库表信息
	function getAllData(storeName , function_){
		asynchronous(function(){
			dataRequestFun(storeName , function_);
		});

		function dataRequestFun(storeName , function_){
			var store = db.transaction(storeName,'readwrite').objectStore(storeName);
			var dataRequest = store.openCursor();

			// 获取成功回调
			dataRequest.onsuccess = function(){
				var cursor = this.result;
				if(cursor){//必须要检查
					function_(cursor);
					cursor.continue();//遍历了存储对象中的所有内容
				}
			}

			// 获取失败回调
			dataRequest.onerror = function(){
				console.log('本地获取数据失败');
			}
		};
	}

	//清空数据表
	function clearObjectStore(storeName){
		asynchronous(function(){
			var store = db.transaction(storeName,'readwrite').objectStore(storeName);
	    store.clear();
		});
	}
	
	// 删除数据
	function deleteDataByKey(storeName,key){
		asynchronous(function(){
			var store = db.transaction(storeName,'readwrite').objectStore(storeName);
	    store.delete(key);
		});
	}
	
	//关闭数据库
	function closeDatabase(){
		asynchronous(function(){
			db.close();
		});
	}

	//删除数据库
	function delDB(name){				
		indexedDB.deleteDatabase(name);
	}

	// 解决异步问题
	function asynchronous(function_){
		var time_ = setInterval(function(){
			if(db != ''){	function_();	clearInterval(time_);	}
		});
	}
	
};

// 创建indexedDB本地存储数据表
// window.indexedDBopt = indexedDBoptFun
// ("myimVal",1,[
// 	{name:'userData',keyPath:'type'},						//用户信息
// 	{name:'userList',keyPath:'id'},							//好友列表
// 	{name:'userValList',keyPath:'id'},					//已读消息数据
// 	{name:'unreadMessages',keyPath:'id'},				//未读消息数据
// 	{name:'recentSession',keyPath:'id'}					//微信最近会话排序
// ]);