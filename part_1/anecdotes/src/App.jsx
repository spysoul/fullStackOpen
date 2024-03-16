import { useState } from "react";

const Anecdotes = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const handleClickGenerate = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleClickVote = () => {
    const copyVotes = [...votes];

    copyVotes[selected] += 1;

    setVotes(copyVotes);
  };

  const mostVotedIndex = votes
    .map((vote, index) => ({ index, vote }))
    .sort((a, b) => b.vote - a.vote)[0].index;

  return (
    <>
      <h3>Anecdote of the day</h3>

      <Button text={"Vote"} handleClick={handleClickVote} />
      <Button text={"Generate"} handleClick={handleClickGenerate} />

      <div>
        <p>{anecdotes[selected]}</p>
        <p>Number of votes: {votes[selected]}</p>
      </div>

      {votes.some((vote) => vote > 0) ? (
        <MostVotedAnecdote
          votes={votes[mostVotedIndex]}
          anecdote={anecdotes[mostVotedIndex]}
        />
      ) : (
        <p>No votes yet</p>
      )}
    </>
  );
};

const MostVotedAnecdote = ({ votes, anecdote }) => {
  return (
    <>
      <h3>Anecdote with most votes</h3>
      <p>
        {votes}
        {votes > 1 ? " votes" : " vote"}!!
      </p>
      <p>{anecdote}</p>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  return <Anecdotes />;
};

export default App;
