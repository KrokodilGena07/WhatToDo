import React, {FC} from 'react';
import {UserInput} from "../models/IUser";
import {ErrorData} from "../models/ErrorResponse";
import {Link, useLocation} from "react-router-dom";
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import {RouteNames} from "../router";
import {isWrong} from "../utils/isWrong";

interface LoginFormProps {
    user: UserInput;
    setUser: (u: UserInput) => void;
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
    nodeRef: React.MutableRefObject<null>;
    isLoading: boolean;
    err: ErrorData;
}

const LoginForm: FC<LoginFormProps> = props => {
    const location = useLocation();

    return (
        <form
            className='LoginForm'
            onSubmit={e => props.submit(e)}
            ref={props.nodeRef}
        >
            {location.search.includes('r') &&
                <>
                    <label htmlFor="username" className='FormLabel'>username</label>
                    <h6 className='FormInputErr'>{isWrong(props.err, 'username')?.msg}</h6>
                    <Input
                        id='username'
                        value={props.user.username}
                        onChange={v => props.setUser({...props.user, username: v})}
                        className='FormItem'
                        isWrong={!!isWrong(props.err, 'username')}
                    />
                </>
            }
            <label htmlFor="email" className='FormLabel'>email</label>
            <h6 className='FormInputErr'>{isWrong(props.err, 'email')?.msg}</h6>
            <Input
                id='email'
                type='email'
                value={props.user.email}
                onChange={v => props.setUser({...props.user, email: v})}
                className='FormItem'
                isWrong={!!isWrong(props.err, 'email')}
            />
            <label htmlFor="password" className='FormLabel'>password</label>
            <h6 className='FormInputErr'>{isWrong(props.err, 'password')?.msg}</h6>
            <Input
                id='password'
                type='password'
                value={props.user.password}
                onChange={v => props.setUser({...props.user, password: v})}
                className='FormItem'
                isWrong={!!isWrong(props.err, 'password')}
            />
            {props.err.message && !props.err.errors.length &&
                <h5 className='LoginFormErr'>{props.err.message}</h5>
            }
            <Button disabled={props.isLoading} className='LoginFormBtn'>
                {props.isLoading ? 'Loading...' : 'submit'}
            </Button>
            {location.search.includes('l') &&
                <div className='LoginFormLink'>
                    <h5>Not registered?</h5>
                    <Link
                        to={RouteNames.LOGIN + '?type=registration'}
                        className='LoginFormLinkText'
                    >
                        Create an account
                    </Link>
                </div>
            }
        </form>
    );
};

export default LoginForm;