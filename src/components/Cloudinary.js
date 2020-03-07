import React from 'react';
require('dotenv').config();
const {REACT_APP_cloudName,REACT_APP_uploadPreset} = process.env;
class Cloudinary extends React.Component{
    constructor(){
        super();
        this.state={
            e_image:''
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})

    }
    checkUploadResult = (error,event)=>{
        console.log(this.state.e_image)
        if(event.event === 'success'){
            this.setState({e_image: event.info.url}) 
        }
    }


    render(){
        let widget;
        if( window.cloudinary ) {
            widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: `${REACT_APP_cloudName}`,
                    uploadPreset: `${REACT_APP_uploadPreset}`,
                    sources: ['local', 'url', 'camera', 'instagram'],
                    default: false
                },
                ( error, result ) => {
                    this.checkUploadResult(error, result);
                }
            );
        }
    
        return(
            <div>
                <button onClick={()=>widget.open()}>Add your profile image!</button>
                <input name="e_image" onChange={this.handleChange} value={this.state.e_image}/>
            </div>
        )
    }
}
export default Cloudinary;