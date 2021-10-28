import React  from 'react';


// api key: 5c51e584b9c6461bbe78a1841924b6bf

const ImageLinkForm=({onInputChange,onSubmit})=>{
    return(
        <div >
        <p className="f3">
            {'Smart Detect will detect faces in Your Pictures!! Dont believe it?? Give it a Try!'}
            </p>
            <div className="">
            <div className="pa4 br3 shadow-5">
                <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue" onClick={onSubmit}>Detect</button>
            </div>
            </div>
        </div>

    )
}
export default ImageLinkForm;