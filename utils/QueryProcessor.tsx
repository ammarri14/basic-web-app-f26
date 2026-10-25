export default function QueryProcessor(query: string): string {
  const lower = query.toLowerCase();
  const numbers = (query.match(/\d+/g) ?? []).map(Number);

  if (lower.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (lower.includes("andrew id")) {
    return "ammarri";
  }

  if (lower.includes("name")) {
    return "Chicken#1";
  }

  if (lower.includes("your age")) {
    return "67";
  }

  // Largest number
  if (lower.includes("largest")) {
    return Math.max(...numbers).toString();
  }

  // Primes
  if (lower.includes("primes")) {
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
      return true;
    };
    return numbers.filter(isPrime).join(", ");
  }

  // Both a square and a cube (sixth powers like 1, 64, 729)
  if (lower.includes("square") && lower.includes("cube")) {
    const isSixthPower = (n: number) => Math.pow(Math.round(Math.pow(n, 1 / 6)), 6) === n;
    return numbers.filter(isSixthPower).join(", ");
  }

  // Power, exact even for huge results
  if (lower.includes("power")) {
    let result = BigInt(1);
    for (let i = 0; i < numbers[1]; i++) result *= BigInt(numbers[0]);
    return result.toString();
  }

  // Anagram: which of the following is an anagram of "listen": enlists, inlets, ...
  if (lower.includes("anagram of")) {
    const sorted = (w: string) => w.split("").sort().join("");
    const target = lower.match(/anagram of "?(\w+)"?/)?.[1] ?? "";
    const options = (lower.split(":").pop() ?? "").replace("?", "").split(",").map((w) => w.trim());
    return options.find((w) => sorted(w) === sorted(target)) ?? "";
  }

  // Scrabble score
  if (lower.includes("scrabble score of")) {
    const scores: Record<string, number> = {
      a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, s: 1, t: 1, r: 1,
      d: 2, g: 2, b: 3, c: 3, m: 3, p: 3, f: 4, h: 4, v: 4, w: 4, y: 4,
      k: 5, j: 8, x: 8, q: 10, z: 10,
    };
    const word = lower.match(/scrabble score of (\w+)/)?.[1] ?? "";
    return word.split("").reduce((sum, c) => sum + (scores[c] ?? 0), 0).toString();
  }

  // Arithmetic with plus, minus, multiplied by, divided by, in correct order
  const expr = lower
    .replace(/what is|\?/g, "")
    .replace(/multiplied by/g, "*")
    .replace(/divided by/g, "/")
    .replace(/plus/g, "+")
    .replace(/minus/g, "-")
    .trim();

  if (/^\d+(\s*[-+*/]\s*\d+)+$/.test(expr)) {
    const tokens = expr.match(/\d+|[-+*/]/g) ?? [];
    const terms: (number | string)[] = [Number(tokens[0])];
    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i];
      const n = Number(tokens[i + 1]);
      if (op === "*") terms.push((terms.pop() as number) * n);
      else if (op === "/") terms.push((terms.pop() as number) / n);
      else terms.push(op, n);
    }
    let result = terms[0] as number;
    for (let i = 1; i < terms.length; i += 2) {
      result = terms[i] === "+" ? result + (terms[i + 1] as number) : result - (terms[i + 1] as number);
    }
    return result.toString();
  }

  if (lower.includes("67")) {
    return "I love 67";
  }

  return "";
}