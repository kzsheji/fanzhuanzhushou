/*
 * 网站常用效果插件
 * EDIT.ERIC.20150806
 * Version: 1.3.0
 * Author: SIMBA
 */


	
	//多选  EDIT.SIMBA.2015.08.10
	$.fn.check = function(opts){
		opts = $.extend({
			tapType    :  "click",     				  //默认的点击方式---click,touchend
			checkSrc   :  "./img/e-check.png",     //显示的默认图片
			checkedSrc :  "./img/e-checked.png"	  //选中后显示的图片
		},opts || {});

		var ths = this;//解决this指向问题


		var $checkAll = ths.find("*[e-check-all]");
		var $checkOne = ths.find("*[e-check-one]");

		//全选
		$checkAll.on(opts.tapType,function(){
			//自身check改变
			var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
			$(this).attr("e-check",thischeck);
			//所有单选check改变
			$checkOne.attr("e-check",thischeck);

			//图片链接替换
			checkSrcChange(thischeck,ths.find("*[e-check]"));
		});

		//单选
		$checkOne.on(opts.tapType,function(){
			//自身check改变
			var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
			$(this).attr("e-check",thischeck);

			//图片链接替换
			checkSrcChange(thischeck,$(this));
			
			//遍历所有单选 判断是否全选
			var checkOneSize = $checkOne.size();
			var checkedOneSize = ths.find("*[e-check-one][e-check=1]").size();

			if(checkOneSize == checkedOneSize){
				$checkAll.attr("e-check",1);
				checkSrcChange(1,$checkAll);
			}else{
				$checkAll.attr("e-check",0);
				checkSrcChange(0,$checkAll);
			}

		});

		//替换图片
		var checkSrcChange = function(check,obj){
			if(check == 1){
				obj.find("img").attr("src",opts.checkedSrc);
			}else{
				obj.find("img").attr("src",opts.checkSrc);
			}
		};

	};
	//----------Html
	$.each($('*[e-fun = check]'),function(i){
		var checkSrc = $('*[e-fun = check]').eq(i).attr("e-check-src");
		var checkedSrc = $('*[e-fun = check]').eq(i).attr("e-checked-src");
		var tapType = $('*[e-fun = check]').eq(i).attr("e-tap-type");
		$('*[e-fun = check]').eq(i).check({checkSrc:checkSrc,checkedSrc:checkedSrc,tapType:tapType});
	});


	//单选  EDIT.SIMBA.2015.08.10
	$.fn.radio = function(opts){
		opts = $.extend({
			tapType     :  "click",     			  //默认的点击方式---click,touchend
			radiusSrc   :  "./img/e-radio.png",	  //显示的默认图片
			radiusedSrc :  "./img/e-radioed.png"  //选中后显示的图片
		},opts || {});
		
		var ths = this;//解决this指向问题

		var $radio = ths.find("*[e-radio]");

		$radio.on(opts.tapType,function(){
			ths.find("*[e-check]").attr("e-check",0);
			//自身check改变
			var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
			$(this).attr("e-check",thischeck);
			//替换所有的图片
			radiusSrcChange(0,ths.find("*[e-check]"));
			//替换当前点击图片
			radiusSrcChange(thischeck,$(this));
		});

		//替换图片
		var radiusSrcChange = function(check,obj){
			if(check == 1){
				obj.find("img").attr("src",opts.radiusedSrc);
			}else{
				obj.find("img").attr("src",opts.radiusSrc);
			}
		};
	}
	//----------Html
	$.each($('*[e-fun = radio]'),function(i){
		var radiusSrc = $('*[e-fun = radio]').eq(i).attr("e-radio-src");
		var radiusedSrc = $('*[e-fun = radio]').eq(i).attr("e-radio-src");
		var tapType = $('*[e-fun = radio]').eq(i).attr("e-tap-type");
		$('*[e-fun = radio]').eq(i).radio({radiusSrc:radiusSrc,radiusedSrc:radiusedSrc,tapType:tapType});
	});

