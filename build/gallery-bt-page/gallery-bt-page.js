YUI.add('gallery-bt-page', function (Y, NAME) {

/**
 *
 * Provides Page widget which changes width and height with viewport.
 *
 * @module gallery-bt-page
 */

var ADDCHILD = 'addChild',
    current,
    instances = [];

/**
 * A basic Page Widget, which will automatically adapt the browser width
 * and height. Only one page will show in the same time. Use active
 * function can hide current page and show the other page. It also has
 * header and footer fixed support.
 *
 * @class Page
 * @constructor
 * @namespace Bottle
 * @extends PushPop
 * @uses WidgetParent
 * @uses WidgetPosition
 * @uses WidgetStack
 * @uses Bottle.PushPop
 * @param [config] {Object} Object literal with initial attribute values
 */
Y.Bottle.Page = Y.Base.create('btpage', Y.Widget, [Y.WidgetParent, Y.WidgetPosition, Y.WidgetStack, Y.Bottle.PushPop], {
    initializer: function () {
        instances.push(current = this);

        if (this.get('nativeScroll')) {
            this.get('boundingBox').addClass('btp-native');
        }

        this._bpgEventHandlers = new Y.EventHandle([
            this.after(ADDCHILD, this._afterPGAddChild)
        ]);
    },

    destructor: function () {
        this._bpgEventHandlers.detach();
        delete this._bpgEventHandlers;
    },

    /**
     * handle nativeScroll attribute when children added
     *
     * @method _afterPGAddChild
     * @protected
     */
    _afterPGAddChild: function (E) {
        E.child.set('nativeScroll', this.get('nativeScroll'));
    },

    /**
     * Resize the page to adapt the browser width and height. If the page enable the nativeScroll configuration, the widget height will not be touched
     *
     * @method resize
     */
    resize: function () {
        var W = Y.Bottle.Device.getBrowserWidth(),
            H = Y.Bottle.Device.getBrowserHeight();

        //reduce syncUI times
        if ((this.get('width') === W) && (this.get('height') === H)) {
            return;
        }

        if (this.get('nativeScroll')) {
            Y.fire('btSyncScreen');
            return;
        }
        
        this.setAttrs({width: W, height: H});
    }
}, {
    /**
     * Static property used to define the default attribute configuration.
     *
     * @property ATTRS
     * @protected
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Use native browser scroll
         *
         * @attribute action
         * @type String
         * @default unveil
         */
        nativeScroll: {
            value: true,
            validator: Y.Lang.isBool,
            writeOnce: 'initOnly'
        }
    },

    /**
     * Static property used to define the default HTML parsing rules
     *
     * @property HTML_PARSER
     * @protected
     * @static
     * @type Object
     */
    HTML_PARSER: {
        nativeScroll: function (srcNode) {
            var D = srcNode.getData('native-scroll');

            if (D === 'false') {
                return false;
            }

            if (D === 'true') {
                return true;
            }
            return Y.Bottle.Device.getTouchSupport();
        }
    },

    /**
     * Get all instances of Page
     *
     * @method getInstances
     * @static
     * @return {Array} all instances of Page
     */
    getInstances: function () {
        return instances;
    },

    /**
     * Scroll the page to a position or a Node, works in scrollView mode and native scroll mode.
     *
     * @method scrollTo
     * @param position {Number|Node} the Y position or the Node to scroll into viewport.
     * @param [duration] {Number} ms of the scroll animation.
     * @static
     */
    scrollTo: function (position, duration) {
        var S = current ? current.topScroll() : null,
            Y;
        if (current && !current.get('nativeScroll')) {
            if (position.getY) {
                Y = S.get('scrollY');
                S.scrollTo(0, 0, 0);
                position = position.getY() - S.get('boundingBox').getY();
                S.scrollTo(0, Y, 0);
            }
            S.scrollTo(0, position, duration);
        } else {
            window.scrollTo(0, position.getY ? position.getY() : position);
        }
    },

    /**
     * Get current visible Page
     *
     * @method getCurrent
     * @static
     * @return {Object | undefined} current visible Page. If no any visible Page, return undefined.
     */
    getCurrent: function () {
        return current;
    },

    /**
     * Get scroll position for both native scroll or Page Container scrollView.
     *
     * @method lazyLoad
     * @return scrollY {Number} the position of vertical scroll
     */
    getScrollY: function () {
        return (Y.Bottle.get('nativeScroll') || !current) ? Y.DOM.docScrollY() : current.topScroll().get('scrollY');
    },

    /**
     * Run callback function when native scroll end or Page Container scroll end.
     *
     * @method lazyLoad
     * @param cb {Function} do callback when scroll end
     */
    onScroll: function (cb) {
        if (!cb) {
            return;
        }

        if (Y.Bottle.get('nativeScroll')) {
            Y.on('scroll', cb);
        } else {
            current.topScroll().on('scrollEnd', cb);
        }
    },

    /**
     * Update content size and scroll position
     *
     * @method updateContent
     * @static
     */
    updateContent: function () {
        var s = current.topScroll();

        if (s) {
            s._uiDimensionsChange();
            if (s && s._maxScrollY) {
                s.scrollTo(s.get('scrollX'), Math.min(s.get('scrollY'), s._maxScrollY));
            }
        }
    }
});


}, 'gallery-2013.02.27-21-03', {"requires": ["widget-position", "widget-stack", "gallery-bt-pushpop"]});
