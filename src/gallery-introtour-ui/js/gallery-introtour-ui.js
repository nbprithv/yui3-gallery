/*******************************************/
/*
YUI Gallery Intro Tour module 
Set up step by step intro tours on your page.
Usage: 
	YUI().use("gallery-introtour-ui",function(Y){
		var tour_cards = [{'title':'Welcome','position':'pagecenter','content':},
							{'title':'Click here to start','divfocus':'#clickhere','position':'right','width':'30'},
							{'title':'Next click here to cont..','divfocus':'#continue','position':'top',height:'20'},
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
	function findpos1( _el ) {
		var    
		   target = _el, 
		   target_width = target.offsetWidth, 
		   target_height = target.offsetHeight,
		   target_left = target.offsetLeft,
		   target_top = target.offsetTop,
		   gleft = 0, 
		   gtop = 0,
		   rect = {};
		  
		var moonwalk = function( _parent ) {
			if (!!_parent) {
				gleft += _parent.offsetLeft;
				gtop += _parent.offsetTop;
				moonwalk( _parent.offsetParent );
			} else {
				return rect = { 
					 top: target.offsetTop + gtop, 
					 left: target.offsetLeft + gleft, 
					 bottom: (target.offsetTop + gtop) + target_height, 
					 right: (target.offsetLeft + gleft) + target_width 
				};
			}
		};
		moonwalk( target.offsetParent );
		return rect;
	}
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
	var generateSlideDom = function(toppos,leftpos,content,title,id){
		var html = "<div>"+title+"</div>";
		var node = new Y.Node(document.createElement('div'));
		toppos = toppos+"px";
		leftpos = leftpos+"px";
		node.addClass('galleryintrotourui-card');
		node.setAttribute('id',id);
		node.setStyle('top',toppos);
		node.setStyle('left',leftpos);
		node.set('innerHTML',html);
		Y.one('body').appendChild(node);
	};
	var getCardPos = function(ci,pos){
		var toppos = 0;
		var leftpos = 0;
		if((ci.position == 'left' || ci.position == 'right') && ci.width == 'undefined')
			ci.width = 0;
		if((ci.position == 'top' || ci.position == 'bottom') && ci.height == 'undefined')
			ci.width = 0;
		pos[0] = parseInt(pos[0]);
		pos[1] = parseInt(pos[1]);
		ci.width = parseInt(ci.width);
		switch(ci.position){
			case "right":
				toppos = pos[1];
				leftpos = pos[0]+ci.width;
			break;
			case "left":
				toppos = pos[1];
				leftpos = pos[0]-ci.width;
			break;
			case "top":
				toppos = pos[1]-ci.height;
				leftpos = pos[0];
			break;
			case "bottom":
				toppos = pos[1]+ci.height;
				leftpos = pos[0];
			break;
			default:
				toppos = pos[1];
				leftpos = pos[0]+50;
			break;
		};
		pos[1] = toppos;
		pos[0] = leftpos;
		return pos;	
	};
	Y.Introtour.init = function(cardinfo,cardstyle){
		cardstyle = setcardstyle(cardstyle);
		for(var i=1;i<cardinfo.length;i++){
			var ci = cardinfo[i];
			var elem = document.getElementById(ci.divfocus);
			if(elem){
				var pos = findpos(elem);
				pos = getCardPos(ci,pos);
				var title = ci.title;
				var content = '';
				var id='galleryintrotourui-card-'+i;
				var slide = generateSlideDom(pos[1],pos[0],content,title,id);
			}
		}
	};
}, '0.1.1',{requires: ['node']});
