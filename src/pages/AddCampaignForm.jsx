import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";
import "./AddCampaignForm.css";

const OTHER_CATEGORY = "Other";

function AddCampaignForm() {
  const { campaigns, addCampaign } = useCampaigns();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const existingCategories = [...new Set(campaigns.map((c) => c.category))];

  useEffect(() => {
    if (!category && existingCategories.length > 0) {
      setCategory(existingCategories[0]);
    }
  }, [existingCategories, category]);

  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const resolvedCategory = category === OTHER_CATEGORY ? customCategory.trim() : category;

  const validate = () => {
    const nextErrors = {};

    if (!title.trim()) nextErrors.title = "Title is required.";
    if (!resolvedCategory) nextErrors.category = "Category is required.";
    if (!description.trim()) nextErrors.description = "Description is required.";

    const goalNumber = Number(goalAmount);
    if (!goalAmount || Number.isNaN(goalNumber) || goalNumber <= 0) {
      nextErrors.goalAmount = "Enter a goal amount greater than 0.";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWasSubmitted(true);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    addCampaign({
      title: title.trim(),
      category: resolvedCategory,
      description: description.trim(),
      goalAmount: Number(goalAmount),
      raisedAmount: 0,
      image: image.trim(),
    });

    navigate("/campaigns");
  };

  return (
    <section className="add-campaign">
      <div className="add-campaign__inner">
        <header className="add-campaign__header">
          <h1>Add a campaign</h1>
          <p>New campaigns start at ₦0 raised and appear immediately on the browsing page.</p>
        </header>

        <form className="add-campaign__form" onSubmit={handleSubmit} noValidate>
          <label className="add-campaign__field">
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Clean Water for Ajah Community"
            />
            {wasSubmitted && errors.title && (
              <span className="add-campaign__error">{errors.title}</span>
            )}
          </label>

          <label className="add-campaign__field">
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {existingCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value={OTHER_CATEGORY}>Other (new category)</option>
            </select>
            {wasSubmitted && errors.category && (
              <span className="add-campaign__error">{errors.category}</span>
            )}
          </label>

          {category === OTHER_CATEGORY && (
            <label className="add-campaign__field">
              <span>New category name</span>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="e.g. Healthcare"
              />
            </label>
          )}

          <label className="add-campaign__field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="What will this campaign fund, and who does it help?"
            />
            {wasSubmitted && errors.description && (
              <span className="add-campaign__error">{errors.description}</span>
            )}
          </label>

          <label className="add-campaign__field">
            <span>Goal amount (₦)</span>
            <input
              type="number"
              min="1"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              placeholder="500000"
            />
            {wasSubmitted && errors.goalAmount && (
              <span className="add-campaign__error">{errors.goalAmount}</span>
            )}
          </label>

          <label className="add-campaign__field">
            <span>Image URL (optional)</span>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
          </label>

          <button type="submit" className="btn btn-primary add-campaign__submit">
            Create campaign
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddCampaignForm;