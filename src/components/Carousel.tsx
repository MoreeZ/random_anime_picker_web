import React from "react";

type Props = {};

export default function Carousel({}: Props) {
  return (
    <div>
      <h3>Not working</h3>

      <p>
        {" "}
        Currently out of use. The REST API named Jikan API which this project
        has used has deprecated their getUserAnime endpoints. This means that
        the main funcitonality of this app has been completely disabled.
      </p>
      <h3>Current situation.</h3>

      <p>
        Currently I got rid of the old source code as it was extremely outdated.
      </p>
      <p>
        I created a new Gastby app and started implementing new design to the
        app.
      </p>

      <h3>The plan</h3>
      <p>
        By the end of February I will launch a new version of this app which
        will communicate with my cloud server to authenticate users with the
        official MAL API. For now the app is dead.
      </p>
    </div>
  );
}
