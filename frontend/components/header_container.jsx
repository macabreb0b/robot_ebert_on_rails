import { connect } from 'react-redux';

import Header from './header';

const mapStateToProps = (state) => {
    const session = state.session || {}
    return {
        currentUserId: session.currentUserId,
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);