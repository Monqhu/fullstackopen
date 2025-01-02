

const Header = (props) => {
	return (
		<h1>{props.text}</h1>
	)
}

const Content = (props) => {
	const { content } = props
	return (
		<>
			{content.map((part, index) => (
				<Part part={part} key={index} />
			))}
		</>
	)
}

const Part = (props) => {
	const { name, exercises } = props.part
	return (
		<>
			<h3>{name}</h3>
			<p>number of exercises: {exercises}</p>
		</>
	)
}

const Total = (props) => {
	const { exercises } = props
	return (
		<>
			<h3>Ejercicios totales del curso: {exercises}</h3>
		</>
	)
}

const Course = (props) => {
	let arrayEjercicios = []
	let ejerciciosTotales = 0;

	//Rellenamos el array de ejercicios
	props.course.parts.forEach((element, index) => {
		arrayEjercicios.push(element.exercises);
	});

	//Sumamos los ejercicios
	ejerciciosTotales = arrayEjercicios.reduce((first, second) => {
		return first + second
	})

	return (
		<>
			<Header text={props.course.name} />
			<Content content={props.course.parts} />
			<Total exercises={ejerciciosTotales} />
		</>
	)
}

export default Course