import React, {FC} from 'react';
import './Error.scss';
import Header from "../../components/UI/header/Header";
import Button from "../../components/UI/button/Button";
import {useNavigate} from "react-router-dom";

const Error: FC = () => {
    const navigate = useNavigate();

    return (
        <div className='Page'>
            <Header/>
            <div className='ErrorPageContent'>
                <h1 className='ErrorPageHeadText'>Page not found!</h1>
                <h2 className='ErrorPageText'>404</h2>
                <Button
                    size='lg'
                    onClick={() => navigate(-1)}
                    className='ErrorPageBtn'
                >
                    Back
                </Button>
            </div>
        </div>
    );
};

export default Error;