function submitLogout(btn) {
    const form = btn.parentNode;
    form.submit();
}


// //applications && jobList tab --> Hirer
// const applicationsTab = document.getElementById('applications-tab');
// const jobsTab = document.getElementById('jobs-listed-tab');
// applicationsTab.addEventListener('click', applications);
// jobsTab.addEventListener('click', jobs);

// const applicationsDiv = document.getElementById('applications');
// const jobsDiv = document.getElementById('jobs-listed');
//jobsDiv.style.display = "none";

// //divs
// function applications() {
//     applicationsTab.classList.add('is-active');
//     jobsTab.classList.remove(is-active');
//     applicationsDiv.style.display = 'block';
//     jobsDiv.style.display = 'none';
// }

// function jobs() {
//     jobsTab.classList.add('is-active');
//     jobsDiv.style.display = 'block';
//     applicationsTab.classList.remove('is-active');
//     applicationsDiv.style.display = 'none';
// }

//saved && applied tabs --> candidate
const savedTab = document.getElementById('saved-tab');
const appliedTab = document.getElementById('applied-tab');
savedTab.addEventListener('click', savedJobs);
appliedTab.addEventListener('click', appliedJobs);

const savedDiv = document.getElementById('saved');
const appliedDiv = document.getElementById('applied');
appliedDiv.style.display = 'none';

function savedJobs() {
    savedTab.classList.add('is-active');
    appliedTab.classList.remove('is-active');
    savedDiv.style.display = 'block';
    appliedDiv.style.display = 'none';
}

function appliedJobs() {
    appliedTab.classList.add('is-active');
    savedTab.classList.remove('is-active');
    appliedDiv.style.display = 'block';
    savedDiv.style.display = 'none';
}

