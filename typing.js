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
            $(document).unbind("keypress");
            var $this = $(this);
            setLineMaxChars($this);
            // current char position in new string
            if (!$this.data('curStrPos')) {
                $this.data('curStrPos', 0);
            }
            var humanize = Math.round(Math.random() * (50));
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
                    if ($this.data().curStrPos % $this.data().lineMaxChars === 0 && $this.data().curStrPos != 0) {
                        $this.html($this.html() + "<br>");
                    }

                    $this.typeOut(string);
                } else {
                    $this.removeData('curStrPos');
                    $this.html($this.html() + "<br><br>");
                    $(document).keypress(function(e) {
                        let key = String.fromCharCode(e.which);
                        $(".element").typeIn(key);
                    });
                }
            }, humanize);
        });
    };

    $.fn.typeIn = function(nextChar = '?') {
        return this.each(function() { // applies to each matched element
            var $this = $(this);
            setLineMaxChars($this);
            // current char position
            if (!$this.data('curTxtPos')) {
                $this.data('curTxtPos', 0);
            }

            $this.html($this.html() + nextChar);
            $this.data('userInput', "" + nextChar);
            $this.data().curTxtPos++;
            // linebreaks at the end of lines
            if ($this.data().curTxtPos % $this.data().lineMaxChars === 0 && $this.data().curTxtPos != 0) {
                $this.html($this.html() + "<br>");
            }
        });
    }

}(window.jQuery);
