import * as React from 'react';


 const Carsoussel = ({children: slides, InitialValue}) => {
    const [curr, setCurr] = React.useState(InitialValue)
    const prev = () => setCurr((curr) => curr === 0 ? slides.length - 1 : curr - 1)
    const next = () => setCurr((curr) => curr === slides.length - 1 ? 0 : curr + 1)

  return (
    <div style={{width: '100%', height:'89vh', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
    <div style={{overflow: 'hidden',
                position: 'relative', 
                height: '100%',
                width: '95%',
            }}>
                <div style={{height: '100%', 
                            transform: `translateY(-${curr * 100}%)`,
                            transitionDuration: '300ms',
                            transitionTimingFunction: 'ease-in-out',
                    }}>
                    {slides}
                </div>
        </div>
        <div style={{width: '5%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-around',
                    flexDirection: 'column'
            }}>
            { curr === 0 ? <div></div> : <button onClick={prev}>BACK</button>}
            <button onClick={next}>NEXT</button>
        </div>
    </div>
  )
}

const CardCaroussel = ({children}) => {
  const [curr, setCurr] = React.useState(0)
  const prev = () => setCurr((curr) => curr === 0 ? children.length - 1 : curr - 1)
  const next = () => setCurr((curr) => curr === children.length - 1 ? 0 : curr + 1)
        return(
          <>
          <div style={{overflow: 'hidden',
                      position: 'relative', 
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                  }}>
                      <div style={{height: '100%', 
                                  transform: `translateX(-${curr * 50}%)`,
                                  transitionDuration: '300ms',
                                  transitionTimingFunction: 'ease-in-out',
                                  display: 'flex',
                                  flexDirection: 'row'
                          }}>
                          {children}
                      </div>
                         
                { curr === 0 ? <div></div> : <button onClick={prev} style={{
                        position: 'absolute',
                        width: '50px',
                        height: '50px', 
                        left: '-3px',
                        top: '3em',
                        cursor: 'pointer',
                        borderRadius: '50%',
                      }} 
                        >
                          PREV
                      </button>
                  }
                  {curr === children.length - 1 ? <div></div> :    
                        <button onClick={next} style={{
                        position: 'absolute',
                        width: '50px',
                        height: '50px', 
                        right: '0px',
                        top: '16%',
                        cursor: 'pointer',
                        borderRadius: '50%'
                      }} 
                        >
                          NEXT
                      </button>
                      } 
              </div>
              </>
        )
}

export {Carsoussel, CardCaroussel}
