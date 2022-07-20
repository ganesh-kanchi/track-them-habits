import { Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react"
import "./HomePage.css";
import { NavBar } from "../../components/NavBar/NavBar";
import {ProfileCard} from "../../components/ProfileCard/ProfileCard"
import { HabitModal } from "../../components/Modal/Modal";
import {fetchHabits, selectHabits} from "../../features/habits";
import { useSelector } from "react-redux";
import { HabitsListing } from "../../components/HabitListing/HabitListing";

export const HomePage = () => {
    const {user, token} = useSelector((state)=> state.auth);
    const habitsData = useSelector(selectHabits);
    const { firstName } = user;
    useEffect( ()=>{
        fetchHabits(token)
        localStorage.setItem("habits",habitsData)
        },[habitsData]
    );

    const [isOpen,setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    return (
        <div className="grid-page-container">
            <Typography variant="h4" component="div" className="main-head">Track<span className="accent-text">Them</span>Habits</Typography>
            <NavBar />
            <ProfileCard />
            <HabitModal isOpen={isOpen} setIsOpen={setIsOpen} />
            
            <div className="page-main-section">
                <div className="habits-dashboard-head" >
                    <Typography variant="h5" component="div" className="user-greeting"> 
                        Welcome, {firstName}
                    </Typography> 
                    <select className="select-date" name="day" id="day">
                        <option value="Yesterday">Yesterday</option>
                        <option value="Today">Today</option>
                        <option value="Tommorrow">Tommorrow</option>
                    </select>
                </div>
                <div className="flex-four-column">
                    {["Completed", "In progress", "Overdue", "Total"].map(task => 
                            (<div className="flex-item card-minimal">
                                <Typography variant="h5" component="div">{task}</Typography>
                                <Typography variant="h3" component="div">0</Typography>
                                <Typography variant="h6" component="div">Total Count</Typography>
                            </div>))}
                </div>
                <div className="habits-dashboard-head">
                    <Typography variant="h5" component="div">My Habits</Typography>
                    <Button variant="text" onClick={handleOpen}>+ New Habit</Button>
                </div>
                {habitsData.length > 0 ? (
                    <HabitsListing habits={habitsData} />
                ): null}
                
                    {/* <HabitsListing habits={habitsData} /> */}
                
                {/* <Typography variant="h6" component="div">ACTIVE</Typography>
                <div className="flex-four-column">
                    {habitsData.map(task => 
                            <HabitCard task={task} />
                        )}
                </div>
                <Typography variant="h6" component="div">COMPLETED</Typography>
                <div className="flex-four-column">
                    {habitsData.map(task => 
                        (<div className="flex-item card-minimal">
                            <Typography variant="h5" component="div">{task}</Typography>
                            <Typography variant="h3" component="div">16</Typography>
                            <Typography variant="h6" component="div">Total Count</Typography>
                        </div>))}
                </div> */}
            </div>
        </div>
    )
}