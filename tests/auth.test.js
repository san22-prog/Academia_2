import { findLoginAccount, validateProfile, validateSignup } from '../src/helpers/auth';

const accounts = [{
  name: 'Ada Lovelace',
  username: 'ada',
  email: 'ada@example.com',
  password: 'pencil123',
}];

describe('auth validation', () => {
  test('validates required fields, email, password length, and duplicate email', () => {
    expect(validateSignup({ name: '', username: '', email: '', password: '' })).toBe('required');
    expect(validateSignup({ name: 'Ada', username: 'ada', email: 'bad', password: '123456' })).toBe('email');
    expect(validateSignup({ name: 'Ada', username: 'ada', email: 'ada@example.org', password: '123' })).toBe('password');
    expect(validateSignup({ ...accounts[0] }, accounts)).toBe('email-taken');
    expect(validateSignup({ ...accounts[0], email: 'new@example.com' }, accounts)).toBeNull();
  });

  test('supports email, username, and name login identifiers', () => {
    expect(findLoginAccount('ADA@EXAMPLE.COM', 'pencil123', accounts)).toBe(accounts[0]);
    expect(findLoginAccount('ada', 'pencil123', accounts)).toBe(accounts[0]);
    expect(findLoginAccount('Ada Lovelace', 'wrong', accounts)).toBeNull();
  });

  test('compares passwords exactly and preserves case sensitivity', () => {
    expect(findLoginAccount('ada', 'pencil123', accounts)).toBe(accounts[0]);
    expect(findLoginAccount('ada', 'Pencil123', accounts)).toBeNull();
    expect(findLoginAccount('ada', 'pencil123 ', accounts)).toBeNull();
  });

  test('validates profile name and email', () => {
    expect(validateProfile({ name: '  ', email: 'ada@example.com' })).toBe('name');
    expect(validateProfile({ name: 'Ada', email: 'invalid' })).toBe('email');
    expect(validateProfile({ name: 'Ada', email: ' ADA@example.com ' })).toBeNull();
  });
});