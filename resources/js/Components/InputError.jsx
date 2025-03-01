export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-xs text-red-500 ' + className}
        >
            {message}
        </p>
    ) : null;
}
