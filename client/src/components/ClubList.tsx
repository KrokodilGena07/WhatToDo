import React, {FC} from 'react';
import {IClub} from "../models/IClub";
import ClubItem from "./ClubItem";

interface ClubListProps {
    clubs: IClub[];
}

const ClubList: FC<ClubListProps> = ({clubs}) => {
    if (!clubs.length) return (
        <div className='ClubVoidList'>
            <h1>Clubs not found!</h1>
        </div>
    )

    return (
        <div className='ClubList'>
            {clubs.map(club =>
                <ClubItem club={club} key={club.id}/>
            )}
        </div>
    )
};

export default ClubList;