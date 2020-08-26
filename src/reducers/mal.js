const initState = {
  userAnime: undefined,
  animeInfo: undefined,
  displayOption: {
    success: false,
    loading: false,
    error: false
  },
  animeDescState: {
    success: false,
    loading: false,
    error: false
  },
  errorMessage: "",
  currentUser: "moreez",
  currentAnime: {}
};

const mal = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_MAL_DATA":
      return {
        ...state,
        displayOption: {
          success: false,
          loading: true,
          error: false
        },
        currentUser: action.newUsername
      };
    case "MAL_DATA_REQUEST_SUCCESSFUL":
      console.log("response in reducer: ", action.payload);
      return {
        ...state,
        userAnime: action.payload,
        displayOption: {
          success: true,
          loading: false,
          error: false
        },
        errorMessage: ""
      };
    case "MAL_DATA_REQUEST_FAILED":
      console.log("MAL FAILED", action.error);
      return {
        ...state,
        displayOption: {
          success: false,
          loading: false,
          error: true
        },
        errorMessage: action.error.response.statusMessage
      };
    case "LOADING_ANIME_INFO":
      return {
        ...state,
        animeDescState: {
          success: false,
          loading: true,
          error: false
        },
        currentAnime: action.currentAnime
      };
    case "ANIME_INFO_LOADED":
      return {
        ...state,
        animeInfo: action.payload,
        animeDescState: {
          success: true,
          loading: false,
          error: false
        }
      };
    case "ANIME_INFO_FAILED_TO_LOAD":
      console.log("FAILED TO LOAD ANIME INFO", action.error);
      return {
        ...state,
        animeDescState: {
          success: false,
          loading: false,
          error: true
        }
      };
    default:
      return state;
  }
};

// loadingError: JSON.parse(
//   JSON.parse(action.error.message.replace(/^400 - /, ""))
// )

export default mal;
