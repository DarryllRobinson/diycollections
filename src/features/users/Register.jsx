import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';

import { userService } from './user.service';

function Register({ history }) {
  const initialValues = {
    title: 'Mr',
    firstName: 'Darryll',
    lastName: 'Robinson',
    email: 'darryllrobinson@icloud.com',
    phone: '0123456789',
    password: 'newpassss',
    confirmPassword: 'newpassss',
    active: true,
    role: 'Admin',
  };

  function onSubmit() {
    userService
      .register(initialValues)
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Form>
      <h3 className="card-header">Register</h3>
      <div className="card-body">
        <div className="form-row">
          <div className="form-group col">
            <label>Title</label>
            <Input name="title" as="select" className={'form-control'}>
              <option value=""></option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Ms">Ms</option>
            </Input>
          </div>
          <div className="form-group col-5">
            <label>First Name</label>
            <Input name="firstName" type="text" className={'form-control'} />
          </div>
          <div className="form-group col-5">
            <label>Last Name</label>
            <Input name="lastName" type="text" className={'form-control'} />
          </div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <Input name="email" type="text" className={'form-control'} />

          <label>Phone</label>
          <Input name="phone" type="text" className={'form-control'} />
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label>Password</label>
            <Input name="password" type="password" className={'form-control'} />
          </div>
          <div className="form-group col">
            <label>Confirm Password</label>
            <Input
              name="confirmPassword"
              type="password"
              className={'form-control'}
            />
          </div>
        </div>
        <div className="form-group form-check">
          <Input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            className={'form-check-input '}
          />
          <label htmlFor="acceptTerms" className="form-check-label">
            Accept Terms & Conditions
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Register
          </button>
          <Link to="login" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </div>
    </Form>
  );
}

export { Register };
