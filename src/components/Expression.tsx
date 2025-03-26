import './Expression.css'

interface ExpressionProps {
    value: string;
}

const Expression = (props: ExpressionProps) => {
    return (
        <div className="expression-container">
            {props.value}
        </div>
    )
};

export default Expression;
