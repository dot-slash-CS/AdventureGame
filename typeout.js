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

    $.fn.typeOut = function(string = "This is a test of the typeOut() function.") {
        return this.each(function() { // applies to each matched element
            var $this = $(this);
            // max number of chars per line
            if (!$this.data('lineMaxChars')) {
                $this.data('lineMaxChars', 20); // programmer-defined
            }
            // current char position
            if (!$this.data('curStrPos')) {
                $this.data('curStrPos', 0);
            }
            // end of new string
            if (!$this.data('maxPos')) {
                $this.data('maxPos', string.length - 1);
            }

            var humanize = Math.round(Math.random() * (50));
            // contain typing function in a timeout with humanize'd delay
            timeout = setTimeout(function() {
                var charPause = 0;
                // timeout for any pause after a character
                timeout = setTimeout(function() {
                    // start typing each new char into existing string
                    // newString: arg, $this.html: original text inside element
                    var nextChar = string.charAt($this.data().curStrPos);
                    $this.html($this.html() + nextChar);

                    // display curStrPos for debugging
                    //alert(curStrPos);

                    // linebreaks at the end of lines
                    if ($this.data().curStrPos % self.lineMax === 0 && $this.data().curStrPos != 0) {
                        $this.html($this.html() + "<br>");
                    }

                    // add characters one by one by recursing the function
                    if ($this.data().curStrPos !== $this.data().maxPos) {
                        $this.data().curStrPos++;
                        $this.typeOut(string);
                    }
                    // end of character pause
                }, charPause);
            }, humanize);

            /*var $this = $(this), data = $this.data('typeOut');
            if (!data) {
                $this.data('typeOut', (data = new TypeOut(this, string)));
            } else {
                data.maxPos = this.html().length + string.length - 1;
                data.typewrite(string, data.strPos);
            }*/
        });
    };

}(window.jQuery);
