import React from 'react';
import LandingPageLayout from '../components/Layouts/LandingPageLayout';
import Button from '../components/Elements/Button';
import Gambiran from '../assets/img3.png';
import Kediri from '../assets/img2.png';
import Harmoni from '../assets/img1.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <LandingPageLayout>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3 bg-white rounded-xl">
          <img src={Gambiran} alt="RSUD-Gambiran" />
        </div>
        <div className="p-3 bg-white rounded-lg">
          <img src={Kediri} alt="PemKot Kediri" />
        </div>
        <div className="p-3 bg-white rounded-lg">
          <img src={Harmoni} alt="Harmoni Kediri" />
        </div>
      </div>
      <div className="w-full px-2 py-3 bg-blue-100 rounded-lg">
        <h1 className="text-2xl font-extrabold text-center text-black capitalize">
          silahkan pilih
        </h1>
      </div>
      <Link to="/login">
        <Button cN="btn-full bg-blue-300 text-black text-xl font-bold hover:bg-blue-500">
          Login
        </Button>
      </Link>
      <Link to="/register-penyedia">
        <Button cN="btn-full bg-red-300 text-black text-xl font-bold hover:bg-red-500">
          Register Penyedia
        </Button>
      </Link>
    </LandingPageLayout>
  );
};

export default LandingPage;
