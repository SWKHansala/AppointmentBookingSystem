import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const MyAppointments = () => {

  const { backendUrl, token, getDoctors } = useContext(AppContext)

  const [appointments,setAppointments] = useState([])
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+ " " + months[Number(dateArray[1])-1] + " " + dateArray[2]
  }

  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {

      const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {

      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId},{headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctors()
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        try {

          const {data} = await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }

        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  }
  
  const appointmentRazorpay = async (appointmentId) => {
    try {

      const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
      if (data.success) {
        initPay(data.order)
      }

    } catch (error) {
      
    }

  }

  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.specialization}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments

/* import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = ({ docId }) => {
  const { backendUrl, token } = useContext(AppContext);

  const [docData, setDocData] = useState(null);
  const [slotDate, setSlotDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  // Fetch doctor data
  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/${docId}`, {
        headers: { token },
      });

      if (data.success && data.doctor) {
        // Ensure slots_booked exists
        const doctor = data.doctor;
        if (!doctor.slots_booked) doctor.slots_booked = {};
        setDocData(doctor);
      } else {
        toast.error('Doctor data not found');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch doctor data');
    }
  };

  // Update available slots when slotDate changes
  useEffect(() => {
    if (!docData || !slotDate) {
      setAvailableSlots([]);
      return;
    }

    // Optional chaining to avoid crashes
    const slots = docData.slots_booked?.[slotDate] || [];
    setAvailableSlots(slots);
  }, [docData, slotDate]);

  useEffect(() => {
    if (docId && token) {
      getDoctorData();
    }
  }, [docId, token]);

  if (!docData) {
    return <p>Loading doctor data...</p>;
  }

  return (
    <div className="p-4 border rounded shadow-md">
      <div className="flex gap-4">
        <img
          src={docData?.image || '/placeholder.png'}
          alt={docData?.name || 'Doctor'}
          className="w-32 h-32 bg-gray-100 object-cover rounded"
        />
        <div>
          <h2 className="text-xl font-semibold">{docData?.name || 'Unknown Doctor'}</h2>
          <p className="text-gray-600">{docData?.specialization || 'N/A'}</p>
          <p className="text-sm mt-2">
            Address: {docData?.address?.line1 || ''} {docData?.address?.line2 || ''}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1">Select Date:</label>
        <input
          type="date"
          value={slotDate}
          onChange={(e) => setSlotDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-medium mb-2">Available Slots:</h3>
        {availableSlots.length === 0 ? (
          <p className="text-gray-500">No slots available for this date</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                className="px-3 py-1 border rounded hover:bg-blue-500 hover:text-white transition"
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Book Appointment
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Appointment; */
