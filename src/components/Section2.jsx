import React, { Component } from "react";
import Carousel from "./Carousel/Carousel";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";

class Section2 extends Component {
  state = {};

  render() {
    const { animeInfo } = this.props;
    return (
      <div id="section2" className="section">
        <div className="mal-header">
          <div id="absolute-anime-description">
            {animeInfo ? (
              <div className="anime-details">
                <div className="anime-info">
                  <h3 className="info-heading">Information</h3>
                  <ul className="info-list">
                    <li>
                      <span className="bold">Episodes: </span>
                      <span className="pink bold">{animeInfo.episodes}</span>
                    </li>
                    <li>
                      <span className="bold">Genres: </span>
                      {animeInfo.genres.map((genre, index) => {
                        if (index === animeInfo.genres.length - 1) {
                          return <span key={genre.mal_id}>{genre.name}</span>;
                        } else {
                          return <span key={genre.mal_id}>{genre.name}, </span>;
                        }
                      })}
                    </li>
                    <li>
                      <span className="bold">Status: </span>
                      {animeInfo.status}
                    </li>
                    <li>
                      <span className="bold">Aired: </span>
                      {animeInfo.aired.string}
                    </li>
                    <li>
                      <span className="bold">Duration: </span>
                      {animeInfo.duration}
                    </li>
                    <li>
                      <span className="bold">Rating: </span>
                      {animeInfo.rating}
                    </li>
                  </ul>
                </div>

                <div className="anime-desc-main">
                  <h2>{animeInfo.title}</h2>
                  <h5>{animeInfo.title_japanese}</h5>
                </div>

                <div className="anime-ratings">
                  <h3 className="rating-heading">Ratings</h3>
                  <ul className="rating-list">
                    <li>
                      <span className="bold">Score: </span>
                      <span className="pink bold">{animeInfo.score}</span>
                    </li>
                    <li>
                      <span className="bold">Scored by: </span>#
                      {animeInfo.scored_by}
                    </li>

                    <li>
                      <span className="bold">Ranked: </span>#{animeInfo.rank}
                    </li>
                    <li>
                      <span className="bold">Popularity: </span>#
                      {animeInfo.popularity}
                    </li>
                    <li>
                      <span className="bold">Members: </span>
                      {animeInfo.members}
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="loading-container">
                <CircularProgress
                  size={150}
                  thickness={10}
                  color="#f1f1f1"
                  className="circular-progress"
                />
              </div>
            )}
          </div>
          <div className="header-container">
            <div
              style={{
                fontSize: "2em",
                marginBottom: "20px",
                color: "white"
              }}
            >
              MyAnimeList
            </div>
            <h5
              style={{
                display: "flex",
                flexDirection: "row"
              }}
            >
              RANDOM{" "}
              <span id="anime-color-swapper">
                <span className="blue-anime">ANIME</span>
                <span className="pink-anime">ANIME</span>
              </span>{" "}
              PICKER
            </h5>
          </div>
        </div>
        <Carousel />
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.mal.animeInfo) {
  }
  return {
    animeInfo: state.mal.animeInfo,
    animeDescState: state.mal.animeDescState
  };
};

export default connect(mapStateToProps)(Section2);
