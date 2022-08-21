
const initTenderB2b = () => {
  const id = 'b2b-center-market-js';
  const container = document.querySelector('.b2b-center-market');

  if (!container) {
    return;
  }

  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');

  script.src = '//www.b2b-center.ru/js/public/iframe.js';
  script.id = id;
  script.charset = 'utf-8';
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);

  (function () {
    var debug = false;
    if(window.location.hash === '#iframe_debug') {
      debug = true;
      debugMessage('Включён режим отладки iframe!', debug);
    }
    var name = 'b2b-center-market';
    var elements = document.querySelectorAll('.'+name);
    if (elements.length === 0) {
      debugMessage('Не найдено кода для вставки iframe!', debug);
      return;
    } else {
      debugMessage('Найдено ' + elements.length + ' элементов для вставки iframe!', debug);
    }

    for (var i = 0, len = elements.length; i < len; i++) {
      debugMessage('Обработка элемента ' + i + '!', debug);
      var market = elements[i];
      var customer = market.getAttribute('data-iframe');
      var ie_polyfils = !market.getAttribute('data-no-ie-polyfils');
      var any_protocol = market.getAttribute('data-any-protocol');
      var base_url = (any_protocol ? '' : 'https:')+'//'+market.getAttribute('data-domain');
      debugMessage('Параметры:\n' +
        ' * customer - ' + customer +
        '\n * ie_polyfils - ' + ie_polyfils +
        '\n * any_protocol - ' + any_protocol +
        '\n * base_url - ' + base_url, debug);
      var iframe = createIframe(base_url+'/market/iframe/?v=2&iframe='+customer, name+'-iframe');
      market.appendChild(iframe);
      debugMessage('iframe-тег вставлен!', debug);
      debugTimeoutCheck(market, i, debug);
      var resizer_callback = function () {
        iFrameResize({heightCalculationMethod: 'taggedElement'}, '.'+iframe.className);
      };
      var script_callback = function () {
        if (iframe.addEventListener) {
          iframe.addEventListener('load', resizer_callback, {
            once: true
          });
          debugMessage('Прикрепление события адаптивности размера!', debug);
        } else if (iframe.attachEvent) { // IE8
          iframe.attachEvent('onload', function () {
            resizer_callback();
            iframe.detachEvent('onload', resizer_callback);
          });
          debugMessage('Прикрепление события адаптивности размера для IE8!', debug);
        }
      };

      if (ie_polyfils) {
        debugMessage('Загрузка полифила для IE8:', debug);
        loadScript(base_url+'/js/lib/plugins/iframe_resizer/ie8.polyfils.min.js', name+'-iframe-ie-polyfils', null, debug);
      }
      debugMessage('Загрузка скрипта адаптивности размера:', debug);
      loadScript(base_url+'/js/lib/plugins/iframe_resizer/iframeResizer.min.js', name+'-iframe-resizer', script_callback, debug);
    }

    function loadScript(src, id, callback, debug) {
      if (document.getElementById(id)) {
        debugMessage(' * id ' + id + ' уже существует, отмена загрузки скрипта!', debug);
        return;
      }
      var first_script = document.getElementsByTagName('script')[0];
      var script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      first_script.parentNode.insertBefore(script, first_script);
      if (!callback) {
        debugMessage(' * callback не задан, выход из функции!', debug);
        return;
      }
      if (script.readyState) { // IE
        script.onreadystatechange = function () {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            callback();
          }
        };
        debugMessage(' * callback привязан (для IE8)!', debug);
      } else {
        script.onload = function () {
          callback();
        };
        debugMessage(' * callback привязан!', debug);
      }
    }

    function createIframe(src, className) {
      var iframe = document.createElement('iframe');
      iframe.height = '100%';
      iframe.width = '100%';
      iframe.frameBorder = 0;
      iframe.src = src;
      iframe.className = className;
      // Отключаем скроллинг, чтобы пользователь не изменил начальную позицию скролла во время загрузки скрипта
      iframe.scrolling = 'no';
      iframe.style.overflow = 'hidden';
      return iframe;
    }

    function debugMessage(message, useDebug) {
      if (useDebug) {
        console.log(message);
      }
    }

    function debugTimeoutCheck(marketElem, elemIdx, useDebug) {
      if (useDebug) {
        setTimeout(function () {
          var appendedIframe = marketElem.querySelector('iframe');
          if (!appendedIframe) {
            console.log('iframe-тег в элементе ' + elemIdx + ' НЕ СУЩЕСТВУЕТ спустя 5 с.!');
          } else {
            console.log('iframe-тег в элементе ' + elemIdx + ' СУЩЕСТВУЕТ спустя 5 с.!');
          }
        }, 5000);
      }
    }
  })();
};

export {initTenderB2b};
