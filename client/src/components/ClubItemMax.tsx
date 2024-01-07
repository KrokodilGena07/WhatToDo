import React, {FC} from 'react';
import {IClub} from "../models/IClub";
import Button from "./UI/button/Button";
import closeIcon from "../assets/svg/closeIcon.svg";
import {Link, useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/redux";
import {useDeleteClubMutation} from "../services/clubApi";

interface ClubItemMaxProps {
    club: IClub | null | undefined;
    setIsVisible: (v: boolean) => void;
}

const ClubItemMax: FC<ClubItemMaxProps> = ({club, setIsVisible}) => {
    const navigate = useNavigate();
    const {user} = useTypedSelector(state => state.auth);
    const [deleteClub] = useDeleteClubMutation();

    const removeClub = async () => {
          await deleteClub(club?.id || 0);
          navigate(-1);
    };

    return (
        <>
            {club ?
                <div className='ClubPageContent'>
                    <div>
                        <div className='ClubPageHead'>
                            <div className='ClubPageImgContainer'>
                                {club.image &&
                                    <img
                                        src={club.image}
                                        alt=""
                                        className='ClubPageImg'
                                    />
                                }
                                <h1 className='ClubPageHeadText'>{club.title}</h1>
                            </div>
                            <Button type='icon' onClick={() => navigate(-1)}>
                                <img src={closeIcon} alt="close"/>
                            </Button>
                        </div>
                        <h2 className='ClubPageText'>{club.description}</h2>
                        <h2 className='ClubPageBoldText'>Phone: {club.phone}</h2>
                        <h2 className='ClubPageBoldText'>
                            Connect: {club.connect === 'default' ? 'online/offline' : club.connect}
                        </h2>
                        <h2 className='ClubPageBoldText'>City: {club.city}</h2>
                        <h2 className='ClubPageBoldText'>Price: {club.price || 'Free'}</h2>
                    </div>
                    <div className='ClubPageButtons'>
                        <Link to={club.source}>
                            <Button size='lg'>Follow the link</Button>
                        </Link>
                        {user?.id === club.ownerId &&
                            <>
                                <Button
                                    size='lg'
                                    type='outline'
                                    className='ClubPageBtn'
                                    onClick={() => setIsVisible(true)}
                                >
                                    Set image
                                </Button>
                                <Button
                                    size='lg'
                                    type='secondary'
                                    onClick={removeClub}
                                >
                                    Delete
                                </Button>
                            </>
                        }
                    </div>
                </div>
                :
                <div className='ClubPageErr'>
                    <h1>Club not found!</h1>
                </div>
            }
        </>
    );
};

export default ClubItemMax;