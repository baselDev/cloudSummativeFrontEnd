import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateBooking = () => {
    const location = useLocation();
    console.log(location.state.data)
    console.log("hello world")
    const [walkers, setWalkers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestUrl = "http://13.40.187.160:8000/getWalkers";
                const response = await fetch(requestUrl, {
                    mode: 'no-cors',
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setWalkers(responseData);  // Update state with fetched data
            } catch (error) {
                console.error('Error occurred fetching walkers:', error);
                alert('An error occurred when obtaining walkers. Please try again later.');
            }
        };

        fetchData();
    }, []);  // Add an empty dependency array to run the effect only once

    const [bookingFormData, setBookingFormData] = useState({
        address: '',
        startTime: '',
        endTime: '',
        walker: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if any field is empty
        if (Object.values(bookingFormData).some((value) => !value)) {
            alert('Please fill in all fields');
            return;
        }

        /*
        API SHIT TO SAVE booking DATA
        */
       const requestData = {
        "petName": location.state.data["pet_name"],
        "ownerName": location.state.data["owner_name"],
        "walker": bookingFormData.walker,
        "address": bookingFormData.address,
        "startTime": bookingFormData.startTime,
        "endTime": bookingFormData.endTime,
        "email": location.state.data["owner_email"],
        "phoneNumber": location.state.data["owner_phone_number"]
       }
       console.log(requestData)
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const response = await fetch("http://13.40.187.160:8000/addEvent", {
                mode: 'no-cors',
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            if (response.ok) {
                setBookingFormData({
                    ownerName: '',
                    address: '',
                    startTime: '',
                    endTime: '',
                    duration: '',
                    petName: '',
                    email: '',
                    phoneNumber: '',
                    walker: ''
                });
                alert("Booking succesful, please Log back in to view your events ")
                navigate("/")
                
            }

        } catch (error) {
            console.log("An Exception occured when creating an Event" + error)
            alert("Failed to create event, see logs")
            return null
        }




    };

    return (
        <div>
            <h2>Create Booking</h2>
            <form onSubmit={handleSubmit}>
                {/* <div>
                    <label htmlFor="ownerName">Owner Name:</label>
                    <input
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        value={bookingFormData.ownerName}
                        onChange={handleChange}
                    />
                </div> */}
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={bookingFormData.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={bookingFormData.startTime}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="endTime">End Time:</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        value={bookingFormData.endTime}
                        onChange={handleChange}
                    />
                </div>
                {/* <div>
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={bookingFormData.duration}
                        onChange={handleChange}
                    />
                </div> */}
                {/* <div>
                    <label htmlFor="petName">Pet Name:</label>
                    <input
                        type="text"
                        id="petName"
                        name="petName"
                        value={bookingFormData.petName}
                        onChange={handleChange}
                    />
                </div> */}
                {/* <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={bookingFormData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={bookingFormData.phoneNumber}
                        onChange={handleChange}
                    />
                </div> */}
                <div>
                    <label htmlFor="walker">Walker:</label>
                    <select
                        onChange={handleChange}
                        name="walker"
                        id="walker"
                        value={bookingFormData.walker}
                    >
                        <option value="">Select Walker</option>
                        {walkers.map((walker) => (
                            <option key={walker} value={walker}>
                                {walker}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateBooking;

