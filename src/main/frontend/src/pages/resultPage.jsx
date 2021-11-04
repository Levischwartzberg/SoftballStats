import { useParams } from 'react-router-dom';
import Boxscore from '../components/boxscore';

function ResultPage() {
    const { id } = useParams();
    
    return (
        <div>
            <Boxscore resultId={id}></Boxscore>
        </div>
    )
}
export default ResultPage;