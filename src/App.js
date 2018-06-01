import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import album1 from "./assets/placeholders/album1.jpg";
import album2 from "./assets/placeholders/album2.jpg";
import album3 from "./assets/placeholders/album3.jpg";
import album4 from "./assets/placeholders/album4.jpeg";
import axios from "axios";
import shuffle from "shuffle-array";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      happyTrack: "",
      happyName: "",
      happyUrl: "",
      mood: "happy",
      song: [],
      checkVal: ""
    };
  }

  onDisplayActive(index) {
    this.setState({
      activeIndex: index
    });
  }

  componentDidMount() {
    const key = "4a9f5581a9cdf20a699f540ac52a95c9";
    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=" +
          this.state.mood +
          "&api_key=" +
          key +
          "&limit=10&format=json"
      )
      .then(res => {
        this.setState({
          song: [res.data]
        });
        // console.log(this.state);
      });
  }

  selectHandler = e => {
    this.setState({
      mood: e.value,
      checkVal: ""
    });

    for (let i = 0; i < 10; i++) {
      document.getElementsByClassName(i)[0].style.background = "#e2edff";
    }

    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=" +
          e.value +
          "&api_key=4a9f5581a9cdf20a699f540ac52a95c9" +
          "&limit=10&format=json"
      )
      .then(res => {
        console.log(this.state.mood);
        console.log([res.data]);
        let array = [res.data];
        let newArray = shuffle(array);
        console.log(newArray);
        this.setState({
          song: newArray
        });
      });
  };

  // onSubmitMood = e => {
  //   this.setState({
  //     mood: e.value,
  //     checkVal: ""
  //   });
  //
  //   for (let i = 0; i < 10; i++) {
  //     document.getElementsByClassName(i)[0].style.background = "#e2edff";
  //   }
  //   axios
  //     .get(
  //       "http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=" +
  //         this.state.mood +
  //         "&api_key=4a9f5581a9cdf20a699f540ac52a95c9" +
  //         "&limit=10&format=json"
  //     )
  //     .then(res => {
  //       console.log("res.data");
  //       console.log([res.data]);
  //       let array = [res.data];
  //       let newArray = shuffle(array);
  //       console.log("newArray");
  //       console.log(newArray);
  //       this.setState({
  //         song: newArray
  //       });
  //     });
  // };

  pressHandler = num => {
    for (let i = 0; i < 10; i++) {
      document.getElementsByClassName(i)[0].style.background = "#e2edff";
    }
    this.setState({
      happyName: document.getElementsByClassName(num)[0].children[2]
        .textContent,
      happyUrl: document.getElementsByClassName(num)[0].children[0].src,
      happyTrack: document.getElementsByClassName(num)[0].children[1]
        .textContent,
      checkVal: "lo"
    });
    document.getElementsByClassName(num)[0].style.background =
      "rgba(52, 52, 52, 0.3)";
  };

  render() {
    const style = {
      margin: "1px"
    };
    const scrollStyle = {
      height: "620px",
      overflow: "auto",
      borderLeft: "1px solid black"
    };

    const allStyle = {
      background: "#e2edff"
    };

    const check =
      this.state.happyUrl && this.state.checkVal ? (
        <div>
          <img
            style={{ width: "75%", height: "50%" }}
            className="pt-5"
            src={this.state.happyUrl}
          />

          <div>{<h2>{this.state.happyTrack}</h2>}</div>
          <div>{<h3>{this.state.happyName}</h3>}</div>
          <div>
            <h3 />
          </div>
        </div>
      ) : (
        <div />
      );
    const moodOptions = ["happy", "sad", "calm", "party", "hardcore", "dance", "bad"];
    const selectOptions = ["one", "two", "three"];
    const defaultMoodOption = moodOptions[0];
    const defaultSelectOption = selectOptions[0];
    return (
      <div className="App" style={{ background: "#e2edff" }}>
        <nav className="navbar navbar-dark bg-dark">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="#">
              Music by Mood
            </a>
          </nav>
        </nav>
        <div className="col-12 pt-5">
          <div className="row">
            <div className="col-4">
              <div>
                <h2>Pick your mood:</h2>
              </div>
              <Dropdown
                options={moodOptions}
                onChange={e => {
                  this.selectHandler(e);
                }}
                value={defaultMoodOption}
                placeholder="Select an option"
              />
            </div>
            <div className="col-2">
              {/* <div>
                <h2>Sort by:</h2>
              </div>
              <Dropdown
                placeholderClassName="Select"
                options={selectOptions}
                onChange={this._onSelect}
                value={defaultSelectOption}
                placeholder="Select an option"
              /> */}

            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-8">
                  <div>{check}</div>
                </div>
                <div className="col-4" style={scrollStyle}>
                  <div>
                    {this.state.song.map(index => {
                      let count = -1;
                      return index.tracks.track.map(id => {
                        count++;
                        let number = count;
                        return (
                          <div
                            style={allStyle}
                            className={number}
                            onClick={() => this.pressHandler(number)}
                          >
                            <img
                              style={{ width: 100, height: 100 }}
                              src={id.image[2]["#text"]}
                            />
                            <p style={style}>
                              {" "}
                              {"\n"}
                              {id.name}
                            </p>
                            <p style={style}>
                              {"\n"}
                              {id.artist.name}
                            </p>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
