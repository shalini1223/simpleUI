import React, { useState, useEffect } from "react";

function Display(props) {
  return <h2>Welcome, {props.name}! Count: {props.count}</h2>;
}

function Simple() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");

  useEffect(() => {
    console.log("Count updated:", count);
  }, [count]); // Runs when `count` changes

  return (
    <div>
      <Display name={name} count={count} /> {/* Pass props */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setName(name === "John" ? "Doe" : "John")}>
        Toggle Name
      </button>
    </div>
  );
}

export default Simple;
