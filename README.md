![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)<br>
![shields.io](https://img.shields.io/github/stars/l2ig/jToast.svg?style=for-the-badge)
![shields.io](https://img.shields.io/github/languages/top/l2ig/jToast.svg?style=for-the-badge)
![shields.io](https://img.shields.io/jsdelivr/gh/hd/l2ig/jToast.svg?style=for-the-badge)<br><br>

# jToast
A modern & easy-going jQuery Plugin to create Toasts.<br><br>

## Demo
[Click](https://l2g.cc/projects/jToast/)
<br><br>

## Let's go!
Just add the following tag to the end of your page
```html
<script src="https://cdn.jsdelivr.net/gh/l2ig/jToast/jToast.min.js">
```
> Delivered by [jsdeliver](https://www.jsdelivr.com/).

<br>

## Customization options
* Text
* Duration
* Background
* Color
* Border radius
* Close icon
* Progress bar
<br>

## Usage & default values
```javascript
showToast(text, {
  duration: 3000,
  background: '#232323',
  color: '#fff',
  borderRadius: '0px',
  close: false,
  progressBar: false
});
```

```javascript
hideToast(toastID); // toastID gets returned from the showToast function
```
<br>

## An example
```javascript
showToast('Thanks for signing up!', {
  duration: 5000,
  background: '#20b2aa',
  borderRadius: '25px',
  close: true
});

