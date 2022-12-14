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
        <span data-testid="album-name" className="album-name">
          <h4>
            Músicas do album:
            <br />
          </h4>
          <h3 className="album-name">
            { collectionName }
          </h3>
        </span>
        <h3 data-testid="artist-name" className="album-name">{ artistName }</h3>
        <br />
        <br />
        { musicValidation
          ? (musicArrayFinal.map((musicas) => (
            <MusicCard
              key={ musicas.trackId }
              musicas={ musicas }
              trackId={ musicas.trackId }
            />
          ))) : ('Nenhuma música encontrada!') }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
