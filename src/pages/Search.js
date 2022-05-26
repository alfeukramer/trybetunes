import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumResult from '../components/AlbumsResult';

class Search extends React.Component {
  constructor() {
    super();
    this.onChangeFunction = this.onChangeFunction.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
    this.state = {
      hasLength: true,
      nameArtist: '',
      searchInput: '',
      searchResult: [],
      loading: false,
    };
  }

  onChangeFunction({ target: { value } }) {
    const LENGTH_NUMBER = 2;
    this.setState({ nameArtist: value, hasLength: value.length < LENGTH_NUMBER });
  }

  searchAlbums() {
    const { nameArtist } = this.state;
    this.setState({ loading: true }, async () => {
      const result = await searchAlbumsAPI(nameArtist);
      this.setState({
        nameArtist: '',
        searchInput: nameArtist,
        searchResult: result,
        loading: false,
      });
    });
  }

  render() {
    const { hasLength, nameArtist, searchInput, searchResult, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2 className="search-title">Search</h2>
        <div className="page-search">
          <input
            data-testid="search-artist-input"
            placeholder="Digite a banda ou artista a ser pesquisada..."
            value={ nameArtist }
            onChange={ this.onChangeFunction }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ hasLength }
            onClick={ this.searchAlbums }
          >
            Pesquisar
          </button>
        </div>
        <div className="albums-names">
          { loading && <Loading />}
          { searchInput
          && (
            <>
              <h2>
                {
                  searchResult.length > 0
                    ? `Resultado de álbuns de: ${searchInput}`
                    : 'Nenhum álbum foi encontrado'
                }
              </h2>
              <div className="albumsList">
                {
                  searchResult.map((album) => (
                    <AlbumResult
                      key={ album.collectionId }
                      collectionId={ album.collectionId }
                      album={ album.collectionName }
                      artist={ album.artistName }
                      image={ album.artworkUrl100 }
                    />
                  ))
                }
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
