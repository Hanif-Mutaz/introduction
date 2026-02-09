// STATE
let currentStep = 1;
let userName = '';

// INIT
document.addEventListener('DOMContentLoaded', init);

function init() {
    setupEventListeners();
}

// EVENT LISTENERS
function setupEventListeners() {
    // Next step buttons
    const nextButtons = document.querySelectorAll('[data-next]');
    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = btn.getAttribute('data-next');
            goToStep(parseInt(nextStep));
        });
    });

    // Submit name
    const submitBtn = document.getElementById('submitName');
    const nameInput = document.getElementById('nameInput');

    submitBtn.addEventListener('click', handleNameSubmit);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleNameSubmit();
        }
    });

    // Fragment buttons
    const fragmentBtns = document.querySelectorAll('.fragment-btn');
    fragmentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const fragmentNum = btn.getAttribute('data-fragment');
            openFragment(fragmentNum);
        });
    });

    // Back buttons
    const backBtns = document.querySelectorAll('.btn-back');
    backBtns.forEach(btn => {
        btn.addEventListener('click', closeFragment);
    });
}

// NAVIGATION
function goToStep(stepNum) {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const nextStepEl = document.getElementById(`step${stepNum}`);

    if (!nextStepEl) return;

    currentStepEl.classList.remove('active');

    setTimeout(() => {
        nextStepEl.classList.add('active');
        currentStep = stepNum;
    }, 300);
}

function handleNameSubmit() {
    const input = document.getElementById('nameInput');
    const name = input.value.trim();

    if (name === '') {
        input.classList.add('error');
        setTimeout(() => {
            input.classList.remove('error');
        }, 500);
        return;
    }

    userName = name;
    document.getElementById('userName').textContent = userName;
    goToStep(3);
}

// FRAGMENT SYSTEM
function openFragment(fragmentNum) {
    const menu = document.getElementById('fragmentMenu');
    const fragment = document.getElementById(`fragment${fragmentNum}`);

    if (!fragment) return;

    // Hide menu
    menu.style.display = 'none';

    // Hide all fragments
    const allFragments = document.querySelectorAll('.fragment-detail');
    allFragments.forEach(f => f.classList.remove('active'));

    // Show selected fragment
    fragment.classList.add('active');
}

function closeFragment() {
    const menu = document.getElementById('fragmentMenu');
    const allFragments = document.querySelectorAll('.fragment-detail');

    // Hide all fragments
    allFragments.forEach(f => f.classList.remove('active'));

    // Show menu
    menu.style.display = 'block';
}