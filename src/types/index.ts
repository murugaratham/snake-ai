import Snake from '../AI/snake';

export interface IStoreState {
    running: boolean;
    paused: boolean;
    snakes: Snake[];
    isPortalActive: boolean;
    hitWallReducer: ISwitchState;
    hitSelfReducer: ISwitchState;
    growWhenEatReducer: ISwitchState;
    highSpeedReducer: ISwitchState;
    populationReducer: IFieldState;
    elitismPercentReducer: IFieldState;    
    displaySizeReducer: IFieldState;
    eatFoodScoreReducer: IFieldState;
    gridResolutionReducer: IFieldState;
    moveAwayFoodScoreReducer: IFieldState;
    moveTowardsFoodScoreReducer: IFieldState;
    snakeStartingLengthReducer: IFieldState;
}

export interface ISwitchState {
    value: boolean;
    label: string;
}

export interface IFieldState {
    name: string;
    value: string | number;
    label?: string;
    placeholder: string;
    type: string;
    description: string;
    disabled?: boolean;
    required: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    step?: number;
    size?: number;
    onChangeEvent?: () => any;
}
