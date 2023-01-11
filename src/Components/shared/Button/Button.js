import './Button.scss';

function Button({ label, className, ...rest }) {
	return (
		<button className={`button ${className}`} {...rest}>
			{label}
		</button>
	);
}

export default Button;
