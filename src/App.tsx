import React, { useReducer, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Expression from "./components/Expression";
import Result from "./components/Result";

type Action =
  | {
      type: "INPUT";
      data: number;
    }
  | {
      type: "PLUS";
    }
  | {
      type: "MINUS";
    }
  | {
      type: "MULTIPLY";
    }
  | {
      type: "DIVIDE";
    }
  | {
      type: "EVALUATE";
    }
  | {
      type: "CLEAR";
    };

let current = 0;
let operator: "PLUS" | "MINUS" | "MULTIPLY" | "DIVIDE" | null = null;

function reducer(state: number, action: Action) {
  switch (action.type) {
    case "INPUT":
      return state * 10 + action.data;

    case "PLUS":
    case "MINUS":
    case "MULTIPLY":
    case "DIVIDE":
      current = state;
      operator = action.type;
      return 0;

    case "EVALUATE":
      if (!operator) return state;
      switch (operator) {
        case "PLUS":
          return current + state;
        case "MINUS":
          return current - state;
        case "MULTIPLY":
          return current * state;
        case "DIVIDE":
          return current / state;
      }
      break;

    case "CLEAR":
      current = 0;
      operator = null;
      return 0;

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, 0);
  const [expression, setExpression] = useState("");

  // true 면 결과 보여주기
  const [resultFlag, setResultFlag] = useState(false);

  const buttons = [
    { item: "1", type: "INPUT" },
    { item: "2", type: "INPUT" },
    { item: "3", type: "INPUT" },
    { item: "4", type: "INPUT" },
    { item: "5", type: "INPUT" },
    { item: "6", type: "INPUT" },
    { item: "7", type: "INPUT" },
    { item: "8", type: "INPUT" },
    { item: "9", type: "INPUT" },
    { item: "+", type: "PLUS" },
    { item: "-", type: "MINUS" },
    { item: "x", type: "MULTIPLY" },
    { item: "/", type: "DIVIDE" },
    { item: "=", type: "EVALUATE" },
    { item: "CLEAR", type: "CLEAR" },
  ];

  const convertOperatorToSymbol = (type: string) => {
    switch (type) {
      case "PLUS":
        return "+";
      case "MINUS":
        return "-";
      case "MULTIPLY":
        return "×";
      case "DIVIDE":
        return "÷";
      default:
        return "";
    }
  };

  const onClickButton = (item: string, type: string) => {
    if (type === "INPUT") {
      dispatch({
        type: "INPUT",
        data: Number(item),
      });
      setExpression((prev) => prev + item);
      setResultFlag(false);
    } else if (type === "EVALUATE") {
      dispatch({
        type: "EVALUATE",
      });
      setExpression("");
      setResultFlag(true);
    } else if (
      type === "PLUS" ||
      type === "MINUS" ||
      type === "MULTIPLY" ||
      type === "DIVIDE"
    ) {
      dispatch({ type });
      const operatorSymbol = convertOperatorToSymbol(type);
      setExpression((prev) => prev + " " + operatorSymbol + " ");
      setResultFlag(false);
    } else if (type === "CLEAR") {
      dispatch({
        type: "CLEAR",
      });
      setResultFlag(false);
    }
  };

  return (
    <>
      <div className="App">
        <h2 className="title">미니 프로젝트 : 계산기</h2>

        <div className="calculator-container">
          {buttons.map((button) => (
            <Button
              key={button.item}
              item={button.item}
              type={button.type}
              onClick={onClickButton}
            />
          ))}
        </div>

        <Expression value={expression} />

        <Result value={state} flag={resultFlag} />
      </div>
    </>
  );
}

export default App;
