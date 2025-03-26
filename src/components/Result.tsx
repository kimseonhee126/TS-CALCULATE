import './Result.css';

interface ResultProps {
    value: number;
    flag: boolean;
}

const Result = (props: ResultProps) => {
    if (!props.flag) {
        return null;
    }

    return (
        <div className="result-container">
            {props.value}
        </div>
    )
};

export default Result;
