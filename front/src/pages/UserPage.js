import styles from './UserPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLeftLong} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const navigate = useNavigate();
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <section className={styles.head}>
                    <button 
                    className={styles.backBtn}
                    onClick={()=> {navigate(-1)}}
                    >
                        <FontAwesomeIcon icon={faLeftLong} />
                    </button>
                    <div className={styles.headTitle}>
                        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={'30px'}>
                        <path clipRule="evenodd" fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>마이 인포메이션
                    </div>
                    {/* <div className={styles.headTitle}></div> */}
                    <button 
                    onClick={()=> {navigate('/')}}
                    className={styles.homeBtn}>
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </button>
                </section>
                <section className={styles.main}>
                    <ul className={styles.list}>
                      <li>동네 인증</li>
                      <li>내가 작성한 게시물</li>
                      <li>내가 작성한 댓글</li>
                    </ul>
                </section>
            </div>
        </div>
    )
};

export default UserPage;