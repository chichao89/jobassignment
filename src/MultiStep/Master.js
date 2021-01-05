import React, { Component } from 'react'
import './main.css'

export class Master extends Component {
    constructor(props) {
        super(props)
        this.state = {
          currentStep: 1,
          selectedFile : null, //intially no file is selected
          condition : ''
        }
      }
      
      //on file select(from the pop up)
      handleChange = event => {
        this.setState({selectedFile: event.target.files[0]})  //update the state  
      };

      handleChange2 = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    }
    
     // On file upload (click the upload button) 
    onFileUpload = () => { 
      // Create an object of formData 
      const formData = new FormData(); 
      // Update the formData object 
      formData.append( 
        "myFile", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
       // Details of the uploaded file 
       console.log(this.state.selectedFile); 
    };

    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
      if (this.state.selectedFile) {  
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } 
    }; 
      //Submit Event
       handleSubmit = event => {
         event.preventDefault()
         const { selectedFile, condition} = this.state
         alert(`Your submit details: \n 
               File: ${selectedFile} \n 
                Terms: ${condition} \n`)
       }
      
      _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 1 ? 2: currentStep + 1
        this.setState({
          currentStep: currentStep
        })
      }
        
      _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1? 1 : currentStep - 1
        this.setState({
          currentStep: currentStep
        })
      }
    
    /*
    * the functions for our button
    */
    previousButton() {
      let currentStep = this.state.currentStep;
      if(currentStep !==1){
        return (
          <button 
            className="input-button-trigger" 
            type="button" onClick={this._prev}>
          Previous
          </button>
        )
      }
      return null;
    }
    
    nextButton(){
      let currentStep = this.state.currentStep;
      if(currentStep <2){
        return (
          <button 
            className="input-button-trigger" 
            type="button" onClick={this._next}>
          Next
          </button>        
        )
      }
      return null;
    }

    render() {
        return (
            <React.Fragment>
                <h1>React Video Upload Form</h1>
                <p>Step {this.state.currentStep} </p> 

      <form onSubmit={this.handleSubmit}>
      {/* 
        render the form steps and pass required props in
      */}
        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          selectedFile={this.state.selectedFile}
          fileData= {this.fileData}
        />
        <Step2 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange2}
          condition={this.state.condition}
        />

        {this.previousButton()}
        {this.nextButton()}

      </form>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="selectedFile">File Upload</label>
      <input 
        className="input-file-trigger"
        id="selectedFile"
        name="selectedFile"
        type="file" 
        placeholder="Upload File"
        onChange={props.handleChange} /> 
      {/* <button onClick={this.onFileUpload}> 
        File Upload! 
      </button> */}
       {props.fileData()}  
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <React.Fragment>
    <div className="form-group">
      <label htmlFor="condition">Terms and Condition</label>
      <input
        className="form-control"
        id="condition"
        name="condition"
        type="checkbox"
        checked={props.condition}
        onChange={props.handleChange}
        />
        <p>I accept the terms and conditions of uploading this video</p>
    </div>
          <button className="input-upload-trigger">Upload</button>

    </React.Fragment>
  );
}



export default Master


  
