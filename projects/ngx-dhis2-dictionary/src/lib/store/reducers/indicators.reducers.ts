import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

import { IndicatorsState, AllIndicatorsState, IndicatorPropertiesState, IndicatorGroupsState } from '../state/indicators.state';
import { IndicatorsAction, IndicatorsActions} from '../actions/indicators.actions';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';



export interface State extends EntityState<AllIndicatorsState> {
    indicators: any;
    progressLoadingValue: number;
}

export const adapter: EntityAdapter<AllIndicatorsState> = createEntityAdapter<AllIndicatorsState>();

export const INITIAL_STATE_LOADED_INDICATORS: State = adapter.getInitialState({
    indicators: null,
    progressLoadingValue: 0
})


export function indicatorsListReducer(state: IndicatorsState = null, action: IndicatorsAction) {
    switch (action.type) {
        case IndicatorsActions.LoadIndicatorsSuccess:
            return {...action.payload}
        default:
            return state;
    }
}

export function allIndicatorsRedcuer(state: AllIndicatorsState = INITIAL_STATE_LOADED_INDICATORS, action: IndicatorsAction) {
    switch (action.type) {
        case IndicatorsActions.LoadIndicatorsByPagesSuccess:
            return {
                ...state,
                indicators: action.payload
            }
        case IndicatorsActions.LoadIndicatorsByPagesSuccess:
            return {...state,
                progressLoadingValue: action.payload
            }
        default:
            return state;
    }
}

export interface AppState {
    indicatorsList: IndicatorsState;
    allIndicators: AllIndicatorsState;
  }

export const indicatorsReducers: ActionReducerMap<AppState> = {
    indicatorsList: indicatorsListReducer,
    allIndicators: allIndicatorsRedcuer
  };

