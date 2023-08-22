/* eslint-disable import/no-anonymous-default-export */
import { useSearchParams } from "react-router-dom";

// Icons
import { BiSolidPhotoAlbum, BiSolidLock } from 'react-icons/bi';
import { HiCollection } from 'react-icons/hi';
import { FaRegHeart } from 'react-icons/fa';

export default ({

}) => {
    return(
        <ul className="account-tab-ul">
            <li>
                <button>
                    <HiCollection size="25px" />
                </button>
            </li>
            <li>
                <button>
                    <BiSolidPhotoAlbum size="22px" />
                </button>
            </li>
            <li>
                <button>
                    <BiSolidLock size="23px" />
                </button>
            </li>
            <li>
                <button>
                    <FaRegHeart size="20px" />
                </button>
            </li>
        </ul>
    );
}