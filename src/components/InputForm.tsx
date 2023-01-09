import React, { useState } from "react";
import BgImage from "./BgImage";
import "../styles/input-form.scss";
import InfoIcon from "./InfoIcon";
import { getAnimeForUser } from "../handlers/jikan";

type Props = {};

type FormValues = {
  username: string;
  status: string;
};

export default function InputForm({}: Props) {
  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    status: "Plan to watch",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(await getAnimeForUser("MoreeZ"));
  };

  return (
    <BgImage className="input-form-container">
      <h1>
        Random <span className="primary-color">Anime</span> Picker
      </h1>
      <h2>
        This app uses anime from your MyAnimeList account to decide what anime you
        should watch next.
      </h2>
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-pair">
          <label>
            MAL Username &nbsp;
            <InfoIcon message="Please enter your MyAnimeList account name. This app uses the anime information from you MyAnimeList account." />
          </label>
          <input
            type="text"
            name="username"
            placeholder="Your MAL Username"
            value={formValues.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-pair">
          <label>
            List &nbsp;
            <InfoIcon message="Each anime you add to your MyAnimeList list has a status. eg. Plan to watch will get only roll anime with the status 'Plan to watch'" />
          </label>
          <select
            name="status"
            value={formValues.status}
            onChange={handleChange}
          >
            <option value="Plan to watch">Plan to watch</option>
            <option value="Currently Watching">Currently Watching</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>

        <button type="submit" className="confirm-button">
          Confirm
        </button>
      </form>
    </BgImage>
  );
}
