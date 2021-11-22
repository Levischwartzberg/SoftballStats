function ResultDescription(props) {

    function convertDateTime(dateTime) {
        if(dateTime) {
            return dateTime.split("T")[0] + " " + dateTime.split("T")[1].split(".")[0];
        }
        return null;
    }

    return (
        <div>
            <h4 style={{textAlign: "left"}}> 
                <span style={{fontWeight: "bold"}}> Game Date: </span> {convertDateTime(props.result.date)}
            </h4>
            <h4 style={{textAlign: "left"}}> 
                <span style={{fontWeight: "bold"}}> Result: </span> {props.result.result + " " + props.result.score}
            </h4>
        </div>
    )
}
export default ResultDescription;