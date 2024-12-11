import React , {useState} from 'react';

const Counter=()=>{
//declare state variable 'count' and function to update it
const [count, setCount] = useState(0);

const Increment =() =>{
setCount(count + 1);
};
const decrement = () =>{
setCount (count -1);
};
return(
    <div>
        <h1>Basic functional</h1>
        <h2>Counter : {count}</h2>
        <button onClick={Increment}>+</button>
        <button onClick={decrement}>-</button>
    </div>
);
};

export default Counter;
