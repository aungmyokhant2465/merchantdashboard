import { gql } from '@apollo/client'

export const PROFILE = gql`
  query MyQuery($id: Int!) {
    merchant_accounts(where: { id: { _eq: $id } }) {
      full_name
      username
      merchant_banner_url
      merchant_site_url
    }
  }
`

export const CREATEQR = gql`
  mutation MyMutation ($amount: Int, $note: String) {
    insert_merchant_loyalty_qr_codes(objects: {request_point_amount: $amount, note: $note}) {
      affected_rows
    }
  }
`

export const QRCODES = gql`
  query MyQuery ($id: Int) {
    merchant_loyalty_qr_codes(where: {fk_merchant_id: {_eq: $id}}) {
        active
        created_at
        fk_merchant_id
        id
        note
        request_point_amount
    }
  }
`

// export const QRCODES = gql`
//   query MyQuery {
//       merchant_loyalty_qr_codes {
//           active
//           created_at
//           fk_merchant_id
//           id
//           note
//           request_point_amount
//       }
//   }
// `

export const TRANSCATIONHISTORT = gql`
  query MyQuery ($id: Int) {
    loyalty_point_history(where: {fk_merchant_id: {_eq: $id}}) {
        fk_passenger_id
        point_amount
        created_at
    }
  }
`

// export const TRANSCATIONHISTORT = gql`
//   query MyQuery {
//       loyalty_point_history {
//           fk_passenger_id
//           point_amount
//           created_at
//       }
//   }
// `