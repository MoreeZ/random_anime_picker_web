import React, { Component } from "react";
import { connect } from "react-redux";

class CarouselReady extends Component {
  state = {};
  shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  render() {
    const { anime } = this.props;
    let renderXtimes = [];
    //change the value of i < X to render more virtual elements in the spinner
    if (anime.length > 0) {
      for (let i = 0; i < 80; i += anime.length) {
        renderXtimes.push(i);
      }
    }
    console.log("anime in current listType", anime);
    return (
      <React.Fragment>
        <div className="arrow" />
        <div className="carousel">
          {renderXtimes.map(e => (
            <div className="virtual-container" key={e}>
              {anime.map(eachAnime => (
                <div
                  className="virtual-image each-image"
                  key={eachAnime.mal_id}
                >
                  <img src={eachAnime.image_url} alt={eachAnime.title} />
                  <div className="anime-quickdesc">
                    <a
                      href={eachAnime.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {eachAnime.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="real-container">
            {this.shuffle(anime).map(eachAnime => (
              <div
                className="real-image each-image"
                key={eachAnime.mal_id}
                id={eachAnime.mal_id}
              >
                <img src={eachAnime.image_url} alt={eachAnime.title} />
                <div className="anime-quickdesc">
                  <a
                    href={eachAnime.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {eachAnime.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="virtual-container">
            {anime
              .filter(eachAnime => anime.indexOf(eachAnime) < 3)
              .map(eachAnime => (
                <div
                  className="virtual-image each-image"
                  key={eachAnime.mal_id}
                >
                  <img src={eachAnime.image_url} alt={eachAnime.title} />
                  <div className="anime-quickdesc">
                    <a
                      href={eachAnime.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {eachAnime.title}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  if (state.mal.userAnime) {
    if (state.mal.userAnime.length === 0) {
      return {
        anime: state.mal.userAnime
      };
    } else {
      return {
        anime: state.mal.userAnime
      };
    }
  } else {
    return {
      anime: []
    };
  }
};

export default connect(mapStateToProps)(CarouselReady);
