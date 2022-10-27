import React from 'react'
import "../styles/style.css"
import logo from "../img/logo.png"
import apk from "../LetsPark.apk"
import mobile from "../img/Mobile.png"
import parking from "../img/Parking.png"
import payment from "../img/Payment.png"
import rent from "../img/Rent.png"
import register from "../img/register.png"
import customer from "../img/customer.png"
import success from "../img/success.png"
import inprog from "../img/in-progress.jpg"
import upcoming from "../img/upcoming.jpg"
import history from "../img/history.jpg"


export default function Home() {
  return (
    <>
  
      <section className='sec-1'>
        <img className='mobile-img' src={mobile} alt="mobile" />
        <div className='img-container'></div>
        <div class="text">
          <h1>The app that will<br></br>
          find your parking<br></br>
          space.</h1>
          <br></br>
          <br></br>
          <p>Parking with ease, seamless payment, and<br></br>
          generate extra income. Meet the app will<br></br>
          bring convenience in parking and will help you<br></br>
          start your parking business.</p>
          </div>
      </section>

      <section className='sec-2'>
         <div class="row">
          <div class="column">
            <img src={parking} alt="parking" width="190px" />
           <h1>Book parking space</h1><br></br>
            <p>Choose from large variety of<br></br>
            parking space in Valenzuela. Book,<br></br> 
            park, and carry on with your day.</p>
          </div>
          <div class="column">
          <img src={payment} alt="payment" width="190px" />
          <h1>Pay with ease</h1><br></br>
            <p>With Let's park payment is made<br></br>
            easy. With few taps your parking is<br></br> 
           ready to go.</p>
          </div>
          <div class="column"><img src={rent} alt="rent" width="190px"/>
          <h1>Rent out your space</h1><br></br>
            <p>Generate extra income by renting<br></br>
            out your space. Follow easy<br></br> 
            instructions and make your day.</p>
          </div>
         </div>
         
      </section>

      <section className='sec-3'>
        <div className='row'>
          <div className='column'>
              <div class="text">
                <h1>Download Let's Park now!</h1>
                <br></br>
                <p>Start by downloading our app and register with few and<br></br>
                easy steps. Try and experience secured and seamless<br></br>
                parking in Valenzuela using Let's Park!
                <button><a href={apk} download>Download</a></button>
              </p>
            </div>
          </div>
          <div className='column'>
            <img src={logo} alt="logo" width="450px"/>
          </div>
        </div>
      </section>

      <section className='sec-4'>
        <h1>Make extra income by renting <br/>out your vacant space</h1>
        <p>Planning to get extra income by utilizing your vacant space? Our app just has the tool to help you!<br/>
          Register your parking with ease and manage your space anytime.
        </p>
        <div className='label'>
          <div className='con'>
            <h2>Register Parking Space</h2>
          </div >
          <div className='con'>
            <h2>Get Parking Customers</h2>
          </div>
          <div className='con'>
            <h2>Earn Income!</h2>
          </div>
      
        </div>
        <div className='container'>
          <div className='col'>
            <img src={register} alt="1" width="300px"/>
          </div>
          <div className='col'>
            <img src={customer} alt="2" width="300px"/>
          </div>
          <div className='col'>
            <img src={success} alt="3" width="300px"/>
          </div>
        </div>


      </section>

      <section className='sec-5'>
        <div className='left'>
          <img className='img-1' src={inprog} alt="1" width="210px"/>
          <img className='img-2' src={upcoming} alt="2" width="210px"/>
          <img className='img-3' src={history} alt="3" width="210px"/>
        </div>
        <div className='right'>
          <h1>Monitor In Progress and Upcoming Parking and Keep Track of Your Parking History</h1>
          <p> Let's Park keeps you up to date about your in progress and upcoming parking and provides an easy view for your parking history.</p>
        </div>
      </section>


    </>
  );
}
