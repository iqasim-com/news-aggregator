import React, { useState } from "react";

interface FilterComponentProps {
  onFilterChange: (filters: { date: string; author: string; category: string; source: string }) => void;
  fetchAuthors: string[];
  fetchCategories: string[];
  fetchSources: string[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange, fetchAuthors, fetchCategories, fetchSources }) => {
  const [filters, setFilters] = useState({ date: "", author: "", category: "", source: "" });

  const handleFilterChange = (field: string, value: string) => {
    let formattedValue = value;

    // Convert the value to "MM/DD/YYYY" format for the filters state
    if (field === "date" && value) {
      const date = new Date(value);
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      formattedValue = `${month}/${day}/${year}`;
    }

    const updatedFilters = { ...filters, [field]: formattedValue };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Filters</h3>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* Date Input */}
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={
              filters.date
                ? `${filters.date.split("/")[2]}-${filters.date.split("/")[0]}-${filters.date.split("/")[1]}`
                : "" // Convert "MM/DD/YYYY" to "YYYY-MM-DD" for the input field
            }
            onChange={(e) => handleFilterChange("date", e.target.value)}
          />
        </div>

        {/* Author Dropdown */}
        <div>
          <label>Author: </label>
          <select
            value={filters.author}
            onChange={(e) => handleFilterChange("author", e.target.value)}
          >
            <option value="">All</option>
            {fetchAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label>Category: </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All</option>
            {fetchCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Source Dropdown */}
        <div>
          <label>Source: </label>
          <select
            value={filters.source}
            onChange={(e) => handleFilterChange("source", e.target.value)}
          >
            <option value="">All</option>
            {fetchSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
