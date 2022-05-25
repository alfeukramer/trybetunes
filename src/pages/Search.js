import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.onChangeFunction = this.onChangeFunction.bind(this);
    this.state = { hasLength: true };
  }

  onChangeFunction({ target: { value } }) {
    const LENGTH_NUMBER = 2;
    this.setState({ name: value, hasLength: value.length < LENGTH_NUMBER });
  }

  render() {
    const { hasLength, name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <input
          data-testid="search-artist-input"
          placeholder="Digite a banda ou artista a ser pesquisada..."
          value={ name }
          onChange={ this.onChangeFunction }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ hasLength }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
