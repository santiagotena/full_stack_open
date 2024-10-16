import Part from './Part'

const Content = (props) => {
	return (
		<div>
			<Part part={props.parts[0]} exercises={props.exercises[0]} />
			<Part part={props.parts[1]} exercises={props.exercises[1]} />
			<Part part={props.parts[2]} exercises={props.exercises[2]} />
		</div>
	)
}

export default Content