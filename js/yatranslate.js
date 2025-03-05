/*!***************************************************
 * yatranslate.js v2.0.0
 * https://nikonorow.ru/
 * author of update: Nikonorov Filipp (@woronokin)
 * author of project: Vitalii P. (@get-web)
 *****************************************************/

const yaTr = {
    /* Original language */
    lang: "ru",
    /* The language we translate into on the first visit */
    // langFirstVisit: 'en',
};

document.addEventListener('DOMContentLoaded', () => {
    yaTrInit();
    addLangToLinks();
});

const addLangToLinks = () => {
    const currentLang = yaTrGetCode();
    if (currentLang === yaTr.lang) return; // Не добавляем параметр, если язык - по умолчанию

    const links = document.querySelectorAll('a[href^="/"]'); // выбираем все внутренние ссылки
    links.forEach(link => {
        const url = new URL(link.href, window.location.origin);
        url.searchParams.set('lang', currentLang);
        link.href = url.toString();
    });
};

const yaTrInit = () => {
    // Check for language in URL parameter
    const urlLang = getLangFromUrl();
    if (urlLang) {
        yaTrSetLang(urlLang);
    } else if (yaTr.langFirstVisit && !localStorage.getItem('yt-widget')) {
        yaTrSetLang(yaTr.langFirstVisit);
    }

    // Load Yandex Translate widget
    const script = document.createElement('script');
    script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yaTr.lang}&widgetTheme=light&autoMode=false`;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Display the current language in the menu
    const code = yaTrGetCode();
    yaTrHtmlHandler(code);

    // Attach click events for language selection
    yaTrEventHandler('click', '[data-ya-lang]', el => {
        const selectedLang = el.getAttribute('data-ya-lang');
        yaTrSetLang(selectedLang);
        if (selectedLang !== yaTr.lang) {
            updateUrlLang(selectedLang);
        } else {
            removeUrlLang();
        }
        window.location.reload();
    });
};

const yaTrSetLang = (lang) => {
    // Save the selected language to localStorage 
    localStorage.setItem('yt-widget', JSON.stringify({
        "lang": lang,
        "active": true
    }));
};

const yaTrGetCode = () => {
    // Return the language to which we are translating
    return (localStorage["yt-widget"] != undefined && JSON.parse(localStorage["yt-widget"]).lang != undefined) ? JSON.parse(localStorage["yt-widget"]).lang : yaTr.lang;
};

const yaTrHtmlHandler = (code) => {
    // Update language display in the menu
    document.querySelector('[data-lang-active]').innerHTML = `
        <svg class="lang__img lang__img_select" fill="none" width="37px" height="37px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" alt="lang-icon">
            <path d="M7.5 6.5H20a1 1 0 011 1V20a1 1 0 01-1 1h-7L7.5 6.5z" fill="#fff" />
            <path d="M13.416 17.427l-.458-.888.444-.23c.031-.015 3.051-1.604 4.522-4.552l.223-.447.895.447-.224.447c-1.62 3.248-4.822 4.925-4.958 4.994l-.444.229z" fill="#262626" />
            <path d="M19.01 17l-.436-.245c-.103-.058-2.546-1.45-4.248-3.833l.814-.582c1.57 2.197 3.902 3.531 3.925 3.544l.435.246-.49.87zM13 11h7v1h-7v-1z" fill="#262626" />
            <path d="M16 10h1v2h-1v-2z" fill="#262626" />
            <path d="M16.5 17.5H4a1 1 0 01-1-1V4a1 1 0 011-1h7l5.5 14.5z" fill="#8B3FFD" />
            <path d="M13 21l-1.5-3.5h5L13 21z" fill="#4f2391e8" />
            <path d="M9.586 12h-2.18l-.504 1.5H5.5L7.882 7h1.222l2.396 6.5h-1.402L9.585 12zm-1.864-1h1.55l-.779-2.357L7.722 11z" fill="#fff" />
        </svg>
        <span alt="${code}">${code}</span>`;
};

const yaTrEventHandler = (event, selector, handler) => {
    document.addEventListener(event, (e) => {
        const el = e.target.closest(selector);
        if (el) handler(el);
    });
};

const updateUrlLang = (lang) => {
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.toString());
};

const removeUrlLang = () => {
    const url = new URL(window.location);
    url.searchParams.delete('lang');
    history.replaceState(null, '', url.toString());
};

const getLangFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang');
};
