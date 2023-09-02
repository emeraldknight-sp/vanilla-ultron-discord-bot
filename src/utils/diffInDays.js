const diffInDays = (date) => {
  const currentDate = new Date();
  const dayInMs = 24 * 60 * 60 * 1000;

  const diffInMs = currentDate - date;
  const diferencaEmDias = Math.floor(diffInMs / dayInMs);

  return diferencaEmDias;
};

module.exports = {
  diffInDays,
};
