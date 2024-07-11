// User authentication
let currentUser = null;
const users = JSON.parse(localStorage.getItem('users')) || {};

// Admin credentials (in a real application, this should be handled securely on the server)
const ADMIN_PASSWORD = 'admin1234'; // Replace with a secure password
 
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
const landingPage = document.getElementById('landing-page');
const adminDashboard = document.getElementById('admin-dashboard');

// Event Listeners
loginBtn.addEventListener('click', () => showAuthForm('Login'));
signupBtn.addEventListener('click', () => showAuthForm('Sign Up'));
logoutBtn.addEventListener('click', logout);
startQuizBtn.addEventListener('click', startQuiz);
authForm.addEventListener('submit', handleAuth);
authClose.addEventListener('click', closeAuthModal);

window.addEventListener('click', (event) => {
    if (event.target === authContainer) {
        closeAuthModal();
    }
});

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

function handleAuth(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authTitle.textContent === 'Sign Up') {
        if (username.toLowerCase() === 'admin') {
            authMessage.textContent = 'Cannot create an account with username "admin".';
        } else if (users[username]) {
            authMessage.textContent = 'Username already exists. Please choose a different one.';
        } else {
            users[username] = { password, quizProgress: {} };
            localStorage.setItem('users', JSON.stringify(users));
            login(username);
        }
    } else { // Login
        if (username.toLowerCase() === 'admin' && password === ADMIN_PASSWORD) {
            loginAsAdmin();
        } else if (users[username] && users[username].password === password) {
            login(username);
        } else {
            authMessage.textContent = 'Invalid username or password.';
        }
    }
}

function login(username) {
    currentUser = username;
    userName.textContent = username;
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    authContainer.style.display = 'none';
    landingPage.style.display = 'block';
    authMessage.textContent = '';
}

function loginAsAdmin() {
    currentUser = 'admin';
    userName.textContent = 'Admin';
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    authContainer.style.display = 'none';
    showAdminDashboard();
}

function logout() {
    currentUser = null;
    userName.textContent = '';
    loginBtn.style.display = 'inline-block';
    signupBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    quizContainer.style.display = 'none';
    adminDashboard.style.display = 'none';
    landingPage.style.display = 'block';
}

function startQuiz() {
    if (currentUser) {
        landingPage.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion();
        updateProgressBar();
    } else {
        authMessage.textContent = 'Please login or sign up to start the quiz.';
        showAuthForm('Login');
    }
}

function showAdminDashboard() {
    hideAllSections();
    adminDashboard.style.display = 'block';
    updateAdminDashboard();
}

function updateAdminDashboard() {
    const totalUsers = Object.keys(users).length;
    const completedUsers = Object.values(users).filter(user => 
        user.quizProgress && Object.keys(user.quizProgress).length === quizData.length
    ).length;
    const incompleteUsers = totalUsers - completedUsers;

    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('completed-users').textContent = completedUsers;
    document.getElementById('incomplete-users').textContent = incompleteUsers;

    const userTableBody = document.querySelector('#user-table tbody');
    userTableBody.innerHTML = '';

    Object.entries(users).forEach(([username, userData]) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const statusCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        nameCell.textContent = username;
        
        const isCompleted = userData.quizProgress && Object.keys(userData.quizProgress).length === quizData.length;
        statusCell.textContent = isCompleted ? 'Completed' : 'Incomplete';
        
        if (isCompleted) {
            const totalScore = Object.values(userData.quizProgress).reduce((sum, section) => 
                sum + Object.values(section).reduce((sectionSum, score) => sectionSum + score, 0), 0
            );
            const totalQuestions = quizData.reduce((sum, section) => sum + section.questions.length, 0);
            scoreCell.textContent = (totalScore / totalQuestions).toFixed(2);
        } else {
            scoreCell.textContent = 'N/A';
        }

        row.appendChild(nameCell);
        row.appendChild(statusCell);
        row.appendChild(scoreCell);
        userTableBody.appendChild(row);
    });
}


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


let currentSection = 0;
let currentQuestion = 0;

function loadQuestion() {
    const section = quizData[currentSection];
    const questionData = section.questions[currentQuestion];
    
    document.getElementById('section-title').textContent = section.title;
    
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
    
    document.getElementById('question-container').innerHTML = questionHTML;

    // Load saved answer if exists
    const userProgress = users[currentUser].quizProgress;
    if (userProgress[currentSection] && userProgress[currentSection][currentQuestion]) {
        const savedRating = userProgress[currentSection][currentQuestion];
        document.querySelector(`input[name="rating"][value="${savedRating}"]`).checked = true;
    }

    updateProgressBar();
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
    } else if (currentSection > 0) {
        currentSection--;
        currentQuestion = quizData[currentSection].questions.length - 1;
    }
    loadQuestion();
});

document.getElementById('next-btn').addEventListener('click', () => {
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
});

function saveAnswer() {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
        if (!users[currentUser].quizProgress[currentSection]) {
            users[currentUser].quizProgress[currentSection] = {};
        }
        users[currentUser].quizProgress[currentSection][currentQuestion] = parseInt(selectedRating.value);
        localStorage.setItem('users', JSON.stringify(users));
    }
    updateProgressBar();
}

function showResults() {
    let resultsHTML = "<h2>Your Assessment Results</h2>";
    let totalScore = 0;
    let totalQuestions = 0;
    let sectionAverages = [];
    
    quizData.forEach((section, sectionIndex) => {
        let sectionTotal = 0;
        let sectionCount = 0;
        
        resultsHTML += `<h3>${section.title}</h3>`;
        resultsHTML += `<table class="results-table">
                            <tr>
                                <th>Question</th>
                                <th>Your Score</th>
                            </tr>`;
        
        section.questions.forEach((question, questionIndex) => {
            const answer = users[currentUser].quizProgress[sectionIndex] && users[currentUser].quizProgress[sectionIndex][questionIndex];
            if (answer) {
                resultsHTML += `<tr>
                                    <td>${question.question}</td>
                                    <td>${answer}</td>
                                </tr>`;
                sectionTotal += answer;
                sectionCount++;
                totalScore += answer;
                totalQuestions++;
            }
        });
        
        const sectionAverage = sectionCount > 0 ? (sectionTotal / sectionCount).toFixed(2) : "N/A";
        sectionAverages.push(parseFloat(sectionAverage));
        resultsHTML += `</table>
                        <p class="section-summary">Section Average: ${sectionAverage}</p>
                        <p class="section-summary">Section Total: ${sectionTotal}</p>`;
    });
    
    const overallAverage = (totalScore / totalQuestions).toFixed(2);
    resultsHTML += `<h3>Overall Results</h3>
                    <p class="overall-summary">Total Score: ${totalScore}</p>
                    <p class="overall-summary">Overall Average: ${overallAverage}</p>`;
    
    resultsHTML += '<canvas id="resultsChart" width="400" height="200"></canvas>';
    
    resultsHTML += '<button onclick="location.reload()" class="btn-primary">Back to Home</button>';
    
    quizContainer.innerHTML = resultsHTML;
    
    // Create bar chart
    createBarChart(sectionAverages);
}

function createBarChart(sectionAverages) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: quizData.map(section => section.title.split(':')[0]),
            datasets: [{
                label: 'Section Averages',
                data: sectionAverages,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            },
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Skills Assessment Summary'
                }
            }
        }
    });
}

function updateProgressBar() {
    const totalQuestions = quizData.reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = Object.values(users[currentUser].quizProgress).reduce((sum, section) => sum + Object.keys(section).length, 0);
    const progress = (answeredQuestions / totalQuestions) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function hideAllSections() {
    landingPage.style.display = 'none';
    authContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    adminDashboard.style.display = 'none';
}

// Initial setup
document.getElementById('quiz-container').style.display = 'none';
document.getElementById('auth-container').style.display = 'none';
adminDashboard.style.display = 'none';
