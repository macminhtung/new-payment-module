export interface IPayaCreateContact {
  contact: {
    account_number?: string;
    address?: string;
    cell_phone?: string;
    city?: string;
    company_name?: string;
    contact_api_id?: string;
    contact_balance?: string;
    contact_c1?: string;
    contact_c2?: string;
    contact_c3?: string;
    date_of_birth?: Date;
    email: string;
    email_trx_receipt: boolean;
    first_name?: string;
    header_message?: string;
    header_message_type?: number;
    home_phone?: string;
    last_name: string; // ==> [REQUIRED]: Contacts last name
    location_id: string; // ==> [REQUIRED]: Location id the contact belongs to
    office_ext_phone?: string;
    state?: string;
    update_if_exists?: boolean;
    zip?: number;
  };
}

export interface IPayaUpdateContact extends Omit<IPayaCreateContact['contact'], 'location_id' | 'update_if_exists'> {}

export interface IPayaContactResponse {
  id: string;
  location_id: string;
  account_number: string;
  contact_api_id: string | null;
  company_name: string | null;
  first_name: string | null;
  last_name: string;
  email: string | null;
  address: string | null;
  city: string | null;
  zip: string | null;
  home_phone: string | null;
  cell_phone: string | null;
  office_phone: string | null;
  office_ext_phone: string | null;
  contact_balance: string | null;
  email_trx_receipt: boolean;
  created_ts: number;
  modified_ts: number | null;
  date_of_birth: Date | null;
  header_message: string | null;
  header_message_type: number;
}
