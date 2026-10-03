/* =========================================================
   READYAIDRQ
   Interactive Emergency Preparedness Website
========================================================= */


/* =========================================================
   GLOBAL HELPERS
========================================================= */

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

function showToast(message){

    const toast = $("#toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenu = $("#mobileMenu");
const mainNav = $("#mainNav");

if(mobileMenu){

    mobileMenu.addEventListener("click", () => {

        mainNav.classList.toggle("open");

        mobileMenu.textContent =
            mainNav.classList.contains("open")
                ? "×"
                : "☰";

    });

}

$$("nav a").forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        if(mobileMenu){
            mobileMenu.textContent = "☰";
        }

    });

});


/* =========================================================
   DARK MODE
========================================================= */

const themeToggle = $("#themeToggle");

function updateThemeIcon(){

    if(!themeToggle) return;

    themeToggle.textContent =
        document.body.classList.contains("dark")
            ? "☀️"
            : "🌙";
}

const savedTheme =
    localStorage.getItem("readyaid-theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
}

updateThemeIcon();

if(themeToggle){

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "readyaid-theme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );

        updateThemeIcon();

    });

}


/* =========================================================
   FIRST AID GUIDE DATA
========================================================= */

const guides = {

    bleeding: {

        icon:"🩸",
        title:"Severe Bleeding",
        category:"INJURY",

        intro:
            "Severe bleeding can become life-threatening quickly. The priority is to get emergency help and control bleeding.",

        warning:
            "For severe or uncontrolled bleeding, contact local emergency services immediately.",

        steps:[

            [
                "Get help",
                "Contact local emergency services or ask someone nearby to call."
            ],

            [
                "Apply direct pressure",
                "Use clean cloth, gauze, or another suitable material and apply firm direct pressure."
            ],

            [
                "Keep pressure on",
                "Continue applying pressure and avoid repeatedly lifting the dressing to check the wound."
            ],

            [
                "Add more material if needed",
                "If blood soaks through, add additional material over the existing dressing rather than repeatedly removing it."
            ],

            [
                "Monitor the person",
                "Watch their breathing and responsiveness while waiting for professional help."
            ]

        ]

    },

    burns: {

        icon:"🔥",
        title:"Burns",
        category:"INJURY",

        intro:
            "Burn first aid depends on the severity and cause of the injury.",

        warning:
            "Large, deep, electrical, chemical, or facial burns require urgent professional medical assessment.",

        steps:[

            [
                "Move away from the source",
                "Make sure the person is away from the heat or other source of injury."
            ],

            [
                "Cool the burn",
                "For a minor thermal burn, cool the area with cool running water. Avoid ice directly on the skin."
            ],

            [
                "Protect the area",
                "Cover the injury loosely with a clean, non-stick covering if appropriate."
            ],

            [
                "Do not break blisters",
                "Avoid intentionally breaking blisters or applying household substances."
            ],

            [
                "Get medical help when needed",
                "Seek professional assessment for serious, extensive, deep, or concerning burns."
            ]

        ]

    },

    choking: {

        icon:"🫁",
        title:"Choking",
        category:"BREATHING",

        intro:
            "A person who cannot breathe, speak, or cough effectively may have a severe airway obstruction.",

        warning:
            "If the person becomes unresponsive, begin the appropriate emergency response and contact emergency services.",

        steps:[

            [
                "Recognize the problem",
                "If the person can cough forcefully, encourage them to continue coughing."
            ],

            [
                "Call for help",
                "For severe choking, have someone contact emergency services."
            ],

            [
                "Use appropriate choking first aid",
                "For a conscious adult or child with severe choking, use the current recommended choking response techniques."
            ],

            [
                "If they become unresponsive",
                "Lower the person safely and begin CPR according to current training and emergency guidance."
            ],

            [
                "Get professional assessment",
                "A person who experienced significant choking may need medical evaluation."
            ]

        ]

    },

    cpr: {

        icon:"❤️",
        title:"CPR Basics",
        category:"MEDICAL",

        intro:
            "CPR is used when a person is unresponsive and not breathing normally.",

        warning:
            "Call local emergency services immediately. Use an AED if one is available and follow its prompts.",

        steps:[

            [
                "Check responsiveness",
                "Check whether the person responds and assess whether they are breathing normally."
            ],

            [
                "Call emergency services",
                "Get emergency medical help immediately and ask someone to retrieve an AED if available."
            ],

            [
                "Start chest compressions",
                "If the person is not breathing normally, begin chest compressions according to your current CPR training."
            ],

            [
                "Use an AED",
                "If an automated external defibrillator is available, turn it on and follow its voice or visual instructions."
            ],

            [
                "Continue until help arrives",
                "Continue the emergency response until the person shows signs of life, trained responders take over, or you are unable to continue."
            ]

        ]

    },

    fracture: {

        icon:"🦴",
        title:"Suspected Fracture",
        category:"INJURY",

        intro:
            "A fracture may cause pain, swelling, deformity, bruising, or difficulty using the injured area.",

        warning:
            "Do not attempt to straighten a visibly deformed limb.",

        steps:[

            [
                "Keep the person still",
                "Encourage them not to move the injured area unnecessarily."
            ],

            [
                "Support the injury",
                "Support the injured area in the position found if this can be done safely."
            ],

            [
                "Control bleeding",
                "If there is an open wound, control bleeding while avoiding unnecessary movement."
            ],

            [
                "Watch for shock",
                "Monitor the person for changes in responsiveness, breathing, and general condition."
            ],

            [
                "Seek medical care",
                "Arrange professional medical assessment."
            ]

        ]

    },

    bites: {

        icon:"🐝",
        title:"Bites & Stings",
        category:"ENVIRONMENT",

        intro:
            "Animal bites, insect stings, and other bites can cause local injury or serious allergic reactions.",

        warning:
            "Difficulty breathing, swelling of the face or throat, collapse, or other severe symptoms require emergency help.",

        steps:[

            [
                "Move to safety",
                "Move away from the animal, insect, or other source when possible."
            ],

            [
                "Clean the area",
                "For appropriate minor wounds, gently clean the affected area."
            ],

            [
                "Monitor symptoms",
                "Watch for increasing swelling, spreading redness, severe pain, or allergic symptoms."
            ],

            [
                "Do not ignore severe reactions",
                "Seek emergency assistance if the person develops signs of a serious allergic reaction."
            ],

            [
                "Seek medical advice",
                "Animal bites and some other bites may require professional assessment."
            ]

        ]

    },

    fainting: {

        icon:"😵",
        title:"Fainting",
        category:"MEDICAL",

        intro:
            "Fainting is a temporary loss of consciousness caused by reduced blood flow to the brain.",

        warning:
            "Call emergency services for prolonged unconsciousness, serious injury, abnormal breathing, or other concerning symptoms.",

        steps:[

            [
                "Protect from injury",
                "Help prevent the person from falling or being struck by nearby objects."
            ],

            [
                "Check breathing",
                "Make sure they are breathing normally."
            ],

            [
                "Allow recovery",
                "If appropriate and safe, allow the person to lie down and recover."
            ],

            [
                "Monitor them",
                "Watch their responsiveness and breathing."
            ],

            [
                "Seek help if concerning",
                "Medical evaluation may be appropriate depending on the cause and circumstances."
            ]

        ]

    },

    sprain: {

        icon:"🦶",
        title:"Sprains",
        category:"INJURY",

        intro:
            "Sprains affect ligaments and commonly happen after twisting or overextending a joint.",

        warning:
            "Severe pain, major swelling, deformity, inability to use the limb, or numbness may require medical assessment.",

        steps:[

            [
                "Stop the activity",
                "Avoid continuing to use the injured joint."
            ],

            [
                "Protect the area",
                "Support the injured area and avoid movements that increase pain."
            ],

            [
                "Use appropriate cold therapy",
                "A wrapped cold pack may help with discomfort for short periods. Avoid direct contact with skin."
            ],

            [
                "Monitor symptoms",
                "Watch for worsening pain, swelling, color changes, or numbness."
            ],

            [
                "Seek assessment",
                "Get professional medical advice when symptoms are severe or persistent."
            ]

        ]

    },

    heat: {

        icon:"☀️",
        title:"Heat Illness",
        category:"ENVIRONMENT",

        intro:
            "Heat illness can range from heat exhaustion to life-threatening heatstroke.",

        warning:
            "Confusion, collapse, seizures, or severe overheating can indicate a medical emergency.",

        steps:[

            [
                "Move to a cooler place",
                "Get the person away from direct heat and into a cooler environment."
            ],

            [
                "Cool the person",
                "Use appropriate cooling methods and remove unnecessary outer clothing."
            ],

            [
                "Give fluids when appropriate",
                "If the person is alert and able to swallow, fluids may be appropriate."
            ],

            [
                "Watch for worsening symptoms",
                "Monitor responsiveness and condition closely."
            ],

            [
                "Get emergency help",
                "Seek urgent professional help for signs of severe heat illness."
            ]

        ]

    },

    cold: {

        icon:"❄️",
        title:"Cold Exposure",
        category:"ENVIRONMENT",

        intro:
            "Prolonged exposure to cold can cause dangerous drops in body temperature.",

        warning:
            "Confusion, severe drowsiness, loss of coordination, or unconsciousness require urgent medical attention.",

        steps:[

            [
                "Move to shelter",
                "Move the person away from wind, rain, or cold exposure."
            ],

            [
                "Remove wet clothing",
                "Replace wet clothing with dry layers when possible."
            ],

            [
                "Warm gradually",
                "Use appropriate gentle warming methods and avoid unsafe direct heat."
            ],

            [
                "Monitor the person",
                "Watch breathing, responsiveness, and overall condition."
            ],

            [
                "Seek professional care",
                "Severe cold exposure requires urgent medical assessment."
            ]

        ]

    },

    allergy: {

        icon:"⚠️",
        title:"Allergic Reaction",
        category:"MEDICAL",

        intro:
            "Some allergic reactions can rapidly become life-threatening.",

        warning:
            "Difficulty breathing, throat or tongue swelling, collapse, or severe symptoms require emergency medical help.",

        steps:[

            [
                "Recognize severe symptoms",
                "Look for breathing difficulty, swelling, widespread symptoms, or collapse."
            ],

            [
                "Call emergency services",
                "Seek emergency medical assistance for suspected anaphylaxis."
            ],

            [
                "Use prescribed emergency medication",
                "If the person has prescribed emergency medication such as an epinephrine auto-injector, help them use it according to their medical instructions."
            ],

            [
                "Monitor continuously",
                "Do not leave the person alone."
            ],

            [
                "Follow emergency instructions",
                "Continue following professional emergency guidance until help arrives."
            ]

        ]

    },

    head: {

        icon:"🧠",
        title:"Head Injury",
        category:"INJURY",

        intro:
            "Head injuries can sometimes cause serious internal injury even when there is little visible damage.",

        warning:
            "Loss of consciousness, repeated vomiting, seizure, worsening headache, confusion, weakness, or unusual behavior require urgent medical attention.",

        steps:[

            [
                "Stop the activity",
                "Prevent further injury and keep the person still if significant injury is suspected."
            ],

            [
                "Monitor responsiveness",
                "Watch for changes in alertness, speech, movement, or behavior."
            ],

            [
                "Avoid unnecessary movement",
                "Take care if a neck or spinal injury may also be present."
            ],

            [
                "Watch for warning signs",
                "Monitor for worsening symptoms."
            ],

            [
                "Seek medical assessment",
                "Significant head injuries should be assessed by healthcare professionals."
            ]

        ]

    }

};


/* =========================================================
   OPEN GUIDE
========================================================= */

function openGuide(id){

    const guide = guides[id];

    if(!guide) return;

    const modal = $("#guideModal");
    const content = $("#guideContent");

    let stepsHTML = "";

    guide.steps.forEach((step,index) => {

        stepsHTML += `
            <div class="guide-step">

                <span class="step-number">
                    ${index + 1}
                </span>

                <div>
                    <strong>${step[0]}</strong>
                    <p>${step[1]}</p>
                </div>

            </div>
        `;

    });

    content.innerHTML = `

        <div class="modal-guide-header">

            <div class="modal-guide-icon">
                ${guide.icon}
            </div>

            <div>

                <div class="eyebrow">
                    ${guide.category}
                </div>

                <h2>${guide.title}</h2>

            </div>

        </div>

        <p>
            ${guide.intro}
        </p>

        <div class="guide-warning">
            <strong>Important:</strong>
            ${guide.warning}
        </div>

        <div class="guide-steps">
            ${stepsHTML}
        </div>

        <div class="guide-warning" style="margin-top:20px;">
            This information is educational and does not replace
            professional medical advice or emergency services.
        </div>

    `;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");

    document.body.classList.add("modal-open");

}


/* =========================================================
   CLOSE GUIDE
========================================================= */

function closeGuide(){

    const modal = $("#guideModal");

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden","true");

    document.body.classList.remove("modal-open");

}


/* =========================================================
   EMERGENCY MODE
========================================================= */

function openEmergency(){

    $("#emergencyModal").classList.add("show");

    document.body.classList.add("modal-open");

}

function closeEmergency(){

    $("#emergencyModal").classList.remove("show");

    document.body.classList.remove("modal-open");

}


/* =========================================================
   DISASTER DATA
========================================================= */

const disasters = {

    earthquake: {

        icon:"🌎",
        title:"Earthquake",

        before:[
            "Secure heavy furniture where possible.",
            "Prepare an emergency kit.",
            "Identify safer areas inside your building.",
            "Know how your household will communicate."
        ],

        during:[
            "Drop, Cover, and Hold On.",
            "Stay away from windows and objects that may fall.",
            "Do not use elevators during an earthquake.",
            "If outside, move away from buildings, trees, and utility lines."
        ],

        after:[
            "Check yourself and others for injuries.",
            "Watch for hazards such as broken glass or damaged structures.",
            "Follow official emergency instructions.",
            "Be prepared for aftershocks."
        ]

    },

    flood: {

        icon:"🌊",
        title:"Flood",

        before:[
            "Know whether your area is flood-prone.",
            "Prepare emergency supplies.",
            "Keep important documents protected.",
            "Know evacuation routes."
        ],

        during:[
            "Move to higher ground when advised.",
            "Avoid walking or driving through floodwater.",
            "Follow official evacuation instructions.",
            "Stay away from electrical hazards."
        ],

        after:[
            "Return only when authorities say it is safe.",
            "Avoid contaminated water.",
            "Watch for damaged roads and structures.",
            "Document damage when safe to do so."
        ]

    },

    typhoon: {

        icon:"🌀",
        title:"Typhoon",

        before:[
            "Monitor official weather warnings.",
            "Secure loose outdoor objects.",
            "Prepare food, water, lighting, and communication supplies.",
            "Charge essential devices."
        ],

        during:[
            "Stay indoors in a secure location.",
            "Stay away from windows.",
            "Follow evacuation orders.",
            "Do not assume conditions are safe during a temporary lull."
        ],

        after:[
            "Continue monitoring official updates.",
            "Avoid downed power lines.",
            "Avoid flooded roads.",
            "Check on vulnerable family members when safe."
        ]

    },

    fire: {

        icon:"🔥",
        title:"Fire",

        before:[
            "Install and maintain smoke alarms where appropriate.",
            "Know at least two ways out of important areas.",
            "Practice an evacuation plan.",
            "Keep exits clear."
        ],

        during:[
            "Alert others and activate the alarm.",
            "Leave the building using the safest available exit.",
            "Stay low if smoke is present.",
            "Never re-enter a burning building."
        ],

        after:[
            "Stay outside until authorities say it is safe.",
            "Do not re-enter damaged structures.",
            "Seek medical help for smoke inhalation or injuries.",
            "Follow instructions from emergency responders."
        ]

    }

};


/* =========================================================
   OPEN DISASTER
========================================================= */

function openDisaster(id){

    const disaster = disasters[id];

    if(!disaster) return;

    const content = $("#disasterContent");

    const createList = items => {

        return items
            .map(item => `<li>${item}</li>`)
            .join("");

    };

    content.innerHTML = `

        <div class="modal-guide-header">

            <div class="modal-guide-icon">
                ${disaster.icon}
            </div>

            <div>

                <div class="eyebrow">
                    DISASTER PREPAREDNESS
                </div>

                <h2>${disaster.title}</h2>

            </div>

        </div>

        <div class="guide-warning">
            Follow instructions from local authorities
            and emergency responders.
        </div>

        <h3 style="margin-top:25px;">
            Before
        </h3>

        <ul style="margin-top:10px;padding-left:20px;color:var(--muted);">
            ${createList(disaster.before)}
        </ul>

        <h3 style="margin-top:25px;">
            During
        </h3>

        <ul style="margin-top:10px;padding-left:20px;color:var(--muted);">
            ${createList(disaster.during)}
        </ul>

        <h3 style="margin-top:25px;">
            After
        </h3>

        <ul style="margin-top:10px;padding-left:20px;color:var(--muted);">
            ${createList(disaster.after)}
        </ul>

    `;

    $("#disasterModal").classList.add("show");

    document.body.classList.add("modal-open");

}


function closeDisaster(){

    $("#disasterModal").classList.remove("show");

    document.body.classList.remove("modal-open");

}


/* =========================================================
   SEARCH
========================================================= */

const searchInput = $("#guideSearch");
const guideCards = [...$$(".guide")];
const guideCount = $("#guideCount");

function filterGuides(){

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    const active =
        $(".filter-buttons button.active");

    const filter =
        active
            ? active.dataset.filter
            : "all";

    let visible = 0;

    guideCards.forEach(card => {

        const text =
            card.dataset.search.toLowerCase();

        const category =
            card.dataset.category;

        const matchesSearch =
            !search ||
            text.includes(search);

        const matchesCategory =
            filter === "all" ||
            category === filter;

        const show =
            matchesSearch &&
            matchesCategory;

        card.classList.toggle(
            "hidden",
            !show
        );

        if(show) visible++;

    });

    guideCount.textContent = visible;

    $("#noResults").style.display =
        visible === 0
            ? "block"
            : "none";

}

if(searchInput){

    searchInput.addEventListener(
        "input",
        filterGuides
    );

}

$$(".filter-buttons button").forEach(button => {

    button.addEventListener("click", () => {

        $$(".filter-buttons button")
            .forEach(btn =>
                btn.classList.remove("active")
            );

        button.classList.add("active");

        filterGuides();

    });

});


/* =========================================================
   EMERGENCY CHECKLIST
========================================================= */

const kitItems =
    [...$$("[data-kit]")];

function updateChecklist(){

    const completed =
        kitItems.filter(item => item.checked).length;

    const total =
        kitItems.length;

    const percent =
        total
            ? Math.round(
                completed / total * 100
            )
            : 0;

    localStorage.setItem(
        "readyaid-kit",
        JSON.stringify(
            kitItems.map(item => item.checked)
        )
    );

    $("#kitPercent").textContent =
        `${percent}%`;

    $("#kitProgressText").textContent =
        `${completed} of ${total} items`;

    $("#kitProgressBar").style.width =
        `${percent}%`;

    $("#kitScore").textContent =
        `${percent}%`;

    updateReadiness();

}

function loadChecklist(){

    try{

        const saved =
            JSON.parse(
                localStorage.getItem("readyaid-kit")
            );

        if(Array.isArray(saved)){

            kitItems.forEach(
                (item,index) => {
                    item.checked =
                        Boolean(saved[index]);
                }
            );

        }

    }catch(error){

        console.log(
            "Checklist could not be loaded."
        );

    }

    updateChecklist();

}

kitItems.forEach(item => {

    item.addEventListener(
        "change",
        updateChecklist
    );

});

function resetChecklist(){

    kitItems.forEach(
        item => item.checked = false
    );

    updateChecklist();

    showToast(
        "Emergency checklist reset."
    );

}

loadChecklist();


/* =========================================================
   EMERGENCY PLAN
========================================================= */

const planForm = $("#planForm");

function loadPlan(){

    $("#planName").value =
        localStorage.getItem(
            "readyaid-plan-name"
        ) || "";

    $("#planContact").value =
        localStorage.getItem(
            "readyaid-plan-contact"
        ) || "";

    $("#planMeeting").value =
        localStorage.getItem(
            "readyaid-plan-meeting"
        ) || "";

    $("#planNotes").value =
        localStorage.getItem(
            "readyaid-plan-notes"
        ) || "";

    updateReadiness();

}

if(planForm){

    planForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            localStorage.setItem(
                "readyaid-plan-name",
                $("#planName").value
            );

            localStorage.setItem(
                "readyaid-plan-contact",
                $("#planContact").value
            );

            localStorage.setItem(
                "readyaid-plan-meeting",
                $("#planMeeting").value
            );

            localStorage.setItem(
                "readyaid-plan-notes",
                $("#planNotes").value
            );

            updateReadiness();

            showToast(
                "Emergency plan saved."
            );

        }
    );

}

loadPlan();


/* =========================================================
   READINESS SCORE
========================================================= */

function updateReadiness(){

    const completed =
        kitItems.filter(
            item => item.checked
        ).length;

    const kitPercent =
        kitItems.length
            ? Math.round(
                completed /
                kitItems.length *
                100
            )
            : 0;

    const quizScore =
        Number(
            localStorage.getItem(
                "readyaid-quiz-score"
            ) || 0
        );

    const planFields = [

        $("#planName")?.value,
        $("#planContact")?.value,
        $("#planMeeting")?.value

    ];

    const planComplete =
        planFields.filter(Boolean).length;

    const planPercent =
        Math.round(
            planComplete / 3 * 100
        );

    const learningPercent =
        Math.min(
            100,
            quizScore * 20
        );

    const score =
        Math.round(
            (
                kitPercent +
                learningPercent +
                planPercent
            ) / 3
        );

    $("#dashboardScore").textContent =
        score;

    $("#heroScore").textContent =
        `${score}%`;

    $("#scoreBar").style.width =
        `${score}%`;

    $("#learningScore").textContent =
        `${learningPercent}%`;

    $("#planScore").textContent =
        `${planPercent}%`;

}

updateReadiness();


/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

    {
        question:
            "What should you do first when faced with a serious emergency?",

        answers:[
            "Ignore the situation",
            "Assess safety and get emergency help",
            "Give the person food",
            "Move everyone randomly"
        ],

        correct:1,

        explanation:
            "Make sure the area is safe, assess the situation, and get appropriate emergency assistance."
    },

    {
        question:
            "What is an important action for severe bleeding?",

        answers:[
            "Apply appropriate direct pressure",
            "Wash it with gasoline",
            "Ignore it",
            "Remove every dressing repeatedly"
        ],

        correct:0,

        explanation:
            "Appropriate direct pressure is an important first-aid response for serious bleeding."
    },

    {
        question:
            "What should you do during an earthquake?",

        answers:[
            "Run toward windows",
            "Use an elevator",
            "Drop, Cover, and Hold On",
            "Stand under a tree"
        ],

        correct:2,

        explanation:
            "Drop, Cover, and Hold On is a widely recommended earthquake safety action."
    },

    {
        question:
            "What should you do if an AED is available during a suspected cardiac arrest?",

        answers:[
            "Ignore it",
            "Turn it on and follow its prompts",
            "Hide it",
            "Give it to someone to take home"
        ],

        correct:1,

        explanation:
            "Turn the AED on and follow its voice or visual instructions."
    },

    {
        question:
            "What is one reason to maintain an emergency kit?",

        answers:[
            "It makes emergencies impossible",
            "It can provide useful supplies during disruptions",
            "It guarantees safety",
            "It replaces emergency responders"
        ],

        correct:1,

        explanation:
            "An emergency kit can provide useful supplies when normal services are disrupted."
    }

];

let currentQuestion = 0;
let quizScore = 0;
let quizAnswered = false;

function loadQuestion(){

    const question =
        quizQuestions[currentQuestion];

    quizAnswered = false;

    $("#questionNumber").textContent =
        currentQuestion + 1;

    $("#questionTotal").textContent =
        quizQuestions.length;

    $("#questionText").textContent =
        question.question;

    $("#quizFeedback").textContent = "";

    $("#quizNext").disabled = true;

    $("#quizNext").textContent =
        currentQuestion ===
        quizQuestions.length - 1
            ? "See my result →"
            : "Next question →";

    $("#quizBar").style.width =
        `${(
            currentQuestion /
            quizQuestions.length
        ) * 100}%`;

    const answers =
        $("#answers");

    answers.innerHTML = "";

    question.answers.forEach(
        (answer,index) => {

            const button =
                document.createElement("button");

            button.className = "answer";

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                () => selectAnswer(
                    index,
                    button
                )
            );

            answers.appendChild(button);

        }
    );

}

function selectAnswer(
    selected,
    selectedButton
){

    if(quizAnswered) return;

    quizAnswered = true;

    const question =
        quizQuestions[currentQuestion];

    const buttons =
        [...$$(".answer")];

    buttons.forEach(
        (button,index) => {

            button.disabled = true;

            if(index === question.correct){

                button.classList.add(
                    "correct"
                );

            }

        }
    );

    if(
        selected ===
        question.correct
    ){

        quizScore++;

        selectedButton.classList.add(
            "correct"
        );

        $("#quizFeedback").textContent =
            `✓ Correct! ${question.explanation}`;

    }else{

        selectedButton.classList.add(
            "wrong"
        );

        $("#quizFeedback").textContent =
            `Not quite. ${question.explanation}`;

    }

    $("#quizNext").disabled = false;

}

function nextQuestion(){

    if(!quizAnswered) return;

    currentQuestion++;

    if(
        currentQuestion >=
        quizQuestions.length
    ){

        showQuizResult();

        return;
    }

    loadQuestion();

}

function showQuizResult(){

    const percentage =
        Math.round(
            quizScore /
            quizQuestions.length *
            100
        );

    localStorage.setItem(
        "readyaid-quiz-score",
        quizScore
    );

    updateReadiness();

    $("#quizContainer").innerHTML = `

        <div class="quiz-result">

            <div class="question-icon">
                🏆
            </div>

            <h2>
                Ready Check Complete
            </h2>

            <div class="quiz-result-score">
                ${percentage}%
            </div>

            <p>
                You answered
                <strong>
                    ${quizScore}
                </strong>
                out of
                <strong>
                    ${quizQuestions.length}
                </strong>
                questions correctly.
            </p>

            <button
                class="btn btn-primary"
                onclick="restartQuiz()"
                style="margin-top:20px;"
            >
                Try again
            </button>

        </div>

    `;

}

function restartQuiz(){

    currentQuestion = 0;
    quizScore = 0;

    $("#quizContainer").innerHTML = `

        <div class="quiz-progress">

            <div>
                Question
                <strong id="questionNumber">1</strong>
                of
                <strong id="questionTotal">
                    ${quizQuestions.length}
                </strong>
            </div>

            <div class="quiz-bar">
                <span id="quizBar"></span>
            </div>

        </div>

        <div class="quiz-question">

            <span class="question-icon">
                🧠
            </span>

            <h3 id="questionText"></h3>

            <div
                class="answers"
                id="answers"
            ></div>

            <div
                class="quiz-feedback"
                id="quizFeedback"
            ></div>

            <button
                class="btn btn-primary quiz-next"
                id="quizNext"
                onclick="nextQuestion()"
                disabled
            >
                Next question →
            </button>

        </div>

    `;

    loadQuestion();

}

loadQuestion();


/* =========================================================
   CPR METRONOME
========================================================= */

let cprRunning = false;
let cprInterval = null;

const bpmRange = $("#bpmRange");

if(bpmRange){

    bpmRange.addEventListener(
        "input",
        () => {

            $("#cprBpm").textContent =
                bpmRange.value;

            if(cprRunning){

                restartCPRInterval();

            }

        }
    );

}

function toggleCPR(){

    cprRunning =
        !cprRunning;

    const button =
        $("#cprButton");

    if(cprRunning){

        button.textContent =
            "■ Stop Metronome";

        startCPRInterval();

    }else{

        button.textContent =
            "▶ Start Metronome";

        clearInterval(
            cprInterval
        );

    }

}

function startCPRInterval(){

    clearInterval(
        cprInterval
    );

    const bpm =
        Number(
            bpmRange.value
        );

    const interval =
        60000 / bpm;

    cprInterval =
        setInterval(
            () => {

                const circle =
                    $("#cprCircle");

                circle.classList.add(
                    "beat"
                );

                setTimeout(
                    () => {
                        circle.classList.remove(
                            "beat"
                        );
                    },
                    100
                );

            },
            interval
        );

}

function restartCPRInterval(){

    if(cprRunning){

        startCPRInterval();

    }

}


/* =========================================================
   FAQ
========================================================= */

$$(".faq-item button").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const item =
                button.parentElement;

            const wasOpen =
                item.classList.contains(
                    "open"
                );

            $$(".faq-item").forEach(
                faq =>
                    faq.classList.remove(
                        "open"
                    )
            );

            if(!wasOpen){

                item.classList.add(
                    "open"
                );

            }

        }
    );

});


/* =========================================================
   SHARE
========================================================= */

async function shareSite(){

    const shareData = {

        title:"ReadyAidRQ",

        text:
            "Check out ReadyAidRQ — an emergency preparedness and first-aid learning platform.",

        url:
            window.location.href

    };

    if(
        navigator.share
    ){

        try{

            await navigator.share(
                shareData
            );

        }catch(error){

            console.log(
                "Share cancelled."
            );

        }

    }else{

        try{

            await navigator.clipboard.writeText(
                window.location.href
            );

            showToast(
                "Website link copied!"
            );

        }catch(error){

            showToast(
                "Copy failed. Please copy the URL manually."
            );

        }

    }

}


/* =========================================================
   ESCAPE KEY FOR MODALS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if(event.key !== "Escape")
            return;

        closeGuide();
        closeDisaster();
        closeEmergency();

    }
);


/* =========================================================
   CLOSE MODAL WHEN CLICKING BACKGROUND
========================================================= */

$$(".modal").forEach(modal => {

    modal.addEventListener(
        "click",
        event => {

            if(
                event.target === modal
            ){

                modal.classList.remove(
                    "show"
                );

                document.body.classList.remove(
                    "modal-open"
                );

            }

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if(
                        entry.isIntersecting
                    ){

                        entry.target.classList.add(
                            "revealed"
                        );

                    }

                }
            );

        },
        {
            threshold:.08
        }
    );

$$(
    ".feature-card, .guide, .disaster-card, .checklist-category"
).forEach(
    element => {

        element.style.opacity = "0";
        element.style.transform =
            "translateY(15px)";

        element.style.transition =
            "opacity .5s ease, transform .5s ease";

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   REVEAL STYLE
========================================================= */

const revealStyle =
    document.createElement("style");

revealStyle.textContent = `

    .revealed{
        opacity:1 !important;
        transform:translateY(0) !important;
    }

`;

document.head.appendChild(
    revealStyle
);


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.createElement("button");

backTop.innerHTML = "↑";

backTop.setAttribute(
    "aria-label",
    "Back to top"
);

backTop.style.cssText = `

    position:fixed;
    right:20px;
    bottom:20px;
    z-index:200;

    width:44px;
    height:44px;

    border:0;
    border-radius:50%;

    background:#e63946;
    color:#fff;

    font-size:20px;
    font-weight:900;

    box-shadow:0 10px 30px rgba(0,0,0,.2);

    opacity:0;
    pointer-events:none;

    transition:.25s;

`;

document.body.appendChild(
    backTop
);

window.addEventListener(
    "scroll",
    () => {

        if(window.scrollY > 600){

            backTop.style.opacity = "1";
            backTop.style.pointerEvents =
                "auto";

        }else{

            backTop.style.opacity = "0";
            backTop.style.pointerEvents =
                "none";

        }

    }
);

backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }
);


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if(
            event.key === "/" &&
            document.activeElement.tagName !== "INPUT" &&
            document.activeElement.tagName !== "TEXTAREA"
        ){

            event.preventDefault();

            if(searchInput){

                searchInput.focus();

            }

        }

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

filterGuides();
updateChecklist();
updateReadiness();

console.log(
    "ReadyAidRQ loaded successfully."
);