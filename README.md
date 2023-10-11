# ground-signal-map-test

My submission for the Ground Signal's map test assessment

![A screenshot of the App's User Interface](./assets/20231011_104511_ground_signal_app_demo_shot_1.png?raw=true)

> A screenshot of the App's User Interface

### About the app:

This app gets the input of a user. in this case, a name of a business place or location. The app compares the input with a predefined list of known locations, and if found, navigates to that location's point on the map. The user can then go ahead and view all the information related to that location or business.

### Tech Stack

The application is a front-end-only application. It uses Next.js, Typescript, Tailwind CSS, Redux, React-leaflet, ipinfo.io API, and Chart.js

### Functionality Flow

1. On initial load, the app asks the user for his or her location, making use of the Geolocation API. If the user grants permission to the browser to access their location, the app extracts the latitude and logitude from the response object from the Geolocation API. If the user refuses or rejects granting permission to access precise location, then a background request to get their approximate location, which is more privacy-safe, is sent to ipInfo.io using the Axios library, and also, the latitude and longitude are extracted also.
2. Once the co-ordinates are extracted, they are sent to a global Redux state and stored so all components in the app can make use of them.
3. When the user types in and selects a location, the co-ordinates from that location's object are retrieved and then passed to Leaflet's Map Canvas Marker as a prop value, so that the Marker pinpoints at the selected location.
4. An `onCLick` event listener is placed on the Marker component such that when a user click on it while it's on a pinpointed location, the respective location's object is retrived, and sent to a reducer, and then the modal is triggered open. Once open, the Modal retriees the state value from the reducer, and then displays all info relevant and available for the user.
