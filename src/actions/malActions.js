import { Mal } from "node-myanimelist";
const pThrottle = require("p-throttle");
const pRetry = require("p-retry");

// const run = async () => {
//   const response = await Mal.user("Aemnesias", "animelist", "all", 1);
//   return response;
// };

export const fetchUserAnimeList = (username, listType) => {
  return dispatch => {
    dispatch({ type: "LOADING_MAL_DATA", newUsername: username });
    Mal.user(username)
      .then(user => user.anime_stats.total_entries)
      .then(entries => {
        const pages = Math.floor(entries / 300) + 1;
        let allAnime = [];

        const throttled = pThrottle(i => i, 1, 1000);

        for (let i = 1; i <= pages; i++) {
          throttled(i)
            .then(() => {
              const run = async () => {
                const response = await Mal.user(username, "animelist", "all", i)
                  .then(res => {
                    allAnime.push(...res.anime);
                    return res;
                  })
                  .then(res => {
                    console.log(i, res);
                    return res;
                  })
                  .then(() => {
                    if (allAnime.length === entries) {
                      console.log("allAnime", allAnime);
                      const filtered = allAnime.filter(
                        each => each.watching_status === Number(listType)
                      );
                      return dispatch({
                        type: "MAL_DATA_REQUEST_SUCCESSFUL",
                        payload: filtered
                      });
                    }
                  })
                  .catch(err => {
                    if (
                      JSON.parse(err.error).message ===
                      "Something went wrong, please try again later"
                    ) {
                      return dispatch({
                        type: "MAL_DATA_REQUEST_FAILED",
                        error: err
                      });
                    }
                  });
                return Response;
              };
              (async () => {
                await pRetry(run, {
                  retries: 5
                });
              })();
            })
            .catch(err => console.log("ERROR HAS OCCURED", err));
        }
      });
  };
};

// export const fetchUserAnimeList = (username, listType) => {
//   return dispatch => {
//     dispatch({ type: "LOADING_MAL_DATA", newUsername: username });
//     return Mal.user(username, "animelist", "all", "3")
//       .then(MalData => {
//         console.log("Response in Action: ", MalData);
//         const filterType = MalData.anime.filter(
//           each => each.watching_status === Number(listType)
//         );
//         return filterType;
//       })
//       .then(res =>
//         dispatch({ type: "MAL_DATA_REQUEST_SUCCESSFUL", payload: res })
//       )
//       .catch(err => dispatch({ type: "MAL_DATA_REQUEST_FAILED", error: err }));
//   };
// };

export const fetchAnimeInfo = anime => {
  return dispatch => {
    dispatch({ type: "LOADING_ANIME_INFO", currentAnime: anime });
    return Mal.anime(anime)
      .then(j => j)
      .then(res => dispatch({ type: "ANIME_INFO_LOADED", payload: res }))
      .catch(err =>
        dispatch({ type: "ANIME_INFO_FAILED_TO_LOAD", error: err })
      );
  };
};
