const unitless = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true,
};

const normalizeVendorPrefix = (() => {
  const uppercasePattern = /[A-Z]/g;
  const msPattern = /^ms-/;

  return (str: string) =>
    str.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
})();

const normalizeStyleValue = (name: string, value: string) => {
  if (typeof value === 'number' && !unitless[name as keyof typeof unitless]) return `${value}px`;

  return value;
};

const css = (obj = {}) =>
  Object.keys(obj)
    .map((key) => {
      const val = obj[key as keyof typeof obj];

      return `${normalizeVendorPrefix(key)}:${normalizeStyleValue(key, val)};`;
    })
    .join('');

export default css;
