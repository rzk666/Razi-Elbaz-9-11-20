import React from 'react';
// Components
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const ErrorToast = ({ hasError, onClose = () => {} }) => (
  <Snackbar open={hasError} autoHideDuration={6000} onClose={() => onClose()}>
    <Alert severity="error">
      There was an error contacting the server
    </Alert>
  </Snackbar>
);

export default ErrorToast;
