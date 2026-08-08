import { useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useCampaigns } from "../context/CampaignContext";
import "./LandingPage.css";

function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function LandingPage() {
  const { campaigns } = useCampaigns();
  const featured = campaigns.slice(0, 3);

  // CampaignContext only exposes the raw campaigns array (plus CRUD
  // helpers for the admin side), so the landing page derives its own
  // read-only stats here rather than expecting the context to carry them.
  const stats = useMemo(() => {
    const totalRaised = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
    const totalGoal = campaigns.reduce((sum, c) => sum + c.goalAmount, 0);
    const percentFunded = totalGoal
      ? Math.round((totalRaised / totalGoal) * 100)
      : 0;
    return { totalRaised, percentFunded, campaignCount: campaigns.length };
  }, [campaigns]);

  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <h1 className="hero__headline">
            Grow good, together.
          </h1>
          <p className="hero__mission">
            Rooted connects Nigerian communities with the funding and hands
            they need — one campaign at a time.
          </p>

          <div className="hero__ctas">
            <Link to="/campaigns" className="btn btn-primary">
              Browse campaigns
            </Link>
            <Link to="/volunteer" className="btn btn-outline">
              Volunteer
            </Link>
          </div>
        </div>
      </section>

      <section className="impact" aria-label="Platform impact">
        <div className="impact__inner">
          <div className="impact__stat">
            <span className="impact__value">{formatNaira(stats.totalRaised)}</span>
            <span className="impact__label">raised so far</span>
          </div>
          <div className="impact__divider" aria-hidden="true" />
          <div className="impact__stat">
            <span className="impact__value">{stats.campaignCount}</span>
            <span className="impact__label">active campaigns</span>
          </div>
          <div className="impact__divider" aria-hidden="true" />
          <div className="impact__stat">
            <span className="impact__value">{stats.percentFunded}%</span>
            <span className="impact__label">average funded</span>
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="featured__inner">
          <div className="featured__header">
            <h2>Featured campaigns</h2>
            <Link to="/campaigns" className="featured__see-all">
              See all campaigns &rarr;
            </Link>
          </div>

          <div className="featured__grid">
            {featured.map((campaign) => (
              <Card key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
