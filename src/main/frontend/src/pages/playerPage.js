import PlayerGameLog from "../components/playerGameLog";
import PlayerBio from "../components/playerBio";
import { useParams } from 'react-router-dom';

function PlayerPage() {
    const { id } = useParams();

    return (
        <div>
            <PlayerBio playerId={id}></PlayerBio>
            <PlayerGameLog playerId={id}></PlayerGameLog>
        </div>
    )
}

export default PlayerPage;