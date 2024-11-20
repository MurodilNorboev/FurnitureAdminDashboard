


import { useReducer } from "react";

const initialState = { count: 0 }; // count

function reducer(state, action) { // reducer bor 
  
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    case "refresh":
      return { count: 0 };
    default:
      return state; 
  }
}

const Tajriba = () => {
  const [state, dispatch] = useReducer(reducer, initialState); // count bilan reducer 

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment", payload: 1 })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 1 })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: "refresh" })}>
        Refresh
      </button>
    </div>
  );
}

export default Tajriba;


