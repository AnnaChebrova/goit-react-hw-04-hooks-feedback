import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Statistics from "./components/Statistic";
import Notification from "./components/Notification";
import ButtonContainer from './components/BtnContainer'

const App = (totalFeedback) => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const TotalFeedback = () => {
    const totalFeedback = good + neutral + bad;
    return totalFeedback;
  };

  const FeedbackPositPerc = () => {
    const positPerc = Math.ceil(
      (good / (good + neutral + bad)) * 100
    );
    return positPerc || 0;
  };

  const handleIncrementGood = () => {
    setGood((prev) => prev + 1);
    TotalFeedback();
    FeedbackPositPerc();
  };

  const handleIncrementNeutral = () => {
    setNeutral((prev) => prev + 1);
    TotalFeedback();
  };

  const handleIncrementBad = () => {
    setBad((prev) => prev + 1);
    TotalFeedback();
  };

  return (
    <div>
    <section>
    <h1>Please leave feedback</h1>
    <ButtonContainer 
    onGood={handleIncrementGood}
    onNeutral={handleIncrementNeutral}
    onBad={handleIncrementBad}
    />
    </section>
    {!totalFeedback && <Notification message="No feedback given" /> }
    {!!totalFeedback && (
         <section>
    <h2>Statistics</h2>
    <Statistics 
    good={good}
    neutral={neutral}
    bad={bad}
    total={TotalFeedback()}
    positive={FeedbackPositPerc}
        />
         </section>
    )
    }
    </div>
  );
};

App.defaultProps = {
  totalFeedback: 0,
  percentageOfGoodFeedb: 0,
};
App.propTypes = {
  totalFeedback: PropTypes.number,
  percentageOfGoodFeedb: PropTypes.number,
};

export default App;