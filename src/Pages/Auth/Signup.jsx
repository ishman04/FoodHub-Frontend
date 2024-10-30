import { useState } from "react";
import { Link } from "react-router-dom"
import toast from "react-hot-toast";
import SignupPresentation from "./SignupPresentation";

function Signup(){
    const [signUpState, setSignUpState] = useState({
        firstName: '',
        email: '',
        mobileNumber: '',
        password: ''
    });
    function handleUserInput(e){
        // stores value of name attribute and input value
        const {name,value} = e.target
        setSignUpState({
            ...signUpState,
            [name] : value
        })
    }

    function handleFormSubmit(e){
        e.preventDefault(); //prevent form from reloading the page
        console.log(signUpState);

        if(!signUpState.email || !signUpState.mobileNumber || !signUpState.firstName || !signUpState.password){
            toast.error("Missing values in form")
            return;
        }
        if(signUpState.firstName.length<5 || signUpState.firstName.length>20){
            toast.error("First name should contain atleast 5 and at max 20 characters")
        }
        if(!signUpState.email.includes('@') || !signUpState.email.includes('.')){
            toast.error("Invalid email address")
        }
    }
    return(
        <>
            <SignupPresentation handleFormSubmit={handleFormSubmit} handleUserInput={handleUserInput} />
        </>
        
    )
    
}


export default Signup