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
    this.state = { activeIndex: 0 };
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
        "http://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=happy&api_key=" +
          key +
          "&limit=10&format=json"
      )
      .then(res => {
        console.log(res.data.tracks.track[0].name);
      });
  }

  render() {
    const moodOptions = ["happy", "sad", "calm"];
    const selectOptions = ["one", "two", "three"];
    const defaultMoodOption = moodOptions[0];
    const defaultSelectOption = selectOptions[0];
    return (
      <div className="App" style={{ background: "#e2edff" }}>
        <nav class="navbar navbar-dark bg-dark">
          <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="#">
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
                onChange={this._onSelect}
                value={defaultMoodOption}
                placeholder="Select an option"
              />
            </div>
            <div className="col-3">
              <div>
                <h2>Sort by:</h2>
              </div>
              <Dropdown
                options={selectOptions}
                onChange={this._onSelect}
                value={defaultSelectOption}
                placeholder="Select an option"
              />
              <div className="d-flex pt-5">
                <button
                  type="button"
                  className="btn btn-success btn-lg ml-auto"
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
                  <div
                    style={
                      this.state.activeIndex == 0
                        ? { background: "#cecece", borderRadius: 20 }
                        : {}
                    }
                  >
                    <img
                      style={{ width: 100, height: 100 }}
                      className="pt-4"
                      src={album1}
                      onClick={() => this.onDisplayActive(0)}
                    />
                    <div>
                      <h4>song1</h4>
                    </div>
                  </div>
                  <div
                    style={
                      this.state.activeIndex == 1
                        ? { background: "#cecece", borderRadius: 20 }
                        : {}
                    }
                  >
                    <img
                      style={{ width: 100, height: 100 }}
                      className="pt-4"
                      src={album2}
                      onClick={() => this.onDisplayActive(1)}
                    />
                    <div>
                      <h4>song2</h4>
                    </div>
                  </div>
                  <div
                    style={
                      this.state.activeIndex == 2
                        ? { background: "#cecece", borderRadius: 20 }
                        : {}
                    }
                  >
                    <img
                      style={{ width: 100, height: 100 }}
                      className="pt-4"
                      src={album3}
                      onClick={() => this.onDisplayActive(2)}
                    />
                    <div>
                      <h4>song3</h4>
                    </div>
                  </div>
                  <div
                    style={
                      this.state.activeIndex == 3
                        ? { background: "#cecece", borderRadius: 20 }
                        : {}
                    }
                  >
                    <img
                      style={{ width: 100, height: 100 }}
                      className="pt-4"
                      src={album4}
                      onClick={() => this.onDisplayActive(3)}
                    />
                    <div>
                      <h4>song4</h4>
                    </div>
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
