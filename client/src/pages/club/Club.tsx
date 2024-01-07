import React, {FC, useState} from 'react';
import './Club.scss';
import {useLocation} from "react-router-dom";
import {useFetchClubQuery, useSetClubImageMutation} from "../../services/clubApi";
import Header from "../../components/UI/header/Header";
import Loader from "../../components/UI/loader/Loader";
import Button from "../../components/UI/button/Button";
import ClubItemMax from "../../components/ClubItemMax";
import Modal from "../../components/UI/modal/Modal";

const Club: FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [img, setImg] = useState({} as File);

    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const {data: club, isLoading, isError, refetch} = useFetchClubQuery(Number(id));
    const [setClubImage] = useSetClubImageMutation();

    const setImage = (files: FileList | null) => {
        if (files) {
            setImg(files[0]);
        }
    };

    const sendImage = async () => {
        await setClubImage({id: club?.id || 0, image: img as Blob});
        setImg({} as File);
        setIsVisible(false);
    };

    return (
        <div className={`Page ${isVisible && 'PageFreeze'}`}>
            {isVisible &&
                <Modal setIsVisible={setIsVisible}>
                    <div className='FileBox'>
                        <label htmlFor="img" className='FileInput'>
                            {img.name ? img.name : 'select file'}
                        </label>
                        <input
                            id='img'
                            type="file"
                            onChange={e => setImage(e.target.files)}
                            className='InputNone'
                        />
                        <Button size='lg' onClick={sendImage} disabled={!(!!img.name)}>
                            Send
                        </Button>
                    </div>
                </Modal>
            }
            <Header/>
            <div className='ClubPageContainer'>
                {isLoading ?
                    <Loader/>
                    :
                    !isError && <ClubItemMax club={club} setIsVisible={setIsVisible}/>
                }
                {isError && !isLoading &&
                    <div className='ClubPageErr'>
                        <h1>Server error</h1>
                        <Button
                            onClick={refetch}
                            size='lg'
                            className='ClubPageErrBtn'
                        >
                            refetch
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Club;