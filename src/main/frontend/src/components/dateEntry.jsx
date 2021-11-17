function DateEntry(props) {

    function handleChange(event) {
        let dateTime = event.target.value;
        props.getDate(dateTime);
    }

    function trimDate(dateString) {
        if(props.currentDate) {
            return dateString.split(".")[0];
        }
    }
    
    return (
        <form action="">
            <input onChange={handleChange} type="datetime-local" name="game-time" min="2018-06-07T00:00" max="2025-06-14T00:00" value={trimDate(props.currentDate)}/>
        </form>
    )
}
export default DateEntry;