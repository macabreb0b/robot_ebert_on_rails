import Spinner from 'react-spinkit';
import React from 'react';


const LoadingSpinner = () => (
    <div className='spinner-container'>
        <Spinner 
            name='line-scale-pulse-out' 
            fadeIn={'quarter'} 
            color='#EDE6E3'/>
    </div>
)

export default LoadingSpinner