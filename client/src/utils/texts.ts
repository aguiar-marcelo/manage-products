export function titleize(text: string) {
  var words = text.toLowerCase().split(' ');
  for (var a = 0; a < words.length; a++) {
    var w = words[a];
    if (w) {
      words[a] = w[0]?.toUpperCase() + w.slice(1);
    }
  }
  return words.join(' ');
}
