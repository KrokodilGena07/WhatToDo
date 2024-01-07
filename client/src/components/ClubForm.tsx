import React, {FC} from 'react';
import {ClubInput} from "../models/IClub";
import {ErrorData} from "../models/ErrorResponse";
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import {useFetchCategoriesQuery, useFetchCitiesQuery, useFetchConnectTypesQuery} from "../services/infoApi";
import Dropdown from "./UI/dropdown/Dropdown";
import {isWrong} from "../utils/isWrong";

interface ClubFormProps {
    club: ClubInput;
    setClub: (c: ClubInput) => void;
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean;
    err: ErrorData;
}

const ClubForm: FC<ClubFormProps> = props => {
    const {data: cities} = useFetchCitiesQuery();
    const {data: categories} = useFetchCategoriesQuery();
    const {data: connects} = useFetchConnectTypesQuery();

    return (
        <form
            className='ClubForm'
            onSubmit={e => props.submit(e)}
        >
            <div className='ClubFormContent'>
                <div className='ClubFormColumn'>
                    <label htmlFor="title" className='FormLabel'>title</label>
                    <h6 className='FormInputErr'>{isWrong(props.err, 'title')?.msg}</h6>
                    <Input
                        id='title'
                        value={props.club.title}
                        onChange={v => props.setClub({...props.club, title: v})}
                        className='FormItem'
                        isWrong={!!isWrong(props.err, 'title')}
                    />
                    <label htmlFor="description" className='FormLabel'>description</label>
                    <h6 className='FormInputErr'>{isWrong(props.err, 'description')?.msg}</h6>
                    <Input
                        id='description'
                        value={props.club.description}
                        onChange={v => props.setClub({...props.club, description: v})}
                        className='FormItem'
                        isWrong={!!isWrong(props.err, 'description')}
                    />
                    <label htmlFor="city" className='FormLabel'>city</label>
                    <Dropdown
                        value={props.club.city}
                        setValue={v => props.setClub({...props.club, city: v})}
                        options={cities?.map(el => ({title: el.name, value: el.name})) || []}
                        className='FormItem'
                    />
                    <label htmlFor="phone" className='FormLabel'>phone</label>
                    <h6 className='FormInputErr'>{isWrong(props.err, 'phone')?.msg}</h6>
                    <Input
                        id='phone'
                        type='phone'
                        value={props.club.phone}
                        onChange={v => props.setClub({...props.club, phone: v})}
                        className='FormItem'
                        isWrong={!!isWrong(props.err, 'phone')}
                    />
                </div>
                <div className='ClubFormColumn'>
                    <label htmlFor="source" className='FormLabel'>source</label>
                    <h6 className='FormInputErr'>{isWrong(props.err, 'source')?.msg}</h6>
                    <Input
                        id='source'
                        type='url'
                        value={props.club.source}
                        onChange={v => props.setClub({...props.club, source: v})}
                        className='FormItem'
                        isWrong={!!isWrong(props.err, 'source')}
                    />
                    <label htmlFor="category" className='FormLabel'>category</label>
                    <Dropdown
                        value={props.club.category}
                        setValue={v => props.setClub({...props.club, category: v})}
                        options={categories?.map(el => ({title: el.name, value: el.name})) || []}
                        className='FormItem'
                    />
                    <label htmlFor="price" className='FormLabel'>price</label>
                    <h6 className='FormInputErr'>{isWrong(props.err, 'price')?.msg}</h6>
                    <Input
                        id='price'
                        type='number'
                        value={props.club.price}
                        onChange={v => props.setClub({...props.club, price: v})}
                        className='FormItem'
                        isWrong={!!isWrong(props.err, 'price')}
                    />
                    <label htmlFor="connect" className='FormLabel'>connect</label>
                    <Dropdown
                        value={props.club.connect}
                        setValue={v => props.setClub({...props.club, connect: v})}
                        options={connects?.map(el => ({title: el.name, value: el.name})) || []}
                        className='FormItem'
                    />
                </div>
            </div>
            <div>
                <Button
                    size='lg'
                    disabled={props.loading}
                    className='ClubFormBtn'
                >
                    {props.loading ? 'loading...' : 'Submit'}
                </Button>
            </div>
        </form>
    );
};

export default ClubForm;