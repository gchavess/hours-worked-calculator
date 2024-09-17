// Alunos: Gustavo Chaves, Felipe Orlamunder e Michael Varaldo

const readline = require('readline');

function validarFormatoHora(hora) {
  const regex = /^([01]?\d|2[0-3]):?([0-5]\d)$/; 
  if (!regex.test(hora)) {
    throw new Error('Formato inválido. Insira o horário no formato HH:mm ou HHmm.');
  }
}

function formatarHora(hora) {
  if (!hora.includes(':')) {
    if (hora.length === 4) {
      hora = `${hora.slice(0, 2)}:${hora.slice(2)}`; 
    } else if (hora.length === 3) {
      hora = `${hora.slice(0, 1)}:${hora.slice(1)}`;
    }
  }
  return hora;
}

function calcularHoras(inicio, fim) {
  inicio = formatarHora(inicio);
  fim = formatarHora(fim);

  validarFormatoHora(inicio);
  validarFormatoHora(fim);

  const [horaInicio, minutoInicio] = inicio.split(':').map(Number);
  const [horaFim, minutoFim] = fim.split(':').map(Number);

  const totalHoras = (horaFim + minutoFim / 60) - (horaInicio + minutoInicio / 60);

  return totalHoras >= 0 ? totalHoras : 24 + totalHoras; 
}

function calcularIntervalo(intervalo) {
  intervalo = formatarHora(intervalo);
  validarFormatoHora(intervalo);

  const [horaIntervalo, minutoIntervalo] = intervalo.split(':').map(Number);
  return horaIntervalo + minutoIntervalo / 60; 
}

function calcularHorasTrabalhadas() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Digite o horário de início (HH:mm ou HHmm): ", (inicio) => {
    rl.question("Digite o horário de término (HH:mm ou HHmm): ", (fim) => {
      rl.question("Digite a duração do intervalo de almoço (HH:mm ou HHmm): ", (intervalo) => {
        try {
          const horasTrabalhadas = calcularHoras(inicio, fim);
          const horasIntervalo = calcularIntervalo(intervalo);
          const horasTrabalhadasFinal = horasTrabalhadas - horasIntervalo;

          console.log(`Você trabalhou ${horasTrabalhadasFinal.toFixed(2)} horas hoje (com desconto do intervalo).`);
        } catch (e) {
          console.log(e.message);
        }
        rl.close();
      });
    });
  });
}

calcularHorasTrabalhadas();

module.exports = { calcularHoras, calcularIntervalo, formatarHora };

