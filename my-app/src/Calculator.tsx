import { useState, useEffect } from 'react';
import Button from './Button.tsx';
import Input from './Input.tsx';

function Calculator() {
  return (
    <table>
        <tr>
          <td colSpan={4}>
            <Input />
          </td>
        </tr>
        <tr>
          <td><Button text="7" /></td>
          <td><Button text="8" /></td>
          <td><Button text="9" /></td>
          <td><Button text="/" /></td>
        </tr>
        <tr>
          <td><Button text="4" /></td>
          <td><Button text="5" /></td>
          <td><Button text="6" /></td>
          <td><Button text="*" /></td>
        </tr>
        <tr>
          <td><Button text="1" /></td>
          <td><Button text="2" /></td>
          <td><Button text="3" /></td>
          <td><Button text="-" /></td>
        </tr>
        <tr>
          <td><Button text="0" /></td>
          <td><Button text="C" /></td>
          <td><Button text="=" /></td>
          <td><Button text="+" /></td>
        </tr>
    </table>
  );
}

export default Calculator;
