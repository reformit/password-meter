import React, { useState } from 'react';
import logo from '../../assets/ris-logo.png';
import { Form, ProgressBar } from 'react-bootstrap';
import styles from './App.module.css';

const App = () => {

  /**
   *  Initializes state to store the password and it's strength as a
   *  person types in the password input field.
   */
  const [password, setPassword] = useState({ value: '', strength: 0 });

  /**
   * Determines the strength of the password on a scale of -1 to 2
   * where -1 is an unsupported criteria and 2 is the strongest.
   * @param {number} aValue 
   */
  const evaluateStrength = (aValue) => {
    //is less than 10 characters
    if (aValue.length < 10) {
      return 0;
    }

    //has at least 10 characters but is only numbers or letters
    if (/^[a-zA-Z]+$/i.test(aValue) || /^[0-9]+$/i.test(aValue)) {
      return 1;
    }

    //is greater than 10 characters and has at least one number and letter
    if (/\d/.test(aValue) && /[a-zA-Z]/.test(aValue)) {
      return 2;
    }

    return -1;
  }

  /**
   * Called each time a new character is typed into the password input field
   * and updates the value and strength state for the password.
   * @param {Event} e 
   */
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    const newState = { ...password };
    newState.value = newValue;
    newState.strength = evaluateStrength(newValue);
    setPassword(newState);
  }

  /**
   * Used to return the appropriate meter to display based on the 
   * strength rating of the password.
   * @param {string} color 
   * @param {number} size 
   */
  const setMeter = (color, size) => {
    switch (color) {
      case 'danger':
        return (
          <ProgressBar className={styles.Meter}>
            <ProgressBar striped variant={color} now={size * 2} key={1} />
          </ProgressBar>
        );

      case 'warning':
        return (
          <ProgressBar className={styles.Meter}>
            <ProgressBar striped variant='danger' now={20} key={1} />
            <ProgressBar striped variant={color} now={40} key={2} />
          </ProgressBar>
        );

      case 'success':
        return (
          <ProgressBar className={styles.Meter}>
            <ProgressBar striped variant='danger' now={20} key={1} />
            <ProgressBar striped variant='warning' now={40} key={2} />
            <ProgressBar striped variant={color} now={40} key={3} />
          </ProgressBar>
        );

      default:
        break;
    }
  }

  /**
   * Called in the render to determine what kind of meter should be displayed
   * based on the strength rating of the password.
   */
  const displayMeter = () => {
    if (password.strength === 0) {
      return setMeter('danger', password.value.length);
    }

    if (password.strength === 1) {
      return setMeter('warning');
    }

    if (password.strength === 2) {
      return setMeter('success');
    }

  }

  /**
   * Displays the JSX
   */
  return (
    <div className={styles.App}>

      <header className={styles.Header}>
        <img src={logo} className={styles.Logo} alt="logo" />
      </header>

      <main className={styles.Main}>

        <h1 className={styles.PageHeading}>Password Strength Meter</h1>

        <Form className={styles.Form}>
          <Form.Group controlId="password">
            <Form.Control
              className={styles.Field}
              type="text"
              placeholder="Password"
              onChange={handleOnChange}
            />
            {displayMeter()}
            <Form.Text className="text-muted">* Password should be greater than 10 characters and have at least one letter and number.</Form.Text>
          </Form.Group>
        </Form>

      </main>
    </div>
  );
}

export default App;
