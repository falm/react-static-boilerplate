import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

class AboutPage extends React.Component {

  componentDidMount() {
    document.title = 'About';
  }

  render() {
    return (
      <Layout className={s.content}>
        <h1>About</h1>
      </Layout>
    );
  }

}

export default AboutPage;
