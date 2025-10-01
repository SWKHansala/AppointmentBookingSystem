import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData,setUserData] = useState({
    name: "John Doe",
    image: assets.profile_pic,
    email: "john.doe@example.com",
    phone: '+1234567890',
    address: {
      line1: "123 Main St",
      line2: "Colombo, Sri Lanka",
    },
    gender: 'Male',
    dob: '1990-01-01'
  })

  const [isEdit,setEdit] = useState(false)

  return (
    <div>
      <img src={userData.image} alt="" />
      {
        isEdit
        ? <input type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))} />
        : <p>{userData.name}</p>
      }

      <hr />
      <div>
        <p>CONTACT INFORMATION</p>
        <div>
          <p>Email id:</p>
          <p>{userData.email}</p>
          <p>Phone:</p>
          {
            isEdit
            ? <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))} />
            : <p>{userData.phone}</p>
          }
          <p>Address:</p>
          {
            isEdit
            ? <p>
              <input type="text" />
              <input type="text" />
            </p>
            : <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile