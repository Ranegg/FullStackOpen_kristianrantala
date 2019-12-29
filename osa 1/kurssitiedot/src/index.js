import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part partsname={props.parts[0].name} partsexercises={props.parts[0].exercises} />
            <Part partsname={props.parts[1].name} partsexercises={props.parts[1].exercises} />
            <Part partsname={props.parts[2].name} partsexercises={props.parts[2].exercises} />
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.partsname} {props.partsexercises}</p>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises in total {props.parts[0].exercises 
            + props.parts[1].exercises
            + props.parts[2].exercises}</p>
    )
}


const App = () => {
    const course = { 
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
