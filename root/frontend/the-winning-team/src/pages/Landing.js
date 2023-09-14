import React from 'react';
import '../css/Landing.css'
function Landing() {
  return (
    <section id="landing">
      <div className='scrollable'>
        <div className="landing-main">
          <div className="landing-main-left"> 
            <h1 className = "main-header"> Lorem ipsum dolor sit </h1>
            <p className = "main-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <button className="get-started-button">GET STARTED</button>
          </div>
          <div className="landing-main-right">
                <img src="" alt="landing-img"></img>
          </div>
          
        
        </div>
        <div className = "instructions1">
          <div className = "instruction-left"> 
            <img src="" alt="instruction-image"></img>
          </div>

          <div className = "right-text">
          <h1 className = "right-text-header"><span class="bold-word">Lorem ipsum</span> dolor sit</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>
        </div>
        
        <div className = "instructions2">
           <div className = "left-text">
           <h1 className = "left-text-header"><span class="bold-word">Lorem ipsum</span> dolor sit</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>
          
          <div className = "instruction-right"> 
            <img src="" alt="instruction-image"></img>
          </div>
        </div>
        
        <div className = "FAQ-description"> 
          <h1 className  = "faq-header"> FAQs</h1>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div>

        <div className = "FAQs"> 
          <div className = "FAQ1"> 
            <h1>FAQ 1</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            
            <div className = "FAQ2">
              <h1>FAQ 2</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            
            <div className = "FAQ3"> 
              <h1>FAQ 3</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>

        </div>
      </div>
       
        
        
    </section>
  );
}

export default Landing;
