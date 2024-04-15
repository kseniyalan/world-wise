import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BackButton() {
    const navigate = useNavigate();
    return (
        <Button styleClass="back" onClick={() => navigate(-1)}>&larr; Back</Button>
    );
}

export default BackButton;