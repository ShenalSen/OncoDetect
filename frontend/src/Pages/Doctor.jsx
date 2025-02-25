import doctorImage from '../assets/doctor.jpeg';

const Doctor = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
          <h1 className="text-3xl font-bold text-white">Doctor Profile</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center p-6">
          <img
            src={doctorImage}
            alt="Ashan Perera"
            className="rounded-full h-32 w-32 md:mr-8 border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Ashan Perera</h2>
            <p className="text-gray-600">Consultant Clinical Oncologist</p>
            <p className="text-gray-600">Medical License Number: SLMC 769873458T</p>
            <p className="text-gray-600">Phone: +9476 741 9000</p>
            <p className="text-gray-600">Email: ashanp@nw.dr.lk</p>
            <p className="text-gray-600">Hospital: Nawaloka Hospitals PLC</p>
            <p className="text-gray-600">Experience: 15 years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
