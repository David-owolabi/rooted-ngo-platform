import { Link } from "react-router-dom";
import "./Card.css";

/**
 * Campaign card — the single source of truth for how a campaign
 * is represented anywhere in the app (landing page "Featured",
 * CampaignsPage browsing grid, etc). Don't fork this per page;
 * pass a `variant` if a page genuinely needs a different layout.
 */
function Card({ campaign, variant = "default" }) {
  const { id, title, category, description, goalAmount, raisedAmount, image } = campaign;

  const percentFunded = Math.min(
    100,
    Math.round((raisedAmount / goalAmount) * 100)
  );

  const formatNaira = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <article className={`card card--${variant}`}>
      <div className="card__media">
        {image ? (
          <img src={image} alt="" loading="lazy" />
        ) : (
          <div className="card__media-fallback" aria-hidden="true">
            <span>{category}</span>
          </div>
        )}
        <span className="card__category">{category}</span>
      </div>

      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>

        <div className="growth-meter" role="img" aria-label={`${percentFunded}% funded`}>
          <div className="growth-meter__fill" style={{ width: `${percentFunded}%` }}>
            <span className="growth-meter__marker" />
          </div>
        </div>

        <div className="card__stats">
          <span className="card__stat-raised">{formatNaira(raisedAmount)}</span>
          <span className="card__stat-percent">{percentFunded}% funded</span>
        </div>

        <Link to={`/campaigns/${id}`} className="btn btn-outline card__cta">
          View campaign
        </Link>
      </div>
    </article>
  );
}

export default Card;
