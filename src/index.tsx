import "./index.less";
import React, { Component, Suspense, lazy } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const A = lazy(() => import("./a"));
const B = lazy(() => import("./b"));

if ((module as any).hot) {
  (module as any).hot.accept();
}

const Loading = () => <div>Loading...</div>;

class Index extends Component {
  render() {
    return (
      <Router>
        <Route
          path="/a"
          exact={true}
          render={() => {
            return (
              <Suspense fallback={<Loading />}>
                <A />
              </Suspense>
            );
          }}
        />
        <Route
          path="/b"
          exact={true}
          render={() => {
            return (
              <Suspense fallback={<Loading />}>
                <B />
              </Suspense>
            );
          }}
        />
        <Link to="/a">to A</Link>
        <br />
        <Link to="/b">to B</Link>
      </Router>
    );
  }
}

export default Index;

ReactDom.render(<Index />, document.getElementById("app"));
