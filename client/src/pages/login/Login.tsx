import React, {FC, useEffect, useRef, useState} from 'react';
import './Login.scss';
import Header from "../../components/UI/header/Header";
import {CSSTransition} from "react-transition-group";
import {UserInput} from "../../models/IUser";
import {ErrorData} from "../../models/ErrorResponse";
import {useLocation, useNavigate} from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import {useLoginMutation, useRegistrationMutation} from "../../services/authApi";
import {useActions} from "../../hooks/redux";
import {RouteNames} from "../../router";
import {catchErr} from "../../utils/catchErr";

const Login: FC = () => {
    const [newUser, setNewUser] = useState<UserInput>({
        username: '', password: '', email: ''
    });
    const [authErr, setAuthErr] = useState<ErrorData>({
        message: '', errors: []
    });
    const [onProp, setOnProp] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setOnProp(true);
    }, []);
    useEffect(() => {
        setNewUser({username: '', email: '', password: ''});
        setAuthErr({message: '', errors: []});
    }, [location.search]);

    const nodeRef = useRef(null);
    const {setUser} = useActions();

    const [registration, {isLoading}] = useRegistrationMutation();
    const [login, {isLoading: loadingFlag}] = useLoginMutation();
    const authorize = location.search.includes('l') ? login : registration;

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAuthErr({message: '', errors: []});
        await authorize(newUser).unwrap()
            .then(data => {
                setUser(data);
                navigate(RouteNames.HOME);
            })
            .catch(err => {
                catchErr(err, setAuthErr);
            })
    };

    return (
        <div className='Page PageFreeze'>
            <Header/>
            <div className='FormPageContent'>
                <CSSTransition
                    in={onProp}
                    timeout={400}
                    mountOnEnter
                    classNames={{enter: 'loginEnter'}}
                    nodeRef={nodeRef}
                >
                    <LoginForm
                        user={newUser}
                        setUser={setNewUser}
                        submit={submit}
                        nodeRef={nodeRef}
                        err={authErr}
                        isLoading={isLoading || loadingFlag}
                    />
                </CSSTransition>
            </div>
        </div>
    );
};

export default Login;