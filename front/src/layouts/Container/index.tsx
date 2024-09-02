import { AUTH_PATH } from 'constant';
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

//      component: 레이아웃        //
export default function Container() {

    //      state: 현재 페이지 path name 상태      //
    const { pathname } = useLocation();   
    

    //      render: 레이아웃        //
    return (
        <div>
            <Header />
            <Outlet />
            {/* auth 경로일때만 푸터 안나오게  */}
            {pathname !== AUTH_PATH() && <Footer />}
        </div>
    )
}
