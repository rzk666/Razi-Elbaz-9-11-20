import { compose } from 'redux';
// Global HOCs
import WithLayout from './WithLayout';

const page = compose(
  WithLayout,
);

export default page;
