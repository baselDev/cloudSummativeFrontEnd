import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
function SignUpForm() {
    const initialFormData = {
        accountType: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        petName: '',
        petType: '',
    };
    
    // Get the navigator
    const navigate = useNavigate();
    const [formMessage, setFormMessage] = useState(null);
    // State to hold form data
    const [formData, setFormData] = useState({
        accountType: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        petName: '',
        petType: '',
    });

    const returnScreen = (e) => {
        navigate("/")
    }

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formCompleted = true;

        if (!formData.accountType || !formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
            alert("All fields must have a value");
            formCompleted = false;
        }

        if (formData.accountType === "Pet" && (!formData.petName || !formData.petType)) {
            alert("All fields must have a value");
            formCompleted = false;
        }

        if (formCompleted) {
            try {
                const response = await fetch('https://myapp-izysq3kmoa-uc.a.run.app/createAccount', {
                    mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                if (result.Message === "Account Created") {
                    setFormMessage("Account has been created!");
                    setFormData(initialFormData)
                }

                // Handle the result if needed

            } catch (err) {
                console.error(err);
                // Handle error appropriately
            }
        }
    };





    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type='button'  onClick={returnScreen} > Return</button>
                <label>
                    Account Type:
                    <select name="accountType" onChange={handleInputChange} value={formData.accountType}>
                        <option value="">Select Account Type</option>
                        <option value="Walker">Walker</option>
                        <option value="Pet">Pet</option>
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Name:
                    <input type="text" name="name" onChange={handleInputChange} value={formData.name} />
                </label>
            </div>

            <div>
                <label>
                    Email:
                    <input type="email" name="email" onChange={handleInputChange} value={formData.email} />
                </label>
            </div>

            <div>
                <label>
                    Phone Number:
                    <input type="tel" name="phoneNumber" onChange={handleInputChange} value={formData.phoneNumber} />
                </label>
            </div>

            <div>
                <label>
                    Password:
                    <input type="password" name="password" onChange={handleInputChange} value={formData.password} />
                </label>
            </div>

            {formData.accountType === 'Pet' && (
                <div>
                    <label>
                        Pet Name:
                        <input type="text" name="petName" onChange={handleInputChange} value={formData.petName} />
                    </label>
                </div>
            )}

            {formData.accountType === 'Pet' && (
                <div>
                    <label>
                        Pet Type:
                        <select name="petType" onChange={handleInputChange} value={formData.petType}>
                            <option value="">Select Pet Type</option>
                            <option value="GermanShepherd">German Shepherd</option>
                            <option value="Bulldog">Bulldog</option>
                            <option value="GoldenRetriever">Golden Retriever</option>
                            <option value="Husky">Husky</option>
                        </select>
                    </label>
                </div>
            )}

            <div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                {formMessage && (
                    <div>
                        <p>{formMessage}</p>
                    </div>
                )}
            </div>
        </form>
        
    );
};

export default SignUpForm;
