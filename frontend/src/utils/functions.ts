export function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function popValue(arr: any[], value: any) {
  return arr.filter((e) => e !== value);
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: Date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

export function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime());
}

export function generateHorariosArray(duracion: any, turno: string): string[] {
  let arr = [];
  duracion = parseInt(duracion);
  let inicio = turno === "tarde" ? 16 : turno === "noche" ? 20 : 9;
  let fin = turno === "tarde" ? 20 : turno === "noche" ? 24 : 16;

  if (duracion === 30) {
    for (let i = inicio; i < fin; i++) {
      for (let j = 0; j < 4; j++) {
        if (duracion * j > 59) {
          continue;
        }
        arr.push(`${i}:${j === 0 ? `00` : duracion * j}`);
      }
    }
  }

  if (duracion === 15) {
    for (let i = inicio; i < fin; i++) {
      for (let j = 0; j < 4; j++) {
        arr.push(`${i}:${j === 0 ? `00` : duracion * j}`);
      }
    }
  }

  if (duracion === 60) {
    for (let i = inicio; i < fin; i++) {
      arr.push(`${i}:00`);
    }
  }

  return arr;
}

export function convertIntToMonth(num: number) {
  switch (num) {
    case 0:
      return "Ene";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Abr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Ago";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dic";
  }
}

export function convertIntToDay(num: number) {
  switch (num) {
    case 0:
      return "Lun";
    case 1:
      return "Mar";
    case 2:
      return "Mie";
    case 3:
      return "Jue";
    case 4:
      return "Vie";
    case 5:
      return "Sab";
    case 6:
      return "Dom";
  }
}

export function isValidHttpUrl(s: string) {
  try {
    const newUrl = new URL(s);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}
