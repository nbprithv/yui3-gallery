gallery-introtour-ui
========

YUI3 Intro Tour UI - Add a feature walkthrough to your pages

SYNOPSIS
========

<script src="http://yui.yahooapis.com/3.8.1/build/yui/yui-min.js"></script>
<script src="https://raw.github.com/nbprithv/introtour-ui/master/yui/gallery-introtour-ui-yui.js"></script> //Or use directly from CDN.
<script type="text/javascript">
YUI().use('gallery-introtour-ui','test', function (Y) {
    var tour_cards = [{'title':'Welcome','position':'pagecenter','content':'Welcome to this feature tour'},
                {'title':'Get Started','content':'This tells you what to do to get started.','target':'hello1','position':'right','width':'100'},
                {'title':'Go here next','content':'Next, you should probably try this out.','target':'hello2','position':'top','height':'125'},
                {'title':'Try this!','content':'This helps you get more information.','target':'hello3','position':'bottom','height':'50'},
                {'title':'Important!','content':'Finally click here to save changes.','target':'hello4','position':'left','width':'50'},
                {'title':'That\'s it! You\'re good to go!','position':'pagecenter'}];
    Y.Introtour.init(tour_cards);
</script>


DESCRIPTION
===========

Use the configuration below, to quickly set up a step by step walkthrough of features on your page. You can position the walkthrough callouts to appear on the right,left,top or bottom of the element you are describing. For the left/right position, give the width of the element. This positions the callout exactly the way you want it. Similarily, give the height of the element when using the top/bottom positioning of the callout. Future features, include a complete customization of the look & feel of the callouts.
