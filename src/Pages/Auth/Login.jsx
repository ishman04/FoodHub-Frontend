import { useState } from "react"
import { login } from "../../Redux/Slices/AuthSlice";
import LoginPresentation from "./LoginPresentation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Form validation
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill in all fields");
            return;
        }
        if(!loginData.email.includes('@') || !loginData.email.includes('.')) {
            toast.error("Invalid email address")
            return;
        }

        const apiResponse = await dispatch(login(loginData));
            
        console.log("Api response", apiResponse);
        if (apiResponse?.payload?.data) {
            navigate('/');
        }
    }

    return (
        <LoginPresentation 
            handleFormSubmit={handleFormSubmit} 
            handleUserInput={handleUserInput} 
        />
    );
}

export default Login;