"use strict";
var mlCodes = [
    {
        code: "en",
        name: "English",
    },
    {
        code: "es",
        name: "Spanish",
    },
];
var MLstrings = [
    {
        English: "INDYCAR and the Indianapolis Motor Speedway are moving full speed ahead in the “Race for Equality and Change.” The past few months have been filled with announcements that have built the engine that will drive fundamental change and support diversity and inclusivity across the motorsports industry. But we’ve just taken the green flag.",
        Spanish: "INDYCAR y el Indianapolis Motor Speedway avanzan a toda velocidad en la 'Carrera por la igualdad y el cambio'. Los últimos meses han estado llenos de anuncios que han construido el motor que impulsará un cambio fundamental y apoyará la diversidad y la inclusión en la industria del automovilismo. Pero acabamos de tomar la bandera verde.",
    }
];
// Global var :(
var mlrLangInUse;
var mlr = function ({ dropID = "mbPOCControlsLangDrop", stringAttribute = "data-mlr-text", chosenLang = "English", mLstrings = MLstrings, countryCodes = false, countryCodeData = [], } = {}) {
    const root = document.documentElement;
    var listOfLanguages = Object.keys(mLstrings[0]);
    mlrLangInUse = chosenLang;
    (function createMLDrop() {
        var mbPOCControlsLangDrop = document.getElementById(dropID);
        // Reset the menu
        mbPOCControlsLangDrop.innerHTML = " ";
        // Now build the options
        listOfLanguages.forEach((lang, langidx) => {
            let HTMLoption = document.createElement("option");
            HTMLoption.value = lang;
            HTMLoption.textContent = lang;
            mbPOCControlsLangDrop.appendChild(HTMLoption);
            if (lang === chosenLang) {
                mbPOCControlsLangDrop.value = lang;
            }
        });
        mbPOCControlsLangDrop.addEventListener("change", function (e) {
            mlrLangInUse = mbPOCControlsLangDrop[mbPOCControlsLangDrop.selectedIndex].value;
            resolveAllMLStrings();
            // Here we update the 2-digit lang attribute if required
            if (countryCodes === true) {
                if (!Array.isArray(countryCodeData) || !countryCodeData.length) {
                    console.warn("Cannot access strings for language codes");
                    return;
                }
                root.setAttribute("lang", updateCountryCodeOnHTML().code);
            }
        });
    })();
    function updateCountryCodeOnHTML() {
        return countryCodeData.find(this2Digit => this2Digit.name === mlrLangInUse);
    }
    function resolveAllMLStrings() {
        let stringsToBeResolved = document.querySelectorAll(`[${stringAttribute}]`);
        stringsToBeResolved.forEach(stringToBeResolved => {
            let originaltextContent = stringToBeResolved.textContent;
            let resolvedText = resolveMLString(originaltextContent, mLstrings);
            stringToBeResolved.textContent = resolvedText;
        });
    }
};
function resolveMLString(stringToBeResolved, mLstrings) {
    var matchingStringIndex = mLstrings.find(function (stringObj) {
        // Create an array of the objects values:
        let stringValues = Object.values(stringObj);
        // Now return if we can find that string anywhere in there
        return stringValues.includes(stringToBeResolved);
    });
    if (matchingStringIndex) {
        return matchingStringIndex[mlrLangInUse];
    }
    else {
        // If we don't have a match in our language strings, return the original
        return stringToBeResolved;
    }
}
mlr({
    dropID: "mbPOCControlsLangDrop",
    stringAttribute: "data-mlr-text",
    chosenLang: "English",
    mLstrings: MLstrings,
    countryCodes: true,
    countryCodeData: mlCodes,
});
