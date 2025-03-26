interface ButtonProps {
    item: string;
    type: string;
    onClick: (item: string, type: string) => void;
}

const Button = (props: ButtonProps) => {
    return (
        <div>
            <button onClick={() => props.onClick(props.item, props.type)}>
                {props.item}
            </button>
        </div>
    );
};

export default Button;