import React from "react";
import Button from "./Button.js";
import TimePicker from 'react-bootstrap-time-picker';

function Calender(props){
    return(
        <table class="table table-responsive">
            <thead>
                <tr>
                    <th></th>
                    <th>SUNDAY</th>
                    <th>MONDAY</th>
                    <th>TUESDAY</th>
                    <th>WEDNESDAY</th>
                    <th>THURSDAY</th>
                    <th>FRIDAY</th>
                    <th>SATURDAY</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">MORNING</th>
                    {/* <td> <TimePicker start="8:00" end="21:00" step={30} /></td> */}
                    <td><button type="button" class="btn btn-outline-primary">8AM-12PM</button></td>
                    <td><button type="button" class="btn btn-outline-primary">8AM-12PM</button></td>
                    <td><button type="button" class="btn btn-outline-primary">8AM-12PM</button></td>
                    <td><button type="button" class="btn btn-outline-primary">8AM-12PM</button></td>
                    <td><button type="button" class="btn btn-outline-primary">8AM-12PM</button></td>
                    <td><button type="button" class="btn btn-outline-primary">8AM-12PM</button></td>
                    <td><button type="button" class="btn btn-outline-primary">8AM-12PM</button></td>
                </tr>
                <tr>
                    <th scope="row">AFTERNOON</th>
                    <td><button type="button" class="btn btn-outline-success">12PM-6PM</button></td>
                    <td><button type="button" class="btn btn-outline-success">12PM-6PM</button></td>
                    <td><button type="button" class="btn btn-outline-success">12PM-6PM</button></td>
                    <td><button type="button" class="btn btn-outline-success">12PM-6PM</button></td>
                    <td><button type="button" class="btn btn-outline-success">12PM-6PM</button></td>
                    <td><button type="button" class="btn btn-outline-success">12PM-6PM</button></td>
                    <td><button type="button" class="btn btn-outline-success">12PM-6PM</button></td>
                    
                </tr>
                <tr>
                    <th scope="row">EVENING</th>
                    <td><button type="button" class="btn btn-outline-danger">6PM-9PM</button></td>
                    <td><button type="button" class="btn btn-outline-danger">6PM-9PM</button></td>
                    <td><button type="button" class="btn btn-outline-danger">6PM-9PM</button></td>
                    <td><button type="button" class="btn btn-outline-danger">6PM-9PM</button></td>
                    <td><button type="button" class="btn btn-outline-danger">6PM-9PM</button></td>
                    <td><button type="button" class="btn btn-outline-danger">6PM-9PM</button></td>
                    <td><button type="button" class="btn btn-outline-danger">6PM-9PM</button></td>
                   
                </tr>
        </tbody>
       </table>
       
    )}


export default Calender;
