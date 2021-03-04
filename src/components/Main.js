import React, { useEffect, useState } from 'react'
import '../styles/Task.scss'

function Main(props) {
  const { children } = props;
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [position, setPosition] = useState(0);
  const [move, setMove] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [recentPosition, setRecentPosition] = useState(0);
  const [com, setCom] = useState(0);

  let common = parseInt(recentPosition) + parseInt(move);
  const numberList = Array.from(Array(length).keys());

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    
    setMove(0) 
    if (index < length - 1) {
      setIndex((prevState) => prevState + 1);
    }

    if (index === length - 1) {
      setIndex(0);
    }
  };

  const previous = () => {
    setMove(0)
    if (index > 0) {
      setIndex((prevState) => prevState - 1);
    }

    if (index === 0) {
      setIndex(length - 1);
    }
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const currentTouch = e.touches[0].clientX;
    const swipeLenght = position - currentTouch;
    setMove(swipeLenght.toFixed(0));
    if (move === 0 && position === 0) {
      return;
    }
    setCom(common);
  };
  const Selector = () => {
    return (
      <div className="selectors-wrapper">
        {numberList.map((i) => {
          return (
            <div className="selectors" key={i}>
              <div
                className={"rounds"}
                value={i}
                onClick={() => {
                  setPosition(0);
                  setMove(0);
                  setIndex(i);
                  setRecentPosition(parseInt(i * 200));
                }}
                data-quotes={i}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const handleDefineRecent = (e) => {
    const touchDown = e.changedTouches[0].clientX
    const diference = position - touchDown
    setRecentPosition((prevState) => prevState + diference)
  };

  const gestureStart = (e) => {
    const start = e.clientX;
    setPosition(start);
    setClicked(true);
  };

  const gestureMove = (e) => {
    if (clicked) {
      const start = e.clientX;
      const lenght = position - start;
      setMove(lenght.toFixed(0));
      setCom(common);
    } 
  };

  const gestureEnd = (e) => {
    const recent = e.clientX
    const diference = position - recent
    setRecentPosition((prevState) => prevState + diference)
    setClicked(false);
  };

  const preventDrag = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <Selector />
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <button id="left" onClick={previous} className="left-arrow">
            &lt;
          </button>
          <div
            className="carousel-content-wrapper"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDefineRecent}
            onMouseDown={gestureStart}
            onMouseMove={gestureMove}
            onMouseUp={gestureEnd}
            onDragStart={preventDrag}
          >
            <div
              className="carousel-content"
              style={
                move === 0 
                  ? { transform: `translateX(-${index * 100}%)` }
                  : { transform: `translateX(-${com * 2}px)` }
              }
            >
              {children}
            </div>
          </div>
          {
            <button id="right" onClick={next} className="right-arrow">
              &gt;
            </button>
          }
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
