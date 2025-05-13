function SearchForm({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="search-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <div className="search-fields">
          <label>
            <strong>Input dish name:</strong>
          </label>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
