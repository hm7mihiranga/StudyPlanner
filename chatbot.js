document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    const API_KEY = ""; // put the API key here

    // Predefined responses
    const responses = {
        "predict my score": "I can help you estimate your score! Please provide your marks or grades for each subject, and I’ll calculate your predicted score.",
        "what is my score prediction": "To predict your score, I’ll need to know your current scores or estimated grades in each subject. Could you please share that information with me?",
        "estimate my result": "I’ll need your marks or grades to give you an accurate result estimation. Could you enter them for me?",
        "can you predict my exam score": "I can help you with that! Share your scores or recent performance, and I'll predict your overall exam score.",
        "how do i calculate my score": "To calculate your score prediction, I’ll consider factors like past performance, the weight of each subject, and your current grades. Share your scores, and I’ll handle the rest!",
        "what are the factors for score prediction": "Factors include your recent grades, performance trends, the weight of each subject, and sometimes even additional variables like your study habits or exam practice.",
        "how does the score prediction work": "I analyze your marks, subject difficulty, and trends from previous exams to generate a prediction. The more accurate your input, the more precise the prediction will be!",
        "what’s the margin of error for the score prediction": "The margin of error is usually within 5–10% of your actual score, but it can depend on how much data I have to work with and other factors.",
        "how accurate is the prediction": "The accuracy of the prediction depends on the information you provide. If your past scores are a good representation of your performance, the prediction should be fairly accurate!",
        "what should i do if i’m not happy with my prediction": "If you're not happy with the prediction, try focusing on areas where you can improve the most. It’s never too late to make a positive impact on your score!",
        "will my score improve if i study more": "Yes, consistent study and practice can significantly improve your score. If you'd like, I can suggest some study techniques to help boost your performance!",
        "what’s the best score i can get": "The best score would be 100%! But don't stress too much—focus on doing your best in each subject and improving where necessary.",
        "how can i improve my score": "To improve your score, focus on the subjects where you scored the lowest. You can also practice more with mock exams or try different study methods. Would you like some study tips?",
        
        "study tips": [
            "To improve your scores, focus on the areas where you need the most help. Would you like specific tips for certain subjects?",
            "What are some good study strategies?",
            "How can I study more efficiently?",
            "Do you have any suggestions for studying effectively?",
            "Can you give me some study tips?"
        ],
        "how to study for exams": [
            "Start early, break down study material into smaller sections, and practice with mock exams or past papers. Stay consistent and avoid cramming.",
            "How should I approach studying for exams?",
            "What’s the best way to study for final exams?",
            "Can you guide me on how to study for exams?"
        ],
        "can you help me with revision": [
            "Yes, I can help you organize your revision schedule and provide summaries or key points for subjects. What are you revising?",
            "How do I revise effectively?",
            "Can you assist me with my revision?",
            "What should I focus on during my revision?"
        ],
        "what is the best study method": [
            "The best method depends on your learning style. Techniques like active recall, spaced repetition, and practice testing are often highly effective.",
            "What is the best method for studying?",
            "Can you recommend a study method?",
            "How do I find the most effective study technique for me?"
        ],
        "how do i calculate my final marks": [
            "To calculate your final marks, you need to know your marks for each subject and the weight of each one. Then, use the weighted average formula.",
            "Can you help me calculate my final marks?",
            "What’s the formula for calculating my final marks?",
            "How can I figure out my final marks?"
        ],
        "what’s the importance of time management in studying": [
            "Time management is crucial for effective studying because it ensures that you allocate enough time to each subject and avoid procrastination.",
            "Why is time management important for studying?",
            "How does time management impact my study sessions?",
            "Can you explain the importance of time management in studying?"
        ],
        "what are some ways to improve focus while studying": [
            "Minimize distractions, set specific goals for each study session, and take regular breaks. Some people also find listening to instrumental music helpful.",
            "How can I stay focused while studying?",
            "Can you help me improve my concentration during study?",
            "What can I do to improve my focus while studying?"
        ],
        "how do i study better under pressure": [
            "Start by organizing your study material and prioritizing key topics. Stay calm, take breaks, and remind yourself that stress can be managed.",
            "How can I study better when I’m under pressure?",
            "What should I do to study effectively in stressful situations?",
            "Can you suggest ways to study under pressure?"
        ],
        "can you suggest a study plan": [
            "I can create a customized study plan for you. Could you share how many subjects you're studying and when your exams are?",
            "Can you create a study plan for me?",
            "What’s the best study plan for exams?",
            "Can you help me organize a study schedule?"
        ],
        "how do i stay motivated during studying": [
            "Set small, achievable goals, take regular breaks, and visualize the rewards of completing your studies. Stay positive!",
            "What can I do to stay motivated while studying?",
            "How do I keep myself motivated to study?",
            "Can you suggest ways to stay motivated?"
        ],
        "how do i balance studying with my other activities": [
            "Prioritize your tasks and create a timetable that allocates time for both studying and relaxation or hobbies.",
            "How do I manage my time between study and other activities?",
            "How can I balance studying with my social life?",
            "Can you help me balance my study and personal time?"
        ],
        "how do i overcome procrastination": [
            "Start with small, manageable tasks and reward yourself when you complete them. Consistent progress is key.",
            "How can I stop procrastinating?",
            "What can I do to overcome procrastination?",
            "Can you suggest methods to beat procrastination?"
        ],
        "what is spaced repetition": [
            "Spaced repetition is a learning technique where you review information at increasing intervals to improve long-term retention.",
            "What is spaced repetition?",
            "How does spaced repetition work?",
            "Can you explain how spaced repetition helps with studying?"
        ],
        "how can i use flashcards for studying": [
            "Flashcards are a great tool for active recall. Write questions on one side and answers on the other, and review them regularly.",
            "Can I use flashcards for studying?",
            "How do I make effective flashcards for studying?",
            "Can flashcards improve my retention?"
        ],
        "how do i prepare for multiple exams at once": [
            "Create a study schedule that divides your time based on the difficulty and amount of material for each exam. Don't forget to review and take breaks.",
            "How can I study for multiple exams at the same time?",
            "What’s the best strategy for preparing for multiple exams?",
            "Can you help me prepare for exams simultaneously?"
        ],
        "how do i manage exam anxiety": [
            "Practice relaxation techniques like deep breathing, visualization, or mindfulness. Focus on what you can control, and stay confident in your preparation.",
            "How can I reduce exam anxiety?",
            "What should I do to calm my nerves before exams?",
            "Can you suggest techniques to handle exam anxiety?"
        ],
        "how do i answer multiple choice questions": [
            "Read the question carefully, eliminate obviously wrong answers, and guess if you're unsure, but avoid second-guessing yourself.",
            "How should I answer multiple choice questions?",
            "What’s the best approach to multiple choice questions?",
            "Can you give me tips for answering multiple choice questions?"
        ],
        "how do i improve my writing skills for exams": [
            "Practice writing essays and answers within time limits. Focus on structure, clarity, and precision in your writing.",
            "How can I write better for exams?",
            "What’s the best way to improve my writing skills for exams?",
            "Can you suggest ways to write more effectively in exams?"
        ],
        "how can I manage distractions while studying": [
            "Turn off notifications, set a dedicated study space, and let others know you're studying. Consider using apps that block distracting websites.",
            "How do I avoid distractions during study sessions?",
            "Can you help me stay focused and avoid distractions while studying?",
            "What can I do to minimize distractions while studying?"
        ],
        "how do I prepare for oral exams": [
            "Practice speaking your answers out loud and focus on key points you want to make. Rehearse with a friend or family member.",
            "What’s the best way to prepare for an oral exam?",
            "How can I succeed in an oral exam?",
            "Can you help me prepare for an oral exam?"
        ],
        "how do I know if I’m ready for the exam": [
            "If you feel confident with the material and can explain key concepts clearly, you're likely ready. Take a practice test to check your readiness.",
            "How can I tell if I’m ready for my exam?",
            "What are the signs that I’m well-prepared for my exam?",
            "Can you help me assess if I’m ready for the exam?"
        ],
        "how do I stay calm during an exam": [
            "Take deep breaths and focus on the task at hand. If you feel overwhelmed, pause for a moment to reset and regain focus.",
            "How do I stay calm during an exam?",
            "What can I do to keep calm during exams?",
            "How can I stay composed and focused in the exam hall?"
        ],
        "how do I answer essay questions": [
            "Start by outlining your main points, and make sure to back them up with examples. Stay focused on the question and answer it directly.",
            "What’s the best way to answer essay questions?",
            "How can I write better essays during exams?",
            "Can you give me tips for writing essays in exams?"
        ],
        "how do I use a study group effectively": [
            "Set clear goals for each session, stay on topic, and ensure everyone participates. Make the most of group discussions for clarifying doubts.",
            "How can I use a study group for better results?",
            "What’s the best way to study with a group?",
            "How can a study group help me prepare better?"
        ],
        "how do I avoid burnout during exams": [
            "Take regular breaks, stay hydrated, and get plenty of rest. Avoid overloading yourself and make time for relaxation.",
            "How can I avoid burnout while studying?",
            "What should I do to prevent burnout during exam preparation?",
            "Can you give me tips to avoid stress and burnout?"
        ],
        "how do I manage my study schedule": [
            "Use a calendar or planner to allocate time for each subject. Break down your schedule into daily tasks and stick to it.",
            "What’s the best way to manage my study schedule?",
            "Can you help me organize my study plan?",
            "How do I stay on track with my study schedule?"
        ],
        "how do I make my study sessions more effective": [
            "Set specific, measurable goals for each session, minimize distractions, and make sure to actively engage with the material.",
            "What’s the key to effective study sessions?",
            "How can I make my study sessions more productive?",
            "Can you help me improve my study sessions?"
        ]
    };
    

    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        displayMessage(userMessage, "user");
        chatInput.value = "";

        // Check if the user's message matches any predefined responses
        const lowerCaseMessage = userMessage.toLowerCase();
        if (responses[lowerCaseMessage]) {
            displayMessage(responses[lowerCaseMessage], "bot");
        } else {
            try {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: userMessage }],
                    }),
                });

                const data = await response.json();
                const botReply = data.choices[0].message.content;
                displayMessage(botReply, "bot");
            } catch (error) {
                displayMessage("Oops! Something went wrong. Try again later.", "bot");
                console.error(error);
            }
        }
    }

    function displayMessage(message, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});
