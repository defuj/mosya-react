import React from "react";

const EmptyState = React.memo((props) => {
    let {title, desc, wrapHeight, imageWidth} = props;
    let titleEmpty = title ? title : 'Tidak menemukan produk';
    let descEmpty = desc ? desc : 'Silahkan coba lagi nanti';
    let wrapHeightEmpty = wrapHeight ? wrapHeight : false;
    let imageWidthEmpty = imageWidth ? imageWidth : '150px';
    return (
        <div className={wrapHeightEmpty ? 'container-empty d-flex justify-content-center align-items-center flex-column flex-fill py-5' : 'container-empty d-flex justify-content-center align-items-center flex-column flex-fill'} height="1024">
          <img src={require('../assets/images/car_not_found.png')} alt="empty" className="img-empty h-100 mx-5 my-4" width={imageWidthEmpty}/>
          <div className="empty-text text-center">
            <p className="headline6 color-black500 semibold m-0 px-3" id="title-not-found" dangerouslySetInnerHTML={{__html:titleEmpty}}></p>
            <p className="bodytext2 color-black300 semibold m-0 px-3" id="desc-not-found">{descEmpty}</p>
          </div>
        </div>
    );
})
export default EmptyState;