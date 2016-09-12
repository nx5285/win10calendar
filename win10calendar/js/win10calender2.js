window.onload = function(){
	var moment = document.getElementById('moment');
	var show = document.getElementById('show');
	var choose = document.getElementById('choose');
	var years = document.getElementById('years');
	var up = document.getElementById('up');
	var down = document.getElementById('down');
	var head = document.getElementsByTagName('thead');
	var body = document.querySelector('tbody');
	var back = document.getElementById('back');
	
	var d = new Date();
	
//	封装函数星期数组
	function weekArr(v){
		return ['日','一','二','三','四','五','六'][v];
	}
//	数字双位数
	function doublenum(n){
		return n < 10 ? '0' + n : n ;
	}
//	时间和日期设置
	time();
	setInterval(time,1000);
	function time(){
		var d = new Date();
		moment.innerHTML = doublenum(d.getHours()) + ':' + doublenum(d.getMinutes()) + ':' + doublenum(d.getSeconds());
		show.innerHTML = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日，星期' + weekArr(d.getDay());
	}
	
	
//	日历设置
	var y = d.getFullYear();
	var m = d.getMonth();
	change(y,m);
	function change(y,m){
//		首先确定这个月有几天
//		monthdays = getday(d.getFullYear(),d.getMonth());
		monthdays = getday(y,m);
//		然后获取当前月份一号是星期几
//		weekday = isWeek(d.getFullYear(),d.getMonth());
		weekday = isWeek(y,m);
//		计算当前月份有几行,得数向上取整
		row = Math.ceil((monthdays+weekday)/7);
//		计算当前月份空位的个数
		var str = '';
		var num = 1 - weekday;
		for(var i = 0; i < row; i++){
			str +='<tr>';
			for(var j = 0; j < 7; j++){
				if(num < 1 || num > monthdays){
					if(num < 1){
						str += '<td style="color:black;">'+(getday(y,m-1)+num)+'</td>';
					}else{
						str +='<td style="color:black;">'+(num-getday(y,m))+'</td>';
					}
				}else{
					if(num == d.getDate()){
						str += '<td style = "background-color : purple;">' + num + '</td>';
					}else{
						str += '<td>' + num + '</td>';
					}
				}
				num++;
			}
			str +='</tr>';
		}
		body.innerHTML = str;
	//	封装函数计算一个月有多少天
		function getday(year,month){
			var d = new Date(year,month + 1,1);
			return new Date(d - 1).getDate();
		}
	//	封装一个函数获取当月一号为星期几
		function isWeek(year,month){
			var d = new Date(year,month,1);
			return new Date(d).getDay();
		}
	}	
//	年份部分更改
	years.innerHTML = y + '年' + (m + 1) + '月';
//	给上下月添加点击事件
	down.onclick = function(){
		m--;
		if(m < 0){
			m = 11;
			y--;
		}
		years.innerHTML = y + '年' + (m + 1) + '月';
		change(y,m);
	}
	up.onclick = function(){
		m++;
		if(m > 11){
			m = 0;
			y++;
		}
		years.innerHTML = y + '年' + (m + 1) + '月';
		change(y,m);
	}
//	给返回当天按钮添加点击事件
	back.onclick = function(){
		y = d.getFullYear();
		m = d.getMonth();
		change(y,m);
		years.innerHTML = y + '年' + (m + 1) + '月';
	}

}
