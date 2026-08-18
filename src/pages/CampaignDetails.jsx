import { useParams, useNavigate, Link } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";
import { useState } from "react";
import Modal from "../components/Modal";
import "./CampaignDetails.css";

function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campaigns, updateCampaign, deleteCampaign } = useCampaigns();
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const campaign = campaigns.find((c) => String(c.id) === id);

  const [formData, setFormData] = useState({
    title: campaign?.title || "",
    category: campaign?.category || "",
    description: campaign?.description || "",
    goalAmount: campaign?.goalAmount || "",
    raisedAmount: campaign?.raisedAmount || "",
  });
  const [errors, setErrors] = useState({});

  if (!campaign) return <h2>Campaign not found</h2>;

  const percentFunded = Math.min(
    100,
    Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.goalAmount || Number(formData.goalAmount) <= 0)
      newErrors.goalAmount = "Goal amount must be greater than 0";
    if (formData.raisedAmount === "" || Number(formData.raisedAmount) < 0)
      newErrors.raisedAmount = "Raised amount can't be negative";
    return newErrors;
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    updateCampaign(campaign.id, {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      goalAmount: Number(formData.goalAmount),
      raisedAmount: Number(formData.raisedAmount),
    });
    setErrors({});
    setShowEdit(false);
  };

  const handleDelete = () => {
    deleteCampaign(campaign.id);
    navigate("/campaigns");
  };

  const related = campaigns.filter(
    (c) => c.category === campaign.category && String(c.id) !== campaign.id,
  );

  return (
    <div className="campaign-details">
      <div className="campaign-details__inner">
        <div className="campaign-details__hero">
          {campaign.image ? (
            <img
              src={campaign.image}
              alt={campaign.title}
              className="campaign-details__image"
            />
          ) : (
            <div className="campaign-details__image-fallback">
              <span>{campaign.title}</span>
            </div>
          )}
          <span className="card__category campaign-details__category">
            {campaign.category}
          </span>
        </div>

        <h1>{campaign.title}</h1>

        <div className="campaign-details__progress">
          <div className="growth-meter">
            <div
              className="growth-meter__fill"
              style={{ width: `${percentFunded}%` }}
            >
              <span className="growth-meter__marker"></span>
            </div>
          </div>
          <p className="campaign-details__stats">
            ₦{campaign.raisedAmount.toLocaleString()} raised of ₦
            {campaign.goalAmount.toLocaleString()} · {percentFunded}% funded
          </p>
        </div>

        <p className="campaign-details__description">{campaign.description}</p>

        <div className="campaign-details__ctas">
          <Link to={`/donate/${campaign.id}`} className="btn btn-accent">
            Donate
          </Link>
          <Link to="/volunteer" className="btn btn-outline">
            Volunteer
          </Link>
        </div>

        <div className="campaign-details__admin">
          <button
            className="campaign-details__admin-btn"
            onClick={() => setShowEdit(true)}
          >
            Edit campaign
          </button>
          <button
            className="campaign-details__admin-btn campaign-details__admin-btn--danger"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete campaign
          </button>
        </div>

        {related.length > 0 && (
          <section className="campaign-details__related">
            <h3>Related campaigns</h3>
            <div className="campaign-details__related-list">
              {related.map((c) => (
                <Link
                  key={String(c.id)}
                  to={`/campaigns/${String(c.id)}`}
                  className="campaign-details__related-pill"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Modal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        title="Edit campaign"
      >
        <form onSubmit={handleEditSubmit} className="campaign-form">
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </label>

          <label>
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            {errors.category && (
              <span className="form-error">{errors.category}</span>
            )}
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </label>

          <label>
            Goal amount (₦)
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              min="0"
            />
            {errors.goalAmount && (
              <span className="form-error">{errors.goalAmount}</span>
            )}
          </label>

          <label>
            Raised amount (₦)
            <input
              type="number"
              name="raisedAmount"
              value={formData.raisedAmount}
              onChange={handleChange}
              min="0"
            />
            {errors.raisedAmount && (
              <span className="form-error">{errors.raisedAmount}</span>
            )}
          </label>

          <div className="campaign-form__actions">
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete campaign?"
      >
        <p>This can't be undone.</p>
        <button className="btn btn-accent" onClick={handleDelete}>
          Yes, delete
        </button>
        <button
          className="btn btn-outline"
          onClick={() => setShowDeleteConfirm(false)}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
}

export default CampaignDetails;
