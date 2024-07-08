import React from "react"
import categories from "../category"

export default function Start(props) {
    return (
        <div className="start-page">
            <p className="title">Quizzical</p>
            <p className="description">Test your knowledge by answerings questions from various topics</p>
            <input type="number" onChange={props.handleNumber}></input>
            <select onChange={props.handleCategory}>
                {categories.map(item => {
                    return (
                        <option value={item.value}>{item.name}</option>
                    )
                })}
            </select>
            <select onChange={props.handleDifficulty}>
			    <option value="any">Any Difficulty</option>
			    <option value="easy">Easy</option>
			    <option value="medium">Medium</option>
			    <option value="hard">Hard</option>
		    </select>
            <div className="start-button" onClick={props.start}>Start Quiz</div>
        </div>
    )
}