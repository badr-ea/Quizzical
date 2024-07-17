import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";
import "./style.css";

//[{category: "Entertainment: Video Games", type: "multiple", difficulty: "easy", question: "Which of these Starbound races has a Wild West culture?", correct_answer: "Novakid", incorrect_answers: ["Avian", "Human", "Hylotl"]}]

export default function App() {
  const [start, setStart] = React.useState(false);
  const [quiz, setQuiz] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [isRevealed, setIsRevealed] = React.useState(true);
  const [number, setNumber] = React.useState(5);
  const [category, setCategory] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");

  console.log(number, category, difficulty);

  function handleNumber(e) {
    setNumber(e.target.value);
  }

  function handleCategory(e) {
    setCategory(e.target.value);
  }

  function handleDifficulty(e) {
    setDifficulty(e.target.value);
  }

  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - number / 10);
  }

  function startQuiz() {
    setStart((preVal) => !preVal);
  }

  React.useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let q = [];
        data.results.forEach((question) => {
          q.push({
            id: nanoid(),
            answers: shuffleArray([
              ...question.incorrect_answers,
              question.correct_answer,
            ]),
            question: question.question,
            correct: question.correct_answer,
            selected: null,
            checked: false,
          });
        });
        setQuiz(q);
      });
  }, [count, category, number, difficulty]);

  function handleCheck() {
    let selected = true;
    quiz.forEach((question) => {
      if (question.selected === null) {
        selected = false;
        return;
      }
    });
    if (!selected) {
      window.alert("You must answer all questions!");
      return;
    }
    setQuiz((questions) =>
      questions.map((question) => {
        return { ...question, checked: true };
      })
    );
    let correct = 0;
    quiz.forEach((question) => {
      if (question.correct === question.selected) {
        correct += 1;
      }
      setCorrect(correct);
    });
    setIsRevealed(false);
    console.log(quiz);
  }

  function handleClickAnswer(id, answer) {
    setQuiz((questions) =>
      questions.map((question) => {
        return question.id === id
          ? { ...question, selected: answer }
          : question;
      })
    );
  }

  function handlePlayAgain() {
    setCount((count) => count + 1);
    setIsRevealed(true);
  }

  const questions = quiz.map((item) => {
    return (
      <Quiz
        key={item.id}
        id={item.id}
        q={item}
        handleClickAnswer={handleClickAnswer}
        abc={4}
      />
    );
  });
  console.log(count);
  return (
    <div>
      <img src="./images/blob1.png" className="blue-blob" />
      <img src="./images/blob2.png" className="green-blob" />
      {!start ? (
        <Start
          start={startQuiz}
          handleNumber={handleNumber}
          handleCategory={handleCategory}
          handleDifficulty={handleDifficulty}
        />
      ) : (
        questions
      )}
      {start && (
        <div className="end">
          {isRevealed ? (
            <div className="check" onClick={handleCheck}>
              Check answers
            </div>
          ) : (
            <div className="results">
              <span className="score">
                You scored {correct}/{number} correct answers
              </span>
              <div className="again" onClick={handlePlayAgain}>
                Play Again
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
