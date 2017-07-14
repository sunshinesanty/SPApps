import * as React from 'react';
const toast = require('react-toastify').toast;

const Notify: React.StatelessComponent<{ message: string; }> = (props) => <div>{props.message}</div>;

export const ErrorNotifyOptions = { type: toast.TYPE.ERROR, autoClose: 10000 };

export const WarnNotifyOptions = { type: toast.TYPE.WARNING };

export const InfoNotifyOptions = { type: toast.TYPE.INFO };

export const SuccessNotifyOptions = { type: toast.TYPE.SUCCESS };

export default Notify;
