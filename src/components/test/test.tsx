import { count } from "console";
import { useReducer } from "react";

type CounterTtpe = {
  count: number;
}
type  ActionProps = {
  type: "increament" | "decrement" | "refresh";
  payload?: number;
}
const unitializerArg = { count: 0 };

function  riducer(state: CounterTtpe, action: ActionProps) {
  switch (action.type) {
    case "increament":
      return { count: state.count + (action.payload || 0) };
    case "decrement": 
    return { count: state.count - (action.payload || 0 )};
    case "refresh": 
    return { count: 0 }
    default : return state
  }
}

const Test = () => {
  const [state, dispatch] = useReducer(riducer, unitializerArg);
  return (
    <div>
      <p>count: {state.count}</p>
      <button onClick={() => dispatch({type: "increament", payload: 1 })}>+</button>
      <button onClick={() => dispatch({type: "decrement", payload: 1 })}>-</button>
      <button onClick={() => dispatch({type: "refresh", payload: 0 })}>refresh</button>
    </div>
  )
}

export default Test