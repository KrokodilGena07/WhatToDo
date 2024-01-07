import React, {FC} from 'react';
import './Home.scss';
import Header from "../../components/UI/header/Header";
import {useTypedSelector} from "../../hooks/redux";
import Button from "../../components/UI/button/Button";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";

const Home: FC = () => {
    const {user} = useTypedSelector(state => state.auth);
    const navigate = useNavigate();

    return (
        <div className='Page'>
            <Header/>
            <div className='HomePageContent'>
                <div className='HomePageFirstText'>
                    <h1 className='HomePageHeadText'>WhatToDo - new web service for searching hobbies and clubs</h1>
                    <h1 className='HomePageText'>You can find whatever and whenever you want there</h1>
                </div>
                {!user &&
                    <div className='HomePageButtons'>
                        <Button
                            onClick={() => navigate(RouteNames.LOGIN + '?q=l')}
                            size='lg'
                        >
                            Start
                        </Button>
                        <Button
                            onClick={() => navigate(RouteNames.CLUBS)}
                            size='lg'
                            className='HomePageBtn'
                            type='secondary'
                        >
                            Find clubs
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;