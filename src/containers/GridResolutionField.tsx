import Field from '../components/Field';
import * as actions from '../actions/';
import { connect } from 'react-redux';
import { IStoreState } from '../types';

const mapStateToProps = (state: IStoreState) => {
    const s = state.gridResolutionReducer;
    return {
        name: s.name,
        value: s.value,
        label: s.label,
        placeholder: s.placeholder,
        type: s.type,
        description: s.description,
        disabled: s.disabled,
        required: s.required,
        minLength: s.minLength,
        maxLength: s.maxLength,
        min: s.min,
        max: s.max,
        step: s.step,
        size: s.size
    };
};

const mapDispatchToProps = {
    onChangeEvent: actions.updateGridResolutionField,
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);