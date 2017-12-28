# canvas-abacus
Javascript For creating an Abacus in an HTML5 Canvas. This was made during a Stupid Hackathon

This small library makes it easy to create an abacus in HTML5 Canvas and programatically change it. Getting started is easy, just create a canvas tag with an ID, then create a new abacus using that ID:
```html
<html>
<head>
  <title>Easy Abacus</title>
</head>
<body>
  <canvas id="myCanvas"></canvas>
  <script src='abacus.js'></script>
  <script>
    var abacus = new Abacus("myCanvas");
    abacus.drawFrame(); #draw the frame of the abacus on the canvas
    abacus.defaultSetup(); #draw the pegs on the abacus in their default setup (value 0)
  </script>
</body>
</html>
```
That's it! This will draw an abacus on the canvas for you!

### Drawing Options

If you don't specify then drawing the abacus will create it with it's default values but you can have more fine grained control over what it will look like by passing configuration parameters when initilizing the object:
```javascript
var abacus = new Abacus("canvas_id", {config_option1:value_1, config_option_2:value_2, ...});
```

The available configuration options are listed below:
  - number_of_bars (Default: 10)
    - This is the number of bars that your abacus will have, the more bars the higher you can count!
  - frame_color (Default: 'saddlebrown')
    - This is the color the frame of the abacus will be drawn with, any CSS color value is accepted.
  - bar_color (Default: 'grey')
    - This is the color the bars of the abacus will be drawn with, any CSS color value is accepted.
  - slider_color (Default: 'green')
    - This is the color the sliders on the abacus will be drawn with, any CSS color value is accepted.
  - height (Default: 100%)
    - The height of the abacus, you can use percentages if you want to make it relative to the size of the canvas or pixels if you want an exact height. Please note that 100% actually will leave a 10px gap on the top and the bottom. 
  - width (Default: 100%)
    - The width of the abacus, you can use percentages if you want to make it relative to the size of the canvas or pixels if you want an exact width. Please note that 100% actually will leave a 10px gap on the left and right.
  
### Controlling the Abacus
  
#### Drawing controls
  
After you have created an abacus object you have several function to render it.
  
  - abacus.drawFrame()
    - Draws the frame of the abacus on the canvas
  - abacus.clearAbacus()
    - Clear the entire abacus from the canvas
  - abacus.defaultSetup()
    - Add sliders onto the abacus
  - abacus.setUpNumber()
    - Clear the abacus and then draw it with a specific number showing
  
 #### Movement Controls
 
You can also control the indvidual sliders on each bar

  - abcaus.pushDownUpper(bar_number)
    - pushes down one slider on the upper half of the abacus on bar number bar_number
  - abcaus.pushUpUpper(bar_number)
    - pushes up one slider on the upper half of the abacus on bar number bar_number
  - abcaus.pushDownLower(bar_number)
    - pushes down one slider on the lower half of the abacus on bar number bar_number
  - abcaus.pushUpLower(bar_number)
    - pushes up one slider on the lower half of the abacus on bar number bar_number
