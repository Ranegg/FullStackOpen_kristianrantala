import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    console.log('Headerin props:', props)
    return (
        <div>
            {props.courses.map((course, i) => {
            return (
                <h2 key={course.parts[i].id}>{course.name}</h2>)}
            )
        }
        </div>
    )
}

const Part = (props) => {
    console.log('Partin props:', props)
    return (
        <div>
            {props.course.map((course, i) => 
                <p key={course.parts[i].id}>{course.parts[i].name} {course.parts[i].exercises}</p>)}
        </div>
    )
}

const Content = (props) => {
    console.log('Contentin props:', props)
    return (
        <div>
           <Part course={props.course} />
        </div>
    )
}

const Total = (props) => {
    console.log('Totalin props:', props)
    return (
        <p>
            <strong>total of {props.courses.reduce((acc, courses) => acc + courses.parts.exercises, 0)}</strong>
        </p>
    )
}

const Course = (props) => {
    console.log('Coursen props:', props)
    return (
        <div>
            <Header courses={props.courses} />
            <Content course={props.courses[0]} />
            <Total courses={props.courses} />
        </div>
    )
}

const Courses = (props) => {
    console.log('Coursesin props:', props)
    return (
        <div>
            <Course courses={props.courses} />
        </div>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id:2
                },
                {
                    name: 'State of component',
                    exercises: 14,
                    id: 3
                }
            ]
        },
        {
            name: 'Node.js',
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]
    console.log('App toimii')
    return (
        <div>
            <h1>Web development curriculum</h1>
            <Courses courses={courses}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

