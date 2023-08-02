import * as React from 'react';
import { useData } from '../../utils/ContextProvider';
import { DisplayContent } from '../../utils/utils2';



export function ChannelHome({data}){
    const refWidth = React.useRef(null);
    const {setDataContext, setOption} = useData();

    return(
        <div ref={refWidth}style={{
            width: '100%',
            border: '1px solid red',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }}>
      <DisplayContent
        Data={data}
        refWidth={refWidth}
        setDataContext={setDataContext}
        setOption={setOption}
        HasCaroussel
        ChannelHome
      />      
           
</div>
)}