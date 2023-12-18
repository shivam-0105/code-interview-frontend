import React , { Fragment , useState } from 'react';
import { Link , withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';  

const AddEducation = ({ addEducation , history }) => {

    const [formData , setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled , toggleDisabled] = useState(false);

    const { school , degree , fieldofstudy , from , to , current , description } = formData;

    const changeData = (e) => {
        setFormData({...formData , [e.target.name]: e.target.value});
    }

    const submitForm = (e) => {
        e.preventDefault();
        addEducation(formData , history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add your school or bootcamp that you have attented
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => submitForm(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* School or Bootcamp" value={school} onChange={(e) => changeData(e)} name="school" required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree" value={degree} onChange={(e) => changeData(e)} name="degree" required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of Study" value={fieldofstudy} onChange={(e) => changeData(e)} name="fieldofstudy" />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" value={from} onChange={(e) => changeData(e)} name="from" />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={(e) => {
                        setFormData({ ...formData , current: !current });
                        toggleDisabled(!toDateDisabled);
                    }} />{' '} Current School</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={(e) => changeData(e)}
                    disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description} onChange={(e) => changeData(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    );
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default connect(null , { addEducation })(withRouter(AddEducation));
