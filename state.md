I'm just going to go through this one by one and we'll get it squared away.

First, we check to see if there's incoming data, i.e. we're coming from the next screen ... Wait let's do that later.

First let's assume no inbound data. Wrong word for the piece of state anyway.

I had a ready and a playing before, when we had OS issues, let's simplify it ... actually, what if we don't get camera permission?

So ready needs to say exactly what it is ... what would that change though, in the that case?

Ah, okay, so ... oh, actually, there's an explicit noCameraPermission, that's how we'll handle it.

# Init

```json
noCameraPermission: false,
isVideoPlaying: false,
stream: null
```

# Camera Permission Success

```json
noCameraPermission: false,
isVideoPlaying: true,
stream: this.video.current.srcObject,
```

Okay, so are we going to talk about the logoing process or the photo taking process yet? How about the logoing proceess, because there are already pieces of state that aren't handled, the way we've got everything currently.

Okay so actually, from init, we also need that the logo is in the action bar, and whether it's touched or not, and left and top have to be ready to go. We're missing the calculation for what the first left and top should be, the initial placement, and also the boundary conditions.

Umm, how are we going to calculate that? We lost sooo much frikken real estate when we went to the real, slightly older devices, rather than the iPhone 8+ ... okay, the button is too damn big, the padding is like, close, maybe we can squeeze out a little from the header, decrease the padding on the bottom, decrease the font-size ...

# Init

```json
noCameraPermission: false,
isVideoPlaying: false,
stream: null,

```

# Camera Permission Success

```json
noCameraPermission: false,
isVideoPlaying: true,
stream: this.video.current.srcObject,
```

Lol, new day, who dis?

Okay, so I need to type this out, I just wrote a bunch of stuff out on 'paper' except there was no paper and my writing tool was my finger, so let's say we used invisible ink, lol, here's how we decide what the initial; top ad left for the logo should be. For te y coordinate, so the top attribute, we need to center the logo with relation to the top action bar, so we need the height of the top action bar, and then the half of that, and we also need the height of the logo, and the half of that, and we also need the height of the header and video component/placeholder.

top: UpperHeight + (TopActionBarHeight _ 0.5) - (ActionBarLogoHeight _ 0.5)

Then we need the x coordinate, so the left attribute. On the x axis, the logo needs to be placed where it would be placed if there was another div of the same size in there, and that and the text element are part of a flexbox layout, and the justify-content is space-around. It seems like the formula there is the remaining space is divvied up so that there's an even amoun in-between each flex-item, and then one more of those units that's split into two and put on either end. So ... we need the width of the top action bar, the width of the logo, and the width of the text element. I think that's the hard part, there, maybe we can make that easer by finding a pixel value that works with our copy ... just know we'll have to rework this is we change the copy, and I'm sure there's a more elegant solution ... uhh, I mean maybe we can set the text elements width by em, and then set the actual left value from a shadow element, how hard would that be? You know what, I don't have the bandwidth to find out right now, we need to frikken MOVE. Lol, that thinking will get me into trouble one of these days ...

Okay, sweet, got the logo to change its state properly ... that's why I need the names of all these things, though, because I ended up trying to apply the wrong style because the piece of state was called logoed, but the mixin was actionBar while there was also a logoing mixin ... very confusing, lol, and I just realized we need another piece of state ... oh, wait, no, we need the piece of state that's already there: touched needs to also include changing the size so users don't plop it down and then are like wtf, it grew.
