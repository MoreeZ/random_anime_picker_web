import axios from "axios";

const getAnimeForUser = async (user: String) => {
  try {
    const response = await axios.get(
      "https://api.jikan.moe/v4/people/{id}/full"
    );
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  return {};
};

export { getAnimeForUser };
