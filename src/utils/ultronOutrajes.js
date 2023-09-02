const outrajes = [
  "pedaço de humano",
  "bife de rato",
  "saco de lixo de perucas",
  "peido de jumenta",
  "humano seboso",
  "saco de vacilos",
  "humano feio",
  "humano covarde",
  "saco de estrume",
  "sofá de zona",
  "humano patético",
  "humano desgraçado",
  "vai coçar o c# com um serrote",
  "filhote de lombriga",
  "cara de c# com cãimbra",
  "paquita do capeta",
  "bafo de bunda",
];

function ultronOutrajes() {
  return outrajes[Math.floor(Math.random() * outrajes.length)];
}

module.exports = {
  ultronOutrajes,
};
