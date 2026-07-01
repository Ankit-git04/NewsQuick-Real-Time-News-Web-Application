import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general"

  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }

  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
      {/* 
       React Router Dom ko implement karne ke liye 
       1) npm i react-router-dom
       2)Follow the blow latest syntax
       */}



        <Router>
          <Navbar />
          <LoadingBar height={3} color='#f11946' progress={this.state.progress}   />
          <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={9} country="us" category="general" />}></Route>
          <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={9} country="us" category="general" />}></Route>
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={9} country="us" category="business" />}></Route>
      <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={9} country="us" category="entertainment"/>}></Route>
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={9} country="us" category="health" />}></Route>
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={9} country="us" category="science" />}></Route>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={9} country="us" category="technology"/>}></Route>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={9} country="us" category="sports" />}> </Route>
             </Routes>
        </Router>
      </div>
    )
  }
  
// externals:{
//     'react':'React',
//     'react-dom':'ReactDOM'
//   };
}
