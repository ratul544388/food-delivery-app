export const formatText = (text: string) => {
  const noHiphen = text.split("_").join(" ");
  return noHiphen.split("")[0].toUpperCase() + noHiphen.slice(1).toLowerCase();
};
