import React from "react";

function OrganiserForm(props){
    return(

        <form>
        <div className="form-group row">
          <label for="inputEmail3" className="col-sm-2 col-form-label">Full name</label>
          <div className="col-sm-8">
            <input type="email" className="form-control" id="inputEmail3" placeholder="Your name" />
          </div>
        </div>
        <div className="form-group row">
          <label for="inputPassword3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-8">
            <input type="password" className="form-control" id="inputPassword3" placeholder="Email" />
          </div>
        </div>
        <fieldset className="form-group">
          <div className="row">
            <legend className="col-form-legend col-sm-2">Subject </legend>
            <div className="col-sm-10">
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                  I'm unable to log into GitHub
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  I'd like to discuss about a meeting
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" />
                  Other
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary submit">Send Message</button>
          </div>
        </div>
      </form>
        
    )}
    
   
export default OrganiserForm;

