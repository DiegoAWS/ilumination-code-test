# Test project for Ilumination Team

Visible on [this site](https://ilumination-code-test.web.app)
NOTE, since this site uses FIREBASE services, it is strongly recommended to access from outside of Cuba (VPN)

## Answer to the Excersice

The Requested component is [Here](./src/components/VideoInput.jsx).
For watching an implementation of this component I just created this SIMPLE web Video 'Hosting' Service.

## Excersice

VideoUpload Component

ImageUpload is a controlled component that should allow changing an image and visually show the upload percentage for the server.

### Usage

```js
<VideoInput
   value=”http://www.cdn.com/foo.mp4”
   onChange={() => {}}
   percentage={25}
/>
```

### API

Name Types Default Description
value string undefined the url of the video
percentage number undefined Percent uploaded to server
onChange function () => {} Event that is emitted when the video is changed

Note: They must work on desktop and mobile and use the following technologies and libs

- React Functional
- Grommet FileInput
- Grommet Meter
- ReactPlayer
- Styled Component
