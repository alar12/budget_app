const React = require('react');

module.exports = {
  ...jest.requireActual('@material-ui/core'),
  Button: (props) => <button {...props} />,
  TextField: (props) => <input {...props} />,
  Container: (props) => <div {...props} />,
  Paper: (props) => <div {...props} />,
  Grid: (props) => <div {...props} />,
};
