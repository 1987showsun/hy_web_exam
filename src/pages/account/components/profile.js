/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from 'react-redux';

// Stylesheets
import '../public/stylesheets/profile.scss';

export default ({

}) => {

    const { 
        profile: {
            cover = "",
            email = "",
            name  : {
                first_name = "",
                last_name  = ""
            }
        }
    } = useSelector(state => state.account);

    return(
        <figure className='profile-wrap'>
            <div className='cover'>
                <img src={cover} />
            </div>
            <figcaption>
                <div className='figcaption-row name'>{`${first_name} ${last_name}`}</div>
                <div className='figcaption-row username'>{email}</div>
            </figcaption>
        </figure>
    );
}