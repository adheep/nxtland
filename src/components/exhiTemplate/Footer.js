import React, { Component } from 'react';


class Footer extends Component {
    render() {
        return (
            <div>
                {/* ts footer area start*/}
<div className="footer-area">
  {/* ts-book-seat start*/}
  <section className="ts-book-seat" style={{backgroundImage: 'url(images/book_seat_img.jpg)'}}>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="book-seat-content text-center mb-70">
            <h2 className="section-title white">
              <span>Hurry up!</span>
              Book your Seat
            </h2>
            <a href="#" className="btn">Buy Ticket</a>
          </div>{/* book seat end*/}
        </div>{/* col end*/}
      </div>{/* row end*/}
      <div className="ts-footer-newsletter">
        <div className="ts-newsletter" style={{backgroundImage: 'url(images/shap/subscribe_pattern.png)'}}>
          <div className="row">

          <div className="col-lg-4 mx-auto"> 
            <h3 style={{color:'white'}}>Check out some of our most frequently asked questions FAQ-Button</h3>
            <button className="btn" style={{marginBottom:100}}>FAQS</button>
            </div>


            <div className="col-lg-6 mx-auto" >
              <div className="ts-newsletter-content" >
                <h2 className="section-title" >
                  Want something extra?
                </h2>
              </div>
              <div className="newsletter-form">
                <form action="#" method="post">
                  <div className="email-form-group media-body">
                  <input className="form-control form-control-name" placeholder="Name" name="name" id="f-name" type="text" required />
                  </div><br/>
                  <div className="email-form-group media-body">
                  <input className="form-control form-control-name" placeholder="Mobile No." name="name" id="f-name" type="phone" required />
                  </div><br/>
                  <div className="email-form-group media-body">
                    <input type="email" name="email" id="newsletter-form-email" className="form-control" placeholder="Your Email" autoComplete="off" required />
                  </div><br/>
                  <div className="email-form-group media-body">
                  <input className="form-control form-control-name" placeholder="Message" name="name" id="f-name" type="message" required />
                  </div><br/>
                  <div className="d-flex ts-submit-btn">
                    <button className="btn">Submit</button>
                  </div>
                </form>
              </div>

              
            </div>

            
          </div>
        </div>
      </div>
    </div>{/* container end*/}
  </section>
  {/* book seat  end*/}
  

{/* footer start*/}
<footer className="ts-footer" style={{height:900}}>
    <div className="container">
      <div className="row" style={{paddingTop:400}}>
        <div className="col-lg-8 mx-auto">
          <div className="ts-footer-social text-center mb-30">
            <ul>
              <li>
                <a href="#"><i className="fa fa-facebook" /></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-twitter" /></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-google-plus" /></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-linkedin" /></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-instagram" /></a>
              </li>
            </ul>
          </div>
          {/* footer social end*/}
          <div className="footer-menu text-center mb-25">
            <ul>
              <li><a href="#">About Eventime</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Tickets</a></li>
              <li><a href="#">Venue</a></li>
            </ul>
          </div>{/* footer menu end*/}
          <div className="copyright-text text-center">
            <p><a target="_blank" href="https://nxtland.io">NxtLand Club</a></p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* footer end*/}

  <div className="BackTo">
    <a href="#" className="fa fa-angle-up" aria-hidden="true" />
  </div>
</div>
{/* ts footer area end*/}

            </div>
        );
    }
}

export default Footer;

