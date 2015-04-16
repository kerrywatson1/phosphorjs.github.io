"use strict";
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var example;
(function (example) {
    var ChatApplication = chat.ChatApplication;
    /**
     * Create and start the chat application.
     */
    function main() {
        var app = new ChatApplication();
        app.run();
    }
    example.main = main;
})(example || (example = {})); // module example