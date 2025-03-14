export interface IPayaCreateContact {
  contact: {
    location_id: string;
    first_name: string;
    last_name: string;
    company_name?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    cell_phone?: string;
  };
}

export interface IPayaUpdateContact {
  account_number?: string;
  contact_api_id?: string;
  company_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  home_phone?: string;
  cell_phone?: string;
  office_phone?: string;
  office_ext_phone?: string;
  email_trx_receipt?: boolean;
  date_of_birth?: string;
  header_message?: string;
  header_message_type_id?: number;
  contact_c1?: string;
  contact_c2?: string;
  contact_c3?: string;
  contact_balance?: number;
}

export interface IPayaContactResponse {
  id: string;
  location_id: string;
  account_number?: string;
  contact_api_id?: string;
  company_name?: string;
  first_name: string;
  last_name: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  home_phone?: string;
  cell_phone?: string;
  office_phone?: string;
  office_ext_phone?: string;
  email_trx_receipt: 0 | 1;
  created_ts: number;
  modified_ts: number;
  date_of_birth?: string;
  header_message?: string;
  header_message_type_id: number;
  contact_c1?: string;
  contact_c2?: string;
  contact_c3?: string;
  contact_balance?: number;
  hide_blind_payment?: boolean;
  bill_via_email_enrollment_status?: string;
  text_to_pay_enrollment_status?: string;
  auto_pay: number;
  paperless_billing?: boolean;
}
