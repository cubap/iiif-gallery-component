(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TinyEmitter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function E () {
	// Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
	on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;

},{}]},{},[1])(1)
});
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.baseComponent=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){var _Components;!function(_Components){function applyMixins(derivedCtor,baseCtors){baseCtors.forEach(function(baseCtor){Object.getOwnPropertyNames(baseCtor.prototype).forEach(function(name){derivedCtor.prototype[name]=baseCtor.prototype[name]})})}var BaseComponent=function(){function BaseComponent(options){this.options=$.extend(this._getDefaultOptions(),options)}return BaseComponent.prototype._init=function(){return this._$element=$(this.options.element),this._$element.length?(this._$element.empty(),!0):(console.warn("element not found"),!1)},BaseComponent.prototype._getDefaultOptions=function(){return{}},BaseComponent.prototype._emit=function(event){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];this.emit(event,args)},BaseComponent.prototype._resize=function(){},BaseComponent.prototype.databind=function(data){},BaseComponent}();_Components.BaseComponent=BaseComponent,_Components.applyMixins=applyMixins,applyMixins(BaseComponent,[TinyEmitter])}(_Components||(_Components={})),function(w){w._Components||(w._Components=_Components)}(window)},{}]},{},[1])(1)});
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.iiifGalleryComponent=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){var IIIFComponents,__extends=this&&this.__extends||function(d,b){function __(){this.constructor=d}for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p]);d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)};!function(IIIFComponents){var GalleryComponent=function(_super){function GalleryComponent(options){_super.call(this,options),this._scrollStopDuration=100,this._init(),this._resize()}return __extends(GalleryComponent,_super),GalleryComponent.prototype._init=function(){var _this=this,success=_super.prototype._init.call(this);return success||console.error("Component failed to initialise"),this._$header=$('<div class="header"></div>'),this._$element.append(this._$header),this._$sizeDownButton=$('<input class="btn btn-default size-down" type="button" value="-" />'),this._$header.append(this._$sizeDownButton),this._$sizeRange=$('<input type="range" name="size" min="1" max="10" value="6" />'),this._$header.append(this._$sizeRange),this._$sizeUpButton=$('<input class="btn btn-default size-up" type="button" value="+" />'),this._$header.append(this._$sizeUpButton),this._$main=$('<div class="main"></div>'),this._$element.append(this._$main),this._$thumbs=$('<div class="thumbs"></div>'),this._$main.append(this._$thumbs),this._$thumbs.addClass(this.options.helper.getViewingDirection().toString()),this._$sizeDownButton.on("click",function(){var val=Number(_this._$sizeRange.val())-1;val>=Number(_this._$sizeRange.attr("min"))&&(_this._$sizeRange.val(val.toString()),_this._$sizeRange.trigger("change"),_this._emit(GalleryComponent.Events.DECREASE_SIZE))}),this._$sizeUpButton.on("click",function(){var val=Number(_this._$sizeRange.val())+1;val<=Number(_this._$sizeRange.attr("max"))&&(_this._$sizeRange.val(val.toString()),_this._$sizeRange.trigger("change"),_this._emit(GalleryComponent.Events.INCREASE_SIZE))}),this._$sizeRange.on("change",function(){_this.updateThumbs(),_this.scrollToThumb(_this.getSelectedThumbIndex())}),this._setRange(),$.templates({galleryThumbsTemplate:'                    <div class="{{:~className()}}" data-src="{{>uri}}" data-index="{{>index}}" data-visible="{{>visible}}" data-width="{{>width}}" data-height="{{>height}}" data-initialwidth="{{>initialWidth}}" data-initialheight="{{>initialHeight}}">                        <div class="wrap" style="width:{{>initialWidth}}px; height:{{>initialHeight}}px" data-link="class{merge:multiSelected toggle=\'multiSelected\'}">                        {^{if multiSelectEnabled}}                            <input id="thumb-checkbox-{{>id}}" type="checkbox" data-link="checked{:multiSelected ? \'checked\' : \'\'}" class="multiSelect" />                        {{/if}}                        </div>                        <span class="index">{{:#index + 1}}</span>                        <span class="label" style="width:{{>initialWidth}}px" title="{{>label}}">{{>label}}&nbsp;</span>                    </div>'}),$.views.helpers({className:function(){var className="thumb preLoad";return 0===this.data.index&&(className+=" first"),this.data.uri||(className+=" placeholder"),className}}),this._$main.on("scroll",function(){_this.updateThumbs()},this.options.scrollStopDuration),this.options.sizingEnabled||this._$sizeRange.hide(),success},GalleryComponent.prototype._getDefaultOptions=function(){return{helper:null,scrollStopDuration:100,chunkedResizingEnabled:!0,chunkedResizingThreshold:400,pageModeEnabled:!1,sizingEnabled:!0}},GalleryComponent.prototype.databind=function(){this.thumbs&&(this._reset(),this.createThumbs())},GalleryComponent.prototype.createThumbs=function(){var that=this;if(this.thumbs){this.isChunkedResizingEnabled()&&this._$thumbs.addClass("chunked");for(var heights=[],i=0;i<this.thumbs.length;i++){var thumb=this.thumbs[i],initialWidth=thumb.width,initialHeight=thumb.height;thumb.initialWidth=initialWidth,heights.push(initialHeight)}for(var medianHeight=Math.median(heights),j=0;j<this.thumbs.length;j++){var thumb=this.thumbs[j];thumb.initialHeight=medianHeight}this._$thumbs.link($.templates.galleryThumbsTemplate,this.thumbs),that._multiSelectState.isEnabled?$.each(this._$thumbs.find(".thumb"),function(index,thumb){var $thumb=$(thumb);$thumb.checkboxButton(function(checked){var thumb=$.view(this).data;that._setThumbMultiSelected(thumb,!thumb.multiSelected),that._emit(GalleryComponent.Events.THUMB_MULTISELECTED,thumb)})}):this._$thumbs.delegate(".thumb","click",function(e){e.preventDefault();var thumb=$.view(this).data;that._lastThumbClickedIndex=thumb.index,that._emit(GalleryComponent.Events.THUMB_SELECTED,thumb)}),this.selectIndex(this.options.helper.canvasIndex),this.setLabel(),this.updateThumbs()}},GalleryComponent.prototype._getThumbsByRange=function(range){for(var thumbs=[],i=0;i<this.thumbs.length;i++){var thumb=this.thumbs[i],canvas=thumb.data,r=this.options.helper.getCanvasRange(canvas,range.path);r&&r.id===range.id&&thumbs.push(thumb)}return thumbs},GalleryComponent.prototype.updateThumbs=function(){},GalleryComponent.prototype.isChunkedResizingEnabled=function(){return!!(this.options.chunkedResizingEnabled&&this.thumbs.length>this.options.chunkedResizingThreshold)},GalleryComponent.prototype.getSelectedThumbIndex=function(){return Number(this._$selectedThumb.data("index"))},GalleryComponent.prototype.getAllThumbs=function(){return this._thumbsCache||(this._thumbsCache=this._$thumbs.find(".thumb")),this._thumbsCache},GalleryComponent.prototype.getThumbByIndex=function(canvasIndex){return this._$thumbs.find('[data-index="'+canvasIndex+'"]')},GalleryComponent.prototype.scrollToThumb=function(canvasIndex){var $thumb=this.getThumbByIndex(canvasIndex);this._$main.scrollTop($thumb.position().top)},GalleryComponent.prototype.searchPreviewStart=function(canvasIndex){this.scrollToThumb(canvasIndex);var $thumb=this.getThumbByIndex(canvasIndex);$thumb.addClass("searchpreview")},GalleryComponent.prototype.searchPreviewFinish=function(){this.scrollToThumb(this.options.helper.canvasIndex),this.getAllThumbs().removeClass("searchpreview")},GalleryComponent.prototype.selectIndex=function(index){index!==-1&&this.thumbs&&this.thumbs.length&&(index=parseInt(index),this.getAllThumbs().removeClass("selected"),this._$selectedThumb=this.getThumbByIndex(index),this._$selectedThumb.addClass("selected"),this.updateThumbs())},GalleryComponent.prototype.setLabel=function(){this.options.pageModeEnabled?($(this._$thumbs).find("span.index").hide(),$(this._$thumbs).find("span.label").show()):($(this._$thumbs).find("span.index").show(),$(this._$thumbs).find("span.label").hide())},GalleryComponent.prototype._setRange=function(){var norm=Math.normalise(Number(this._$sizeRange.val()),0,10);this._range=Math.clamp(norm,.05,1)},GalleryComponent.prototype._setThumbMultiSelected=function(thumb,selected){$.observable(thumb).setProperty("multiSelected",selected)},GalleryComponent.prototype._setMultiSelectEnabled=function(enabled){for(var i=0;i<this.thumbs.length;i++){var thumb=this.thumbs[i];thumb.multiSelectEnabled=enabled}},GalleryComponent.prototype._reset=function(){this._$thumbs.undelegate(".thumb","click"),this._setMultiSelectEnabled(this._multiSelectState.isEnabled)},GalleryComponent.prototype._resize=function(){},GalleryComponent}(_Components.BaseComponent);IIIFComponents.GalleryComponent=GalleryComponent}(IIIFComponents||(IIIFComponents={}));var IIIFComponents;!function(IIIFComponents){var GalleryComponent;!function(GalleryComponent){var Events=function(){function Events(){}return Events.DECREASE_SIZE="decreaseSize",Events.INCREASE_SIZE="increaseSize",Events.THUMB_SELECTED="thumbSelected",Events.THUMB_MULTISELECTED="thumbMultiSelected",Events}();GalleryComponent.Events=Events}(GalleryComponent=IIIFComponents.GalleryComponent||(IIIFComponents.GalleryComponent={}))}(IIIFComponents||(IIIFComponents={})),function(w){w.IIIFComponents?w.IIIFComponents.GalleryComponent=IIIFComponents.GalleryComponent:w.IIIFComponents=IIIFComponents}(window)},{}]},{},[1])(1)});