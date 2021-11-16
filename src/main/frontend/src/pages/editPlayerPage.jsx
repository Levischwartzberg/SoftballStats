import { useParams } from 'react-router-dom';
import EditPlayerForm from '../components/editPlayerForm';

function EditPlayerPage() {
    const { id } = useParams();

    return (
        <EditPlayerForm playerId={id}></EditPlayerForm>
    )
}
export default EditPlayerPage;