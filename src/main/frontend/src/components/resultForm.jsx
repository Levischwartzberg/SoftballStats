import React, { useEffect, useState } from 'react';
import DateEntry from './dateEntry';

function ResultForm(props) {
    const [resultObj, setResultObj] = useState({});
    const [scoreObj, setScoreObj] = useState({});
    const [dateTime, setDateTime] = useState({});

    useEffect(() => {
        console.log("test")
        props.setResult(resultObj);
    },[resultObj])

    useEffect(() => {
        update();
    },[scoreObj])

    function handleChange(event) {
        console.log(event.target.value);
		const { name, value } = event.target;
		setScoreObj({ ...scoreObj, [name]: value });
	}

    function calculateDecision(runsFor, runsAgainst) {
        if(runsFor > runsAgainst) {
            let score = runsFor + "-" + runsAgainst;
            setResultObj({
                result: "Win",
                score: score
            });
        } else if (runsFor < runsAgainst) {
            let score = runsAgainst + "-" + runsFor;
            setResultObj({
                result: "Loss",
                score: score
            });
        } else {
            let score = runsAgainst + "-" + runsFor;
            setResultObj({
                result: "Tie",
                score: score
            });
        }
    }

    function update() {
        if(scoreObj.runsFor && scoreObj.runsAgainst) {
            calculateDecision(parseInt(scoreObj.runsFor), parseInt(scoreObj.runsAgainst))
        }
    }

    function setDate(dateString) {
        let resultObjCopy = {...resultObj};
        resultObjCopy.date = dateString;
        setResultObj(resultObjCopy);
    }

    return (
        <div>
            <form action="">
                <label htmlFor="runsFor">
                    Runs For
                    <input type="number" placeholder="0" onChange={handleChange} name="runsFor"/>
                </label>
                <label htmlFor="runsAgainst">
                    Runs Against
                    <input type="number" placeholder="0" onChange={handleChange} name="runsAgainst"/>
                </label>
                <DateEntry getDate={setDate}></DateEntry>
            </form>
        </div>
    )
}
export default ResultForm;