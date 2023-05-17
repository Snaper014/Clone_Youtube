import * as React from 'react'
import {useNavigate} from 'react-router-dom'

function ErrorFallback({error, resetErrorBoundary}) {
    const navigate = useNavigate()
  
    const handleClick = () => {
      navigate('/')
      resetErrorBoundary()
    }
    return (
        <div style={{width: '100%',
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'}}>
        <div style={{width: '30%',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'}}>
        <img id="error-page-hh-illustration" src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" alt="monkey"></img>
          <p>Cette page est inaccessible. Désolé.</p>
          <p>Essayez d'effectuer une autre recherche.</p>
          <p>{error.message}</p>
          <div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent:'center',height: '100%'}}>
                  <i className="fa-brands fa-youtube" style={{color: 'red', marginRight: '2px', fontSize: '26px'}} onClick={handleClick}></i>          
                  <span  style={{fontWeight: 'normal', fontSize: '24px', fontFamily: 'kenya'}}>YouTube</span>
                  <p style={{fontSize: '10px', height: '35px', alignSelf:'flex-end', marginLeft: '0.4em'}}>FR</p>
              </div>
          </div>
                  
        </div>
        </div>
    )
  }

  export {ErrorFallback}