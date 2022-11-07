import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <div className="body-inner">
  <div id="page-banner-area" className="page-banner-area" style={{backgroundImage: 'url(images/hero_area/banner_bg.jpg)'}}>
    {/* Subpage title start */}
    <div className="page-banner-title">
      <div className="text-center">
        <h2>Contact Us</h2>
        <ol className="breadcrumb">
          <li>
            <a href="#">Exibit /</a>
          </li>
          <li>
            Contact Us
          </li>
        </ol>
      </div>
    </div>{/* Subpage title end */}
  </div>{/* Page Banner end */}
  {/* ts intro start */}
  <section className="ts-contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h2 className="section-title text-center">
            <span>Get Information</span>
            Contact Information
          </h2>
        </div>{/* col end*/}
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="single-intro-text single-contact-feature">
            <h3 className="ts-title">Tickets info</h3>
            <p>
              <strong>Name:</strong> Ronaldo König
            </p>
            <p>
              <strong>Phone:</strong> 009-215-5595
            </p>
            <p>
              <strong>Email:</strong> info@example.com
            </p>
            <span className="count-number fa fa-paper-plane" />
          </div>{/* single intro text end*/}
          <div className="border-shap left" />
        </div>{/* col end*/}
        <div className="col-lg-4">
          <div className="single-intro-text single-contact-feature">
            <h3 className="ts-title">Partnerships info</h3>
            <p>
              <strong>Name:</strong> Ronaldo König
            </p>
            <p>
              <strong>Phone:</strong> 009-215-5595
            </p>
            <p>
              <strong>Email:</strong> info@example.com
            </p>
            <span className="count-number fa fa-paper-plane" />
          </div>{/* single intro text end*/}
          <div className="border-shap left" />
        </div>{/* col end*/}
        <div className="col-lg-4">
          <div className="single-intro-text single-contact-feature">
            <h3 className="ts-title">Programme Details</h3>
            <p>
              <strong>Name:</strong> Ronaldo König
            </p>
            <p>
              <strong>Phone:</strong> 009-215-5595
            </p>
            <p>
              <strong>Email:</strong> info@example.com
            </p>
            <span className="count-number fa fa-paper-plane" />
          </div>{/* single intro text end*/}
          <div className="border-shap left" />
        </div>{/* col end*/}
      </div>{/* row end*/}
    </div>{/* container end*/}
    <div className="speaker-shap">
      <img className="shap2" src="images/shap/home_schedule_memphis1.png" alt="" />
    </div>
  </section>
  {/* ts contact end*/}
  <section className="ts-contact-map no-padding">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 no-padding">
          <div className="mapouter">
            <div className="gmap_canvas">
              {/* <iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Park%20Street%2C%20Jacksonville%2C%20IL%2C%20USA&t=&z=13&ie=UTF8&iwloc=&output=embed"
									frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe> */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4238.075542978786!2d-0.14258530106536377!3d50.83163078652512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487585765dd0f7f3%3A0x5a144a31ef19ef9d!2sJurys+Inn+Brighton!5e0!3m2!1sen!2sbd!4v1541576429082" width="100%" height={450} frameBorder={0} style={{border: 0}} allowFullScreen />
              {/* <a href="https://www.pureblack.de">werbeagentur</a></div> */}
            </div>
          </div>
        </div>
      </div>
    </div></section>
  <section className="ts-contact-form">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h2 className="section-title text-center">
            <span>Have Questions?</span>
            Send Message
          </h2>
        </div>{/* col end*/}
      </div>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <form id="contact-form" className="contact-form" action="http://demo.themewinter.com/html/exhibz/contact-form.php" method="post">
            <div className="error-container" />
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input className="form-control form-control-name" placeholder="First Name" name="name" id="f-name" type="text" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input className="form-control form-control-name" placeholder="Last Name" name="name" id="l-name" type="text" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input className="form-control form-control-subject" placeholder="Subject" name="subject" id="subject" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input className="form-control form-control-email" placeholder="Email" name="email" id="email" type="email" required />
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea className="form-control form-control-message" name="message" id="message" placeholder="Your message...*" rows={6} required defaultValue={""} />
            </div>
            <div className="text-center"><br />
              <button className="btn" type="submit"> Send Message</button>
            </div>
          </form>{/* Contact form end */}
        </div>
      </div>
    </div>
    <div className="speaker-shap">
      <img className="shap1" src="images/shap/home_schedule_memphis2.png" alt="" />
    </div>
  </section>
  {/* ts footer area start*/}

  {/* ts footer area end*/}
</div>

        );
    }
}

export default Contact;