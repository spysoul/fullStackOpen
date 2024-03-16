import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  return total > 0 ? (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <h1>Statistics</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <StatisticLine text={"good"} value={good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text={"neutral"} value={neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text={"bad"} value={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text={"all"} value={total} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text={"average"} value={(good - bad) / total} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text={"positive"} value={(good * 100) / total} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  ) : (
    <p>No feedback given</p>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={handleClickGood} text={"good"} />
      <Button handleClick={handleClickNeutral} text={"neutral"} />
      <Button handleClick={handleClickBad} text={"bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
