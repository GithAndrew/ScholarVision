import Header from '../components/Header'
import Footer from '../components/Footer'
import {React} from 'react';
import {Link} from 'react-router-dom'
import '../css/AppForm.css'

const AppFormDonor = () => {
    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>
            <form className='app-form-body'>

            <div className='app-form-buttons'>
                <button className='buttons'>Upload <br></br> CSV</button>
                <br></br>
                <button className='buttons'>Download Blank <br></br> Application Form</button>
                <br></br>
                <button className='buttons-g'>Submit <br></br> Application</button>
            </div>


            <div className='app-form-main'>
                <h2 className='form-title'>Donor Application Form</h2>

                <div className='backgrounds'>
                    <h4 className='form-sections'>PERSONAL BACKGROUND</h4>
                    <div className='backgrounds-personal'>
                        <div className='table-table'>
                            <table className='table-form'>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Last Name</th>
                                    <th className='table-form-th'>First Name</th>
                                    <th className='table-form-th'>Middle Name</th>
                                    <th rowspan="6">
                                        <div className='upload-photo-box'>
                                            <form>
                                                <label for="upload-photo">Upload Picture Here<br></br>(1x1 or 2x2)</label>
                                                <input type="file" name="photo" id="upload-photo"/>
                                                <button type="submit" className='submit-button'>Submit Photo</button>
                                            </form> 
                                        </div>
                                    </th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "surname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "firstname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "middlename" required></input></td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Date of Birth</th>
                                    <th className='table-form-th'>Place of Birth</th>
                                    <th className='table-form-th'>Sex &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Suffix</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "date" id = "birthdate" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "birthplace" required></input></td>
                                    <td className='table-form-td'>
                                        <select name='sex' id = "sex">
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                        </select>
                                        <input type = "text" className='input-suffix' id = "suffix"></input>
                                    </td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Citizenship</th>
                                    <th className='table-form-th'>Contact Number</th>
                                    <th className='table-form-th'>Email Address</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "citizenship" required></input></td>
                                    <td className='table-form-td'><input type = "number" id = "contactnum" required></input></td>
                                    <td className='table-form-td'><input type = "email" id = "emailaddress" required></input></td>
                                </tr>
                                <p className='form-subtitle'>Address</p>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Street Name, House No.</th>
                                    <th className='table-form-th'>Subdivision</th>
                                    <th className='table-form-th'>Barangay</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text"  id = "streetname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "subdivision"></input></td>
                                    <td className='table-form-td'><input type = "text"  id = "barangay" required></input></td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>City</th>
                                    <th className='table-form-th'>Province</th>
                                    <th className='table-form-th'>Postal Code</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "city" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "province" required></input></td>
                                    <td className='table-form-td'><input type = "number" id = "postalcode" required></input></td>
                                </tr>

                                <p className='form-subtitle'>Scholarship Details</p>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Scholarship Name</th>
                                    <th className='table-form-th'>Date of Acceptance</th>
                                    <th className='table-form-th'>Year Granted</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "scholarshipname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "dateofacceptance" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "grantyear" required></input></td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Total Grant</th>
                                    <th className='table-form-th'>Details</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "totalgrant" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "grantdetails" required></input></td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>


                <div className='backgrounds'>
                    <h4 className='form-sections'>PERSONAL STATEMENT</h4>
                    <div className='agreement'>State the reason/s for applying as a donor.</div>
                    <textarea className='text-area' id = "appreason"></textarea>
                </div>

                <div className='backgrounds'>
                    <h4 className='form-sections'>AGREEMENT</h4>
                    <div className='agreement'>
                    We hereby certify upon our honor that all the data and information which I have furnished are accurate and complete. I understand that any misinformation and/or withholding of information will automatically disqualify me from receiving any financial assistance or subsidy. Furthermore, if such misinformation and/or withholding of information on my part is discovered after I have been awarded the scholarship, I will be  to reimburse all the financial benefits received.
                    </div>
                    <label>
                        <input type='checkbox'></input>
                        &nbsp;I agree.
                    </label>
                </div>
                
                </div>

            </form>
            <Footer/>

        </div>

    )

}

export default AppFormDonor;
