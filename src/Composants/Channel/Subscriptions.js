import * as React from 'react';
import '../../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { GetSubscriptions } from '../../utils/Appel';


export function Subscriptions(){
    let {chaId} = useParams()
    let navigate = useNavigate()
    const [data, setData] = React.useState()
    console.log(data)
    React.useEffect(() => {
        GetSubscriptions(chaId)
        .then(response => setData(response))
        .catch(error => console.log(error))
    }, [chaId])

    const HandleChannel = (Channelid) => {
        navigate(`/Channel/${Channelid}`)
      }
    return(
        <div style={{width: '100%'}}>
            {data?.data?.msg === "Cette chaîne ne présente aucune autre chaîne." && (
                <p>Cette chaîne ne présente aucune autre chaîne.</p>
            )}
            {data?.data?.msg !== "Cette chaîne ne présente aucune autre chaîne." && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        flexWrap: 'wrap'
                    }}>
                       {data?.data?.data.map((element, index) => {
                        if(element?.type !== 'channel'){
                             return (
                                <p></p>
                             )   
                        }
                     return(
                       <div onClick={() => HandleChannel(element?.channelId)} key={index} style={{
                              width: '20%',
                              display: 'flex',
                              cursor: 'pointer',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '45vh'
                         }}>
                              <div style={{width: '50%', marginBottom: '1%'}}>
                                  <img alt={element?.title} width={'100%'}
                                    style={{borderRadius: '50%'}}
                                  src={`${element?.thumbnail[1]?.url.includes("https:") ? element?.thumbnail[1]?.url 
                                                 : 
                                        "https:" + element?.thumbnail[1]?.url}`}></img>
                              </div>
                              <h4 style={{marginBottom: '1%'}}>{element?.title}</h4>
                              <p style={{marginBottom: '8%'}}>{element?.subscriberCount}</p>
                              <button style={{border: 'none',
                                            fontSize: '16px',
                                            padding: '1vw',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#efeff1',
                                            borderRadius: '30px',
                                            fontWeight: '550',
                                            height: '15%' 
                                }}>S'abonner</button>
                          </div>) 
                  
                            })} 
                    </div>
                )}   
        </div>
    )
}