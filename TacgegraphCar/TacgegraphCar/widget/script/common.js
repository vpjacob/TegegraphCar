//ajax工具
var AjaxUtil = {};

//日期工具
var DateUtils = {};

var FileUtils = {};

//var rootUrl = "http://192.168.1.168:8080";
//var rootUrl = "http://192.168.1.176:8080";
//var rootUrl = "http://192.168.1.66:8080";
//var rootUrl = "http://192.168.1.254:8080";
//var rootUrl = "http://192.168.1.71:8080";
//var rootUrls ="http://192.168.1.100:9020";
//var rootUrls = "http://192.168.1.254:8888";
//var rootUrl = "http://www.ppke.cn:8080";
//var rootUrls = "http://192.168.1.111:8088";
//var rootUrl = "http://192.168.1.168:8080";
//var rootUrl = "http://192.168.1.231:8080";
//var rootUrls = "http://192.168.1.231:8081";
//var rootUrl = "http://www.meihaoj.com:8080";
//var rootUrl = "http://192.168.1.100:8080";
//var rootUrl = "http://xk.ppke.cn";
//var rootUrl = "http://123.57.70.188:8080";
//var rootUrls ="http://123.57.70.188:9030";
var rootUrl = "http://ppke.cn";
var rootUrls ="http://ppke.cn:9030";
//物业服务器
//var propertyUrl = "http://192.168.1.110:8099";
//访问令牌
//var access_token="4a8b3b2ca65770f3a654099473c0a143243d725530505ade";
/**
 * 执行脚本方法[
 * @param {Object} option
 * option = {
 *  script : "",		脚本名称
 *  needTrascation: "ture|false", 是否需要事务支持
 *  funName:"",	需要执行函数名称
 * form	:{}, 		提交的表单内容，需要是json格式 
 * success : function(data){},		成功后的回调
 * error:function(){}					失败后的回调
 * }
 */
AjaxUtil.exeScript = function(option) {

	var _data = {
		script : option.script,
		needTrascation : option.needTrascation,
		funName : option.funName,
		form : JSON.stringify(option.form)
	};

	//使用的是zept中的ajax对象
	$.ajax({
		type : 'POST',
		url : rootUrl + "/api/execscript",
		data : _data,
		success : function(data) {
			if (option.success && $.isFunction(option.success)) {
				var json = eval("(" + data + ")");
				option.success.call(null, json);
			}
		},
		error : function(xhr, type) {
			if (option.error && $.isFunction(option.error)) {
				option.error.call();
			}
		}
	});

}

/**
 * 执行脚本同步方法 
 * @param {Object} option
 * option = {
 *  script : "",		脚本名称
 *  needTrascation: "ture|false", 是否需要事务支持
 *  funName:"",	需要执行函数名称
 * form	:{}, 		提交的表单内容，需要是json格式
 * success : function(data){},		成功后的回调
 * error:function(){}					失败后的回调
 * }
 */
AjaxUtil.exeScriptSync = function(option) {

	var _data = {
		script : option.script,
		needTrascation : option.needTrascation,
		funName : option.funName,
		form : JSON.stringify(option.form)
	};

	//使用的是zept中的ajax对象
	$.ajax({
		type : 'POST',
		url : rootUrl + "/api/execscript",
		data : _data,
		async:false,
		success : function(data) {
			if (option.success && $.isFunction(option.success)) {
				var json = eval("(" + data + ")");
				option.success.call(null, json);
			}
		},
		error : function(xhr, type) {
			if (option.error && $.isFunction(option.error)) {
				option.error.call();
			}
		}
	});

}

/**
 * 执行api方法
 * @param {Object} option
 *
 * option = {
 * 		url:				"url",						访问的api路径
 * 		form: 			{},							提交时的参数，json格式
 * 		success:		function(data){},	访问成功后的回调函数
 * 		error:			function(){}			访问失败后的回调函数
 * }
 */
AjaxUtil.exeApi = function(option) {

	$.ajax({
		type : "POST",
		url : rootUrl + option.url,
		data : option.from,
		success : function(data) {
			if (option.success && $.isFunction(option.success)) {
				var json = eval("(" + data + ")");
				option.success.call(null, json);
			}
		},
		error : function(xhr, type) {
			if (option.error && $.isFunction(option.error)) {
				option.error.call();
			}
		}
	});
}
/**
 * 时间工具，获得日期字符串
 * @param {Object} interval 时间间隔，如果是今天，填写0；昨天，填写－1；明天，填写1
 */
DateUtils.getDateStr = function(interval) {
	var dd = new Date();
	dd.setDate(dd.getDate() + interval);
	//获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;
	//获取当前月份的日期
	var d = dd.getDate();
	return m + "-" + d;
}
/**
 * 获得今天日期
 */
DateUtils.getTodayDate = function() {

	var dd = new Date();
	dd.setDate(dd.getDate());
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;
	//获取当前月份的日期
	var d = dd.getDate();

	return y + "年" + m + "月" + d + "日";
}
/**
 *  获得星期几
 * @param {Object} interval 0是当天，＋1是明天，－1是昨天，以此类推
 */
DateUtils.getWeekDay = function(interval) {

	var show_day = new Array('星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日');
	var dd = new Date();
	dd.setDate(dd.getDate() + interval);
	var day = dd.getDay();
	if (day == 0)
		return show_day[day+6];
	else
		return show_day[day-1];
//	alert("internal :"+day+show_day[day-1]);
//	return show_day[day - 1];

}
//----------------------万年历 start ------------------------------------
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
	return (m >> n) & 1;
}

function e2c() {
	TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
	var total, m, n, k;
	var isEnd = false;
	var tmp = TheDate.getYear();
	if (tmp < 1900) {
		tmp += 1900;
	}
	total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

	if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
		total++;
	}
	for ( m = 0; ; m++) {
		k = (CalendarData[m] < 0xfff) ? 11 : 12;
		for ( n = k; n >= 0; n--) {
			if (total <= 29 + GetBit(CalendarData[m], n)) {
				isEnd = true;
				break;
			}
			total = total - 29 - GetBit(CalendarData[m], n);
		}
		if (isEnd)
			break;
	}
	cYear = 1921 + m;
	cMonth = k - n + 1;
	cDay = total;
	if (k == 12) {
		if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
			cMonth = 1 - cMonth;
		}
		if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
			cMonth--;
		}
	}
}

function GetcDateString() {
	var tmp = "";
	//	tmp += tgString.charAt((cYear - 4) % 10);
	//	tmp += dzString.charAt((cYear - 4) % 12);
	//	tmp += "(";
	//	tmp += sx.charAt((cYear - 4) % 12);
	//	tmp += ")年 ";
	if (cMonth < 1) {
		tmp += "(闰)";
		tmp += monString.charAt(-cMonth - 1);
	} else {
		tmp += monString.charAt(cMonth - 1);
	}
	tmp += "月";
	tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
	if (cDay % 10 != 0 || cDay == 10) {
		tmp += numString.charAt((cDay - 1) % 10);
	}
	return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
	//solarYear = solarYear<1900?(1900+solarYear):solarYear;
	if (solarYear < 1921 || solarYear > 2020) {
		return "";
	} else {
		solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
		e2c(solarYear, solarMonth, solarDay);
		return GetcDateString();
	}
}

/**
 * 获得当天的万年历
 */
DateUtils.getCNDate = function() {
	var D = new Date();
	var yy = D.getFullYear();
	var mm = D.getMonth() + 1;
	var dd = D.getDate();
	var ww = D.getDay();
	var ss = parseInt(D.getTime() / 1000);
	if (yy < 100)
		yy = "19" + yy;

	return GetLunarDay(yy, mm, dd);
}
//---------------------- 万年历 end ------------------------------------

//---------------------- 读文件 start -------------------------------

/**
 * 把json从文件中读出
 */
FileUtils.readFile = function(fileName, successFn, errorFn) {
	console.log(fileName+"=========readFile=========");
	api.readFile({
		path : 'fs://wisdomLifeData/' + fileName
	}, function(ret, err) {
		if (ret.status) {
		console.log(ret.data+"=========ret.data=========");
			successFn.call(null, $api.strToJson(ret.data==""?null:ret.data), null);
		} else {
			console.log(err.msg);
//			errorFn.call(null, err); 
		}
	});
	
}
/**
 * 把json写到文件中
 * @param {Object} jsonData
 * @param {Object} fileName
 * @param {Object} successFn
 * @param {Object} errorFn
 */
FileUtils.writeFile = function(jsonData, fileName, successFn, errorFn) {
console.log(fileName+"========writeFile==========");
	api.writeFile({
		path : 'fs://wisdomLifeData/' + fileName,
		data : $api.jsonToStr(jsonData)
	}, function(ret, err) {
		if (ret.status) {
			if (successFn && $.isFunction(successFn)){
				successFn.call(null);
			}
		} else {
			if (errorFn && $.isFunction(errorFn))
			{
				console.log(err.msg);
			}
		}
	});

}
//---------------------- 读文件 end --------------------------------
