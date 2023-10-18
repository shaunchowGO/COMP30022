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
            <p className = "main-text">Designed with academics in mind, our platform offers a streamlined solution for evaluating document similarity. Academics can effortlessly upload documents, and our algorithm will swiftly determine the extent of their similarity to known profiles. </p>
            <a href="#tutorial" className="get-started-button"><p>Get Started</p></a>
          </div>
          <div className="landing-main-right">
              <img src={require(`../assets/images/landing-main.png`)} className='main-image'></img>
          </div>
        </div>
        <div className="landing-info reveal">
          <div className="landing-info-header">
            <h1>Our Service</h1>
            <p> Explore a new era of document analysis with us today and experience the difference in authorship attribution!</p>
          </div>
          <div className="landing-info-container">
            <div className="landing-info-item">
              <h2>Easy to Use</h2>
              <p>Our platform offers a quick and intuitive experience, ensuring that you can effortlessly navigate through our services and achieve your goals without unnecessary complexities.</p>
              <img src={require("../assets/images/used-by.png")}></img>
            </div>
            <div className="landing-info-item">
              <h2>Quick and Responsive</h2>
              <p>Designed for speed and efficiency, guaranteeing that you can swiftly access our services and experience responsive interactions, allowing you to achieve your goals without delay.</p>
              <img src={require("../assets/images/attributions.png")}></img>
            </div>
            <div className="landing-info-item">
              <h2>Reliable Service</h2>
              <p>Count on us for a reliable service that you can trust. We prioritize your needs, ensuring that you receive consistent, dependable support for all your requirements.</p>
              <img src={require("../assets/images/registered.png")}></img>
            </div>
          </div>
        </div>
        <div id="tutorial" className="landing-tutorial reveal">
          <div className="landing-tutorial-header">
            <h1>How it works</h1>
            <p>In this section, you'll discover a seamlessly intuitive user experience, making it a breeze to understand and use our service.</p>
          </div>
          <div className="landing-tutorial-container">
            <div className="tutorial-item">
              <div className="item-number">1</div>
              <h3>Login/Sign Up</h3>
              <p>Start by creating an account if you're new here, or simply log in if you've already got one.</p>
            </div>
            <div className="tutorial-item">
            <div className="item-number">2</div>
              <h3>Create profiles</h3>
              <p>Take a moment to create various profiles that will serve as your comparison benchmarks.</p>
            </div>
            <div className="tutorial-item">
            <div className="item-number">3</div>
              <h3>Compare files</h3>
              <p>Now, compare your profiles with documents of unknown authorship.</p>
            </div>
            <div className="tutorial-item">
            <div className="item-number">4</div>
              <h3>Receive Score</h3>
              <p>Upon completion, you'll be presented with a similarity score, providing you with insights into the document's authorship.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Landing;
