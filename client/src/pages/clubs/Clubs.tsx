import React, {FC, useMemo, useState} from 'react';
import './Clubs.scss';
import {useFetchClubsQuery} from "../../services/clubApi";
import Header from "../../components/UI/header/Header";
import {IClub} from "../../models/IClub";
import {IFilter} from "../../models/IFilter";
import ClubList from "../../components/ClubList";
import Loader from "../../components/UI/loader/Loader";
import ClubFilter from "../../components/ClubFilter";
import Button from "../../components/UI/button/Button";
import ClubModal from "../../components/ClubModal";

const Clubs: FC = () => {
    const [sort, setSort] = useState('desc');
    const [isVisible, setIsVisible] = useState(false);
    const [filter, setFilter] = useState<IFilter>({
        search: '', connect: 'default', city: 'default', category: 'default'
    });
    const {data: clubs, isError, isLoading, refetch} = useFetchClubsQuery(filter);

    const sortedClubs: IClub[] = useMemo(() => {
        if (clubs) {
            switch (sort) {
                case 'asc': return [...clubs].sort((a, b) => a.price - b.price);
                case 'desc': return [...clubs].sort((a, b) => b.price - a.price);
                default: return clubs;
            }
        }
        return [];
    }, [sort, clubs]);

    return (
        <div className={`Page ${isVisible && 'PageFreeze'}`}>
            <ClubModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                filter={filter}
                setFilter={setFilter}
            />
            <Header/>
            <div className='ClubsPageContent'>
                {isLoading ?
                    <Loader/>
                    :
                    !isError && <>
                        <ClubFilter
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            setIsVisible={setIsVisible}
                        />
                        <ClubList clubs={sortedClubs}/>
                    </>
                }
                {isError && !isLoading &&
                    <div className='ClubsPageErr'>
                        <h1>Server error</h1>
                        <Button onClick={refetch} size='lg'>
                            refetch
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Clubs;