# Image resizer

## Automatically generate screenshots for different devices sizes with blank automatically filled with black

# Setup

Install dependencies
```
brew install imagemagick
brew install ffmpeg
```

Install project dependencies
```
yarn 
or
npm install
```

# Run

Setup your devices sizes inside the json file `devices.json``
```
Example : 
{
    "devices": [
        {
            "name": "iphone5",
            "size": {
                "w": 1242,
                "h": 2208
            }
        }
}
```
will generate each screenshot presents inside screenshots folder with this dimension.

Launch
```
node index.js
```
will generate all files inside `out` folder.
```
out
| - iphone5
    | - screenshot-file.png
```
with the screenshot-file.png previsouly added inside the `screenshots` directory
```
screenshots
| - screenshot-file.png
```