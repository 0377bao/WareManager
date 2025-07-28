import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoute } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        {publicRoute.map((route, index) => {
          let Page = route.page;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayout>
                  <Page />
                </DefaultLayout>
              }
            />
          );
        })}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
