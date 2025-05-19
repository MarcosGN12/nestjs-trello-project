import { useNavigate } from 'react-router-dom';

export function useLogout() {
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate('/login');
    }

    return { logout };
}