import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TextDisplay from "./components/TextDisplay";
import TypingArea from "./components/TypingArea";
import Timer from "./components/Timer";
import Stats from "./components/Stats";
import Results from "./components/Results";
import "./App.css";

// ---------------- TEXT DATA ----------------
const easyTexts = [
  "The sun is bright today.",
  "Typing is fun to learn.",
  "A cat runs fast.",
  "Dogs bark loudly in the park.",
  "Birds fly high in the sky.",
  "The book is on the table.",
  "She drinks a glass of water.",
  "The stars shine at night.",
  "I like to play games.",
  "He rides his bike to school.",
  "The baby is sleeping peacefully.",
  "My friend has a red car.",
  "We love ice cream in summer.",
  "The clock ticks every second.",
  "Apples grow on tall trees.",
  "The train moves very fast.",
  "He wears a blue shirt.",
  "The dog sleeps under the bed.",
  "Children play happily in the garden.",
  "The moon glows softly at night."
];

const mediumTexts = [
  "React makes it simple to build interactive user interfaces.",
  "Typing speed improves with practice and focus.",
  "Programming requires problem solving and patience.",
  "JavaScript powers many modern web applications.",
  "Learning new skills takes dedication and consistency.",
  "Effective communication is key to teamwork and success.",
  "Technology evolves quickly in the digital age.",
  "Reading books improves vocabulary and imagination.",
  "Healthy habits form the foundation of a good life.",
  "Critical thinking helps in making better decisions.",
  "Online courses provide access to global education.",
  "Practice is the best way to master typing.",
  "Social media connects people across the world.",
  "Discipline is the bridge between goals and achievement.",
  "Good sleep improves focus and productivity.",
  "Every programmer should learn the basics of algorithms.",
  "Patience and persistence lead to success in coding.",
  "Web development requires both design and logic skills.",
  "Regular breaks increase concentration during study.",
  "Creative ideas often come from observing daily life."
];

const hardTexts = [
  "Complex algorithms and data structures are fundamental in computer science.",
  "Optimizing performance often requires deep knowledge of low level systems.",
  "JavaScript frameworks evolve rapidly, demanding constant adaptation and learning.",
  "Concurrency and parallelism are key concepts in scalable system design.",
  "Machine learning models rely on large datasets and careful tuning of parameters.",
  "Understanding computational complexity helps in writing efficient algorithms.",
  "Distributed databases ensure availability but introduce consistency challenges.",
  "Functional programming emphasizes immutability and higher order functions.",
  "Version control systems like Git are essential for collaborative development.",
  "Memory management and garbage collection affect runtime performance.",
  "Cloud computing offers scalability but requires robust security practices.",
  "Event driven architectures handle asynchronous operations effectively.",
  "Unit testing ensures code reliability and easier refactoring.",
  "Artificial intelligence is transforming industries through automation and insights.",
  "Networking protocols define how devices communicate over the internet.",
  "Containerization enables consistent deployments across environments.",
  "Low level languages provide control but demand careful resource handling.",
  "Continuous integration improves development speed and software quality.",
  "Encryption safeguards sensitive data against unauthorized access.",
  "The balance between usability and security is a critical design challenge."
];

const trickySpellingTexts = [
  "Accommodate is often misspelled with only one 'm' or one 'c'.",
  "Rhythm has no traditional vowels yet is tricky to spell.",
  "Occurrence often loses one of its double 'r' or 'c'.",
  "Supersede is the only English word ending in 'sede'.",
  "Embarrass has double 'r' and double 's'.",
  "February is often mispronounced and misspelled.",
  "Miscellaneous contains hidden double letters.",
  "Pronunciation is misspelled as pronounciation by many.",
  "Millennium has two 'l' and two 'n'.",
  "Vacuum has a tricky double 'u'."
];

const storyText = `Once upon a time, in a quiet little village at the edge of a dense forest, there lived a young boy named Arjun. 
He loved stories, not just hearing them but creating them. Every evening, after finishing his chores, 
he would sit under the old banyan tree and weave tales about kings, warriors, magical lands, and hidden treasures. 
The villagers adored his stories, and soon children, adults, and elders alike gathered to hear him speak. 
But Arjun had one dream — he wanted his stories to travel beyond the village, to the entire world. 
He decided to practice every single day, making his stories longer, richer, and more exciting. 
Seasons passed, and so did years, but Arjun never stopped. His words grew stronger, his imagination sharper. 
One day, a traveler passing through the village heard Arjun narrating under the banyan tree. 
Mesmerized, he invited Arjun to the city. Arjun’s stories soon reached hundreds, then thousands, and finally millions. 
The boy who once told tales to a handful of villagers became a storyteller known far and wide. 
And still, deep inside, he remembered the banyan tree, the chirping birds, and the curious faces that gave him his very first audience.`.repeat(
  3
); // repeated to ensure it's 50+ lines

// ---------------- HELPER ----------------
const getRandomSentence = (difficulty) => {
  if (difficulty === "easy")
    return easyTexts[Math.floor(Math.random() * easyTexts.length)];
  if (difficulty === "medium")
    return mediumTexts[Math.floor(Math.random() * mediumTexts.length)];
  if (difficulty === "hard")
    return hardTexts[Math.floor(Math.random() * hardTexts.length)];
  if (difficulty === "tricky")
    return trickySpellingTexts[
      Math.floor(Math.random() * trickySpellingTexts.length)
    ];
  if (difficulty === "story") return storyText;
};

function App() {
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState("medium");
  const [darkMode, setDarkMode] = useState(false);

  const [text, setText] = useState([]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [started, setStarted] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, errors: 0 });
  const [finished, setFinished] = useState(false);

  // load first text
  const loadText = () => {
    setText(getRandomSentence(difficulty).split(" "));
    setInput("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(duration);
    setStats({ wpm: 0, accuracy: 100, errors: 0 });
  };

  useEffect(() => {
    loadText();
  }, [difficulty, duration]);

  // if timer ends
  useEffect(() => {
    if (timeLeft === 0) {
      setFinished(true);
    }
  }, [timeLeft]);

  // infinite text streaming
  useEffect(() => {
    const typedWords = input.trim().split(" ").length;
    if (typedWords >= text.length - 5 && difficulty !== "story") {
      // append more words only for non-story modes
      setText((prev) => [
        ...prev,
        ...getRandomSentence(difficulty).split(" "),
      ]);
    }
  }, [input, text, difficulty]);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      {/* -------- Navbar -------- */}
     

      <div className="card">
        <Header
          duration={duration}
          setDuration={setDuration}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(timeLeft / duration) * 100}%`,
              background:
                timeLeft > duration * 0.6
                  ? "#4caf50"
                  : timeLeft > duration * 0.3
                  ? "#ff9800"
                  : "#f44336",
            }}
          ></div>
        </div>

        <Timer
          timeLeft={timeLeft}
          started={started}
          setStarted={setStarted}
          setTimeLeft={setTimeLeft}
          duration={duration}
        />

        <TextDisplay text={text.join(" ")} input={input} />

        {!finished && (
          <TypingArea
            input={input}
            setInput={setInput}
            text={text.join(" ")}
            started={started}
            setStarted={setStarted}
            stats={stats}
            setStats={setStats}
            timeLeft={timeLeft}
          />
        )}

        {finished ? (
          <Results stats={stats} restart={loadText} />
        ) : (
          <Stats stats={stats} />
        )}
      </div>
    </div>
  );
}

export default App;
