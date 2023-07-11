import * as React from 'react';
import '../../App.css';
import { useParams} from 'react-router-dom';
import { GetAbout} from '../../utils/Appel';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';


export function Liens(){
    let {chaId} = useParams()
    const [data, setData] = React.useState()
    console.log("Data venant du channel lien", data)
    React.useEffect(() => {
        GetAbout(chaId)
        .then(response => setData(response))
        .catch(error => console.log(error))
    }, [chaId])

 
    if(!data){
        return (
          <div style={{display: 'flex',alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'}}>
              <CircularProgress style={{fontSize: '40px'}}/>
          </div>
        )           
    }

    return(
        <div style={{width: '100%', 
                    border : '1px sold green',
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '18px'
            }}>
            <div style={{width: '100%',
                border: '1px solid orange',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <div style={{width: '70%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            border: '1px solid red',
                            }}>
                  <h4 style={{marginBottom: '2%', fontSize: '22px'}}>Description</h4>
                  <p style={{marginBottom: '4%'}}>{data?.data?.description}</p>
                  <hr />
                  <p style={{marginBottom: '2%', fontSize: '18px'}}>Informations</p>
                  <div style={{width: '100%', marginBottom: '5%'}}> 
                        pays : <span style={{marginLeft: '5%'}}>{data?.data?.country}</span>
                    </div>
                    <hr />
                {!data?.data?.links ? <div></div> : 
                <>
                    <p style={{marginBottom: '2%', fontSize: '18px'}}>Liens</p>
                    <div style={{display: 'flex', 
                                    flexDirection: 'row', 
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    width: '50%',
                            }}>
                    {data?.data?.links.map((element, index) => (
                        <Link target="_blank" rel="noopener noreferrer" to={element?.link} key={index} style={{width: '50%', marginBottom: '5%'}}>{element?.title}</Link>
                    ))} 
                </div>
                </>} 
                
                </div>
                <div style={{width: '30%', border: '1px solid yellow', display: 'flex', flexDirection: 'column'}}>
                        <p style={{marginBottom: '2%' , fontSize: '22px'}}>Statistiques</p>
                        <hr />
                        <p style={{marginBottom: '2%', fontSize: '18px'}}> Actif depuis le {data?.data?.joinedDate}</p>
                        <hr />
                        <p style={{marginBottom: '2%', fontSize: '18px'}}>{data?.data?.viewCount} vues</p>
                        <hr />   
                </div>
            </div>
        </div>
    )
}