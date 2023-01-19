import './TextBox.scss';

function TextBox({ className, ...rest }) {
	return <textarea className={`text-area ${className}`} {...rest} />;
}

export default TextBox;
