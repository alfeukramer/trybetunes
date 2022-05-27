import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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

  componentDidMount() {
    this.favoritedMusics();
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

  favoritedMusics = async () => {
    const { trackId } = this.props;
    this.setState({ loading: true });
    const musicFavs = await getFavoriteSongs();
    if (musicFavs.some((favs) => favs.trackId === trackId)) {
      this.setState({ favorites: true, loading: false });
      return;
    }
    this.setState({ loading: false });
  }

  render() {
    const { musicas, trackId } = this.props;
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
              htmlFor={ `checkbox-music-${trackId}` }
            >
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id={ `checkbox-music-${trackId}` }
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
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
