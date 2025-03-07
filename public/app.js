document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const questionsContainer = document.getElementById('questions-container');
    const submitBtn = document.getElementById('submit-btn');
    const newTestBtn = document.getElementById('new-test-btn');
    const retryBtn = document.getElementById('retry-btn');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const scoreDetailsElement = document.getElementById('score-details');
    const questionNumberElement = document.getElementById('question-number');
    const progressBar = document.getElementById('progress-bar');
    
    // State
    let questions = [];
    let correctAnswers = 0;
    let questionElements = [];
    
    // Load questions from API
    async function loadQuestions() {
        try {
            // Clear existing questions first
            questions = [];
            questionsContainer.innerHTML = '';
            
            // Add timestamp parameter to prevent caching
            const timestamp = new Date().getTime();
            // Request 65 questions instead of the default
            const response = await fetch(`/api/random-aws-questions?count=65&t=${timestamp}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            questions = await response.json();
            console.log("Loaded questions:", questions.length);
            
            renderQuestions();
            updateProgress();
        } catch (error) {
            console.error('Error loading questions:', error);
            questionsContainer.innerHTML = '<p>Error loading questions. Please try refreshing the page.</p>';
        }
    }
    
    // Render questions in the DOM
    function renderQuestions() {
        questionsContainer.innerHTML = '';
        questionElements = [];
        
        if (questions.length === 0) {
            questionsContainer.innerHTML = '<p>No questions available. Please try refreshing the page.</p>';
            return;
        }
        
        questions.forEach((question, index) => {
            // Clone the template
            const template = document.getElementById('question-template');
            const questionElement = document.importNode(template.content, true).querySelector('.question-container');
            
            // Set question text
            questionElement.querySelector('.question').textContent = `${index + 1}. ${question.question}`;
            
            // Add options
            const optionsList = questionElement.querySelector('.options');
            question.options.forEach((option, optionIndex) => {
                const li = document.createElement('li');
                li.className = 'option';
                li.textContent = option;
                li.dataset.index = optionIndex;
                
                li.addEventListener('click', () => selectOption(index, optionIndex));
                
                optionsList.appendChild(li);
            });
            
            // Add feedback element
            const feedback = questionElement.querySelector('.feedback');
            
            // Store references to DOM elements for this question
            questionElements.push({
                element: questionElement,
                optionElements: Array.from(optionsList.children),
                feedbackElement: feedback
            });
            
            questionsContainer.appendChild(questionElement);
        });
    }
    
    // Handle option selection
    function selectOption(questionIndex, optionIndex) {
        const question = questions[questionIndex];
        const questionEl = questionElements[questionIndex];
        
        // Allow changing answers - removed the check: if (question.answered) return;
        
        // Mark as answered
        question.answered = true;
        question.selectedOption = optionIndex;
        
        // Clear previous selections
        questionEl.optionElements.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Mark selected option
        questionEl.optionElements[optionIndex].classList.add('selected');
        
        // Update progress
        updateProgress();
    }
    
    // Check answers when submit button is clicked
    function checkAnswers() {
        correctAnswers = 0;
        const resultDetails = [];
        
        questions.forEach((question, index) => {
            const questionEl = questionElements[index];
            const selectedOption = question.selectedOption;
            
            // Store result information regardless of whether question was answered
            const resultInfo = {
                question: question.question,
                options: question.options,
                correctOption: question.correctOption,
                selectedOption: selectedOption,
                isCorrect: selectedOption === question.correctOption
            };
            
            // Add to results array
            resultDetails.push(resultInfo);
            
            if (selectedOption === undefined) {
                // Question was not answered
                return;
            }
            
            const isCorrect = selectedOption === question.correctOption;
            const feedbackEl = questionEl.feedbackElement;
            
            // Add appropriate classes to options
            questionEl.optionElements.forEach((option, optIndex) => {
                if (optIndex === question.correctOption) {
                    option.classList.add('correct');
                } else if (optIndex === selectedOption && !isCorrect) {
                    option.classList.add('incorrect');
                }
            });
            
            // Show feedback
            feedbackEl.style.display = 'block';
            feedbackEl.textContent = isCorrect ? 
                'Correct! Good job!' : 
                `Incorrect. The correct answer is: ${question.options[question.correctOption]}`;
            feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            
            if (isCorrect) {
                correctAnswers++;
            }
        });
        
        // Store results for review
        sessionStorage.setItem('testResults', JSON.stringify(resultDetails));
        
        // Show score
        const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
        scoreElement.textContent = `${scorePercentage}%`;
        scoreDetailsElement.textContent = `${correctAnswers} out of ${questions.length} questions correct`;
        
        // Add review button
        const reviewBtn = document.createElement('button');
        reviewBtn.id = 'review-btn';
        reviewBtn.textContent = 'Review Answers';
        reviewBtn.className = 'secondary';
        reviewBtn.style.marginTop = '20px';
        reviewBtn.addEventListener('click', showResultsReview);
        
        // Only add the button if it doesn't already exist
        if (!document.getElementById('review-btn')) {
            scoreContainer.appendChild(reviewBtn);
        }
        
        // Hide questions, show score
        questionsContainer.style.display = 'none';
        scoreContainer.style.display = 'block';
        submitBtn.style.display = 'none';
    }
    
    // Show detailed review of all questions and answers
    function showResultsReview() {
        // Get stored results
        const resultDetails = JSON.parse(sessionStorage.getItem('testResults'));
        if (!resultDetails || resultDetails.length === 0) {
            alert('No test results available to review.');
            return;
        }
        
        // Create review container
        const reviewContainer = document.createElement('div');
        reviewContainer.id = 'review-container';
        reviewContainer.className = 'review-container';
        
        // Create header
        const header = document.createElement('h2');
        header.textContent = 'Review Your Answers';
        header.className = 'review-header';
        reviewContainer.appendChild(header);
        
        // Create back button
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Back to Results';
        backBtn.className = 'secondary';
        backBtn.style.marginBottom = '20px';
        backBtn.addEventListener('click', () => {
            document.getElementById('review-container').remove();
            scoreContainer.style.display = 'block';
        });
        reviewContainer.appendChild(backBtn);
        
        // Group questions by correctness
        const incorrectQuestions = resultDetails.filter(result => result.selectedOption !== undefined && !result.isCorrect);
        const correctQuestions = resultDetails.filter(result => result.isCorrect);
        const unansweredQuestions = resultDetails.filter(result => result.selectedOption === undefined);
        
        // First show incorrect questions
        if (incorrectQuestions.length > 0) {
            const incorrectHeader = document.createElement('h3');
            incorrectHeader.textContent = 'Incorrect Answers';
            incorrectHeader.className = 'section-header incorrect';
            reviewContainer.appendChild(incorrectHeader);
            
            incorrectQuestions.forEach((result, index) => {
                const questionReview = createQuestionReviewElement(result, index);
                reviewContainer.appendChild(questionReview);
            });
        }
        
        // Then show unanswered questions
        if (unansweredQuestions.length > 0) {
            const unansweredHeader = document.createElement('h3');
            unansweredHeader.textContent = 'Unanswered Questions';
            unansweredHeader.className = 'section-header unanswered';
            reviewContainer.appendChild(unansweredHeader);
            
            unansweredQuestions.forEach((result, index) => {
                const questionReview = createQuestionReviewElement(result, index);
                reviewContainer.appendChild(questionReview);
            });
        }
        
        // Finally show correct questions
        if (correctQuestions.length > 0) {
            const correctHeader = document.createElement('h3');
            correctHeader.textContent = 'Correct Answers';
            correctHeader.className = 'section-header correct';
            reviewContainer.appendChild(correctHeader);
            
            correctQuestions.forEach((result, index) => {
                const questionReview = createQuestionReviewElement(result, index);
                reviewContainer.appendChild(questionReview);
            });
        }
        
        // Hide score container and show review
        scoreContainer.style.display = 'none';
        document.querySelector('.container').appendChild(reviewContainer);
    }
    
    // Helper function to create a question review element
    function createQuestionReviewElement(result, index) {
        const questionReview = document.createElement('div');
        let statusClass = 'unanswered';
        
        if (result.selectedOption !== undefined) {
            statusClass = result.isCorrect ? 'correct' : 'incorrect';
        }
        
        questionReview.className = `question-review ${statusClass}`;
        
        // Question text
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = `${index + 1}. ${result.question}`;
        questionReview.appendChild(questionText);
        
        // Status icon
        const statusIcon = document.createElement('div');
        statusIcon.className = 'status-icon';
        
        if (statusClass === 'correct') {
            statusIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else if (statusClass === 'incorrect') {
            statusIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        } else {
            statusIcon.innerHTML = '<i class="fas fa-question-circle"></i>';
        }
        
        questionReview.appendChild(statusIcon);
        
        // Options list
        const optionsList = document.createElement('ul');
        optionsList.className = 'review-options';
        
        result.options.forEach((option, optIndex) => {
            const optionItem = document.createElement('li');
            optionItem.className = 'review-option';
            
            // Mark correct and selected options
            if (optIndex === result.correctOption) {
                optionItem.classList.add('correct-answer');
            }
            
            if (optIndex === result.selectedOption) {
                optionItem.classList.add('selected-answer');
                
                if (optIndex !== result.correctOption) {
                    optionItem.classList.add('incorrect-answer');
                }
            }
            
            // Add option text
            optionItem.textContent = option;
            
            // Add indicators for correct/selected
            if (optIndex === result.correctOption) {
                const correctIndicator = document.createElement('span');
                correctIndicator.className = 'indicator correct';
                correctIndicator.textContent = ' (Correct Answer)';
                optionItem.appendChild(correctIndicator);
            }
            
            if (optIndex === result.selectedOption && optIndex !== result.correctOption) {
                const selectedIndicator = document.createElement('span');
                selectedIndicator.className = 'indicator incorrect';
                selectedIndicator.textContent = ' (Your Answer)';
                optionItem.appendChild(selectedIndicator);
            }
            
            optionsList.appendChild(optionItem);
        });
        
        questionReview.appendChild(optionsList);
        
        // Add explanation
        if (statusClass === 'incorrect' || statusClass === 'unanswered') {
            const explanation = document.createElement('div');
            explanation.className = 'explanation';
            
            if (statusClass === 'incorrect') {
                explanation.textContent = `You selected "${result.options[result.selectedOption]}" but the correct answer is "${result.options[result.correctOption]}".`;
            } else {
                explanation.textContent = `You did not answer this question. The correct answer is "${result.options[result.correctOption]}".`;
            }
            
            questionReview.appendChild(explanation);
        }
        
        return questionReview;
    }
    
    // Update progress indicators
    function updateProgress() {
        // Count answered questions
        const answeredCount = questions.filter(q => q.answered).length;
        
        // Update question number display
        questionNumberElement.textContent = `${answeredCount} of ${questions.length} Questions Answered`;
        
        // Update progress bar
        const progressPercentage = (answeredCount / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Enable/disable submit button
        submitBtn.disabled = answeredCount === 0;
    }
    
    // Event listeners
    submitBtn.addEventListener('click', checkAnswers);
    
    newTestBtn.addEventListener('click', () => {
        // FIXED: Clean up review container and stored results
        // Remove any existing review container
        const existingReview = document.getElementById('review-container');
        if (existingReview) {
            existingReview.remove();
        }
        
        // Clear the stored test results
        sessionStorage.removeItem('testResults');
        
        // Remove the review button from score container if it exists
        const reviewBtn = document.getElementById('review-btn');
        if (reviewBtn) {
            reviewBtn.remove();
        }
        
        // Reset the application state
        loadQuestions();
        scoreContainer.style.display = 'none';
        questionsContainer.style.display = 'block';
        submitBtn.style.display = 'block';
    });
    
    retryBtn.addEventListener('click', () => {
        // FIXED: Clean up review container and stored results
        // Remove any existing review container
        const existingReview = document.getElementById('review-container');
        if (existingReview) {
            existingReview.remove();
        }
        
        // Clear the stored test results
        sessionStorage.removeItem('testResults');
        
        // Remove the review button from score container if it exists
        const reviewBtn = document.getElementById('review-btn');
        if (reviewBtn) {
            reviewBtn.remove();
        }
        
        // Reset the application state
        loadQuestions();
        scoreContainer.style.display = 'none';
        questionsContainer.style.display = 'block';
        submitBtn.style.display = 'block';
    });
    
    // Initialize
    loadQuestions();
});