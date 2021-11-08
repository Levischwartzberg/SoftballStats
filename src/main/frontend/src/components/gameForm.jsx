import React, { useEffect, useState } from 'react';
import SeasonForm from './seasonForm';
import ResultForm from './resultForm';
import { Dropdown } from "react-bootstrap";
import API from "../utils/API";

function GameForm() {
    
    return (
        <div>
            <SeasonForm></SeasonForm>
            <ResultForm></ResultForm>
        </div>
    )
}
export default GameForm;