import Header from '../components/Header'
import Footer from '../components/Footer'
import {React} from 'react';
import {Link} from 'react-router-dom'
import '../css/AppForm.css'

const AppForm = () => {
    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>

        <form className='app-form-body'>

            <div className='app-form-buttons'>
                <div className='buttons'>Upload <br></br> CSV</div>
                <br></br>
                <div className='buttons'>Download Blank <br></br> Application Form</div>
                <br></br>
                <button className='buttons-g'>Submit <br></br> Application</button>
            </div>


            <div className='app-form-main'>
                <h2 className='form-title'>Scholarship Application Form</h2>

                <div className='backgrounds'>
                    <h4 className='form-sections'>PERSONAL BACKGROUND</h4>
                    <div className='backgrounds-personal'>
                        <div className='table-table'>
                            <table className='table-form'>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Surname</th>
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
                                        <select name='sex' id = "sex" className='input-select'>
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
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Student Number</th>
                                    <th className='table-form-th'>Graduation Year</th>

                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "studentno" required></input></td>
                                    <td className='table-form-td'><input type = "number" id= "gradyear" required></input></td>

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

                            </table>
                        </div>
                    </div>
                </div>

                
                <div className='backgrounds'>
                    <h4 className='form-sections'>FAMILY BACKGROUND</h4>

                    <div className='form-section-1'>

                        <div className='form-section-2'>
                            <table className='table-form'>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Father's Name</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" className='parentname' id = "fathername"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Birthdate</th>
                                    <th className='table-form-th'>Citizenship</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "date" id = "fatherbirthdate"  ></input></td>
                                    <td className='table-form-td'><input type = "text" id = "fathercitizenship"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Contact Number</th>
                                    <th className='table-form-th-1'>Highest Education Attainment</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "number" id = "fathercontactnum"  ></input></td>
                                    <td className='table-form-td'><input type = "text" className='parentname' id = "fatherhighesteduatt"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Occupation</th>
                                    <th className='table-form-th'>Employer</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "fatheroccupation"  ></input></td>
                                    <td className='table-form-td'><input type = "text" id = "fatheremployer"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Business Address</th>
                                </tr>
                                <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" className='parentname' id = "fatherbusinessaddr"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th-1'>Annual Income</th>
                                </tr>
                                <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" id = "fatherannualinc"  ></input></td>
                                </tr>
                            </table>
                        </div>

                        <div className='form-section-2'>
                        <table className='table-form'>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Mother's Name</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" className='parentname' id = "mothername"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Birthdate</th>
                                    <th className='table-form-th'>Citizenship</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "date" id = "motherbirthdate"  ></input></td>
                                    <td className='table-form-td'><input type = "text" id = "mothercitizenship"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Contact Number</th>
                                    <th className='table-form-th-1'>Highest Education Attainment</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "number" id = "mothercontactnum"  ></input></td>
                                    <td className='table-form-td'><input type = "text" className='parentname' id = "motherhighesteduatt"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Occupation</th>
                                    <th className='table-form-th'>Employer</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "motheroccupation"  ></input></td>
                                    <td className='table-form-td'><input type = "text" id = "motheremployer"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Business Address</th>
                                </tr>
                                <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" className='parentname' id = "motherbusinessaddr"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th-1'>Annual Income</th>
                                </tr>
                                <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" id = "motherannualinc"  ></input></td>
                                </tr>
                            </table>
                        </div>

                    </div>
                    <br></br>
                    <div className='form-section-1-1'>
                        <table className='table-form'>
                            <tr className='table-form-tr'>
                                <th className='table-form-th'>Name of Guardian (if not living with parents)</th>
                                <th className='table-form-th'>Contact Number</th>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" className='parentname-1' id = "guardianname"></input></td>
                                <td className='table-form-td'><input type = "number" id = "guardiannum"></input></td>
                            </tr>
                        </table>
                    </div>

                    <div className='form-section-1-1'>
                        <table className='table-form'>
                            <tr className='table-form-tr'>
                                <th className='table-form-th-1'>Name of Siblings</th>
                                <th className='table-form-th'>Age</th>
                                <th className='table-form-th'>Civil Status</th>
                                <th className='table-form-th-1'>Highest Educational Attainment</th>
                                <th className='table-form-th'>Occupation</th>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling1-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling1-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling1-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling1-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling1-occupation"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling2-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling2-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling2-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling2-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling2-occupation"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling3-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling3-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling3-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling3-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling3-occupation"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling4-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling4-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling4-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling4-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling4-occupation"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling5-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling5-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling5-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling5-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling5-occupation"></input></td>
                            </tr>
                            
                        </table>
                        
                    </div>
                    
                    
                </div>
                
                
                <div className='backgrounds'>
                    <h4 className='form-sections'>EDUCATIONAL BACKGROUND</h4>

                    <div className='form-section-1-1'>
                        <table className='table-form'>
                            <tr className='table-form-tr'>
                                <th className='table-form-th'>Education Level</th>
                                <th className='table-form-th'>Name of School</th>
                                <th className='table-form-th'>Inclusive Dates</th>
                                <th className='table-form-th'>Scholarship or Academic Awards Received</th>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-1"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-1"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-1"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-1"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-2"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-2"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-2"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-2"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-3"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-3"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-3"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-3"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-4"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-4"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-4"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-4"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-5"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-5"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-5"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-5"></input></td>
                            </tr>
                        </table>
                       
                    </div>
                    
                    
                </div>

                <div className='backgrounds'>
                    <h4 className='form-sections'>PERSONAL STATEMENT</h4>
                    <div className='agreement'>State the reason/s for applying for financial assistance.</div>
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

export default AppForm;