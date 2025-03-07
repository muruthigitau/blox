const FilterText = ({ placeholder, name, handleChange, value }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className="py-[0.4rem] px-2 border rounded-sm focus:outline-hidden focus:ring-0"
    />
  );
};

export default FilterText;
