/*******************************************/
/*
YUI Gallery Intro Tour module 
Set up step by step intro tours on your page.
Usage: 
	YUI().use("gallery-introtour-ui",function(Y){
		var tour_cards = [{'title':'Welcome','position':'pagecenter','content':},
							{'title':'Click here to start','divfocus':'#clickhere','position':'right'},
							{'title':'Next click here to cont..','divfocus':'#continue','position':'right'},
							{'title':'That's it!','position':'pagecenter'}];
		//OPTIONAL: You can style your card's button colors, card border color, title color, button text color, content color.
		//These are the default values
		var tour_card_style = {'button':'#61399d','buttontext':'#000','title':'#fff','content':'#fff','cardborder':'#61399d'};
		var config = {cards:tour_cards,cardstyle:tour_card_style};
		Y.introtour.init(config);
		//Start the tour.
		Y.introtour.start();
	});

IMPORTANT:
1. The div ID you pass cannot be hidden at the time of calling the init function.
2. The div ID you pass needs to have a parent which has position:relative.
*/
/*******************************************/
YUI.add('gallery-introtour-ui', function(Y) {
	Y.namespace('Introtour');
	var findpos = function (obj){
		var curleft = curtop = 0;
			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
			}
		return [curleft,curtop];
	};
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
	var ATTRS = {
		'cardstyle':{'button':'#61399d','buttontext':'#000','title':'#fff','content':'#fff','cardborder':'#61399d'},
		'carddimension':{'height':'300px','width':'100px'},
		
	};
	var setcardstyle = function(cardstyle){
		if(!cardstyle){
			cardstyle = ATTRS.cardstyle;
		}else{ 
			var defAttrs = ATTRS.cardstyle;
			if(!cardstyle.button)cardstyle.button = defAttrs.button;
			if(!cardstyle.buttontext)cardstyle.buttontext = defAttrs.buttontext;
			if(!cardstyle.title)cardstyle.title = defAttrs.title;
			if(!cardstyle.content)cardstyle.content = defAttrs.content;
			if(!cardstyle.cardborder)cardstyle.border = defAttrs.border;
		}
		return cardstyle;
	};
	var generateSlideDom = function(toppos,leftpos,offsetParent){
		var html = "<div style='position:fixed;width:100px;height:300px;background-color:#000;color:#FFF;border:color:#000;top:"+toppos+";left:"+leftpos+"'></div>";
	};
	Y.Introtour.init = function(cardinfo,cardstyle){
		cardstyle = setcardstyle(cardstyle);
		for(var i=0;i<cardinfo.length;i++){
			var ci = cardinfo[i];
			var elem = document.getElementById(ci.divfocus);
			if(elem){
				var pos = findpos(elem);
				console.log(pos);
				var slide = generateSlideDom(toppos,leftpos,content,title);
			}
		}
			console.log(document.getElementById("test").offsetParent);
			console.log(findpos(document.getElementById("test")));
			console.log(getOffset(document.getElementById("test")));
	};
});
