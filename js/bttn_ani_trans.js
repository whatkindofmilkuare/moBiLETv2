document.addEventListener('DOMContentLoaded', function () {
    function hideElements(selectors) {
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => element.style.display = 'none');
        });
    }

    function showElements(selectors) {
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => element.style.display = 'block');
        });
    }

    function addClickListener(selector, callback) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => element.addEventListener('click', callback));
    }

    if (window.location.pathname.endsWith('charge.html')) {
        hideElements(['.item2_blik', '.item2_przelewy24_active', '.item2_klarna_active']);

        addClickListener('.item2_blik', function () {
            hideElements(['.item2_blik', '.item2_przelewy24_active', '.item2_klarna_active']);
            showElements(['.item2_blik_active', '.item2_przelewy24', '.item2_klarna']);
        });

        addClickListener('.item2_przelewy24', function () {
            hideElements(['.item2_przelewy24', '.item2_blik_active', '.item2_klarna_active']);
            showElements(['.item2_przelewy24_active', '.item2_blik', '.item2_klarna']);
        });

        addClickListener('.item2_klarna', function () {
            hideElements(['.item2_klarna', '.item2_blik_active', '.item2_przelewy24_active']);
            showElements(['.item2_klarna_active', '.item2_blik', '.item2_przelewy24']);
        });
    }

    if (window.location.pathname.endsWith('long_dis_trans.html')) {
        hideElements(['#history_content', '#napis_history', '#topbutton1_noactive', '#topbutton2_active']);

        addClickListener('#topbutton2_noactive', function () {
            hideElements(['#carrier_content']);
            showElements(['#history_content', '#napis_history', '#topbutton1_noactive', '#topbutton2_active']);
            hideElements(['#napis_carrier', '#topbutton1_active', '#topbutton2_noactive']);
            document.querySelector('#nexticon').style.display = 'none';
        });

        addClickListener('#topbutton1_noactive', function () {
            showElements(['#carrier_content']);
            hideElements(['#history_content', '#napis_history']);
            showElements(['#napis_carrier', '#nexticon']);
            hideElements(['#topbutton1_noactive', '#topbutton2_active']);
            showElements(['#topbutton1_active', '#topbutton2_noactive']);
        });
    }

    if (window.location.pathname.endsWith('public_trans.html')) {
        hideElements(['#history_content', '.napis_history', '.topbutton1_noactive', '.topbutton2_active']);

        addClickListener('.topbutton2_noactive', function () {
            hideElements(['#public_trans_content']);
            showElements(['#history_content', '.napis_history', '.topbutton1_noactive', '.topbutton2_active']);
            hideElements(['.napis_public_transport', '.topbutton1_active', '.topbutton2_noactive']);
            document.querySelector('.skyscapericon').style.display = 'none';
        });

        addClickListener('.topbutton1_noactive', function () {
            showElements(['#public_trans_content']);
            hideElements(['#history_content', '.napis_history']);
            showElements(['.napis_public_transport', '.skyscapericon']);
            hideElements(['.topbutton1_noactive', '.topbutton2_active']);
            showElements(['.topbutton1_active', '.topbutton2_noactive']);
        });
    }

    if (window.location.pathname.endsWith('parking.html')) {
        hideElements(['#history_content', '#napis_history', '.topbutton1_noactive', '.topbutton2_active']);

        addClickListener('.topbutton2_noactive', function () {
            hideElements(['#locations_content', '.topbutton1_active', '.topbutton2_noactive', '.skyscapericon']);
            showElements(['#history_content', '#napis_history', '.topbutton1_noactive', '.topbutton2_active']);
            hideElements(['#napis_parking']);
            document.querySelector('.skyscapericon').style.display = 'none';
        });

        addClickListener('.topbutton1_noactive', function () {
            showElements(['#locations_content']);
            hideElements(['#history_content', '#napis_history']);
            showElements(['#napis_parking', '.skyscapericon']);
            hideElements(['.topbutton1_noactive', '.topbutton2_active']);
            showElements(['.topbutton1_active', '.topbutton2_noactive']);
        });

        addClickListener('.skyscapericon', function () {
            // Ustawienie animacji transformacji na 1 sekundę dla elementów html i body
            document.documentElement.style.transition = 'transform 0.4s';
            document.body.style.transition = 'transform 0.4s';

            // Zastosowanie transformacji scale(0.8)
            document.documentElement.style.transform = 'scale(0.98)';
            document.body.style.transform = 'scale(0.98)';

            document.body.style.transformOrigin = 'bottom';
            document.documentElement.style.transformOrigin = 'bottom';


        });
    }
});
