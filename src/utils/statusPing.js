export const statusPing = (responseTime) => {
  if (responseTime < 20) {
    return "Excelente";
  } else if (responseTime < 50) {
    return "Bom";
  } else if (responseTime < 100) {
    return "Médio";
  } else if (responseTime < 200) {
    return "Ruim";
  } else {
    return "Péssimo";
  }
};
