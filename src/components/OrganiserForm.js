import React from "react";

function OrganiserForm(props){
    return(

        <form>
        <div className="form-group row">
          <label for="inputEmail3" className="col-sm-2 col-form-label">FULL NAME</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" placeholder="your name" />
          </div>
        </div>
        <div className="form-group row">
          <label for="inputPassword3" className="col-sm-2 col-form-label">EMAIL</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputPassword3" placeholder="email" />
          </div>
        </div>
        <fieldset className="form-group">
          <div className="row">
            <legend className="col-form-legend col-sm-2">REASON </legend>
            <div className="col-sm-10">
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                  I unable to login Github
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  I have to discuss about meeting
                </label>
              </div>
              <div className="form-check disabled">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled />
                  Something else
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary submit" >Sumbit</button>
          </div> 
        </div>
      </form>

    )}


export default OrganiserForm;
