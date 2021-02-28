import React, { useEffect, useState } from 'react'
import '../styles/Task.scss'

const Carousel = (props) => {
    const {children} = props
    const [index, setIndex] = useState(0) //sakotnejais kartas numurs
    const [length, setLength] = useState(children.length) //kopejais attelu skaits virknee
    const [pos, setPos] = useState(null)
    const [move, setMove] = useState(null)
    

    const numberList = Array.from(Array(length).keys())

    //useEffect seit ir nepieciesams, lai noteiktu cik tad attelu buus un
    //ieliktu to skaitu kaa state
    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (index < (length - 1)) {
            setIndex(prevState => prevState + 1)
        }
        //nakama funcija lai butu infinite loop
        if (index === (length - 1)) {
            setIndex(0)
        }
    }

    const previous = () => {
        if (index > 0) {
            setIndex(prevState => prevState - 1)
        }
        //seit funkcija lai butu infinite loop ejot atpakal
        if (index === 0) {
            setIndex(length - 1)
        }
    }

    //sakuma pozicija pieskarienam
    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setPos(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = pos
        
            if(move === null && touchDown === null) {
                return
            }

        const currentTouch = e.touches[0].clientX
        const swipeLenght = touchDown - currentTouch
        setMove(swipeLenght.toFixed(1))
        
            if (move === null && swipeLenght > 6) {
                next()
            }
            if (move === null && swipeLenght < -6) {
                previous()
            }
        setPos(null)
    }
    console.log(move)
    const Selector = () => {
        return (
            <div className='selectors-wrapper'>
                {numberList.map( i => {
                    return <div className='selectors' key={i}>
                        <div className={'rounds'} 
                            value={i}
                            onClick={()=> {
                                setPos(null)
                                setMove(null)
                                setIndex(i)
                                
                            }}
                            data-quotes={i}
                            />
                    </div>
                })}
            </div>
        )
    }
    //translateX(-${move}px)
//console.log(numberList)
    return (
        <React.Fragment>
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    <button id='left' onClick={previous} className="left-arrow">&lt;</button>
                    <div className="carousel-content-wrapper"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}>
                            <div className="carousel-content"
                                style={move === null ? 
                                            { transform: `translateX(-${index * 100}%)`} : 
                                            { transform: `translateX(-${move}px)`}
                                            }> 
                                    {children}
                            </div>
                    </div>
                    {<button id='right' onClick={next} className="right-arrow">&gt;</button>}
                </div>
            </div>
            <Selector />
        </React.Fragment>
    )
}

export default Carousel