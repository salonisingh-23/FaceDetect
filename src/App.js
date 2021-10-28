import React ,{Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';

const app=new Clarifai.App({
  apiKey:'5c51e584b9c6461bbe78a1841924b6bf'
})

const particleOptions={
  
    particles: {
      number:{
        value:30,
        desity:{
          enable:true,
          value_area:800
        }
      }
    }
  }


class App extends Component{

  constructor(){
  super();
  this.state={
    input: '',
    imageURL:'',
    box:{}
  }
}
calculateFaceLocation=(data)=>{
  const loc=data.outputs[0].data.regions[0].region_info.bounding_box;
  const im=document.getElementById('image');
  const width=Number(im.width);
  const height=Number(im.height);
  console.log(width,height);
  return {
    leftCol:(loc.left_col)*width,
    topRow:(loc.top_row)*height,
    rightCol:width-(loc.right_col*width),
    bottomRow:height-(loc.bottom_row*height)
  }
}

displayBox=(box)=>{
  console.log(box);
  this.setState({box:box});
}

onInputChange=(event)=>{
  this.setState({input: event.target.value});
}

onSubmit=()=>{
  this.setState({imageURL:this.state.input});
  console.log('click');
  app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(response=>
    {

      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

      this.displayBox(this.calculateFaceLocation(response))
    }).catch(err=>{
      console.log(err);
    })
    
  
}
  render(){
    return (
      <div className="App">
        <Particles className="particles"
                params={particleOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/
        >
        <FaceRecognition  box={this.state.box} imageURL={this.state.imageURL}/>
      </div>
    );
  }

}

export default App;
