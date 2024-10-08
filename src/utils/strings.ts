export const fixId = (id: number) => {
  const string = id.toString().padStart(3, '0');
  return string;
}

export const fixWeight = (weight: number) => {
  return `${(weight / 10).toFixed(1)} kg`
}

export const fixHeight = (height: number) => {
  return `${(height / 10).toFixed(1)} m`
}