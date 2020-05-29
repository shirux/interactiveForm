// -------------------------
// JOB  SELECTORS AND FUNCTIONS
// -------------------------
let jobInput = document.querySelector('#other-title');
let jobSelect = document.querySelector('#title');
jobInput.style.display = 'none';

/**
 * Event listener to Job Select section. 
 * On 'other' value select, it must display job Input
 * Otherwise it must hide it.
 */
jobSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        jobInput.style.display = 'block';
    } 
    else  {
        jobInput.style.display = 'none';
    } 
});


// -------------------------
// T-SHIRT SELECTORS AND FUNCTIONS
// -------------------------
let designShirtSelect = document.querySelector('#design');

// Shirt options
let jsPunsOptions = ['Cornflower Blue (JS Puns shirt only)', 'Dark Slate Grey (JS Puns shirt only)', 'Gold (JS Puns shirt only)'];
let heartJsOptions = ['Tomato (I &#9829; JS shirt only)', 'Steel Blue (I &#9829; JS shirt only)', 'Dim Grey (I &#9829; JS shirt only)'];

/**
 * Object that represents the state of the shirt section
 */
let shirtSection = {
    // States and selectors
    display : 'none',
    div: document.querySelector('#colors-js-puns'),
    select : document.querySelector('#color'), 
    /**
     * Updates the visibility of the color select
     * @param {string} state display style option to be updated
     */
    updateDisplay : state => {
        shirtSection.display = state;
        shirtSection.div.style.display = shirtSection.display;
    },
    /**
     * Updates the color options select
     * @param {array} array options values to be added on select
     */
    updateValues : array => {
        shirtSection.select.innerHTML = '';
        array.forEach(optionValue => {
            shirtSection.select.appendChild(createTagElement('option', optionValue));
        });
    },
    /**
     * Receives an event and depending on target event, triggers inner functions
     * @param {event} e event triggered on function call
     */
    update : e => {
        if (e.target.value === 'Select Theme') {
            console.log(e.target.value);
            shirtSection.updateDisplay('none');
            shirtSection.updateValues([]);
        } else if (e.target.value === 'heart js') {
            console.log(e.target.value);
            shirtSection.updateDisplay('block');
            shirtSection.updateValues(heartJsOptions);
        } else if (e.target.value === 'js puns') {
            console.log(e.target.value);
            shirtSection.updateDisplay('block');
            shirtSection.updateValues(jsPunsOptions);
        }
    }
}

/**
 * Event listener to Shirt Theme Section.
 * On option select, display color options related to theme
 * On 'select theme' option, hide again the color select input
 */
designShirtSelect.addEventListener('change', (e) => {
    shirtSection.update(e);
});


// -------------------------
// ACTIVITY REGISTER SELECTORS AND FUNCTIONS
// -------------------------
let activityLabel = document.querySelector('.activities');
let totalCost = document.querySelector('#total-cost');

/**
 * Object that represents the activity checkbox section
 */
let activitySection = {
    // States and selectors
    valueText : document.querySelector('#total-cost'),
    totalValue: 0,
    displayValue: 'none',
    options: document.querySelectorAll('.activities input[type=checkbox]'),
    /**
     * Receives a HTML Element and updates the state of the object
     * @param {HTML Element} option Selected option
     */
    update: option => {
        let value = (option.checked) ? parseInt(option.getAttribute('data-cost')) : -1 * parseInt(option.getAttribute('data-cost'));
        activitySection.totalValue += value;
        if (activitySection.totalValue === 0) {
            activitySection.updateDisplay('none');
            activitySection.updateTextValue();
        } else {
            activitySection.updateDisplay('block');
            activitySection.updateTextValue(value);
        }
        activitySection.checkCalendar(option);
    },
    /**
     * Checks and updates every checkbox if selected option has the same calendar time
     * @param {HTMLElement} option Selected option
     */
    checkCalendar: option => {
        let time = option.getAttribute('data-day-and-time');
        activitySection.options.forEach(checkbox => {
            if(checkbox !== option && time === checkbox.getAttribute('data-day-and-time')) {
                if (option.checked) checkbox.disabled = true;
                else checkbox.disabled = false;
            } 
        });
    },
    /**
     * Updates the display status of the value Text paragraph
     * @param {string} value display value
     */
    updateDisplay: value => {
        activitySection.displayValue = value;
        activitySection.valueText.style.display = activitySection.displayValue;
    },
    /**
     * Updates the total value from the selected options
     * If it is falsy it will remove all text Content
     * @param {int} value Total cost of the selected options
     */
    updateTextValue: (value = '') => {
        if(value) {
            activitySection.valueText.textContent = 'Total $' + activitySection.totalValue;
        } else {
            activitySection.valueText.textContent = ''
        }
    }
}

/**
 * Event listener to update checkbox and values according to event
 */
activityLabel.addEventListener('change', (e) => {
        activitySection.update(e.target);
});



// -------------------------
// CUSTOMIZED OPTIONS
// -------------------------

/**
 * Returns a new HTML element with text content
 * @param {string} tag HTML Element to be created
 * @param {*} textContent Inner text of the new HTML Element
 */
const createTagElement = (tag, textContent) => {
    let newElement = document.createElement(tag);
    newElement.textContent = textContent;
    return newElement;
}

// Starts form by hiding T-Shirt Select Div
shirtSection.updateDisplay('none');