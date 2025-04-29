import React from "react";
import "./QuestionCard.css";

function QuestionCard({ question, onAnswer }) {
    const handleClick = (value) => {
        onAnswer(question.id, value);
    };

    return (
        <div className="question-container">
            <h2 className="question-text">{question.question}</h2>
            <div className="options-container">
                {question.options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleClick(option.value)}
                        className="option-button"
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;
