/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "fragment ProductDisplayRequestFragment on StoreProductCtrl {\n  productDisplayRequest\n}": types.ProductDisplayRequestFragmentFragmentDoc,
    "fragment RegularEcountProduct on EcountProduct {\n  _id\n  createdAt\n  updatedAt\n  PROD_CD\n  PROD_DES\n  SIZE_FLAG\n  SIZE_DES\n  UNIT\n  PROD_TYPE\n  SET_FLAG\n  BAL_FLAG\n  WH_CD\n  IN_PRICE\n  IN_PRICE_VAT\n  OUT_PRICE\n  OUT_PRICE_VAT\n  REMARKS_WIN\n  CLASS_CD\n  CLASS_CD2\n  CLASS_CD3\n  BAR_CODE\n  VAT_YN\n  TAX\n  VAT_RATE_BY_BASE_YN\n  VAT_RATE_BY\n  CS_FLAG\n  REMARKS\n  INSPECT_TYPE_CD\n  INSPECT_STATUS\n  SAMPLE_PERCENT\n  CSORD_C0001\n  CSORD_TEXT\n  CSORD_C0003\n  IN_TERM\n  MIN_QTY\n  CUST\n  EXCH_RATE\n  DENO_RATE\n  OUT_PRICE1\n  OUT_PRICE1_VAT_YN\n  OUT_PRICE2\n  OUT_PRICE2_VAT_YN\n  OUT_PRICE3\n  OUT_PRICE3_VAT_YN\n  OUT_PRICE4\n  OUT_PRICE4_VAT_YN\n  OUT_PRICE5\n  OUT_PRICE5_VAT_YN\n  OUT_PRICE6\n  OUT_PRICE6_VAT_YN\n  OUT_PRICE7\n  OUT_PRICE7_VAT_YN\n  OUT_PRICE8\n  OUT_PRICE8_VAT_YN\n  OUT_PRICE9\n  OUT_PRICE9_VAT_YN\n  OUT_PRICE10\n  OUT_PRICE10_VAT_YN\n  OUTSIDE_PRICE\n  OUTSIDE_PRICE_VAT\n  LABOR_WEIGHT\n  EXPENSES_WEIGHT\n  MATERIAL_COST\n  EXPENSE_COST\n  LABOR_COST\n  OUT_COST\n  CONT1\n  CONT2\n  CONT3\n  CONT4\n  CONT5\n  CONT6\n  NO_USER1\n  NO_USER2\n  NO_USER3\n  NO_USER4\n  NO_USER5\n  NO_USER6\n  NO_USER7\n  NO_USER8\n  NO_USER9\n  NO_USER10\n  ITEM_TYPE\n  SERIAL_TYPE\n  PROD_SELL_TYPE\n  PROD_WHMOVE_TYPE\n  QC_BUY_TYPE\n  QC_YN\n}": types.RegularEcountProductFragmentDoc,
    "fragment RegularError on FieldError {\n  field\n  message\n}": types.RegularErrorFragmentDoc,
    "fragment RegularLoginResponse on LoginResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}": types.RegularLoginResponseFragmentDoc,
    "fragment RegularStockItem on StockItem {\n  _id\n  isPicking\n  isSorting\n  isDeleted\n  timestamp\n  warehousingDate\n  expirationDate\n  qrcode\n  warehousingDate\n  expirationDate\n  palletCode\n  enterQuantity\n  quantity\n  replenishment\n  quantityOfEach\n  ecountProductCode\n  name\n  description\n  rackLocation\n  ecountProduct {\n    PROD_CD\n    PROD_DES\n    SIZE_DES\n    UNIT\n  }\n  name\n  description\n  recorder {\n    _id\n    username\n  }\n  rackId\n}": types.RegularStockItemFragmentDoc,
    "fragment RegularUser on User {\n  _id\n  username\n  email\n  _email\n  nickname\n  position\n  roles\n  thumbnail\n}": types.RegularUserFragmentDoc,
    "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}": types.RegularUserResponseFragmentDoc,
    "query Me {\n  me {\n    ...RegularUser\n  }\n}": types.MeDocument,
    "mutation EcountProductAllUpsert {\n  ecountProductAllUpsert\n}": types.EcountProductAllUpsertDocument,
    "query WarehouseBoard {\n  warehouseBoard {\n    warehouseBoxSize\n    warehouseEASize\n    inventoryPackSize\n    inventoryBOXSize\n    inventoryKg\n    inventoryEAs {\n      productCode\n      productDescript\n      size\n    }\n  }\n}": types.WarehouseBoardDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductDisplayRequestFragment on StoreProductCtrl {\n  productDisplayRequest\n}"): (typeof documents)["fragment ProductDisplayRequestFragment on StoreProductCtrl {\n  productDisplayRequest\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RegularEcountProduct on EcountProduct {\n  _id\n  createdAt\n  updatedAt\n  PROD_CD\n  PROD_DES\n  SIZE_FLAG\n  SIZE_DES\n  UNIT\n  PROD_TYPE\n  SET_FLAG\n  BAL_FLAG\n  WH_CD\n  IN_PRICE\n  IN_PRICE_VAT\n  OUT_PRICE\n  OUT_PRICE_VAT\n  REMARKS_WIN\n  CLASS_CD\n  CLASS_CD2\n  CLASS_CD3\n  BAR_CODE\n  VAT_YN\n  TAX\n  VAT_RATE_BY_BASE_YN\n  VAT_RATE_BY\n  CS_FLAG\n  REMARKS\n  INSPECT_TYPE_CD\n  INSPECT_STATUS\n  SAMPLE_PERCENT\n  CSORD_C0001\n  CSORD_TEXT\n  CSORD_C0003\n  IN_TERM\n  MIN_QTY\n  CUST\n  EXCH_RATE\n  DENO_RATE\n  OUT_PRICE1\n  OUT_PRICE1_VAT_YN\n  OUT_PRICE2\n  OUT_PRICE2_VAT_YN\n  OUT_PRICE3\n  OUT_PRICE3_VAT_YN\n  OUT_PRICE4\n  OUT_PRICE4_VAT_YN\n  OUT_PRICE5\n  OUT_PRICE5_VAT_YN\n  OUT_PRICE6\n  OUT_PRICE6_VAT_YN\n  OUT_PRICE7\n  OUT_PRICE7_VAT_YN\n  OUT_PRICE8\n  OUT_PRICE8_VAT_YN\n  OUT_PRICE9\n  OUT_PRICE9_VAT_YN\n  OUT_PRICE10\n  OUT_PRICE10_VAT_YN\n  OUTSIDE_PRICE\n  OUTSIDE_PRICE_VAT\n  LABOR_WEIGHT\n  EXPENSES_WEIGHT\n  MATERIAL_COST\n  EXPENSE_COST\n  LABOR_COST\n  OUT_COST\n  CONT1\n  CONT2\n  CONT3\n  CONT4\n  CONT5\n  CONT6\n  NO_USER1\n  NO_USER2\n  NO_USER3\n  NO_USER4\n  NO_USER5\n  NO_USER6\n  NO_USER7\n  NO_USER8\n  NO_USER9\n  NO_USER10\n  ITEM_TYPE\n  SERIAL_TYPE\n  PROD_SELL_TYPE\n  PROD_WHMOVE_TYPE\n  QC_BUY_TYPE\n  QC_YN\n}"): (typeof documents)["fragment RegularEcountProduct on EcountProduct {\n  _id\n  createdAt\n  updatedAt\n  PROD_CD\n  PROD_DES\n  SIZE_FLAG\n  SIZE_DES\n  UNIT\n  PROD_TYPE\n  SET_FLAG\n  BAL_FLAG\n  WH_CD\n  IN_PRICE\n  IN_PRICE_VAT\n  OUT_PRICE\n  OUT_PRICE_VAT\n  REMARKS_WIN\n  CLASS_CD\n  CLASS_CD2\n  CLASS_CD3\n  BAR_CODE\n  VAT_YN\n  TAX\n  VAT_RATE_BY_BASE_YN\n  VAT_RATE_BY\n  CS_FLAG\n  REMARKS\n  INSPECT_TYPE_CD\n  INSPECT_STATUS\n  SAMPLE_PERCENT\n  CSORD_C0001\n  CSORD_TEXT\n  CSORD_C0003\n  IN_TERM\n  MIN_QTY\n  CUST\n  EXCH_RATE\n  DENO_RATE\n  OUT_PRICE1\n  OUT_PRICE1_VAT_YN\n  OUT_PRICE2\n  OUT_PRICE2_VAT_YN\n  OUT_PRICE3\n  OUT_PRICE3_VAT_YN\n  OUT_PRICE4\n  OUT_PRICE4_VAT_YN\n  OUT_PRICE5\n  OUT_PRICE5_VAT_YN\n  OUT_PRICE6\n  OUT_PRICE6_VAT_YN\n  OUT_PRICE7\n  OUT_PRICE7_VAT_YN\n  OUT_PRICE8\n  OUT_PRICE8_VAT_YN\n  OUT_PRICE9\n  OUT_PRICE9_VAT_YN\n  OUT_PRICE10\n  OUT_PRICE10_VAT_YN\n  OUTSIDE_PRICE\n  OUTSIDE_PRICE_VAT\n  LABOR_WEIGHT\n  EXPENSES_WEIGHT\n  MATERIAL_COST\n  EXPENSE_COST\n  LABOR_COST\n  OUT_COST\n  CONT1\n  CONT2\n  CONT3\n  CONT4\n  CONT5\n  CONT6\n  NO_USER1\n  NO_USER2\n  NO_USER3\n  NO_USER4\n  NO_USER5\n  NO_USER6\n  NO_USER7\n  NO_USER8\n  NO_USER9\n  NO_USER10\n  ITEM_TYPE\n  SERIAL_TYPE\n  PROD_SELL_TYPE\n  PROD_WHMOVE_TYPE\n  QC_BUY_TYPE\n  QC_YN\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RegularError on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment RegularError on FieldError {\n  field\n  message\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RegularLoginResponse on LoginResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"): (typeof documents)["fragment RegularLoginResponse on LoginResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RegularStockItem on StockItem {\n  _id\n  isPicking\n  isSorting\n  isDeleted\n  timestamp\n  warehousingDate\n  expirationDate\n  qrcode\n  warehousingDate\n  expirationDate\n  palletCode\n  enterQuantity\n  quantity\n  replenishment\n  quantityOfEach\n  ecountProductCode\n  name\n  description\n  rackLocation\n  ecountProduct {\n    PROD_CD\n    PROD_DES\n    SIZE_DES\n    UNIT\n  }\n  name\n  description\n  recorder {\n    _id\n    username\n  }\n  rackId\n}"): (typeof documents)["fragment RegularStockItem on StockItem {\n  _id\n  isPicking\n  isSorting\n  isDeleted\n  timestamp\n  warehousingDate\n  expirationDate\n  qrcode\n  warehousingDate\n  expirationDate\n  palletCode\n  enterQuantity\n  quantity\n  replenishment\n  quantityOfEach\n  ecountProductCode\n  name\n  description\n  rackLocation\n  ecountProduct {\n    PROD_CD\n    PROD_DES\n    SIZE_DES\n    UNIT\n  }\n  name\n  description\n  recorder {\n    _id\n    username\n  }\n  rackId\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RegularUser on User {\n  _id\n  username\n  email\n  _email\n  nickname\n  position\n  roles\n  thumbnail\n}"): (typeof documents)["fragment RegularUser on User {\n  _id\n  username\n  email\n  _email\n  nickname\n  position\n  roles\n  thumbnail\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"): (typeof documents)["fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Me {\n  me {\n    ...RegularUser\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...RegularUser\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation EcountProductAllUpsert {\n  ecountProductAllUpsert\n}"): (typeof documents)["mutation EcountProductAllUpsert {\n  ecountProductAllUpsert\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query WarehouseBoard {\n  warehouseBoard {\n    warehouseBoxSize\n    warehouseEASize\n    inventoryPackSize\n    inventoryBOXSize\n    inventoryKg\n    inventoryEAs {\n      productCode\n      productDescript\n      size\n    }\n  }\n}"): (typeof documents)["query WarehouseBoard {\n  warehouseBoard {\n    warehouseBoxSize\n    warehouseEASize\n    inventoryPackSize\n    inventoryBOXSize\n    inventoryKg\n    inventoryEAs {\n      productCode\n      productDescript\n      size\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;