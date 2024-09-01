import styles from './Popup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; // Import the faXmark icon
import { useEffect, useRef } from 'react';
import gsap from 'gsap';


const Popup = ({content, onClose}) => {

    const wrapper = useRef(null);
    const q = gsap.utils.selector(wrapper);


    const closePopup = () => {
        const tl = gsap.timeline();
        tl.to( q('.modal'), {duration: 0.5, scale:0.9, opacity: 0, ease: 'power3.out'});
        tl.to( q('.overlay'), {duration: 0.5, opacity: 0, ease: 'power3.out', onComplete:()=>{
            onClose();
        }}, '-=0.4');
    }

    useEffect(() => {
        const tl = gsap.timeline();
        tl.from(q('.overlay'), {duration: 0.5, opacity: 0, ease: 'power3.out'})
        tl.from(q('.modal'), {duration: 0.5, scale:0.9, opacity: 0, ease: 'power3.out'}, '-=0.4')
    }, [])

    return (
        <div className={`${styles['overlay']} overlay`} ref={wrapper}>
            <div className={`${styles['popup-modal']} modal`}>
                <button className={styles['close']} onClick={closePopup}>
                    <FontAwesomeIcon icon={faXmark} /> 
                </button>
                <div className="flex flex-col text-center">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Popup;