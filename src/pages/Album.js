import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.searchAlbums = this.searchAlbums.bind(this);
    this.arrayFilter = this.arrayFilter.bind(this);
    this.state = {
      artistName: '',
      collectionName: '',
      musicArray: [],
      musicArrayFinal: [],
      musicValidation: false,
    };
  }

  componentDidMount() {
    this.searchAlbums();
  }

  searchAlbums = async () => {
    const { match: { params: { id } } } = this.props;
    const musicApi = await getMusics(id);
    this.setState({
      musicArray: musicApi,
      musicValidation: true,
    });
    this.arrayFilter();
  };

  arrayFilter = () => {
    const { musicArray } = this.state;
    this.setState({
      artistName: musicArray[0].artistName,
      collectionName: musicArray[0].collectionName,
      musicArrayFinal: musicArray
        .slice(1, musicArray.length),
    });
  }

  render() {
    const { artistName, collectionName, musicValidation, musicArrayFinal } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="album-name">
          <h4>
            Músicas do album:
            <br />
          </h4>
          <h3>
            { collectionName }
          </h3>
        </span>
        <h3 data-testid="artist-name">{ artistName }</h3>
        <br />
        <br />
        { musicValidation
          ? (musicArrayFinal.map((musicas) => (
            <div key={ musicas.trackId }>
              <MusicCard musicas={ musicas } />
            </div>
          ))) : ('Nenhuma música encontrada!') }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
