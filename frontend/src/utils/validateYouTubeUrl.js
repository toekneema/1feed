export const validateYouTubeUrl = (url) => {
  let [data, hasError] = [null, false];
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    data = url.match(p)[1];
  } else {
    hasError = true;
  }
  return [data, hasError];
};
