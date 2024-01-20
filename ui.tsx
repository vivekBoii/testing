import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles/ui.css";

import { MemoryRouter, Routes, Route, useNavigate, useLocation, Outlet } from "react-router-dom";

// Pages
import ExportPage from "./pages/Export";
import WaitingForAuthPage from "./pages/Auth";
import ConnectPage from "./pages/Connect";
import NotFoundPage from "./pages/NotFoundPage";
import TagPropPage from "./pages/TagProperties";
import AccountPage from "./pages/Account";
//
import ScrollToTop from "./utils/ScrollToTop";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import ViewCodePage from "./pages/ViewCode";
import ProjectsPage from "./pages/Projects";

import { ErrorBoundary } from "react-error-boundary";
import CreateProjectPage from "./pages/CreateProject";

import { createRoot } from "react-dom/client";
import Popup from "./pages/popupwindow";
import { register, toast } from "./handlers/PluginEventHandler";
import { PropertiesObject } from "../logic/extract/types/PropertiesObject";
import axios from "axios";
const container = document.getElementById("root");
const root = createRoot(container);

function ErrorFallback() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <p>Loc : {location.pathname}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}


const ProtectedRoute = () => {
  return <Outlet />;
};

const MainApp = () => {
  return (

    <Routes>
      <Route path="/" element={<ConnectPage />} />
      <Route path="/wait" element={<WaitingForAuthPage />} />
      {/* <Route path="/export" element={<ExportPage />} /> */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/projects"
          element={<ProjectsPage />}
        />
        <Route
          path="/create"
          element={<CreateProjectPage />}
        />
        <Route path="/project/:id/export" element={<ExportPage />} />
        <Route path="/project/:id/export/:node" element={<TagPropPage />} />


        {/* <Route path="/tag/:id" element={<TagPropPage />} /> */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/viewcode/:id" element={<ViewCodePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>);
};

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000000,
        refetchOnWindowFocus: false,
      },
    },
  });


  return (
    <main>
      <Popup />
      <div className="hidedevtools">
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <ScrollToTop />

              <ErrorBoundary
                FallbackComponent={ErrorFallback}
              >
                <MainApp />
              </ErrorBoundary>

            </MemoryRouter>
            <ReactQueryDevtools />

          </QueryClientProvider>
        </Provider></div>
    </main>
  );
}

root.render(<App />);
