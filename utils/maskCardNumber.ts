export function maskCardNumber(value: string) {
  const clean = value.replace(/\D/g, "")

  if (clean.length < 4) return clean

  const last4 = clean.slice(-4)
  const masked = "*".repeat(Math.max(clean.length - 4, 0)) + last4

  return masked.match(/.{1,4}/g)?.join(" ") ?? masked
}
