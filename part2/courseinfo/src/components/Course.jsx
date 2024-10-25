const CourseHeader = ({name}) => {
  return(
    <h2>{name}</h2>
  )
}

const Part = ({name, exercises}) => {
  return(
    <p>{name} {exercises}</p>
  )
}

const Content = ({parts}) => {
  return(
    <>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </>
  )
}

const Total = ({parts}) => {
  const totalExcercises = parts.reduce((total, part) => total + part.exercises, 0);

  return(
    <p style={{ fontWeight: 'bold' }}>total of {totalExcercises} exercises</p>
  )
}

const Course = ({course}) => {
  return(
    <>
      <CourseHeader name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default Course