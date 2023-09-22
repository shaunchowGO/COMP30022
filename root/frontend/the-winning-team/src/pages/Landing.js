import React from 'react';
import '../css/pages/Landing.css'
import Footer from './Footer'

function Landing() {
  return (
    <div>
      <section id="landing">
        <div className="landing-main">
          <div className="landing-main-left"> 
            <h1 className = "main-header"> A <span class="bold-word">Streamlined</span> Process to Authorship Attribution </h1>
            <p className = "main-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.. </p>
            <button className="get-started-button">GET STARTED</button>
          </div>
          <div className="landing-main-right">
                <img src={require(`../assets/images/landing-main.png`)} className='main-image'></img>
          </div>
            
        </div>

        <div class="image-container">
          <img src={require(`../assets/images/right-banner.png`)} alt="right-banner" className='right-banner'/>
          <img src={require(`../assets/images/left-banner.png`)} alt="left-banner" className='left-banner'/>
          <div class="image-box">
            <img src={require(`../assets/images/used-by.png`)} alt="Image-1" class="image"/>
            <p class="image-text"><span class="banner-bold-white">Used by</span> <span class="banner-bold-black">100+ </span> 
            <span class="banner-bold-white">institutes</span></p>
          </div>
          <div class="image-box">
            <img src={require(`../assets/images/registered.png`)} alt="Image 2" class="image"/>
            <p class="image-text"><span class="banner-bold-black">2000+ </span> 
            <span class="banner-bold-white">registered profiles</span></p>
          </div>
          <div class="image-box">
            <img src={require(`../assets/images/attributions.png`)} alt="Image 3" class="image"/>
            <p class="image-text"><span class="banner-bold-white">Get</span> <span class="banner-bold-black">fast</span> <span class="banner-bold-white">and</span> 
            <span class="banner-bold-black"> reliable</span> <span class="banner-bold-white">attribution</span></p>
          </div>
        </div>

        <div className = "instructions">
          <div className = "instruction-left1"> 
            <img src={require(`../assets/images/landing1.png`)} alt="instruction-image"></img>
          </div>
  
          <div className = "text-right text">
          <h1 className = "text-header"><span class="bold-word">Create</span> your profile!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>
        </div>
        
        <div className = "instructions">
            <div className = "text-left text">
            <h1 className = "text-header"><span class="bold-word">Upload</span> student profiles!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>
          
          <div className = "instruction-right"> 
            <img src={require(`../assets/images/landing2.png`)} alt="instruction-image"></img>
          </div>
        </div>

        <div className = "instructions">
          <div className = "instruction-left"> 
            <img src={require(`../assets/images/landing3.png`)} id="instruction-image"></img>
          </div>
  
          <div className = "text-right text">
          <h1 className = "text-header"><span class="bold-word">Get</span> a score back!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>
        </div>
        
      </section>
      <Footer/>
    </div>
  );
}

export default Landing;
