
import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

class HomePage extends React.Component {

  componentDidMount() {
    document.title = 'home';
  }

  render() {
    return (
      <Layout className={s.content}>
        <h1>Home</h1>
      </Layout>
    );
  }

}

export default HomePage;
