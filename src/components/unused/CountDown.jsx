import React, { useEffect, useState } from "react";

// let hrsLeft;
// let minLeft;
// let secLeft;
// let hrsText;
// let minText;
// let secText;

const CountDown = ({ expiryDate }) => {
  const [timeToShow, setTimeToShow] = useState("");
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    calcTime();
    
    const intervalId=setInterval(() => {
        calcTime();
    }, 1000);

    setIntervalId(intervalId);

    return () => {
        clearInterval(intervalId);
    }
  }, []);

  function calcTime() {


    const millisLeft = expiryDate - Date.now();

    if (millisLeft < 0) {
      clearInterval(intervalId);
      setTimeToShow("EXPIRED");
      return;
    }
    const secLeft = millisLeft / 1000;
    const minLeft = secLeft / 60;
    const hrsLeft = minLeft / 60;
    const secText = Math.floor(secLeft) % 60;
    const minText = Math.floor(minLeft) % 60;
   const hrsText = Math.floor(hrsLeft);
  }

  setTimeToShow(`${hrsText}h ${minText}m ${secText}s`);


  return <div className="de_countdown">{timeToShow}</div>;
};

export default CountDown;

//   console.log(millisLeft)
//   console.log(secLeft)
//   console.log(minLeft)
//   console.log(hrsLeft)
//   console.log(secText)
//   console.log(minText)
//   console.log(hrsText)

//   secLeft = Math.floor(millisLeft / 1000);
//   minLeft = Math.floor(secLeft / 60);
//   hrsLeft = Math.floor(minLeft / 60);
// console.log(millisLeft/1000/60/60)

//   {hrsText}h {minText}m {secText}s
