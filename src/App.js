import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.images = [];
    this.allimages = [];
    this.state = {
      ready: false
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos").then(response => response.json()).then(jsonData => {
      this.images = jsonData.slice(0, 10);
      this.setState({ready: true});
    });
  }

  slide = (direction) => {
    let sum = 0;
    for(let j=0;j<this.allimages.length;j++) {
      sum += this.allimages[j].offsetWidth;
    }
    let currentPosition = +this.slider.style.marginLeft.slice(0, -2);
    console.log(this.butt1.offsetWidth,this.butt2.offsetWidth);
    if (currentPosition < 0 && direction === "right") {
      this.slider.style.marginLeft =  currentPosition + 150 + "px";
    }
    if(-currentPosition <= sum-window.innerWidth-this.butt2.offsetWidth && direction === "left") {
      this.slider.style.marginLeft =  currentPosition - 150 + "px";
    }
  }

  render() {
    return (
      <div style={styles.container}>
        {
          this.state.ready ? (
            <>
              <button ref={el => this.butt1 = el} style={styles.button} onClick={e => this.slide("right")}>left</button>
              <div style={styles.slider} ref={element => this.slider = element}>
                {
                  this.images.map((image,i) => <img key={image.id} alt={image.title} src={image.url} ref={el =>this.allimages[i]=el}/>)
                }
              </div>
              <button ref={el => this.butt2 = el} style={styles.button} onClick={e => this.slide("left")}>right</button>
            </>
          ) : "Getting images from the server..."
        }
      </div>
    );
  }
}
export default App;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    alignItems: "center"
  },
  slider: {
    display: "flex",
    overflow: "hidden",
    marginLeft: 0,
    transition: "margin 0.3s ease-out"
  },
  button: {
    height: "100%",
    zIndex: 1
  }
};