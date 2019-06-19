import React, { Component } from "react";
import Input from "material-ui/TextField";
import Button from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import IconMenu from "material-ui/IconMenu";
import { connect } from "react-redux";
import { fetchAnimeInfo } from "../../actions/malActions";

class CarouselHeader extends Component {
  state = { spinTime: 10000 };

  handleSpin = e => {
    const { anime } = this.props;
    const nodesToArray = childNodes => {
      let arrayOfElements = [];
      for (var i = childNodes.length >>> 0; i--; ) {
        arrayOfElements[i] = childNodes[i];
      }
      return arrayOfElements;
    };

    const randomAnime = anime[Math.floor(Math.random() * anime.length)];
    //IMPORTANT => fetches
    this.props.fetchAnime(randomAnime.mal_id);
    let attemptsToFetch = 0;
    setInterval(() => {
      if (
        this.props.animeDescState.error &&
        !this.props.animeDescState.loading &&
        attemptsToFetch <= 20
      ) {
        attemptsToFetch++;
        this.props.fetchAnime(this.props.currentAnime);
        // console.log("animeDescState", this.props.animeDescState);
      } else return;
    }, 1000);

    const realElement = document.getElementById(randomAnime.mal_id);

    const passVirtualSpace =
      (realElement.parentElement.parentElement.childNodes.length - 2) *
      realElement.parentElement.offsetWidth;

    const realContainerPosition =
      nodesToArray(realElement.parentElement.childNodes).indexOf(realElement) *
      (realElement.offsetWidth + 20);

    const adjustCenter =
      window.innerWidth / 2 -
      18 -
      Math.random() * (realElement.offsetWidth - 13);
    console.log(randomAnime.title, realElement); // <== Logs the winner

    // ====================== ANIMATIONS + DISPLAYS ========================
    const { spinTime } = this.state; //ms

    const spinMe = document.getElementById("spin-button").parentElement;
    const resetButton = document.getElementById("reset-spinner-button")
      .parentElement;
    const displayWinner = document.querySelector(".display-winner");
    const carousel = document.querySelector(".carousel");
    const arrow = document.querySelector(".arrow");
    const usernameInput = document.getElementById("username-input")
      .parentElement.parentElement;
    const listTypeMenuIcon = document.getElementById("list-type-menu-icon");
    const animeDescription = document.getElementById(
      "absolute-anime-description"
    );
    const mainHeader = document.querySelector(".header-container");
    //================ STAGE 1 (instant onClick) ================
    //run the carousel
    carousel.style.transition =
      "transform " + spinTime + "ms cubic-bezier(0.165, 0.84, 0.44, 1)";
    carousel.style.transform =
      "translateX(-" +
      (passVirtualSpace + realContainerPosition - adjustCenter) +
      "px)";

    //hide spin button
    spinMe.style.opacity = "0";
    spinMe.style.transform = "translateY(-40px)";
    spinMe.style.pointerEvents = "none";

    //hide listType menu icon
    listTypeMenuIcon.style.opacity = "0";
    listTypeMenuIcon.style.transform = "translateY(-40px)";
    listTypeMenuIcon.style.pointerEvents = "none";

    //show arrow
    arrow.style.transform = "scaleY(1)";

    //hide usernameInput
    usernameInput.style.transition = "all 200ms ease";
    usernameInput.style.opacity = "0";
    usernameInput.style.transform = "translateY(-40px)";
    usernameInput.style.pointerEvents = "none";

    //change color of "ANIME" in header
    document.getElementById("anime-color-swapper").style.transform =
      "translateY(-1.24em)";
    document.querySelector(".pink-anime").style.opacity = "1";
    document.querySelector(".blue-anime").style.opacity = "0";

    setTimeout(() => {
      // "show" reset and hide spinMe ALSO set disply of listType icon to none
      spinMe.style.display = "none";
      resetButton.style.display = "flex";
      listTypeMenuIcon.style.display = "none";
      displayWinner.style.display = "flex";
      usernameInput.style.display = "none";
    }, 300);

    // ================ STAGE 2 (after spinenr stops) ================
    setTimeout(() => {
      //show winner name
      // displayWinner.textContent = randomAnime.title;
      displayWinner.style.opacity = "1";
      displayWinner.href = randomAnime.url;
      displayWinner.style.transform = "translateY(0px)";
      displayWinner.style.pointerEvents = "all";

      //show reset button
      resetButton.style.opacity = "1";
      resetButton.style.transform = "translateY(0px)";
      resetButton.style.pointerEvents = "all";
      resetButton.style.display = "flex";

      //make transition instant
      carousel.style.transition = "all 500ms ease";

      //show Anime description
      animeDescription.style.transition = "all 200ms ease-in-out";
      animeDescription.style.transform = "translateX(0%)";

      //hide header
      mainHeader.style.transition = "all 200ms ease-in-out";
      mainHeader.style.transform = "translateX(100%)";
    }, spinTime);
  };

  handleReset = e => {
    const spinMe = document.getElementById("spin-button").parentElement;
    const resetButton = document.getElementById("reset-spinner-button")
      .parentElement;
    const displayWinner = document.querySelector(".display-winner");
    const carousel = document.querySelector(".carousel");
    const arrow = document.querySelector(".arrow");
    const usernameInput = document.getElementById("username-input")
      .parentElement.parentElement;
    const listTypeMenuIcon = document.getElementById("list-type-menu-icon");
    const animeDescription = document.getElementById(
      "absolute-anime-description"
    );
    const mainHeader = document.querySelector(".header-container");

    //STAGE 3 (reset)
    carousel.style.transform = "translateX(-100px)";
    carousel.style.transition =
      "transform " +
      this.state.spinTime +
      "ms cubic-bezier(0.165, 0.84, 0.44, 1);";

    //hide winner name
    displayWinner.style.opacity = "0";
    displayWinner.style.transform = "translateY(-50px)";
    displayWinner.style.pointerEvents = "none";

    //hide reset button
    resetButton.style.opacity = "0";
    resetButton.style.transform = "translateY(-50px)";
    resetButton.style.pointerEvents = "none";
    //hide arrow
    arrow.style.transform = "scaleY(0)";

    //Hide anime Info
    animeDescription.style.transform = "translateX(-100%)";
    animeDescription.style.transition = "all 500ms ease-in-out";

    //Show header
    mainHeader.style.transition = "all 500ms ease-in-out";
    mainHeader.style.transform = "translateX(0%)";

    //change color of "ANIME" in header
    document.getElementById("anime-color-swapper").style.transform =
      "translateY(0px)";
    document.querySelector(".pink-anime").style.opacity = "0";
    document.querySelector(".blue-anime").style.opacity = "1";

    //show spin & usernameInput
    setTimeout(() => {
      //show spin button
      spinMe.style.pointerEvents = "all";
      spinMe.style.opacity = "1";
      spinMe.style.transform = "translateY(0px)";

      //show listType menu icon
      listTypeMenuIcon.style.opacity = "1";
      listTypeMenuIcon.style.transform = "translateY(0px)";
      listTypeMenuIcon.style.pointerEvents = "all";

      //show usernameInput
      usernameInput.style.opacity = "1";
      usernameInput.style.transform = "translateY(0px)";
      usernameInput.style.pointerEvents = "all";
      usernameInput.style.display = "flex";

      // remove/add displays
      displayWinner.style.display = "none";
      resetButton.style.display = "none";
      spinMe.style.display = "flex";
      listTypeMenuIcon.style.display = "flex";
    }, 300);
  };

  render() {
    const { anime } = this.props;
    return (
      <div className="top-toolbar">
        <div className="toolbar-left">
          <form
            className="mal-username-form"
            onSubmit={this.props.handleSubmit}
          >
            <Input
              autoComplete="off"
              hintText="Your MyAnimeList username"
              errorText={this.props.error && "Invalid username"}
              id="username-input"
              errorStyle={{
                position: "absolute",
                top: "0",
                left: "0",
                pointerEvents: "none",
                fontSize: "12px"
              }}
            />
            <IconButton
              tooltip="Confirm"
              iconClassName="material-icons"
              type="submit"
            >
              done
            </IconButton>
          </form>
          <a className="display-winner" href="loading" target="_blank">
            View at MyAnimeList
          </a>
        </div>
        <div className="toolbar-right">
          <IconMenu
            onItemClick={this.props.handleChangeListType}
            value={this.props.value}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            targetOrigin={{ horizontal: "right", vertical: "top" }}
            iconButtonElement={
              <IconButton touch={true} id="list-type-menu-icon">
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Plan To Watch" value="6" />
            <MenuItem primaryText="Currently Watching" value="1" />
            <MenuItem primaryText="Completed" value="2" />
            <MenuItem primaryText="On Hold" value="3" />
            <MenuItem primaryText="Dropped" value="4" />
          </IconMenu>
          <Button
            label="ROLL A RANDOM ANIME"
            primary={true}
            onClick={anime.length > 0 ? this.handleSpin : () => {}}
            id="spin-button"
            style={{
              transition: "all 200ms ease"
            }}
          />
          <Button
            label="RESET THE SPINNER"
            secondary={true}
            onClick={anime.length > 0 ? this.handleReset : () => {}}
            id="reset-spinner-button"
            style={{
              display: "none",
              transform: "translateY(-20px)",
              opacity: "0",
              transition: "all 200ms ease",
              pointerEvents: "none"
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    animeDescState: state.mal.animeDescState,
    currentAnime: state.mal.currentAnime
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAnime: anime => {
      dispatch(fetchAnimeInfo(anime));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarouselHeader);
