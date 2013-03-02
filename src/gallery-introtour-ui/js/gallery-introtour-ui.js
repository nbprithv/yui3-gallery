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
		'carddimension':{'height':'300px','width':'300px'},
		'initcardpos':{'marginleft':'-150px'},
		'buttonwelcome':{'content':'Start Tour','buttonid':'yui-galleryintrotourui-buttonwelcome-id'},
		'buttontourend':{'content':'Close','buttonid':'yui-galleryintrotourui-buttontourend-id'},
		'buttonnav':{'content':'Next','buttonid':'yui-galleryintrotourui-buttonnav-'}
		
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
	var slideTemplate = function(ci,button,seqid){
		if(!ci.title)ci.title="";
		if(!ci.content)ci.content="";
		if(seqid > 0)button.buttonid = button.buttonid+seqid;
		var html = "";
		var arrowclass = "";
		if(ci.position == "right")arrowclass="right";
		else if(ci.position == "left")arrowclass="left";
		else if(ci.position == "top")arrowclass="top";
		else if(ci.position == "bottom")arrowclass="bottom";
		if(arrowclass)html = "<div class='yui-galleryintrotourui-card-arrow "+arrowclass+"'></div>";
		//if(arrowclass)html = "<div class='arrow top'></div>";
		html += "<div class='yui-galleryintrotourui-card-container'>"+
						"<div class='yui-galleryintrotourui-card-text'>"+
							"<div class='yui-galleyintroui-card-title'>"+ci.title+"</div>"+
							"<div class='yui-galleryintrotourui-card-content'>"+ci.content+"</div>"+
						"</div>"+
						"<div class='yui-galleryintrotourui-card-nav'>"+
							"<div data-seqid='"+seqid+"' id='"+button.buttonid+"' class='yui-galleryintrotourui-card-next'>"+button.content+"</div>"+
						"</div>"+
					"</div>";

		return html;
	}
	var generateSlideDom = function(toppos,leftpos,ci,id,type,seqid){
		var button = new Object();
		if(!type)button = ATTRS.buttonnav;
		else if(type == "welcome"){button=ATTRS.buttonwelcome;seqid="welcome";}
		else if(type == "end"){button=ATTRS.buttontourend;seqid="end"}
		var html = slideTemplate(ci,button,seqid);
		var node = new Y.Node(document.createElement('div'));
		node.addClass('yui-galleryintrotourui-card');
		node.setAttribute('id',id);
		node.setStyle('width',ATTRS.carddimension.width);
		node.setStyle('top',toppos);
		node.setStyle('left',leftpos);
		node.set('innerHTML',html);
		if(type == "welcome" || type == "end"){
			node.setStyle("marginLeft",ATTRS.initcardpos.marginleft);
		}
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
		ci.height = parseInt(ci.height);
		switch(ci.position){
			case "right":
				toppos = pos[1];
				leftpos = pos[0]+ci.width;
			break;
			case "left":
				toppos = pos[1];
				leftpos = pos[0]-ci.width-300;
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
		generateSlideDom("60px","50%",cardinfo[0],'galleryintrotourui-card-welcome','welcome',0);
		for(var i=1;i<cardinfo.length;i++){
			var ci = cardinfo[i];
			var elem = document.getElementById(ci.divfocus);
			if(elem){
				var pos = findpos(elem);
				pos = getCardPos(ci,pos);
				var title = ci.title;
				var content = '';
				var id='galleryintrotourui-card-'+i;
				pos[1] = pos[1]+"px";
				pos[0] = pos[0]+"px";
				if(i==cardinfo.length-2)i="end";
				var slide = generateSlideDom(pos[1],pos[0],ci,id,'',i);
			}
		}
		generateSlideDom("60px","50%",cardinfo[cardinfo.length-1],'galleryintrotourui-card-endtour','end',0);
		Y.one('#galleryintrotourui-card-welcome').setStyle('display','block');
		Y.on("click",function(){
			var seqid = this.getAttribute("data-seqid");
			Y.all(".yui-galleryintrotourui-card").setStyle("display","none");
			var carddivid = "";
			if(seqid == "welcome"){
				carddivid = "#galleryintrotourui-card-1";
			}else if(seqid == "end"){
				carddivid = "#galleryintrotourui-card-endtour";
			}else{
				seqid++;
				carddivid = '#galleryintrotourui-card-'+seqid;
			}
			if(this.getAttribute("id") == "yui-galleryintrotourui-buttontourend-id"){
				Y.all(".yui-galleryintrotourui-card").setStyle("display","none");
			}else{
				Y.one(carddivid).setStyle('display','block');
				if(seqid != "end"){
					var toppos = Y.one(carddivid).getStyle('top');
					var leftpos = Y.one(carddivid).getStyle('left');
					toppos = toppos.split("px");
					leftpos = leftpos.split("px");
					window.scrollTo(leftpos[0],toppos[0]);
				}else{
					window.scrollTo(0,0);
				}
			}
		},".yui-galleryintrotourui-card-next");
	};
}, '0.1.1',{requires: ['node']});
