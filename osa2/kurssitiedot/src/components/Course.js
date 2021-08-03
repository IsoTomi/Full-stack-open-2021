import React from 'react';

// Header-component
const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  // Total-component
  const Total = ({ course }) => {
    const reducer= (acc, cur) => {
      return acc + cur.exercises;
    }
  
    const sum = course.parts.reduce(reducer, 0);
    
    return(
      <p><strong>Number of exercises {sum}</strong></p>
    ) 
  }
  
  // Part-component
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  // Content-component
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(i => <Part part={i} key={i.id} />)}
      </div>
    )
  
  }
  
  // Course-component
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course;