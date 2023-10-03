import React from 'react';
import '../css/pages/Landing.css'
import Footer from './Footer'

function Landing() {
  return (
    <div>
      <section id="landing">
        <div className="landing-main">
          <div className="landing-main-left"> 
            <h1 className = "main-header"> A <span className="bold-word">Streamlined</span> Process to Authorship Attribution </h1>
            <p className = "main-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className="get-started-button"><p>Get Started</p></button>
          </div>
          <div className="landing-main-right">
                <img src={require(`../assets/images/landing-main.png`)} className='main-image'></img>
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stats-container">
            <div className="image-box">
              <img src={require(`../assets/images/used-by.png`)} alt="Image-1" className="image"/>
              <p className="stats-text">Used by <span>100+</span> institutes</p>
            </div>

            <div className="image-box">
              <img src={require(`../assets/images/registered.png`)} alt="Image 2" className="image"/>
              <p className="stats-text">Over <span>2000+</span> registered profiles</p>
            </div>

            <div className="image-box">
              <img src={require(`../assets/images/attributions.png`)} alt="Image 3" className="image"/>
              <p className="stats-text">Get <span>fast</span> and <span>reliable</span> attributions</p>
            </div>
          </div>
        </div>

        <div className="instructions-container">
          <div className = "instructions">
            <img src={require(`../assets/images/landing1.png`)} alt="instruction-image"></img>
            <div className = "text">
              <h1 className = "text-header"><span>Create</span> your profile!</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
          </div>
          
          <div className = "instructions">
            <div className = "text">
              <h1 className = "text-header"><span>Upload</span> student profiles!</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <img src={require(`../assets/images/landing2.png`)} alt="instruction-image"></img>
          </div>

          <div className = "instructions">
            <img src={require(`../assets/images/landing3.png`)} id="instruction-image"></img>
            <div className = "text">
              <h1 className = "text-header"><span>Get</span> a score back!</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
          </div>
        </div>
        
      </section>
      <Footer/>
    </div>
  );
}

export default Landing;
