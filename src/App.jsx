import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import CampaignsPage from "./pages/CampaignsPage";
import CampaignDetails from "./pages/CampaignDetails";
import VolunteerForm from "./pages/VolunteerForm";
import DonationForm from "./pages/DonationForm";
import About from "./pages/About";
import AddCampaignForm from "./admin/AddCampaignForm";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />

        <main className="app__main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/addcampaign" element={<AddCampaignForm />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/:id" element={<CampaignDetails />} />
            <Route path="/donate" element={<DonationForm />} />
            <Route path="/donate/:id" element={<DonationForm />} />
            <Route path="/volunteer" element={<VolunteerForm />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;