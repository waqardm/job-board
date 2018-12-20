function submitLogout(btn) {
    const form = btn.parentNode;
    form.submit();
}

// show/hide job details
if(window.location.pathname === '/'){
    const detailsButton = document.getElementById('detailsButton');
    const hiddenDetails = document.getElementById('hidden-job-details');
    
    detailsButton.addEventListener("click", showsJobDetails);
    hiddenDetails.style.display = 'none';

    function showsJobDetails() {
        if (hiddenDetails.style.display === 'block') {
            hiddenDetails.style.display = 'none';
            details.innerHTML = 'Show Details';
        } else {
            hiddenDetails.style.display = 'block';
            detailsButton.innerHTML = 'Hide Details';
        }
    }
}

//Candidate && Hirer Dashboard tab management

if(window.location.pathname == '/dashboard'){
    const tab1Tab = document.getElementById('tab1-tab');
    const tab2Tab = document.getElementById('tab2-tab');
    tab1Tab.addEventListener('click', tab1Show);
    tab2Tab.addEventListener('click', tab2Show);

    const tab1Div = document.getElementById('tab1-div');
    const tab2Div = document.getElementById('tab2-div');


    //divs
    function tab1Show() {
        tab1Tab.classList.add('is-active');
        tab2Tab.classList.remove('is-active');
        tab1Div.style.display = 'block';
        tab2Div.style.display = 'none';
    }

    function tab2Show() {
        tab2Tab.classList.add('is-active');
        tab2Div.style.display = 'block';
        tab1Tab.classList.remove('is-active');
        tab1Div.style.display = 'none';
    }
}


