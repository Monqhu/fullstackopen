const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const parts1 = props.parts[0];
  const parts2 = props.parts[1];
  const parts3 = props.parts[2];

  return(
    <>
      <Part name={parts1.name} exercises={parts1.exercises} />
      <Part name={parts2.name} exercises={parts2.exercises} />
      <Part name={parts3.name} exercises={parts3.exercises} />
    </>
  )
}

const Part = (props) => {  
  const {name, exercises} = props;

  return(
    <>
      <h2>{name}</h2>
       <p>ejercicios de este bloque: {exercises}</p>
    </>
  )
}

const Total = (props) => {
  const totalExercises = props.totalExercises;
  return(
    <h3>Total de ejercicios: {totalExercises}</h3>
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
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
}

export default App