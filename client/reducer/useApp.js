import React, { useReducer, createContext, useContext, useEffect, useMemo, useCallback } from 'react';

const Context = createContext();

const initState = {
  current: 1
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_CURRENT':
      return {
        ...state,
        current: payload
      };
    default:
      return state;
  }
};

export const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initState);

  const value = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  );

  return <Context.Provider value={value} {...props} />;
};

export default () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  const { state, dispatch } = context;

  const handleCurrent = useCallback(value => {
    dispatch({
      type: 'SET_CURRENT',
      payload: value
    });
  }, []);

  return {
    state,
    handleCurrent
  };
};
