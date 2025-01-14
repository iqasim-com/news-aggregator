const PreferencesDisplay = ({ label, values, badgeClass }) => {
  if (!values || values.length === 0) return null;

  return (
    <div className="mb-2">
      <strong>{label}:</strong>
      {values.map((value, index) => (
        <span key={index} className={`badge ${badgeClass} m-1`}>
          {value}
        </span>
      ))}
    </div>
  );
}

export default PreferencesDisplay
