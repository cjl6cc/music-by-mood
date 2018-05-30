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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      happyTrack: "",
      happyName: "",
      happyUrl: "",
      mood: "",
      song: []
    };
  }

  onDisplayActive(index) {
    this.setState({
      activeIndex: index,
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
          happyTrack: res.data.tracks.track[0].name,
          happyName: res.data.tracks.track[0].artist.name,
          happyUrl: res.data.tracks.track[0].image[2]["#text"]
        });
        // console.log(this.state);
      });
  }

  selectHandler = e => {
    //console.log(e.value);
    this.setState({
      mood: e.value
    });
  };

  onSubmitMood = (e) => {
    this.setState({
      mood: e.value
    })
    axios
      .get("http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=" + this.state.mood + "&api_key=4a9f5581a9cdf20a699f540ac52a95c9" +
      "&limit=10&format=json")
      .then(res => {
        this.setState({
          song: [res.data]
        })
      })
    // console.log(this.state.song);
  }

  render() {
    console.log(this.state.song);
    const moodOptions = ["happy", "sad", "calm"];
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
            <div className="col-3">
              <div>
                <h2>Moods:</h2>
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
            <div className="col-3">
              <div>
                <h2>Sort by:</h2>
              </div>
              <Dropdown
                placeholderClassName="Select"
                options={selectOptions}
                onChange={this._onSelect}
                value={defaultSelectOption}
                placeholder="Select an option"
              />
              <div className="d-flex pt-5">
                <button
                  type="button"
                  className="btn btn-success btn-lg ml-auto"
                  onClick={(e) => this.onSubmitMood(e)}
                >
                  Go Search
                </button>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-8">
                  <div>
                    <img
                      style={{ width: "75%", height: "50%" }}
                      className="pt-5"
                      src={album1}
                    />
                    <div>
                      <h2>Rolling in the deep</h2>
                    </div>
                    <div>
                      <h3>21</h3>
                    </div>
                    <div>
                      <h3>Soul/Pop</h3>
                    </div>
                  </div>
                </div>
                <div
                  className="col-4"
                  style={{ borderLeft: "1px solid black" }}
                >


                    <div>


                      {this.state.song.map((index)=> {
                        return index.tracks.track.map((id)=>{
                          console.log(id);
                          return (
                            <div>
                              <h1>{id.name}</h1>
                              <h4>{id.artist.name}</h4>
                              <img
                                style={{width: 100, height: 100}}
                                src={id.image[2]["#text"]}
                              />
                            </div>

                          )
                        })
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
