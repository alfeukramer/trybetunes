import React from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.onChangeFunction = this.onChangeFunction.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { name: '', hasLength: true, loading: false };
  }

  handleClick() {
    const { history: { push } } = this.props;
    const { name } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      push('/search');
    });
  }

  onChangeFunction({ target: { value } }) {
    const LENGTH_NUMBER = 3;
    this.setState({ name: value, hasLength: value.length < LENGTH_NUMBER });
  }

  render() {
    const { name, hasLength, loading } = this.state;

    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form>
            <label htmlFor="input-name-login">
              <input
                type="text"
                data-testid="login-name-input"
                placeholder="Insira seu nome"
                onChange={ this.onChangeFunction }
                value={ name }

              />
            </label>
            <br />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ hasLength }
              onClick={ this.handleClick }
            >
              Entrar
            </button>

          </form>
        )}
      </div>

    );
  }
}

Login.propTypes = {
  history: propTypes.string.isRequired,
};

export default Login;
