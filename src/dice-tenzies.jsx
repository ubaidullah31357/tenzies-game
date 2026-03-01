export default function Dice (props) {
    return (
        <button 
                className="die-btn" 
                style={{backgroundColor: props.isHeld ? "#59e391" : "#f0f0f0"}}
                onClick={props.hold}
                aria-pressed={props.isHeld}
                aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >{props.value}
        </button>
    )
} 