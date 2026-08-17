import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";
import Loader from "../components/Loader";
import "./DonationForm.css";
import "../components/Modal.css";

const PRESET_AMOUNTS = [5000, 10000, 20000];

function DonationForm() {
  const { id } = useParams();
  const { campaigns, updateCampaign } = useCampaigns();

  const campaign = id ? campaigns.find((c) => c.id === Number(id)) : null;

  const [selectedCampaignId, setSelectedCampaignId] = useState(
    campaign ? campaign.id : "",
  );
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [reference, setReference] = useState("");

  const activeCampaign = id
    ? campaign
    : campaigns.find((c) => c.id === Number(selectedCampaignId));

  const handlePreset = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const getAmount = () => {
    if (customAmount) return Number(customAmount);
    return selectedAmount || 0;
  };

  const validate = () => {
    const newErrors = {};
    if (!activeCampaign) newErrors.campaign = "Choose a campaign to support";
    if (getAmount() <= 0) newErrors.amount = "Enter an amount greater than 0";
    if (!donorName.trim()) newErrors.name = "Name is required";
    if (!donorEmail.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      newErrors.email = "Enter a valid email address";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("loading");

    // Simulated payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Simulate a failure path when amount is 0 (shouldn't happen post-validation,
    // but also simulate a random-ish failure for demo purposes on very small amounts)
    if (getAmount() <= 0) {
      setStatus("error");
      return;
    }

    updateCampaign(activeCampaign.id, {
      raisedAmount: activeCampaign.raisedAmount + getAmount(),
    });

    const mockRef = `RTD-${Date.now().toString().slice(-8)}`;
    setReference(mockRef);
    setStatus("success");
  };

  if (status === "loading") {
    return (
      <div className="donation-form donation-form--center">
        <Loader label="Processing your donation..." />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="donation-form donation-form--center donation-form--success">
        <h1>Thank you, {donorName.split(" ")[0]}</h1>
        <p>Your donation of ₦{getAmount().toLocaleString()} to</p>
        <p className="donation-form__campaign-name">{activeCampaign.title}</p>
        <p className="donation-form__reference">Reference: {reference}</p>
        <Link
          to={`/campaigns/${activeCampaign.id}`}
          className="btn btn-outline"
        >
          Back to campaign
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="donation-form donation-form--center donation-form--error">
        <h1>Something went wrong</h1>
        <p>We couldn't process that donation. No amount was charged.</p>
        <button className="btn btn-accent" onClick={() => setStatus("idle")}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="donation-form">
      <h1>Make a donation</h1>

      {activeCampaign ? (
        <div className="donation-form__campaign-summary">
          <span className="donation-form__category-badge">{activeCampaign.category}</span>
          <h3>{activeCampaign.title}</h3>
        </div>
      ) : (
        <label className="donation-form__campaign-select">
          Choose a campaign
          <select
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(e.target.value)}
          >
            <option value="">Select a campaign</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          {errors.campaign && (
            <span className="form-error">{errors.campaign}</span>
          )}
        </label>
      )}

      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="donation-form__amounts">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              type="button"
              key={amount}
              className={`donation-form__amount-btn ${
                selectedAmount === amount
                  ? "donation-form__amount-btn--active"
                  : ""
              }`}
              onClick={() => handlePreset(amount)}
            >
              ₦{amount.toLocaleString()}
            </button>
          ))}
          <input
            type="number"
            placeholder="Custom"
            value={customAmount}
            onChange={handleCustomChange}
            className={`donation-form__amount-btn donation-form__custom-input ${
              customAmount ? "donation-form__amount-btn--active" : ""
            }`}
            min="0"
          />
        </div>
        {errors.amount && <span className="form-error">{errors.amount}</span>}

        <label>
          Full name
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </label>

        <label>
          Email
          <input
            type="email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </label>

        <div className="campaign-form__actions">
          <button type="submit" className="btn btn-accent">
            Confirm donation
          </button>
        </div>
      </form>
    </div>
  );
}

export default DonationForm;
