// Alunos: Gustavo Chaves, Felipe Orlamunder e Michael Varaldo

const { calcularHoras, calcularIntervalo, formatarHora } = require('./calculadoraHoras');

describe('Cálculo de horas trabalhadas', () => {
  test('Deve calcular corretamente as horas trabalhadas entre 08:00 e 17:00', () => {
    expect(calcularHoras('08:00', '17:00')).toBe(9);
  });

  test('Deve calcular corretamente as horas trabalhadas quando o horário final é menor que o inicial (inversão)', () => {
    expect(calcularHoras('23:00', '06:00')).toBe(7);
  });

  test('Deve retornar erro se o formato do horário estiver incorreto', () => {
    expect(() => calcularHoras('08:00', '25:00')).toThrow('Formato inválido');
  });
});

describe('Desconto de intervalo', () => {
  test('Deve descontar corretamente um intervalo de 1 hora', () => {
    const horasTrabalhadas = calcularHoras('08:00', '17:00');
    const intervalo = calcularIntervalo('01:00');
    const resultado = horasTrabalhadas - intervalo;
    expect(resultado).toBe(8);
  });

  test('Deve descontar corretamente um intervalo de 30 minutos', () => {
    const horasTrabalhadas = calcularHoras('08:00', '17:00');
    const intervalo = calcularIntervalo('00:30');
    const resultado = horasTrabalhadas - intervalo;
    expect(resultado).toBe(8.5);
  });

  test('Deve retornar erro se o formato do intervalo estiver incorreto', () => {
    expect(() => calcularIntervalo('25:00')).toThrow('Formato inválido');
  });
});

describe('Inversão de horários', () => {
  test('Deve calcular corretamente as horas trabalhadas quando o horário de término é anterior ao de início', () => {
    expect(calcularHoras('23:00', '05:00')).toBe(6);
  });

  test('Deve calcular corretamente as horas trabalhadas ao cruzar a meia-noite', () => {
    expect(calcularHoras('22:00', '02:00')).toBe(4);
  });
});

describe('Interpretação de horários sem ":"', () => {
  test('Deve aceitar horários no formato HHmm e calcular corretamente', () => {
    expect(calcularHoras('0800', '1700')).toBe(9);
  });

  test('Deve aceitar horários no formato H:mm e calcular corretamente', () => {
    expect(calcularHoras('8:00', '1700')).toBe(9);
  });

  test('Deve converter corretamente o horário sem ":" para o formato padrão', () => {
    expect(formatarHora('0800')).toBe('08:00');
    expect(formatarHora('0900')).toBe('09:00');
  });
});
