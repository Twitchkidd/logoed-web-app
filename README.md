# Logoed!

### Welcome to the Logoed Website and Webapp!

I'm going us through the app and that's how I'm going to remember what I wrote two weeks ago, and solve the mystery of why the button isn't working, and many other mysteries and epic tasks, surely.

We could start from package.json, as this is a Node-based project. On line 20, under "scripts", we've got "start", which on my system is `yart` because I use the Yarn package manager instead of npm, so the command is `yarn start`, but I think `yart` is funnier, and amazing when you have to type something a thousand times how much a few keystrokes each time can add up to.

Actually, though, the command ends up being `HTTPS=true yart` because to use the camera, we need to ask permission from the user. This is going to be one thing that I want to set up on my own server for my personal site before launching, so if I mess it up at least I haven't messed up prod.

`npm start` or `yarn start` or `yart` run `react-scripts start` which looks for index.js in /src

index.js is pretty bare bones. Pass ./App to react-dom, pass App to browser. Which brings us to index.html in /public.

Again, pretty basic, no fancy fallback for not using Javascript, hopefully this'll be rendered into strings server-side before we reach a scale where that's a problem. I at least made the noscript polite.

We've got some icons (favicon and app icons for PWA) and some fonts ... too many fonts. Todo.

App.js starts to get a bit wild. Basically it's a router (also global styles,) and the component acts as a state container for whether it's been determined whether Logoed is being used at a business and what business that is. If `this.state.business` is truthy, we render `<WebApp />` and pass in the business prop.

If it's still `null`, then we render a switch navigator.

First check for a route match is /App/:Business, which receives /App/AnythingAtAll and passes that second part in as `Business` via `this.props.match.params.Business` to a `<Loading />` screen, which also takes a `handleSetBusiness()` prop and an optional `demo` prop.

The Loading screen renders a spinner, a cool one from `react-spinkit`, and when the component mounts, it does a fake fetch request, checking if `Business` is actually a recognized business, then renders an error message and the link to the home page, otherwise it's expected that the `handleSetBusiness()` function will run, passing the business name back up to App.js, navigating us away from Loading.

Which brings us to the Welcome screen, but just to bring it back to what's actually happening, for a sec, is that `this.state.business` is set to something truthy in App.js, the router, and this renders the `<WebApp />` component, which is at index.js in the WebApp folder in /src. `<WebApp />` uses conditional rendering, so the user won't be able to go back to other "screens" here using the back button in their browser. 👍

index.js at /src/WebApp _actually_ renders three possible states. The default for `this.state.screen` is `"Welcome"` and so then it renders `<Welcome />` with the `business` prop and a function to navigate to the next "screen" called `handleInitiateLogoing()`. We need at least a button press to activate the video camera. The other two states are a `<Logoing />` screen where the good stuff happens, and it's also passed the `business` prop and a `handleNoPermission()` function, that sets `this.state.screen` to `"No Permission"` at which point the user needs to actually close all their tabs and restart their browser to get another shot at asking permission for the camera. This could probably be handled more gracefully, maybe as a prop back to the Logoing screen like noCameraPermission and maybe they'd be able to pick from camera roll, and we could have a help box in the center up top, and maybe even see if we could use accelerometers to make like a cool parallax thing going on behind the help box up top. But I digress.

Logoing.js is a 283-line behemoth right now. Here's how it works.

First of all, right after the imports, we initiate two vars, `data` and `localMediaStrean`, so already we know I'm doing something hacky, lol. We also have a const object `businesses` which is mocking data we'd get over a query, with a name, logo (jpg/png,) and handle (like instagram handle.) So just remember that as you're going through `launchPermissionPrompt()` and `snapPhoto()`

Then we define --**nine**-- styled components, after importing two, and also using two native html elements. Nice. Good start.

I realize now, after the wrapper component for layout, I'm rendering the Helmet component, but that should be rendering one level up ... Quick win for a later time: TODO

So yea, after that we've got the Logo in a `<Moveable />` tag ... oh, wait, we've got the Logo rendered in the `<VideoWrapper />` tag ... we need the structure that I just made for the React Native app. Oh, boy, I'm going to enjoy porting that over, it's going to be like night and day in like a very minimal time. Very exciting: TODO

Anyway, we've got a header, video (or image, of the snapShot plus the logo, right now,) and action bar, with instructions to tap and drag, or a shutter, oh and also the canvas element where we do the magic of putting the logo on.

Then we have a hundred lines of commented-out code ... let's see, I don't need the Draggable parts ... I don't want to delete the getUserMedia stuff though, we might still need it.

Logoing.js is doing pretty well, except that it needs the next large refactor, but that's pretty much written already. The mystery of the button in Welcome.js remains, however.

I think I might just be getting grumpy because I haven't stood up in a bit, but WHAT SORT OF CRACK WAS I ON WHEN I WROTE THE BUTTON COMPONENT, lol. We'll get to this presently.

## The Next Day! Two Days! Something!

Okay, I think Logoing.js should really get a hit before I leave this to marinate, but the button, too, if I know that's something I'm going to have to fix right away, more or less.

Right, then, Logoing.js first. This is the screen we hit after the Welcome screen, and it's where camera permission is asked for, we're shown the camera viewport, the logo, and instructions to tap and drag the logo until it's on the viewport, then the shutter appears where the instructions were, in it's standard place there. Oh, right, a heading in there, too. And Helmet.

- ScreenWrapper
- - Helmet
- - Header
- - VideoWrapper
- - - Video
- - - Logo
- - Image
- - ActionBar
- - - Instructions
- - - Shutter
- - Canvas
- - Moveable

There are touch events on the VideoWrapper, and it's got a hidden prop, and the Logo is IN THERE, moveable by the Moveable component that snipes it out of the DOM somehow. The canvas component is required to blend the two images. The logic is kinda all over the place. I think the logo being a sibling of the video component is to make z-index work properly. I can see rendering a new logo alongside the Image, and if Moveable complains, what about rendering Moveable alongside them?

Oh, the Button component we load in Welcome is adorable, it just shouldn't be called just button, cause there's a lot going on there. I think I just need to display: none something and get some css to represent it's state change, and hook it up to the custom touch events.

Okay, when you're ready, when you get back, first thing is to get onClick() working on Button, and rename it, and then take a look at what's written in the native app for Logoing, what's written here, and uhh ... do the right thing, lol.
