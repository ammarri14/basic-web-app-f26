export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Chicken#1";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "ammarri";
  }

  if (query.toLowerCase().includes("67")) {
    return "I love 67";
  }

  const numbers = (query.match(/\d+/g) ?? []).map(Number);

  if (query.toLowerCase().includes("largest")) {
    return Math.max(...numbers).toString();
  }

  if (query.toLowerCase().includes("plus")) {
    return numbers.reduce((a, b) => a + b, 0).toString();
  }

  if (query.toLowerCase().includes("power")) {
    let result = BigInt(1);
    for (let i = 0; i < numbers[1]; i++) result *= BigInt(numbers[0]);
    return result.toString();
  }

    if (query.toLowerCase().includes("minus")) {
    return (numbers[0] - numbers[1]).toString();
  }

    if (query.toLowerCase().includes("primes")) {
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
      return true;
    };
    return numbers.filter(isPrime).join(", ");
  }
  


  return "";
}
