import "./App.css";
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState("6");
  const [numberAllowed, setNumberAllowed] = useState("false");
  const [charAllowed, setCharAllowed] = useState("false");
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&.,_-";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }
    setPassword(password);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="App">
      <div className="main">
        <input
          type="text"
          placeholder="password"
          value={password}
          className="inpt"
          readOnly
          ref={passwordRef}
        />
        <button className="copy-btn" onClick={copyPassword}>
          Copy
        </button>
        <div className="lower-div">
          <div className="length-div">
            <input
              type="range"
              min={6}
              max={20}
              className="length-inp"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">Length {length}</label>
          </div>
          <div className="isNum-div">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              className="num-inp"
              onChange={() => {
                setNumberAllowed((preValue) => !preValue);
              }}
            />
            <label htmlFor="">Number</label>
          </div>
          <div className="isChar-div">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className="char-inp"
              onChange={() => {
                setCharAllowed((preValue) => !preValue);
              }}
            />
            <label htmlFor="">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
