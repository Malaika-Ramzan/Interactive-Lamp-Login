
"use strict";


// ========================================
// 1. GET HTML ELEMENTS
// ========================================

const scene = document.getElementById("scene");

const pullCord = document.getElementById("pullCord");
const cordLine = document.getElementById("cordLine");
const cordPull = document.getElementById("cordPull");

const pullHint = document.getElementById("pullHint");
const authSide = document.getElementById("authSide");


// ========================================
// 2. PULL CORD VARIABLES
// ========================================

let isLit = false;
let isDragging = false;

let startY = 0;
let currentExtra = 0;

const originalY = 263;
const minPull = 28;
const maxPull = 105;


// ========================================
// 3. CHANGE CORD POSITION
// ========================================

function setCordPosition(extra) {

    currentExtra = Math.max(
        0,
        Math.min(maxPull, extra)
    );

    const endY = originalY + currentExtra;

    cordLine.setAttribute(
        "d",
        `M158 179 Q161 ${218 + currentExtra * 0.38} 158 ${255 + currentExtra}`
    );

    cordPull.setAttribute(
        "cy",
        String(endY)
    );

}


// ========================================
// 4. LAMP ON / OFF FUNCTION
// ========================================

function setLamp(state) {

    isLit = state;

    scene.classList.toggle("lit", isLit);

    authSide.setAttribute(
        "aria-hidden",
        String(!isLit)
    );

    pullHint.textContent = isLit
        ? "PULL THE CORD AGAIN TO TURN OFF THE LIGHT"
        : "PULL THE CORD TO TURN ON THE LIGHT";

}


// ========================================
// 5. START PULLING THE CORD
// ========================================

function beginPull(event) {

    if (event.type === "keydown") {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            setLamp(!isLit);

        }

        return;
    }

    event.preventDefault();

    isDragging = true;

    startY = event.clientY;

    pullCord.classList.add("dragging");

    cordPull.setPointerCapture(
        event.pointerId
    );

}


// ========================================
// 6. MOVE THE CORD
// ========================================

function movePull(event) {

    if (!isDragging) {
        return;
    }

    const distance = Math.max(
        0,
        event.clientY - startY
    );

    setCordPosition(distance);

}


// ========================================
// 7. RELEASE THE CORD
// ========================================

function endPull() {

    if (!isDragging) {
        return;
    }

    isDragging = false;

    pullCord.classList.remove("dragging");

    const wasPulled = currentExtra >= minPull;

    setCordPosition(0);

    if (wasPulled) {

        setLamp(!isLit);

    }

}


// ========================================
// 8. PULL CORD EVENTS
// ========================================

cordPull.addEventListener(
    "pointerdown",
    beginPull
);

cordPull.addEventListener(
    "pointermove",
    movePull
);

cordPull.addEventListener(
    "pointerup",
    endPull
);

cordPull.addEventListener(
    "pointercancel",
    endPull
);

cordPull.addEventListener(
    "lostpointercapture",
    endPull
);

cordPull.addEventListener(
    "keydown",
    beginPull
);


// ========================================
// 9. GET FORM ELEMENTS
// ========================================

const loginTab = document.getElementById("loginTab");

const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");

const signupForm = document.getElementById("signupForm");

const forgotForm = document.getElementById("forgotForm");

const forgotLink = document.getElementById("forgotLink");

const backToLogin = document.getElementById("backToLogin");

const cardTitle = document.getElementById("cardTitle");

const cardSubtitle = document.getElementById("cardSubtitle");

const feedback = document.getElementById("feedback");


// ========================================
// 10. CLEAR FEEDBACK
// ========================================

function clearFeedback() {

    feedback.textContent = "";

    feedback.classList.remove("error");

}


// ========================================
// 11. SHOW FEEDBACK
// ========================================

function showFeedback(text, isError = false) {

    feedback.textContent = text;

    feedback.classList.toggle(
        "error",
        isError
    );

}


// ========================================
// 12. SWITCH BETWEEN FORMS
// ========================================

function showScreen(screen) {

    clearFeedback();

    loginForm.classList.toggle(
        "hidden",
        screen !== "login"
    );

    signupForm.classList.toggle(
        "hidden",
        screen !== "signup"
    );

    forgotForm.classList.toggle(
        "hidden",
        screen !== "forgot"
    );


    // Update active tabs

    loginTab.classList.toggle(
        "active",
        screen === "login"
    );

    signupTab.classList.toggle(
        "active",
        screen === "signup"
    );


    loginTab.setAttribute(
        "aria-selected",
        String(screen === "login")
    );

    signupTab.setAttribute(
        "aria-selected",
        String(screen === "signup")
    );


    // Update headings

    if (screen === "login") {

        cardTitle.textContent = "Welcome";

        cardSubtitle.textContent =
            "Sign in to continue to your account";

    }

    else if (screen === "signup") {

        cardTitle.textContent = "Create Account";

        cardSubtitle.textContent =
            "Sign up to get started";

    }

    else {

        cardTitle.textContent = "Forgot Password?";

        cardSubtitle.textContent =
            "Enter your email to continue";

    }

}


// ========================================
// 13. FORM NAVIGATION EVENTS
// ========================================

loginTab.addEventListener(
    "click",
    function () {

        showScreen("login");

    }
);


signupTab.addEventListener(
    "click",
    function () {

        showScreen("signup");

    }
);


forgotLink.addEventListener(
    "click",
    function () {

        showScreen("forgot");

    }
);


backToLogin.addEventListener(
    "click",
    function () {

        showScreen("login");

    }
);


// ========================================
// 14. SHOW / HIDE PASSWORD
// ========================================

document.querySelectorAll(".eye-button").forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const input = document.getElementById(
                    button.dataset.target
                );

                const show = input.type === "password";

                input.type = show
                    ? "text"
                    : "password";

                button.setAttribute(
                    "aria-label",
                    show ? "Hide password" : "Show password"
                );

                button.textContent = show
                    ? "◎"
                    : "◉";

            }
        );

    }
);


// ========================================
// 15. LOGIN FORM
// ========================================

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (!loginForm.reportValidity()) {

            return;

        }

        showFeedback(
            "Form looks good. Connect a backend to verify the account."
        );

    }
);


// ========================================
// 16. SIGNUP FORM
// ========================================

signupForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (!signupForm.reportValidity()) {

            return;

        }

        const password = document.getElementById(
            "signupPassword"
        ).value;

        const confirm = document.getElementById(
            "confirmPassword"
        ).value;


        // Check password matching

        if (password !== confirm) {

            showFeedback(
                "Passwords do not match. Please try again.",
                true
            );

            return;

        }


        showFeedback(
            "Details accepted for this demo. Backend registration is not connected."
        );

        signupForm.reset();

    }
);


// ========================================
// 17. FORGOT PASSWORD FORM
// ========================================

forgotForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (!forgotForm.reportValidity()) {

            return;

        }

        showFeedback(
            "Password recovery needs a backend email service."
        );

    }
);


// ========================================
// 18. SOCIAL LOGIN BUTTONS
// ========================================

document.querySelectorAll(".social-button").forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                showFeedback(
                    "Social sign-in is a visual demo. OAuth is not connected.",
                    true
                );

            }
        );

    }
);
