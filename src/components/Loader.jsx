import "./Loader.css";

function Loader({ label = "Loading..." }) {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <span className="loader__label">{label}</span>
    </div>
  );
}

export default Loader;