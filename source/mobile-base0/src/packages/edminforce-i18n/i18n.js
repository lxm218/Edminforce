var i18n = EdminForce.i18n = {};

i18n.setLanguage = function () {
    //---------------------
    // Load language file for moment library
    // moment
    Session.set('momentReady', false);
    // console.log('moment loading…')
    if (language.toLowerCase() === "en") {
        Session.set('momentReady', true);
    } else {
        $.getScript("//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/lang/" + language.toLowerCase() + ".js", function (result) {
            moment.locale(language);
            Session.set('momentReady', true);
            Session.set('momentLocale', language);
            // console.log('moment loaded!')
        });
    }

    // TAPi18n
    Session.set("TAPi18nReady", false);
    // console.log('TAPi18n loading…')
    TAPi18n.setLanguage(language)
        .done(function () {
            Session.set("TAPi18nReady", true);
            // console.log('TAPi18n loaded!')
        });
};