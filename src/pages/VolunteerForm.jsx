import { useState } from "react";
import "./VolunteerForm.css";
import "../components/Modal.css";

const AVAILABILITY_OPTIONS = ["Weekdays", "Weekends", "Remote"];

function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: [],
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAvailability = (option) => {
    setFormData((prev) => {
      const has = prev.availability.includes(option);
      return {
        ...prev,
        availability: has
          ? prev.availability.filter((a) => a !== option)
          : [...prev.availability, option],
      };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (formData.availability.length === 0)
      newErrors.availability = "Pick at least one option";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="volunteer-form volunteer-form--confirmation">
        <h1>Thanks, {formData.name.split(" ")[0]}</h1>
        <p>We've got your details and we'll be in touch about how you can help.</p>
      </div>
    );
  }

  return (
    <div className="volunteer-form">
      <h1>Volunteer with us</h1>
      <p className="volunteer-form__intro">
        Give your time, skills, or presence — every bit helps a campaign grow.
      </p>

      <form onSubmit={handleSubmit} className="campaign-form">
        <label>
          Full name
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </label>

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </label>

        <label>
          Phone (optional)
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Skills
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g. teaching, first aid, logistics"
          />
        </label>

        <div className="volunteer-form__availability">
          <span className="volunteer-form__availability-label">Availability</span>
          <div className="volunteer-form__checkboxes">
            {AVAILABILITY_OPTIONS.map((option) => (
              <label key={option} className="volunteer-form__checkbox">
                <input
                  type="checkbox"
                  checked={formData.availability.includes(option)}
                  onChange={() => toggleAvailability(option)}
                />
                {option}
              </label>
            ))}
          </div>
          {errors.availability && (
            <span className="form-error">{errors.availability}</span>
          )}
        </div>

        <div className="campaign-form__actions">
          <button type="submit" className="btn btn-accent">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default VolunteerForm;