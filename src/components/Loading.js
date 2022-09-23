import React from "react";
const Loading = React.memo(() =>{
    return(
        <lottie-player 
        src="https://lottie.host/c6adff8b-27bc-48e3-a625-5bcc7331acf1/2TLwoxtwof.json"  
        background="transparent"  
        speed="1"  
        style={{width: '150px', height: '300px'}}
        class="ml-auto mr-auto my-4 loading" loop autoplay></lottie-player>
    )
})

export default Loading;