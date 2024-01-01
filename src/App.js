import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pagesize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0)
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                country="in"
                pagesize={9}
                category="general"
              />
            }
          ></Route>
          <Route
            exact
            path="/Categories"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="Categories"
                country="in"
                pagesize={9}
                category="Categories"
              />
            }
          ></Route>
          <Route
            exact
            path="/Business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="Business"
                country="in"
                pagesize={9}
                category="Business"
              />
            }
          ></Route>
          <Route
            exact
            path="/Entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="Entertainment"
                country="in"
                pagesize={9}
                category="Entertainment"
              />
            }
          ></Route>
          <Route
            exact
            path="/Health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="Health"
                country="in"
                pagesize={9}
                category="Health"
              />
            }
          ></Route>
          <Route
            exact
            path="/Science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="Science"
                country="in"
                pagesize={9}
                category="Science"
              />
            }
          ></Route>
          <Route
            exact
            path="/Sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="Sports"
                country="in"
                pagesize={9}
                category="Sports"
              />
            }
          ></Route>
          <Route
            exact
            path="/Technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="Technology"
                country="in"
                pagesize={9}
                category="Technology"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;