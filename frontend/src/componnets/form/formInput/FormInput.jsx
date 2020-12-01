import React from 'react';
import { Form } from 'react-bootstrap';

const FormInput = ({name, typeInput, value, handler, placeholder, description}) => {

  return (
    <Form.Group controlId={`form${name}`}>
      <Form.Label>{name}</Form.Label>
      <Form.Control type={typeInput} placeholder={placeholder} value={value} onChange={handler} />
      {
        description
          ? <Form.Text className="text-muted">
          {description}
        </Form.Text>
          : null
      }
    </Form.Group>
  );
};

FormInput.defaultProps = {
  placeholder:'add placeholder in props',
  typeInput: 'text'
}

export default FormInput;
