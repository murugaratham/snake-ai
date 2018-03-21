import Switch from '../components/Switch';
import { connect } from 'react-redux';
import { IStoreState } from '../types';
import * as actions from '../actions/';

const mapStateToProps = (state: IStoreState) => {
    return {
        label: state.hitSelfReducer.label,
        value: state.hitSelfReducer.value
    };
};

const mapDispatchToProps = {
    onToggle: actions.toggleHitSelf
};

export default connect(mapStateToProps, mapDispatchToProps)(Switch);