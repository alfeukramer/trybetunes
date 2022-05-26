import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.nameUser = this.nameUser.bind(this);
    this.state = { name: '', loading: false };
  }

  componentDidMount() {
    this.nameUser();
  }

nameUser = async () => {
  this.setState({ loading: true });
  const inputName = await getUser();
  this.setState({ name: inputName.name, loading: false });
}

render() {
  const { name, loading } = this.state;
  return (
    <header data-testid="header-component" className="header-page">
      { loading ? <Loading /> : (
        <>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <p />
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <p />
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          <h3 data-testid="header-user-name" className="user-name">
            Usuário:
            <br />
            { name }
          </h3>
        </>
      )}
    </header>
  );
}
}

export default Header;
