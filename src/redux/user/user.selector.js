import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectToken = createSelector([selectUser], (user) => user.token);

export const selectMessage = createSelector(
  [selectUser],
  (user) => user.message
);

export const selectError = createSelector([selectUser], (user) => user.error);

export const selectSuccess = createSelector(
  [selectUser],
  (user) => user.success
);

export const selectSubscription = createSelector(
  [selectUser],
  (user) => user.subscription
);
export const selectDownload = createSelector(
  [selectUser],
  (user) => user.downloads
);
export const selectIsLoading = createSelector(
  [selectUser],
  (user) => user.isLoading
);

export const selectIsConfirmMessage = createSelector(
  [selectUser],
  (user) => user.confirmMessage
);
