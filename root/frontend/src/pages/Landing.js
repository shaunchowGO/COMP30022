import React from 'react';
import '../css/pages/Landing.css'
import Footer from './Footer'

function Landing() {
  window.addEventListener('scroll', reveal);

  function reveal() {
    var reveals = document.querySelectorAll('.reveal')

    for (var i = 0; i < reveals.length; i++) {
      var windowheight = window.innerHeight
      var revealtop = reveals[i].getBoundingClientRect().top
      var revealpoint = 150

      if (revealtop < windowheight - revealpoint) {
        reveals[i].classList.add('active')
      }
      else {
        reveals[i].classList.remove('active')
      }
    }
  }
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
        <div className="landing-info reveal">
          <div className="landing-info-header">
            <h1>Our Service</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="landing-info-container">
            <div className="landing-info-item">
              <h2>Quick and Intuitive</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <img src={require("../assets/images/used-by.png")}></img>
            </div>
            <div className="landing-info-item">
              <h2>Recognized Globally</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <img src={require("../assets/images/registered.png")}></img>
            </div>
            <div className="landing-info-item">
              <h2>Reliable Service</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <img src={require("../assets/images/attributions.png")}></img>
            </div>
          </div>
        </div>
        <div className="landing-tutorial reveal">
          <div className="landing-tutorial-header">
            <h1>How it works</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="landing-tutorial-container">
            <div className="tutorial-item">
              <div className="item-number">1</div>
              <h3>Login/Sign Up</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="tutorial-item">
            <div className="item-number">2</div>
              <h3>Create profiles</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="tutorial-item">
            <div className="item-number">3</div>
              <h3>Compare files</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="tutorial-item">
            <div className="item-number">4</div>
              <h3>Receive Score</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Landing;
