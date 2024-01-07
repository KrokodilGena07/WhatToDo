import React, {FC, useState} from 'react';
import './NewClub.scss';
import Header from "../../components/UI/header/Header";
import ClubForm from "../../components/ClubForm";
import {ClubInput} from "../../models/IClub";
import {ErrorData} from "../../models/ErrorResponse";
import {useCreateClubMutation} from "../../services/clubApi";
import {catchErr} from "../../utils/catchErr";
import {useTypedSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";

const NewClub: FC = () => {
    const {user} = useTypedSelector(state => state.auth);

    const [club, setClub] = useState<ClubInput>({
        title: '', description: '', source: '', phone: '', price: 0,
        city: 'default', category: 'default', connect: 'default', ownerId: user?.id || 0
    });
    const [clubErr, setClubErr] = useState<ErrorData>({
        message: '', errors: []
    });

    const [create, {isLoading}] = useCreateClubMutation();
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setClubErr({message: '', errors: []});
        await create(club).unwrap()
            .then(() => {
                navigate(-1);
            })
            .catch(err => {
                catchErr(err, setClubErr);
            })
    };

    return (
        <div className='Page'>
            <Header/>
            <div className='FormPageContent'>
                <ClubForm
                    club={club}
                    setClub={setClub}
                    submit={submit}
                    loading={isLoading}
                    err={clubErr}
                />
            </div>
        </div>
    );
};

export default NewClub;