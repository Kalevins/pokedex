import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";

import { Details, Home } from "@/pages";
import { Loading } from "@/containers";

export function Router(): ReactElement {

  return (
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/pokedex/'}>
      <Routes>
        <Route path="/" element={<Loading />} >
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
