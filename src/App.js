import './App.css';
import constant from './url';
import ImageList from './components/ImageList.js';
import ImagePop from './components/ImagePop.js';
import {checkHttpStatus, searching, parse,scrollAvailable, constExecute} from './requires';
import ReactCSSTransitionGroup from  "react-addons-css-transition-group";

import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
		super(props);
    // Adding recent searches
		const queries = JSON.parse(localStorage.getItem(constant.STORAGE_KEY));
    // Defining state for image
    this.state={
      inputtext:"",
      imagelist:[],
      showPopUp: false,
      pageN:1,
      popUp: null,
      queries:queries?queries:[],
    };
    // Binding function to use in component
    this.onInputChange= this.onInputChange.bind(this);
    this.hScroll = this.hScroll.bind(this);
    this.imageClick = this.imageClick.bind(this);
    this.onPopUpHide = this.onPopUpHide.bind(this);
	
	}
  //For getting updated while serving
  componentDidMount(){
     
    window.onscroll = constExecute(() => {
        if (scrollAvailable()) return;
        this.hScroll();
		}, 1000);

     this.search = searching(() => {

        this.state.queries.push(this.state.inputtext);
        this.setState({queries: this.state.queries})


      const url = constant.BASE_URL+"&text=" + this.state.inputtext;
      fetch(url)
              .then(checkHttpStatus)
              .then(parse)
              .then(response => {console.log(response);
                  this.setState({imagelist: response.photos.photo})
              });
            },1000);
  }
  //On clicking setting the state of image
  imageClick(ind) {
		this.setState({ popUp: this.state.imagelist[ind] });
	}

  // localstorage uses to store data until cache cleared
  localStorageUpdate(){
    localStorage.setItem(constant.STORAGE_KEY,JSON.stringify(this.state.queries))
    
  }

  //Hide image after popup
  onPopUpHide(){
    this.setState({ popUp: null });
  }

  // After taking input from search bar pass to the state
  onInputChange(inp){
    const inputtext = inp.currentTarget.value;
    this.setState({inputtext});
    const trimmed = inputtext.replace(/\s+$/, "");
		if (trimmed.length) this.search(trimmed);

  }
// updateing onscrolling
  hScroll(){
      let url =  constant.BASE_URL+"&text=" + this.state.inputtext + "&page" + (this.state.pageN + 1);
      fetch(url)
              .then(checkHttpStatus)
              .then(parse)
              .then(response => {console.log(response);
                  response.photos.photo.forEach(photo => this.state.imagelist.push(photo));
                   console.log("AA");
                  this.setState({
                    imagelist: this.state.imagelist,
                    pageN :response.photos.page,
                  });
                }).catch(error =>{
                  console.log(error);
                });
      }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>My Flicker Search</h3>
          <div className="">
						<input
							type="text"
							className="search-input"
							value={this.state.inputtext}
							onChange={this.onInputChange}
						/>
					</div>
          {this.state.queries.length > 0 &&
						<div style={{ marginTop: "15px" }}>
							<h5 style={{ marginBottom: "6px" }}>Recent Searches</h5>
							<ul className="hor-flex justify">
								{this.state.queries.map((query, ind) =>
									<li key={ind} className="recent-searches">
										{query}
									</li>
								)}
							</ul>
						</div>}
        </div>
        <div className="App-content">
          {this.state.imagelist.length
						? <ImageList images={this.state.imagelist} onPhotoClick={this.imageClick} />
						: <p style={{ margin: "1rem 0" }}>Please search in the search bar</p>}
					<ReactCSSTransitionGroup
						transitionName="popup-container"
						transitionEnterTimeout={400}
						transitionLeaveTimeout={200}
					>
						{this.state.popUp &&
							<ImagePop image={this.state.popUp} onHide={this.onPopUpHide} />}
					</ReactCSSTransitionGroup>
        </div>
        
      </div>
    )
  }
  componentWillUnmount() {
		// Removing the listener for clean
		window.onscroll = undefined;
	}
}


