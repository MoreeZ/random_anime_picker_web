import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserAnimeList } from "../../actions/malActions";
import CircularProgress from "material-ui/CircularProgress";

import CarouselHeader from "./CarouselHeader";
import CarouselReady from "./CarouselReady";
import CarouselError from "./CarouselError";
import CarouselEmpty from "./CarouselEmpty";
import IconButton from "material-ui/IconButton";
import Dialog from "material-ui/Dialog";

class Carousel extends Component {
  state = {
    listType: "6",
    open: false,
    firstLoaded: false
  };
  handleOpen = () => {
    this.setState({
      ...this.state,
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
  };

  componentDidMount() {
    const { fetchAnime } = this.props;
    console.log("COMPONENT HAS MOUNTED");
    fetchAnime(this.props.username, this.state.listType);
    let attemptsToFetch = 0;
    setInterval(() => {
      if (
        this.props.errorMessage === "Internal Server Error" &&
        !this.props.displayOption.loading &&
        attemptsToFetch <= 20
      ) {
        attemptsToFetch++;
        fetchAnime(this.props.username, this.state.listType);
      } else {
        return;
      }
    }, 1000);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { fetchAnime } = this.props;
    if (e.target[0].value !== "" && e.target[0] !== null) {
      fetchAnime(e.target[0].value, this.state.listType);
      let attemptsToFetch = 0;
      setInterval(() => {
        if (
          this.props.errorMessage === "Internal Server Error" &&
          !this.props.displayOption.loading &&
          attemptsToFetch <= 20
        ) {
          attemptsToFetch++;
          fetchAnime(this.props.username, this.state.listType);
        } else return;
      }, 1000);
    }
  };

  handleChangeListType = (e, val) => {
    this.setState({
      ...this.state,
      listType: val.props.value
    });
    this.props.fetchAnime(this.props.username, val.props.value);
  };

  render() {
    const { anime, displayOption } = this.props;
    return (
      <div className="main-carousel">
        <CarouselHeader
          value={this.state.listType}
          anime={anime}
          handleSubmit={this.handleSubmit}
          error={this.props.errorMessage === "Bad Request"}
          handleChangeListType={this.handleChangeListType}
        />
        <div className="carousel-container">
          {displayOption.loading ||
          this.props.errorMessage === "Internal Server Error" ? (
            <div className="loading-container">
              <CircularProgress
                size={150}
                thickness={10}
                color="#f1f1f1"
                className="circular-progress"
              />
            </div>
          ) : displayOption.success ? (
            <CarouselReady />
          ) : this.props.errorMessage === "Bad Request" ? (
            <CarouselError username={this.props.username} />
          ) : (
            <CarouselEmpty
              listType={this.state.listType}
              username={this.props.username}
            />
          )}
        </div>
        <div className="bottom-toolbar">
          <IconButton
            style={{
              borderColor: "white",
              zIndex: "3"
            }}
            iconClassName="material-icons"
            type="submit"
            onClick={this.handleOpen}
          >
            contact_mail
          </IconButton>
          <a
            href="https://play.google.com/store/apps/details?id=com.randomanimepicker"
            id="play-icon"
          >
            <span>Download my app with many more features on Google Play!</span>
            <img
              src="https://downloads.andyroid.net/wp-content/uploads/2015/09/Google-Play-Store-icon.png"
              alt="PLAY"
            />
          </a>
          <Dialog
            title="Contact the developer"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <span>
              Email: <span>moreez@protonmail.com</span>
            </span>
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("updated user anime", state.mal.userAnime);
  if (state.mal.userAnime) {
    if (state.mal.userAnime.length === 0) {
      return {
        anime: state.mal.userAnime,
        displayOption: state.mal.displayOption,
        noAnime: true,
        errorMessage: state.mal.errorMessage,
        username: state.mal.currentUser
      };
    } else {
      return {
        anime: state.mal.userAnime,
        displayOption: state.mal.displayOption,
        noAnime: false,
        errorMessage: state.mal.errorMessage,
        username: state.mal.currentUser
      };
    }
  } else {
    return {
      anime: [],
      displayOption: state.mal.displayOption,
      noAnime: false,
      errorMessage: state.mal.errorMessage,
      username: state.mal.currentUser
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAnime: (username, listType) => {
      dispatch(fetchUserAnimeList(username, listType));
    },
    clearError: anime => {
      dispatch({ type: "CLEAR_ERROR_MESSAGE", payload: anime });
    },
    changeUsername: username => {
      dispatch({ type: "MAL_DATA_REQUEST_SUCCESSFUL", username: username });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carousel);
