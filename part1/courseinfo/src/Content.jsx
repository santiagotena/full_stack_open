import Part from './Part'

const Content = (props) => {
	return (
		<>
			<Part part={props.parts[0]} exercises={props.exercises[0]} />
			<Part part={props.parts[1]} exercises={props.exercises[1]} />
			<Part part={props.parts[2]} exercises={props.exercises[2]} />
		</>
	)
}

export default Content