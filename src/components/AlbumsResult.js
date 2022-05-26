import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumResult extends React.Component {
  render() {
    const {
      collectionId,
      image,
      album,
      artist,
    } = this.props;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div className="albums">
          <span className="span-image">
            <img src={ image } alt={ album } className="imageAlbum" />
            <br />
          </span>
          <span className="span-artist">
            <h2>{ artist }</h2>
            <br />
          </span>
          <span className="span-album">
            <h4>{ album }</h4>
            <br />
          </span>
        </div>
      </Link>
    );
  }
}
AlbumResult.propTypes = {
  collectionId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default AlbumResult;
