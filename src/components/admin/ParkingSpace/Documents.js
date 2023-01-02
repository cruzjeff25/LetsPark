import React from 'react'
import '../../../styles/admin/documents.css'
import image from '../../../img/in-progress.jpg'

const Documents = () => {

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
              <img src={image} alt="logo" onClick={() => { openInNewTab(image)}}/>
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
            <img src={image} alt="logo" onClick={() => { openInNewTab(image)}}/>
            </div>
          </div>
       </div>
      </div>
    </div>
  )
}

export default Documents