import React from 'react'
import { FavoriteListItem  } from 'types/interface'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import './style.css'

interface Props{
    favoriteListItem: FavoriteListItem;
}


//      component: Favoite List Item 컴포넌트       //
export default function FavoriteItem({ favoriteListItem }: Props) {
    //      properties      //
    const {profileImage, nickname} = favoriteListItem

    //      render: Favoite List Item 랜더링        //
    return (
        <div className='fovrite-list-item'>
            <div className='fovrite-list-item-profile-box'>
                <div className='fovrite-list-item-profile-image' style={{ backgroundImage : `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
            </div>
            <div className='fovrite-list-item-nickname'>{nickname}</div>


        </div>
  )
}
