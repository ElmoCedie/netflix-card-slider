import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state = {
      activeItem: false,
      items : "",
      scrollIndicator: 0,
    }

    this.showDetail = this.showDetail.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
    this.onScrollIndicator = this.onScrollIndicator.bind(this);
    this.nextBtn = this.nextBtn.bind(this);
    this.previousBtn = this.previousBtn.bind(this);
  }

  componentDidUpdate(){
    const item = {
      right: document.querySelector(".right"),
      left : document.querySelector(".left"),
      progress: document.querySelector(".progress-bar").style.width
    }

    if(this.state.scrollIndicator < 2){
      item.left.style.display = "none"
    }
    if(this.state.scrollIndicator > 98){
      item.right.style.display = "none"
      item.left.style.display = "block"
    }
  }


  renderItems(){
    return staticData.map(res => { return (
      <div key={res.id} className={`items`}>
        <div className={ `item-status-`+`${res.id}` }>
           <i onClick={ () => this.showDetail(res.id) }>
            <img src={ require( `${res.image}` ) } alt={res.image}/>
            <p>[title]</p>
            <p>[description]</p>
            <img className="feature-arrow" src={ require("./assets/icons/show-feature.png")  } alt={res.image}/>
           </i>
           <div id="pointer2"></div>
        </div>
      </div>
    ) })
  }

  nextBtn(){
    document.querySelector(".item-navigation").scrollBy(500,0);
  }

  previousBtn(){
    document.querySelector(".item-navigation").scrollBy(-500,0);
  }

  showDetail(e){
    const item = {
      active : document.querySelector(".item-active"),
      navigation: document.querySelector(".item-navigation"),
      inactive: document.querySelector(".item-inactive"),
      detail: document.querySelector(".item-details"),
      status: document.querySelector(`.item-status-`+`${e}`),
      pointer: document.getElementById("pointer"),
    }

    if(item.status.className === `item-status-`+`${e} item-active`){
      this.closeDetail()
    }else{
      if (item.active){
        item.active.classList.remove("item-active");
      }

      item.detail.style.display = "block" ;
      item.navigation.classList.add("item-inactive");
      item.status.classList.add("item-active");
      item.status.scrollIntoView({inline: "center"});

      let elemPosition = item.status.getBoundingClientRect().left + 159 ;
      item.pointer.style.left = `${elemPosition}px` ;
    }

  }

  closeDetail(){
    const item = {
      active : document.querySelector(".item-active"),
      navigation: document.querySelector(".item-navigation"),
      detail: document.querySelector(".item-details"),
    }

    item.detail.style.display = "none" ;
    item.active.classList.remove("item-active")
    item.navigation.classList.remove("item-inactive")
  }

  gotoLastItem(){
    let itemNav = document.querySelector(".item-navigation");
    itemNav.scrollLeft  = itemNav.scrollWidth;
    document.querySelector(".right").style.display = "none";
    document.querySelector(".left").style.display = "block";
  }

  onScrollIndicator(){
    const item = {
      navigation: document.querySelector(".item-navigation"),
      right: document.querySelector(".right"),
      left : document.querySelector(".left")
    }

    let scrollPosition = item.navigation.scrollLeft;
    let scrollLength = item.navigation.scrollWidth - item.navigation.clientWidth;
    let scrolled = (scrollPosition / scrollLength) * 100;
    this.setState({ scrollIndicator: scrolled });

    if(scrolled > 98){
      item.right.style.display = "none";
    }

    if(scrolled < 2){
      item.left.style.display = "none";
    }

    if(scrolled < 98 & scrolled > 2 ){
      item.right.style.display = "block";
      item.left.style.display = "block";
    }
  }

  funDetail(){
    return (
      <span className="item-details">
        <span id="pointer"></span>
        <div className="detail-close-wrapper">
          <button onClick={ this.closeDetail }>
              <img src={ require("./assets/icons/Close-slider.png") } alt="goto last item" />
          </button>
        </div>

        <div className="detail-body">
        </div>
      </span>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="topic-header">
          <h3>Savings</h3>
        </div>
        <div className="progress-container">
          <div className="progress-wrapper">
            <div className="progress-bar" id="progress-percent" style={{ width: `${this.state.scrollIndicator}%` }}></div>
          </div>
        </div>
        <div className="items-container ">
          <div className="item-wrapper">
            <div className="item-navigation" onScroll={ this.onScrollIndicator }>
                <div className="first-item">
                  <p>Choose your travel rewards from airline tickets, hotel/resort accommodation, travel packages to transfer of rewards points to Philippine Airlines' Mabuhay Miles and more! </p>
                  <i onClick={this.gotoLastItem}>
                    <img src={ require("./assets/icons/Arrow.png") } alt="goto last item" />
                  </i>
                </div>
                {this.renderItems()}
                <div className="last-item"></div>
            </div>
            <button className="btn-nav left" onClick={ this.previousBtn }>
              <img src={ require("./assets/icons/left.png") } alt="left" />
            </button>

            <button className="btn-nav right" onClick={ this.nextBtn }>
              <img src={ require("./assets/icons/right.png") }  alt="right" />
            </button>
          </div>
          {  this.funDetail() }
        </div>
      </div>
    );
  }
}

export default App;

const staticData = [
  {
    id: 1,
    image: "./assets/img/card1.png"
  },
  {
    id: 2,
    image: "./assets/img/card2.png"
  },
  {
    id: 3,
    image: "./assets/img/card3.png"
  },
  {
    id: 4,
    image: "./assets/img/card4.png"
  },
  {
    id: 5,
    image: "./assets/img/card5.png"
  },
  {
    id: 6,
    image: "./assets/img/card6.png"
  },
  {
    id: 7,
    image: "./assets/img/card7.png"
  },
  {
    id: 8,
    image: "./assets/img/card8.png"
  },
  {
    id: 9,
    image: "./assets/img/card9.png"
  },
  {
    id: 10,
    image: "./assets/img/card10.png"
  }
];
