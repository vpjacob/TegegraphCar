var memberid;
apiready = function() {
	var header = $api.byId('header');
	var content = $api.dom('.content');
	if (api.systemType == 'ios') {
		$api.css(header, 'margin-top:20px;');
		$api.css(content, 'margin-top:20px;');
	}
	$("#back").bind("click", function() {
		api.closeWin();
	});
	memberid = api.getPrefs({
		sync : true,
		key : 'memberid'
	});
	//记录仪被点击事件
	$("#recorde").bind("click", function() {
		//同步返回结果：
		var data = api.readFile({
			sync : true,
			path : 'fs://wisdomLifeData/equipment.json'
		});
                       if(data){
                       console.log("-------------------");
                       //同步返回结果：
                       var hasEq = $api.strToJson(data)[0].hasEq;
                       console.log(data);
                       console.log(hasEq);
                       if (hasEq == false || hasEq == 'false') {
                       api.openWin({//打开我的设备
                                   name : 'my_equipment',
                                   url : '../equipment/my_equipment.html',
                                   slidBackEnabled : true,
                                   animation : {
                                   type : "push", //动画类型（详见动画类型常量）
                                   subType : "from_right", //动画子类型（详见动画子类型常量）
                                   duration : 300 //动画过渡时间，默认300毫秒
                                   }
                                   });
                       
                       } else {
                       api.openWin({//打开有设备的界面
                                   name : 'equipment_index',
                                   url : '../equipment/equipment_index.html',
                                   slidBackEnabled : true,
                                   animation : {
                                   type : "push", //动画类型（详见动画类型常量）
                                   subType : "from_right", //动画子类型（详见动画子类型常量）
                                   duration : 300 //动画过渡时间，默认300毫秒
                                   }
                                   });
                       }
                       }else{
                       alert("没有设备，请先添加设备");
                       }
		
	});


	$("#regist").bind("click", function() {
		api.openWin({//打开有设备的界面
			name : 'equipmentType',
			url : './equipmentType.html',
			slidBackEnabled : true,
			animation : {
				type : "push", //动画类型（详见动画类型常量）
				subType : "from_right", //动画子类型（详见动画子类型常量）
				duration : 300 //动画过渡时间，默认300毫秒
			}
		});
	});
};

