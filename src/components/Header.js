import React from 'react';
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
    <header data-testid="header-component">
      <h2> Header </h2>
      { loading ? <Loading /> : (
        <h3 data-testid="header-user-name">
          { name }
        </h3>
      )}
    </header>
  );
}
}

export default Header;
