const SET_PLAY = 'SET_PLAY';

export const setPlay = (play: boolean) => ({
  type: SET_PLAY,
  payload: play,
});

const initialState: boolean | null = false;

export const play = (state = initialState, action: { type: string; payload: string }) => {
  switch (action.type) {
    case SET_PLAY:
      return action.payload;
    default:
      return state;
  }
};
