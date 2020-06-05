// --------------------------------------------
// NAME SECTION 
// --------------------------------------------


/**
 * Object that represents the email section
 */
const nameSection = {
    input: document.querySelector('#name'),
    /**
     * Checks if name field is not empty
     * @returns {boolean} Indicator if name Field is empty 
     */
    validate: () => {
        const nameLabel = document.querySelector('label[for=name]');
        const namePopup = document.querySelector('#pop-up-name');
        const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/
        // Returns false and add error classes if is empty
        if (nameSection.input.value === '') {
            nameSection.input.classList.add('error');
            nameLabel.classList.add('error-text');
            namePopup.style.display = 'inherit';
            namePopup.textContent = `Name field can't be empty. Please enter a name`;
            return false;
        // Otherwise remove error classes and returns true
        } else if (!nameSection.input.value.match(nameRegex)) {
            nameSection.input.classList.add('error');
            nameLabel.classList.add('error-text');
            namePopup.style.display = 'inherit';
            namePopup.textContent = `Name must contain only alphabetic characters`;
            return false;
        } else {
            nameSection.input.classList.remove('error');    
            nameLabel.classList.remove('error-text');
            namePopup.style.display = 'none';
            namePopup.textContent = '';
            return true;
        }
    }
}


// --------------------------------------------
// EMAIL SECTION
// --------------------------------------------


/**
 * Object that represents the email section
 */
const emailSection = {
    input: document.querySelector('#mail'),
    /**
     * Checks if email field is a valid email
     * @returns {boolean} Indicator if email is valid 
     */
    validate: () => {
        const emailLabel = document.querySelector('label[for=mail]');
        const emailRegex = /^(\w|\d)+([\.-]?(\w|\d)+)*@(\w)+(\.\w{2,})(\.\w{2,})?$/;
        const emailPopup = document.querySelector('#pop-up-mail');
        // Check if email is valid with Regex, if not, returns false
        // and add error classes
        if (!emailSection.input.value.match(emailRegex)) {
            emailSection.input.classList.add('error');
            emailLabel.classList.add('error-text');
            if (emailSection.input.value === '') {
                emailPopup.textContent = `Email address can't be empty. Please enter an email address`;
            } else {
                emailPopup.textContent = 'Please enter a valid email address';
            }
            emailPopup.style.display = 'inherit';
            return false;
        // Otherwise remove error classes
        } else {
            emailSection.input.classList.remove('error');
            emailLabel.classList.remove('error-text');
            emailPopup.textContent = '';
            emailPopup.style.display = 'none';
            return true;
        }
    }
}


// --------------------------------------------
// JOB SECTION
// --------------------------------------------


/**
 * Object that represents the job section
 */
const jobSection = {
    input: document.querySelector('#other-title'),
    select: document.querySelector('#title'),
    /**
     * Hides other Job option and adds an event listener on change
     */
    init: () => {
        jobSection.input.style.display = 'none',
        jobSection.select.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
                jobSection.input.style.display = 'block';
            } else  {
                jobSection.input.style.display = 'none';
            } 
        });
    }
}

// Initial state of job section
jobSection.init();


// --------------------------------------------
// T-SHIRT SECTION
// --------------------------------------------


// Shirt options
// TODO insert this again on html
const jsPunsOptions = [0, 1, 2];
const heartJsOptions = [3, 4, 5];

const shirtSection =  {
    select: document.querySelector('#design'),
    div: document.querySelector('#colors-js-puns'),
    color: document.querySelector('#color'),
    colorOptions: document.querySelectorAll('#color option'),
    /**
     * Receives an event and depending on target event, triggers inner functions
     * @param {event} e event triggered on function call
     */
    update: e => {
        if (e.target.value === 'Select Theme') {
            shirtSection.div.style.display = 'none';
            shirtSection.changeDisplayOptions([]);
        } else if (e.target.value === 'heart js') {
            shirtSection.div.style.display = 'block';
            shirtSection.changeDisplayOptions(heartJsOptions);
        } else if (e.target.value === 'js puns') {
            shirtSection.div.style.display = 'block';
            shirtSection.changeDisplayOptions(jsPunsOptions);
        }
    },
    /**
     * Updates the display of the color options
     * @param {int []} options the positions of the options that must be shown 
     */
    changeDisplayOptions: options => {
        let selected = false;
        for (let i = 0; i < shirtSection.colorOptions.length; i++) {
            if (options.includes(i)) {
                shirtSection.colorOptions[i].style.display = 'inherit';
                if (!selected) {
                    shirtSection.colorOptions[i].selected = true;
                    selected = true;
                }
            } else {
                shirtSection.colorOptions[i].style.display = 'none';
            }
        }
    },
    /**
     * hides the shirt color select and adds an event listener on change
     */
    init: () => {
        shirtSection.div.style.display = 'none';
        shirtSection.colorOptions.forEach(option => {
            option.style.display = 'none';
        })
        shirtSection.select.addEventListener('change', (e) => {
            shirtSection.update(e);
        });
    }
}

// Initial state of shirt section
shirtSection.init();


// --------------------------------------------
// ACTIVITY REGISTER SECTION
// --------------------------------------------


/**
 * Object that represents the activity checkbox section
 */
const activitySection = {
    // States and selectors
    label: document.querySelector('.activities'),
    totalCost: document.querySelector('#total-cost'),
    totalValue: 0,
    options: document.querySelectorAll('.activities input[type=checkbox]'),
    /**
     * Receives a HTML Element and updates the state of the object
     * @param {HTML Element} option Selected option
     */
    update: option => {
        const value = (option.checked) ? parseInt(option.getAttribute('data-cost')) : -1 * parseInt(option.getAttribute('data-cost'));
        activitySection.totalValue += value;
        if (activitySection.totalValue === 0) {
            activitySection.totalCost.style.display = 'none';
            activitySection.updateTextValue();
        } else {
            activitySection.totalCost.style.display = 'block';
            activitySection.updateTextValue(value);
        }
        activitySection.refreshCheckbox(option);
    },
    /**
     * Checks and updates every checkbox if selected option has the same calendar time
     * @param {HTMLElement} option Selected option
     */
    refreshCheckbox: option => {
        const time = option.getAttribute('data-day-and-time');
        activitySection.options.forEach(checkbox => {
            if(checkbox !== option && time === checkbox.getAttribute('data-day-and-time')) {
                if (option.checked) checkbox.disabled = true;
                else checkbox.disabled = false;
            } 
        });
    },
    /**
     * Updates the total value from the selected options
     * If it is falsy it will remove all text Content
     * @param {int} value Total cost of the selected options
     */
    updateTextValue: (value = '') => {
        if(value) {
            activitySection.totalCost.textContent = 'Total $' + activitySection.totalValue;
        } else {
            activitySection.totalCost.textContent = ''
        }
    },
    validate: () => {
        const activityLegend = document.querySelector('.activities legend');
        const activityPopup = document.querySelector('#pop-up-activity');
        let oneChecked = false;
        // Checks every activity checkbox
        activitySection.options.forEach(activity => {
            oneChecked = oneChecked || activity.checked;
        });
        // If user didn't select at least one, add error classes
        // Otherwise, it will remove error classes
        if (!oneChecked) {
            activityLegend.classList.add('error-text');
            activityPopup.textContent = 'Please select at least one activity';
            activityPopup.style.display = 'inherit';
        } else {
            activityLegend.classList.remove('error-text');   
            activityPopup.textContent = '';
            activityPopup.style.display = 'none';     
        }
        return oneChecked;
    },
    /**
     * Adds an event listener on change to activity section
     */
    init: () => {
        activitySection.label.addEventListener('change', (e) => {
            activitySection.update(e.target);
        });
    }
}

// Initial state of the activity section
activitySection.init();


// -------------------------
// PAYMENTS OPTIONS SELECTORS AND FUNCTIONS
// -------------------------
const paymentOptions = document.querySelector('#payment');

/**
 * Object that represents the payment option
 */
const paymentsSection = {
    // sections
    creditCard: document.querySelector('#credit-card'),
    paypal: document.querySelector('#paypal'),
    bitcoin: document.querySelector('#bitcoin'),
    div: document.querySelector('#payment'),
    /**
     * On every change of select option, it will update object 
     * @param {event} e event triggered on changed
     */
    update: e => {
        if (e.target.value === 'credit card') {
            paymentsSection.updateDisplay(paymentsSection.creditCard, [paymentsSection.paypal, paymentsSection.bitcoin]);
        } else if (e.target.value === 'paypal') {
            paymentsSection.updateDisplay(paymentsSection.paypal, [paymentsSection.creditCard, paymentsSection.bitcoin]);
        } else if (e.target.value === 'bitcoin') {
            paymentsSection.updateDisplay(paymentsSection.bitcoin, [paymentsSection.creditCard, paymentsSection.paypal])
        }
    }, 
    /**
     * updates display of every section
     * @param {HTMLElement} showSection section to be shown
     * @param {HTMLElement []} hideSections sections to be hidden
     */
    updateDisplay: (showSection, hideSections) => {
        showSection.style.display = 'block';
        hideSections.forEach(section => {
            section.style.display = 'none';
        });
    },
    /**
     * Checks all credit card info
     * @returns {boolean} is credit card info valid
     */
    // TODO VALIDATE EACH ONE DIFFERENT
    validate: () => {
        if (paymentsSection.div.value === 'credit card') {
            // Selectors
            const creditInput = [
                document.querySelector('#cc-num'),
                document.querySelector('#zip'),
                document.querySelector('#cvv')
            ];
            const labels = [
                document.querySelector('label[for=cc-num]'),
                document.querySelector('label[for=zip]'),
                document.querySelector('label[for=cvv]')
            ];
            const errorsPopups = [
                'Credit card must contain 15 digits.',
                'Zip code must contains 5 digits.',
                'CVV must contains 3 digits.'
            ];
            // Regex
            const regexInfo = [
                /^\d{13,16}$/,
                /^\d{5}$/,
                /^\d{3}$/
            ];
           
            // If credit card values match regex, add error classes and returns true
            if (paymentsSection.validateInfo(creditInput, regexInfo, labels, errorsPopups)) {  
                return true;
            } 
            return false;
        }
        return true;
    },
    /**
     * Validates credit card info with regex. On error, display error message
     * @param {HTMLElement[]} inputs Array of inputs to be validated
     * @param {regex[]} regex Array of regex to match against inputs
     * @param {HTMLElement[]} labels Array of label elements to update
     * @param {errorPupups[]} errors Array of errors to display on every check
     */
    validateInfo: (inputs, regex, labels, errors) => {
        const popUp = document.querySelector('#pop-up-payment');
        let answer = true;
        let popupChanged = false;
        for (let i = 0; i < inputs.length; i++) {
            answer = answer && inputs[i].value.match(regex[i]);
            if (!answer) {
                inputs[i].classList.add('error');
                labels[i].classList.add('error-text');
                if (!popupChanged) {
                    popUp.textContent = errors[i];
                    popUp.style.display = 'inherit';
                    popupChanged = true;
                }
            } else {
                inputs[i].classList.remove('error');
                labels[i].classList.remove('error-text');
                popUp.textContent = '';
                popUp.style.display = 'none';
            }
        }
        if (answer) {
            popUp.textContent = '';
            popUp.style.display = 'none';
        }
        return answer;
    }, 
    /**
     * Init method to start the sections
     */
    init: () => {
        paymentsSection.paypal.style.display = 'none';
        paymentsSection.bitcoin.style.display = 'none';
        paymentsSection.div.addEventListener('change', e => {
            paymentsSection.update(e);
        });
    }
}

// Initial state of the payments section
paymentsSection.init();


// -------------------------
// VALIDATIONS
// -------------------------


/**
 * Object that represents all validations 
 */
const validations = {
    submit: document.querySelector('form button[type=submit]'),
    /**
     * Add click event listener to submit form
     * It validates name, email, shirt selection, activity selection and creditCard selections
     */
    init: () => {
        validations.submit.addEventListener('click', e => {
            const nameCrit = nameSection.validate();
            const emailCrit = emailSection.validate();
            const activityCrit = activitySection.validate();
            const paymentsCrit = paymentsSection.validate();
            if (!(nameCrit && emailCrit && activityCrit && paymentsCrit)) {
                e.preventDefault();
            }
        });
    },
    /**
     * Add online validations to the form
     */
    addOnlineValidations: () => {
        nameSection.input.addEventListener('input', e => {
            nameSection.validate();
        });
        emailSection.input.addEventListener('input', e => {
            emailSection.validate();
        });
        activitySection.label.addEventListener('change', e => {
            activitySection.validate();
        })
        paymentsSection.creditCard.addEventListener('change', e => {
            paymentsSection.validate();
        });
    }
}

// Start the validations
validations.init();
validations.addOnlineValidations();


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