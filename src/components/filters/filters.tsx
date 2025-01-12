import React from 'react';

interface FiltersProps {
  filters: {
    query: string;
    category: string;
    source: string;
    from: string;
    to: string;
  };
  onChange: (updatedFilters: {
    query?: string;
    category?: string;
    source?: string;
    from?: string;
    to?: string;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onChange }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div>
      <div>
        <label>Keyword:</label>
        <input
          type="text"
          name="query"
          value={filters.query}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div>
        <label>Source:</label>
        <select
          name="source"
          value={filters.source}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="bbc-news">BBC News</option>
          <option value="cnn">CNN</option>
          <option value="the-verge">The Verge</option>
          {/* Add more sources as needed */}
        </select>
      </div>
      <div>
        <label>From:</label>
        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>To:</label>
        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Filters;
