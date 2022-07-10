import React from "react";
import { Routes, Route } from "react-router-dom"
import { LandingPage, HomePage, Login, Signup } from "../pages"
import { PrivateRoute } from "./PrivateRoutes";
import Mockman from "mockman-js";
import { LabelsPage } from "../pages/LabelsPage/LabelsPage";
import { ArchivesPage } from "../pages/ArchivesPage/ArchivesPage";
import { TrashPage } from "../pages/TrashPage/TrashPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";


export const AllRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="home" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
            <Route path="labels" element={<PrivateRoute> <LabelsPage /> </PrivateRoute>} />
            <Route path="archive" element={<PrivateRoute><ArchivesPage /></PrivateRoute>} />
            <Route path="trash" element={<PrivateRoute><TrashPage /></PrivateRoute>} />
            <Route path="profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="mockman" element={<Mockman />} />
        </Routes>
    )
}