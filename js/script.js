let jobInput = document.querySelector('#other-title');
let jobSelect = document.querySelector('#title');

jobInput.style.display = 'none';


/**
 * Event listener to Job Select section. 
 * On 'other' value select, it must display job Input
 * Otherwise it must hide it.
 */
jobSelect.addEventListener('change', (e) => {
    console.log(e.target.value)
    if (e.target.value === 'other') {
        jobInput.style.display = 'block';
    } 
    else  {
        jobInput.style.display = 'none';
    } 
});
