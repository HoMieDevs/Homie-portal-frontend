import React, { Component } from 'react'
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './css/Home.css'
axios.defaults.withCredentials = true;

export default class Home extends Component {
    
    render() {
        return (
            <div className="register">
                <Header />
                
                <Footer />
            </div>

    )
  }
}
