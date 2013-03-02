if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-introtour-ui/gallery-introtour-ui.js",
    code: []
};
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].code=["YUI.add('gallery-introtour-ui', function (Y, NAME) {","","/*******************************************/","/*","YUI Gallery Intro Tour module","Set up step by step intro tours on your page.","Usage:","	YUI().use(\"gallery-introtour-ui\",function(Y){","		var tour_cards = [{'title':'Welcome','position':'pagecenter','content':},","							{'title':'Click here to start','divfocus':'#clickhere','position':'right','width':'30'},","							{'title':'Next click here to cont..','divfocus':'#continue','position':'top',height:'20'},","							{'title':'That's it!','position':'pagecenter'}];","		//OPTIONAL: You can style your card's button colors, card border color, title color, button text color, content color.","		//These are the default values","		var tour_card_style = {'button':'#61399d','buttontext':'#000','title':'#fff','content':'#fff','cardborder':'#61399d'};","		var config = {cards:tour_cards,cardstyle:tour_card_style};","		Y.introtour.init(config);","		//Start the tour.","		Y.introtour.start();","	});","","IMPORTANT:","1. The div ID you pass cannot be hidden at the time of calling the init function.","2. The div ID you pass needs to have a parent which has position:relative.","*/","/*******************************************/","YUI.add('gallery-introtour-ui', function(Y) {","	Y.namespace('Introtour');","	var findpos = function (obj){","		var curleft = curtop = 0;","			if (obj.offsetParent) {","				do {","					curleft += obj.offsetLeft;","					curtop += obj.offsetTop;","				} while (obj = obj.offsetParent);","			}","		return [curleft,curtop];","	},","	ATTRS = {","		'cardstyle':{'button':'#61399d','buttontext':'#000','title':'#fff','content':'#fff','cardborder':'#61399d'},","		'carddimension':{'height':'300px','width':'300px'},","		'initcardpos':{'marginleft':'-150px'},","		'buttonwelcome':{'content':'Start Tour','buttonid':'yui-galleryintrotourui-buttonwelcome-id'},","		'buttontourend':{'content':'Close','buttonid':'yui-galleryintrotourui-buttontourend-id'},","		'buttonnav':{'content':'Next','buttonid':'yui-galleryintrotourui-buttonnav-'}","		","	},","	setcardstyle = function(cardstyle){","		if(!cardstyle){","			cardstyle = ATTRS.cardstyle;","		}else{","			var defAttrs = ATTRS.cardstyle;","			if(!cardstyle.button){cardstyle.button = defAttrs.button;}","			if(!cardstyle.buttontext){cardstyle.buttontext = defAttrs.buttontext;}","			if(!cardstyle.title){cardstyle.title = defAttrs.title;}","			if(!cardstyle.content){cardstyle.content = defAttrs.content;}","			if(!cardstyle.cardborder){cardstyle.border = defAttrs.border;}","		}","		return cardstyle;","	},","	slideTemplate = function(ci,button,seqid){","		var buttonid = button.buttonid,","		html = \"\",","		arrowclass = \"\";","		if(!ci.title){ci.title=\"\";}","		if(!ci.content){ci.content=\"\";}","		if(seqid > 0){buttonid = buttonid+seqid;}","		if(ci.position === \"right\"){arrowclass=\"right\";}","		else if(ci.position === \"left\"){arrowclass=\"left\";}","		else if(ci.position === \"top\"){arrowclass=\"top\";}","		else if(ci.position === \"bottom\"){arrowclass=\"bottom\";}","		if(arrowclass){html = \"<div class='yui-galleryintrotourui-card-arrow \"+arrowclass+\"'></div>\";}","		html += \"<div class='yui-galleryintrotourui-card-container'>\"+","						\"<div class='yui-galleryintrotourui-card-closebutton'>x</div><div class='yui-galleryintrotourui-clearfix'></div>\"+","						\"<div class='yui-galleryintrotourui-card-text'>\"+","							\"<div class='yui-galleyintroui-card-title'>\"+ci.title+\"</div>\"+","							\"<div class='yui-galleryintrotourui-card-content'>\"+ci.content+\"</div>\"+","						\"</div>\"+","						\"<div class='yui-galleryintrotourui-card-nav'>\"+","							\"<div data-seqid='\"+seqid+\"' id='\"+buttonid+\"' class='yui-galleryintrotourui-card-next yui3-button notice'>\"+button.content+\"</div>\"+","						\"</div>\"+","					\"</div>\";","","		return html;","	},","	generateSlideDom = function(toppos,leftpos,ci,id,type,seqid){","		var button = {},","		html;","		if(!type){button = ATTRS.buttonnav;}","		else if(type === \"welcome\"){button=ATTRS.buttonwelcome;seqid=\"welcome\";}","		else if(type === \"end\"){button=ATTRS.buttontourend;seqid=\"end\";}","		html = slideTemplate(ci,button,seqid),","		node = new Y.Node(document.createElement('div'));","		node.addClass('yui-galleryintrotourui-card');","		node.setAttribute('id',id);","		node.setStyle('width',ATTRS.carddimension.width);","		node.setStyle('top',toppos);","		node.setStyle('left',leftpos);","		node.set('innerHTML',html);","		if(type === \"welcome\" || type === \"end\"){","			node.setStyle(\"marginLeft\",ATTRS.initcardpos.marginleft);","		}","		Y.one('body').appendChild(node);","	},","	getCardPos = function(ci,pos){","		var toppos = 0,","		leftpos = 0;","		if((ci.position === 'left' || ci.position === 'right') && ci.width === 'undefined'){","			ci.width = 0;","		}","		if((ci.position === 'top' || ci.position === 'bottom') && ci.height === 'undefined'){","			ci.width = 0;","		}","		pos[0] = parseInt(pos[0],10);","		pos[1] = parseInt(pos[1],10);","		ci.width = parseInt(ci.width,10);","		ci.height = parseInt(ci.height,10);","		switch(ci.position){","			case \"right\":","				toppos = pos[1];","				leftpos = pos[0]+ci.width;","			break;","			case \"left\":","				toppos = pos[1];","				leftpos = pos[0]-ci.width-300;","			break;","			case \"top\":","				toppos = pos[1]-ci.height;","				leftpos = pos[0];","			break;","			case \"bottom\":","				toppos = pos[1]+ci.height;","				leftpos = pos[0];","			break;","			default:","				toppos = pos[1];","				leftpos = pos[0]+50;","			break;","		}","		pos[1] = toppos;","		pos[0] = leftpos;","		return pos;","	};","	Y.Introtour.init = function(cardinfo,cardstyle){","		cardstyle = setcardstyle(cardstyle);","		generateSlideDom(\"60px\",\"50%\",cardinfo[0],'galleryintrotourui-card-welcome','welcome',0);","		for(var i=1;i<cardinfo.length;i++){","			var ci = cardinfo[i],","			elem = document.getElementById(ci.divfocus),","			pos;","			if(elem){","				pos = findpos(elem),","				id='galleryintrotourui-card-'+i;","				pos = getCardPos(ci,pos);","				pos[1] = pos[1]+\"px\";","				pos[0] = pos[0]+\"px\";","				if(i===cardinfo.length-2){i=\"end\";}","				generateSlideDom(pos[1],pos[0],ci,id,'',i);","			}","		}","		generateSlideDom(\"60px\",\"50%\",cardinfo[cardinfo.length-1],'galleryintrotourui-card-endtour','end',0);","		window.scrollTo(0,0);","		Y.one('#galleryintrotourui-card-welcome').setStyle('display','block');","		Y.on(\"click\",function(){","			var seqid = this.getAttribute(\"data-seqid\"),","			carddivid = \"\";","			Y.all(\".yui-galleryintrotourui-card\").setStyle(\"display\",\"none\");","			if(seqid === \"welcome\"){","				carddivid = \"#galleryintrotourui-card-1\";","			}else if(seqid === \"end\"){","				carddivid = \"#galleryintrotourui-card-endtour\";","			}else{","				seqid++;","				carddivid = '#galleryintrotourui-card-'+seqid;","			}","			if(this.getAttribute(\"id\") === \"yui-galleryintrotourui-buttontourend-id\"){","				Y.all(\".yui-galleryintrotourui-card\").setStyle(\"display\",\"none\");","			}else{","				Y.one(carddivid).setStyle('display','block');","				if(seqid !== \"end\"){","					var toppos = Y.one(carddivid).getStyle('top'),","					leftpos = Y.one(carddivid).getStyle('left');","					toppos = toppos.split(\"px\");","					leftpos = leftpos.split(\"px\");","					window.scrollTo(leftpos[0],toppos[0]);","				}else{","					window.scrollTo(0,0);","				}","			}","		},\".yui-galleryintrotourui-card-next\");","		Y.on(\"click\",function(){","			Y.all(\".yui-galleryintrotourui-card\").setStyle(\"display\",\"none\");","		},\".yui-galleryintrotourui-card-closebutton\");","	};","}, '0.1.1',{requires: ['node']});","","","}, '@VERSION@', {\"use\": [\"yui-base\", \"yui3\", \"node\"], \"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].lines = {"1":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0,"33":0,"34":0,"37":0,"49":0,"50":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"59":0,"62":0,"65":0,"66":0,"67":0,"68":0,"69":0,"70":0,"71":0,"72":0,"73":0,"84":0,"87":0,"89":0,"90":0,"91":0,"92":0,"94":0,"95":0,"96":0,"97":0,"98":0,"99":0,"100":0,"101":0,"103":0,"106":0,"108":0,"109":0,"111":0,"112":0,"114":0,"115":0,"116":0,"117":0,"118":0,"120":0,"121":0,"122":0,"124":0,"125":0,"126":0,"128":0,"129":0,"130":0,"132":0,"133":0,"134":0,"136":0,"137":0,"138":0,"140":0,"141":0,"142":0,"144":0,"145":0,"146":0,"147":0,"148":0,"151":0,"152":0,"154":0,"155":0,"156":0,"157":0,"158":0,"161":0,"162":0,"163":0,"164":0,"165":0,"167":0,"168":0,"169":0,"170":0,"171":0,"173":0,"174":0,"176":0,"177":0,"179":0,"180":0,"181":0,"183":0,"184":0,"185":0,"187":0,"191":0,"192":0};
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].functions = {"findpos:29":0,"setcardstyle:48":0,"slideTemplate:61":0,"generateSlideDom:86":0,"getCardPos:105":0,"(anonymous 3):164":0,"(anonymous 4):191":0,"init:144":0,"(anonymous 2):27":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].coveredLines = 107;
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].coveredFunctions = 10;
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 1);
YUI.add('gallery-introtour-ui', function (Y, NAME) {

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
_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 27);
YUI.add('gallery-introtour-ui', function(Y) {
	_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "(anonymous 2)", 27);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 28);
Y.namespace('Introtour');
	_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 29);
var findpos = function (obj){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "findpos", 29);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 30);
var curleft = curtop = 0;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 31);
if (obj.offsetParent) {
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 32);
do {
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 33);
curleft += obj.offsetLeft;
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 34);
curtop += obj.offsetTop;
				}while (obj = obj.offsetParent);
			}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 37);
return [curleft,curtop];
	},
	ATTRS = {
		'cardstyle':{'button':'#61399d','buttontext':'#000','title':'#fff','content':'#fff','cardborder':'#61399d'},
		'carddimension':{'height':'300px','width':'300px'},
		'initcardpos':{'marginleft':'-150px'},
		'buttonwelcome':{'content':'Start Tour','buttonid':'yui-galleryintrotourui-buttonwelcome-id'},
		'buttontourend':{'content':'Close','buttonid':'yui-galleryintrotourui-buttontourend-id'},
		'buttonnav':{'content':'Next','buttonid':'yui-galleryintrotourui-buttonnav-'}
		
	},
	setcardstyle = function(cardstyle){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "setcardstyle", 48);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 49);
if(!cardstyle){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 50);
cardstyle = ATTRS.cardstyle;
		}else{
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 52);
var defAttrs = ATTRS.cardstyle;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 53);
if(!cardstyle.button){cardstyle.button = defAttrs.button;}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 54);
if(!cardstyle.buttontext){cardstyle.buttontext = defAttrs.buttontext;}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 55);
if(!cardstyle.title){cardstyle.title = defAttrs.title;}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 56);
if(!cardstyle.content){cardstyle.content = defAttrs.content;}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 57);
if(!cardstyle.cardborder){cardstyle.border = defAttrs.border;}
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 59);
return cardstyle;
	},
	slideTemplate = function(ci,button,seqid){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "slideTemplate", 61);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 62);
var buttonid = button.buttonid,
		html = "",
		arrowclass = "";
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 65);
if(!ci.title){ci.title="";}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 66);
if(!ci.content){ci.content="";}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 67);
if(seqid > 0){buttonid = buttonid+seqid;}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 68);
if(ci.position === "right"){arrowclass="right";}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 69);
if(ci.position === "left"){arrowclass="left";}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 70);
if(ci.position === "top"){arrowclass="top";}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 71);
if(ci.position === "bottom"){arrowclass="bottom";}}}}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 72);
if(arrowclass){html = "<div class='yui-galleryintrotourui-card-arrow "+arrowclass+"'></div>";}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 73);
html += "<div class='yui-galleryintrotourui-card-container'>"+
						"<div class='yui-galleryintrotourui-card-closebutton'>x</div><div class='yui-galleryintrotourui-clearfix'></div>"+
						"<div class='yui-galleryintrotourui-card-text'>"+
							"<div class='yui-galleyintroui-card-title'>"+ci.title+"</div>"+
							"<div class='yui-galleryintrotourui-card-content'>"+ci.content+"</div>"+
						"</div>"+
						"<div class='yui-galleryintrotourui-card-nav'>"+
							"<div data-seqid='"+seqid+"' id='"+buttonid+"' class='yui-galleryintrotourui-card-next yui3-button notice'>"+button.content+"</div>"+
						"</div>"+
					"</div>";

		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 84);
return html;
	},
	generateSlideDom = function(toppos,leftpos,ci,id,type,seqid){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "generateSlideDom", 86);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 87);
var button = {},
		html;
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 89);
if(!type){button = ATTRS.buttonnav;}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 90);
if(type === "welcome"){button=ATTRS.buttonwelcome;seqid="welcome";}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 91);
if(type === "end"){button=ATTRS.buttontourend;seqid="end";}}}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 92);
html = slideTemplate(ci,button,seqid),
		node = new Y.Node(document.createElement('div'));
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 94);
node.addClass('yui-galleryintrotourui-card');
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 95);
node.setAttribute('id',id);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 96);
node.setStyle('width',ATTRS.carddimension.width);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 97);
node.setStyle('top',toppos);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 98);
node.setStyle('left',leftpos);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 99);
node.set('innerHTML',html);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 100);
if(type === "welcome" || type === "end"){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 101);
node.setStyle("marginLeft",ATTRS.initcardpos.marginleft);
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 103);
Y.one('body').appendChild(node);
	},
	getCardPos = function(ci,pos){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "getCardPos", 105);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 106);
var toppos = 0,
		leftpos = 0;
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 108);
if((ci.position === 'left' || ci.position === 'right') && ci.width === 'undefined'){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 109);
ci.width = 0;
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 111);
if((ci.position === 'top' || ci.position === 'bottom') && ci.height === 'undefined'){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 112);
ci.width = 0;
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 114);
pos[0] = parseInt(pos[0],10);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 115);
pos[1] = parseInt(pos[1],10);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 116);
ci.width = parseInt(ci.width,10);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 117);
ci.height = parseInt(ci.height,10);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 118);
switch(ci.position){
			case "right":
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 120);
toppos = pos[1];
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 121);
leftpos = pos[0]+ci.width;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 122);
break;
			case "left":
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 124);
toppos = pos[1];
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 125);
leftpos = pos[0]-ci.width-300;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 126);
break;
			case "top":
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 128);
toppos = pos[1]-ci.height;
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 129);
leftpos = pos[0];
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 130);
break;
			case "bottom":
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 132);
toppos = pos[1]+ci.height;
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 133);
leftpos = pos[0];
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 134);
break;
			default:
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 136);
toppos = pos[1];
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 137);
leftpos = pos[0]+50;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 138);
break;
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 140);
pos[1] = toppos;
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 141);
pos[0] = leftpos;
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 142);
return pos;
	};
	_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 144);
Y.Introtour.init = function(cardinfo,cardstyle){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "init", 144);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 145);
cardstyle = setcardstyle(cardstyle);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 146);
generateSlideDom("60px","50%",cardinfo[0],'galleryintrotourui-card-welcome','welcome',0);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 147);
for(var i=1;i<cardinfo.length;i++){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 148);
var ci = cardinfo[i],
			elem = document.getElementById(ci.divfocus),
			pos;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 151);
if(elem){
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 152);
pos = findpos(elem),
				id='galleryintrotourui-card-'+i;
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 154);
pos = getCardPos(ci,pos);
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 155);
pos[1] = pos[1]+"px";
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 156);
pos[0] = pos[0]+"px";
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 157);
if(i===cardinfo.length-2){i="end";}
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 158);
generateSlideDom(pos[1],pos[0],ci,id,'',i);
			}
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 161);
generateSlideDom("60px","50%",cardinfo[cardinfo.length-1],'galleryintrotourui-card-endtour','end',0);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 162);
window.scrollTo(0,0);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 163);
Y.one('#galleryintrotourui-card-welcome').setStyle('display','block');
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 164);
Y.on("click",function(){
			_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "(anonymous 3)", 164);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 165);
var seqid = this.getAttribute("data-seqid"),
			carddivid = "";
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 167);
Y.all(".yui-galleryintrotourui-card").setStyle("display","none");
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 168);
if(seqid === "welcome"){
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 169);
carddivid = "#galleryintrotourui-card-1";
			}else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 170);
if(seqid === "end"){
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 171);
carddivid = "#galleryintrotourui-card-endtour";
			}else{
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 173);
seqid++;
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 174);
carddivid = '#galleryintrotourui-card-'+seqid;
			}}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 176);
if(this.getAttribute("id") === "yui-galleryintrotourui-buttontourend-id"){
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 177);
Y.all(".yui-galleryintrotourui-card").setStyle("display","none");
			}else{
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 179);
Y.one(carddivid).setStyle('display','block');
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 180);
if(seqid !== "end"){
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 181);
var toppos = Y.one(carddivid).getStyle('top'),
					leftpos = Y.one(carddivid).getStyle('left');
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 183);
toppos = toppos.split("px");
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 184);
leftpos = leftpos.split("px");
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 185);
window.scrollTo(leftpos[0],toppos[0]);
				}else{
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 187);
window.scrollTo(0,0);
				}
			}
		},".yui-galleryintrotourui-card-next");
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 191);
Y.on("click",function(){
			_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "(anonymous 4)", 191);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 192);
Y.all(".yui-galleryintrotourui-card").setStyle("display","none");
		},".yui-galleryintrotourui-card-closebutton");
	};
}, '0.1.1',{requires: ['node']});


}, '@VERSION@', {"use": ["yui-base", "yui3", "node"], "requires": ["yui-base"]});
