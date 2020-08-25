export function getRgbLightness(r, g, b) {
  const minAndMax = Math.max(r, g, b) + Math.min(r, g, b);
  return minAndMax / 2 / 255;
}
  
export function rgbToHsl(r, g, b) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const cMax = Math.max(red, green, blue);
  const cMin = Math.min(red, green, blue);
  const delta = cMax - cMin;

  function getHue() {
    if (delta === 0) return 0;

    if (cMax === red) {
      return ((green - blue) / delta) % 6;
    }
    if (cMax === green) {
      return ((blue - red) / delta) + 2;
    } 
    return ((red - green) / delta) + 4;
  }

  const lightness = getRgbLightness(r, g, b);

  function getSaturation() {
    if (delta === 0) return 0;
    const denom = 1 - Math.abs((2 * lightness) - 1);
    return delta / denom;
  }

  const hue = Math.round(60 * getHue());

  return  {
    h: hue < 0 ? 360 + hue : hue,
    s: Math.round(getSaturation() * 100),
    l: Math.round(lightness * 100),
  };
}

