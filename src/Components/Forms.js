import React from 'react';
import axios from 'axios';
import './Form.css';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name_first: '',
            name_last: '',
            email_address: '',
            address_line_1: '',
            address_line_2: '',
            address_city: '',
            address_state: '',
            address_postal_code: '',
            address_country_code: '',
            document_ssn: '',
            birth_date: '',
            birth_date_view: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    handleChange(event) {
        if (event.target.id === 'birth_date') {
            const date = new Date(event.target.value);
            this.setState({[event.target.id]: date.toISOString(),
                birth_date_view: event.target.value
            });
            
        } else {
            this.setState({[event.target.id]: event.target.value});
        }
        
    }

    handleSubmit(event) {
        axios.post('/post', {
            payload: this.state
        }).then((response) => {
            console.log('response', response);
            if(response.data.status === 'Manual Review') {
                alert('Thank you for submitting your application, we will review and get back to you')
            } else if (response.data.status === "Denied") {
                alert('"We are sorry, you have not been approved at this time"')
            } else {
                alert("Success! 🎉🎉🎉 You've been approved!")
            }
        })
        this.clearForm(); 
        event.preventDefault();
        
    }
    clearForm() {
        this.setState( {
            name_first: '',
            name_last: '',
            email_address: '',
            address_line_1: '',
            address_line_2: '',
            address_city: '',
            address_state: '',
            address_postal_code: '',
            address_country_code: '',
            document_ssn: '',
            birth_date: '',
            birth_date_view: ''
        })  
    }
    render() {
        return (
            <div className="app-form">
                <div className='form-div'>
                    <form onSubmit={this.handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" id="name_first" value={this.state.name_first} onChange={this.handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="name_last" value={this.state.name_last} onChange={this.handleChange} required />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" id="email_address" value={this.state.email_address} onChange={this.handleChange} required />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Address Line 1</label>
                            <input type="text" className="form-control" id="address_line_1" value={this.state.address_line_1} onChange={this.handleChange} required />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Address Line 2</label>
                            <input type="text" className="form-control" id="address_line_2" value={this.state.address_line_2} onChange={this.handleChange} placeholder="Apartment, studio, or floor" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">City</label>
                            <input type="text" className="form-control" id="address_city" value={this.state.address_city} onChange={this.handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">State</label>
                            <select id="address_state" value={this.state.address_state} onChange={this.handleChange} className="form-select" required>
                            <option>Choose...</option>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AZ">AZ</option>
                            <option value="AR">AR</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DE">DE</option>
                            <option value="DC">DC</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="IA">IA</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="ME">ME</option>
                            <option value="MD">MD</option>
                            <option value="MA">MA</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MS">MS</option>
                            <option value="MO">MO</option>
                            <option value="MT">MT</option>
                            <option value="NE">NE</option>
                            <option value="NV">NV</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NY">NY</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WV">WV</option>
                            <option value="WI">WI</option>
                            <option value="WY">WY</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Zip</label>
                            <input type="text" className="form-control" id="address_postal_code" value={this.state.address_postal_code} onChange={this.handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Country</label>
                            <select id="address_country_code" value={this.state.address_country_code} onChange={this.handleChange} className="form-select" required>
                            <option>Choose...</option>
                                <option value="US">US</option>
                                <option value="UK">UK</option>
                                {/* <option value="Other">Other</option> */}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">SSN</label>
                            <input type="text" className="form-control" id="document_ssn" placeholder='ex. 999999999' regex="^\\d{9}$" value={this.state.document_ssn} onChange={this.handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Birthdate</label>
                            <input type="text" className="form-control" id="birth_date" value={this.state.birth_date_view} onChange={this.handleChange} placeholder='yyyy-mm-dd' required />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Submit Application</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Form;


