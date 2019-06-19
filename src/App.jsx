import React from "react";
import { MuiThemeProvider } from "material-ui/styles";
import Section2 from "./components/Section2";

function App() {
  return (
    <MuiThemeProvider>
      <div className="App">
        <main>
          <Section2 />
        </main>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
