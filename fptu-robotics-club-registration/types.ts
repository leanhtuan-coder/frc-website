export interface RegistrationFormData {
  fullname: string;
  studentId: string;
  phone: string;
  email: string;
  campus: string;
  major: string;
  reason: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
