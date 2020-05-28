// Job input Selectors and styles
let jobInput = document.querySelector('#other-title');
let jobSelect = document.querySelector('#title');
jobInput.style.display = 'none';

// T-shirt Section selectors and styles
let colorShirtDiv = document.querySelector('#colors-js-puns');
let colorShirtSelect = document.querySelector('#color');
let designShirtSelect = document.querySelector('#design');

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

/**
 * Event listener to Shirt Theme Section.
 * On option select, display color options related to theme
 * On 'select theme' option, hide again the color select input
 */
designShirtSelect.addEventListener('change', (e) => {
    if (e.target.value === 'Select Theme') {
        hideColorDiv();
    } else if (e.target.value === 'heart js') {
        updateShirtSelect(e.target.value);
    } else if (e.target.value === 'js puns') {
        updateShirtSelect(e.target.value);
    }
});

/**
 * Update the select options according to user shirt theme select
 * @param {string} theme T-Shirt theme selected by the user
 */
const updateShirtSelect = theme => {
    colorShirtDiv.style.display = 'block';
    if (theme === 'heart js') {
        addHeartJsColors();
    } else if (theme === 'js puns') {
        addPunsColors();
    }
}

/**
 * Update T-Shirt color select with Heart Js Colors options
 */
const addHeartJsColors = () => {
    colorShirtSelect.innerHTML = '';
    colorShirtSelect.appendChild(createTagElement('option', 'Tomato (I &#9829; JS shirt only)'));
    colorShirtSelect.appendChild(createTagElement('option', 'Steel Blue (I &#9829; JS shirt only)'));
    colorShirtSelect.appendChild(createTagElement('option', 'Dim Grey (I &#9829; JS shirt only)'));
}

/**
 * Update T-Shirt color select with JS Puns Colors options
 */
const addPunsColors = () => {
    colorShirtSelect.innerHTML = '';
    colorShirtSelect.appendChild(createTagElement('option', 'Cornflower Blue (JS Puns shirt only)'));
    colorShirtSelect.appendChild(createTagElement('option', 'Dark Slate Grey (JS Puns shirt only)'));
    colorShirtSelect.appendChild(createTagElement('option', 'Gold (JS Puns shirt only)'));
}

/**
 * Hide color shirt Select div and clean its options
 */
const hideColorDiv = () => {
    colorShirtSelect.innerHTML = '';
    colorShirtDiv.style.display = 'none';
}

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
hideColorDiv();