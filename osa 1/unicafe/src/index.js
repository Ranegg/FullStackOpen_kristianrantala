import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistics = (props) => {
    const Statistic = (props) => {
        return (
            <p>{props.text} {props.value}</p>
        )
    }
    if (props.all === 0) {
        return (
            <>
                <h3>No feedback given</h3>
            </>
        )
    }
    return (
        <div>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={props.all} />
            <Statistic text="average" value={props.average} />
            <Statistic text="positive" value={props.positive} />
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const all = good + neutral + bad
    const average = 0 + (good - bad) / all
    const positive = Math.round(good / 
        all  * 1000000000000000) / 10000000000000 + ' %'

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button handleClick={handleGoodClick} text='good' />
                <Button handleClick={handleNeutralClick} text='neutral' />
                <Button handleClick={handleBadClick} text='bad' />
            </div>
            <h1>statistics</h1>
            <Statistics good={good}
                        neutral={neutral}
                        bad={bad}
                        all={all}
                        average={average}
                        positive={positive} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));