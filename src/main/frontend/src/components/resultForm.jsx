import React, { useEffect, useState } from 'react';

function ResultForm() {
    const [resultObj, setResultObj] = useState({});
    const [scoreObj, setScoreObj] = useState({});

    function handleChange(event) {
        console.log(event.target.value);
		const { name, value } = event.target;
		setScoreObj({ ...scoreObj, [name]: value });
        update();
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

    function tester() {
        update();
        console.log(resultObj);
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
            </form>
            <button onClick={tester}>tester</button>
        </div>
    )
}
export default ResultForm;