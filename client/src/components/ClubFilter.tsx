import React, {FC} from 'react';
import {IFilter} from "../models/IFilter";
import Input from "./UI/input/Input";
import Dropdown from "./UI/dropdown/Dropdown";
import Button from "./UI/button/Button";
import filterIcon from '../assets/svg/filterIcon.svg';

interface ClubFilterProps {
    sort: string;
    setSort: (s: string) => void;
    filter: IFilter;
    setFilter: (f: IFilter) => void;
    setIsVisible: (v: boolean) => void;
}

const ClubFilter: FC<ClubFilterProps> = ({sort, setSort, filter, setFilter, setIsVisible}) => {
    return (
        <div className='ClubFilter'>
            <Input
                value={filter.search}
                onChange={s => setFilter({...filter, search: s})}
                placeholder='Search...'
            />
            <div className='ClubFilterMenu'>
                <Dropdown
                    value={sort}
                    setValue={setSort}
                    options={[
                        {value: 'default', title: 'default'},
                        {value: 'asc', title: 'price ascending'},
                        {value: 'desc', title: 'price descending'}
                    ]}
                />
                <Button type='icon' onClick={() => setIsVisible(true)}>
                    <img src={filterIcon} alt="click"/>
                </Button>
            </div>
        </div>
    );
};

export default ClubFilter;