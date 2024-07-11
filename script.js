// DOM Elements
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');
const authContainer = document.getElementById('auth-container');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authMessage = document.getElementById('auth-message');
const authClose = document.getElementById('auth-close');
const quizContainer = document.getElementById('quiz-container');
const sectionTitle = document.getElementById('section-title');
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const landingPage = document.getElementById('landing-page');
const adminDashboard = document.getElementById('admin-dashboard');


// Quiz data and functionality
const quizData = [
    {
        title: "1. Sales and Marketing Skills",
        questions: [
            { question: "Sales Planning: Developing strategies to reach sales targets.", type: "rating" },
            { question: "Pricing: Understanding how to set prices that maximize profits while remaining competitive.", type: "rating" },
            { question: "Negotiating: Securing favorable terms and conditions in deals.", type: "rating" },
            { question: "Customer Service Follow-Up: Maintaining relationships with customers post-sale to ensure satisfaction and repeat business.", type: "rating" },
            { question: "Managing Other Sales Reps: Leading and motivating a sales team to achieve targets.", type: "rating" },
            { question: "Tracking Competitors: Staying informed about competitor activities to strategize accordingly.", type: "rating" },
            { question: "Buying: Knowing how to procure goods and services at the best price and quality.", type: "rating" },
            { question: "Marketing Strategies: Developing comprehensive plans to reach potential customers.", type: "rating" },
            { question: "Advertising/Promotion/Public Relations: Creating awareness and interest in the product/service.", type: "rating" },
            { question: "Advertising Copywriting: Crafting compelling messages to attract customers.", type: "rating" },
            { question: "Annual Marketing Plans: Setting long-term marketing goals and strategies.", type: "rating" },
            { question: "Media Planning and Buying: Allocating budget across various media channels effectively.", type: "rating" },
            { question: "Distribution Channel Planning: Determining the best ways to get products to customers.", type: "rating" },
            { question: "Packaging: Designing product packaging that attracts and informs customers.", type: "rating" }
        ]
    },
    {
        title: "2. Financial Skills",
        questions: [
            { question: "Cash Flow Planning: Managing the inflow and outflow of money to ensure liquidity.", type: "rating" },
            { question: "Management of Credit Lines: Efficiently managing credit to support business operations.", type: "rating" },
            { question: "Monthly Financial: Regular financial review and reporting.", type: "rating" },
            { question: "Bank Relationships: Building and maintaining strong relationships with banks.", type: "rating" },
            { question: "Bookkeeping: Recording all financial transactions accurately.", type: "rating" },
            { question: "Billing, Payables, Receivables: Managing the company's cash flow related to billing and payments.", type: "rating" },
            { question: "Monthly Profit and Loss Statements/Balance Sheets: Preparing financial statements to track business performance.", type: "rating" },
            { question: "Quarterly/Annual Tax Preparation: Ensuring compliance with tax laws and regulations.", type: "rating" }
        ]
    },
    {
        title: "3. Intangible Skills",
        questions: [
            { question: "Innovative Thinking: Creativity and innovation in business practices.", type: "rating" },
            { question: "Problem-Solving: Identifying and solving problems effectively.", type: "rating" },
            { question: "Leadership: Inspiring and guiding others.", type: "rating" },
            { question: "Adaptability: Flexibility to change and new situations.", type: "rating" },
            { question: "Customer Focus: Prioritizing customer satisfaction and needs.", type: "rating" },
            { question: "Strategic Thinking: Long-term planning and vision.", type: "rating" },
            { question: "Resilience: Overcoming challenges and bouncing back from difficulties.", type: "rating" },
            { question: "Risk Management: Identifying, assessing, and mitigating risks.", type: "rating" }
        ]
    },
    {
        title: "4. Personal Skills",
        questions: [
            { question: "Ability to Work Long and Hard: Dedication and perseverance.", type: "rating" },
            { question: "Ability to Manage Risk and Stress: Handling uncertainty and pressure well.", type: "rating" },
            { question: "Ability to Deal with Failure: Resilience in the face of setbacks.", type: "rating" },
            { question: "Ability to Work Alone: Independence and self-motivation.", type: "rating" },
            { question: "Family Support: Having a supportive personal life.", type: "rating" }
        ]
    },
    {
        title: "5. Communication and Collaboration Skills",
        questions: [
            { question: "Stakeholder Communication: Keeping all parties informed and aligned.", type: "rating" },
            { question: "Oral Presentation Skills: Effectively presenting ideas verbally.", type: "rating" },
            { question: "Written Communication Skills: Clear and concise written communication.", type: "rating" },
            { question: "Ability to Work with and Manage Others: Effective teamwork and leadership.", type: "rating" },
            { question: "Organizational Skills: Keeping tasks and teams organized.", type: "rating" },
            { question: "Computer Skills: Proficiency with digital tools for collaboration.", type: "rating" }
        ]
    },
    {
        title: "6. Design Thinking Skills",
        questions: [
            { question: "Understanding Customer Needs: Deep understanding of customer pain points and desires.", type: "rating" },
            { question: "User Research: Gathering qualitative and quantitative data about users.", type: "rating" },
            { question: "Interviewing Skills: Conducting effective interviews to gather insights.", type: "rating" },
            { question: "Observation Skills: Analyzing user behavior in their natural environment.", type: "rating" },
            { question: "Creative Problem-Solving: Developing innovative solutions.", type: "rating" },
            { question: "Brainstorming Techniques: Generating creative ideas collaboratively.", type: "rating" },
            { question: "Concept Development: Refining and selecting the best ideas.", type: "rating" },
            { question: "Rapid Prototyping: Quickly creating models to test ideas.", type: "rating" },
            { question: "Mock-Up Creation: Developing visual representations of products.", type: "rating" },
            { question: "Feedback Incorporation: Iterating based on user and stakeholder feedback.", type: "rating" },
            { question: "User Testing: Evaluating products with real users.", type: "rating" },
            { question: "Usability Testing: Ensuring products are easy to use.", type: "rating" },
            { question: "Iterative Testing and Refinement: Continuously improving products based on feedback.", type: "rating" }
        ]
    },
    {
        title: "7. Administrative and Operational Skills",
        questions: [
            { question: "Motivating Employees: Encouraging and inspiring employees to perform their best.", type: "rating" },
            { question: "Hiring Employees: Recruiting the right talent.", type: "rating" },
            { question: "Firing Employees: Handling terminations professionally and legally.", type: "rating" },
            { question: "General Management Skills: Overall management and leadership capabilities.", type: "rating" },
            { question: "Scheduling: Efficiently planning and organizing tasks and meetings.", type: "rating" },
            { question: "Payroll Handling: Managing employee compensation.", type: "rating" },
            { question: "Benefits Administration: Overseeing employee benefits programs.", type: "rating" }
        ]
    }
];


// Variables
let currentUser = null;
let currentSection = 0;
let currentQuestion = 0;

// Event Listeners
loginBtn.addEventListener('click', () => showAuthForm('Login'));
signupBtn.addEventListener('click', () => showAuthForm('Sign Up'));
logoutBtn.addEventListener('click', logout);
startQuizBtn.addEventListener('click', startQuiz);
authForm.addEventListener('submit', handleAuth);
authClose.addEventListener('click', closeAuthModal);
prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);

// Functions
function showAuthForm(type) {
    authTitle.textContent = type;
    authContainer.style.display = 'block';
    landingPage.style.display = 'none';
}

function closeAuthModal() {
    authContainer.style.display = 'none';
    authMessage.textContent = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    landingPage.style.display = 'block';
}

function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username.length < 3 || password.length < 6) {
        authMessage.textContent = "Username must be at least 3 characters and password at least 6 characters.";
        return false;
    }
    return true;
}

function handleAuth(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const action = authTitle.textContent === 'Sign Up' ? 'register' : 'login';

    $.ajax({
        url: 'auth.php',
        method: 'POST',
        data: { action, username, password },
        dataType: 'json',
        beforeSend: showLoading,
        complete: hideLoading,
        success: function(response) {
            if (response.success) {
                if (action === 'login' && response.is_admin) {
                    loginAsAdmin();
                } else {
                    login(username);
                }
            } else {
                authMessage.textContent = response.message;
            }
        },
        error: handleAjaxError
    });
}

function login(username) {
    currentUser = username;
    userName.textContent = username;
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    closeAuthModal();
    loadQuizProgress();
}

function loginAsAdmin() {
    currentUser = 'admin';
    userName.textContent = 'Admin';
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    closeAuthModal();
    showAdminDashboard();
}

function logout() {
    $.ajax({
        url: 'auth.php',
        method: 'POST',
        data: { action: 'logout' },
        dataType: 'json',
        beforeSend: showLoading,
        complete: hideLoading,
        success: function(response) {
            if (response.success) {
                currentUser = null;
                userName.textContent = '';
                loginBtn.style.display = 'inline-block';
                signupBtn.style.display = 'inline-block';
                logoutBtn.style.display = 'none';
                quizContainer.style.display = 'none';
                adminDashboard.style.display = 'none';
                landingPage.style.display = 'block';
            }
        },
        error: handleAjaxError
    });
}

function startQuiz() {
    if (currentUser) {
        landingPage.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion();
    } else {
        authMessage.textContent = 'Please login or sign up to start the quiz.';
        showAuthForm('Login');
    }
}

function loadQuizProgress() {
    $.ajax({
        url: 'quiz.php',
        method: 'POST',
        data: { action: 'get_progress' },
        dataType: 'json',
        beforeSend: showLoading,
        complete: hideLoading,
        success: function(response) {
            if (response.success) {
                // Implement logic to resume quiz from last answered question
                updateProgressBar(response.progress);
            }
        },
        error: handleAjaxError
    });
}

function loadQuestion() {
    const section = quizData[currentSection];
    const questionData = section.questions[currentQuestion];
    
    sectionTitle.textContent = section.title;
    
    let questionHTML = `
        <h3>${questionData.question}</h3>
        <div class="rating">
            ${[1, 2, 3, 4, 5].map(num => `
                <label>
                    <input type="radio" name="rating" value="${num}">
                    <span>${num}</span>
                </label>
            `).join('')}
        </div>
    `;
    
    questionContainer.innerHTML = questionHTML;
    updateProgressBar();
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
    } else if (currentSection > 0) {
        currentSection--;
        currentQuestion = quizData[currentSection].questions.length - 1;
    }
    loadQuestion();
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestion < quizData[currentSection].questions.length - 1) {
        currentQuestion++;
    } else if (currentSection < quizData.length - 1) {
        currentSection++;
        currentQuestion = 0;
    } else {
        showResults();
        return;
    }
    loadQuestion();
}

function saveAnswer() {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
        $.ajax({
            url: 'quiz.php',
            method: 'POST',
            data: {
                action: 'save_answer',
                section: currentSection,
                question: currentQuestion,
                answer: selectedRating.value
            },
            dataType: 'json',
            beforeSend: showLoading,
            complete: hideLoading,
            success: function(response) {
                if (response.success) {
                    updateProgressBar();
                }
            },
            error: handleAjaxError
        });
    }
}

function updateProgressBar(progress) {
    const totalQuestions = quizData.reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = progress ? progress.length : currentSection * quizData[0].questions.length + currentQuestion + 1;
    const percentage = (answeredQuestions / totalQuestions) * 100;
    document.querySelector('.progress').style.width = `${percentage}%`;
}

function showResults() {
    let totalScore = 0;
    let totalQuestions = 0;
    let sectionScores = {};
    
    quizData.forEach((section, sectionIndex) => {
        sectionScores[sectionIndex] = 0;
        section.questions.forEach((question, questionIndex) => {
            $.ajax({
                url: 'quiz.php',
                method: 'POST',
                data: {
                    action: 'get_answer',
                    section: sectionIndex,
                    question: questionIndex
                },
                dataType: 'json',
                async: false,
                beforeSend: showLoading,
                complete: hideLoading,
                success: function(response) {
                    if (response.success && response.answer) {
                        totalScore += parseInt(response.answer);
                        sectionScores[sectionIndex] += parseInt(response.answer);
                        totalQuestions++;
                    }
                },
                error: handleAjaxError
            });
        });
    });
    
    const averageScore = totalScore / totalQuestions;
    
    $.ajax({
        url: 'quiz.php',
        method: 'POST',
        data: {
            action: 'update_status',
            completed: true,
            score: averageScore
        },
        dataType: 'json',
        beforeSend: showLoading,
        complete: hideLoading,
        success: function(response) {
            if (response.success) {
                let resultsHTML = `<h2>Quiz Completed</h2>
                                   <p>Your overall average score: ${averageScore.toFixed(2)}</p>
                                   <h3>Section Scores:</h3>`;
                
                for (let i = 0; i < quizData.length; i++) {
                    const sectionAverage = sectionScores[i] / quizData[i].questions.length;
                    resultsHTML += `<p>${quizData[i].title}: ${sectionAverage.toFixed(2)}</p>`;
                }
                
                resultsHTML += `<button onclick="location.reload()">Back to Home</button>`;
                quizContainer.innerHTML = resultsHTML;
            }
        },
        error: handleAjaxError
    });
}

function showAdminDashboard() {
    hideAllSections();
    adminDashboard.style.display = 'block';
    updateAdminDashboard();
}

function updateAdminDashboard() {
    $.ajax({
        url: 'admin.php',
        method: 'GET',
        data: { action: 'get_stats' },
        dataType: 'json',
        beforeSend: showLoading,
        complete: hideLoading,
        success: function(response) {
            if (response.success) {
                document.getElementById('total-users').textContent = response.stats.total_users;
                document.getElementById('completed-users').textContent = response.stats.completed_users;
                document.getElementById('incomplete-users').textContent = response.stats.incomplete_users;
            }
        },
        error: handleAjaxError
    });

    $.ajax({
        url: 'admin.php',
        method: 'GET',
        data: { action: 'get_user_list' },
        dataType: 'json',
        beforeSend: showLoading,
        complete: hideLoading,
        success: function(response) {
            if (response.success) {
                const userTableBody = document.querySelector('#user-table tbody');
                userTableBody.innerHTML = '';

                response.users.forEach(user => {
                    const row = document.createElement('tr');
                    const nameCell = document.createElement('td');
                    const statusCell = document.createElement('td');
                    const scoreCell = document.createElement('td');

                    nameCell.textContent = user.username;
                    statusCell.textContent = user.status;
                    scoreCell.textContent = user.score !== null ? user.score : 'N/A';

                    row.appendChild(nameCell);
                    row.appendChild(statusCell);
                    row.appendChild(scoreCell);
                    userTableBody.appendChild(row);
                });
            }
        },
        error: handleAjaxError
    });
}

function hideAllSections() {
    landingPage.style.display = 'none';
    authContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    adminDashboard.style.display = 'none';
}

function showLoading() {
    // Show a loading spinner or message
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    // Hide the loading spinner or message
    document.body.style.cursor = 'default';
}

function handleAjaxError(jqXHR, textStatus, errorThrown) {
    console.error("AJAX error: " + textStatus + ' : ' + errorThrown);
    alert("An error occurred. Please try again.");
}

function checkSession() {
    $.ajax({
        url: 'auth.php',
        method: 'POST',
        data: { action: 'check_session' },
        dataType: 'json',
        success: function(response) {
            if (response.logged_in) {
                login(response.username);
                if (response.is_admin) {
                    loginAsAdmin();
                }
            }
        },
        error: handleAjaxError
    });
}

// Initial setup
quizContainer.style.display = 'none';
authContainer.style.display = 'none';
adminDashboard.style.display = 'none';

// Check session when the page loads
window.addEventListener('load', checkSession);
