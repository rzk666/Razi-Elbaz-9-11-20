// Not exoprting as default because usually we'd have more exports here
export const INITIAL_STATE = {
  weather: {
    isLoading: false,
    hasError: false,
    error: '',
    data: {},
    forecast: {
      isLoading: false,
      headline: {},
      daily: [null, null, null, null, null],
    },
  },
};
