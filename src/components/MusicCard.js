import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicas } = this.props;
    return (
      <div>
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
        </p>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicas: PropTypes.string.isRequired,
};

export default MusicCard;
