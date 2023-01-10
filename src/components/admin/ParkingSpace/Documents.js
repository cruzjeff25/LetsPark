import React, { useEffect } from 'react'
import '../../../styles/admin/documents.css'
import image from '../../../img/in-progress.jpg'
import { useLocation } from 'react-router-dom';

const Documents = () => {
  const location = useLocation();
  
  // open image in new tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div className='documents'>
      <h1>PARKING SPACE DOCUMENTS</h1>

      <div className='container'>
       <h1>VIEW PARKING SPACE DOCUMENTS - </h1>
       <div className='box'>
          <div>BUSINESS PERMIT
            <div className='img-container'>
              <img src={location.state.documents[0]} alt="logo" onClick={() => { openInNewTab(location.state.documents[0])}}/>
            </div>
          </div>
          <div>BN - CERTIFICATE
            <div className='img-container'>
              <img src={image} alt="logo" onClick={() => { openInNewTab(image)}} />
            </div>
        </div>
          <div>FIRE SAFETY INSPECTION CERTIFICATE
            <div className='img-container'>
              <img src={image} alt="logo" onClick={() => { openInNewTab(image)}}/>
            </div>
          </div>
          <div>GOVERNMENT ID
            <div className='img-container'>
            <img src={location.state.documents[1]} alt="logo" onClick={() => { openInNewTab(location.state.documents[1])}}/>
            </div>
          </div>
       </div>
      </div>
    </div>
  )
}

export default Documents