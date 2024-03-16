export const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
    </div>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((curso) => (
        <Part key={curso.id} name={curso.name} exercises={curso.exercises} />
      ))}

      <Total course={course} />
    </>
  );
};

const Total = ({ course }) => {
  const total = course.parts
    .map((p) => p.exercises)
    .reduce((prev, next) => prev + next, 0); // Añade el valor inicial 0 al reduce

  return (
    <p>
      <strong>Total exercises: {total}</strong>
    </p>
  );
};
