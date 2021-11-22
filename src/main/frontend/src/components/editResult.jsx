import { useEffect, useState } from "react";
import DateEntry from "./dateEntry";

function EditResult(props) {
    const [result, setResult] = useState({});
    const [scoreObj, setScoreObj] = useState({runsFor: 0, runsAgainst: 0});

    useEffect(() => {
        setResult(props.result);
        setScoreObj(parseScoreObj(props.result));
    },[])

    function handleChange(event) {
        console.log(event.target.value);
		const { name, value } = event.target;
		setScoreObj({ ...scoreObj, [name]: value });
	}

    useEffect(() => {
        update();
    },[scoreObj])

    useEffect(() => {
        console.log(result);
        if(result.id) {
            props.setResult(result);
        }
    },[result])

    function calculateDecision(runsFor, runsAgainst) {
        let previousResult = {...result};
        if(runsFor > runsAgainst) {
            let score = runsFor + "-" + runsAgainst;
            previousResult.result = "Win";
            previousResult.score = score;
            setResult(previousResult);
        } else if (runsFor < runsAgainst) {
            let score = runsAgainst + "-" + runsFor;
            previousResult.result = "Loss";
            previousResult.score = score;
            setResult(previousResult);
        } else {
            let score = runsAgainst + "-" + runsFor;
            previousResult.result = "Tie";
            previousResult.score = score;
            setResult(previousResult);
        }
    }

    function update() {
        if(scoreObj.runsFor && scoreObj.runsAgainst) {
            calculateDecision(parseInt(scoreObj.runsFor), parseInt(scoreObj.runsAgainst))
        }
    }

    function parseScoreObj(result) {
        let score;
        if(result.result === "Win") {
            score = {   
                runsFor: result.score.split("-")[0],
                runsAgainst: result.score.split("-")[1]
            }
        } else if (result.result === "Loss") {
            score = {   
                runsFor: result.score.split("-")[1],
                runsAgainst: result.score.split("-")[0]
            }
        } else {
            score = {   
                runsFor: result.score.split("-")[0],
                runsAgainst: result.score.split("-")[1]
            }
        }
        return score;
    }

    function setDate(dateString) {
        let resultCopy = {...result};
        resultCopy.date = dateString;
        setResult(resultCopy);
    }
    
    return (
        <div className="result-form">
            <form action="">
                <label htmlFor="runsFor">
                    <span style={{fontWeight: "bold"}}> Runs For: </span>
                    <input type="number" value={scoreObj.runsFor} onChange={handleChange} name="runsFor"/>
                </label>
                <label htmlFor="runsAgainst">
                    <span style={{fontWeight: "bold"}}> Runs Against: </span>
                    <input type="number" value={scoreObj.runsAgainst} onChange={handleChange} name="runsAgainst"/>
                </label>
                <br/>
                <label htmlFor="dateEntry">
                    <span style={{fontWeight: "bold"}}> Date: </span>
                    <DateEntry name="dateEntry" getDate={setDate} currentDate={result.date}></DateEntry>
                </label>
            </form>
        </div>
    )
}
export default EditResult;