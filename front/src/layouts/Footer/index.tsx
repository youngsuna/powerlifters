import React from 'react'
import './style.css';

//      component: 푸터 레이아웃        //
export default function Footer() {

    //      event handler: 인스타 아이콘 버튼 클릭 이벤트 처리      // 
    const onInstaIconButtonClickHandler = () => {
        window.open('https://www.instagram.com');
    };
        
    //      event handler: 네이버 블로그 이이콘 버튼 클릭 이벤트 쳐리       //
        const onNaverBlogIconButtonClickHandler = () => {
        window.open('https://blog.naver.com');
    }

    //render: 부터 레이아웃 렌더링      //
    return (
        <div id='footer'>
            <div className='footer-container'>
                <div className='footer-top'>
                    <div className='footer-logo-box'>
                        <div className='icon-box'>
                            <div className='icon logo-light-icon'></div>
                        </div>
                        <div className='footer-logo-text'>{'YSs Board'}</div>
                    </div>
                    <div className= 'footer-link-box'>
                        <div className='footer-email-link'>('zll11@naver.com')</div>
                        <div className='icon-button'>
                            <div className='icon insta-icon' onClick={onInstaIconButtonClickHandler}></div>
                        </div>
                        <div className='icon-button'>
                            <div className='icon  naver-blog-icon' onClick={onNaverBlogIconButtonClickHandler}></div>
                        </div>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='footer-copyright'>{'Copylight 김영수'}</div>
                </div>
            </div>
        </div>
    )
}