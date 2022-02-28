import { Fragment, Suspense, lazy } from "react";
import { Routes as R, Route } from "react-router-dom";

const ROUTES = Object.entries(
  import.meta.glob("/src/pages/**/[a-zA-Z[]*.{jsx,tsx}")
).map(([route, component]) => {
  let path = route
    .replace(/\/src\/pages|Index|\.jsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  if (path === "//") {
    path = "";
  }

  return { path, component: lazy(component) };
});

const PRESERVED = Object.entries(
  import.meta.glob("/src/pages/(_app|404).jsx")
).reduce((acc, [file, component]) => {
  const key = file.replace(/\/src\/pages\/|\.jsx$/g, "");

  return { ...acc, [key]: component.default };
}, {});


export default function Routes() {
  const App = PRESERVED?.["_app"] || Fragment;
  const NotFound = PRESERVED?.["404"] || Fragment;

  return (
    <App>
      <Suspense fallback={""}>
        <R>
          {ROUTES.map(({ path, component: Component = Fragment }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })}
          <Route path="*" component={NotFound} />
        </R>
      </Suspense>
    </App>
  );
}
