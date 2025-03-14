# yandex-translate-custom-widget 2.0

![](https://raw.githubusercontent.com/get-web/Examples/main/yandex-translate-custom-widget/yandex-translate-custom-widget.gif)

# Changed in this fork:

1. Added functions to the code to automatically add the `?lang=` parameter to all internal links, which preserves the selected language when navigating the site. Also added `addLangToUrlIfNeeded` function, which checks if the `?lang=` parameter is present in the URL and automatically adds it if it is missing. These changes allow you to preserve the user's language when navigating through the site pages.

2. All functions now use the arrow function syntax (const functionName = () => {}).

3. Change main translation language icon to new purple svg-icon

**For an example of the updated translation script, see [here](https://nikonorow.ru/?lang=en) (in the header)**

# Install:

### Add Files

```
   <script src="./js/yatranslate.js"></script>
   <link rel="stylesheet" href="./css/yatranslate.css">
```

### Add html:

```
<div class="lang lang_fixed">
   <div id="ytWidget" style="display: none;"></div>
   <div class="lang__link lang__link_select" data-lang-active="">
       <img class="lang__img lang__img_select" src="./images/lang/lang__ru.png" alt="Ru">
   </div>
   <div class="lang__list" data-lang-list="">
       <a class="lang__link lang__link_sub" data-ya-lang="ru">
           <img class="lang__img" src="./images/lang/lang__ru.png" alt="ru">
       </a>
       <a class="lang__link lang__link_sub" data-ya-lang="en">
           <img class="lang__img" src="./images/lang/lang__en.png" alt="en">
       </a>
       <a class="lang__link lang__link_sub" data-ya-lang="de">
           <img class="lang__img" src="./images/lang/lang__de.png" alt="de">
       </a>
       <a class="lang__link lang__link_sub" data-ya-lang="zh">
           <img class="lang__img" src="./images/lang/lang__zh.png" alt="zh">
       </a>
       <a class="lang__link lang__link_sub" data-ya-lang="fr">
           <img class="lang__img" src="./images/lang/lang__fr.png" alt="fr">
       </a>
   </div>
</div>
```

## Add new lang:

```
data-ya-lang="{CODE}"
```

All available languages and their code can be found [here](https://yandex.ru/dev/translate/doc/dg/concepts/api-overview.html).

### Example

[OLD Demo Page](http://demo.l2banners.ru/yandex-translate-custom-widget) (in project css-style)

[New Example Page](https://nikonorow.ru?lang=en) - see in the site header (in another css-style)

## More

Sometimes there may be some content on your page that you don't want to
translate. You can now add translate="no" to any HTML element to prevent
that element from being translated. For example, you may want to do something
like:

`Email us at <span translate="no">sales at mydomain dot com</span>`
