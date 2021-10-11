import React  from 'react';
import {Link } from 'react-router-dom';
import './singleproject.css';
const singleProject = (props) =>  {
    
  
    return(
   
        <div className="single-project-container">
          <div className="project-body">
           <div className = "project-title">
                <h1>This is the title</h1>
           </div>
           <div className ="project-description">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
           </div>
           <div className ="question-body">
             <h2>Response</h2>
           <div className="question">
             <label className="label">Please mention the strong points about the project.</label>
             <input className="label-input " type='text' id='input'  />
             </div>
           <div className="question">
             <label className="label">Please provide the weak points about the project.</label>
           <input className="label-input" type='text' id='input'  />
           </div>
           <div className="question">
             <label className="label">Does the project match the broad domain of TIH-IITP (speech-vision-text).</label>
           <input className="label-input" type='checkbox' id='input'  />
           </div>
           <div className="question">
             <label className="label">Does the project have any potential to make a product or can it lead to a startup?</label>
           <input className="label-input" type='checkbox' id='input'  />
           </div>
           <div className="question">
             <label className="label">Does the proposal have research challenges in comparison with current state-of-the-art?</label>
           <input className="label-input" type='checkbox' id='input'  />
           </div>
           <div className="question">
             <label className="label">Please rate the project in terms of novelty on a scale of 1-5.  </label>
           <input className="label-input" type='number' id='input' min="1" max="5"  />
           </div>
           <div className="question">
             <label className="label">Please rate the project in terms of relevance in the present context on a scale of 1-5.</label>
           <input className="label-input" type='number' id='input'  min="1" max="5" />
           </div>
           <div className="question">
             <label className="label">Recommendation for funding on a scale of 1-5</label>
           <input className="label-input" type='number' id='input' min="1" max="5" />
           </div>
           <div className="question">
             <label className="label">Confidential comments to TIH-IITP</label>
           <input className="label-input" type='text' id='input'  />
           </div>
           <div className="question">
             <label className="label">Mark it as Reviewed</label>
           <input className="label-input" type='checkbox' id='input'  />
           </div>
           </div>
           </div>
        </div>
    
);
}

export default singleProject;