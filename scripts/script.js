document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const keyAPI = 'trnsl.1.1.20200506T232521Z.c9e9c4c89ded0bf4.bab2e662454819f4aeadcefa752c982efb036dee';

    const makeRequest = (url, data, method = 'GET', contentType = 'application/json') => {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': contentType,
            },
            data: JSON.stringify(data),
        });
    }

    const showResponse = (data) => {
        const   result = document.querySelector('.result');

        result.textContent = data;
    };

    const setTranslateForm = () => {
        const   formTranslate = document.querySelector('.translate'),
                inputTranslate = formTranslate.querySelector('.translate__input'),
                [...checkboxesTranslate] = formTranslate.querySelectorAll('.translate__checkbox'),
                checkboxRuEn = formTranslate.querySelector('[lang="ru-en"]');


        checkboxRuEn.checked = true;

        formTranslate.addEventListener('submit', (e) => {
            e.preventDefault();
            const textToTranslate = inputTranslate.value || ' ';
            const lang = checkboxesTranslate.find((checkbox) => checkbox.checked).getAttribute('lang');
            const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyAPI}&text=${textToTranslate}&lang=${lang}`;
            makeRequest(url)
            .then((response) => {
                if(response.status !== 200){
                    throw new Error('response status isn\'t equal to 200');
                }
                return response.json();
            })
            .then((data) => showResponse(data.text))
            .catch((error) => showResponse(error.text));
        });

        inputTranslate.addEventListener('click', () => {
            inputTranslate.value = '';
            const result = document.querySelector('.result');
            result.textContent = '';
        });

        checkboxesTranslate.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                const anotherCheckbox = checkboxesTranslate.find((elem) => elem !== checkbox);
                if(checkbox.checked){
                    anotherCheckbox.checked = false;
                }else{
                    anotherCheckbox.checked = true;
                }
            });
        });

    }
    setTranslateForm();
});