import { connect } from 'react-redux';

import BoxOfficeChart from './box_office_chart';

const mapStateToProps = (state, { movie, boxOfficeDays }) => {
  return {
    movie,
    boxOfficeDays
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxOfficeChart);