import { Link } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";
import "./About.css";

function About() {
  const { campaigns } = useCampaigns();

  const totalRaised = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
  const totalCampaigns = campaigns.length;

  return (
    <div className="about">
      <section className="about__hero">
        <h1>Every good thing starts small</h1>
        <p className="about__lede">
          Rooted connects Nigerian communities with the people and funding
          that help them grow — one campaign, one volunteer, one donation at a time.
        </p>
      </section>

      <section className="about__idea">
        <h2>The idea behind Rooted</h2>
        <p>
          A donation campaign is a seed. Every donation and every volunteer
          signup is water and sunlight. As a campaign gets funded, it visibly
          grows — we treat progress as something living, not just a bar to fill.
          It's a small shift, but it changes how the work feels: less like a
          transaction, more like tending something together.
        </p>
      </section>

      <section className="about__stats">
        <div className="about__stat">
          <span className="about__stat-number">₦{totalRaised.toLocaleString()}</span>
          <span className="about__stat-label">Raised across all campaigns</span>
        </div>
        <div className="about__stat">
          <span className="about__stat-number">{totalCampaigns}</span>
          <span className="about__stat-label">Active campaigns</span>
        </div>
        <div className="about__stat">
          <span className="about__stat-number">100%</span>
          <span className="about__stat-label">Community-led</span>
        </div>
      </section>

      <section className="about__values">
        <h2>What we care about</h2>
        <div className="about__values-grid">
          <div className="about__value">
            <h3>Transparency</h3>
            <p>Every campaign shows exactly what's been raised and what it's going toward — no guesswork.</p>
          </div>
          <div className="about__value">
            <h3>Community first</h3>
            <p>Campaigns are proposed by and for the communities they serve, not decided from the outside.</p>
          </div>
          <div className="about__value">
            <h3>Small acts add up</h3>
            <p>You don't need to donate a fortune or volunteer full-time. Every bit of water and sunlight counts.</p>
          </div>
        </div>
      </section>

      <section className="about__cta">
        <h2>Ready to help something grow?</h2>
        <div className="about__cta-buttons">
          <Link to="/campaigns" className="btn btn-accent">Browse campaigns</Link>
          <Link to="/volunteer" className="btn btn-outline">Volunteer</Link>
        </div>
      </section>
    </div>
  );
}

export default About;