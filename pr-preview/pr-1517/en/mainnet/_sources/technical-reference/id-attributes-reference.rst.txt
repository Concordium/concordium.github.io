.. _id-attributes-reference:

========================
ID attributes reference
========================


This page lists all ID attributes available in Concordium Identity Credentials, including their types, attribute tags, and value formats.

There are two types of ID credentials:

- **Individual ID**: For individuals using personal identification documents
- **Company ID**: For companies using corporate documents

.. _individual-id-attributes:

Individual ID attributes
========================

The following table lists all attributes available for Individual IDs.


.. list-table::
   :header-rows: 1
   :widths: 20 15 20 45

   * - Attribute
     - Type
     - Attribute tag
     - Attribute value format
   * - First name
     - Mandatory
     - firstName
     - string
   * - Last name
     - Mandatory
     - lastName
     - string
   * - Date of birth
     - Mandatory
     - dob
     - ISO8601 YYYYMMDD
   * - Identity Document Type
     - Mandatory
     - idDocType
     - na=0, passport=1, national id card=2, driving license=3, immigration card=4 or eID string (see separate table)
   * - Sex
     - Optional
     - sex
     - ISO/IEC 5218
   * - Country of residence
     - Optional
     - countryOfResidence
     - ISO3166-1 alpha-2
   * - Country of nationality
     - Mandatory
     - nationality
     - ISO3166-1 alpha-2
   * - Identity Document number
     - Optional (one of the two)
     - idDocNo
     - string
   * - Identity Document Issuer
     - Optional
     - idDocIssuer
     - ISO3166-1 alpha-2 or ISO3166-2 if applicable
   * - ID Valid from
     - Optional
     - idDocIssuedAt
     - ISO8601 YYYYMMDD
   * - ID Valid to
     - Optional
     - idDocExpiresAt
     - ISO8601 YYYYMMDD
   * - National ID number
     - Optional (one of the two)
     - nationalIdNo
     - string
   * - Tax ID number
     - Optional
     - taxIdNo
     - string

.. _company-id-attributes:

Company ID attributes
=====================

The following table lists all attributes available for Company IDs.

.. list-table::
   :header-rows: 1
   :widths: 20 15 20 45

   * - Attribute
     - Type
     - Attribute tag
     - Attribute value format
   * - Legal Name
     - Mandatory
     - legalName
     - string
   * - Legal Jurisdiction Country
     - Mandatory
     - legalCountry
     - ISO3166-1 alpha-2
   * - Business Number
     - Mandatory
     - businessNumber
     - string
   * - LEI-code
     - Optional
     - lei
     - ISO17442
   * - Registration authority
     - Optional
     - registrationAuth
     - string

.. _document-type-exceptions:

Document type exceptions
========================

The following table lists the eID string values that can be used for the Identity Document Type attribute.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - idDocType eID string
     - Description
   * - DK:MITID
     - Danish MitId
   * - SE:BANKID
     - Swedish BankID
   * - NO:BANKID
     - Norwegian BankID
   * - NO:VIPPS
     - Norwegian Vipps
   * - FI:TRUSTNETWORK
     - Finnish Trust Network
   * - NL:DIGID
     - Netherlands DigiD
   * - NL:IDIN
     - Netherlands iDIN
   * - BE:EID
     - Belgian eID
   * - ITSME
     - (Cross-national) ItsME
   * - SOFORT
     - (Cross-national) Sofort

