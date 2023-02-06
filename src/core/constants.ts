export const enum RESPONSE_MESSAGE {
  USER_WITH_THIS_UUID_DOESNT_EXIST = 'User with this uuid does not exist',
  YOU_ENTERED_THE_WRONG_CURRENT_PASSWORD = 'You entered the wrong current password',

  TRACK_WITH_THIS_UUID_DOESNT_EXIST = 'Track with this uuid does not exist',

  ARTIST_WITH_THIS_UUID_DOESNT_EXIST = 'Artist with this uuid does not exist',
  ALBUM_WITH_THIS_UUID_DOESNT_EXIST = 'Album with this uuid does not exist',

  TRACK_ADDED_TO_FAVORITES_SUCCESSFULLY = 'Track added to favorites successfully',
  ARTIST_ADDED_TO_FAVORITES_SUCCESSFULLY = 'Artist added to favorites successfully',
  ALBUM_ADDED_TO_FAVORITES_SUCCESSFULLY = 'Album added to favorites successfully',

  TRACK_SUCCESSFULLY_REMOVED_FROM_FAVORITES = 'Track successfully removed from favorites',
  ARTIST_SUCCESSFULLY_REMOVED_FROM_FAVORITES = 'Artist successfully removed from favorites',
  ALBUM_SUCCESSFULLY_REMOVED_FROM_FAVORITES = 'Album successfully removed from favorites',
}

export const enum FAVORITE_TYPE {
  TRACK = 'track',
  ARTIST = 'artist',
  ALBUM = 'album',
}
