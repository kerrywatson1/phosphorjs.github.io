/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var phosphor_panel_1 = __webpack_require__(1);
	var phosphor_splitpanel_1 = __webpack_require__(20);
	var phosphor_tabs_1 = __webpack_require__(30);
	var phosphor_widget_1 = __webpack_require__(8);
	__webpack_require__(41);
	/**
	 * A widget which uses CSS flexbox to layout its children.
	 */
	var MyVBox = (function (_super) {
	    __extends(MyVBox, _super);
	    function MyVBox() {
	        _super.call(this);
	        this.addClass('my-vbox');
	    }
	    return MyVBox;
	})(phosphor_panel_1.Panel);
	/**
	 * A widget which logs its resize messages.
	 */
	var MyResizeWidget = (function (_super) {
	    __extends(MyResizeWidget, _super);
	    function MyResizeWidget() {
	        _super.apply(this, arguments);
	    }
	    // All widgets will receive a resize message when their parent
	    // determines that they have likely been resized. If the current
	    // size of the widget is known, it will be passed as part of the
	    // message. Otherwise, the size parameters will be `-1`, and the
	    // the node will need to be measured to get the current size.
	    //
	    // The current size will typically be known when the parent of
	    // the widget is an absolute Phosphor layout panel, and will be
	    // unknown when the parent is a widget which uses CSS to layout
	    // its children.
	    MyResizeWidget.prototype.onResize = function (msg) {
	        var w = msg.width;
	        var h = msg.height;
	        console.log(this.node.className, 'width:', w, 'height:', h);
	    };
	    return MyResizeWidget;
	})(phosphor_widget_1.Widget);
	/**
	 * A widget which hosts a CodeMirror editor.
	 */
	var CodeMirrorWidget = (function (_super) {
	    __extends(CodeMirrorWidget, _super);
	    function CodeMirrorWidget(config) {
	        _super.call(this);
	        this.addClass('CodeMirrorWidget');
	        this._editor = CodeMirror(this.node, config);
	    }
	    Object.defineProperty(CodeMirrorWidget.prototype, "editor", {
	        get: function () {
	            return this._editor;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CodeMirrorWidget.prototype.loadTarget = function (target) {
	        var doc = this._editor.getDoc();
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', target);
	        xhr.onreadystatechange = function () { return doc.setValue(xhr.responseText); };
	        xhr.send();
	    };
	    CodeMirrorWidget.prototype.onAfterAttach = function (msg) {
	        this._editor.refresh();
	    };
	    CodeMirrorWidget.prototype.onResize = function (msg) {
	        if (msg.width < 0 || msg.height < 0) {
	            this._editor.refresh();
	        }
	        else {
	            this._editor.setSize(msg.width, msg.height);
	        }
	    };
	    return CodeMirrorWidget;
	})(phosphor_widget_1.Widget);
	/**
	 * Create a placeholder content widget.
	 */
	function createContent(name) {
	    var widget = new MyResizeWidget();
	    widget.addClass('content');
	    widget.addClass(name);
	    return widget;
	}
	/**
	 * The main application entry point.
	 */
	function main() {
	    var red = createContent('red');
	    var yellow = createContent('yellow');
	    var green = createContent('green');
	    var blue1 = createContent('blue');
	    var blue2 = createContent('blue');
	    var blue3 = createContent('blue');
	    var blue4 = createContent('blue');
	    var split = new phosphor_splitpanel_1.SplitPanel();
	    split.addChild(blue1);
	    split.addChild(blue2);
	    split.addChild(blue3);
	    split.addChild(blue4);
	    var box = new MyVBox();
	    box.addChild(red);
	    box.addChild(split);
	    box.addChild(yellow);
	    box.addChild(green);
	    box.title.text = 'Demo';
	    var cmSource = new CodeMirrorWidget({
	        mode: 'text/typescript',
	        lineNumbers: true,
	        tabSize: 2,
	    });
	    cmSource.loadTarget('./index.ts');
	    cmSource.title.text = 'Source';
	    var cmCss = new CodeMirrorWidget({
	        mode: 'text/css',
	        lineNumbers: true,
	        tabSize: 2,
	    });
	    cmCss.loadTarget('./index.css');
	    cmCss.title.text = 'CSS';
	    var panel = new phosphor_tabs_1.TabPanel();
	    panel.id = 'main';
	    panel.addChild(box);
	    panel.addChild(cmSource);
	    panel.addChild(cmCss);
	    panel.attach(document.body);
	    window.onresize = function () { panel.update(); };
	}
	window.onload = main;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(19));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var arrays = __webpack_require__(3);
	var phosphor_messaging_1 = __webpack_require__(4);
	var phosphor_widget_1 = __webpack_require__(8);
	/**
	 * A concrete layout implementation suitable for many use cases.
	 *
	 * #### Notes
	 * This class is suitable as a base class for implementing a variety of
	 * layouts, but can also be used directly with standard CSS to layout a
	 * collection of widgets.
	 */
	var PanelLayout = (function (_super) {
	    __extends(PanelLayout, _super);
	    function PanelLayout() {
	        _super.apply(this, arguments);
	        this._children = [];
	    }
	    /**
	     * Dispose of the resources held by the layout.
	     *
	     * #### Notes
	     * This will dispose all current child widgets of the layout.
	     */
	    PanelLayout.prototype.dispose = function () {
	        while (this._children.length > 0) {
	            this._children.pop().dispose();
	        }
	        _super.prototype.dispose.call(this);
	    };
	    /**
	     * Get the number of child widgets in the layout.
	     *
	     * @returns The number of child widgets in the layout.
	     */
	    PanelLayout.prototype.childCount = function () {
	        return this._children.length;
	    };
	    /**
	     * Get the child widget at the specified index.
	     *
	     * @param index - The index of the child widget of interest.
	     *
	     * @returns The child at the specified index, or `undefined`.
	     */
	    PanelLayout.prototype.childAt = function (index) {
	        return this._children[index];
	    };
	    /**
	     * Add a child widget to the end of the layout.
	     *
	     * @param child - The child widget to add to the layout.
	     *
	     * #### Notes
	     * If the child is already contained in the layout, it will be moved.
	     */
	    PanelLayout.prototype.addChild = function (child) {
	        this.insertChild(this.childCount(), child);
	    };
	    /**
	     * Insert a child widget into the layout at the specified index.
	     *
	     * @param index - The index at which to insert the child widget.
	     *
	     * @param child - The child widget to insert into the layout.
	     *
	     * #### Notes
	     * If the child is already contained in the layout, it will be moved.
	     */
	    PanelLayout.prototype.insertChild = function (index, child) {
	        child.parent = this.parent;
	        var n = this._children.length;
	        var i = this._children.indexOf(child);
	        var j = Math.max(0, Math.min(index | 0, n));
	        if (i !== -1) {
	            if (j === n)
	                j--;
	            if (i === j)
	                return;
	            arrays.move(this._children, i, j);
	            if (this.parent)
	                this.moveChild(i, j, child);
	        }
	        else {
	            arrays.insert(this._children, j, child);
	            if (this.parent)
	                this.attachChild(j, child);
	        }
	    };
	    /**
	     * Remove a child widget from the layout.
	     *
	     * @param child - The child widget to remove from the layout.
	     *
	     * #### Notes
	     * A child widget will be removed from the layout automatically when
	     * its `parent` is set to `null`. This method should only be invoked
	     * directly when removing a widget from a layout which has yet to be
	     * installed on a parent widget.
	     *
	     * This method does *not* modify the widget's `parent`.
	     *
	     * If the child is not contained in the layout, this is a no-op.
	     */
	    PanelLayout.prototype.removeChild = function (child) {
	        var i = arrays.remove(this._children, child);
	        if (i !== -1 && this.parent)
	            this.detachChild(i, child);
	    };
	    /**
	     * Initialize the children of the layout.
	     *
	     * #### Notes
	     * This method is called automatically when the layout is installed
	     * on its parent widget.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    PanelLayout.prototype.initialize = function () {
	        for (var i = 0; i < this.childCount(); ++i) {
	            var child = this.childAt(i);
	            child.parent = this.parent;
	            this.attachChild(i, child);
	        }
	    };
	    /**
	     * Attach a child widget to the parent's DOM node.
	     *
	     * @param index - The current index of the child in the layout.
	     *
	     * @param child - The child widget to attach to the parent.
	     *
	     * #### Notes
	     * This method is called automatically by the panel layout at the
	     * appropriate time. It should not be called directly by user code.
	     *
	     * The default implementation adds the child's node to the parent's
	     * node at the proper location, and sends an `'after-attach'` message
	     * to the child if the parent is attached to the DOM.
	     *
	     * Subclasses may reimplement this method to control how the child's
	     * node is added to the parent's node, but the reimplementation must
	     * send an `'after-attach'` message to the child if the parent is
	     * attached to the DOM.
	     */
	    PanelLayout.prototype.attachChild = function (index, child) {
	        var ref = this.parent.node.children[index];
	        this.parent.node.insertBefore(child.node, ref);
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgAfterAttach);
	    };
	    /**
	     * Move a child widget in the parent's DOM node.
	     *
	     * @param fromIndex - The previous index of the child in the layout.
	     *
	     * @param toIndex - The current index of the child in the layout.
	     *
	     * @param child - The child widget to move in the parent.
	     *
	     * #### Notes
	     * This method is called automatically by the panel layout at the
	     * appropriate time. It should not be called directly by user code.
	     *
	     * The default implementation moves the child's node to the proper
	     * location in the parent's node and sends both a `'before-detach'`
	     * and an `'after-attach'` message to the child if the parent is
	     * attached to the DOM.
	     *
	     * Subclasses may reimplement this method to control how the child's
	     * node is moved in the parent's node, but the reimplementation must
	     * send both a `'before-detach'` and an `'after-attach'` message to
	     * the child if the parent is attached to the DOM.
	     */
	    PanelLayout.prototype.moveChild = function (fromIndex, toIndex, child) {
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgBeforeDetach);
	        this.parent.node.removeChild(child.node);
	        var ref = this.parent.node.children[toIndex];
	        this.parent.node.insertBefore(child.node, ref);
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgAfterAttach);
	    };
	    /**
	     * Detach a child widget from the parent's DOM node.
	     *
	     * @param index - The previous index of the child in the layout.
	     *
	     * @param child - The child widget to detach from the parent.
	     *
	     * #### Notes
	     * This method is called automatically by the panel layout at the
	     * appropriate time. It should not be called directly by user code.
	     *
	     * The default implementation removes the child's node from the
	     * parent's node, and sends a `'before-detach'` message to the child
	     * if the parent is attached to the DOM.
	     *
	     * Subclasses may reimplement this method to control how the child's
	     * node is removed from the parent's node, but the reimplementation
	     * must send a `'before-detach'` message to the child if the parent
	     * is attached to the DOM.
	     */
	    PanelLayout.prototype.detachChild = function (index, child) {
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgBeforeDetach);
	        this.parent.node.removeChild(child.node);
	    };
	    /**
	     * A message handler invoked on a `'child-removed'` message.
	     *
	     * #### Notes
	     * This will remove the child from the layout.
	     *
	     * Subclasses should **not** typically reimplement this method.
	     */
	    PanelLayout.prototype.onChildRemoved = function (msg) {
	        this.removeChild(msg.child);
	    };
	    return PanelLayout;
	})(phosphor_widget_1.AbstractLayout);
	exports.PanelLayout = PanelLayout;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	/**
	 * Execute a callback for each element in an array.
	 *
	 * @param array - The array of values to iterate.
	 *
	 * @param callback - The callback to invoke for the array elements.
	 *
	 * @param fromIndex - The starting index for iteration.
	 *
	 * @param wrap - Whether iteration wraps around at the end of the array.
	 *
	 * @returns The first value returned by `callback` which is not
	 *   equal to `undefined`, or `undefined` if the callback does
	 *   not return a value or if the start index is out of range.
	 *
	 * #### Notes
	 * It is not safe to modify the size of the array while iterating.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * function logger(value: number): void {
	 *   console.log(value);
	 * }
	 *
	 * let data = [1, 2, 3, 4];
	 * arrays.forEach(data, logger);           // logs 1, 2, 3, 4
	 * arrays.forEach(data, logger, 2);        // logs 3, 4
	 * arrays.forEach(data, logger, 2, true);  // logs 3, 4, 1, 2
	 * arrays.forEach(data, (v, i) => {        // 2
	 *   if (v === 3) return i;
	 * });
	 * ```
	 *
	 * **See also** [[rforEach]]
	 */
	function forEach(array, callback, fromIndex, wrap) {
	    if (fromIndex === void 0) { fromIndex = 0; }
	    if (wrap === void 0) { wrap = false; }
	    var start = fromIndex | 0;
	    if (start < 0 || start >= array.length) {
	        return void 0;
	    }
	    if (wrap) {
	        for (var i = 0, n = array.length; i < n; ++i) {
	            var j = (start + i) % n;
	            var result = callback(array[j], j);
	            if (result !== void 0)
	                return result;
	        }
	    }
	    else {
	        for (var i = start, n = array.length; i < n; ++i) {
	            var result = callback(array[i], i);
	            if (result !== void 0)
	                return result;
	        }
	    }
	    return void 0;
	}
	exports.forEach = forEach;
	/**
	 * Execute a callback for each element in an array, in reverse.
	 *
	 * @param array - The array of values to iterate.
	 *
	 * @param callback - The callback to invoke for the array elements.
	 *
	 * @param fromIndex - The starting index for iteration.
	 *
	 * @param wrap - Whether iteration wraps around at the end of the array.
	 *
	 * @returns The first value returned by `callback` which is not
	 *   equal to `undefined`, or `undefined` if the callback does
	 *   not return a value or if the start index is out of range.
	 *
	 * #### Notes
	 * It is not safe to modify the size of the array while iterating.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * function logger(value: number): void {
	 *   console.log(value);
	 * }
	 *
	 * let data = [1, 2, 3, 4];
	 * arrays.rforEach(data, logger);           // logs 4, 3, 2, 1
	 * arrays.rforEach(data, logger, 2);        // logs 3, 2, 1
	 * arrays.rforEach(data, logger, 2, true);  // logs 3, 2, 1, 4
	 * arrays.rforEach(data, (v, i) => {        // 2
	 *   if (v === 3) return i;
	 * });
	 * ```
	 * **See also** [[forEach]]
	 */
	function rforEach(array, callback, fromIndex, wrap) {
	    if (fromIndex === void 0) { fromIndex = array.length - 1; }
	    if (wrap === void 0) { wrap = false; }
	    var start = fromIndex | 0;
	    if (start < 0 || start >= array.length) {
	        return void 0;
	    }
	    if (wrap) {
	        for (var i = 0, n = array.length; i < n; ++i) {
	            var j = (start - i + n) % n;
	            var result = callback(array[j], j);
	            if (result !== void 0)
	                return result;
	        }
	    }
	    else {
	        for (var i = start; i >= 0; --i) {
	            var result = callback(array[i], i);
	            if (result !== void 0)
	                return result;
	        }
	    }
	    return void 0;
	}
	exports.rforEach = rforEach;
	/**
	 * Find the index of the first value which matches a predicate.
	 *
	 * @param array - The array of values to be searched.
	 *
	 * @param pred - The predicate function to apply to the values.
	 *
	 * @param fromIndex - The starting index of the search.
	 *
	 * @param wrap - Whether the search wraps around at the end of the array.
	 *
	 * @returns The index of the first matching value, or `-1` if no value
	 *   matches the predicate or if the start index is out of range.
	 *
	 * #### Notes
	 * It is not safe to modify the size of the array while iterating.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * function isEven(value: number): boolean {
	 *   return value % 2 === 0;
	 * }
	 *
	 * let data = [1, 2, 3, 4, 3, 2, 1];
	 * arrays.findIndex(data, isEven);           // 1
	 * arrays.findIndex(data, isEven, 4);        // 5
	 * arrays.findIndex(data, isEven, 6);        // -1
	 * arrays.findIndex(data, isEven, 6, true);  // 1
	 * ```
	 *
	 * **See also** [[rfindIndex]].
	 */
	function findIndex(array, pred, fromIndex, wrap) {
	    if (fromIndex === void 0) { fromIndex = 0; }
	    if (wrap === void 0) { wrap = false; }
	    var start = fromIndex | 0;
	    if (start < 0 || start >= array.length) {
	        return -1;
	    }
	    if (wrap) {
	        for (var i = 0, n = array.length; i < n; ++i) {
	            var j = (start + i) % n;
	            if (pred(array[j], j))
	                return j;
	        }
	    }
	    else {
	        for (var i = start, n = array.length; i < n; ++i) {
	            if (pred(array[i], i))
	                return i;
	        }
	    }
	    return -1;
	}
	exports.findIndex = findIndex;
	/**
	 * Find the index of the last value which matches a predicate.
	 *
	 * @param array - The array of values to be searched.
	 *
	 * @param pred - The predicate function to apply to the values.
	 *
	 * @param fromIndex - The starting index of the search.
	 *
	 * @param wrap - Whether the search wraps around at the front of the array.
	 *
	 * @returns The index of the last matching value, or `-1` if no value
	 *   matches the predicate or if the start index is out of range.
	 *
	 * #### Notes
	 * It is not safe to modify the size of the array while iterating.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * function isEven(value: number): boolean {
	 *   return value % 2 === 0;
	 * }
	 *
	 * let data = [1, 2, 3, 4, 3, 2, 1];
	 * arrays.rfindIndex(data, isEven);           // 5
	 * arrays.rfindIndex(data, isEven, 4);        // 3
	 * arrays.rfindIndex(data, isEven, 0);        // -1
	 * arrays.rfindIndex(data, isEven, 0, true);  // 5
	 * ```
	 *
	 * **See also** [[findIndex]].
	 */
	function rfindIndex(array, pred, fromIndex, wrap) {
	    if (fromIndex === void 0) { fromIndex = array.length - 1; }
	    if (wrap === void 0) { wrap = false; }
	    var start = fromIndex | 0;
	    if (start < 0 || start >= array.length) {
	        return -1;
	    }
	    if (wrap) {
	        for (var i = 0, n = array.length; i < n; ++i) {
	            var j = (start - i + n) % n;
	            if (pred(array[j], j))
	                return j;
	        }
	    }
	    else {
	        for (var i = start; i >= 0; --i) {
	            if (pred(array[i], i))
	                return i;
	        }
	    }
	    return -1;
	}
	exports.rfindIndex = rfindIndex;
	/**
	 * Find the first value which matches a predicate.
	 *
	 * @param array - The array of values to be searched.
	 *
	 * @param pred - The predicate function to apply to the values.
	 *
	 * @param fromIndex - The starting index of the search.
	 *
	 * @param wrap - Whether the search wraps around at the end of the array.
	 *
	 * @returns The first matching value, or `undefined` if no value matches
	 *   the predicate or if the start index is out of range.
	 *
	 * #### Notes
	 * It is not safe to modify the size of the array while iterating.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * function isEven(value: number): boolean {
	 *   return value % 2 === 0;
	 * }
	 *
	 * let data = [1, 2, 3, 4, 3, 2, 1];
	 * arrays.find(data, isEven);           // 2
	 * arrays.find(data, isEven, 4);        // 2
	 * arrays.find(data, isEven, 6);        // undefined
	 * arrays.find(data, isEven, 6, true);  // 2
	 * ```
	 *
	 * **See also** [[rfind]].
	 */
	function find(array, pred, fromIndex, wrap) {
	    var i = findIndex(array, pred, fromIndex, wrap);
	    return i !== -1 ? array[i] : void 0;
	}
	exports.find = find;
	/**
	 * Find the last value which matches a predicate.
	 *
	 * @param array - The array of values to be searched.
	 *
	 * @param pred - The predicate function to apply to the values.
	 *
	 * @param fromIndex - The starting index of the search.
	 *
	 * @param wrap - Whether the search wraps around at the front of the array.
	 *
	 * @returns The last matching value, or `undefined` if no value matches
	 *   the predicate or if the start index is out of range.
	 *
	 * #### Notes
	 * The range of visited indices is set before the first invocation of
	 * `pred`. It is not safe for `pred` to change the length of `array`.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * function isEven(value: number): boolean {
	 *   return value % 2 === 0;
	 * }
	 *
	 * let data = [1, 2, 3, 4, 3, 2, 1];
	 * arrays.rfind(data, isEven);           // 2
	 * arrays.rfind(data, isEven, 4);        // 4
	 * arrays.rfind(data, isEven, 0);        // undefined
	 * arrays.rfind(data, isEven, 0, true);  // 2
	 * ```
	 *
	 * **See also** [[find]].
	 */
	function rfind(array, pred, fromIndex, wrap) {
	    var i = rfindIndex(array, pred, fromIndex, wrap);
	    return i !== -1 ? array[i] : void 0;
	}
	exports.rfind = rfind;
	/**
	 * Insert an element into an array at a specified index.
	 *
	 * @param array - The array of values to modify.
	 *
	 * @param index - The index at which to insert the value. This value
	 *   is clamped to the bounds of the array.
	 *
	 * @param value - The value to insert into the array.
	 *
	 * @returns The index at which the value was inserted.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * let data = [0, 1, 2, 3, 4];
	 * arrays.insert(data, 0, 12);  // 0
	 * arrays.insert(data, 3, 42);  // 3
	 * arrays.insert(data, -9, 9);  // 0
	 * arrays.insert(data, 12, 8);  // 8
	 * console.log(data);           // [9, 12, 0, 1, 42, 2, 3, 4, 8]
	 * ```
	 *
	 * **See also** [[removeAt]] and [[remove]]
	 */
	function insert(array, index, value) {
	    var j = Math.max(0, Math.min(index | 0, array.length));
	    for (var i = array.length; i > j; --i) {
	        array[i] = array[i - 1];
	    }
	    array[j] = value;
	    return j;
	}
	exports.insert = insert;
	/**
	 * Move an element in an array from one index to another.
	 *
	 * @param array - The array of values to modify.
	 *
	 * @param fromIndex - The index of the element to move.
	 *
	 * @param toIndex - The target index of the element.
	 *
	 * @returns `true` if the element was moved, or `false` if either
	 *   index is out of range.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * let data = [0, 1, 2, 3, 4];
	 * arrays.move(data, 1, 2);   // true
	 * arrays.move(data, -1, 0);  // false
	 * arrays.move(data, 4, 2);   // true
	 * arrays.move(data, 10, 0);  // false
	 * console.log(data);         // [0, 2, 4, 1, 3]
	 * ```
	 */
	function move(array, fromIndex, toIndex) {
	    var j = fromIndex | 0;
	    if (j < 0 || j >= array.length) {
	        return false;
	    }
	    var k = toIndex | 0;
	    if (k < 0 || k >= array.length) {
	        return false;
	    }
	    var value = array[j];
	    if (j > k) {
	        for (var i = j; i > k; --i) {
	            array[i] = array[i - 1];
	        }
	    }
	    else if (j < k) {
	        for (var i = j; i < k; ++i) {
	            array[i] = array[i + 1];
	        }
	    }
	    array[k] = value;
	    return true;
	}
	exports.move = move;
	/**
	 * Remove an element from an array at a specified index.
	 *
	 * @param array - The array of values to modify.
	 *
	 * @param index - The index of the element to remove.
	 *
	 * @returns The removed value, or `undefined` if the index is out
	 *   of range.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * let data = [0, 1, 2, 3, 4];
	 * arrays.removeAt(data, 1);   // 1
	 * arrays.removeAt(data, 3);   // 4
	 * arrays.removeAt(data, 10);  // undefined
	 * console.log(data);          // [0, 2, 3]
	 * ```
	 *
	 * **See also** [[remove]] and [[insert]]
	 */
	function removeAt(array, index) {
	    var j = index | 0;
	    if (j < 0 || j >= array.length) {
	        return void 0;
	    }
	    var value = array[j];
	    for (var i = j + 1, n = array.length; i < n; ++i) {
	        array[i - 1] = array[i];
	    }
	    array.length -= 1;
	    return value;
	}
	exports.removeAt = removeAt;
	/**
	 * Remove the first occurrence of a value from an array.
	 *
	 * @param array - The array of values to modify.
	 *
	 * @param value - The value to remove from the array.
	 *
	 * @returns The index where the value was located, or `-1` if the
	 *   value is not the array.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * let data = [0, 1, 2, 3, 4];
	 * arrays.remove(data, 1);  // 1
	 * arrays.remove(data, 3);  // 2
	 * arrays.remove(data, 7);  // -1
	 * console.log(data);       // [0, 2, 4]
	 * ```
	 *
	 * **See also** [[removeAt]] and [[insert]]
	 */
	function remove(array, value) {
	    var j = -1;
	    for (var i = 0, n = array.length; i < n; ++i) {
	        if (array[i] === value) {
	            j = i;
	            break;
	        }
	    }
	    if (j === -1) {
	        return -1;
	    }
	    for (var i = j + 1, n = array.length; i < n; ++i) {
	        array[i - 1] = array[i];
	    }
	    array.length -= 1;
	    return j;
	}
	exports.remove = remove;
	/**
	 * Reverse an array in-place subject to an optional range.
	 *
	 * @param array - The array to reverse.
	 *
	 * @param fromIndex - The index of the first element of the range.
	 *   This value will be clamped to the array bounds.
	 *
	 * @param toIndex - The index of the last element of the range.
	 *   This value will be clamped to the array bounds.
	 *
	 * @returns A reference to the original array.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * let data = [0, 1, 2, 3, 4];
	 * arrays.reverse(data, 1, 3);    // [0, 3, 2, 1, 4]
	 * arrays.reverse(data, 3);       // [0, 3, 2, 4, 1]
	 * arrays.reverse(data);          // [1, 4, 2, 3, 0]
	 * ```
	 *
	 * **See also** [[rotate]]
	 */
	function reverse(array, fromIndex, toIndex) {
	    if (fromIndex === void 0) { fromIndex = 0; }
	    if (toIndex === void 0) { toIndex = array.length; }
	    var i = Math.max(0, Math.min(fromIndex | 0, array.length - 1));
	    var j = Math.max(0, Math.min(toIndex | 0, array.length - 1));
	    if (j < i)
	        i = j + (j = i, 0);
	    while (i < j) {
	        var tmpval = array[i];
	        array[i++] = array[j];
	        array[j--] = tmpval;
	    }
	    return array;
	}
	exports.reverse = reverse;
	/**
	 * Rotate the elements of an array by a positive or negative delta.
	 *
	 * @param array - The array to rotate.
	 *
	 * @param delta - The amount of rotation to apply to the elements. A
	 *   positive delta will shift the elements to the left. A negative
	 *   delta will shift the elements to the right.
	 *
	 * @returns A reference to the original array.
	 *
	 * #### Notes
	 * This executes in `O(n)` time and `O(1)` space.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * let data = [0, 1, 2, 3, 4];
	 * arrays.rotate(data, 2);    // [2, 3, 4, 0, 1]
	 * arrays.rotate(data, -2);   // [0, 1, 2, 3, 4]
	 * arrays.rotate(data, 10);   // [0, 1, 2, 3, 4]
	 * arrays.rotate(data, 9);    // [4, 0, 1, 2, 3]
	 * ```
	 *
	 * **See also** [[reverse]]
	 */
	function rotate(array, delta) {
	    var n = array.length;
	    if (n <= 1) {
	        return array;
	    }
	    var d = delta | 0;
	    if (d > 0) {
	        d = d % n;
	    }
	    else if (d < 0) {
	        d = ((d % n) + n) % n;
	    }
	    if (d === 0) {
	        return array;
	    }
	    reverse(array, 0, d - 1);
	    reverse(array, d, n - 1);
	    reverse(array, 0, n - 1);
	    return array;
	}
	exports.rotate = rotate;
	/**
	 * Using a binary search, find the index of the first element in an
	 * array which compares `>=` to a value.
	 *
	 * @param array - The array of values to be searched. It must be sorted
	 *   in ascending order.
	 *
	 * @param value - The value to locate in the array.
	 *
	 * @param cmp - The comparison function which returns `true` if an
	 *   array element is less than the given value.
	 *
	 * @returns The index of the first element in `array` which compares
	 *   `>=` to `value`, or `array.length` if there is no such element.
	 *
	 * #### Notes
	 * It is not safe for the comparison function to modify the array.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * function numberCmp(a: number, b: number): boolean {
	 *   return a < b;
	 * }
	 *
	 * let data = [0, 3, 4, 7, 7, 9];
	 * arrays.lowerBound(data, 0, numberCmp);   // 0
	 * arrays.lowerBound(data, 6, numberCmp);   // 3
	 * arrays.lowerBound(data, 7, numberCmp);   // 3
	 * arrays.lowerBound(data, -1, numberCmp);  // 0
	 * arrays.lowerBound(data, 10, numberCmp);  // 6
	 * ```
	 *
	 * **See also** [[upperBound]]
	 */
	function lowerBound(array, value, cmp) {
	    var begin = 0;
	    var half;
	    var middle;
	    var n = array.length;
	    while (n > 0) {
	        half = n >> 1;
	        middle = begin + half;
	        if (cmp(array[middle], value)) {
	            begin = middle + 1;
	            n -= half + 1;
	        }
	        else {
	            n = half;
	        }
	    }
	    return begin;
	}
	exports.lowerBound = lowerBound;
	/**
	 * Using a binary search, find the index of the first element in an
	 * array which compares `>` than a value.
	 *
	 * @param array - The array of values to be searched. It must be sorted
	 *   in ascending order.
	 *
	 * @param value - The value to locate in the array.
	 *
	 * @param cmp - The comparison function which returns `true` if the
	 *   the given value is less than an array element.
	 *
	 * @returns The index of the first element in `array` which compares
	 *   `>` than `value`, or `array.length` if there is no such element.
	 *
	 * #### Notes
	 * It is not safe for the comparison function to modify the array.
	 *
	 * #### Example
	 * ```typescript
	 * import * as arrays from 'phosphor-arrays';
	 *
	 * function numberCmp(a: number, b: number): number {
	 *   return a < b;
	 * }
	 *
	 * let data = [0, 3, 4, 7, 7, 9];
	 * arrays.upperBound(data, 0, numberCmp);   // 1
	 * arrays.upperBound(data, 6, numberCmp);   // 3
	 * arrays.upperBound(data, 7, numberCmp);   // 5
	 * arrays.upperBound(data, -1, numberCmp);  // 0
	 * arrays.upperBound(data, 10, numberCmp);  // 6
	 * ```
	 *
	 * **See also** [[lowerBound]]
	 */
	function upperBound(array, value, cmp) {
	    var begin = 0;
	    var half;
	    var middle;
	    var n = array.length;
	    while (n > 0) {
	        half = n >> 1;
	        middle = begin + half;
	        if (cmp(value, array[middle])) {
	            n = half;
	        }
	        else {
	            begin = middle + 1;
	            n -= half + 1;
	        }
	    }
	    return begin;
	}
	exports.upperBound = upperBound;
	//# sourceMappingURL=index.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var phosphor_queue_1 = __webpack_require__(7);
	/**
	 * A message which can be sent or posted to a message handler.
	 *
	 * #### Notes
	 * This class may be subclassed to create complex message types.
	 *
	 * **See Also** [[postMessage]] and [[sendMessage]].
	 */
	var Message = (function () {
	    /**
	     * Construct a new message.
	     *
	     * @param type - The type of the message. Consumers of a message will
	     *   use this value to cast the message to the appropriately derived
	     *   message type.
	     */
	    function Message(type) {
	        this._type = type;
	    }
	    Object.defineProperty(Message.prototype, "type", {
	        /**
	         * Get the type of the message.
	         */
	        get: function () {
	            return this._type;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Message;
	})();
	exports.Message = Message;
	/**
	 * Send a message to the message handler to process immediately.
	 *
	 * @param handler - The handler which should process the message.
	 *
	 * @param msg - The message to send to the handler.
	 *
	 * #### Notes
	 * Unlike [[postMessage]], [[sendMessage]] delivers the message to
	 * the handler immediately. The handler will not have the opportunity
	 * to compress the message, however the message will still be sent
	 * through any installed message filters.
	 *
	 * **See Also** [[postMessage]].
	 */
	function sendMessage(handler, msg) {
	    getDispatcher(handler).sendMessage(handler, msg);
	}
	exports.sendMessage = sendMessage;
	/**
	 * Post a message to the message handler to process in the future.
	 *
	 * @param handler - The handler which should process the message.
	 *
	 * @param msg - The message to post to the handler.
	 *
	 * #### Notes
	 * Unlike [[sendMessage]], [[postMessage]] will schedule the deliver of
	 * the message for the next cycle of the event loop. The handler will
	 * have the opportunity to compress the message in order to optimize
	 * its handling of similar messages. The message will be sent through
	 * any installed message filters before being delivered to the handler.
	 *
	 * **See Also** [[sendMessage]].
	 */
	function postMessage(handler, msg) {
	    getDispatcher(handler).postMessage(handler, msg);
	}
	exports.postMessage = postMessage;
	/**
	 * Test whether a message handler has posted messages pending delivery.
	 *
	 * @param handler - The message handler of interest.
	 *
	 * @returns `true` if the handler has pending posted messages, `false`
	 *   otherwise.
	 *
	 * **See Also** [[sendPendingMessage]].
	 */
	function hasPendingMessages(handler) {
	    return getDispatcher(handler).hasPendingMessages();
	}
	exports.hasPendingMessages = hasPendingMessages;
	/**
	 * Send the first pending posted message to the message handler.
	 *
	 * @param handler - The message handler of interest.
	 *
	 * #### Notes
	 * If the handler has no pending messages, this is a no-op.
	 *
	 * **See Also** [[hasPendingMessages]].
	 */
	function sendPendingMessage(handler) {
	    getDispatcher(handler).sendPendingMessage(handler);
	}
	exports.sendPendingMessage = sendPendingMessage;
	/**
	 * Install a message filter for a message handler.
	 *
	 * A message filter is invoked before the message handler processes a
	 * message. If the filter returns `true` from its [[filterMessage]] method,
	 * no other filters will be invoked, and the message will not be delivered.
	 *
	 * The most recently installed message filter is executed first.
	 *
	 * @param handler - The handler whose messages should be filtered.
	 *
	 * @param filter - The filter to install for the handler.
	 *
	 * #### Notes
	 * It is possible to install the same filter multiple times. If the
	 * filter should be unique, call [[removeMessageFilter]] first.
	 *
	 * **See Also** [[removeMessageFilter]].
	 */
	function installMessageFilter(handler, filter) {
	    getDispatcher(handler).installMessageFilter(filter);
	}
	exports.installMessageFilter = installMessageFilter;
	/**
	 * Remove a previously installed message filter for a message handler.
	 *
	 * @param handler - The handler for which the filter is installed.
	 *
	 * @param filter - The filter to remove.
	 *
	 * #### Notes
	 * This will remove **all** occurrences of the filter. If the filter is
	 * not installed, this is a no-op.
	 *
	 * It is safe to call this function while the filter is executing.
	 *
	 * **See Also** [[installMessageFilter]].
	 */
	function removeMessageFilter(handler, filter) {
	    getDispatcher(handler).removeMessageFilter(filter);
	}
	exports.removeMessageFilter = removeMessageFilter;
	/**
	 * Clear all message data associated with the message handler.
	 *
	 * @param handler - The message handler for which to clear the data.
	 *
	 * #### Notes
	 * This will remove all pending messages and filters for the handler.
	 */
	function clearMessageData(handler) {
	    var dispatcher = dispatcherMap.get(handler);
	    if (dispatcher)
	        dispatcher.clear();
	    dispatchQueue.removeAll(handler);
	}
	exports.clearMessageData = clearMessageData;
	/**
	 * The internal mapping of message handler to message dispatcher
	 */
	var dispatcherMap = new WeakMap();
	/**
	 * The internal queue of pending message handlers.
	 */
	var dispatchQueue = new phosphor_queue_1.Queue();
	/**
	 * The internal animation frame id for the message loop wake up call.
	 */
	var frameId = void 0;
	/**
	 * A local reference to an event loop hook.
	 */
	var raf;
	if (typeof requestAnimationFrame === 'function') {
	    raf = requestAnimationFrame;
	}
	else {
	    raf = setImmediate;
	}
	/**
	 * Get or create the message dispatcher for a message handler.
	 */
	function getDispatcher(handler) {
	    var dispatcher = dispatcherMap.get(handler);
	    if (dispatcher)
	        return dispatcher;
	    dispatcher = new MessageDispatcher();
	    dispatcherMap.set(handler, dispatcher);
	    return dispatcher;
	}
	/**
	 * Wake up the message loop to process any pending dispatchers.
	 *
	 * This is a no-op if a wake up is not needed or is already pending.
	 */
	function wakeUpMessageLoop() {
	    if (frameId === void 0 && !dispatchQueue.empty) {
	        frameId = raf(runMessageLoop);
	    }
	}
	/**
	 * Run an iteration of the message loop.
	 *
	 * This will process all pending dispatchers in the queue. Dispatchers
	 * which are added to the queue while the message loop is running will
	 * be processed on the next message loop cycle.
	 */
	function runMessageLoop() {
	    // Clear the frame id so the next wake up call can be scheduled.
	    frameId = void 0;
	    // If the queue is empty, there is nothing else to do.
	    if (dispatchQueue.empty) {
	        return;
	    }
	    // Add a null sentinel value to the end of the queue. The queue
	    // will only be processed up to the first null value. This means
	    // that messages posted during this cycle will execute on the next
	    // cycle of the loop.
	    dispatchQueue.push(null);
	    // The message dispatch loop. If the dispatcher is the null sentinel,
	    // the processing of the current block of messages is complete and
	    // another loop is scheduled. Otherwise, the pending message is
	    // dispatched to the message handler.
	    while (!dispatchQueue.empty) {
	        var handler = dispatchQueue.pop();
	        if (handler === null) {
	            wakeUpMessageLoop();
	            return;
	        }
	        getDispatcher(handler).sendPendingMessage(handler);
	    }
	}
	/**
	 * Safely process a message for a message handler.
	 *
	 * If the handler throws an exception, it will be caught and logged.
	 */
	function safeProcess(handler, msg) {
	    try {
	        handler.processMessage(msg);
	    }
	    catch (err) {
	        console.error(err);
	    }
	}
	/**
	 * Safely compress a message for a message handler.
	 *
	 * If the handler throws an exception, it will be caught and logged.
	 */
	function safeCompress(handler, msg, queue) {
	    var result = false;
	    try {
	        result = handler.compressMessage(msg, queue);
	    }
	    catch (err) {
	        console.error(err);
	    }
	    return result;
	}
	/**
	 * Safely filter a message for a message handler.
	 *
	 * If the filter throws an exception, it will be caught and logged.
	 */
	function safeFilter(filter, handler, msg) {
	    var result = false;
	    try {
	        result = filter.filterMessage(handler, msg);
	    }
	    catch (err) {
	        console.error(err);
	    }
	    return result;
	}
	/**
	 * An internal class which manages message dispatching for a handler.
	 */
	var MessageDispatcher = (function () {
	    function MessageDispatcher() {
	        this._filters = null;
	        this._messages = null;
	    }
	    /**
	     * Send a message to the handler immediately.
	     *
	     * The message will first be sent through installed filters.
	     */
	    MessageDispatcher.prototype.sendMessage = function (handler, msg) {
	        if (!this._filterMessage(handler, msg)) {
	            safeProcess(handler, msg);
	        }
	    };
	    /**
	     * Post a message for delivery in the future.
	     *
	     * The message will first be compressed if possible.
	     */
	    MessageDispatcher.prototype.postMessage = function (handler, msg) {
	        if (!this._compressMessage(handler, msg)) {
	            this._enqueueMessage(handler, msg);
	        }
	    };
	    /**
	     * Test whether the dispatcher has messages pending delivery.
	     */
	    MessageDispatcher.prototype.hasPendingMessages = function () {
	        return !!(this._messages && !this._messages.empty);
	    };
	    /**
	     * Send the first pending message to the message handler.
	     */
	    MessageDispatcher.prototype.sendPendingMessage = function (handler) {
	        if (this._messages && !this._messages.empty) {
	            this.sendMessage(handler, this._messages.pop());
	        }
	    };
	    /**
	     * Install a message filter for the dispatcher.
	     */
	    MessageDispatcher.prototype.installMessageFilter = function (filter) {
	        this._filters = { next: this._filters, filter: filter };
	    };
	    /**
	     * Remove all occurrences of a message filter from the dispatcher.
	     */
	    MessageDispatcher.prototype.removeMessageFilter = function (filter) {
	        var link = this._filters;
	        var prev = null;
	        while (link !== null) {
	            if (link.filter === filter) {
	                link.filter = null;
	            }
	            else if (prev === null) {
	                this._filters = link;
	                prev = link;
	            }
	            else {
	                prev.next = link;
	                prev = link;
	            }
	            link = link.next;
	        }
	        if (!prev) {
	            this._filters = null;
	        }
	        else {
	            prev.next = null;
	        }
	    };
	    /**
	     * Clear all messages and filters from the dispatcher.
	     */
	    MessageDispatcher.prototype.clear = function () {
	        if (this._messages) {
	            this._messages.clear();
	        }
	        for (var link = this._filters; link !== null; link = link.next) {
	            link.filter = null;
	        }
	        this._filters = null;
	    };
	    /**
	     * Run the installed message filters for the handler.
	     *
	     * Returns `true` if the message was filtered, `false` otherwise.
	     */
	    MessageDispatcher.prototype._filterMessage = function (handler, msg) {
	        for (var link = this._filters; link !== null; link = link.next) {
	            if (link.filter && safeFilter(link.filter, handler, msg)) {
	                return true;
	            }
	        }
	        return false;
	    };
	    /**
	     * Compress the mssage for the given handler.
	     *
	     * Returns `true` if the message was compressed, `false` otherwise.
	     */
	    MessageDispatcher.prototype._compressMessage = function (handler, msg) {
	        if (!handler.compressMessage) {
	            return false;
	        }
	        if (!this._messages || this._messages.empty) {
	            return false;
	        }
	        return safeCompress(handler, msg, this._messages);
	    };
	    /**
	     * Enqueue the message for future delivery to the handler.
	     */
	    MessageDispatcher.prototype._enqueueMessage = function (handler, msg) {
	        this._ensureMessages().push(msg);
	        dispatchQueue.push(handler);
	        wakeUpMessageLoop();
	    };
	    /**
	     * Get the internal message queue, creating it if needed.
	     */
	    MessageDispatcher.prototype._ensureMessages = function () {
	        return this._messages || (this._messages = new phosphor_queue_1.Queue());
	    };
	    return MessageDispatcher;
	})();
	//# sourceMappingURL=index.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(6).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	/**
	 * A generic FIFO queue data structure.
	 *
	 * #### Notes
	 * This queue is implemented internally using a singly linked list and
	 * can grow to arbitrary size.
	 *
	 * #### Example
	 * ```typescript
	 * let q = new Queue<number>([0, 1, 2]);
	 * q.size;      // 3
	 * q.empty;     // false
	 * q.pop();     // 0
	 * q.pop();     // 1
	 * q.push(42);  // undefined
	 * q.size;      // 2
	 * q.pop();     // 2
	 * q.pop();     // 42
	 * q.pop();     // undefined
	 * q.size;      // 0
	 * q.empty;     // true
	 * ```
	 */
	var Queue = (function () {
	    /**
	     * Construct a new queue.
	     *
	     * @param items - The initial items for the queue.
	     */
	    function Queue(items) {
	        var _this = this;
	        this._size = 0;
	        this._front = null;
	        this._back = null;
	        if (items)
	            items.forEach(function (item) { return _this.push(item); });
	    }
	    Object.defineProperty(Queue.prototype, "size", {
	        /**
	         * Get the number of elements in the queue.
	         *
	         * #### Notes
	         * This has `O(1)` complexity.
	         */
	        get: function () {
	            return this._size;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queue.prototype, "empty", {
	        /**
	         * Test whether the queue is empty.
	         *
	         * #### Notes
	         * This has `O(1)` complexity.
	         */
	        get: function () {
	            return this._size === 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queue.prototype, "front", {
	        /**
	         * Get the value at the front of the queue.
	         *
	         * #### Notes
	         * This has `O(1)` complexity.
	         *
	         * If the queue is empty, this value will be `undefined`.
	         */
	        get: function () {
	            return this._front !== null ? this._front.value : void 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queue.prototype, "back", {
	        /**
	         * Get the value at the back of the queue.
	         *
	         * #### Notes
	         * This has `O(1)` complexity.
	         *
	         * If the queue is empty, this value will be `undefined`.
	         */
	        get: function () {
	            return this._back !== null ? this._back.value : void 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Push a value onto the back of the queue.
	     *
	     * @param value - The value to add to the queue.
	     *
	     * #### Notes
	     * This has `O(1)` complexity.
	     */
	    Queue.prototype.push = function (value) {
	        var link = { next: null, value: value };
	        if (this._back === null) {
	            this._front = link;
	            this._back = link;
	        }
	        else {
	            this._back.next = link;
	            this._back = link;
	        }
	        this._size++;
	    };
	    /**
	     * Pop and return the value at the front of the queue.
	     *
	     * @returns The value at the front of the queue.
	     *
	     * #### Notes
	     * This has `O(1)` complexity.
	     *
	     * If the queue is empty, the return value will be `undefined`.
	     */
	    Queue.prototype.pop = function () {
	        var link = this._front;
	        if (link === null) {
	            return void 0;
	        }
	        if (link.next === null) {
	            this._front = null;
	            this._back = null;
	        }
	        else {
	            this._front = link.next;
	        }
	        this._size--;
	        return link.value;
	    };
	    /**
	     * Remove the first occurrence of a value from the queue.
	     *
	     * @param value - The value to remove from the queue.
	     *
	     * @returns `true` on success, `false` otherwise.
	     *
	     * #### Notes
	     * This has `O(N)` complexity.
	     */
	    Queue.prototype.remove = function (value) {
	        var link = this._front;
	        var prev = null;
	        while (link !== null) {
	            if (link.value === value) {
	                if (prev === null) {
	                    this._front = link.next;
	                }
	                else {
	                    prev.next = link.next;
	                }
	                if (link.next === null) {
	                    this._back = prev;
	                }
	                this._size--;
	                return true;
	            }
	            prev = link;
	            link = link.next;
	        }
	        return false;
	    };
	    /**
	     * Remove all occurrences of a value from the queue.
	     *
	     * @param value - The value to remove from the queue.
	     *
	     * @returns The number of occurrences removed.
	     *
	     * #### Notes
	     * This has `O(N)` complexity.
	     */
	    Queue.prototype.removeAll = function (value) {
	        var count = 0;
	        var link = this._front;
	        var prev = null;
	        while (link !== null) {
	            if (link.value === value) {
	                count++;
	                this._size--;
	            }
	            else if (prev === null) {
	                this._front = link;
	                prev = link;
	            }
	            else {
	                prev.next = link;
	                prev = link;
	            }
	            link = link.next;
	        }
	        if (!prev) {
	            this._front = null;
	            this._back = null;
	        }
	        else {
	            prev.next = null;
	            this._back = prev;
	        }
	        return count;
	    };
	    /**
	     * Remove all values from the queue.
	     *
	     * #### Notes
	     * This has `O(1)` complexity.
	     */
	    Queue.prototype.clear = function () {
	        this._size = 0;
	        this._front = null;
	        this._back = null;
	    };
	    /**
	     * Create an array from the values in the queue.
	     *
	     * @returns An array of all values in the queue.
	     *
	     * #### Notes
	     * This has `O(N)` complexity.
	     */
	    Queue.prototype.toArray = function () {
	        var result = new Array(this._size);
	        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
	            result[i] = link.value;
	        }
	        return result;
	    };
	    /**
	     * Test whether any value in the queue passes a predicate function.
	     *
	     * @param pred - The predicate to apply to the values.
	     *
	     * @returns `true` if any value in the queue passes the predicate,
	     *   or `false` otherwise.
	     *
	     * #### Notes
	     * This has `O(N)` complexity.
	     *
	     * It is **not** safe for the predicate to modify the queue while
	     * iterating.
	     */
	    Queue.prototype.some = function (pred) {
	        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
	            if (pred(link.value, i))
	                return true;
	        }
	        return false;
	    };
	    /**
	     * Test whether all values in the queue pass a predicate function.
	     *
	     * @param pred - The predicate to apply to the values.
	     *
	     * @returns `true` if all values in the queue pass the predicate,
	     *   or `false` otherwise.
	     *
	     * #### Notes
	     * This has `O(N)` complexity.
	     *
	     * It is **not** safe for the predicate to modify the queue while
	     * iterating.
	     */
	    Queue.prototype.every = function (pred) {
	        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
	            if (!pred(link.value, i))
	                return false;
	        }
	        return true;
	    };
	    /**
	     * Create an array of the values which pass a predicate function.
	     *
	     * @param pred - The predicate to apply to the values.
	     *
	     * @returns The array of values which pass the predicate.
	     *
	     * #### Notes
	     * This has `O(N)` complexity.
	     *
	     * It is **not** safe for the predicate to modify the queue while
	     * iterating.
	     */
	    Queue.prototype.filter = function (pred) {
	        var result = [];
	        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
	            if (pred(link.value, i))
	                result.push(link.value);
	        }
	        return result;
	    };
	    /**
	     * Create an array of mapped values for the values in the queue.
	     *
	     * @param callback - The map function to apply to the values.
	     *
	     * @returns The array of values returned by the map function.
	     *
	     * #### Notes
	     * This has `O(N)` complexity.
	     *
	     * It is **not** safe for the callback to modify the queue while
	     * iterating.
	     */
	    Queue.prototype.map = function (callback) {
	        var result = new Array(this._size);
	        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
	            result[i] = callback(link.value, i);
	        }
	        return result;
	    };
	    /**
	     * Execute a callback for each value in the queue.
	     *
	     * @param callback - The function to apply to the values.
	     *
	     * @returns The first value returned by the callback which is not
	     *   `undefined`.
	     *
	     * #### Notes
	     * This has `O(N)` complexity.
	     *
	     * Iteration will terminate immediately if the callback returns any
	     * value other than `undefined`.
	     *
	     * It is **not** safe for the callback to modify the queue while
	     * iterating.
	     */
	    Queue.prototype.forEach = function (callback) {
	        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
	            var result = callback(link.value, i);
	            if (result !== void 0)
	                return result;
	        }
	        return void 0;
	    };
	    return Queue;
	})();
	exports.Queue = Queue;
	//# sourceMappingURL=index.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(9));
	__export(__webpack_require__(14));
	__export(__webpack_require__(12));
	__webpack_require__(15);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var phosphor_messaging_1 = __webpack_require__(4);
	var phosphor_properties_1 = __webpack_require__(10);
	var phosphor_signaling_1 = __webpack_require__(11);
	var widget_1 = __webpack_require__(12);
	/**
	 * The abstract base class of all Phosphor layouts.
	 *
	 * #### Notes
	 * A layout is used to add child widgets to a parent and to arrange
	 * those children within the parent's node.
	 *
	 * This class must be subclassed to make a fully functioning layout.
	 */
	var Layout = (function () {
	    function Layout() {
	        this._disposed = false;
	        this._parent = null;
	    }
	    /**
	     * Dispose of the resources held by the layout.
	     *
	     * #### Notes
	     * This method should be reimplemented by subclasses to dispose their
	     * children. All reimplementations should call the superclass method.
	     */
	    Layout.prototype.dispose = function () {
	        this._disposed = true;
	        this._parent = null;
	        phosphor_signaling_1.clearSignalData(this);
	        phosphor_properties_1.clearPropertyData(this);
	    };
	    Object.defineProperty(Layout.prototype, "isDisposed", {
	        /**
	         * Test whether the layout is disposed.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._disposed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Layout.prototype, "parent", {
	        /**
	         * Get the parent widget of the layout.
	         */
	        get: function () {
	            return this._parent;
	        },
	        /**
	         * Set the parent widget of the layout.
	         *
	         * #### Notes
	         * This is set automatically when installing the layout on the parent
	         * widget. The layout parent should not be set directly by user code.
	         */
	        set: function (value) {
	            if (!value) {
	                throw new Error('Cannot set layout parent to null.');
	            }
	            if (this._parent === value) {
	                return;
	            }
	            if (this._parent) {
	                throw new Error('Cannot change layout parent.');
	            }
	            if (value.layout !== this) {
	                throw new Error('Invalid layout parent.');
	            }
	            this._parent = value;
	            this.initialize();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Process a message sent to the parent widget.
	     *
	     * @param msg - The message sent to the parent widget.
	     *
	     * #### Notes
	     * This method is called by the parent to process a message.
	     *
	     * Subclasses may reimplement this method as needed.
	     */
	    Layout.prototype.processParentMessage = function (msg) {
	        switch (msg.type) {
	            case 'resize':
	                this.onResize(msg);
	                break;
	            case 'update-request':
	                this.onUpdateRequest(msg);
	                break;
	            case 'fit-request':
	                this.onFitRequest(msg);
	                break;
	            case 'after-attach':
	                this.onAfterAttach(msg);
	                break;
	            case 'before-detach':
	                this.onBeforeDetach(msg);
	                break;
	            case 'after-show':
	                this.onAfterShow(msg);
	                break;
	            case 'before-hide':
	                this.onBeforeHide(msg);
	                break;
	            case 'child-removed':
	                this.onChildRemoved(msg);
	                break;
	            case 'child-shown':
	                this.onChildShown(msg);
	                break;
	            case 'child-hidden':
	                this.onChildHidden(msg);
	                break;
	        }
	    };
	    /**
	     * A message handler invoked on a `'fit-request'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     */
	    Layout.prototype.onFitRequest = function (msg) { };
	    /**
	     * A message handler invoked on a `'child-shown'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     */
	    Layout.prototype.onChildShown = function (msg) { };
	    /**
	     * A message handler invoked on a `'child-hidden'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     */
	    Layout.prototype.onChildHidden = function (msg) { };
	    return Layout;
	})();
	exports.Layout = Layout;
	/**
	 * An abstract base class for creating index-based layouts.
	 *
	 * #### Notes
	 * This class implements core functionality which is required by nearly
	 * all layouts. It is a good starting point for creating custom layouts
	 * which control the types of children that may be added to the layout.
	 *
	 * This class must be subclassed to make a fully functioning layout.
	 */
	var AbstractLayout = (function (_super) {
	    __extends(AbstractLayout, _super);
	    function AbstractLayout() {
	        _super.apply(this, arguments);
	    }
	    /**
	     * Get the index of the specified child widget.
	     *
	     * @param child - The child widget of interest.
	     *
	     * @returns The index of the specified child, or `-1`.
	     */
	    AbstractLayout.prototype.childIndex = function (child) {
	        for (var i = 0; i < this.childCount(); ++i) {
	            if (this.childAt(i) === child)
	                return i;
	        }
	        return -1;
	    };
	    /**
	     * A message handler invoked on a `'resize'` message.
	     *
	     * #### Notes
	     * The default implementation of this method sends an `UnknownSize`
	     * resize message to all children.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    AbstractLayout.prototype.onResize = function (msg) {
	        for (var i = 0; i < this.childCount(); ++i) {
	            phosphor_messaging_1.sendMessage(this.childAt(i), widget_1.ResizeMessage.UnknownSize);
	        }
	    };
	    /**
	     * A message handler invoked on an `'update-request'` message.
	     *
	     * #### Notes
	     * The default implementation of this method sends an `UnknownSize`
	     * resize message to all children.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    AbstractLayout.prototype.onUpdateRequest = function (msg) {
	        for (var i = 0; i < this.childCount(); ++i) {
	            phosphor_messaging_1.sendMessage(this.childAt(i), widget_1.ResizeMessage.UnknownSize);
	        }
	    };
	    /**
	     * A message handler invoked on an `'after-attach'` message.
	     *
	     * #### Notes
	     * The default implementation of this method forwards the message
	     * to all children.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    AbstractLayout.prototype.onAfterAttach = function (msg) {
	        for (var i = 0; i < this.childCount(); ++i) {
	            phosphor_messaging_1.sendMessage(this.childAt(i), msg);
	        }
	    };
	    /**
	     * A message handler invoked on a `'before-detach'` message.
	     *
	     * #### Notes
	     * The default implementation of this method forwards the message
	     * to all children.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    AbstractLayout.prototype.onBeforeDetach = function (msg) {
	        for (var i = 0; i < this.childCount(); ++i) {
	            phosphor_messaging_1.sendMessage(this.childAt(i), msg);
	        }
	    };
	    /**
	     * A message handler invoked on an `'after-show'` message.
	     *
	     * #### Notes
	     * The default implementation of this method forwards the message
	     * to all non-hidden children.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    AbstractLayout.prototype.onAfterShow = function (msg) {
	        for (var i = 0; i < this.childCount(); ++i) {
	            var child = this.childAt(i);
	            if (!child.isHidden)
	                phosphor_messaging_1.sendMessage(child, msg);
	        }
	    };
	    /**
	     * A message handler invoked on a `'before-hide'` message.
	     *
	     * #### Notes
	     * The default implementation of this method forwards the message
	     * to all non-hidden children.
	     *
	     * This may be reimplemented by subclasses as needed.
	     */
	    AbstractLayout.prototype.onBeforeHide = function (msg) {
	        for (var i = 0; i < this.childCount(); ++i) {
	            var child = this.childAt(i);
	            if (!child.isHidden)
	                phosphor_messaging_1.sendMessage(child, msg);
	        }
	    };
	    return AbstractLayout;
	})(Layout);
	exports.AbstractLayout = AbstractLayout;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	/**
	 * A property descriptor for a datum belonging to an object.
	 *
	 * Property descriptors can be used to expose a rich interface for an
	 * object which encapsulates value creation, coercion, and notification.
	 * They can also be used to extend the state of an object with semantic
	 * data from an unrelated class.
	 */
	var Property = (function () {
	    /**
	     * Construct a new property descriptor.
	     *
	     * @param options - The options for initializing the property.
	     */
	    function Property(options) {
	        this._pid = nextPID();
	        this._name = options.name;
	        this._value = options.value;
	        this._create = options.create;
	        this._coerce = options.coerce;
	        this._compare = options.compare;
	        this._changed = options.changed;
	        this._notify = options.notify;
	    }
	    Object.defineProperty(Property.prototype, "name", {
	        /**
	         * Get the human readable name for the property.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Property.prototype, "notify", {
	        /**
	         * Get the notify signal for the property.
	         *
	         * #### Notes
	         * This will be `undefined` if no notify signal was provided.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._notify;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Get the current value of the property for a given owner.
	     *
	     * @param owner - The property owner of interest.
	     *
	     * @returns The current value of the property.
	     *
	     * #### Notes
	     * If the value has not yet been set, the default value will be
	     * computed and assigned as the current value of the property.
	     */
	    Property.prototype.get = function (owner) {
	        var value;
	        var hash = lookupHash(owner);
	        if (this._pid in hash) {
	            value = hash[this._pid];
	        }
	        else {
	            value = hash[this._pid] = this._createValue(owner);
	        }
	        return value;
	    };
	    /**
	     * Set the current value of the property for a given owner.
	     *
	     * @param owner - The property owner of interest.
	     *
	     * @param value - The value for the property.
	     *
	     * #### Notes
	     * If the value has not yet been set, the default value will be
	     * computed and used as the previous value for the comparison.
	     */
	    Property.prototype.set = function (owner, value) {
	        var oldValue;
	        var hash = lookupHash(owner);
	        if (this._pid in hash) {
	            oldValue = hash[this._pid];
	        }
	        else {
	            oldValue = hash[this._pid] = this._createValue(owner);
	        }
	        var newValue = this._coerceValue(owner, value);
	        this._maybeNotify(owner, oldValue, hash[this._pid] = newValue);
	    };
	    /**
	     * Explicitly coerce the current property value for a given owner.
	     *
	     * @param owner - The property owner of interest.
	     *
	     * #### Notes
	     * If the value has not yet been set, the default value will be
	     * computed and used as the previous value for the comparison.
	     */
	    Property.prototype.coerce = function (owner) {
	        var oldValue;
	        var hash = lookupHash(owner);
	        if (this._pid in hash) {
	            oldValue = hash[this._pid];
	        }
	        else {
	            oldValue = hash[this._pid] = this._createValue(owner);
	        }
	        var newValue = this._coerceValue(owner, oldValue);
	        this._maybeNotify(owner, oldValue, hash[this._pid] = newValue);
	    };
	    /**
	     * Get or create the default value for the given owner.
	     */
	    Property.prototype._createValue = function (owner) {
	        var create = this._create;
	        return create ? create(owner) : this._value;
	    };
	    /**
	     * Coerce the value for the given owner.
	     */
	    Property.prototype._coerceValue = function (owner, value) {
	        var coerce = this._coerce;
	        return coerce ? coerce(owner, value) : value;
	    };
	    /**
	     * Compare the old value and new value for equality.
	     */
	    Property.prototype._compareValue = function (oldValue, newValue) {
	        var compare = this._compare;
	        return compare ? compare(oldValue, newValue) : oldValue === newValue;
	    };
	    /**
	     * Run the change notification if the given values are different.
	     */
	    Property.prototype._maybeNotify = function (owner, oldValue, newValue) {
	        var changed = this._changed;
	        var notify = this._notify;
	        if (!changed && !notify) {
	            return;
	        }
	        if (this._compareValue(oldValue, newValue)) {
	            return;
	        }
	        if (changed) {
	            changed(owner, oldValue, newValue);
	        }
	        if (notify) {
	            notify.bind(owner).emit({ name: this._name, oldValue: oldValue, newValue: newValue });
	        }
	    };
	    return Property;
	})();
	exports.Property = Property;
	/**
	 * Clear the stored property data for the given property owner.
	 *
	 * @param owner - The property owner of interest.
	 *
	 * #### Notes
	 * This will clear all property values for the owner, but it will
	 * **not** run the change notification for any of the properties.
	 */
	function clearPropertyData(owner) {
	    ownerData.delete(owner);
	}
	exports.clearPropertyData = clearPropertyData;
	/**
	 * A weak mapping of property owner to property hash.
	 */
	var ownerData = new WeakMap();
	/**
	 * A function which computes successive unique property ids.
	 */
	var nextPID = (function () { var id = 0; return function () { return 'pid-' + id++; }; })();
	/**
	 * Lookup the data hash for the property owner.
	 *
	 * This will create the hash if one does not already exist.
	 */
	function lookupHash(owner) {
	    var hash = ownerData.get(owner);
	    if (hash !== void 0)
	        return hash;
	    hash = Object.create(null);
	    ownerData.set(owner, hash);
	    return hash;
	}
	//# sourceMappingURL=index.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	/**
	 * An object used for type-safe inter-object communication.
	 *
	 * #### Notes
	 * Signals provide a type-safe implementation of the publish-subscribe
	 * pattern. An object (publisher) declares which signals it will emit,
	 * and consumers connect callbacks (subscribers) to those signals. The
	 * subscribers are invoked whenever the publisher emits the signal.
	 *
	 * A `Signal` object must be bound to a sender in order to be useful.
	 * A common pattern is to declare a `Signal` object as a static class
	 * member, along with a convenience getter which binds the signal to
	 * the `this` instance on-demand.
	 *
	 * #### Example
	 * ```typescript
	 * import { ISignal, Signal } from 'phosphor-signaling';
	 *
	 * class MyClass {
	 *
	 *   static valueChangedSignal = new Signal<MyClass, number>();
	 *
	 *   constructor(name: string) {
	 *     this._name = name;
	 *   }
	 *
	 *   get valueChanged(): ISignal<MyClass, number> {
	 *     return MyClass.valueChangedSignal.bind(this);
	 *   }
	 *
	 *   get name(): string {
	 *     return this._name;
	 *   }
	 *
	 *   get value(): number {
	 *     return this._value;
	 *   }
	 *
	 *   set value(value: number) {
	 *     if (value !== this._value) {
	 *       this._value = value;
	 *       this.valueChanged.emit(value);
	 *     }
	 *   }
	 *
	 *   private _name: string;
	 *   private _value = 0;
	 * }
	 *
	 * function logger(sender: MyClass, value: number): void {
	 *   console.log(sender.name, value);
	 * }
	 *
	 * let m1 = new MyClass('foo');
	 * let m2 = new MyClass('bar');
	 *
	 * m1.valueChanged.connect(logger);
	 * m2.valueChanged.connect(logger);
	 *
	 * m1.value = 42;  // logs: foo 42
	 * m2.value = 17;  // logs: bar 17
	 * ```
	 */
	var Signal = (function () {
	    function Signal() {
	    }
	    /**
	     * Bind the signal to a specific sender.
	     *
	     * @param sender - The sender object to bind to the signal.
	     *
	     * @returns The bound signal object which can be used for connecting,
	     *   disconnecting, and emitting the signal.
	     */
	    Signal.prototype.bind = function (sender) {
	        return new BoundSignal(this, sender);
	    };
	    return Signal;
	})();
	exports.Signal = Signal;
	/**
	 * Remove all connections where the given object is the sender.
	 *
	 * @param sender - The sender object of interest.
	 *
	 * #### Example
	 * ```typescript
	 * disconnectSender(someObject);
	 * ```
	 */
	function disconnectSender(sender) {
	    var list = senderMap.get(sender);
	    if (!list) {
	        return;
	    }
	    var conn = list.first;
	    while (conn !== null) {
	        removeFromSendersList(conn);
	        conn.callback = null;
	        conn.thisArg = null;
	        conn = conn.nextReceiver;
	    }
	    senderMap.delete(sender);
	}
	exports.disconnectSender = disconnectSender;
	/**
	 * Remove all connections where the given object is the receiver.
	 *
	 * @param receiver - The receiver object of interest.
	 *
	 * #### Notes
	 * If a `thisArg` is provided when connecting a signal, that object
	 * is considered the receiver. Otherwise, the `callback` is used as
	 * the receiver.
	 *
	 * #### Example
	 * ```typescript
	 * // disconnect a regular object receiver
	 * disconnectReceiver(myObject);
	 *
	 * // disconnect a plain callback receiver
	 * disconnectReceiver(myCallback);
	 * ```
	 */
	function disconnectReceiver(receiver) {
	    var conn = receiverMap.get(receiver);
	    if (!conn) {
	        return;
	    }
	    while (conn !== null) {
	        var next = conn.nextSender;
	        conn.callback = null;
	        conn.thisArg = null;
	        conn.prevSender = null;
	        conn.nextSender = null;
	        conn = next;
	    }
	    receiverMap.delete(receiver);
	}
	exports.disconnectReceiver = disconnectReceiver;
	/**
	 * Clear all signal data associated with the given object.
	 *
	 * @param obj - The object for which the signal data should be cleared.
	 *
	 * #### Notes
	 * This removes all signal connections where the object is used as
	 * either the sender or the receiver.
	 *
	 * #### Example
	 * ```typescript
	 * clearSignalData(someObject);
	 * ```
	 */
	function clearSignalData(obj) {
	    disconnectSender(obj);
	    disconnectReceiver(obj);
	}
	exports.clearSignalData = clearSignalData;
	/**
	 * A concrete implementation of ISignal.
	 */
	var BoundSignal = (function () {
	    /**
	     * Construct a new bound signal.
	     */
	    function BoundSignal(signal, sender) {
	        this._signal = signal;
	        this._sender = sender;
	    }
	    /**
	     * Connect a callback to the signal.
	     */
	    BoundSignal.prototype.connect = function (callback, thisArg) {
	        return connect(this._sender, this._signal, callback, thisArg);
	    };
	    /**
	     * Disconnect a callback from the signal.
	     */
	    BoundSignal.prototype.disconnect = function (callback, thisArg) {
	        return disconnect(this._sender, this._signal, callback, thisArg);
	    };
	    /**
	     * Emit the signal and invoke the connected callbacks.
	     */
	    BoundSignal.prototype.emit = function (args) {
	        emit(this._sender, this._signal, args);
	    };
	    return BoundSignal;
	})();
	/**
	 * A struct which holds connection data.
	 */
	var Connection = (function () {
	    function Connection() {
	        /**
	         * The signal for the connection.
	         */
	        this.signal = null;
	        /**
	         * The callback connected to the signal.
	         */
	        this.callback = null;
	        /**
	         * The `this` context for the callback.
	         */
	        this.thisArg = null;
	        /**
	         * The next connection in the singly linked receivers list.
	         */
	        this.nextReceiver = null;
	        /**
	         * The next connection in the doubly linked senders list.
	         */
	        this.nextSender = null;
	        /**
	         * The previous connection in the doubly linked senders list.
	         */
	        this.prevSender = null;
	    }
	    return Connection;
	})();
	/**
	 * The list of receiver connections for a specific sender.
	 */
	var ConnectionList = (function () {
	    function ConnectionList() {
	        /**
	         * The ref count for the list.
	         */
	        this.refs = 0;
	        /**
	         * The first connection in the list.
	         */
	        this.first = null;
	        /**
	         * The last connection in the list.
	         */
	        this.last = null;
	    }
	    return ConnectionList;
	})();
	/**
	 * A mapping of sender object to its receiver connection list.
	 */
	var senderMap = new WeakMap();
	/**
	 * A mapping of receiver object to its sender connection list.
	 */
	var receiverMap = new WeakMap();
	/**
	 * Create a connection between a sender, signal, and callback.
	 */
	function connect(sender, signal, callback, thisArg) {
	    // Coerce a `null` thisArg to `undefined`.
	    thisArg = thisArg || void 0;
	    // Search for an equivalent connection and bail if one exists.
	    var list = senderMap.get(sender);
	    if (list && findConnection(list, signal, callback, thisArg)) {
	        return false;
	    }
	    // Create a new connection.
	    var conn = new Connection();
	    conn.signal = signal;
	    conn.callback = callback;
	    conn.thisArg = thisArg;
	    // Add the connection to the receivers list.
	    if (!list) {
	        list = new ConnectionList();
	        list.first = conn;
	        list.last = conn;
	        senderMap.set(sender, list);
	    }
	    else if (list.last === null) {
	        list.first = conn;
	        list.last = conn;
	    }
	    else {
	        list.last.nextReceiver = conn;
	        list.last = conn;
	    }
	    // Add the connection to the senders list.
	    var receiver = thisArg || callback;
	    var head = receiverMap.get(receiver);
	    if (head) {
	        head.prevSender = conn;
	        conn.nextSender = head;
	    }
	    receiverMap.set(receiver, conn);
	    return true;
	}
	/**
	 * Break the connection between a sender, signal, and callback.
	 */
	function disconnect(sender, signal, callback, thisArg) {
	    // Coerce a `null` thisArg to `undefined`.
	    thisArg = thisArg || void 0;
	    // Search for an equivalent connection and bail if none exists.
	    var list = senderMap.get(sender);
	    if (!list) {
	        return false;
	    }
	    var conn = findConnection(list, signal, callback, thisArg);
	    if (!conn) {
	        return false;
	    }
	    // Remove the connection from the senders list. It will be removed
	    // from the receivers list the next time the signal is emitted.
	    removeFromSendersList(conn);
	    // Clear the connection data so it becomes a dead connection.
	    conn.callback = null;
	    conn.thisArg = null;
	    return true;
	}
	/**
	 * Emit a signal and invoke the connected callbacks.
	 */
	function emit(sender, signal, args) {
	    // If there is no connection list, there is nothing to do.
	    var list = senderMap.get(sender);
	    if (!list) {
	        return;
	    }
	    // Prepare to dispatch the callbacks. Increment the reference count
	    // on the list so that the list is cleaned only when the emit stack
	    // is fully unwound.
	    list.refs++;
	    var dirty = false;
	    var last = list.last;
	    var conn = list.first;
	    // Dispatch the callbacks. If a connection has a null callback, it
	    // indicates the list is dirty. Connections which match the signal
	    // are safely dispatched where all exceptions are logged. Dispatch
	    // is stopped at the last connection for the current stack frame.
	    while (conn !== null) {
	        if (!conn.callback) {
	            dirty = true;
	        }
	        else if (conn.signal === signal) {
	            safeInvoke(conn, sender, args);
	        }
	        if (conn === last) {
	            break;
	        }
	        conn = conn.nextReceiver;
	    }
	    // Decrement the reference count on the list.
	    list.refs--;
	    // Clean the list if it's dirty and the emit stack is fully unwound.
	    if (dirty && list.refs === 0) {
	        cleanList(list);
	    }
	}
	/**
	 * Safely invoke the callback for the given connection.
	 *
	 * Exceptions thrown by the callback will be caught and logged.
	 */
	function safeInvoke(conn, sender, args) {
	    try {
	        conn.callback.call(conn.thisArg, sender, args);
	    }
	    catch (err) {
	        console.error('Exception in signal handler:', err);
	    }
	}
	/**
	 * Find a matching connection in the given connection list.
	 *
	 * Returns `null` if no matching connection is found.
	 */
	function findConnection(list, signal, callback, thisArg) {
	    var conn = list.first;
	    while (conn !== null) {
	        if (conn.signal === signal &&
	            conn.callback === callback &&
	            conn.thisArg === thisArg) {
	            return conn;
	        }
	        conn = conn.nextReceiver;
	    }
	    return null;
	}
	/**
	 * Remove the dead connections from the given connection list.
	 */
	function cleanList(list) {
	    var prev;
	    var conn = list.first;
	    while (conn !== null) {
	        var next = conn.nextReceiver;
	        if (!conn.callback) {
	            conn.nextReceiver = null;
	        }
	        else if (!prev) {
	            list.first = conn;
	            prev = conn;
	        }
	        else {
	            prev.nextReceiver = conn;
	            prev = conn;
	        }
	        conn = next;
	    }
	    if (!prev) {
	        list.first = null;
	        list.last = null;
	    }
	    else {
	        prev.nextReceiver = null;
	        list.last = prev;
	    }
	}
	/**
	 * Remove a connection from the doubly linked list of senders.
	 */
	function removeFromSendersList(conn) {
	    var receiver = conn.thisArg || conn.callback;
	    if (!receiver) {
	        return;
	    }
	    var prev = conn.prevSender;
	    var next = conn.nextSender;
	    if (prev === null && next === null) {
	        receiverMap.delete(receiver);
	    }
	    else if (prev === null) {
	        receiverMap.set(receiver, next);
	        next.prevSender = null;
	    }
	    else if (next === null) {
	        prev.nextSender = null;
	    }
	    else {
	        prev.nextSender = next;
	        next.prevSender = prev;
	    }
	    conn.prevSender = null;
	    conn.nextSender = null;
	}
	//# sourceMappingURL=index.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var phosphor_messaging_1 = __webpack_require__(4);
	var phosphor_nodewrapper_1 = __webpack_require__(13);
	var phosphor_properties_1 = __webpack_require__(10);
	var phosphor_signaling_1 = __webpack_require__(11);
	var title_1 = __webpack_require__(14);
	/**
	 * The class name added to Widget instances.
	 */
	var WIDGET_CLASS = 'p-Widget';
	/**
	 * The class name added to hidden widgets.
	 */
	var HIDDEN_CLASS = 'p-mod-hidden';
	/**
	 * The base class of the Phosphor widget hierarchy.
	 *
	 * #### Notes
	 * This class will typically be subclassed in order to create a useful
	 * widget. However, it can be used directly to host externally created
	 * content. Simply instantiate an empty widget and add the DOM content
	 * directly to the widget's `.node`.
	 */
	var Widget = (function (_super) {
	    __extends(Widget, _super);
	    /**
	     * Construct a new widget.
	     */
	    function Widget() {
	        _super.call(this);
	        this._flags = 0;
	        this._layout = null;
	        this._parent = null;
	        this.addClass(WIDGET_CLASS);
	    }
	    /**
	     * Dispose of the widget and its descendants.
	     *
	     * #### Notes
	     * It is generally unsafe to use the widget after it is disposed.
	     *
	     * All calls made to this method after the first are a no-op.
	     */
	    Widget.prototype.dispose = function () {
	        // Do nothing if the widget is already disposed.
	        if (this.isDisposed) {
	            return;
	        }
	        // Set the disposed flag and emit the disposed signal.
	        this.setFlag(WidgetFlag.IsDisposed);
	        this.disposed.emit(void 0);
	        // Remove or detach the widget if necessary.
	        if (this.parent) {
	            this.parent = null;
	        }
	        else if (this.isAttached) {
	            this.detach();
	        }
	        // Dispose of the widget layout.
	        if (this._layout) {
	            this._layout.dispose();
	            this._layout = null;
	        }
	        // Clear the attached data associated with the widget.
	        phosphor_signaling_1.clearSignalData(this);
	        phosphor_messaging_1.clearMessageData(this);
	        phosphor_properties_1.clearPropertyData(this);
	    };
	    Object.defineProperty(Widget.prototype, "disposed", {
	        /**
	         * A signal emitted when the widget is disposed.
	         *
	         * **See also:** [[dispose]], [[disposed]]
	         */
	        get: function () {
	            return WidgetPrivate.disposedSignal.bind(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "isDisposed", {
	        /**
	         * Test whether the widget has been disposed.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * **See also:** [[dispose]], [[disposed]]
	         */
	        get: function () {
	            return this.testFlag(WidgetFlag.IsDisposed);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "isAttached", {
	        /**
	         * Test whether the widget's node is attached to the DOM.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * **See also:** [[attach]], [[detach]]
	         */
	        get: function () {
	            return this.testFlag(WidgetFlag.IsAttached);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "isHidden", {
	        /**
	         * Test whether the widget is explicitly hidden.
	         *
	         * #### Notes
	         * This is a read-only property.
	         *
	         * **See also:** [[isVisible]], [[hide]], [[show]]
	         */
	        get: function () {
	            return this.testFlag(WidgetFlag.IsHidden);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "isVisible", {
	        /**
	         * Test whether the widget is visible.
	         *
	         * #### Notes
	         * A widget is visible when it is attached to the DOM, is not
	         * explicitly hidden, and has no explicitly hidden ancestors.
	         *
	         * This is a read-only property.
	         *
	         * **See also:** [[isHidden]], [[hide]], [[show]]
	         */
	        get: function () {
	            return this.testFlag(WidgetFlag.IsVisible);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "title", {
	        /**
	         * Get the title data object for the widget.
	         *
	         * #### Notes
	         * The title data is used by some container widgets when displaying
	         * the widget along with a title, such as a tab panel or dock panel.
	         *
	         * Not all widgets will make use of the title data, so it is created
	         * on-demand the first time it is accessed.
	         */
	        get: function () {
	            return WidgetPrivate.titleProperty.get(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "parent", {
	        /**
	         * Get the parent of the widget.
	         *
	         * #### Notes
	         * This will be `null` if the widget does not have a parent.
	         */
	        get: function () {
	            return this._parent;
	        },
	        /**
	         * Set the parent of the widget.
	         *
	         * #### Notes
	         * The widget will be automatically removed from its current parent.
	         *
	         * This is a no-op if there is no effective parent change.
	         */
	        set: function (value) {
	            value = value || null;
	            if (this._parent === value) {
	                return;
	            }
	            if (value && this.contains(value)) {
	                throw new Error('Invalid parent widget.');
	            }
	            if (this._parent && !this._parent.isDisposed) {
	                phosphor_messaging_1.sendMessage(this._parent, new ChildMessage('child-removed', this));
	            }
	            this._parent = value;
	            if (this._parent && !this._parent.isDisposed) {
	                phosphor_messaging_1.sendMessage(this._parent, new ChildMessage('child-added', this));
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Widget.prototype, "layout", {
	        /**
	         * Get the layout for the widget.
	         *
	         * #### Notes
	         * This will be `null` if the widget does not have a layout.
	         */
	        get: function () {
	            return this._layout;
	        },
	        /**
	         * Set the layout for the widget.
	         *
	         * #### Notes
	         * The layout is single-use only. It cannot be set to `null` and it
	         * cannot be changed after the first assignment.
	         *
	         * The layout is disposed automatically when the widget is disposed.
	         */
	        set: function (value) {
	            if (!value) {
	                throw new Error('Cannot set widget layout to null.');
	            }
	            if (this._layout === value) {
	                return;
	            }
	            if (this._layout) {
	                throw new Error('Cannot change widget layout.');
	            }
	            if (value.parent) {
	                throw new Error('Cannot change layout parent.');
	            }
	            this._layout = value;
	            value.parent = this;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Test whether a widget is a descendant of this widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @returns `true` if the widget is a descendant, `false` otherwise.
	     */
	    Widget.prototype.contains = function (widget) {
	        while (widget) {
	            if (widget === this) {
	                return true;
	            }
	            widget = widget._parent;
	        }
	        return false;
	    };
	    /**
	     * Post an `'update-request'` message to the widget.
	     *
	     * **See also:** [[MsgUpdateRequest]]
	     */
	    Widget.prototype.update = function () {
	        phosphor_messaging_1.postMessage(this, Widget.MsgUpdateRequest);
	    };
	    /**
	     * Post a `'fit-request'` message to the widget.
	     *
	     * **See also:** [[MsgFitRequest]]
	     */
	    Widget.prototype.fit = function () {
	        phosphor_messaging_1.postMessage(this, Widget.MsgFitRequest);
	    };
	    /**
	     * Send a `'close-request'` message to the widget.
	     *
	     * **See also:** [[MsgCloseRequest]]
	     */
	    Widget.prototype.close = function () {
	        phosphor_messaging_1.sendMessage(this, Widget.MsgCloseRequest);
	    };
	    /**
	     * Show the widget and make it visible to its parent widget.
	     *
	     * #### Notes
	     * This causes the [[isHidden]] property to be `false`.
	     */
	    Widget.prototype.show = function () {
	        if (!this.testFlag(WidgetFlag.IsHidden)) {
	            return;
	        }
	        this.clearFlag(WidgetFlag.IsHidden);
	        this.removeClass(HIDDEN_CLASS);
	        if (this.isAttached && (!this.parent || this.parent.isVisible)) {
	            phosphor_messaging_1.sendMessage(this, Widget.MsgAfterShow);
	        }
	        if (this.parent) {
	            phosphor_messaging_1.sendMessage(this.parent, new ChildMessage('child-shown', this));
	        }
	    };
	    /**
	     * Hide the widget and make it hidden to its parent widget.
	     *
	     * #### Notes
	     * This causes the [[isHidden]] property to be `true`.
	     */
	    Widget.prototype.hide = function () {
	        if (this.testFlag(WidgetFlag.IsHidden)) {
	            return;
	        }
	        this.setFlag(WidgetFlag.IsHidden);
	        if (this.isAttached && (!this.parent || this.parent.isVisible)) {
	            phosphor_messaging_1.sendMessage(this, Widget.MsgBeforeHide);
	        }
	        this.addClass(HIDDEN_CLASS);
	        if (this.parent) {
	            phosphor_messaging_1.sendMessage(this.parent, new ChildMessage('child-hidden', this));
	        }
	    };
	    /**
	     * Set whether the widget is hidden.
	     *
	     * @param hidden - `true` to hide the widget, or `false` to show it.
	     *
	     * #### Notes
	     * `widget.setHidden(true)` is equivalent to `widget.hide()`, and
	     * `widget.setHidden(false)` is equivalent to `widget.show()`.
	     */
	    Widget.prototype.setHidden = function (hidden) {
	        if (hidden) {
	            this.hide();
	        }
	        else {
	            this.show();
	        }
	    };
	    /**
	     * Attach the widget to a host DOM node.
	     *
	     * @param host - The DOM node to use as the widget's host.
	     *
	     * @throws An error if the widget is not a root widget, if the widget
	     *   is already attached, or if the host is not attached to the DOM.
	     */
	    Widget.prototype.attach = function (host) {
	        if (this.parent) {
	            throw new Error('Cannot attach child widget.');
	        }
	        if (this.isAttached || document.body.contains(this.node)) {
	            throw new Error('Widget already attached.');
	        }
	        if (!document.body.contains(host)) {
	            throw new Error('Host not attached.');
	        }
	        host.appendChild(this.node);
	        phosphor_messaging_1.sendMessage(this, Widget.MsgAfterAttach);
	    };
	    /**
	     * Detach the widget from its host DOM node.
	     *
	     * @throws An error if the widget is not a root widget, or if the
	     *   widget is not attached.
	     */
	    Widget.prototype.detach = function () {
	        if (this.parent) {
	            throw new Error('Cannot detach child widget.');
	        }
	        if (!this.isAttached || !document.body.contains(this.node)) {
	            throw new Error('Widget not attached.');
	        }
	        phosphor_messaging_1.sendMessage(this, Widget.MsgBeforeDetach);
	        this.node.parentNode.removeChild(this.node);
	    };
	    /**
	     * Test whether the given widget flag is set.
	     *
	     * #### Notes
	     * This will not typically be consumed directly by user code.
	     */
	    Widget.prototype.testFlag = function (flag) {
	        return (this._flags & flag) !== 0;
	    };
	    /**
	     * Set the given widget flag.
	     *
	     * #### Notes
	     * This will not typically be consumed directly by user code.
	     */
	    Widget.prototype.setFlag = function (flag) {
	        this._flags |= flag;
	    };
	    /**
	     * Clear the given widget flag.
	     *
	     * #### Notes
	     * This will not typically be consumed directly by user code.
	     */
	    Widget.prototype.clearFlag = function (flag) {
	        this._flags &= ~flag;
	    };
	    /**
	     * Compress a message posted to the widget.
	     *
	     * @param msg - The message posted to the widget.
	     *
	     * @param pending - The queue of pending messages for the widget.
	     *
	     * @returns `true` if the message should be ignored, or `false` if
	     *   the message should be enqueued for delivery as normal.
	     *
	     * #### Notes
	     * Subclasses may reimplement this method as needed.
	     */
	    Widget.prototype.compressMessage = function (msg, pending) {
	        if (msg.type === 'update-request') {
	            return pending.some(function (other) { return other.type === 'update-request'; });
	        }
	        if (msg.type === 'fit-request') {
	            return pending.some(function (other) { return other.type === 'fit-request'; });
	        }
	        return false;
	    };
	    /**
	     * Process a message sent to the widget.
	     *
	     * @param msg - The message sent to the widget.
	     *
	     * #### Notes
	     * Subclasses may reimplement this method as needed.
	     */
	    Widget.prototype.processMessage = function (msg) {
	        switch (msg.type) {
	            case 'resize':
	                this.notifyLayout(msg);
	                this.onResize(msg);
	                break;
	            case 'update-request':
	                this.notifyLayout(msg);
	                this.onUpdateRequest(msg);
	                break;
	            case 'after-show':
	                this.setFlag(WidgetFlag.IsVisible);
	                this.notifyLayout(msg);
	                this.onAfterShow(msg);
	                break;
	            case 'before-hide':
	                this.notifyLayout(msg);
	                this.onBeforeHide(msg);
	                this.clearFlag(WidgetFlag.IsVisible);
	                break;
	            case 'after-attach':
	                var visible = !this.isHidden && (!this.parent || this.parent.isVisible);
	                if (visible)
	                    this.setFlag(WidgetFlag.IsVisible);
	                this.setFlag(WidgetFlag.IsAttached);
	                this.notifyLayout(msg);
	                this.onAfterAttach(msg);
	                break;
	            case 'before-detach':
	                this.notifyLayout(msg);
	                this.onBeforeDetach(msg);
	                this.clearFlag(WidgetFlag.IsVisible);
	                this.clearFlag(WidgetFlag.IsAttached);
	                break;
	            case 'close-request':
	                this.notifyLayout(msg);
	                this.onCloseRequest(msg);
	                break;
	            case 'child-added':
	                this.notifyLayout(msg);
	                this.onChildAdded(msg);
	                break;
	            case 'child-removed':
	                this.notifyLayout(msg);
	                this.onChildRemoved(msg);
	                break;
	            default:
	                this.notifyLayout(msg);
	                break;
	        }
	    };
	    /**
	     * Invoke the message processing routine of the widget's layout.
	     *
	     * @param msg - The message to dispatch to the layout.
	     *
	     * #### Notes
	     * This is a no-op if the widget does not have a layout.
	     */
	    Widget.prototype.notifyLayout = function (msg) {
	        if (this.layout)
	            this.layout.processParentMessage(msg);
	    };
	    /**
	     * A message handler invoked on a `'close-request'` message.
	     *
	     * #### Notes
	     * The default implementation of this handler detaches the widget.
	     *
	     * **See also:** [[close]], [[MsgCloseRequest]]
	     */
	    Widget.prototype.onCloseRequest = function (msg) {
	        if (this.parent) {
	            this.parent = null;
	        }
	        else if (this.isAttached) {
	            this.detach();
	        }
	    };
	    /**
	     * A message handler invoked on a `'resize'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     *
	     * **See also:** [[ResizeMessage]]
	     */
	    Widget.prototype.onResize = function (msg) { };
	    /**
	     * A message handler invoked on an `'update-request'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     *
	     * **See also:** [[update]], [[MsgUpdateRequest]]
	     */
	    Widget.prototype.onUpdateRequest = function (msg) { };
	    /**
	     * A message handler invoked on an `'after-show'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     *
	     * **See also:** [[MsgAfterShow]]
	     */
	    Widget.prototype.onAfterShow = function (msg) { };
	    /**
	     * A message handler invoked on a `'before-hide'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     *
	     * **See also:** [[MsgBeforeHide]]
	     */
	    Widget.prototype.onBeforeHide = function (msg) { };
	    /**
	     * A message handler invoked on an `'after-attach'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     *
	     * **See also:** [[MsgAfterAttach]]
	     */
	    Widget.prototype.onAfterAttach = function (msg) { };
	    /**
	     * A message handler invoked on a `'before-detach'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     *
	     * **See also:** [[MsgBeforeDetach]]
	     */
	    Widget.prototype.onBeforeDetach = function (msg) { };
	    /**
	     * A message handler invoked on a `'child-added'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     *
	     * **See also:** [[ChildMessage]]
	     */
	    Widget.prototype.onChildAdded = function (msg) { };
	    /**
	     * A message handler invoked on a `'child-removed'` message.
	     *
	     * The default implementation of this handler is a no-op.
	     *
	     * **See also:** [[ChildMessage]]
	     */
	    Widget.prototype.onChildRemoved = function (msg) { };
	    return Widget;
	})(phosphor_nodewrapper_1.NodeWrapper);
	exports.Widget = Widget;
	/**
	 * The namespace for the `Widget` class statics.
	 */
	var Widget;
	(function (Widget) {
	    /**
	     * A singleton `'update-request'` message.
	     *
	     * #### Notes
	     * This message can be dispatched to supporting widgets in order to
	     * update their content based on the current widget state. Not all
	     * widgets will respond to messages of this type.
	     *
	     * For widgets with a layout, this message will inform the layout to
	     * update the position and size of its child widgets.
	     *
	     * Messages of this type are compressed by default.
	     *
	     * **See also:** [[update]], [[onUpdateRequest]]
	     */
	    Widget.MsgUpdateRequest = new phosphor_messaging_1.Message('update-request');
	    /**
	     * A singleton `'fit-request'` message.
	     *
	     * #### Notes
	     * For widgets with a layout, this message will inform the layout to
	     * recalculate its size constraints to fit the space requirements of
	     * its child widgets, and to update their position and size. Not all
	     * layouts will respond to messages of this type.
	     *
	     * Messages of this type are compressed by default.
	     *
	     * **See also:** [[fit]]
	     */
	    Widget.MsgFitRequest = new phosphor_messaging_1.Message('fit-request');
	    /**
	     * A singleton `'close-request'` message.
	     *
	     * #### Notes
	     * This message should be dispatched to a widget when it should close
	     * and remove itself from the widget hierarchy.
	     *
	     * Messages of this type are compressed by default.
	     *
	     * **See also:** [[close]], [[onCloseRequest]]
	     */
	    Widget.MsgCloseRequest = new phosphor_messaging_1.Message('close-request');
	    /**
	     * A singleton `'after-show'` message.
	     *
	     * #### Notes
	     * This message is sent to a widget after it becomes visible.
	     *
	     * This message is **not** sent when the widget is being attached.
	     *
	     * **See also:** [[isVisible]], [[onAfterShow]]
	     */
	    Widget.MsgAfterShow = new phosphor_messaging_1.Message('after-show');
	    /**
	     * A singleton `'before-hide'` message.
	     *
	     * #### Notes
	     * This message is sent to a widget before it becomes not-visible.
	     *
	     * This message is **not** sent when the widget is being detached.
	     *
	     * **See also:** [[isVisible]], [[onBeforeHide]]
	     */
	    Widget.MsgBeforeHide = new phosphor_messaging_1.Message('before-hide');
	    /**
	     * A singleton `'after-attach'` message.
	     *
	     * #### Notes
	     * This message is sent to a widget after it is attached.
	     *
	     * **See also:** [[isAttached]], [[onAfterAttach]]
	     */
	    Widget.MsgAfterAttach = new phosphor_messaging_1.Message('after-attach');
	    /**
	     * A singleton `'before-detach'` message.
	     *
	     * #### Notes
	     * This message is sent to a widget before it is detached.
	     *
	     * **See also:** [[isAttached]], [[onBeforeDetach]]
	     */
	    Widget.MsgBeforeDetach = new phosphor_messaging_1.Message('before-detach');
	})(Widget = exports.Widget || (exports.Widget = {}));
	/**
	 * An enum of widget bit flags.
	 */
	(function (WidgetFlag) {
	    /**
	     * The widget has been disposed.
	     */
	    WidgetFlag[WidgetFlag["IsDisposed"] = 1] = "IsDisposed";
	    /**
	     * The widget is attached to the DOM.
	     */
	    WidgetFlag[WidgetFlag["IsAttached"] = 2] = "IsAttached";
	    /**
	     * The widget is hidden.
	     */
	    WidgetFlag[WidgetFlag["IsHidden"] = 4] = "IsHidden";
	    /**
	     * The widget is visible.
	     */
	    WidgetFlag[WidgetFlag["IsVisible"] = 8] = "IsVisible";
	})(exports.WidgetFlag || (exports.WidgetFlag = {}));
	var WidgetFlag = exports.WidgetFlag;
	/**
	 * A message class for child related messages.
	 */
	var ChildMessage = (function (_super) {
	    __extends(ChildMessage, _super);
	    /**
	     * Construct a new child message.
	     *
	     * @param type - The message type.
	     *
	     * @param child - The child widget for the message.
	     */
	    function ChildMessage(type, child) {
	        _super.call(this, type);
	        this._child = child;
	    }
	    Object.defineProperty(ChildMessage.prototype, "child", {
	        /**
	         * The child widget for the message.
	         *
	         * #### Notes
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._child;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ChildMessage;
	})(phosphor_messaging_1.Message);
	exports.ChildMessage = ChildMessage;
	/**
	 * A message class for `'resize'` messages.
	 */
	var ResizeMessage = (function (_super) {
	    __extends(ResizeMessage, _super);
	    /**
	     * Construct a new resize message.
	     *
	     * @param width - The **offset width** of the widget, or `-1` if
	     *   the width is not known.
	     *
	     * @param height - The **offset height** of the widget, or `-1` if
	     *   the height is not known.
	     */
	    function ResizeMessage(width, height) {
	        _super.call(this, 'resize');
	        this._width = width;
	        this._height = height;
	    }
	    Object.defineProperty(ResizeMessage.prototype, "width", {
	        /**
	         * The offset width of the widget.
	         *
	         * #### Notes
	         * This will be `-1` if the width is unknown.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ResizeMessage.prototype, "height", {
	        /**
	         * The offset height of the widget.
	         *
	         * #### Notes
	         * This will be `-1` if the height is unknown.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ResizeMessage;
	})(phosphor_messaging_1.Message);
	exports.ResizeMessage = ResizeMessage;
	/**
	 * The namespace for the `ResizeMessage` class statics.
	 */
	var ResizeMessage;
	(function (ResizeMessage) {
	    /**
	     * A singleton `'resize'` message with an unknown size.
	     */
	    ResizeMessage.UnknownSize = new ResizeMessage(-1, -1);
	})(ResizeMessage = exports.ResizeMessage || (exports.ResizeMessage = {}));
	/**
	 * The namespace for the widget private data.
	 */
	var WidgetPrivate;
	(function (WidgetPrivate) {
	    /**
	     * A signal emitted when the widget is disposed.
	     */
	    WidgetPrivate.disposedSignal = new phosphor_signaling_1.Signal();
	    /**
	     * A property for the title data for a widget.
	     */
	    WidgetPrivate.titleProperty = new phosphor_properties_1.Property({
	        name: 'title',
	        create: function () { return new title_1.Title(); },
	    });
	})(WidgetPrivate || (WidgetPrivate = {}));


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	/**
	 * A base class for creating objects which wrap a DOM node.
	 */
	var NodeWrapper = (function () {
	    /**
	     * Construct a new node wrapper.
	     */
	    function NodeWrapper() {
	        this._node = this.constructor.createNode();
	    }
	    /**
	     * Create the DOM node for a new node wrapper instance.
	     *
	     * @returns The DOM node to use with the node wrapper instance.
	     *
	     * #### Notes
	     * The default implementation creates an empty `<div>`.
	     *
	     * This may be reimplemented by a subclass to create a custom node.
	     */
	    NodeWrapper.createNode = function () {
	        return document.createElement('div');
	    };
	    Object.defineProperty(NodeWrapper.prototype, "node", {
	        /**
	         * Get the DOM node managed by the wrapper.
	         *
	         * #### Notes
	         * This property is read-only.
	         */
	        get: function () {
	            return this._node;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NodeWrapper.prototype, "id", {
	        /**
	         * Get the id of the wrapper's DOM node.
	         */
	        get: function () {
	            return this._node.id;
	        },
	        /**
	         * Set the id of the wrapper's DOM node.
	         */
	        set: function (value) {
	            this._node.id = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Test whether the wrapper's DOM node has the given class name.
	     *
	     * @param name - The class name of interest.
	     *
	     * @returns `true` if the node has the class, `false` otherwise.
	     */
	    NodeWrapper.prototype.hasClass = function (name) {
	        return this._node.classList.contains(name);
	    };
	    /**
	     * Add a class name to the wrapper's DOM node.
	     *
	     * @param name - The class name to add to the node.
	     *
	     * #### Notes
	     * If the class name is already added to the node, this is a no-op.
	     */
	    NodeWrapper.prototype.addClass = function (name) {
	        this._node.classList.add(name);
	    };
	    /**
	     * Remove a class name from the wrapper's DOM node.
	     *
	     * @param name - The class name to remove from the node.
	     *
	     * #### Notes
	     * If the class name is not yet added to the node, this is a no-op.
	     */
	    NodeWrapper.prototype.removeClass = function (name) {
	        this._node.classList.remove(name);
	    };
	    /**
	     * Toggle a class name on the wrapper's DOM node.
	     *
	     * @param name - The class name to toggle on the node.
	     *
	     * @param force - Whether to force add the class (`true`) or force
	     *   remove the class (`false`). If not provided, the presence of
	     *   the class will be toggled from its current state.
	     *
	     * @returns `true` if the class is now present, `false` otherwise.
	     */
	    NodeWrapper.prototype.toggleClass = function (name, force) {
	        var present;
	        if (force === true) {
	            this.addClass(name);
	            present = true;
	        }
	        else if (force === false) {
	            this.removeClass(name);
	            present = false;
	        }
	        else if (this.hasClass(name)) {
	            this.removeClass(name);
	            present = false;
	        }
	        else {
	            this.addClass(name);
	            present = true;
	        }
	        return present;
	    };
	    return NodeWrapper;
	})();
	exports.NodeWrapper = NodeWrapper;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var phosphor_properties_1 = __webpack_require__(10);
	var phosphor_signaling_1 = __webpack_require__(11);
	/**
	 * An object which holds data related to a widget title.
	 *
	 * #### Notes
	 * A title object is intended to hold the data necessary to display a
	 * header for a particular widget. A common example is the `TabPanel`,
	 * which uses the widget title to populate the tab for a child widget.
	 */
	var Title = (function () {
	    /**
	     * Construct a new title.
	     *
	     * @param options - The options for initializing a title.
	     */
	    function Title(options) {
	        if (options)
	            TitlePrivate.initFrom(this, options);
	    }
	    Object.defineProperty(Title.prototype, "changed", {
	        /**
	         * A signal emitted when the title state changes.
	         */
	        get: function () {
	            return TitlePrivate.changedSignal.bind(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "text", {
	        /**
	         * Get the text for the title.
	         *
	         * #### Notes
	         * The default value is an empty string.
	         */
	        get: function () {
	            return TitlePrivate.textProperty.get(this);
	        },
	        /**
	         * Set the text for the title.
	         */
	        set: function (value) {
	            TitlePrivate.textProperty.set(this, value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "icon", {
	        /**
	         * Get the icon class name for the title.
	         *
	         * #### Notes
	         * The default value is an empty string.
	         */
	        get: function () {
	            return TitlePrivate.iconProperty.get(this);
	        },
	        /**
	         * Set the icon class name for the title.
	         *
	         * #### Notes
	         * Multiple class names can be separated with whitespace.
	         */
	        set: function (value) {
	            TitlePrivate.iconProperty.set(this, value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "closable", {
	        /**
	         * Get the closable state for the title.
	         *
	         * #### Notes
	         * The default value is `false`.
	         */
	        get: function () {
	            return TitlePrivate.closableProperty.get(this);
	        },
	        /**
	         * Set the closable state for the title.
	         *
	         * #### Notes
	         * This controls the presence of a close icon when applicable.
	         */
	        set: function (value) {
	            TitlePrivate.closableProperty.set(this, value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Title.prototype, "className", {
	        /**
	         * Get the extra class name for the title.
	         *
	         * #### Notes
	         * The default value is an empty string.
	         */
	        get: function () {
	            return TitlePrivate.classNameProperty.get(this);
	        },
	        /**
	         * Set the extra class name for the title.
	         *
	         * #### Notes
	         * Multiple class names can be separated with whitespace.
	         */
	        set: function (value) {
	            TitlePrivate.classNameProperty.set(this, value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Title;
	})();
	exports.Title = Title;
	/**
	 * The namespace for the title private data.
	 */
	var TitlePrivate;
	(function (TitlePrivate) {
	    /**
	     * A signal emitted when the title state changes.
	     */
	    TitlePrivate.changedSignal = new phosphor_signaling_1.Signal();
	    /**
	     * The property descriptor for the title text.
	     */
	    TitlePrivate.textProperty = new phosphor_properties_1.Property({
	        name: 'text',
	        value: '',
	        notify: TitlePrivate.changedSignal,
	    });
	    /**
	     * The property descriptor for the title icon class.
	     */
	    TitlePrivate.iconProperty = new phosphor_properties_1.Property({
	        name: 'icon',
	        value: '',
	        notify: TitlePrivate.changedSignal,
	    });
	    /**
	     * The property descriptor for the title closable state.
	     */
	    TitlePrivate.closableProperty = new phosphor_properties_1.Property({
	        name: 'closable',
	        value: false,
	        notify: TitlePrivate.changedSignal,
	    });
	    /**
	     * The property descriptor for the title extra class name.
	     */
	    TitlePrivate.classNameProperty = new phosphor_properties_1.Property({
	        name: 'className',
	        value: '',
	        notify: TitlePrivate.changedSignal,
	    });
	    /**
	     * Initialize a title from an options object.
	     */
	    function initFrom(title, options) {
	        if (options.text !== void 0) {
	            title.text = options.text;
	        }
	        if (options.icon !== void 0) {
	            title.icon = options.icon;
	        }
	        if (options.closable !== void 0) {
	            title.closable = options.closable;
	        }
	        if (options.className !== void 0) {
	            title.className = options.className;
	        }
	    }
	    TitlePrivate.initFrom = initFrom;
	})(TitlePrivate || (TitlePrivate = {}));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\r\n.p-Widget {\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  overflow: hidden;\r\n  cursor: default;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n\r\n\r\n.p-Widget.p-mod-hidden {\r\n  display: none;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var phosphor_widget_1 = __webpack_require__(8);
	var layout_1 = __webpack_require__(2);
	/**
	 * The class name added to Panel instances.
	 */
	var PANEL_CLASS = 'p-Panel';
	/**
	 * A simple and convenient panel widget class.
	 *
	 * #### Notes
	 * This class is suitable as a base class for implementing a variety of
	 * convenience panels, but can also be used directly along with CSS to
	 * arrange a collection of widgets.
	 *
	 * This class provides a convenience wrapper around a [[PanelLayout]].
	 */
	var Panel = (function (_super) {
	    __extends(Panel, _super);
	    /**
	     * Construct a new panel.
	     */
	    function Panel() {
	        _super.call(this);
	        this.addClass(PANEL_CLASS);
	        this.layout = this.constructor.createLayout();
	    }
	    /**
	     * Create a panel layout to use with a panel.
	     *
	     * @returns A new panel layout to use with a panel.
	     *
	     * #### Notes
	     * This may be reimplemented by a subclass to create custom layouts.
	     */
	    Panel.createLayout = function () {
	        return new layout_1.PanelLayout();
	    };
	    /**
	     * Get the number of child widgets in the panel.
	     *
	     * @returns The number of child widgets in the panel.
	     */
	    Panel.prototype.childCount = function () {
	        return this.layout.childCount();
	    };
	    /**
	     * Get the child widget at the specified index.
	     *
	     * @param index - The index of the child widget of interest.
	     *
	     * @returns The child at the specified index, or `undefined`.
	     */
	    Panel.prototype.childAt = function (index) {
	        return this.layout.childAt(index);
	    };
	    /**
	     * Get the index of the specified child widget.
	     *
	     * @param child - The child widget of interest.
	     *
	     * @returns The index of the specified child, or `-1`.
	     */
	    Panel.prototype.childIndex = function (child) {
	        return this.layout.childIndex(child);
	    };
	    /**
	     * Add a child widget to the end of the panel.
	     *
	     * @param child - The child widget to add to the panel.
	     *
	     * #### Notes
	     * If the child is already contained in the panel, it will be moved.
	     */
	    Panel.prototype.addChild = function (child) {
	        this.layout.addChild(child);
	    };
	    /**
	     * Insert a child widget at the specified index.
	     *
	     * @param index - The index at which to insert the child.
	     *
	     * @param child - The child widget to insert into to the panel.
	     *
	     * #### Notes
	     * If the child is already contained in the panel, it will be moved.
	     */
	    Panel.prototype.insertChild = function (index, child) {
	        this.layout.insertChild(index, child);
	    };
	    return Panel;
	})(phosphor_widget_1.Widget);
	exports.Panel = Panel;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(21));
	__export(__webpack_require__(27));
	__webpack_require__(28);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var arrays = __webpack_require__(3);
	var phosphor_boxengine_1 = __webpack_require__(22);
	var phosphor_domutil_1 = __webpack_require__(23);
	var phosphor_messaging_1 = __webpack_require__(4);
	var phosphor_panel_1 = __webpack_require__(1);
	var phosphor_properties_1 = __webpack_require__(10);
	var phosphor_widget_1 = __webpack_require__(8);
	/**
	 * The class name added to hidden split handles.
	 */
	var HIDDEN_CLASS = 'p-mod-hidden';
	/**
	 * The class name added to horizontal split panels.
	 */
	var HORIZONTAL_CLASS = 'p-mod-horizontal';
	/**
	 * The class name added to vertical split panels.
	 */
	var VERTICAL_CLASS = 'p-mod-vertical';
	/**
	 * The orientation of a split layout.
	 */
	(function (Orientation) {
	    /**
	     * Left-to-right horizontal orientation.
	     */
	    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
	    /**
	     * Top-to-bottom vertical orientation.
	     */
	    Orientation[Orientation["Vertical"] = 1] = "Vertical";
	})(exports.Orientation || (exports.Orientation = {}));
	var Orientation = exports.Orientation;
	/**
	 * A layout which arranges its children into resizable sections.
	 */
	var SplitLayout = (function (_super) {
	    __extends(SplitLayout, _super);
	    /**
	     * Construct a new split layout.
	     *
	     * @param factory - The handle factory for creating split handles.
	     */
	    function SplitLayout(factory) {
	        _super.call(this);
	        this._fixed = 0;
	        this._spacing = 3;
	        this._normed = false;
	        this._box = null;
	        this._sizers = [];
	        this._handles = [];
	        this._orientation = Orientation.Horizontal;
	        this._factory = factory;
	    }
	    Object.defineProperty(SplitLayout.prototype, "orientation", {
	        /**
	         * Get the layout orientation for the split layout.
	         */
	        get: function () {
	            return this._orientation;
	        },
	        /**
	         * Set the layout orientation for the split layout.
	         */
	        set: function (value) {
	            if (this._orientation === value) {
	                return;
	            }
	            this._orientation = value;
	            if (!this.parent) {
	                return;
	            }
	            SplitLayoutPrivate.toggleOrientation(this.parent, value);
	            this.parent.fit();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SplitLayout.prototype, "spacing", {
	        /**
	         * Get the inter-element spacing for the split layout.
	         */
	        get: function () {
	            return this._spacing;
	        },
	        /**
	         * Set the inter-element spacing for the split layout.
	         */
	        set: function (value) {
	            value = Math.max(0, value | 0);
	            if (this._spacing === value) {
	                return;
	            }
	            this._spacing = value;
	            if (!this.parent) {
	                return;
	            }
	            this.parent.fit();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Get the normalized sizes of the widgets in the layout.
	     *
	     * @returns The normalized sizes of the widgets in the layout.
	     */
	    SplitLayout.prototype.sizes = function () {
	        return SplitLayoutPrivate.normalize(this._sizers.map(function (s) { return s.size; }));
	    };
	    /**
	     * Set the relative sizes for the child widgets in the layout.
	     *
	     * @param sizes - The relative sizes for the children in the layout.
	     *   These values will be normalized to the available layout space.
	     *
	     * #### Notes
	     * Extra values are ignored, too few will yield an undefined layout.
	     */
	    SplitLayout.prototype.setSizes = function (sizes) {
	        var normed = SplitLayoutPrivate.normalize(sizes);
	        for (var i = 0, n = this._sizers.length; i < n; ++i) {
	            var hint = Math.max(0, normed[i] || 0);
	            var sizer = this._sizers[i];
	            sizer.sizeHint = hint;
	            sizer.size = hint;
	        }
	        this._normed = true;
	        if (this.parent)
	            this.parent.update();
	    };
	    /**
	     * Get the handle for the widget at the given index.
	     *
	     * @param index - The index of the handle of interest.
	     *
	     * @returns The handle for the given index, or `undefined`.
	     */
	    SplitLayout.prototype.handleAt = function (index) {
	        return this._handles[index];
	    };
	    /**
	     * Move a split handle to the specified offset position.
	     *
	     * @param index - The index of the handle of the interest.
	     *
	     * @param position - The desired offset position of the handle. This
	     *   is the absolute position relative to the origin of the parent.
	     *
	     * #### Notes
	     * This will move the handle as close as possible to the desired
	     * position. The sibling children will be adjusted as necessary.
	     */
	    SplitLayout.prototype.moveHandle = function (index, position) {
	        // Bail if the index is invalid or the handle is hidden.
	        var handle = this._handles[index];
	        if (!handle || handle.classList.contains(HIDDEN_CLASS)) {
	            return;
	        }
	        // Compute the delta movement for the handle.
	        var delta;
	        if (this._orientation === Orientation.Horizontal) {
	            delta = position - handle.offsetLeft;
	        }
	        else {
	            delta = position - handle.offsetTop;
	        }
	        // Bail if there is no handle movement.
	        if (delta === 0) {
	            return;
	        }
	        // Prevent item resizing unless needed.
	        for (var _i = 0, _a = this._sizers; _i < _a.length; _i++) {
	            var sizer = _a[_i];
	            if (sizer.size > 0)
	                sizer.sizeHint = sizer.size;
	        }
	        // Adjust the sizers to reflect the movement.
	        if (delta > 0) {
	            SplitLayoutPrivate.growSizer(this._sizers, index, delta);
	        }
	        else {
	            SplitLayoutPrivate.shrinkSizer(this._sizers, index, -delta);
	        }
	        // Update the layout of the child widgets.
	        if (this.parent)
	            this.parent.update();
	    };
	    /**
	     * Initialize the children of the layout.
	     *
	     * #### Notes
	     * This method is called automatically when the layout is installed
	     * on its parent widget.
	     */
	    SplitLayout.prototype.initialize = function () {
	        SplitLayoutPrivate.toggleOrientation(this.parent, this.orientation);
	        _super.prototype.initialize.call(this);
	    };
	    /**
	     * Attach a child widget to the parent's DOM node.
	     *
	     * @param index - The current index of the child in the layout.
	     *
	     * @param child - The child widget to attach to the parent.
	     *
	     * #### Notes
	     * This is a reimplementation of the superclass method.
	     */
	    SplitLayout.prototype.attachChild = function (index, child) {
	        var handle = SplitLayoutPrivate.createHandle(this._factory);
	        var average = SplitLayoutPrivate.averageSize(this._sizers);
	        var sizer = SplitLayoutPrivate.createSizer(average);
	        arrays.insert(this._sizers, index, sizer);
	        arrays.insert(this._handles, index, handle);
	        SplitLayoutPrivate.prepareGeometry(child);
	        this.parent.node.appendChild(child.node);
	        this.parent.node.appendChild(handle);
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgAfterAttach);
	        this.parent.fit();
	    };
	    /**
	     * Move a child widget in the parent's DOM node.
	     *
	     * @param fromIndex - The previous index of the child in the layout.
	     *
	     * @param toIndex - The current index of the child in the layout.
	     *
	     * @param child - The child widget to move in the parent.
	     *
	     * #### Notes
	     * This is a reimplementation of the superclass method.
	     */
	    SplitLayout.prototype.moveChild = function (fromIndex, toIndex, child) {
	        arrays.move(this._sizers, fromIndex, toIndex);
	        arrays.move(this._handles, fromIndex, toIndex);
	        this.parent.fit(); // fit instead of update to show/hide handles
	    };
	    /**
	     * Detach a child widget from the parent's DOM node.
	     *
	     * @param index - The previous index of the child in the layout.
	     *
	     * @param child - The child widget to detach from the parent.
	     *
	     * #### Notes
	     * This is a reimplementation of the superclass method.
	     */
	    SplitLayout.prototype.detachChild = function (index, child) {
	        var sizer = arrays.removeAt(this._sizers, index);
	        var handle = arrays.removeAt(this._handles, index);
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgBeforeDetach);
	        this.parent.node.removeChild(child.node);
	        this.parent.node.removeChild(handle);
	        SplitLayoutPrivate.resetGeometry(child);
	        this.parent.fit();
	    };
	    /**
	     * A message handler invoked on an `'after-show'` message.
	     */
	    SplitLayout.prototype.onAfterShow = function (msg) {
	        _super.prototype.onAfterShow.call(this, msg);
	        this.parent.update();
	    };
	    /**
	     * A message handler invoked on an `'after-attach'` message.
	     */
	    SplitLayout.prototype.onAfterAttach = function (msg) {
	        _super.prototype.onAfterAttach.call(this, msg);
	        this.parent.fit();
	    };
	    /**
	     * A message handler invoked on a `'child-shown'` message.
	     */
	    SplitLayout.prototype.onChildShown = function (msg) {
	        if (SplitLayoutPrivate.IsIE) {
	            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgFitRequest);
	        }
	        else {
	            this.parent.fit();
	        }
	    };
	    /**
	     * A message handler invoked on a `'child-hidden'` message.
	     */
	    SplitLayout.prototype.onChildHidden = function (msg) {
	        if (SplitLayoutPrivate.IsIE) {
	            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgFitRequest);
	        }
	        else {
	            this.parent.fit();
	        }
	    };
	    /**
	     * A message handler invoked on a `'resize'` message.
	     */
	    SplitLayout.prototype.onResize = function (msg) {
	        if (this.parent.isVisible) {
	            this._update(msg.width, msg.height);
	        }
	    };
	    /**
	     * A message handler invoked on an `'update-request'` message.
	     */
	    SplitLayout.prototype.onUpdateRequest = function (msg) {
	        if (this.parent.isVisible) {
	            this._update(-1, -1);
	        }
	    };
	    /**
	     * A message handler invoked on a `'fit-request'` message.
	     */
	    SplitLayout.prototype.onFitRequest = function (msg) {
	        if (this.parent.isAttached) {
	            this._fit();
	        }
	    };
	    /**
	     * Fit the layout to the total size required by the child widgets.
	     */
	    SplitLayout.prototype._fit = function () {
	        // Update the handles and track the visible widget count.
	        var nVisible = 0;
	        var lastHandle = null;
	        for (var i = 0, n = this.childCount(); i < n; ++i) {
	            var handle = this._handles[i];
	            if (this.childAt(i).isHidden) {
	                handle.classList.add(HIDDEN_CLASS);
	            }
	            else {
	                handle.classList.remove(HIDDEN_CLASS);
	                lastHandle = handle;
	                nVisible++;
	            }
	        }
	        // Hide the handle for the last visible child.
	        if (lastHandle)
	            lastHandle.classList.add(HIDDEN_CLASS);
	        // Update the fixed space for the visible items.
	        this._fixed = this._spacing * Math.max(0, nVisible - 1);
	        // Setup the initial size limits.
	        var minW = 0;
	        var minH = 0;
	        var maxW = Infinity;
	        var maxH = Infinity;
	        var horz = this._orientation === Orientation.Horizontal;
	        if (horz) {
	            minW = this._fixed;
	            maxW = nVisible > 0 ? minW : maxW;
	        }
	        else {
	            minH = this._fixed;
	            maxH = nVisible > 0 ? minH : maxH;
	        }
	        // Update the sizers and computed size limits.
	        for (var i = 0, n = this.childCount(); i < n; ++i) {
	            var child = this.childAt(i);
	            var sizer = this._sizers[i];
	            if (sizer.size > 0) {
	                sizer.sizeHint = sizer.size;
	            }
	            if (child.isHidden) {
	                sizer.minSize = 0;
	                sizer.maxSize = 0;
	                continue;
	            }
	            var limits = phosphor_domutil_1.sizeLimits(child.node);
	            sizer.stretch = SplitLayout.getStretch(child);
	            if (horz) {
	                sizer.minSize = limits.minWidth;
	                sizer.maxSize = limits.maxWidth;
	                minW += limits.minWidth;
	                maxW += limits.maxWidth;
	                minH = Math.max(minH, limits.minHeight);
	                maxH = Math.min(maxH, limits.maxHeight);
	            }
	            else {
	                sizer.minSize = limits.minHeight;
	                sizer.maxSize = limits.maxHeight;
	                minH += limits.minHeight;
	                maxH += limits.maxHeight;
	                minW = Math.max(minW, limits.minWidth);
	                maxW = Math.min(maxW, limits.maxWidth);
	            }
	        }
	        // Update the box sizing and add it to the size constraints.
	        var box = this._box = phosphor_domutil_1.boxSizing(this.parent.node);
	        minW += box.horizontalSum;
	        minH += box.verticalSum;
	        maxW += box.horizontalSum;
	        maxH += box.verticalSum;
	        // Update the parent's size constraints.
	        var style = this.parent.node.style;
	        style.minWidth = minW + "px";
	        style.minHeight = minH + "px";
	        style.maxWidth = maxW === Infinity ? 'none' : maxW + "px";
	        style.maxHeight = maxH === Infinity ? 'none' : maxH + "px";
	        // Notify the ancestor that it should fit immediately.
	        var ancestor = this.parent.parent;
	        if (ancestor)
	            phosphor_messaging_1.sendMessage(ancestor, phosphor_widget_1.Widget.MsgFitRequest);
	        // Notify the parent that it should update immediately.
	        phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgUpdateRequest);
	    };
	    /**
	     * Update the layout position and size of the child widgets.
	     *
	     * The parent offset dimensions should be `-1` if unknown.
	     */
	    SplitLayout.prototype._update = function (offsetWidth, offsetHeight) {
	        // Bail early if there are no children to layout.
	        if (this.childCount() === 0) {
	            return;
	        }
	        // Measure the parent if the offset dimensions are unknown.
	        if (offsetWidth < 0) {
	            offsetWidth = this.parent.node.offsetWidth;
	        }
	        if (offsetHeight < 0) {
	            offsetHeight = this.parent.node.offsetHeight;
	        }
	        // Ensure the parent box sizing data is computed.
	        var box = this._box || (this._box = phosphor_domutil_1.boxSizing(this.parent.node));
	        // Compute the actual layout bounds adjusted for border and padding.
	        var top = box.paddingTop;
	        var left = box.paddingLeft;
	        var width = offsetWidth - box.horizontalSum;
	        var height = offsetHeight - box.verticalSum;
	        // Compute the adjusted layout space.
	        var space;
	        var horz = this._orientation === Orientation.Horizontal;
	        if (horz) {
	            space = Math.max(0, width - this._fixed);
	        }
	        else {
	            space = Math.max(0, height - this._fixed);
	        }
	        // Scale the size hints if they are normalized.
	        if (this._normed) {
	            for (var _i = 0, _a = this._sizers; _i < _a.length; _i++) {
	                var sizer = _a[_i];
	                sizer.sizeHint *= space;
	            }
	            this._normed = false;
	        }
	        // Distribute the layout space to the box sizers.
	        phosphor_boxengine_1.boxCalc(this._sizers, space);
	        // Layout the children using the computed box sizes.
	        var spacing = this._spacing;
	        for (var i = 0, n = this.childCount(); i < n; ++i) {
	            var child = this.childAt(i);
	            if (child.isHidden) {
	                continue;
	            }
	            var handle = this._handles[i];
	            var size = this._sizers[i].size;
	            if (horz) {
	                SplitLayoutPrivate.setGeometry(child, left, top, size, height);
	                left += size;
	                SplitLayoutPrivate.setHandleGeo(handle, left, top, spacing, height);
	                left += spacing;
	            }
	            else {
	                SplitLayoutPrivate.setGeometry(child, left, top, width, size);
	                top += size;
	                SplitLayoutPrivate.setHandleGeo(handle, left, top, width, spacing);
	                top += spacing;
	            }
	        }
	    };
	    return SplitLayout;
	})(phosphor_panel_1.PanelLayout);
	exports.SplitLayout = SplitLayout;
	/**
	 * The namespace for the `SplitLayout` class statics.
	 */
	var SplitLayout;
	(function (SplitLayout) {
	    /**
	     * A convenience alias of the `Horizontal` [[Orientation]].
	     */
	    SplitLayout.Horizontal = Orientation.Horizontal;
	    /**
	     * A convenience alias of the `Vertical` [[Orientation]].
	     */
	    SplitLayout.Vertical = Orientation.Vertical;
	    /**
	     * Get the split layout stretch factor for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @returns The split layout stretch factor for the widget.
	     */
	    function getStretch(widget) {
	        return SplitLayoutPrivate.stretchProperty.get(widget);
	    }
	    SplitLayout.getStretch = getStretch;
	    /**
	     * Set the split layout stretch factor for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @param value - The value for the stretch factor.
	     */
	    function setStretch(widget, value) {
	        SplitLayoutPrivate.stretchProperty.set(widget, value);
	    }
	    SplitLayout.setStretch = setStretch;
	})(SplitLayout = exports.SplitLayout || (exports.SplitLayout = {}));
	/**
	 * The namespace for the `SplitLayout` class private data.
	 */
	var SplitLayoutPrivate;
	(function (SplitLayoutPrivate) {
	    /**
	     * A flag indicating whether the browser is IE.
	     */
	    SplitLayoutPrivate.IsIE = /Trident/.test(navigator.userAgent);
	    /**
	     * The property descriptor for a widget stretch factor.
	     */
	    SplitLayoutPrivate.stretchProperty = new phosphor_properties_1.Property({
	        name: 'stretch',
	        value: 0,
	        coerce: function (owner, value) { return Math.max(0, value | 0); },
	        changed: onChildPropertyChanged,
	    });
	    /**
	     * Create a new box sizer with the given size hint.
	     */
	    function createSizer(size) {
	        var sizer = new phosphor_boxengine_1.BoxSizer();
	        sizer.sizeHint = size | 0;
	        return sizer;
	    }
	    SplitLayoutPrivate.createSizer = createSizer;
	    /**
	     * Create a new split handle using the given factory.
	     */
	    function createHandle(factory) {
	        var handle = factory.createHandle();
	        handle.style.position = 'absolute';
	        return handle;
	    }
	    SplitLayoutPrivate.createHandle = createHandle;
	    /**
	     * Toggle the CSS orientation class for the given widget.
	     */
	    function toggleOrientation(widget, orient) {
	        widget.toggleClass(HORIZONTAL_CLASS, orient === Orientation.Horizontal);
	        widget.toggleClass(VERTICAL_CLASS, orient === Orientation.Vertical);
	    }
	    SplitLayoutPrivate.toggleOrientation = toggleOrientation;
	    /**
	     * Prepare the layout geometry for the given child widget.
	     */
	    function prepareGeometry(widget) {
	        widget.node.style.position = 'absolute';
	    }
	    SplitLayoutPrivate.prepareGeometry = prepareGeometry;
	    /**
	     * Reset the layout geometry for the given child widget.
	     */
	    function resetGeometry(widget) {
	        var rect = rectProperty.get(widget);
	        var style = widget.node.style;
	        rect.top = NaN;
	        rect.left = NaN;
	        rect.width = NaN;
	        rect.height = NaN;
	        style.position = '';
	        style.top = '';
	        style.left = '';
	        style.width = '';
	        style.height = '';
	    }
	    SplitLayoutPrivate.resetGeometry = resetGeometry;
	    /**
	     * Set the layout geometry of a child widget.
	     */
	    function setGeometry(widget, left, top, width, height) {
	        var resized = false;
	        var style = widget.node.style;
	        var rect = rectProperty.get(widget);
	        if (rect.top !== top) {
	            rect.top = top;
	            style.top = top + "px";
	        }
	        if (rect.left !== left) {
	            rect.left = left;
	            style.left = left + "px";
	        }
	        if (rect.width !== width) {
	            resized = true;
	            rect.width = width;
	            style.width = width + "px";
	        }
	        if (rect.height !== height) {
	            resized = true;
	            rect.height = height;
	            style.height = height + "px";
	        }
	        if (resized) {
	            phosphor_messaging_1.sendMessage(widget, new phosphor_widget_1.ResizeMessage(width, height));
	        }
	    }
	    SplitLayoutPrivate.setGeometry = setGeometry;
	    /**
	     * Set the layout geometry of a split handle.
	     */
	    function setHandleGeo(handle, left, top, width, height) {
	        var style = handle.style;
	        style.top = top + "px";
	        style.left = left + "px";
	        style.width = width + "px";
	        style.height = height + "px";
	    }
	    SplitLayoutPrivate.setHandleGeo = setHandleGeo;
	    /**
	     * Compute the average size of the given box sizers.
	     */
	    function averageSize(sizers) {
	        if (sizers.length === 0)
	            return 0;
	        return sizers.reduce(function (v, s) { return v + s.size; }, 0) / sizers.length;
	    }
	    SplitLayoutPrivate.averageSize = averageSize;
	    /**
	     * Normalize an array of positive values.
	     */
	    function normalize(values) {
	        var n = values.length;
	        if (n === 0) {
	            return [];
	        }
	        var sum = 0;
	        for (var i = 0; i < n; ++i) {
	            sum += values[i];
	        }
	        var result = new Array(n);
	        if (sum === 0) {
	            for (var i = 0; i < n; ++i) {
	                result[i] = 1 / n;
	            }
	        }
	        else {
	            for (var i = 0; i < n; ++i) {
	                result[i] = values[i] / sum;
	            }
	        }
	        return result;
	    }
	    SplitLayoutPrivate.normalize = normalize;
	    /**
	     * Grow a sizer to the right by a positive delta and adjust neighbors.
	     */
	    function growSizer(sizers, index, delta) {
	        var growLimit = 0;
	        for (var i = 0; i <= index; ++i) {
	            var sizer = sizers[i];
	            growLimit += sizer.maxSize - sizer.size;
	        }
	        var shrinkLimit = 0;
	        for (var i = index + 1, n = sizers.length; i < n; ++i) {
	            var sizer = sizers[i];
	            shrinkLimit += sizer.size - sizer.minSize;
	        }
	        delta = Math.min(delta, growLimit, shrinkLimit);
	        var grow = delta;
	        for (var i = index; i >= 0 && grow > 0; --i) {
	            var sizer = sizers[i];
	            var limit = sizer.maxSize - sizer.size;
	            if (limit >= grow) {
	                sizer.sizeHint = sizer.size + grow;
	                grow = 0;
	            }
	            else {
	                sizer.sizeHint = sizer.size + limit;
	                grow -= limit;
	            }
	        }
	        var shrink = delta;
	        for (var i = index + 1, n = sizers.length; i < n && shrink > 0; ++i) {
	            var sizer = sizers[i];
	            var limit = sizer.size - sizer.minSize;
	            if (limit >= shrink) {
	                sizer.sizeHint = sizer.size - shrink;
	                shrink = 0;
	            }
	            else {
	                sizer.sizeHint = sizer.size - limit;
	                shrink -= limit;
	            }
	        }
	    }
	    SplitLayoutPrivate.growSizer = growSizer;
	    /**
	     * Shrink a sizer to the left by a positive delta and adjust neighbors.
	     */
	    function shrinkSizer(sizers, index, delta) {
	        var growLimit = 0;
	        for (var i = index + 1, n = sizers.length; i < n; ++i) {
	            var sizer = sizers[i];
	            growLimit += sizer.maxSize - sizer.size;
	        }
	        var shrinkLimit = 0;
	        for (var i = 0; i <= index; ++i) {
	            var sizer = sizers[i];
	            shrinkLimit += sizer.size - sizer.minSize;
	        }
	        delta = Math.min(delta, growLimit, shrinkLimit);
	        var grow = delta;
	        for (var i = index + 1, n = sizers.length; i < n && grow > 0; ++i) {
	            var sizer = sizers[i];
	            var limit = sizer.maxSize - sizer.size;
	            if (limit >= grow) {
	                sizer.sizeHint = sizer.size + grow;
	                grow = 0;
	            }
	            else {
	                sizer.sizeHint = sizer.size + limit;
	                grow -= limit;
	            }
	        }
	        var shrink = delta;
	        for (var i = index; i >= 0 && shrink > 0; --i) {
	            var sizer = sizers[i];
	            var limit = sizer.size - sizer.minSize;
	            if (limit >= shrink) {
	                sizer.sizeHint = sizer.size - shrink;
	                shrink = 0;
	            }
	            else {
	                sizer.sizeHint = sizer.size - limit;
	                shrink -= limit;
	            }
	        }
	    }
	    SplitLayoutPrivate.shrinkSizer = shrinkSizer;
	    /**
	     * A property descriptor for a widget offset rect.
	     */
	    var rectProperty = new phosphor_properties_1.Property({
	        name: 'rect',
	        create: function () { return ({ top: NaN, left: NaN, width: NaN, height: NaN }); },
	    });
	    /**
	     * The change handler for the attached child properties.
	     */
	    function onChildPropertyChanged(child) {
	        var parent = child.parent;
	        var layout = parent && parent.layout;
	        if (layout instanceof SplitLayout)
	            parent.fit();
	    }
	})(SplitLayoutPrivate || (SplitLayoutPrivate = {}));


/***/ },
/* 22 */
/***/ function(module, exports) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	/**
	 * The sizer object for the [[boxCalc]] function.
	 *
	 * A box sizer holds the geometry information for an object along the
	 * layout orientation. An array of box sizers representing a line of
	 * objects is passed to [[boxCalc]] along with the amount of space
	 * available for layout. The algorithm will update the [[size]] of
	 * each box sizer with its computed size.
	 *
	 * #### Notes
	 * For best performance, this class should be treated as a raw data
	 * struct. It should not typically be subclassed.
	 */
	var BoxSizer = (function () {
	    function BoxSizer() {
	        /**
	         * The preferred size for the sizer.
	         *
	         * The sizer will be given this initial size subject to its size
	         * bounds. The sizer will not deviate from this size unless such
	         * deviation is required to fit into the available layout space.
	         *
	         * #### Notes
	         * There is no limit to this value, but it will be clamped to the
	         * bounds defined by [[minSize]] and [[maxSize]].
	         *
	         * The default value is `0`.
	         */
	        this.sizeHint = 0;
	        /**
	         * The minimum size of the sizer.
	         *
	         * The sizer will never be sized less than this value, even if
	         * it means the sizer will overflow the available layout space.
	         *
	         * #### Notes
	         * It is assumed that this value lies in the range `[0, Infinity)`
	         * and that it is `<=` to [[maxSize]]. Failure to adhere to this
	         * constraint will yield undefined results.
	         *
	         * The default value is `0`.
	         */
	        this.minSize = 0;
	        /**
	         * The maximum size of the sizer.
	         *
	         * The sizer will never be sized greater than this value, even if
	         * it means the sizer will underflow the available layout space.
	         *
	         * #### Notes
	         * It is assumed that this value lies in the range `[0, Infinity]`
	         * and that it is `>=` to [[minSize]]. Failure to adhere to this
	         * constraint will yield undefined results.
	         *
	         * The default value is `Infinity`.
	         */
	        this.maxSize = Infinity;
	        /**
	         * The stretch factor for the sizer.
	         *
	         * This controls how much the sizer stretches relative to its sibling
	         * sizers when layout space is distributed. A stretch factor of zero
	         * is special and will cause the sizer to only be resized after all
	         * other sizers with a stretch factor greater than zero have been
	         * resized to their limits.
	         *
	         * #### Notes
	         * It is assumed that this value is an integer that lies in the range
	         * `[0, Infinity)`. Failure to adhere to this constraint will yield
	         * undefined results.
	         *
	         * The default value is `1`.
	         */
	        this.stretch = 1;
	        /**
	         * The computed size of the sizer.
	         *
	         * This value is the output of a call to [[boxCalc]]. It represents
	         * the computed size for the object along the layout orientation,
	         * and will always lie in the range `[minSize, maxSize]`.
	         *
	         * #### Notes
	         * This value is output only. Changing the value will have no effect.
	         */
	        this.size = 0;
	        /**
	         * An internal storage property for the layout algorithm.
	         *
	         * #### Notes
	         * This value is used as temporary storage by the layout algorithm.
	         * Changing the value will have no effect.
	         */
	        this.done = false;
	    }
	    return BoxSizer;
	})();
	exports.BoxSizer = BoxSizer;
	/**
	 * Compute the optimal layout sizes for an array of box sizers.
	 *
	 * This distributes the available layout space among the box sizers
	 * according to the following algorithm:
	 *
	 * 1. Initialize the sizers's size to its size hint and compute the
	 *    sums for each of size hint, min size, and max size.
	 *
	 * 2. If the total size hint equals the available space, return.
	 *
	 * 3. If the available space is less than the total min size, set all
	 *    sizers to their min size and return.
	 *
	 * 4. If the available space is greater than the total max size, set
	 *    all sizers to their max size and return.
	 *
	 * 5. If the layout space is less than the total size hint, distribute
	 *    the negative delta as follows:
	 *
	 *    a. Shrink each sizer with a stretch factor greater than zero by
	 *       an amount proportional to the negative space and the sum of
	 *       stretch factors. If the sizer reaches its min size, remove
	 *       it and its stretch factor from the computation.
	 *
	 *    b. If after adjusting all stretch sizers there remains negative
	 *       space, distribute the space equally among the sizers with a
	 *       stretch factor of zero. If a sizer reaches its min size,
	 *       remove it from the computation.
	 *
	 * 6. If the layout space is greater than the total size hint,
	 *    distribute the positive delta as follows:
	 *
	 *    a. Expand each sizer with a stretch factor greater than zero by
	 *       an amount proportional to the postive space and the sum of
	 *       stretch factors. If the sizer reaches its max size, remove
	 *       it and its stretch factor from the computation.
	 *
	 *    b. If after adjusting all stretch sizers there remains positive
	 *       space, distribute the space equally among the sizers with a
	 *       stretch factor of zero. If a sizer reaches its max size,
	 *       remove it from the computation.
	 *
	 * 7. return
	 *
	 * @param sizers - The sizers for a particular layout line.
	 *
	 * @param space - The available layout space for the sizers.
	 *
	 * #### Notes
	 * This function can be called at any time to recompute the layout
	 * sizing for an existing array of sizers. The previously computed
	 * results will have no effect on the new output. It is therefore
	 * not necessary to create new sizers on each resize event.
	 */
	function boxCalc(sizers, space) {
	    // Bail early if there is nothing to do.
	    var count = sizers.length;
	    if (count === 0) {
	        return;
	    }
	    // Setup the size and stretch counters.
	    var totalMin = 0;
	    var totalMax = 0;
	    var totalSize = 0;
	    var totalStretch = 0;
	    var stretchCount = 0;
	    // Setup the sizers and compute the totals.
	    for (var i = 0; i < count; ++i) {
	        var sizer = sizers[i];
	        initSizer(sizer);
	        totalSize += sizer.size;
	        totalMin += sizer.minSize;
	        totalMax += sizer.maxSize;
	        if (sizer.stretch > 0) {
	            totalStretch += sizer.stretch;
	            stretchCount++;
	        }
	    }
	    // If the space is equal to the total size, return.
	    if (space === totalSize) {
	        return;
	    }
	    // If the space is less than the total min, minimize each sizer.
	    if (space <= totalMin) {
	        for (var i = 0; i < count; ++i) {
	            var sizer = sizers[i];
	            sizer.size = sizer.minSize;
	        }
	        return;
	    }
	    // If the space is greater than the total max, maximize each sizer.
	    if (space >= totalMax) {
	        for (var i = 0; i < count; ++i) {
	            var sizer = sizers[i];
	            sizer.size = sizer.maxSize;
	        }
	        return;
	    }
	    // The loops below perform sub-pixel precision sizing. A near zero
	    // value is used for compares instead of zero to ensure that the
	    // loop terminates when the subdivided space is reasonably small.
	    var nearZero = 0.01;
	    // A counter which is decremented each time a sizer is resized to
	    // its limit. This ensures the loops terminate even if there is
	    // space remaining to distribute.
	    var notDoneCount = count;
	    // Distribute negative delta space.
	    if (space < totalSize) {
	        // Shrink each stretchable sizer by an amount proportional to its
	        // stretch factor. If a sizer reaches its min size it's marked as
	        // done. The loop progresses in phases where each sizer is given
	        // a chance to consume its fair share for the pass, regardless of
	        // whether a sizer before it reached its limit. This continues
	        // until the stretchable sizers or the free space is exhausted.
	        var freeSpace = totalSize - space;
	        while (stretchCount > 0 && freeSpace > nearZero) {
	            var distSpace = freeSpace;
	            var distStretch = totalStretch;
	            for (var i = 0; i < count; ++i) {
	                var sizer = sizers[i];
	                if (sizer.done || sizer.stretch === 0) {
	                    continue;
	                }
	                var amt = sizer.stretch * distSpace / distStretch;
	                if (sizer.size - amt <= sizer.minSize) {
	                    freeSpace -= sizer.size - sizer.minSize;
	                    totalStretch -= sizer.stretch;
	                    sizer.size = sizer.minSize;
	                    sizer.done = true;
	                    notDoneCount--;
	                    stretchCount--;
	                }
	                else {
	                    freeSpace -= amt;
	                    sizer.size -= amt;
	                }
	            }
	        }
	        // Distribute any remaining space evenly among the non-stretchable
	        // sizers. This progresses in phases in the same manner as above.
	        while (notDoneCount > 0 && freeSpace > nearZero) {
	            var amt = freeSpace / notDoneCount;
	            for (var i = 0; i < count; ++i) {
	                var sizer = sizers[i];
	                if (sizer.done) {
	                    continue;
	                }
	                if (sizer.size - amt <= sizer.minSize) {
	                    freeSpace -= sizer.size - sizer.minSize;
	                    sizer.size = sizer.minSize;
	                    sizer.done = true;
	                    notDoneCount--;
	                }
	                else {
	                    freeSpace -= amt;
	                    sizer.size -= amt;
	                }
	            }
	        }
	    }
	    else {
	        // Expand each stretchable sizer by an amount proportional to its
	        // stretch factor. If a sizer reaches its max size it's marked as
	        // done. The loop progresses in phases where each sizer is given
	        // a chance to consume its fair share for the pass, regardless of
	        // whether a sizer before it reached its limit. This continues
	        // until the stretchable sizers or the free space is exhausted.
	        var freeSpace = space - totalSize;
	        while (stretchCount > 0 && freeSpace > nearZero) {
	            var distSpace = freeSpace;
	            var distStretch = totalStretch;
	            for (var i = 0; i < count; ++i) {
	                var sizer = sizers[i];
	                if (sizer.done || sizer.stretch === 0) {
	                    continue;
	                }
	                var amt = sizer.stretch * distSpace / distStretch;
	                if (sizer.size + amt >= sizer.maxSize) {
	                    freeSpace -= sizer.maxSize - sizer.size;
	                    totalStretch -= sizer.stretch;
	                    sizer.size = sizer.maxSize;
	                    sizer.done = true;
	                    notDoneCount--;
	                    stretchCount--;
	                }
	                else {
	                    freeSpace -= amt;
	                    sizer.size += amt;
	                }
	            }
	        }
	        // Distribute any remaining space evenly among the non-stretchable
	        // sizers. This progresses in phases in the same manner as above.
	        while (notDoneCount > 0 && freeSpace > nearZero) {
	            var amt = freeSpace / notDoneCount;
	            for (var i = 0; i < count; ++i) {
	                var sizer = sizers[i];
	                if (sizer.done) {
	                    continue;
	                }
	                if (sizer.size + amt >= sizer.maxSize) {
	                    freeSpace -= sizer.maxSize - sizer.size;
	                    sizer.size = sizer.maxSize;
	                    sizer.done = true;
	                    notDoneCount--;
	                }
	                else {
	                    freeSpace -= amt;
	                    sizer.size += amt;
	                }
	            }
	        }
	    }
	}
	exports.boxCalc = boxCalc;
	/**
	 * (Re)initialize a box sizer's data for a layout pass.
	 */
	function initSizer(sizer) {
	    sizer.size = Math.max(sizer.minSize, Math.min(sizer.sizeHint, sizer.maxSize));
	    sizer.done = false;
	}
	//# sourceMappingURL=index.js.map

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var phosphor_disposable_1 = __webpack_require__(24);
	__webpack_require__(25);
	/**
	 * The class name added to the document body during cursor override.
	 */
	var OVERRIDE_CURSOR_CLASS = 'p-mod-override-cursor';
	/**
	 * The id for the active cursor override.
	 */
	var overrideID = 0;
	/**
	 * Override the cursor for the entire document.
	 *
	 * @param cursor - The string representing the cursor style.
	 *
	 * @returns A disposable which will clear the override when disposed.
	 *
	 * #### Notes
	 * The most recent call to `overrideCursor` takes precedence. Disposing
	 * an old override is a no-op and will not effect the current override.
	 *
	 * #### Example
	 * ```typescript
	 * import { overrideCursor } from 'phosphor-domutil';
	 *
	 * // force the cursor to be 'wait' for the entire document
	 * let override = overrideCursor('wait');
	 *
	 * // clear the override by disposing the return value
	 * override.dispose();
	 * ```
	 */
	function overrideCursor(cursor) {
	    var id = ++overrideID;
	    var body = document.body;
	    body.style.cursor = cursor;
	    body.classList.add(OVERRIDE_CURSOR_CLASS);
	    return new phosphor_disposable_1.DisposableDelegate(function () {
	        if (id === overrideID) {
	            body.style.cursor = '';
	            body.classList.remove(OVERRIDE_CURSOR_CLASS);
	        }
	    });
	}
	exports.overrideCursor = overrideCursor;
	/**
	 * Test whether a client position lies within a node.
	 *
	 * @param node - The DOM node of interest.
	 *
	 * @param clientX - The client X coordinate of interest.
	 *
	 * @param clientY - The client Y coordinate of interest.
	 *
	 * @returns `true` if the node covers the position, `false` otherwise.
	 *
	 * #### Example
	 * ```typescript
	 * import { hitTest } from 'phosphor-domutil';
	 *
	 * let div = document.createElement('div');
	 * div.style.position = 'absolute';
	 * div.style.left = '0px';
	 * div.style.top = '0px';
	 * div.style.width = '100px';
	 * div.style.height = '100px';
	 * document.body.appendChild(div);
	 *
	 * hitTest(div, 50, 50);   // true
	 * hitTest(div, 150, 150); // false
	 * ```
	 */
	function hitTest(node, clientX, clientY) {
	    var rect = node.getBoundingClientRect();
	    return (clientX >= rect.left &&
	        clientX < rect.right &&
	        clientY >= rect.top &&
	        clientY < rect.bottom);
	}
	exports.hitTest = hitTest;
	/**
	 * Compute the box sizing for a DOM node.
	 *
	 * @param node - The DOM node for which to compute the box sizing.
	 *
	 * @returns The box sizing data for the specified DOM node.
	 *
	 * #### Example
	 * ```typescript
	 * import { boxSizing } from 'phosphor-domutil';
	 *
	 * let div = document.createElement('div');
	 * div.style.borderTop = 'solid 10px black';
	 * document.body.appendChild(div);
	 *
	 * let sizing = boxSizing(div);
	 * sizing.borderTop;    // 10
	 * sizing.paddingLeft;  // 0
	 * // etc...
	 * ```
	 */
	function boxSizing(node) {
	    var cstyle = window.getComputedStyle(node);
	    var bt = parseInt(cstyle.borderTopWidth, 10) || 0;
	    var bl = parseInt(cstyle.borderLeftWidth, 10) || 0;
	    var br = parseInt(cstyle.borderRightWidth, 10) || 0;
	    var bb = parseInt(cstyle.borderBottomWidth, 10) || 0;
	    var pt = parseInt(cstyle.paddingTop, 10) || 0;
	    var pl = parseInt(cstyle.paddingLeft, 10) || 0;
	    var pr = parseInt(cstyle.paddingRight, 10) || 0;
	    var pb = parseInt(cstyle.paddingBottom, 10) || 0;
	    var hs = bl + pl + pr + br;
	    var vs = bt + pt + pb + bb;
	    return {
	        borderTop: bt,
	        borderLeft: bl,
	        borderRight: br,
	        borderBottom: bb,
	        paddingTop: pt,
	        paddingLeft: pl,
	        paddingRight: pr,
	        paddingBottom: pb,
	        horizontalSum: hs,
	        verticalSum: vs,
	    };
	}
	exports.boxSizing = boxSizing;
	/**
	 * Compute the size limits for a DOM node.
	 *
	 * @param node - The node for which to compute the size limits.
	 *
	 * @returns The size limit data for the specified DOM node.
	 *
	 * #### Example
	 * ```typescript
	 * import { sizeLimits } from 'phosphor-domutil';
	 *
	 * let div = document.createElement('div');
	 * div.style.minWidth = '90px';
	 * document.body.appendChild(div);
	 *
	 * let limits = sizeLimits(div);
	 * limits.minWidth;   // 90
	 * limits.maxHeight;  // Infinity
	 * // etc...
	 * ```
	 */
	function sizeLimits(node) {
	    var cstyle = window.getComputedStyle(node);
	    return {
	        minWidth: parseInt(cstyle.minWidth, 10) || 0,
	        minHeight: parseInt(cstyle.minHeight, 10) || 0,
	        maxWidth: parseInt(cstyle.maxWidth, 10) || Infinity,
	        maxHeight: parseInt(cstyle.maxHeight, 10) || Infinity,
	    };
	}
	exports.sizeLimits = sizeLimits;
	//# sourceMappingURL=index.js.map

/***/ },
/* 24 */
/***/ function(module, exports) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	/**
	 * A disposable object which delegates to a callback.
	 */
	var DisposableDelegate = (function () {
	    /**
	     * Construct a new disposable delegate.
	     *
	     * @param callback - The function to invoke when the delegate is
	     *   disposed.
	     */
	    function DisposableDelegate(callback) {
	        this._callback = callback || null;
	    }
	    Object.defineProperty(DisposableDelegate.prototype, "isDisposed", {
	        /**
	         * Test whether the delegate has been disposed.
	         *
	         * #### Notes
	         * This is a read-only property which is always safe to access.
	         */
	        get: function () {
	            return this._callback === null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Dispose of the delegate and invoke its callback.
	     *
	     * #### Notes
	     * If this method is called more than once, all calls made after the
	     * first will be a no-op.
	     */
	    DisposableDelegate.prototype.dispose = function () {
	        if (this._callback === null) {
	            return;
	        }
	        var callback = this._callback;
	        this._callback = null;
	        callback();
	    };
	    return DisposableDelegate;
	})();
	exports.DisposableDelegate = DisposableDelegate;
	/**
	 * An object which manages a collection of disposable items.
	 */
	var DisposableSet = (function () {
	    /**
	     * Construct a new disposable set.
	     *
	     * @param items - The initial disposable items for the set.
	     */
	    function DisposableSet(items) {
	        var _this = this;
	        this._set = new Set();
	        if (items)
	            items.forEach(function (item) { _this._set.add(item); });
	    }
	    Object.defineProperty(DisposableSet.prototype, "isDisposed", {
	        /**
	         * Test whether the set has been disposed.
	         *
	         * #### Notes
	         * This is a read-only property which is always safe to access.
	         */
	        get: function () {
	            return this._set === null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Dispose of the set and dispose the items it contains.
	     *
	     * #### Notes
	     * Items are disposed in the order they are added to the set.
	     *
	     * It is unsafe to use the set after it has been disposed.
	     *
	     * If this method is called more than once, all calls made after the
	     * first will be a no-op.
	     */
	    DisposableSet.prototype.dispose = function () {
	        if (this._set === null) {
	            return;
	        }
	        var set = this._set;
	        this._set = null;
	        set.forEach(function (item) { item.dispose(); });
	    };
	    /**
	     * Add a disposable item to the set.
	     *
	     * @param item - The disposable item to add to the set. If the item
	     *   is already contained in the set, this is a no-op.
	     *
	     * @throws Will throw an error if the set has been disposed.
	     */
	    DisposableSet.prototype.add = function (item) {
	        if (this._set === null) {
	            throw new Error('object is disposed');
	        }
	        this._set.add(item);
	    };
	    /**
	     * Remove a disposable item from the set.
	     *
	     * @param item - The disposable item to remove from the set. If the
	     *   item does not exist in the set, this is a no-op.
	     *
	     * @throws Will throw an error if the set has been disposed.
	     */
	    DisposableSet.prototype.remove = function (item) {
	        if (this._set === null) {
	            throw new Error('object is disposed');
	        }
	        this._set.delete(item);
	    };
	    /**
	     * Clear all disposable items from the set.
	     *
	     * @throws Will throw an error if the set has been disposed.
	     */
	    DisposableSet.prototype.clear = function () {
	        if (this._set === null) {
	            throw new Error('object is disposed');
	        }
	        this._set.clear();
	    };
	    return DisposableSet;
	})();
	exports.DisposableSet = DisposableSet;
	//# sourceMappingURL=index.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\r\nbody.p-mod-override-cursor * {\r\n  cursor: inherit !important;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var phosphor_domutil_1 = __webpack_require__(23);
	var phosphor_panel_1 = __webpack_require__(1);
	var layout_1 = __webpack_require__(21);
	/**
	 * The class name added to SplitPanel instances.
	 */
	var SPLIT_PANEL_CLASS = 'p-SplitPanel';
	/**
	 * The class name added to split panel children.
	 */
	var CHILD_CLASS = 'p-SplitPanel-child';
	/**
	 * The class name added to split panel handles.
	 */
	var HANDLE_CLASS = 'p-SplitPanel-handle';
	/**
	 * A panel which arranges its children into resizable sections.
	 *
	 * #### Notes
	 * This class provides a convenience wrapper around a [[SplitLayout]].
	 */
	var SplitPanel = (function (_super) {
	    __extends(SplitPanel, _super);
	    /**
	     * Construct a new split panel.
	     */
	    function SplitPanel() {
	        _super.call(this);
	        this._pressData = null;
	        this.addClass(SPLIT_PANEL_CLASS);
	    }
	    /**
	     * Create a split layout for a split panel.
	     */
	    SplitPanel.createLayout = function () {
	        return new layout_1.SplitLayout(this);
	    };
	    /**
	     * Create a split handle for use in a split panel.
	     *
	     * #### Notes
	     * This may be reimplemented to create custom split handles.
	     */
	    SplitPanel.createHandle = function () {
	        var handle = document.createElement('div');
	        handle.className = HANDLE_CLASS;
	        return handle;
	    };
	    /**
	     * Dispose of the resources held by the panel.
	     */
	    SplitPanel.prototype.dispose = function () {
	        this._releaseMouse();
	        _super.prototype.dispose.call(this);
	    };
	    Object.defineProperty(SplitPanel.prototype, "orientation", {
	        /**
	         * Get the layout orientation for the split panel.
	         */
	        get: function () {
	            return this.layout.orientation;
	        },
	        /**
	         * Set the layout orientation for the split panel.
	         */
	        set: function (value) {
	            this.layout.orientation = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SplitPanel.prototype, "spacing", {
	        /**
	         * Get the inter-element spacing for the split panel.
	         */
	        get: function () {
	            return this.layout.spacing;
	        },
	        /**
	         * Set the inter-element spacing for the split panel.
	         */
	        set: function (value) {
	            this.layout.spacing = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Get the normalized sizes of the widgets in the panel.
	     *
	     * @returns The normalized sizes of the widgets in the panel.
	     */
	    SplitPanel.prototype.sizes = function () {
	        return this.layout.sizes();
	    };
	    /**
	     * Set the relative sizes for the child widgets in the panel.
	     *
	     * @param sizes - The relative sizes for the children in the panel.
	     *   These values will be normalized to the available layout space.
	     *
	     * #### Notes
	     * Extra values are ignored, too few will yield an undefined layout.
	     */
	    SplitPanel.prototype.setSizes = function (sizes) {
	        this.layout.setSizes(sizes);
	    };
	    /**
	     * Get the split handle for the widget at the given index.
	     *
	     * @param index - The index of the widget of interest.
	     *
	     * @returns The split handle for the widget, or `undefined`.
	     */
	    SplitPanel.prototype.handleAt = function (index) {
	        return this.layout.handleAt(index);
	    };
	    /**
	     * Handle the DOM events for the split panel.
	     *
	     * @param event - The DOM event sent to the panel.
	     *
	     * #### Notes
	     * This method implements the DOM `EventListener` interface and is
	     * called in response to events on the panel's DOM node. It should
	     * not be called directly by user code.
	     */
	    SplitPanel.prototype.handleEvent = function (event) {
	        switch (event.type) {
	            case 'mousedown':
	                this._evtMouseDown(event);
	                break;
	            case 'mousemove':
	                this._evtMouseMove(event);
	                break;
	            case 'mouseup':
	                this._evtMouseUp(event);
	                break;
	            case 'keydown':
	                this._evtKeyDown(event);
	                break;
	            case 'keyup':
	            case 'keypress':
	            case 'contextmenu':
	                // Stop all input events during drag.
	                event.preventDefault();
	                event.stopPropagation();
	                break;
	        }
	    };
	    /**
	     * A message handler invoked on an `'after-attach'` message.
	     */
	    SplitPanel.prototype.onAfterAttach = function (msg) {
	        this.node.addEventListener('mousedown', this);
	    };
	    /**
	     * A message handler invoked on a `'before-detach'` message.
	     */
	    SplitPanel.prototype.onBeforeDetach = function (msg) {
	        this.node.removeEventListener('mousedown', this);
	        this._releaseMouse();
	    };
	    /**
	     * A message handler invoked on a `'child-added'` message.
	     */
	    SplitPanel.prototype.onChildAdded = function (msg) {
	        msg.child.addClass(CHILD_CLASS);
	        this._releaseMouse();
	    };
	    /**
	     * A message handler invoked on a `'child-removed'` message.
	     */
	    SplitPanel.prototype.onChildRemoved = function (msg) {
	        msg.child.removeClass(CHILD_CLASS);
	        this._releaseMouse();
	    };
	    /**
	     * Handle the `'keydown'` event for the split panel.
	     */
	    SplitPanel.prototype._evtKeyDown = function (event) {
	        // Stop all input events during drag.
	        event.preventDefault();
	        event.stopPropagation();
	        // Release the mouse if `Escape` is pressed.
	        if (event.keyCode === 27)
	            this._releaseMouse();
	    };
	    /**
	     * Handle the `'mousedown'` event for the split panel.
	     */
	    SplitPanel.prototype._evtMouseDown = function (event) {
	        // Do nothing if the left mouse button is not pressed.
	        if (event.button !== 0) {
	            return;
	        }
	        // Find the handle which contains the target, if any.
	        var layout = this.layout;
	        var target = event.target;
	        var _a = SplitPanelPrivate.findHandle(layout, target), index = _a.index, handle = _a.handle;
	        if (index === -1) {
	            return;
	        }
	        // Stop the event when a split handle is pressed.
	        event.preventDefault();
	        event.stopPropagation();
	        // Add the extra document listeners.
	        document.addEventListener('mouseup', this, true);
	        document.addEventListener('mousemove', this, true);
	        document.addEventListener('keydown', this, true);
	        document.addEventListener('keyup', this, true);
	        document.addEventListener('keypress', this, true);
	        document.addEventListener('contextmenu', this, true);
	        // Compute the offset delta for the handle press.
	        var delta;
	        var rect = handle.getBoundingClientRect();
	        if (layout.orientation === layout_1.Orientation.Horizontal) {
	            delta = event.clientX - rect.left;
	        }
	        else {
	            delta = event.clientY - rect.top;
	        }
	        // Override the cursor and store the press data.
	        var style = window.getComputedStyle(handle);
	        var override = phosphor_domutil_1.overrideCursor(style.cursor);
	        this._pressData = { index: index, delta: delta, override: override };
	    };
	    /**
	     * Handle the `'mousemove'` event for the split panel.
	     */
	    SplitPanel.prototype._evtMouseMove = function (event) {
	        // Stop the event when dragging a split handle.
	        event.preventDefault();
	        event.stopPropagation();
	        // Compute the desired offset position for the handle.
	        var pos;
	        var layout = this.layout;
	        var rect = this.node.getBoundingClientRect();
	        if (layout.orientation === layout_1.Orientation.Horizontal) {
	            pos = event.clientX - rect.left - this._pressData.delta;
	        }
	        else {
	            pos = event.clientY - rect.top - this._pressData.delta;
	        }
	        // Move the handle as close to the desired position as possible.
	        layout.moveHandle(this._pressData.index, pos);
	    };
	    /**
	     * Handle the `'mouseup'` event for the split panel.
	     */
	    SplitPanel.prototype._evtMouseUp = function (event) {
	        // Do nothing if the left mouse button is not released.
	        if (event.button !== 0) {
	            return;
	        }
	        // Stop the event when releasing a handle.
	        event.preventDefault();
	        event.stopPropagation();
	        // Finalize the mouse release.
	        this._releaseMouse();
	    };
	    /**
	     * Release the mouse grab for the split panel.
	     */
	    SplitPanel.prototype._releaseMouse = function () {
	        // Bail early if no drag is in progress.
	        if (!this._pressData) {
	            return;
	        }
	        // Clear the override cursor.
	        this._pressData.override.dispose();
	        this._pressData = null;
	        // Remove the extra document listeners.
	        document.removeEventListener('mouseup', this, true);
	        document.removeEventListener('mousemove', this, true);
	        document.removeEventListener('keydown', this, true);
	        document.removeEventListener('keyup', this, true);
	        document.removeEventListener('keypress', this, true);
	        document.removeEventListener('contextmenu', this, true);
	    };
	    return SplitPanel;
	})(phosphor_panel_1.Panel);
	exports.SplitPanel = SplitPanel;
	/**
	 * The namespace for the `SplitPanel` class statics.
	 */
	var SplitPanel;
	(function (SplitPanel) {
	    /**
	     * A convenience alias of the `Horizontal` [[Orientation]].
	     */
	    SplitPanel.Horizontal = layout_1.Orientation.Horizontal;
	    /**
	     * A convenience alias of the `Vertical` [[Orientation]].
	     */
	    SplitPanel.Vertical = layout_1.Orientation.Vertical;
	    /**
	     * Get the split panel stretch factor for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @returns The split panel stretch factor for the widget.
	     */
	    function getStretch(widget) {
	        return layout_1.SplitLayout.getStretch(widget);
	    }
	    SplitPanel.getStretch = getStretch;
	    /**
	     * Set the split panel stretch factor for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @param value - The value for the stretch factor.
	     */
	    function setStretch(widget, value) {
	        layout_1.SplitLayout.setStretch(widget, value);
	    }
	    SplitPanel.setStretch = setStretch;
	})(SplitPanel = exports.SplitPanel || (exports.SplitPanel = {}));
	/**
	 * The namespace for the `SplitPanel` class private data.
	 */
	var SplitPanelPrivate;
	(function (SplitPanelPrivate) {
	    /**
	     * Find the split handle which contains the given target element.
	     */
	    function findHandle(layout, target) {
	        for (var i = 0, n = layout.childCount(); i < n; ++i) {
	            var handle = layout.handleAt(i);
	            if (handle.contains(target)) {
	                return { index: i, handle: handle };
	            }
	        }
	        return { index: -1, handle: null };
	    }
	    SplitPanelPrivate.findHandle = findHandle;
	})(SplitPanelPrivate || (SplitPanelPrivate = {}));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n.p-SplitPanel {\n  z-index: 0;\n}\n\n\n.p-SplitPanel-child {\n  z-index: 0;\n}\n\n\n.p-SplitPanel-handle {\n  z-index: 1;\n}\n\n\n.p-SplitPanel-handle.p-mod-hidden {\n  display: none;\n}\n\n\n.p-SplitPanel-handle:after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  content: '';\n}\n\n\n.p-SplitPanel.p-mod-horizontal > .p-SplitPanel-handle {\n  cursor: ew-resize;\n}\n\n\n.p-SplitPanel.p-mod-vertical > .p-SplitPanel-handle {\n  cursor: ns-resize;\n}\n\n\n.p-SplitPanel.p-mod-horizontal > .p-SplitPanel-handle:after {\n  left: 50%;\n  min-width: 7px;\n  transform: translateX(-50%);\n}\n\n\n.p-SplitPanel.p-mod-vertical > .p-SplitPanel-handle:after {\n  top: 50%;\n  min-height: 7px;\n  transform: translateY(-50%);\n}\n", ""]);

	// exports


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(31));
	__export(__webpack_require__(32));
	__webpack_require__(39);


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var arrays = __webpack_require__(3);
	var phosphor_domutil_1 = __webpack_require__(23);
	var phosphor_signaling_1 = __webpack_require__(11);
	var phosphor_widget_1 = __webpack_require__(8);
	/**
	 * The class name added to TabBar instances.
	 */
	var TAB_BAR_CLASS = 'p-TabBar';
	/**
	 * The class name added to a tab bar body node.
	 */
	var BODY_CLASS = 'p-TabBar-body';
	/**
	 * The class name added to a tab bar header node.
	 */
	var HEADER_CLASS = 'p-TabBar-header';
	/**
	 * The class name added to a tab bar content node.
	 */
	var CONTENT_CLASS = 'p-TabBar-content';
	/**
	 * The class name added to a tab bar footer node.
	 */
	var FOOTER_CLASS = 'p-TabBar-footer';
	/**
	 * The class name added to a tab bar tab.
	 */
	var TAB_CLASS = 'p-TabBar-tab';
	/**
	 * The class name added to a tab text node.
	 */
	var TEXT_CLASS = 'p-TabBar-tabText';
	/**
	 * The class name added to a tab icon node.
	 */
	var ICON_CLASS = 'p-TabBar-tabIcon';
	/**
	 * The class name added to a tab close icon node.
	 */
	var CLOSE_CLASS = 'p-TabBar-tabCloseIcon';
	/**
	 * The class name added to a tab bar and tab when dragging.
	 */
	var DRAGGING_CLASS = 'p-mod-dragging';
	/**
	 * The class name added to the current tab.
	 */
	var CURRENT_CLASS = 'p-mod-current';
	/**
	 * The class name added to a closable tab.
	 */
	var CLOSABLE_CLASS = 'p-mod-closable';
	/**
	 * The start drag distance threshold.
	 */
	var DRAG_THRESHOLD = 5;
	/**
	 * The detach distance threshold.
	 */
	var DETACH_THRESHOLD = 20;
	/**
	 * The tab transition duration.
	 */
	var TRANSITION_DURATION = 150; // Keep in sync with CSS.
	/**
	 * A widget which displays tab items as a row of tabs.
	 */
	var TabBar = (function (_super) {
	    __extends(TabBar, _super);
	    /**
	     * Construct a new tab bar.
	     */
	    function TabBar() {
	        _super.call(this);
	        this._tabsMovable = false;
	        this._items = [];
	        this._tabs = [];
	        this._dirtySet = new Set();
	        this._currentItem = null;
	        this._dragData = null;
	        this.addClass(TAB_BAR_CLASS);
	    }
	    /**
	     * Create the DOM node for a tab bar.
	     */
	    TabBar.createNode = function () {
	        var node = document.createElement('div');
	        var header = document.createElement('div');
	        var body = document.createElement('div');
	        var footer = document.createElement('div');
	        var content = document.createElement('ul');
	        header.className = HEADER_CLASS;
	        body.className = BODY_CLASS;
	        footer.className = FOOTER_CLASS;
	        content.className = CONTENT_CLASS;
	        body.appendChild(content);
	        node.appendChild(header);
	        node.appendChild(body);
	        node.appendChild(footer);
	        return node;
	    };
	    /**
	     * Create and initialize a tab node for a tab bar.
	     *
	     * @param title - The title to use for the initial tab state.
	     *
	     * @returns A new DOM node to use as a tab in a tab bar.
	     *
	     * #### Notes
	     * It is not necessary to subscribe to the `changed` signal of the
	     * title. The tab bar subscribes to that signal and will call the
	     * [[updateTab]] static method automatically as needed.
	     *
	     * This method may be reimplemented to create custom tabs.
	     */
	    TabBar.createTab = function (title) {
	        var node = document.createElement('li');
	        var icon = document.createElement('span');
	        var text = document.createElement('span');
	        var close = document.createElement('span');
	        node.className = TAB_CLASS;
	        icon.className = ICON_CLASS;
	        text.className = TEXT_CLASS;
	        close.className = CLOSE_CLASS;
	        node.appendChild(icon);
	        node.appendChild(text);
	        node.appendChild(close);
	        this.updateTab(node, title);
	        return node;
	    };
	    /**
	     * Update a tab node to reflect the current state of a title.
	     *
	     * @param tab - A tab node created by a call to [[createTab]].
	     *
	     * @param title - The title object to use for the tab state.
	     *
	     * #### Notes
	     * This is called automatically when the title state changes.
	     *
	     * If the [[createTab]] method is reimplemented, this method should
	     * also be reimplemented so that the tab state is properly updated.
	     */
	    TabBar.updateTab = function (tab, title) {
	        var tabInfix = title.className ? ' ' + title.className : '';
	        var tabSuffix = title.closable ? ' ' + CLOSABLE_CLASS : '';
	        var iconSuffix = title.icon ? ' ' + title.icon : '';
	        var icon = tab.firstChild;
	        var text = icon.nextSibling;
	        tab.className = TAB_CLASS + tabInfix + tabSuffix;
	        icon.className = ICON_CLASS + iconSuffix;
	        text.textContent = title.text;
	    };
	    /**
	     * Get the close icon node for a given tab node.
	     *
	     * @param tab - A tab node created by a call to [[createTab]].
	     *
	     * @returns The close icon node for the tab node.
	     *
	     * #### Notes
	     * The close icon node is used to correctly process click events.
	     *
	     * If the [[createTab]] method is reimplemented, this method should
	     * also be reimplemented so that the correct icon node is returned.
	     */
	    TabBar.tabCloseIcon = function (tab) {
	        return tab.lastChild;
	    };
	    /**
	     * Dispose of the resources held by the widget.
	     */
	    TabBar.prototype.dispose = function () {
	        this._releaseMouse();
	        this._tabs.length = 0;
	        this._items.length = 0;
	        this._dirtySet.clear();
	        this._currentItem = null;
	        _super.prototype.dispose.call(this);
	    };
	    Object.defineProperty(TabBar.prototype, "currentChanged", {
	        /**
	         * A signal emitted when the current tab is changed.
	         */
	        get: function () {
	            return TabBarPrivate.currentChangedSignal.bind(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabBar.prototype, "tabMoved", {
	        /**
	         * A signal emitted when a tab is moved by the user.
	         */
	        get: function () {
	            return TabBarPrivate.tabMovedSignal.bind(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabBar.prototype, "tabCloseRequested", {
	        /**
	         * A signal emitted when the user clicks a tab's close icon.
	         */
	        get: function () {
	            return TabBarPrivate.tabCloseRequestedSignal.bind(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabBar.prototype, "tabDetachRequested", {
	        /**
	         * A signal emitted when a tab is dragged beyond the detach threshold.
	         */
	        get: function () {
	            return TabBarPrivate.tabDetachRequestedSignal.bind(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabBar.prototype, "currentItem", {
	        /**
	         * Get the currently selected tab item.
	         */
	        get: function () {
	            return this._currentItem;
	        },
	        /**
	         * Set the currently selected tab item.
	         */
	        set: function (value) {
	            var item = value || null;
	            if (this._currentItem === item) {
	                return;
	            }
	            var index = item ? this._items.indexOf(item) : -1;
	            if (item && index === -1) {
	                console.warn('Tab item not contained in tab bar.');
	                return;
	            }
	            this._currentItem = item;
	            this.currentChanged.emit({ index: index, item: item });
	            this.update();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabBar.prototype, "tabsMovable", {
	        /**
	         * Get whether the tabs are movable by the user.
	         */
	        get: function () {
	            return this._tabsMovable;
	        },
	        /**
	         * Set whether the tabs are movable by the user.
	         */
	        set: function (value) {
	            this._tabsMovable = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabBar.prototype, "headerNode", {
	        /**
	         * Get the tab bar header node.
	         *
	         * #### Notes
	         * This node can be used to add extra content to the tab bar header.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this.node.getElementsByClassName(HEADER_CLASS)[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabBar.prototype, "bodyNode", {
	        /**
	         * Get the tab bar body node.
	         *
	         * #### Notes
	         * This node can be used to add extra content to the tab bar.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this.node.getElementsByClassName(BODY_CLASS)[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabBar.prototype, "footerNode", {
	        /**
	         * Get the tab bar footer node.
	         *
	         * #### Notes
	         * This node can be used to add extra content to the tab bar footer.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this.node.getElementsByClassName(FOOTER_CLASS)[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabBar.prototype, "contentNode", {
	        /**
	         * Get the tab bar content node.
	         *
	         * #### Notes
	         * This is the node which holds the tab nodes.
	         *
	         * Modifying this node directly can lead to undefined behavior.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this.node.getElementsByClassName(CONTENT_CLASS)[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Get the number of tab items in the tab bar.
	     *
	     * @returns The number of tab items in the tab bar.
	     */
	    TabBar.prototype.itemCount = function () {
	        return this._items.length;
	    };
	    /**
	     * Get the tab item at the specified index.
	     *
	     * @param index - The index of the tab item of interest.
	     *
	     * @returns The tab item at the specified index, or `undefined`.
	     */
	    TabBar.prototype.itemAt = function (index) {
	        return this._items[index];
	    };
	    /**
	     * Get the index of the specified tab item.
	     *
	     * @param item - The tab item of interest.
	     *
	     * @returns The index of the specified item, or `-1`.
	     */
	    TabBar.prototype.itemIndex = function (item) {
	        return this._items.indexOf(item);
	    };
	    /**
	     * Add a tab item to the end of the tab bar.
	     *
	     * @param item - The tab item to add to the tab bar.
	     *
	     * #### Notes
	     * If the item is already added to the tab bar, it will be moved.
	     */
	    TabBar.prototype.addItem = function (item) {
	        this.insertItem(this.itemCount(), item);
	    };
	    /**
	     * Insert a tab item at the specified index.
	     *
	     * @param index - The index at which to insert the item.
	     *
	     * @param item - The tab item to insert into the tab bar.
	     *
	     * #### Notes
	     * If the item is already added to the tab bar, it will be moved.
	     */
	    TabBar.prototype.insertItem = function (index, item) {
	        this._releaseMouse();
	        var n = this._items.length;
	        var i = this._items.indexOf(item);
	        var j = Math.max(0, Math.min(index | 0, n));
	        if (i !== -1) {
	            if (j === n)
	                j--;
	            if (i === j)
	                return;
	            arrays.move(this._tabs, i, j);
	            arrays.move(this._items, i, j);
	            this.contentNode.insertBefore(this._tabs[j], this._tabs[j + 1]);
	        }
	        else {
	            var tab = this.constructor.createTab(item.title);
	            arrays.insert(this._tabs, j, tab);
	            arrays.insert(this._items, j, item);
	            this.contentNode.insertBefore(tab, this._tabs[j + 1]);
	            item.title.changed.connect(this._onTitleChanged, this);
	            if (!this.currentItem)
	                this.currentItem = item;
	        }
	        this.update();
	    };
	    /**
	     * Remove a tab item from the tab bar.
	     *
	     * @param item - The tab item to remove from the tab bar.
	     *
	     * #### Notes
	     * If the item is not in the tab bar, this is a no-op.
	     */
	    TabBar.prototype.removeItem = function (item) {
	        this._releaseMouse();
	        var i = arrays.remove(this._items, item);
	        if (i === -1) {
	            return;
	        }
	        this._dirtySet.delete(item.title);
	        item.title.changed.disconnect(this._onTitleChanged, this);
	        this.contentNode.removeChild(arrays.removeAt(this._tabs, i));
	        if (this.currentItem === item) {
	            var next = this._items[i];
	            var prev = this._items[i - 1];
	            this.currentItem = next || prev;
	        }
	        this.update();
	    };
	    /**
	     * Get the tab node for the item at the given index.
	     *
	     * @param index - The index of the tab item of interest.
	     *
	     * @returns The tab node for the item, or `undefined`.
	     */
	    TabBar.prototype.tabAt = function (index) {
	        return this._tabs[index];
	    };
	    /**
	     * Release the mouse and restore the non-dragged tab positions.
	     *
	     * #### Notes
	     * This will cause the tab bar to stop handling mouse events and to
	     * restore the tabs to their non-dragged positions.
	     */
	    TabBar.prototype.releaseMouse = function () {
	        this._releaseMouse();
	    };
	    /**
	     * Handle the DOM events for the tab bar.
	     *
	     * @param event - The DOM event sent to the tab bar.
	     *
	     * #### Notes
	     * This method implements the DOM `EventListener` interface and is
	     * called in response to events on the tab bar's DOM node. It should
	     * not be called directly by user code.
	     */
	    TabBar.prototype.handleEvent = function (event) {
	        switch (event.type) {
	            case 'click':
	                this._evtClick(event);
	                break;
	            case 'mousedown':
	                this._evtMouseDown(event);
	                break;
	            case 'mousemove':
	                this._evtMouseMove(event);
	                break;
	            case 'mouseup':
	                this._evtMouseUp(event);
	                break;
	            case 'keydown':
	                this._evtKeyDown(event);
	                break;
	            case 'contextmenu':
	                event.preventDefault();
	                event.stopPropagation();
	                break;
	        }
	    };
	    /**
	     * A message handler invoked on an `'after-attach'` message.
	     */
	    TabBar.prototype.onAfterAttach = function (msg) {
	        this.node.addEventListener('click', this);
	        this.node.addEventListener('mousedown', this);
	    };
	    /**
	     * A message handler invoked on a `'before-detach'` message.
	     */
	    TabBar.prototype.onBeforeDetach = function (msg) {
	        this.node.removeEventListener('click', this);
	        this.node.removeEventListener('mousedown', this);
	        this._releaseMouse();
	    };
	    /**
	     * A message handler invoked on an `'update-request'` message.
	     */
	    TabBar.prototype.onUpdateRequest = function (msg) {
	        var tabs = this._tabs;
	        var items = this._items;
	        var dirty = this._dirtySet;
	        var current = this._currentItem;
	        var constructor = this.constructor;
	        for (var i = 0, n = tabs.length; i < n; ++i) {
	            var tab = tabs[i];
	            var item = items[i];
	            if (dirty.has(item.title)) {
	                constructor.updateTab(tab, item.title);
	            }
	            if (item === current) {
	                tab.classList.add(CURRENT_CLASS);
	                tab.style.zIndex = "" + n;
	            }
	            else {
	                tab.classList.remove(CURRENT_CLASS);
	                tab.style.zIndex = "" + (n - i - 1);
	            }
	        }
	        dirty.clear();
	    };
	    /**
	     * Handle the `'keydown'` event for the tab bar.
	     */
	    TabBar.prototype._evtKeyDown = function (event) {
	        // Stop all input events during drag.
	        event.preventDefault();
	        event.stopPropagation();
	        // Release the mouse if `Escape` is pressed.
	        if (event.keyCode === 27)
	            this._releaseMouse();
	    };
	    /**
	     * Handle the `'click'` event for the tab bar.
	     */
	    TabBar.prototype._evtClick = function (event) {
	        // Do nothing if it's not a left click.
	        if (event.button !== 0) {
	            return;
	        }
	        // Do nothing if a drag is in progress.
	        if (this._dragData) {
	            return;
	        }
	        // Do nothing if the click is not on a tab.
	        var x = event.clientX;
	        var y = event.clientY;
	        var i = arrays.findIndex(this._tabs, function (tab) { return phosphor_domutil_1.hitTest(tab, x, y); });
	        if (i < 0) {
	            return;
	        }
	        // Clicking on a tab stops the event propagation.
	        event.preventDefault();
	        event.stopPropagation();
	        // Ignore the click if the title is not closable.
	        var item = this._items[i];
	        if (!item.title.closable) {
	            return;
	        }
	        // Ignore the click if it was not on a close icon.
	        var constructor = this.constructor;
	        var icon = constructor.tabCloseIcon(this._tabs[i]);
	        if (!icon.contains(event.target)) {
	            return;
	        }
	        // Emit the tab close requested signal.
	        this.tabCloseRequested.emit({ index: i, item: item });
	    };
	    /**
	     * Handle the `'mousedown'` event for the tab bar.
	     */
	    TabBar.prototype._evtMouseDown = function (event) {
	        // Do nothing if it's not a left mouse press.
	        if (event.button !== 0) {
	            return;
	        }
	        // Do nothing if a drag is in progress.
	        if (this._dragData) {
	            return;
	        }
	        // Do nothing if the press is not on a tab.
	        var x = event.clientX;
	        var y = event.clientY;
	        var i = arrays.findIndex(this._tabs, function (tab) { return phosphor_domutil_1.hitTest(tab, x, y); });
	        if (i < 0) {
	            return;
	        }
	        // Pressing on a tab stops the event propagation.
	        event.preventDefault();
	        event.stopPropagation();
	        // Ignore the press if it was on a close icon.
	        var constructor = this.constructor;
	        var icon = constructor.tabCloseIcon(this._tabs[i]);
	        if (icon.contains(event.target)) {
	            return;
	        }
	        // Setup the drag data if the tabs are movable.
	        if (this._tabsMovable) {
	            this._dragData = new TabBarPrivate.DragData();
	            this._dragData.index = i;
	            this._dragData.tab = this._tabs[i];
	            this._dragData.pressX = event.clientX;
	            this._dragData.pressY = event.clientY;
	            document.addEventListener('mousemove', this, true);
	            document.addEventListener('mouseup', this, true);
	            document.addEventListener('keydown', this, true);
	            document.addEventListener('contextmenu', this, true);
	        }
	        // Update the current item to the pressed item.
	        this.currentItem = this._items[i];
	    };
	    /**
	     * Handle the `'mousemove'` event for the tab bar.
	     */
	    TabBar.prototype._evtMouseMove = function (event) {
	        // Do nothing if no drag is in progress.
	        if (!this._dragData) {
	            return;
	        }
	        // Suppress the event during a drag.
	        event.preventDefault();
	        event.stopPropagation();
	        // Ensure the drag threshold is exceeded before moving the tab.
	        var data = this._dragData;
	        if (!data.dragActive) {
	            var dx = Math.abs(event.clientX - data.pressX);
	            var dy = Math.abs(event.clientY - data.pressY);
	            if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
	                return;
	            }
	            // Fill in the rest of the drag data measurements.
	            var tabRect = data.tab.getBoundingClientRect();
	            data.tabLeft = data.tab.offsetLeft;
	            data.tabWidth = tabRect.width;
	            data.tabPressX = data.pressX - tabRect.left;
	            data.tabLayout = TabBarPrivate.snapTabLayout(this._tabs);
	            data.contentRect = this.contentNode.getBoundingClientRect();
	            data.override = phosphor_domutil_1.overrideCursor('default');
	            // Add the dragging classes and mark the drag as active.
	            data.tab.classList.add(DRAGGING_CLASS);
	            this.addClass(DRAGGING_CLASS);
	            data.dragActive = true;
	        }
	        // Emit the detach request signal if the threshold is exceeded.
	        if (!data.detachRequested && TabBarPrivate.detachExceeded(data, event)) {
	            data.detachRequested = true;
	            var index = data.index;
	            var item = this._items[index];
	            var clientX = event.clientX;
	            var clientY = event.clientY;
	            this.tabDetachRequested.emit({ index: index, item: item, clientX: clientX, clientY: clientY });
	            if (data.dragAborted) {
	                return;
	            }
	        }
	        // Update the tab layout and computed target index.
	        TabBarPrivate.layoutTabs(this._tabs, data, event);
	    };
	    /**
	     * Handle the `'mouseup'` event for the tab bar.
	     */
	    TabBar.prototype._evtMouseUp = function (event) {
	        var _this = this;
	        // Do nothing if it's not a left mouse release.
	        if (event.button !== 0) {
	            return;
	        }
	        // Do nothing if no drag is in progress.
	        if (!this._dragData) {
	            return;
	        }
	        // Suppress the event during a drag operation.
	        event.preventDefault();
	        event.stopPropagation();
	        // Remove the extra mouse event listeners.
	        document.removeEventListener('mousemove', this, true);
	        document.removeEventListener('mouseup', this, true);
	        document.removeEventListener('keydown', this, true);
	        document.removeEventListener('contextmenu', this, true);
	        // Bail early if the drag is not active.
	        var data = this._dragData;
	        if (!data.dragActive) {
	            this._dragData = null;
	            return;
	        }
	        // Position the tab at its final resting position.
	        TabBarPrivate.finalizeTabPosition(data);
	        // Remove the dragging class from the tab so it can be transitioned.
	        data.tab.classList.remove(DRAGGING_CLASS);
	        // Complete the release on a timer to allow the tab to transition.
	        setTimeout(function () {
	            // Do nothing if the drag has been aborted.
	            if (data.dragAborted) {
	                return;
	            }
	            // Clear the drag data reference.
	            _this._dragData = null;
	            // Reset the positions of the tabs.
	            TabBarPrivate.resetTabPositions(_this._tabs);
	            // Clear the cursor grab and drag styles.
	            data.override.dispose();
	            _this.removeClass(DRAGGING_CLASS);
	            // If the tab was not moved, there is nothing else to do.
	            var i = data.index;
	            var j = data.targetIndex;
	            if (j === -1 || i === j) {
	                return;
	            }
	            // Move the tab and related tab item to the new location.
	            arrays.move(_this._tabs, i, j);
	            arrays.move(_this._items, i, j);
	            _this.contentNode.insertBefore(_this._tabs[j], _this._tabs[j + 1]);
	            // Emit the tab moved signal and schedule a render update.
	            _this.tabMoved.emit({ fromIndex: i, toIndex: j, item: _this._items[j] });
	            _this.update();
	        }, TRANSITION_DURATION);
	    };
	    /**
	     * Release the mouse and restore the non-dragged tab positions.
	     */
	    TabBar.prototype._releaseMouse = function () {
	        // Do nothing if no drag is in progress.
	        if (!this._dragData) {
	            return;
	        }
	        // Remove the extra mouse listeners.
	        document.removeEventListener('mousemove', this, true);
	        document.removeEventListener('mouseup', this, true);
	        document.removeEventListener('keydown', this, true);
	        document.removeEventListener('contextmenu', this, true);
	        // Clear the drag data reference.
	        var data = this._dragData;
	        this._dragData = null;
	        // Indicate the drag has been aborted. This allows the mouse
	        // event handlers to return early when the drag is canceled.
	        data.dragAborted = true;
	        // If the drag is not active, there's nothing more to do.
	        if (!data.dragActive) {
	            return;
	        }
	        // Reset the tabs to their non-dragged positions.
	        TabBarPrivate.resetTabPositions(this._tabs);
	        // Clear the cursor override and extra styling classes.
	        data.override.dispose();
	        data.tab.classList.remove(DRAGGING_CLASS);
	        this.removeClass(DRAGGING_CLASS);
	    };
	    /**
	     * Handle the `changed` signal of a title object.
	     */
	    TabBar.prototype._onTitleChanged = function (sender) {
	        this._dirtySet.add(sender);
	        this.update();
	    };
	    return TabBar;
	})(phosphor_widget_1.Widget);
	exports.TabBar = TabBar;
	/**
	 * The namespace for the `TabBar` class private data.
	 */
	var TabBarPrivate;
	(function (TabBarPrivate) {
	    /**
	     * A signal emitted when the current tab item is changed.
	     */
	    TabBarPrivate.currentChangedSignal = new phosphor_signaling_1.Signal();
	    /**
	     * A signal emitted when a tab is moved by the user.
	     */
	    TabBarPrivate.tabMovedSignal = new phosphor_signaling_1.Signal();
	    /**
	     * A signal emitted when the user clicks a tab's close icon.
	     */
	    TabBarPrivate.tabCloseRequestedSignal = new phosphor_signaling_1.Signal();
	    /**
	     * A signal emitted when a tab is dragged beyond the detach threshold.
	     */
	    TabBarPrivate.tabDetachRequestedSignal = new phosphor_signaling_1.Signal();
	    /**
	     * A struct which holds the drag data for a tab bar.
	     */
	    var DragData = (function () {
	        function DragData() {
	            /**
	             * The tab node being dragged.
	             */
	            this.tab = null;
	            /**
	             * The index of the tab being dragged.
	             */
	            this.index = -1;
	            /**
	             * The offset left of the tab being dragged.
	             */
	            this.tabLeft = -1;
	            /**
	             * The offset width of the tab being dragged.
	             */
	            this.tabWidth = -1;
	            /**
	             * The original mouse X position in tab coordinates.
	             */
	            this.tabPressX = -1;
	            /**
	             * The tab target index upon mouse release.
	             */
	            this.targetIndex = -1;
	            /**
	             * The array of tab layout objects snapped at drag start.
	             */
	            this.tabLayout = null;
	            /**
	             * The mouse press client X position.
	             */
	            this.pressX = -1;
	            /**
	             * The mouse press client Y position.
	             */
	            this.pressY = -1;
	            /**
	             * The bounding client rect of the tab bar content node.
	             */
	            this.contentRect = null;
	            /**
	             * The disposable to clean up the cursor override.
	             */
	            this.override = null;
	            /**
	             * Whether the drag is currently active.
	             */
	            this.dragActive = false;
	            /**
	             * Whether the drag has been aborted.
	             */
	            this.dragAborted = false;
	            /**
	             * Whether a detach request as been made.
	             */
	            this.detachRequested = false;
	        }
	        return DragData;
	    })();
	    TabBarPrivate.DragData = DragData;
	    /**
	     * Get a snapshot of the current tab layout values.
	     */
	    function snapTabLayout(tabs) {
	        var layout = new Array(tabs.length);
	        for (var i = 0, n = tabs.length; i < n; ++i) {
	            var node = tabs[i];
	            var left = node.offsetLeft;
	            var width = node.offsetWidth;
	            var cstyle = window.getComputedStyle(node);
	            var margin = parseInt(cstyle.marginLeft, 10) || 0;
	            layout[i] = { margin: margin, left: left, width: width };
	        }
	        return layout;
	    }
	    TabBarPrivate.snapTabLayout = snapTabLayout;
	    /**
	     * Test if the event exceeds the drag detach threshold.
	     */
	    function detachExceeded(data, event) {
	        var rect = data.contentRect;
	        return ((event.clientX < rect.left - DETACH_THRESHOLD) ||
	            (event.clientX >= rect.right + DETACH_THRESHOLD) ||
	            (event.clientY < rect.top - DETACH_THRESHOLD) ||
	            (event.clientY >= rect.bottom + DETACH_THRESHOLD));
	    }
	    TabBarPrivate.detachExceeded = detachExceeded;
	    /**
	     * Update the relative tab positions and computed target index.
	     */
	    function layoutTabs(tabs, data, event) {
	        var targetIndex = data.index;
	        var targetLeft = event.clientX - data.contentRect.left - data.tabPressX;
	        var targetRight = targetLeft + data.tabWidth;
	        for (var i = 0, n = tabs.length; i < n; ++i) {
	            var style = tabs[i].style;
	            var layout = data.tabLayout[i];
	            var threshold = layout.left + (layout.width >> 1);
	            if (i < data.index && targetLeft < threshold) {
	                style.left = data.tabWidth + data.tabLayout[i + 1].margin + 'px';
	                targetIndex = Math.min(targetIndex, i);
	            }
	            else if (i > data.index && targetRight > threshold) {
	                style.left = -data.tabWidth - layout.margin + 'px';
	                targetIndex = Math.max(targetIndex, i);
	            }
	            else if (i === data.index) {
	                var ideal = event.clientX - data.pressX;
	                var limit = data.contentRect.width - (data.tabLeft + data.tabWidth);
	                style.left = Math.max(-data.tabLeft, Math.min(ideal, limit)) + 'px';
	            }
	            else {
	                style.left = '';
	            }
	        }
	        data.targetIndex = targetIndex;
	    }
	    TabBarPrivate.layoutTabs = layoutTabs;
	    /**
	     * Position the drag tab at its final resting relative position.
	     */
	    function finalizeTabPosition(data) {
	        var ideal;
	        if (data.targetIndex === data.index) {
	            ideal = 0;
	        }
	        else if (data.targetIndex > data.index) {
	            var tgt = data.tabLayout[data.targetIndex];
	            ideal = tgt.left + tgt.width - data.tabWidth - data.tabLeft;
	        }
	        else {
	            var tgt = data.tabLayout[data.targetIndex];
	            ideal = tgt.left - data.tabLeft;
	        }
	        var style = data.tab.style;
	        var limit = data.contentRect.width - (data.tabLeft + data.tabWidth);
	        style.left = Math.max(-data.tabLeft, Math.min(ideal, limit)) + 'px';
	    }
	    TabBarPrivate.finalizeTabPosition = finalizeTabPosition;
	    /**
	     * Reset the relative positions of the given tabs.
	     */
	    function resetTabPositions(tabs) {
	        for (var i = 0, n = tabs.length; i < n; ++i) {
	            tabs[i].style.left = '';
	        }
	    }
	    TabBarPrivate.resetTabPositions = resetTabPositions;
	})(TabBarPrivate || (TabBarPrivate = {}));


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var phosphor_boxpanel_1 = __webpack_require__(33);
	var phosphor_stackedpanel_1 = __webpack_require__(36);
	var phosphor_widget_1 = __webpack_require__(8);
	var tabbar_1 = __webpack_require__(31);
	/**
	 * The class name added to TabPanel instances.
	 */
	var TAB_PANEL_CLASS = 'p-TabPanel';
	/**
	 * The class name added to a TabPanel's tab bar.
	 */
	var TAB_BAR_CLASS = 'p-TabPanel-tabBar';
	/**
	 * The class name added to a TabPanel's stacked panel.
	 */
	var STACKED_PANEL_CLASS = 'p-TabPanel-stackedPanel';
	/**
	 * A widget which combines a `TabBar` and a `StackedPanel`.
	 *
	 * #### Notes
	 * This is a simple panel which handles the common case of a tab bar
	 * placed above a content area. The selected tab controls the widget
	 * which is shown in the content area.
	 *
	 * For use cases which require more control than is provided by this
	 * panel, the `TabBar` widget may be used independently.
	 */
	var TabPanel = (function (_super) {
	    __extends(TabPanel, _super);
	    /**
	     * Construct a new tab panel.
	     */
	    function TabPanel() {
	        _super.call(this);
	        this._currentWidget = null;
	        this.addClass(TAB_PANEL_CLASS);
	        var constructor = this.constructor;
	        this._tabBar = constructor.createTabBar();
	        this._stackedPanel = constructor.createStackedPanel();
	        this._tabBar.tabMoved.connect(this._onTabMoved, this);
	        this._tabBar.currentChanged.connect(this._onCurrentChanged, this);
	        this._tabBar.tabCloseRequested.connect(this._onTabCloseRequested, this);
	        this._stackedPanel.widgetRemoved.connect(this._onWidgetRemoved, this);
	        var layout = new phosphor_boxpanel_1.BoxLayout();
	        layout.direction = phosphor_boxpanel_1.BoxLayout.TopToBottom;
	        layout.spacing = 0;
	        phosphor_boxpanel_1.BoxLayout.setStretch(this._tabBar, 0);
	        phosphor_boxpanel_1.BoxLayout.setStretch(this._stackedPanel, 1);
	        layout.addChild(this._tabBar);
	        layout.addChild(this._stackedPanel);
	        this.layout = layout;
	    }
	    /**
	     * Create a `TabBar` for a tab panel.
	     *
	     * @returns A new tab bar to use with a tab panel.
	     *
	     * #### Notes
	     * This may be reimplemented by subclasses for custom tab bars.
	     */
	    TabPanel.createTabBar = function () {
	        var tabBar = new tabbar_1.TabBar();
	        tabBar.addClass(TAB_BAR_CLASS);
	        return tabBar;
	    };
	    /**
	     * Create a `StackedPanel` for a tab panel.
	     *
	     * @returns A new stacked panel to use with a tab panel.
	     *
	     * #### Notes
	     * This may be reimplemented by subclasses for custom stacks.
	     */
	    TabPanel.createStackedPanel = function () {
	        var stackedPanel = new phosphor_stackedpanel_1.StackedPanel();
	        stackedPanel.addClass(STACKED_PANEL_CLASS);
	        return stackedPanel;
	    };
	    /**
	     * Dispose of the resources held by the widget.
	     */
	    TabPanel.prototype.dispose = function () {
	        this._tabBar = null;
	        this._stackedPanel = null;
	        this._currentWidget = null;
	        _super.prototype.dispose.call(this);
	    };
	    Object.defineProperty(TabPanel.prototype, "currentWidget", {
	        /**
	         * Get the currently selected widget.
	         */
	        get: function () {
	            return this._tabBar.currentItem;
	        },
	        /**
	         * Set the currently selected widget.
	         */
	        set: function (value) {
	            this._tabBar.currentItem = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabPanel.prototype, "tabsMovable", {
	        /**
	         * Get whether the tabs are movable by the user.
	         */
	        get: function () {
	            return this._tabBar.tabsMovable;
	        },
	        /**
	         * Set whether the tabs are movable by the user.
	         */
	        set: function (value) {
	            this._tabBar.tabsMovable = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabPanel.prototype, "tabBar", {
	        /**
	         * Get the tab bar associated with the tab panel.
	         *
	         * #### Notes
	         * Modifying the tab bar directly can lead to undefined behavior.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._tabBar;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TabPanel.prototype, "stackedPanel", {
	        /**
	         * Get the stacked panel associated with the tab panel.
	         *
	         * #### Notes
	         * Modifying the stack directly can lead to undefined behavior.
	         *
	         * This is a read-only property.
	         */
	        get: function () {
	            return this._stackedPanel;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Get the number of child widgets in the tab panel.
	     *
	     * @returns The number of child widgets in the tab panel.
	     *
	     * #### Notes
	     * This delegates to the `childCount` method of the stacked panel.
	     */
	    TabPanel.prototype.childCount = function () {
	        return this._stackedPanel.childCount();
	    };
	    /**
	     * Get the child widget at the specified index.
	     *
	     * @param index - The index of the child widget of interest.
	     *
	     * @returns The child at the specified index, or `undefined`.
	     *
	     * #### Notes
	     * This delegates to the `childAt` method of the stacked panel.
	     */
	    TabPanel.prototype.childAt = function (index) {
	        return this._stackedPanel.childAt(index);
	    };
	    /**
	     * Get the index of the specified child widget.
	     *
	     * @param child - The child widget of interest.
	     *
	     * @returns The index of the specified child, or `-1`.
	     *
	     * #### Notes
	     * This delegates to the `childIndex` method of the stacked panel.
	     */
	    TabPanel.prototype.childIndex = function (child) {
	        return this._stackedPanel.childIndex(child);
	    };
	    /**
	     * Add a child widget to the end of the tab panel.
	     *
	     * @param child - The child widget to add to the tab panel.
	     *
	     * #### Notes
	     * If the child is already contained in the panel, it will be moved.
	     */
	    TabPanel.prototype.addChild = function (child) {
	        this.insertChild(this.childCount(), child);
	    };
	    /**
	     * Insert a child widget at the specified index.
	     *
	     * @param index - The index at which to insert the child.
	     *
	     * @param child - The child widget to insert into to the tab panel.
	     *
	     * #### Notes
	     * If the child is already contained in the panel, it will be moved.
	     */
	    TabPanel.prototype.insertChild = function (index, child) {
	        if (child !== this._currentWidget)
	            child.hide();
	        this._stackedPanel.insertChild(index, child);
	        this._tabBar.insertItem(index, child);
	    };
	    /**
	     * Handle the `currentChanged` signal from the tab bar.
	     */
	    TabPanel.prototype._onCurrentChanged = function (sender, args) {
	        var oldWidget = this._currentWidget;
	        var newWidget = args.item;
	        if (oldWidget === newWidget)
	            return;
	        this._currentWidget = newWidget;
	        if (oldWidget)
	            oldWidget.hide();
	        if (newWidget)
	            newWidget.show();
	    };
	    /**
	     * Handle the `tabCloseRequested` signal from the tab bar.
	     */
	    TabPanel.prototype._onTabCloseRequested = function (sender, args) {
	        args.item.close();
	    };
	    /**
	     * Handle the `tabMoved` signal from the tab bar.
	     */
	    TabPanel.prototype._onTabMoved = function (sender, args) {
	        this._stackedPanel.insertChild(args.toIndex, args.item);
	    };
	    /**
	     * Handle the `widgetRemoved` signal from the stacked panel.
	     */
	    TabPanel.prototype._onWidgetRemoved = function (sender, widget) {
	        if (this._currentWidget === widget)
	            this._currentWidget = null;
	        this._tabBar.removeItem(widget);
	    };
	    return TabPanel;
	})(phosphor_widget_1.Widget);
	exports.TabPanel = TabPanel;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(34));
	__export(__webpack_require__(35));


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var arrays = __webpack_require__(3);
	var phosphor_boxengine_1 = __webpack_require__(22);
	var phosphor_domutil_1 = __webpack_require__(23);
	var phosphor_messaging_1 = __webpack_require__(4);
	var phosphor_properties_1 = __webpack_require__(10);
	var phosphor_panel_1 = __webpack_require__(1);
	var phosphor_widget_1 = __webpack_require__(8);
	/**
	 * The class name added to left-to-right box layout parents.
	 */
	var LEFT_TO_RIGHT_CLASS = 'p-mod-left-to-right';
	/**
	 * The class name added to right-to-left box layout parents.
	 */
	var RIGHT_TO_LEFT_CLASS = 'p-mod-right-to-left';
	/**
	 * The class name added to top-to-bottom box layout parents.
	 */
	var TOP_TO_BOTTOM_CLASS = 'p-mod-top-to-bottom';
	/**
	 * The class name added to bottom-to-top box layout parents.
	 */
	var BOTTOM_TO_TOP_CLASS = 'p-mod-bottom-to-top';
	/**
	 * The layout direction of a box layout.
	 */
	(function (Direction) {
	    /**
	     * Left to right direction.
	     */
	    Direction[Direction["LeftToRight"] = 0] = "LeftToRight";
	    /**
	     * Right to left direction.
	     */
	    Direction[Direction["RightToLeft"] = 1] = "RightToLeft";
	    /**
	     * Top to bottom direction.
	     */
	    Direction[Direction["TopToBottom"] = 2] = "TopToBottom";
	    /**
	     * Bottom to top direction.
	     */
	    Direction[Direction["BottomToTop"] = 3] = "BottomToTop";
	})(exports.Direction || (exports.Direction = {}));
	var Direction = exports.Direction;
	/**
	 * A layout which arranges its children in a single row or column.
	 */
	var BoxLayout = (function (_super) {
	    __extends(BoxLayout, _super);
	    function BoxLayout() {
	        _super.apply(this, arguments);
	        this._fixed = 0;
	        this._spacing = 8;
	        this._box = null;
	        this._sizers = [];
	        this._direction = Direction.TopToBottom;
	    }
	    Object.defineProperty(BoxLayout.prototype, "direction", {
	        /**
	         * Get the layout direction for the box layout.
	         */
	        get: function () {
	            return this._direction;
	        },
	        /**
	         * Set the layout direction for the box layout.
	         */
	        set: function (value) {
	            if (this._direction === value) {
	                return;
	            }
	            this._direction = value;
	            if (!this.parent) {
	                return;
	            }
	            BoxLayoutPrivate.toggleDirection(this.parent, value);
	            this.parent.fit();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoxLayout.prototype, "spacing", {
	        /**
	         * Get the inter-element spacing for the box layout.
	         */
	        get: function () {
	            return this._spacing;
	        },
	        /**
	         * Set the inter-element spacing for the box layout.
	         */
	        set: function (value) {
	            value = Math.max(0, value | 0);
	            if (this._spacing === value) {
	                return;
	            }
	            this._spacing = value;
	            if (!this.parent) {
	                return;
	            }
	            this.parent.fit();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Initialize the children of the layout.
	     *
	     * #### Notes
	     * This method is called automatically when the layout is installed
	     * on its parent widget.
	     */
	    BoxLayout.prototype.initialize = function () {
	        BoxLayoutPrivate.toggleDirection(this.parent, this.direction);
	        _super.prototype.initialize.call(this);
	    };
	    /**
	     * Attach a child widget to the parent's DOM node.
	     *
	     * @param index - The current index of the child in the layout.
	     *
	     * @param child - The child widget to attach to the parent.
	     *
	     * #### Notes
	     * This is a reimplementation of the superclass method.
	     */
	    BoxLayout.prototype.attachChild = function (index, child) {
	        arrays.insert(this._sizers, index, new phosphor_boxengine_1.BoxSizer());
	        BoxLayoutPrivate.prepareGeometry(child);
	        this.parent.node.appendChild(child.node);
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgAfterAttach);
	        this.parent.fit();
	    };
	    /**
	     * Move a child widget in the parent's DOM node.
	     *
	     * @param fromIndex - The previous index of the child in the layout.
	     *
	     * @param toIndex - The current index of the child in the layout.
	     *
	     * @param child - The child widget to move in the parent.
	     *
	     * #### Notes
	     * This is a reimplementation of the superclass method.
	     */
	    BoxLayout.prototype.moveChild = function (fromIndex, toIndex, child) {
	        arrays.move(this._sizers, fromIndex, toIndex);
	        this.parent.update();
	    };
	    /**
	     * Detach a child widget from the parent's DOM node.
	     *
	     * @param index - The previous index of the child in the layout.
	     *
	     * @param child - The child widget to detach from the parent.
	     *
	     * #### Notes
	     * This is a reimplementation of the superclass method.
	     */
	    BoxLayout.prototype.detachChild = function (index, child) {
	        arrays.removeAt(this._sizers, index);
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgBeforeDetach);
	        this.parent.node.removeChild(child.node);
	        BoxLayoutPrivate.resetGeometry(child);
	        this.parent.fit();
	    };
	    /**
	     * A message handler invoked on an `'after-show'` message.
	     */
	    BoxLayout.prototype.onAfterShow = function (msg) {
	        _super.prototype.onAfterShow.call(this, msg);
	        this.parent.update();
	    };
	    /**
	     * A message handler invoked on an `'after-attach'` message.
	     */
	    BoxLayout.prototype.onAfterAttach = function (msg) {
	        _super.prototype.onAfterAttach.call(this, msg);
	        this.parent.fit();
	    };
	    /**
	     * A message handler invoked on a `'child-shown'` message.
	     */
	    BoxLayout.prototype.onChildShown = function (msg) {
	        if (BoxLayoutPrivate.IsIE) {
	            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgFitRequest);
	        }
	        else {
	            this.parent.fit();
	        }
	    };
	    /**
	     * A message handler invoked on a `'child-hidden'` message.
	     */
	    BoxLayout.prototype.onChildHidden = function (msg) {
	        if (BoxLayoutPrivate.IsIE) {
	            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgFitRequest);
	        }
	        else {
	            this.parent.fit();
	        }
	    };
	    /**
	     * A message handler invoked on a `'resize'` message.
	     */
	    BoxLayout.prototype.onResize = function (msg) {
	        if (this.parent.isVisible) {
	            this._update(msg.width, msg.height);
	        }
	    };
	    /**
	     * A message handler invoked on an `'update-request'` message.
	     */
	    BoxLayout.prototype.onUpdateRequest = function (msg) {
	        if (this.parent.isVisible) {
	            this._update(-1, -1);
	        }
	    };
	    /**
	     * A message handler invoked on a `'fit-request'` message.
	     */
	    BoxLayout.prototype.onFitRequest = function (msg) {
	        if (this.parent.isAttached) {
	            this._fit();
	        }
	    };
	    /**
	     * Fit the layout to the total size required by the child widgets.
	     */
	    BoxLayout.prototype._fit = function () {
	        // Compute the visible item count.
	        var nVisible = 0;
	        for (var i = 0, n = this.childCount(); i < n; ++i) {
	            if (!this.childAt(i).isHidden)
	                nVisible++;
	        }
	        // Update the fixed space for the visible items.
	        this._fixed = this._spacing * Math.max(0, nVisible - 1);
	        // Setup the initial size limits.
	        var minW = 0;
	        var minH = 0;
	        var maxW = Infinity;
	        var maxH = Infinity;
	        var horz = BoxLayoutPrivate.isHorizontal(this._direction);
	        if (horz) {
	            minW = this._fixed;
	            maxW = nVisible > 0 ? minW : maxW;
	        }
	        else {
	            minH = this._fixed;
	            maxH = nVisible > 0 ? minH : maxH;
	        }
	        // Update the sizers and computed size limits.
	        for (var i = 0, n = this.childCount(); i < n; ++i) {
	            var child = this.childAt(i);
	            var sizer = this._sizers[i];
	            if (child.isHidden) {
	                sizer.minSize = 0;
	                sizer.maxSize = 0;
	                continue;
	            }
	            var limits = phosphor_domutil_1.sizeLimits(child.node);
	            sizer.sizeHint = BoxLayout.getSizeBasis(child);
	            sizer.stretch = BoxLayout.getStretch(child);
	            if (horz) {
	                sizer.minSize = limits.minWidth;
	                sizer.maxSize = limits.maxWidth;
	                minW += limits.minWidth;
	                maxW += limits.maxWidth;
	                minH = Math.max(minH, limits.minHeight);
	                maxH = Math.min(maxH, limits.maxHeight);
	            }
	            else {
	                sizer.minSize = limits.minHeight;
	                sizer.maxSize = limits.maxHeight;
	                minH += limits.minHeight;
	                maxH += limits.maxHeight;
	                minW = Math.max(minW, limits.minWidth);
	                maxW = Math.min(maxW, limits.maxWidth);
	            }
	        }
	        // Update the box sizing and add it to the size constraints.
	        var box = this._box = phosphor_domutil_1.boxSizing(this.parent.node);
	        minW += box.horizontalSum;
	        minH += box.verticalSum;
	        maxW += box.horizontalSum;
	        maxH += box.verticalSum;
	        // Update the parent's size constraints.
	        var style = this.parent.node.style;
	        style.minWidth = minW + "px";
	        style.minHeight = minH + "px";
	        style.maxWidth = maxW === Infinity ? 'none' : maxW + "px";
	        style.maxHeight = maxH === Infinity ? 'none' : maxH + "px";
	        // Notify the ancestor that it should fit immediately.
	        var ancestor = this.parent.parent;
	        if (ancestor)
	            phosphor_messaging_1.sendMessage(ancestor, phosphor_widget_1.Widget.MsgFitRequest);
	        // Notify the parent that it should update immediately.
	        phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgUpdateRequest);
	    };
	    /**
	     * Update the layout position and size of the child widgets.
	     *
	     * The parent offset dimensions should be `-1` if unknown.
	     */
	    BoxLayout.prototype._update = function (offsetWidth, offsetHeight) {
	        // Bail early if there are no children to layout.
	        if (this.childCount() === 0) {
	            return;
	        }
	        // Measure the parent if the offset dimensions are unknown.
	        if (offsetWidth < 0) {
	            offsetWidth = this.parent.node.offsetWidth;
	        }
	        if (offsetHeight < 0) {
	            offsetHeight = this.parent.node.offsetHeight;
	        }
	        // Ensure the parent box sizing data is computed.
	        var box = this._box || (this._box = phosphor_domutil_1.boxSizing(this.parent.node));
	        // Compute the layout area adjusted for border and padding.
	        var top = box.paddingTop;
	        var left = box.paddingLeft;
	        var width = offsetWidth - box.horizontalSum;
	        var height = offsetHeight - box.verticalSum;
	        // Distribute the layout space and adjust the start position.
	        switch (this._direction) {
	            case Direction.LeftToRight:
	                phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixed));
	                break;
	            case Direction.TopToBottom:
	                phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixed));
	                break;
	            case Direction.RightToLeft:
	                phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixed));
	                left += width;
	                break;
	            case Direction.BottomToTop:
	                phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixed));
	                top += height;
	                break;
	        }
	        // Layout the children using the computed box sizes.
	        for (var i = 0, n = this.childCount(); i < n; ++i) {
	            var child = this.childAt(i);
	            if (child.isHidden) {
	                continue;
	            }
	            var size = this._sizers[i].size;
	            switch (this._direction) {
	                case Direction.LeftToRight:
	                    BoxLayoutPrivate.setGeometry(child, left, top, size, height);
	                    left += size + this._spacing;
	                    break;
	                case Direction.TopToBottom:
	                    BoxLayoutPrivate.setGeometry(child, left, top, width, size);
	                    top += size + this._spacing;
	                    break;
	                case Direction.RightToLeft:
	                    BoxLayoutPrivate.setGeometry(child, left - size, top, size, height);
	                    left -= size + this._spacing;
	                    break;
	                case Direction.BottomToTop:
	                    BoxLayoutPrivate.setGeometry(child, left, top - size, width, size);
	                    top -= size + this._spacing;
	                    break;
	            }
	        }
	    };
	    return BoxLayout;
	})(phosphor_panel_1.PanelLayout);
	exports.BoxLayout = BoxLayout;
	/**
	 * The namespace for the `BoxLayout` class statics.
	 */
	var BoxLayout;
	(function (BoxLayout) {
	    /**
	     * A convenience alias of the `LeftToRight` [[Direction]].
	     */
	    BoxLayout.LeftToRight = Direction.LeftToRight;
	    /**
	     * A convenience alias of the `RightToLeft` [[Direction]].
	     */
	    BoxLayout.RightToLeft = Direction.RightToLeft;
	    /**
	     * A convenience alias of the `TopToBottom` [[Direction]].
	     */
	    BoxLayout.TopToBottom = Direction.TopToBottom;
	    /**
	     * A convenience alias of the `BottomToTop` [[Direction]].
	     */
	    BoxLayout.BottomToTop = Direction.BottomToTop;
	    /**
	     * Get the box layout stretch factor for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @returns The box layout stretch factor for the widget.
	     */
	    function getStretch(widget) {
	        return BoxLayoutPrivate.stretchProperty.get(widget);
	    }
	    BoxLayout.getStretch = getStretch;
	    /**
	     * Set the box layout stretch factor for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @param value - The value for the stretch factor.
	     */
	    function setStretch(widget, value) {
	        BoxLayoutPrivate.stretchProperty.set(widget, value);
	    }
	    BoxLayout.setStretch = setStretch;
	    /**
	     * Get the box layout size basis for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @returns The box layout size basis for the widget.
	     */
	    function getSizeBasis(widget) {
	        return BoxLayoutPrivate.sizeBasisProperty.get(widget);
	    }
	    BoxLayout.getSizeBasis = getSizeBasis;
	    /**
	     * Set the box layout size basis for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @param value - The value for the size basis.
	     */
	    function setSizeBasis(widget, value) {
	        BoxLayoutPrivate.sizeBasisProperty.set(widget, value);
	    }
	    BoxLayout.setSizeBasis = setSizeBasis;
	})(BoxLayout = exports.BoxLayout || (exports.BoxLayout = {}));
	/**
	 * The namespace for the `BoxLayout` class private data.
	 */
	var BoxLayoutPrivate;
	(function (BoxLayoutPrivate) {
	    /**
	     * A flag indicating whether the browser is IE.
	     */
	    BoxLayoutPrivate.IsIE = /Trident/.test(navigator.userAgent);
	    /**
	     * The property descriptor for a widget stretch factor.
	     */
	    BoxLayoutPrivate.stretchProperty = new phosphor_properties_1.Property({
	        name: 'stretch',
	        value: 0,
	        coerce: function (owner, value) { return Math.max(0, value | 0); },
	        changed: onChildPropertyChanged,
	    });
	    /**
	     * The property descriptor for a widget size basis.
	     */
	    BoxLayoutPrivate.sizeBasisProperty = new phosphor_properties_1.Property({
	        name: 'sizeBasis',
	        value: 0,
	        coerce: function (owner, value) { return Math.max(0, value | 0); },
	        changed: onChildPropertyChanged,
	    });
	    /**
	     * Test whether a direction has horizontal orientation.
	     */
	    function isHorizontal(dir) {
	        return dir === Direction.LeftToRight || dir === Direction.RightToLeft;
	    }
	    BoxLayoutPrivate.isHorizontal = isHorizontal;
	    /**
	     * Toggle the CSS direction class for the given widget.
	     */
	    function toggleDirection(widget, dir) {
	        widget.toggleClass(LEFT_TO_RIGHT_CLASS, dir === Direction.LeftToRight);
	        widget.toggleClass(RIGHT_TO_LEFT_CLASS, dir === Direction.RightToLeft);
	        widget.toggleClass(TOP_TO_BOTTOM_CLASS, dir === Direction.TopToBottom);
	        widget.toggleClass(BOTTOM_TO_TOP_CLASS, dir === Direction.BottomToTop);
	    }
	    BoxLayoutPrivate.toggleDirection = toggleDirection;
	    /**
	     * Prepare a child widget for absolute layout geometry.
	     */
	    function prepareGeometry(widget) {
	        widget.node.style.position = 'absolute';
	    }
	    BoxLayoutPrivate.prepareGeometry = prepareGeometry;
	    /**
	     * Reset the layout geometry of a child widget.
	     */
	    function resetGeometry(widget) {
	        var rect = rectProperty.get(widget);
	        var style = widget.node.style;
	        rect.top = NaN;
	        rect.left = NaN;
	        rect.width = NaN;
	        rect.height = NaN;
	        style.position = '';
	        style.top = '';
	        style.left = '';
	        style.width = '';
	        style.height = '';
	    }
	    BoxLayoutPrivate.resetGeometry = resetGeometry;
	    /**
	     * Set the layout geometry of a child widget.
	     */
	    function setGeometry(widget, left, top, width, height) {
	        var resized = false;
	        var style = widget.node.style;
	        var rect = rectProperty.get(widget);
	        if (rect.top !== top) {
	            rect.top = top;
	            style.top = top + "px";
	        }
	        if (rect.left !== left) {
	            rect.left = left;
	            style.left = left + "px";
	        }
	        if (rect.width !== width) {
	            resized = true;
	            rect.width = width;
	            style.width = width + "px";
	        }
	        if (rect.height !== height) {
	            resized = true;
	            rect.height = height;
	            style.height = height + "px";
	        }
	        if (resized) {
	            phosphor_messaging_1.sendMessage(widget, new phosphor_widget_1.ResizeMessage(width, height));
	        }
	    }
	    BoxLayoutPrivate.setGeometry = setGeometry;
	    /**
	     * A property descriptor for a widget offset rect.
	     */
	    var rectProperty = new phosphor_properties_1.Property({
	        name: 'rect',
	        create: function () { return ({ top: NaN, left: NaN, width: NaN, height: NaN }); },
	    });
	    /**
	     * The change handler for the attached child properties.
	     */
	    function onChildPropertyChanged(child) {
	        var parent = child.parent;
	        var layout = parent && parent.layout;
	        if (layout instanceof BoxLayout)
	            parent.fit();
	    }
	})(BoxLayoutPrivate || (BoxLayoutPrivate = {}));


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var phosphor_panel_1 = __webpack_require__(1);
	var layout_1 = __webpack_require__(34);
	/**
	 * The class name added to BoxPanel instances.
	 */
	var BOX_PANEL_CLASS = 'p-BoxPanel';
	/**
	 * The class name added to a BoxPanel child.
	 */
	var CHILD_CLASS = 'p-BoxPanel-child';
	/**
	 * A panel which arranges its children in a single row or column.
	 *
	 * #### Notes
	 * This class provides a convenience wrapper around a [[BoxLayout]].
	 */
	var BoxPanel = (function (_super) {
	    __extends(BoxPanel, _super);
	    /**
	     * Construct a new box panel.
	     */
	    function BoxPanel() {
	        _super.call(this);
	        this.addClass(BOX_PANEL_CLASS);
	    }
	    /**
	     * Create a box layout for a box panel.
	     */
	    BoxPanel.createLayout = function () {
	        return new layout_1.BoxLayout();
	    };
	    Object.defineProperty(BoxPanel.prototype, "direction", {
	        /**
	         * Get the layout direction for the box panel.
	         */
	        get: function () {
	            return this.layout.direction;
	        },
	        /**
	         * Set the layout direction for the box panel.
	         */
	        set: function (value) {
	            this.layout.direction = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BoxPanel.prototype, "spacing", {
	        /**
	         * Get the inter-element spacing for the box panel.
	         */
	        get: function () {
	            return this.layout.spacing;
	        },
	        /**
	         * Set the inter-element spacing for the box panel.
	         */
	        set: function (value) {
	            this.layout.spacing = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * A message handler invoked on a `'child-added'` message.
	     */
	    BoxPanel.prototype.onChildAdded = function (msg) {
	        msg.child.addClass(CHILD_CLASS);
	    };
	    /**
	     * A message handler invoked on a `'child-removed'` message.
	     */
	    BoxPanel.prototype.onChildRemoved = function (msg) {
	        msg.child.removeClass(CHILD_CLASS);
	    };
	    return BoxPanel;
	})(phosphor_panel_1.Panel);
	exports.BoxPanel = BoxPanel;
	/**
	 * The namespace for the `BoxPanel` class statics.
	 */
	var BoxPanel;
	(function (BoxPanel) {
	    /**
	     * A convenience alias of the `LeftToRight` [[Direction]].
	     */
	    BoxPanel.LeftToRight = layout_1.Direction.LeftToRight;
	    /**
	     * A convenience alias of the `RightToLeft` [[Direction]].
	     */
	    BoxPanel.RightToLeft = layout_1.Direction.RightToLeft;
	    /**
	     * A convenience alias of the `TopToBottom` [[Direction]].
	     */
	    BoxPanel.TopToBottom = layout_1.Direction.TopToBottom;
	    /**
	     * A convenience alias of the `BottomToTop` [[Direction]].
	     */
	    BoxPanel.BottomToTop = layout_1.Direction.BottomToTop;
	    /**
	     * Get the box panel stretch factor for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @returns The box panel stretch factor for the widget.
	     */
	    function getStretch(widget) {
	        return layout_1.BoxLayout.getStretch(widget);
	    }
	    BoxPanel.getStretch = getStretch;
	    /**
	     * Set the box panel stretch factor for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @param value - The value for the stretch factor.
	     */
	    function setStretch(widget, value) {
	        layout_1.BoxLayout.setStretch(widget, value);
	    }
	    BoxPanel.setStretch = setStretch;
	    /**
	     * Get the box panel size basis for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @returns The box panel size basis for the widget.
	     */
	    function getSizeBasis(widget) {
	        return layout_1.BoxLayout.getSizeBasis(widget);
	    }
	    BoxPanel.getSizeBasis = getSizeBasis;
	    /**
	     * Set the box panel size basis for the given widget.
	     *
	     * @param widget - The widget of interest.
	     *
	     * @param value - The value for the size basis.
	     */
	    function setSizeBasis(widget, value) {
	        layout_1.BoxLayout.setSizeBasis(widget, value);
	    }
	    BoxPanel.setSizeBasis = setSizeBasis;
	})(BoxPanel = exports.BoxPanel || (exports.BoxPanel = {}));


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(37));
	__export(__webpack_require__(38));


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var phosphor_domutil_1 = __webpack_require__(23);
	var phosphor_messaging_1 = __webpack_require__(4);
	var phosphor_panel_1 = __webpack_require__(1);
	var phosphor_properties_1 = __webpack_require__(10);
	var phosphor_widget_1 = __webpack_require__(8);
	/**
	 * A layout where visible children are stacked atop one another.
	 *
	 * #### Notes
	 * The Z-order of the visible children follows their layout order.
	 */
	var StackedLayout = (function (_super) {
	    __extends(StackedLayout, _super);
	    function StackedLayout() {
	        _super.apply(this, arguments);
	        this._box = null;
	    }
	    /**
	     * Attach a child widget to the parent's DOM node.
	     *
	     * @param index - The current index of the child in the layout.
	     *
	     * @param child - The child widget to attach to the parent.
	     *
	     * #### Notes
	     * This is a reimplementation of the superclass method.
	     */
	    StackedLayout.prototype.attachChild = function (index, child) {
	        StackedLayoutPrivate.prepareGeometry(child);
	        this.parent.node.appendChild(child.node);
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgAfterAttach);
	        this.parent.fit();
	    };
	    /**
	     * Move a child widget in the parent's DOM node.
	     *
	     * @param fromIndex - The previous index of the child in the layout.
	     *
	     * @param toIndex - The current index of the child in the layout.
	     *
	     * @param child - The child widget to move in the parent.
	     *
	     * #### Notes
	     * This is a reimplementation of the superclass method.
	     */
	    StackedLayout.prototype.moveChild = function (fromIndex, toIndex, child) {
	        this.parent.update();
	    };
	    /**
	     * Detach a child widget from the parent's DOM node.
	     *
	     * @param index - The previous index of the child in the layout.
	     *
	     * @param child - The child widget to detach from the parent.
	     *
	     * #### Notes
	     * This is a reimplementation of the superclass method.
	     */
	    StackedLayout.prototype.detachChild = function (index, child) {
	        if (this.parent.isAttached)
	            phosphor_messaging_1.sendMessage(child, phosphor_widget_1.Widget.MsgBeforeDetach);
	        this.parent.node.removeChild(child.node);
	        StackedLayoutPrivate.resetGeometry(child);
	        child.node.style.zIndex = '';
	        this.parent.fit();
	    };
	    /**
	     * A message handler invoked on an `'after-show'` message.
	     */
	    StackedLayout.prototype.onAfterShow = function (msg) {
	        _super.prototype.onAfterShow.call(this, msg);
	        this.parent.update();
	    };
	    /**
	     * A message handler invoked on an `'after-attach'` message.
	     */
	    StackedLayout.prototype.onAfterAttach = function (msg) {
	        _super.prototype.onAfterAttach.call(this, msg);
	        this.parent.fit();
	    };
	    /**
	     * A message handler invoked on a `'child-shown'` message.
	     */
	    StackedLayout.prototype.onChildShown = function (msg) {
	        if (StackedLayoutPrivate.IsIE) {
	            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgFitRequest);
	        }
	        else {
	            this.parent.fit();
	        }
	    };
	    /**
	     * A message handler invoked on a `'child-hidden'` message.
	     */
	    StackedLayout.prototype.onChildHidden = function (msg) {
	        if (StackedLayoutPrivate.IsIE) {
	            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgFitRequest);
	        }
	        else {
	            this.parent.fit();
	        }
	    };
	    /**
	     * A message handler invoked on a `'resize'` message.
	     */
	    StackedLayout.prototype.onResize = function (msg) {
	        if (this.parent.isVisible) {
	            this._update(msg.width, msg.height);
	        }
	    };
	    /**
	     * A message handler invoked on an `'update-request'` message.
	     */
	    StackedLayout.prototype.onUpdateRequest = function (msg) {
	        if (this.parent.isVisible) {
	            this._update(-1, -1);
	        }
	    };
	    /**
	     * A message handler invoked on a `'fit-request'` message.
	     */
	    StackedLayout.prototype.onFitRequest = function (msg) {
	        if (this.parent.isAttached) {
	            this._fit();
	        }
	    };
	    /**
	     * Fit the layout to the total size required by the child widgets.
	     */
	    StackedLayout.prototype._fit = function () {
	        // Setup the initial size limits.
	        var minW = 0;
	        var minH = 0;
	        var maxW = Infinity;
	        var maxH = Infinity;
	        // Update the computed size limits.
	        for (var i = 0, n = this.childCount(); i < n; ++i) {
	            var child = this.childAt(i);
	            if (child.isHidden) {
	                continue;
	            }
	            var limits = phosphor_domutil_1.sizeLimits(child.node);
	            minW = Math.max(minW, limits.minWidth);
	            minH = Math.max(minH, limits.minHeight);
	            maxW = Math.min(maxW, limits.maxWidth);
	            maxH = Math.min(maxH, limits.maxHeight);
	        }
	        // Ensure max limits >= min limits.
	        maxW = Math.max(minW, maxW);
	        maxH = Math.max(minH, maxH);
	        // Update the box sizing and add it to the size constraints.
	        var box = this._box = phosphor_domutil_1.boxSizing(this.parent.node);
	        minW += box.horizontalSum;
	        minH += box.verticalSum;
	        maxW += box.horizontalSum;
	        maxH += box.verticalSum;
	        // Update the parent's size constraints.
	        var style = this.parent.node.style;
	        style.minWidth = minW + "px";
	        style.minHeight = minH + "px";
	        style.maxWidth = maxW === Infinity ? 'none' : maxW + "px";
	        style.maxHeight = maxH === Infinity ? 'none' : maxH + "px";
	        // Notify the ancestor that it should fit immediately.
	        var ancestor = this.parent.parent;
	        if (ancestor)
	            phosphor_messaging_1.sendMessage(ancestor, phosphor_widget_1.Widget.MsgFitRequest);
	        // Notify the parent that it should update immediately.
	        phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgUpdateRequest);
	    };
	    /**
	     * Update the layout position and size of the child widgets.
	     *
	     * The parent offset dimensions should be `-1` if unknown.
	     */
	    StackedLayout.prototype._update = function (offsetWidth, offsetHeight) {
	        // Bail early if there are no children to layout.
	        if (this.childCount() === 0) {
	            return;
	        }
	        // Measure the parent if the offset dimensions are unknown.
	        if (offsetWidth < 0) {
	            offsetWidth = this.parent.node.offsetWidth;
	        }
	        if (offsetHeight < 0) {
	            offsetHeight = this.parent.node.offsetHeight;
	        }
	        // Ensure the parent box sizing data is computed.
	        var box = this._box || (this._box = phosphor_domutil_1.boxSizing(this.parent.node));
	        // Compute the actual layout bounds adjusted for border and padding.
	        var top = box.paddingTop;
	        var left = box.paddingLeft;
	        var width = offsetWidth - box.horizontalSum;
	        var height = offsetHeight - box.verticalSum;
	        // Update the child stacking order and layout geometry.
	        for (var i = 0, n = this.childCount(); i < n; ++i) {
	            var child = this.childAt(i);
	            if (child.isHidden) {
	                continue;
	            }
	            child.node.style.zIndex = "" + i;
	            StackedLayoutPrivate.setGeometry(child, left, top, width, height);
	        }
	    };
	    return StackedLayout;
	})(phosphor_panel_1.PanelLayout);
	exports.StackedLayout = StackedLayout;
	/**
	 * The namespace for the `StackedLayout` class private data.
	 */
	var StackedLayoutPrivate;
	(function (StackedLayoutPrivate) {
	    /**
	     * A flag indicating whether the browser is IE.
	     */
	    StackedLayoutPrivate.IsIE = /Trident/.test(navigator.userAgent);
	    /**
	     * Prepare a child widget for absolute layout geometry.
	     */
	    function prepareGeometry(widget) {
	        widget.node.style.position = 'absolute';
	    }
	    StackedLayoutPrivate.prepareGeometry = prepareGeometry;
	    /**
	     * Reset the layout geometry for the given child widget.
	     */
	    function resetGeometry(widget) {
	        var rect = rectProperty.get(widget);
	        var style = widget.node.style;
	        rect.top = NaN;
	        rect.left = NaN;
	        rect.width = NaN;
	        rect.height = NaN;
	        style.position = '';
	        style.top = '';
	        style.left = '';
	        style.width = '';
	        style.height = '';
	    }
	    StackedLayoutPrivate.resetGeometry = resetGeometry;
	    /**
	     * Set the layout geometry for the given child widget.
	     */
	    function setGeometry(widget, left, top, width, height) {
	        var resized = false;
	        var style = widget.node.style;
	        var rect = rectProperty.get(widget);
	        if (rect.top !== top) {
	            rect.top = top;
	            style.top = top + "px";
	        }
	        if (rect.left !== left) {
	            rect.left = left;
	            style.left = left + "px";
	        }
	        if (rect.width !== width) {
	            resized = true;
	            rect.width = width;
	            style.width = width + "px";
	        }
	        if (rect.height !== height) {
	            resized = true;
	            rect.height = height;
	            style.height = height + "px";
	        }
	        if (resized) {
	            phosphor_messaging_1.sendMessage(widget, new phosphor_widget_1.ResizeMessage(width, height));
	        }
	    }
	    StackedLayoutPrivate.setGeometry = setGeometry;
	    /**
	     * A property descriptor for a widget offset rect.
	     */
	    var rectProperty = new phosphor_properties_1.Property({
	        name: 'rect',
	        create: function () { return ({ top: NaN, left: NaN, width: NaN, height: NaN }); },
	    });
	})(StackedLayoutPrivate || (StackedLayoutPrivate = {}));


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, PhosphorJS Contributors
	|
	| Distributed under the terms of the BSD 3-Clause License.
	|
	| The full license is in the file LICENSE, distributed with this software.
	|----------------------------------------------------------------------------*/
	'use strict';
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var phosphor_panel_1 = __webpack_require__(1);
	var phosphor_signaling_1 = __webpack_require__(11);
	var layout_1 = __webpack_require__(37);
	/**
	 * The class name added to StackedPanel instances.
	 */
	var STACKED_PANEL_CLASS = 'p-StackedPanel';
	/**
	 * The class name added to a StackedPanel child.
	 */
	var CHILD_CLASS = 'p-StackedPanel-child';
	/**
	 * A panel where visible children are stacked atop one another.
	 *
	 * #### Notes
	 * This class provides a convenience wrapper around a [[StackedLayout]].
	 */
	var StackedPanel = (function (_super) {
	    __extends(StackedPanel, _super);
	    /**
	     * Construct a new stacked panel.
	     */
	    function StackedPanel() {
	        _super.call(this);
	        this.addClass(STACKED_PANEL_CLASS);
	    }
	    /**
	     * Create a stacked layout for a stacked panel.
	     */
	    StackedPanel.createLayout = function () {
	        return new layout_1.StackedLayout();
	    };
	    Object.defineProperty(StackedPanel.prototype, "widgetRemoved", {
	        /**
	         * A signal emitted when a widget is removed from the panel.
	         */
	        get: function () {
	            return StackedPanelPrivate.widgetRemovedSignal.bind(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * A message handler invoked on a `'child-added'` message.
	     */
	    StackedPanel.prototype.onChildAdded = function (msg) {
	        msg.child.addClass(CHILD_CLASS);
	    };
	    /**
	     * A message handler invoked on a `'child-removed'` message.
	     */
	    StackedPanel.prototype.onChildRemoved = function (msg) {
	        msg.child.removeClass(CHILD_CLASS);
	        this.widgetRemoved.emit(msg.child);
	    };
	    return StackedPanel;
	})(phosphor_panel_1.Panel);
	exports.StackedPanel = StackedPanel;
	/**
	 * The namespace for the `StackedPanel` class private data.
	 */
	var StackedPanelPrivate;
	(function (StackedPanelPrivate) {
	    /**
	     * A signal emitted when a widget is removed from the panel.
	     */
	    StackedPanelPrivate.widgetRemovedSignal = new phosphor_signaling_1.Signal();
	})(StackedPanelPrivate || (StackedPanelPrivate = {}));


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\r\n.p-TabBar {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n\r\n.p-TabBar-header,\r\n.p-TabBar-footer {\r\n  flex: 0 0 auto;\r\n}\r\n\r\n\r\n.p-TabBar-body {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex: 1 1 auto;\r\n}\r\n\r\n\r\n.p-TabBar-content {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex: 1 1 auto;\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style-type: none;\r\n}\r\n\r\n\r\n.p-TabBar-tab {\r\n  display: flex;\r\n  flex-direction: row;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n}\r\n\r\n\r\n.p-TabBar-tabIcon,\r\n.p-TabBar-tabCloseIcon {\r\n  flex: 0 0 auto;\r\n}\r\n\r\n\r\n.p-TabBar-tabText {\r\n  flex: 1 1 auto;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n}\r\n\r\n\r\n.p-TabBar.p-mod-dragging .p-TabBar-tab {\r\n  position: relative;\r\n  left: 0;\r\n  transition: left 150ms ease; /* keep in sync with JS */\r\n}\r\n\r\n\r\n.p-TabBar.p-mod-dragging .p-TabBar-tab.p-mod-dragging {\r\n  transition: none;\r\n}\r\n\r\n\r\n.p-TabPanel-tabBar {\r\n  z-index: 1;\r\n}\r\n\r\n\r\n.p-TabPanel-stackedPanel {\r\n  z-index: 0;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(42);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\nbody {\n  margin: 0;\n  padding: 0;\n  background: #F5F6F7;\n}\n\n\n#main {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  right: 10px;\n  bottom: 10px;\n}\n\n\n.my-vbox {\n  display: flex;\n  flex-direction: column;\n  padding: 10px;\n}\n\n\n.my-vbox > .p-Widget {\n  flex-grow: 1;\n  margin-bottom: 5px;\n}\n\n\n.my-vbox > .p-Widget:last-child {\n  margin-bottom: 0;\n}\n\n\n.my-vbox > .p-Widget.p-SplitPanel {\n  flex-grow: 2;\n}\n\n\n.content {\n  min-width: 100px;\n  min-height: 100px;\n}\n\n\n.p-TabBar {\n  min-height: 24px;\n  max-height: 24px;\n}\n\n\n.p-TabBar-header {\n  display: none;\n}\n\n\n.p-TabBar-footer {\n  flex: 0 0 1px;\n  background: #C0C0C0;\n}\n\n\n.p-TabBar-content {\n  min-width: 0;\n  align-items: flex-end;\n}\n\n\n.p-TabBar-tab {\n  flex: 0 1 125px;\n  min-height: 20px;\n  max-height: 20px;\n  min-width: 35px;\n  margin-left: -1px;\n  border: 1px solid #C0C0C0;\n  border-bottom: none;\n  padding: 0px 10px;\n  background: #E5E5E5;\n  font: 12px Helvetica, Arial, sans-serif;\n}\n\n\n.p-TabBar-tab:first-child {\n  margin-left: 0;\n}\n\n\n.p-TabBar-tab.p-mod-current {\n  min-height: 23px;\n  max-height: 23px;\n  background: white;\n  transform: translateY(1px);\n}\n\n\n.p-TabBar-tab:hover:not(.p-mod-current) {\n  background: #F0F0F0;\n}\n\n\n.p-TabBar-tabIcon,\n.p-TabBar-tabText,\n.p-TabBar-tabCloseIcon {\n  line-height: 20px;\n}\n\n\n.p-TabPanel > .p-StackedPanel {\n  background: white;\n  border: 1px solid #C0C0C0;\n  border-top: none;\n}\n\n\n.red {\n  background: #E74C3C;\n}\n\n\n.yellow {\n  background: #F1C40F;\n}\n\n\n.green {\n  background: #27AE60;\n}\n\n\n.blue {\n  background: #3498DB;\n}\n", ""]);

	// exports


/***/ }
/******/ ]);