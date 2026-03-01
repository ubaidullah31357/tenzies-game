import { useState, useRef } from "react"
import Dice from "./dice-tenzies"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App () {
    
    function allNewDice () {
        return new Array (10)
        .fill (0)
        .map (() => ({
                value: Math.ceil (Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            }))
        }
        
        const [arrayOfDie, setArrayOfDie] = useState (() => allNewDice())

        const focusNewGame = useRef (null)
        if (arrayOfDie.every (die => die.isHeld) && arrayOfDie.every (die => die.value === arrayOfDie[0].value)) {
            var gameWon = true
            focusNewGame.current.focus()
        }
    let array = arrayOfDie.map (dieObj => <Dice 
        key={dieObj.id}
        value={dieObj.value} 
        isHeld={dieObj.isHeld}
        hold={() => {hold(dieObj.id)}}
        />)
        
        
        function rollDice () {
        if (gameWon) {
            setArrayOfDie (allNewDice())
        } else {
            setArrayOfDie (prevData => prevData.map ((singleDie) => {
                return singleDie.isHeld ? singleDie : {...singleDie, value: Math.ceil (Math.random() * 6)}
            }))
        }
    }
    
    function hold (id) {
            setArrayOfDie (prevData => prevData.map ((singleDie) => {
            return singleDie.id === id ? {...singleDie, isHeld: !singleDie.isHeld} : singleDie
        }))
    }

    return (
        <>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <header id="header-section">
                <h1 id="heading">Tenzies</h1>
            </header>
            <main id="main">
                <p id="main-para">Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
                <div id="buttons-section">
                    {array}
                </div>
            <button ref={focusNewGame} id="roll-btn" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
            </main>
        </>
    )
}