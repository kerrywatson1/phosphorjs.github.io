/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  DockPanel
} from 'phosphor-dockpanel';

import {
  Message
} from 'phosphor-messaging';

import {
  ResizeMessage, Widget
} from 'phosphor-widget';

import './index.css';


/**
 * A widget which hosts a CodeMirror editor.
 */
class CodeMirrorWidget extends Widget {

  constructor(config?: CodeMirror.EditorConfiguration) {
    super();
    this.addClass('CodeMirrorWidget');
    this._editor = CodeMirror(this.node, config);
  }

  get editor(): CodeMirror.Editor {
    return this._editor;
  }

  loadTarget(target: string): void {
    var doc = this._editor.getDoc();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', target);
    xhr.onreadystatechange = () => doc.setValue(xhr.responseText);
    xhr.send();
  }

  protected onAfterAttach(msg: Message): void {
    this._editor.refresh();
  }

  protected onResize(msg: ResizeMessage): void {
    if (msg.width < 0 || msg.height < 0) {
      this._editor.refresh();
    } else {
      this._editor.setSize(msg.width, msg.height);
    }
  }

  private _editor: CodeMirror.Editor;
}


/**
 * Create a placeholder content widget.
 */
function createContent(title: string): Widget {
  var widget = new Widget();
  widget.addClass('content');
  widget.addClass(title.toLowerCase());

  widget.title.text = title;
  widget.title.closable = true;

  return widget;
}


/**
 * The main application entry point.
 */
function main(): void {
  var r1 = createContent('Red');
  var r2 = createContent('Red');
  var r3 = createContent('Red');

  var b1 = createContent('Blue');
  var b2 = createContent('Blue');

  var g1 = createContent('Green');
  var g2 = createContent('Green');
  var g3 = createContent('Green');

  var y1 = createContent('Yellow');
  var y2 = createContent('Yellow');

  var panel = new DockPanel();
  panel.id = 'main';

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

  panel.insertLeft(cmSource);
  panel.insertRight(b1, cmSource);
  panel.insertBottom(y1, b1);
  panel.insertLeft(g1, y1);

  panel.insertBottom(b2);

  panel.insertTabAfter(cmCss, cmSource);
  panel.insertTabAfter(r1, cmCss);
  panel.insertTabBefore(g2, b2);
  panel.insertTabBefore(y2, g2);
  panel.insertTabBefore(g3, y2);
  panel.insertTabBefore(r2, b1);
  panel.insertTabBefore(r3, y1);

  panel.attach(document.body);

  window.onresize = () => { panel.update() };
}


window.onload = main;
