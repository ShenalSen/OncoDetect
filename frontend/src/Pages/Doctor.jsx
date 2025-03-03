import React from 'react';
import doctorImage from '../assets/doctor.jpg';

const Doctor = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Doctor</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <div className="flex flex-col md:flex-row items-center">
          <img src={doctorImage} alt="Ashan Perera" className="rounded-full h-32 w-32 md:mr-8" />
          <div>
            <h2 className="text-xl font-bold">Ashan Perera</h2>
            <p>Consultant Clinical Oncologist</p>
            <p>Medical License Number: SLMC 769873458T</p>
            <p>Phone Number: +9476 741 9000</p>
            <p>Email Address: ashanp@nw.dr.lk</p>
            <p>Associated Hospital/Clinic: Nawaloka Hospitals PLC</p>
            <p>Years of Experience: 15 years</p>
          </div>
        </div>
        {/* Additional sections like Dashboard Statistics can be added here */}
      </div>
    </div>
  );
};

export default Doctor;