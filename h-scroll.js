var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CLS_ROOT = 'e-hscroll';
    var CLS_RTL = 'e-rtl';
    var CLS_DISABLE = 'e-overlay';
    var CLS_HSCROLLBAR = 'e-hscroll-bar';
    var CLS_HSCROLLCON = 'e-hscroll-content';
    var CLS_NAVARROW = 'e-nav-arrow';
    var CLS_NAVRIGHTARROW = 'e-nav-right-arrow';
    var CLS_NAVLEFTARROW = 'e-nav-left-arrow';
    var CLS_HSCROLLNAV = 'e-scroll-nav';
    var CLS_HSCROLLNAVRIGHT = 'e-scroll-right-nav';
    var CLS_HSCROLLNAVLEFT = 'e-scroll-left-nav';
    var CLS_DEVICE = 'e-scroll-device';
    var CLS_OVERLAY = 'e-scroll-overlay';
    var CLS_RIGHTOVERLAY = 'e-scroll-right-overlay';
    var CLS_LEFTOVERLAY = 'e-scroll-left-overlay';
    var OVERLAY_MAXWID = 40;
    var HScroll = (function (_super) {
        __extends(HScroll, _super);
        function HScroll(options, element) {
            return _super.call(this, options, element) || this;
        }
        HScroll.prototype.preRender = function () {
            this.browser = ej2_base_2.Browser.info.name;
            this.browserCheck = this.browser === 'mozilla';
            this.isDevice = ej2_base_2.Browser.isDevice;
            this.customStep = true;
            var element = this.element;
            this.ieCheck = this.browser === 'edge' || this.browser === 'msie';
            this.initialize();
            if (element.id === '') {
                element.id = ej2_base_1.getUniqueID('hscroll');
                this.uniqueId = true;
            }
            element.style.display = 'block';
            if (this.enableRtl) {
                element.classList.add(CLS_RTL);
            }
        };
        HScroll.prototype.render = function () {
            // Store bound handlers to prevent closure leaks during destroy
            this.boundTouchHandler = this.touchHandler.bind(this);
            this.boundSwipeHandler = this.swipeHandler.bind(this);
            this.touchModule = new ej2_base_1.Touch(this.element, { scroll: this.boundTouchHandler, swipe: this.boundSwipeHandler });
            ej2_base_1.EventHandler.add(this.scrollEle, 'scroll', this.scrollHandler, this);
            if (!this.isDevice) {
                this.createNavIcon(this.element);
            }
            else {
                this.element.classList.add(CLS_DEVICE);
                this.createOverlay(this.element);
            }
            this.setScrollState();
        };
        HScroll.prototype.setScrollState = function () {
            if (ej2_base_3.isNullOrUndefined(this.scrollStep) || this.scrollStep < 0) {
                this.scrollStep = this.scrollEle.offsetWidth;
                this.customStep = false;
            }
            else {
                this.customStep = true;
            }
        };
        HScroll.prototype.initialize = function () {
            var scrollEle = this.createElement('div', { className: CLS_HSCROLLCON });
            var scrollDiv = this.createElement('div', { className: CLS_HSCROLLBAR });
            scrollDiv.setAttribute('tabindex', '-1');
            var ele = this.element;
            var innerEle = [].slice.call(ele.children);
            for (var _i = 0, innerEle_1 = innerEle; _i < innerEle_1.length; _i++) {
                var ele_1 = innerEle_1[_i];
                scrollEle.appendChild(ele_1);
            }
            scrollDiv.appendChild(scrollEle);
            ele.appendChild(scrollDiv);
            scrollDiv.style.overflowX = 'hidden';
            this.scrollEle = scrollDiv;
            this.scrollItems = scrollEle;
        };
        HScroll.prototype.getPersistData = function () {
            var keyEntity = ['scrollStep'];
            return this.addOnPersist(keyEntity);
        };
        HScroll.prototype.getModuleName = function () {
            return 'hScroll';
        };
        HScroll.prototype.destroy = function () {
            var ele = this.element;
            ele.style.display = '';
            ele.classList.remove(CLS_ROOT);
            ele.classList.remove(CLS_DEVICE);
            ele.classList.remove(CLS_RTL);
            var nav = ej2_base_1.selectAll('.e-' + ele.id + '_nav.' + CLS_HSCROLLNAV, ele);
            var overlay = ej2_base_1.selectAll('.' + CLS_OVERLAY, ele);
            [].slice.call(overlay).forEach(function (ele) {
                ej2_base_2.detach(ele);
            });
            if (this.navTouchModules) {
                this.navTouchModules.forEach(function (touchItem) {
                    if ((touchItem.module) {
                        touchItem.module.destroy();
                        touchItem.module = null;
                    }
                    touchItem.element = null;
                });
                this.navTouchModules = [];
                this.navTouchModules = null;
            }
            // Remove stored event listeners to prevent memory leak
            if (this.navEventListeners) {
                var _this_1 = this;
                this.navEventListeners.forEach(function (listener) {
                    listener.element.removeEventListener('keydown', listener.keydown);
                    listener.element.removeEventListener('keyup', listener.keyup);
                    listener.element.removeEventListener('mouseup', listener.mouseup);
                    listener.element.removeEventListener('touchend', listener.touchend);
                    listener.element.removeEventListener('contextmenu', listener.contextmenu);
                    ej2_base_1.EventHandler.remove(listener.element, 'click', _this_1.clickEventHandler, _this_1);
                });
                this.navEventListeners = [];
                this.navEventListeners = null;
            }
            for (var _i = 0, _a = [].slice.call(this.scrollItems.children); _i < _a.length; _i++) {
                var elem = _a[_i];
                ele.appendChild(elem);
            }
            if (this.uniqueId) {
                this.element.removeAttribute('id');
            }
            ej2_base_2.detach(this.scrollEle);
            if (nav.length > 0) {
                ej2_base_2.detach(nav[0]);
                if (!ej2_base_3.isNullOrUndefined(nav[1])) {
                    ej2_base_2.detach(nav[1]);
                }
            }
            ej2_base_1.EventHandler.remove(this.scrollEle, 'scroll', this.scrollHandler, this);
            if (this.timeout) {
                clearInterval(this.timeout);
                this.timeout = null;
            }
            if (this.keyTimer) {
                clearTimeout(this.keyTimer);
                this.keyTimer = null;
            }
            if (this.touchModule) {
                this.touchModule.destroy();
                this.touchModule = null;
            }
            // Null out all stored references to prevent closure leaks
            this.boundTouchHandler = null;
            this.boundSwipeHandler = null;
            this.scrollEle = null;
            this.scrollItems = null;
            _super.prototype.destroy.call(this);
        };
        HScroll.prototype.disable = function (value) {
            var navEles = ej2_base_1.selectAll('.e-scroll-nav:not(.' + CLS_DISABLE + ')', this.element);
            if (value) {
                this.element.classList.add(CLS_DISABLE);
            }
            else {
                this.element.classList.remove(CLS_DISABLE);
            }
            [].slice.call(navEles).forEach(function (el) {
                el.setAttribute('tabindex', !value ? '0' : '-1');
            });
        };
        HScroll.prototype.createOverlay = function (element) {
            var id = element.id.concat('_nav');
            var rightOverlayEle = this.createElement('div', { className: CLS_OVERLAY + ' ' + CLS_RIGHTOVERLAY });
            var clsRight = 'e-' + element.id.concat('_nav ' + CLS_HSCROLLNAV + ' ' + CLS_HSCROLLNAVRIGHT);
            var rightEle = this.createElement('div', { id: id.concat('_right'), className: clsRight });
            var navItem = this.createElement('div', { className: CLS_NAVRIGHTARROW + ' ' + CLS_NAVARROW + ' e-icons' });
            rightEle.appendChild(navItem);
            var leftEle = this.createElement('div', { className: CLS_OVERLAY + ' ' + CLS_LEFTOVERLAY });
            if (this.ieCheck) {
                rightEle.classList.add('e-ie-align');
            }
            element.appendChild(rightOverlayEle);
            element.appendChild(rightEle);
            element.insertBefore(leftEle, element.firstChild);
            this.eventBinding([rightEle]);
        };
        HScroll.prototype.createNavIcon = function (element) {
            var id = element.id.concat('_nav');
            var clsRight = 'e-' + element.id.concat('_nav ' + CLS_HSCROLLNAV + ' ' + CLS_HSCROLLNAVRIGHT);
            var rightAttributes = { 'role': 'button', 'id': id.concat('_right'), 'aria-label': 'Scroll right' };
            var nav = this.createElement('div', { className: clsRight, attrs: rightAttributes });
            nav.setAttribute('aria-disabled', 'false');
            var navItem = this.createElement('div', { className: CLS_NAVRIGHTARROW + ' ' + CLS_NAVARROW + ' e-icons' });
            var clsLeft = 'e-' + element.id.concat('_nav ' + CLS_HSCROLLNAV + ' ' + CLS_HSCROLLNAVLEFT);
            var leftAttributes = { 'role': 'button', 'id': id.concat('_left'), 'aria-label': 'Scroll left' };
            var navEle = this.createElement('div', { className: clsLeft + ' ' + CLS_DISABLE, attrs: leftAttributes });
            navEle.setAttribute('aria-disabled', 'true');
            var navLeftItem = this.createElement('div', { className: CLS_NAVLEFTARROW + ' ' + CLS_NAVARROW + ' e-icons' });
            navEle.appendChild(navLeftItem);
            nav.appendChild(navItem);
            element.appendChild(nav);
            element.insertBefore(navEle, element.firstChild);
            if (this.ieCheck) {
                nav.classList.add('e-ie-align');
                navEle.classList.add('e-ie-align');
            }
            this.eventBinding([nav, navEle]);
        };
        HScroll.prototype.onKeyPress = function (e) {
            var _this = this;
            if (e.key === 'Enter') {
                var timeoutFun_1 = function () {
                    _this.keyTimeout = true;
                    _this.eleScrolling(10, e.target, true);
                };
                this.keyTimer = window.setTimeout(function () {
                    timeoutFun_1();
                }, 100);
            }
        };
        HScroll.prototype.onKeyUp = function (e) {
            if (e.key !== 'Enter') {
                return;
            }
            if (this.keyTimeout) {
                this.keyTimeout = false;
            }
            else {
                e.target.click();
            }
            clearTimeout(this.keyTimer);
        };
        HScroll.prototype.eventBinding = function (ele) {
            var _this = this;
            if (!this.navTouchModules) {
                this.navTouchModules = [];
            }
            if (!this.navEventListeners) {
                this.navEventListeners = [];
            }
            [].slice.call(ele).forEach(function (el) {
                var boundTabHoldHandler = _this.tabHoldHandler.bind(_this);
                var touchModule = new ej2_base_1.Touch(el, { tapHold: boundTabHoldHandler, tapHoldThreshold: 500 });
                _this.navTouchModules.push({ module: touchModule, element: el });
                // Store bound function references for later removal to prevent memory leak
                var onKeyPressBound = _this.onKeyPress.bind(_this);
                var onKeyUpBound = _this.onKeyUp.bind(_this);
                var repeatScrollBound = _this.repeatScroll.bind(_this);
                var contextMenuBound = function (e) { e.preventDefault(); };
                el.addEventListener('keydown', onKeyPressBound);
                el.addEventListener('keyup', onKeyUpBound);
                el.addEventListener('mouseup', repeatScrollBound);
                el.addEventListener('touchend', repeatScrollBound);
                el.addEventListener('contextmenu', contextMenuBound);
                ej2_base_1.EventHandler.add(el, 'click', _this.clickEventHandler, _this);
                
                _this.navEventListeners.push({
                    element: el,
                    keydown: onKeyPressBound,
                    keyup: onKeyUpBound,
                    mouseup: repeatScrollBound,
                    touchend: repeatScrollBound,
                    contextmenu: contextMenuBound
                });
            });
        };
        HScroll.prototype.repeatScroll = function () {
            clearInterval(this.timeout);
        };
        HScroll.prototype.tabHoldHandler = function (e) {
            var _this = this;
            var trgt = e.originalEvent.target;
            trgt = this.contains(trgt, CLS_HSCROLLNAV) ? trgt.firstElementChild : trgt;
            var scrollDis = 10;
            var timeoutFun = function () {
                _this.eleScrolling(scrollDis, trgt, true);
            };
            this.timeout = window.setInterval(function () {
                timeoutFun();
            }, 50);
        };
        HScroll.prototype.contains = function (ele, className) {
            return ele.classList.contains(className);
        };
        HScroll.prototype.eleScrolling = function (scrollDis, trgt, isContinuous) {
            var rootEle = this.element;
            var classList = trgt.classList;
            if (classList.contains(CLS_HSCROLLNAV)) {
                classList = trgt.querySelector('.' + CLS_NAVARROW).classList;
            }
            if (this.contains(rootEle, CLS_RTL) && this.browserCheck) {
                scrollDis = -scrollDis;
            }
            if ((!this.contains(rootEle, CLS_RTL) || this.browserCheck) || this.ieCheck) {
                if (classList.contains(CLS_NAVRIGHTARROW)) {
                    this.frameScrollRequest(scrollDis, 'add', isContinuous);
                }
                else {
                    this.frameScrollRequest(scrollDis, '', isContinuous);
                }
            }
            else {
                if (classList.contains(CLS_NAVLEFTARROW)) {
                    this.frameScrollRequest(scrollDis, 'add', isContinuous);
                }
                else {
                    this.frameScrollRequest(scrollDis, '', isContinuous);
                }
            }
        };
        HScroll.prototype.clickEventHandler = function (e) {
            this.eleScrolling(this.scrollStep, e.target, false);
        };
        HScroll.prototype.swipeHandler = function (e) {
            var swipeEle = this.scrollEle;
            var distance;
            if (e.velocity <= 1) {
                distance = e.distanceX / (e.velocity * 10);
            }
            else {
                distance = e.distanceX / e.velocity;
            }
            var start = 0.5;
            var animate = function () {
                var step = Math.sin(start);
                if (step <= 0) {
                    window.cancelAnimationFrame(step);
                }
                else {
                    if (e.swipeDirection === 'Left') {
                        swipeEle.scrollLeft += distance * step;
                    }
                    else if (e.swipeDirection === 'Right') {
                        swipeEle.scrollLeft -= distance * step;
                    }
                    start -= 0.5;
                    window.requestAnimationFrame(animate);
                }
            };
            animate();
        };
        HScroll.prototype.scrollUpdating = function (scrollVal, action) {
            if (action === 'add') {
                this.scrollEle.scrollLeft += scrollVal;
            }
            else {
                this.scrollEle.scrollLeft -= scrollVal;
            }
            if (this.enableRtl && this.scrollEle.scrollLeft > 0) {
                this.scrollEle.scrollLeft = 0;
            }
        };
        HScroll.prototype.frameScrollRequest = function (scrollVal, action, isContinuous) {
            var _this = this;
            var step = 10;
            if (isContinuous) {
                this.scrollUpdating(scrollVal, action);
                return;
            }
            if (!this.customStep) {
                [].slice.call(ej2_base_1.selectAll('.' + CLS_OVERLAY, this.element)).forEach(function (el) {
                    scrollVal -= el.offsetWidth;
                });
            }
            var animate = function () {
                var scrollValue;
                var scrollStep;
                if (_this.contains(_this.element, CLS_RTL) && _this.browserCheck) {
                    scrollValue = -scrollVal;
                    scrollStep = -step;
                }
                else {
                    scrollValue = scrollVal;
                    scrollStep = step;
                }
                if (scrollValue < step) {
                    window.cancelAnimationFrame(scrollStep);
                }
                else {
                    _this.scrollUpdating(scrollStep, action);
                    scrollVal -= scrollStep;
                    window.requestAnimationFrame(animate);
                }
            };
            animate();
        };
        HScroll.prototype.touchHandler = function (e) {
            var ele = this.scrollEle;
            var distance = e.distanceX;
            if ((this.ieCheck) && this.contains(this.element, CLS_RTL)) {
                distance = -distance;
            }
            if (e.scrollDirection === 'Left') {
                ele.scrollLeft = ele.scrollLeft + distance;
            }
            else if (e.scrollDirection === 'Right') {
                ele.scrollLeft = ele.scrollLeft - distance;
            }
        };
        HScroll.prototype.arrowDisabling = function (addDisable, removeDisable) {
            if (this.isDevice) {
                var arrowEle = ej2_base_3.isNullOrUndefined(addDisable) ? removeDisable : addDisable;
                var arrowIcon = arrowEle.querySelector('.' + CLS_NAVARROW);
                if (ej2_base_3.isNullOrUndefined(addDisable)) {
                    ej2_base_3.classList(arrowIcon, [CLS_NAVRIGHTARROW], [CLS_NAVLEFTARROW]);
                }
                else {
                    ej2_base_3.classList(arrowIcon, [CLS_NAVLEFTARROW], [CLS_NAVRIGHTARROW]);
                }
            }
            else if (addDisable && removeDisable) {
                addDisable.classList.add(CLS_DISABLE);
                addDisable.setAttribute('aria-disabled', 'true');
                addDisable.removeAttribute('tabindex');
                removeDisable.classList.remove(CLS_DISABLE);
                removeDisable.setAttribute('aria-disabled', 'false');
                removeDisable.setAttribute('tabindex', '0');
            }
            this.repeatScroll();
        };
        HScroll.prototype.scrollHandler = function (e) {
            var target = e.target;
            var width = target.offsetWidth;
            var rootEle = this.element;
            var navLeftEle = this.element.querySelector('.' + CLS_HSCROLLNAVLEFT);
            var navRightEle = this.element.querySelector('.' + CLS_HSCROLLNAVRIGHT);
            var leftOverlay = this.element.querySelector('.' + CLS_LEFTOVERLAY);
            var rightOverlay = this.element.querySelector('.' + CLS_RIGHTOVERLAY);
            var scrollLeft = target.scrollLeft;
            if (scrollLeft <= 0) {
                scrollLeft = -scrollLeft;
            }
            if (this.isDevice) {
                if (this.enableRtl && !(this.browserCheck || this.ieCheck)) {
                    leftOverlay = this.element.querySelector('.' + CLS_RIGHTOVERLAY);
                    rightOverlay = this.element.querySelector('.' + CLS_LEFTOVERLAY);
                }
                if (scrollLeft < OVERLAY_MAXWID) {
                    leftOverlay.style.width = scrollLeft + 'px';
                }
                else {
                    leftOverlay.style.width = '40px';
                }
                if ((target.scrollWidth - Math.ceil(width + scrollLeft)) < OVERLAY_MAXWID) {
                    rightOverlay.style.width = (target.scrollWidth - Math.ceil(width + scrollLeft)) + 'px';
                }
                else {
                    rightOverlay.style.width = '40px';
                }
            }
            if (scrollLeft === 0) {
                this.arrowDisabling(navLeftEle, navRightEle);
            }
            else if (Math.ceil(width + scrollLeft + .1) >= target.scrollWidth) {
                this.arrowDisabling(navRightEle, navLeftEle);
            }
            else {
                var disEle = this.element.querySelector('.' + CLS_HSCROLLNAV + '.' + CLS_DISABLE);
                if (disEle) {
                    disEle.classList.remove(CLS_DISABLE);
                    disEle.setAttribute('aria-disabled', 'false');
                    disEle.setAttribute('tabindex', '0');
                }
            }
        };
        HScroll.prototype.onPropertyChanged = function (newProp, oldProp) {
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'scrollStep':
                        this.setScrollState();
                        break;
                    case 'enableRtl':
                        newProp.enableRtl ? this.element.classList.add(CLS_RTL) : this.element.classList.remove(CLS_RTL);
                        break;
                }
            }
        };
        __decorate([
            ej2_base_2.Property(null)
        ], HScroll.prototype, "scrollStep", void 0);
        HScroll = __decorate([
            ej2_base_2.NotifyPropertyChanges
        ], HScroll);
        return HScroll;
    }(ej2_base_1.Component));
    exports.HScroll = HScroll;
});
