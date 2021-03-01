import React, { useEffect, useState } from 'react'
import '../styles/Task.scss'

const Carousel = (props) => {
    const {children} = props
    const [index, setIndex] = useState(0) //sakotnejais kartas numurs
    const [length, setLength] = useState(children.length) //kopejais attelu skaits virknee
    const [pos, setPos] = useState(0)
    const [move, setMove] = useState(0)
    const [recent, setRecent] = useState(0)
    const [com, setCom] = useState(0)

    //variable, lai dabutu selektoru vertibas
    const numberList = Array.from(Array(length).keys())

    //useEffect seit ir nepieciesams, lai noteiktu cik tad attelu buus un
    //ieliktu to skaitu kaa state
    useEffect(() => {
        setLength(children.length)
    }, [children])
    //pogu funcijas next un previous, kad desctop variantaa taas paraadisies
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
        const currentTouch = e.touches[0].clientX
        const swipeLenght = pos - currentTouch
        setMove(swipeLenght.toFixed(0))
            if(move === 0 && pos === 0) {
                return
            }
        const common = parseInt(recent) + parseInt(move)
        setCom(common)
    }
    console.log(index)
    const Selector = () => {
        return (
            <div className='selectors-wrapper'>
                {numberList.map( i => {
                    return <div className='selectors' key={i}>
                        <div className={'rounds'} 
                            value={i}
                            onClick={()=> {
                                setPos(0)
                                setMove(0)
                                setIndex(i)
                                setRecent(0)
                            }}
                            data-quotes={i}
                            />
                    </div>
                })}
            </div>
        )
    }
    //lai turpinaatu svaipu, seit buus funkcija par ieprieksejo poziciju
    const defineRecent = (e) => {
        const touchDown = e.changedTouches[0].clientX
        const diference = pos - touchDown
        setRecent(prevState => prevState + diference)
    }
    //common variable tiks izmantojama jau renderaa pie stila translateX
    const common = parseInt(recent) + parseInt(move)
    console.log(common)
    return (
        <React.Fragment>
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    <button id='left' onClick={previous} className="left-arrow">&lt;</button>
                    <div className="carousel-content-wrapper"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={defineRecent}
                        >
                            <div className="carousel-content"
                                style={move === 0 ? 
                                            { transform: `translateX(-${index * 100}%)`} : 
                                            { transform: `translateX(-${com*2}px)`}
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
