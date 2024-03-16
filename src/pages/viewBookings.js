import React, { useState, useEffect } from 'react';
import "./viewBookings.css";
import { useNavigate, useLocation } from 'react-router-dom';

const ViewBookings = () => {
  // State to hold the events data
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const handleAddEvent = () => {
    const userData = location.state.data
    if (location.state.userType == "pet"){
      navigate("/addBooking", {state: {data: userData}});
    }
    else{
      alert("Only Pet Accounts Can Create New Events!")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestUrl = "https://myapp-izysq3kmoa-uc.a.run.app/viewEvents?id=" + location.state.data["user-id"] + "&userType=" + location.state.userType;
        const response = await fetch(requestUrl, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData)
        setEvents(responseData);
        setLoading(false); // Set loading to false after successfully fetching data
      } catch (error) {
        console.error('Error occurred setting events:', error);
        alert('An error occurred when obtaining events. Please try again later.');
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [location.state.id, location.state.userType]);

  return (
    <div>
      <div>
        <button onClick={handleAddEvent}>Add Booking</button>
      </div>
      <h2>Your Upcoming Bookings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="events-table">
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Owner Name</th>
              <th>Address</th>
              <th>Owner Phone number</th>
              <th>Owner Email</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.start_date_time}</td>
                <td>{event.end_date_time}</td>
                <td>{event.owner_name}</td>
                <td>{event.address}</td>
                <td>{event.owner_phone_number}</td>
                <td>{event.owner_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewBookings;
