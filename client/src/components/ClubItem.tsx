import React, {FC} from 'react';
import {IClub} from "../models/IClub";
import {Link, useNavigate} from "react-router-dom";
import Button from "./UI/button/Button";

interface ClubItemProps {
    club: IClub;
}

const ClubItem: FC<ClubItemProps> = ({club}) => {
    const description = club.description.slice(0, 200);
    const navigate = useNavigate();

    return (
        <div className='ClubItem'>
            <div>
                <div className='ClubItemHead'>
                    <img
                        src={club.image || ''}
                        alt="club image"
                        className='ClubItemImage'
                    />
                    <h2 className='ClubItemTitle'>{club.title}</h2>
                </div>
                <h3 className='ClubItemDescription'>{description}</h3>
            </div>
            <div className='ClubItemButtons'>
                <Button onClick={() => navigate(`/clubs/${club.id}`)}>Open</Button>
                <Link to={club.source} className='ClubItemLink'>
                    <Button type='secondary'>Link</Button>
                </Link>
            </div>
        </div>
    );
};

export default ClubItem;