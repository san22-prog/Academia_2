export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function validateSignup(details, accounts = []) {
  const name = details.name.trim();
  const username = details.username.trim();
  const email = normalizeEmail(details.email);

  if (!name || !username || !email || !details.password) return 'required';
  if (!EMAIL_PATTERN.test(email)) return 'email';
  if (details.password.length < 6) return 'password';
  if (accounts.some((account) => normalizeEmail(account.email) === email)) return 'email-taken';
  return null;
}

export function findLoginAccount(identifier, password, accounts = []) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  if (!normalizedIdentifier || !password) return null;

  return accounts.find((account) => (
    [account.email, account.username, account.name]
      .some((value) => value.toLowerCase() === normalizedIdentifier)
    && account.password === password
  )) || null;
}

export function validateProfile(user) {
  if (!user.name.trim()) return 'name';
  if (!EMAIL_PATTERN.test(normalizeEmail(user.email))) return 'email';
  return null;
}