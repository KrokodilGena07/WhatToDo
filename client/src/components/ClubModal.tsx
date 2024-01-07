import React, {FC, useState} from 'react';
import Modal from "./UI/modal/Modal";
import Button from "./UI/button/Button";
import closeIcon from "../assets/svg/closeIcon.svg";
import {IFilter} from "../models/IFilter";
import {useFetchCategoriesQuery, useFetchCitiesQuery, useFetchConnectTypesQuery} from "../services/infoApi";
import Dropdown from "./UI/dropdown/Dropdown";

interface ClubModalProps {
    isVisible: boolean;
    setIsVisible: (v: boolean) => void;
    filter: IFilter;
    setFilter: (f: IFilter) => void;
}

const ClubModal: FC<ClubModalProps> = ({isVisible, setIsVisible, filter, setFilter}) => {
    const [f, setF] = useState(filter);

    const {data: cities} = useFetchCitiesQuery();
    const {data: categories} = useFetchCategoriesQuery();
    const {data: connects} = useFetchConnectTypesQuery();

    const reset = () => {
        setF({...f, connect: 'default', city: 'default', category: 'default'});
    };

    const complete = () => {
        setFilter(f);
        setIsVisible(false);
    };

    if (isVisible) return (
        <Modal setIsVisible={setIsVisible}>
            <div className="ClubModal">
                <div>
                    <div className='ClubModalHead'>
                        <h1>Filter</h1>
                        <Button type='icon' onClick={() => setIsVisible(false)}>
                            <img src={closeIcon} alt="close"/>
                        </Button>
                    </div>
                    <div className='ClubModalBody'>
                        <Dropdown
                            value={f.category}
                            setValue={v => setF({...f, category: v})}
                            options={categories?.map(el => ({title: el.name, value: el.name})) || []}
                        />
                        <Dropdown
                            value={f.city}
                            setValue={v => setF({...f, city: v})}
                            options={cities?.map(el => ({title: el.name, value: el.name})) || []}
                        />
                        <Dropdown
                            value={f.connect}
                            setValue={v => setF({...f, connect: v})}
                            options={connects?.map(el => ({title: el.name, value: el.name})) || []}
                        />
                    </div>
                </div>
                <div>
                    <Button onClick={complete}>OK</Button>
                    <Button onClick={reset} type='secondary' className='ClubModalBtn'>
                        reset
                    </Button>
                </div>
            </div>
        </Modal>
    );

    return <></>;
};

export default ClubModal;