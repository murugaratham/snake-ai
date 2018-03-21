import * as constants from '../constants';

export interface IToggleHitSelf {
    type: constants.TOGGLE_DIES_WHEN_HIT_SELF;
}

export const toggleHitSelf = (): IToggleHitSelf => ({
    type: constants.TOGGLE_DIES_WHEN_HIT_SELF
});
