import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.favoritedSongs = this.favoritedSongs.bind(this);
    this.validationState = this.validationState.bind(this);
    this.state = {
      favorites: false,
      loading: false,
    };
  }

  favoritedSongs = async () => {
    const { musicas } = this.props;
    this.setState({ loading: true });
    await addSong(musicas);
    this.setState({ loading: false });
  }

  validationState = () => {
    const { favorites } = this.state;
    this.setState({ favorites: !favorites }, this.favoritedSongs);
  }

  render() {
    const { musicas } = this.props;
    const { favorites, loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : (
          <p className="tracks-preview">
            { musicas.trackName }
            <audio
              data-testid="audio-component"
              src={ musicas.previewUrl }
              controls
            >
              <track
                kind="captions"
              />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label
              htmlFor="favorite"
            >
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${musicas.trackId}` }
                id="favorite"
                checked={ favorites }
                onChange={ this.validationState }
              />
            </label>
          </p>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicas: PropTypes.string.isRequired,
};

export default MusicCard;
