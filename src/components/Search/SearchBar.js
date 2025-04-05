import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  width: 40%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 20px;
  background: #2a2a2a;
  color: #fff;
  box-shadow: 0 0 5px #00ffcc;
  &:focus {
    outline: none;
    box-shadow: 0 0 10px #00ffcc;
  }
`;

function SearchBar({ searchQuery, onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search gadgets..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </SearchContainer>
  );
}

export default SearchBar;