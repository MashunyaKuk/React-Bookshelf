export const ROUTE = {
  PROFILE: "/profile/:userId",
  PROFILE_EDIT: "/profile/:userId/edit",
  PROFILE_ABOUT: "/profile/:userId/about",
  PROFILE_READING: "/profile/:userId/reading",
  PROFILE_WANT: "/profile/:userId/want",
  PROFILE_FINISHED: "/profile/:userId/finished",
  LIBRARY: "/library",
  BOOK: "/library/book/:userId",
}

export const PATHS = {
  PROFILE: id => `/profile/${id}`,
  PROFILE_EDIT: id => `/profile/${id}/edit`,
  PROFILE_ABOUT: id => `/profile/${id}/about`,
  PROFILE_READING: id => `/profile/${id}/reading`,
  PROFILE_WANT: id => `/profile/${id}/want`,
  PROFILE_FINISHED: id => `/profile/${id}/finished`,
  LIBRARY: id => `/library/${id}`,
  BOOK: id => `/library/book/${id}`,
}