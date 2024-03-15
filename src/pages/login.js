import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');

    const handleLogin = async () => {
        if (!username || !password || !accountType) {
            alert("All fields must contain a value to login");
            return null;
        }
    
        const headers = {
            'Content-Type': 'application/json'
        };
        const requestBody = {
            'username': username,
            'password': password,
            'account-type': accountType
        };
    
        try {
            const response = await fetch("http://13.40.187.160:8000/login", {
                mode: 'no-cors',
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });
    
            // Check if the response status is OK (status code 2xx)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Parse the JSON response
            const responseData = await response.json();
    
            console.log(responseData);
    
            if (responseData.message === "Account Found") {
                console.log('Login successful');
                // console.log(responseData["user-id"])
                // Note: Assuming navigate is defined elsewhere
                const userID = responseData["user-id"]
                const navigationString = '/viewBooking?userID=' + userID
                navigate("/viewBooking", {state: {data: responseData["properties"], userType: accountType}})
                // navigate(navigationString);
            } else {
                console.error('Login failed');
                console.log(responseData);
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
        }
    };
    
    
    
    

    const handleCreateAccount = () => {
        // Use the 'username' and 'password' values for account creation logic
        navigate('/createAccount');
    };
        

    return (
        <div className="Login">
        <h2>Welcome to Wagg.ly</h2>
        <form>
            <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>

            <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor='Account Type'>AccountType </label>
                <select name="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                    <option value="">Select Account Type</option>
                    <option value="walker">walker</option>
                    <option value="pet">pet</option>
                </select>
            </div>
            <div>
            <button type="button" onClick={handleLogin}>
                Login
            </button>

            <button type="button" onClick={handleCreateAccount}>
                Create Account
            </button>
            </div>
        </form>
        </div>
    );
}

export default Login;
