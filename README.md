# Music App

[Click here to see the deployed app](https://nickys-music-app.netlify.app/)

An innovative online music library designed to revolutionise the way music enthusiasts discover, organise, and share their favourite tunes. With a sleek and intuitive interface, users can seamlessly explore a vast collection of songs, discover new artists, and even contribute by uploading their latest releases.

- **Signup:** You can sign up and start exploring and favouriting new songs and artists.
- **Login:** As a user, you can log in to access your personalised favourites.
- **Logout:** As a user, you can log out to ensure your data remains secure.
- **Upload Release:** As a user, you can upload your own release so others can listen and favourite.
- **Remove Favourites:** As a user, you can remove songs and artists from your favourites.

## Routes

- / - Homepage
- /signup - Signup form
- /login - Login form
- /songs - List of all the songs available on the platform
- /songs/:\_id - The song's details
- /uploadSong - Upload your own song form
- /artists - List of all artists available on the platform
- /artists/:\_id - The artist's details
- /profile/:\_d - User's profile

## Components

- Footer
- Navbar
- PrivateRoute

## Models

User Model

username
type - string // required, Unique, lowercase, trim

passwordHash
type - string // required

image
type - string // default
name - string
lastName - string
location - string
favouriteSongs // Schema.Types.ObjectId
favouriteArtists // Schema.Types.ObjectId

Songs Model

title - string // required
artist - string // required
album - string
genre - string
lable - string
released - number
image - string // default

Artist Model

name - string // required
realName - string
location - string
image - string // default
