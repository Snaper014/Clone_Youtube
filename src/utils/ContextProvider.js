import * as React from 'react';


const Context = React.createContext();
 const DataProvider = ({children, ...props}) => {
    const IsinMemory = sessionStorage.getItem('shorts')
    const [DataContext, setDataContext] = React.useState(IsinMemory ? JSON.parse(IsinMemory) : null)

    React.useEffect(() => {
        sessionStorage.setItem('shorts', JSON.stringify(DataContext))
    }, [DataContext])

    return (
            <Context.Provider value={{DataContext, setDataContext}} 
                {...props}>
                    {children}
           </Context.Provider>
    )   
}

function useData(){
    const contexte = React.useContext(Context);
    if(!contexte){
        throw new Error("Le hook  personnalisé vient d'etre utiliser hors de son contexte")
    }
   return contexte 
}

export {useData, DataProvider}
