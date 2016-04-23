// The MIT License (MIT)

// Typed.js | Copyright (c) 2014 Matt Boldt | www.mattboldt.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

! function($) {

    "use strict";

    function setLineMaxChars($this) {
        // max number of chars per line
        if (!$this.data('lineMaxChars')) {
            $this.data('lineMaxChars', 100); // programmer-defined
        }
    }

    $.fn.typeOut = function(string = "This is a test of typeOut().") {
        return this.each(function() { // applies to each matched element
            // disable user input while output is printed
            $(document).unbind("keydown");
            $(document).unbind("keypress");

            var $this = $(this);
            setLineMaxChars($this);
            // current char position in new string
            if (!$this.data('curStrPos')) {
                $this.data('curStrPos', 0);
            }
            var humanize = Math.round(Math.random() * (40));
            // contain typing function in a timeout with humanize'd delay
            timeout = setTimeout(function() {
                // display curStrPos for debugging
                //alert($this.data().curStrPos);

                var nextChar = (string).charAt($this.data().curStrPos);
                $this.html($this.html() + nextChar);

                // add characters one by one by recursing the function
                if ($this.data().curStrPos < string.length) {
                    $this.data().curStrPos++;

                    // linebreaks at the end of lines
                    //alert(nextChar + " " + $this.data().curStrPos);
                    if ($this.data().curStrPos % $this.data().lineMaxChars === 0 && $this.data().curStrPos !== 0) {
                        $this.html($this.html() + "<br>");
                    }

                    $this.typeOut(string);
                } else {
                    $this.removeData('curStrPos');
                    $this.html($this.html() + "<br><br>&gt;");
                    $this.enableInput();
                }
            }, humanize);
        });
    };

    $.fn.typeIn = function(keyCode) {
        return this.each(function() { // applies to each matched element
            var nextChar = String.fromCharCode(keyCode);
            var $this = $(this);
            setLineMaxChars($this);
            // current char position
            if (!$this.data('curTxtPos')) {
                $this.data('curTxtPos', 0);
            }
            if (!$this.data('userInput')) {
                $this.data('userInput', "");
            }

            if (keyCode === 8) { // backspace key
                if ($this.data().curTxtPos !== 0) {
                    if ($this.html().slice(-4) === "<br>") { // automatically delete linebreaks
                        $this.html($this.html().slice(0, -4));
                    }
                    if ($this.html().slice(-5) === "&amp;") { // "&"
                        $this.html($this.html().slice(0, -5));
                        $this.data('userInput', $this.data().userInput.slice(0, -1));
                    } else if ($this.html().slice(-4) === "&lt;" || $this.html().slice(-4) === "&gt;") { // "<" and ">"
                        $this.html($this.html().slice(0, -4));
                        $this.data('userInput', $this.data().userInput.slice(0, -1));
                    } else {
                        $this.html($this.html().slice(0, -1));
                        $this.data('userInput', $this.data().userInput.slice(0, -1));
                    }
                    $this.data().curTxtPos--;
                }
            } else if (keyCode === 13) { // enter key

            } else {
                $this.html($this.html() + nextChar);
                $this.data('userInput', $this.data.userInput + nextChar);
                $this.data().curTxtPos++;
                // linebreaks at the end of lines
                if ($this.data().curTxtPos % $this.data().lineMaxChars === 0 && $this.data().curTxtPos != 0) {
                    $this.html($this.html() + "<br>");
                }
            }
        });
    }

    $.fn.enableInput = function() {
        var $this = $(this);
        $(document).keydown(function(e) {
            if (e.which === 27) { // esc key, for debugging
                alert($this.html());
            }
            if (e.which === 8) { // backspace key
                $this.typeIn(e.which);
            }
        });
        $(document).keypress(function(e) {
            $this.typeIn(e.which);
        });
    }

}(window.jQuery);
