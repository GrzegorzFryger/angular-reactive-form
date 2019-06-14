export interface User {
  name: string; // Imię
  surname: string; // Nazwisko
  email: string; // E-mail
  phone: string | null; // Numer telefonu
  passwords: {
    password: string; // Hasło
    passwordVer: string;
  };
  pet: string; // Zwierzę
  address: {
    city: string; // Miasto
    street: string; // Ulica
    building: string; // Numer domu
    flatNo: string | null; // Numer mieszkania
  };
  consents: {
    newsletter: boolean; // Zgoda na otrzymywanie wiadomości e-mail.
    sms: boolean; // Zgoda na otrzymywanie wiadomości SMS.
  };
}
