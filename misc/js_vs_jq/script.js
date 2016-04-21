var TimeToFade = 1000.0;

function animateFade(lastTick, eid, callback)
{
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;

  var element = document.getElementById(eid);

  if(element.FadeTimeLeft <= elapsedTicks)
  {
    element.style.opacity = element.FadeState == 1 ? '1' : '0';
    element.style.filter = 'alpha(opacity = ' + (element.FadeState == 1 ? '100' : '0') + ')';
    element.FadeState = element.FadeState == 1 ? 2 : -2;
    if (typeof callback == 'function') {
        callback();
    }
    return;
  }

  element.FadeTimeLeft -= elapsedTicks;
  var newOpVal = element.FadeTimeLeft/TimeToFade;
  if(element.FadeState == 1)
    newOpVal = 1 - newOpVal;

  element.style.opacity = newOpVal;
  element.style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';

  //setTimeout("animateFade(" + curTick + ",'" + eid + "')", 33);
  setTimeout(function(){animateFade(curTick, eid, callback)}, 33);
}

function fade(eid, callback)
{
  var element = document.getElementById(eid);
  if(element == null)
    return;


  if(element.FadeState == null)
  {
    if(element.style.opacity == null || element.style.opacity == ''
       || element.style.opacity == '1')
      element.FadeState = 2;
    else
      element.FadeState = -2;
  }

  if(element.FadeState == 1 || element.FadeState == -1)
  {
    element.FadeState = element.FadeState == 1 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade - element.FadeTimeLeft;
  }
  else
  {
    element.FadeState = element.FadeState == 2 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade;
    //setTimeout("animateFade(" + new Date().getTime() + ",'" + eid + "')", 33);
    setTimeout(function(){animateFade(new Date().getTime(), eid, callback)}, 33);
  }
}

(function(window, document, undefined){

    if(typeof window.XMLHttpRequest === 'undefined' &&
        typeof window.ActiveXObject === 'function') {
        window.XMLHttpRequest = function() {
            try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
            try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
            return new ActiveXObject('Microsoft.XMLHTTP');
        };
    }

    var addEvent = function(element, evType, fn, useCapture) {
        if (element.addEventListener) {
            element.addEventListener (evType, fn, useCapture);
            return true;
        } else if (element.attachEvent) {
            var r = element.attachEvent('on' + evType, fn);
            return r;
        } else {
            element['on' + evType] = fn;
        }
    };

    var addClass = function(element, classname) {
        var cn = element.className;
        //test for existance
        if( cn.indexOf( classname ) != -1 ) {
            return;
        }
        //add a space if the element already has class
        if( cn != '' ) {
            classname = ' '+classname;
        }
        element.className = cn+classname;
    }

    var removeClass = function(element, classname) {
        var cn = element.className;
        var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
        cn = cn.replace( rxp, '' );
        element.className = cn;
    }

    var hasClass = function(element, className) {
        var cn = element.className;
        //test for existance
        if( cn.indexOf( className ) != -1 ) {
            return true;
        }
        return false;
    }

    var getParent = function(element, className) {
        if (!element) {
            return element;
        } else if (hasClass(element, className)) {
            return element;
        } else {
            return getParent(element.parentNode, className);
        }
    };

    var getSibling = function(element, className) {
        var siblings = element.parentNode.children,
            j = siblings.length;

        for (var i=0; i < j; i++) {
            if (hasClass(siblings[i], className)) {
                var sibling = siblings[i];
            }
        }

        return sibling;
    };

    var loadTabContent = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        xhr.send(null);
    };

    var loadTab = function(event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;

        var $tab = event.target,
            fileToLoad = $tab.getAttribute("href"),
            $nav = getParent($tab, 'nav'),
            $content = getSibling($nav, 'content');

        if (hasClass($tab, 'selected')) {
            return false;
        }

        //check if section for content should be added
        if (typeof $content == 'undefined') {
            $content = document.createElement('div');
            $content.id = 'content';
            addClass($content, 'content');
            $nav.parentNode.appendChild($content);
        }

        //change selected tab and load new content
        for (var i=0; i < links.length; i++) {
            removeClass(links[i], 'selected');
        }

        fade('content', function(){
            loadTabContent(fileToLoad, function(responseText){
                addClass($tab, 'selected');
                $content.innerHTML = responseText;
                fade('content');
            })
        });


    };

    var lists = document.getElementsByTagName('li');
    var links = [];

    for (i=0; i < lists.length; i++) {
        var link = lists[i].getElementsByTagName('a')[0];
        links.push(link);
        addEvent(link, "click", loadTab, false);
    }

})(window, document);
