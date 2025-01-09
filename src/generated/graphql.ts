import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddMemberInput = {
  email: Scalars['String']['input'];
  roles: Array<Scalars['String']['input']>;
};

export type AddTotalOrderType = {
  deliveryDate: Scalars['String']['input'];
  orderMessage: Scalars['String']['input'];
  orderNumber: Scalars['String']['input'];
};

export type AddTotalOrdersInput = {
  totalOrderInputs: Array<AddTotalOrderType>;
};

export type AddTotalOrdersRespones = {
  error: Maybe<FatchError>;
  result: Maybe<Array<Scalars['String']['output']>>;
};

export type Address = {
  _id: Scalars['ID']['output'];
  addressLine1: Scalars['String']['output'];
  addressLine2: Maybe<Scalars['String']['output']>;
  addressType: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customField1: Maybe<Scalars['String']['output']>;
  customField2: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  fullAddress: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  latitude: Maybe<Scalars['Float']['output']>;
  longitude: Maybe<Scalars['Float']['output']>;
  postalCode: Scalars['String']['output'];
  stateProvince: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type AddressInput = {
  addressLine1: InputMaybe<Scalars['String']['input']>;
  addressLine2: InputMaybe<Scalars['String']['input']>;
  addressType: InputMaybe<Scalars['String']['input']>;
  city: InputMaybe<Scalars['String']['input']>;
  contactId: InputMaybe<Scalars['String']['input']>;
  country: InputMaybe<Scalars['String']['input']>;
  customField1: InputMaybe<Scalars['String']['input']>;
  customField2: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  latitude: InputMaybe<Scalars['Float']['input']>;
  longitude: InputMaybe<Scalars['Float']['input']>;
  postalCode: InputMaybe<Scalars['String']['input']>;
  stateProvince: InputMaybe<Scalars['String']['input']>;
};

export type AddressKr = {
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  fullAddress: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  zipcode: Maybe<Scalars['String']['output']>;
};

export type BaljugoCustomer = {
  /** [오더코드:품목코드] */
  added: Maybe<Array<Scalars['String']['output']>>;
  /** [오더코드:품목코드] */
  canceled: Maybe<Array<Scalars['String']['output']>>;
  customerAmount: Maybe<Scalars['Float']['output']>;
  customerCode: Maybe<Scalars['String']['output']>;
  customerName: Maybe<Scalars['String']['output']>;
  destinationLocation: Maybe<Scalars['String']['output']>;
  dispatchDate: Maybe<Scalars['String']['output']>;
  /** [오더코드:품목코드] */
  modified: Maybe<Array<Scalars['String']['output']>>;
  nickName: Maybe<Scalars['String']['output']>;
  orderDate: Maybe<Scalars['String']['output']>;
  published: Maybe<Scalars['Float']['output']>;
  quantity: Maybe<Scalars['Float']['output']>;
  totalAmount: Maybe<Scalars['Float']['output']>;
};

export type BaljugoCustomerOrderInput = {
  /** 주문점 코드 */
  customerCode: Scalars['String']['input'];
  /** 배송요청위치 */
  destinationLocation: InputMaybe<Scalars['String']['input']>;
};

export type BaljugoOrderCustomerRespones = {
  customerOrders: Maybe<Array<BaljugoProductOrder>>;
  error: Maybe<FatchError>;
};

export type BaljugoOrderCustomersHistoryInput = {
  /** YYYYMMDD */
  dispatchDate: InputMaybe<Scalars['String']['input']>;
};

export type BaljugoOrderCustomersRespones = {
  baljugoCustomers: Maybe<Array<BaljugoCustomer>>;
  customerOrders: Maybe<Array<CustomerOrders>>;
  dailyOrders: Maybe<Array<DailyOrder>>;
  error: Maybe<FatchError>;
};

export type BaljugoProductOrder = {
  _id: Scalars['ID']['output'];
  baljugoProductDES: Maybe<Scalars['String']['output']>;
  /** 취소 ex) 주문번호:품목코드:개별번호 */
  cancelLabels: Maybe<Array<Scalars['String']['output']>>;
  customerCode: Maybe<Scalars['String']['output']>;
  customerName: Maybe<Scalars['String']['output']>;
  deliveryRequestDate: Maybe<Scalars['String']['output']>;
  destinationLocation: Maybe<Scalars['String']['output']>;
  dispatchDate: Maybe<Scalars['String']['output']>;
  dispatchedDate: Maybe<Scalars['String']['output']>;
  dispatchedSize: Maybe<Scalars['Float']['output']>;
  ecountProductDES: Maybe<Scalars['String']['output']>;
  /** 주문 수정 */
  isModify: Maybe<Scalars['Boolean']['output']>;
  /** 품목위치 */
  location: Maybe<Scalars['String']['output']>;
  nickName: Maybe<Scalars['String']['output']>;
  orderCode: Maybe<Scalars['String']['output']>;
  /** 발주확인후 진행 데이터 가져오는 키값 */
  orderConfirmDate: Maybe<Scalars['String']['output']>;
  orderDate: Maybe<Scalars['String']['output']>;
  /** 추가 주문 */
  orderVersion: Maybe<Scalars['Float']['output']>;
  /** 발행 ex) 주문번호:품목코드:개별번호+출력된수 */
  printedLabels: Maybe<Array<Scalars['String']['output']>>;
  productCode: Maybe<Scalars['String']['output']>;
  productName: Maybe<Scalars['String']['output']>;
  productOrderStatus: Maybe<FcProductOrderStatus>;
  quantity: Maybe<Scalars['Float']['output']>;
  returnDate: Maybe<Scalars['String']['output']>;
  returnSize: Maybe<Scalars['Float']['output']>;
  /** 규격 */
  sizeDES: Maybe<Scalars['String']['output']>;
  /** 보관방식 */
  storageMethod: Maybe<Scalars['String']['output']>;
  totalAmount: Maybe<Scalars['Float']['output']>;
  /** 단위 */
  unit: Maybe<Scalars['String']['output']>;
  warehouseProductDES: Maybe<Scalars['String']['output']>;
};

export type Box = {
  _id: Scalars['ID']['output'];
  boxCost: Maybe<Scalars['Float']['output']>;
  boxName: Maybe<Scalars['String']['output']>;
  boxType: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
};

/** The Date model */
export type CalendarDate = {
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Maybe<Scalars['DateTime']['output']>;
  /** 예정일 */
  dueDate: Maybe<Scalars['DateTime']['output']>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  /** 최종일 */
  finalDate: Maybe<Scalars['DateTime']['output']>;
  job: Maybe<IndustryType>;
  /** 장소 */
  location: Maybe<Scalars['String']['output']>;
  /** 메모 */
  memo: Maybe<Scalars['String']['output']>;
  modelId: Maybe<Scalars['String']['output']>;
  owner: Maybe<Scalars['ID']['output']>;
  state: Maybe<Scalars['Float']['output']>;
  /** 목표일 */
  targetDate: Maybe<Scalars['DateTime']['output']>;
  /** 제목 */
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Cancel = {
  /** 취소 승인일 */
  cancelApprovalDate: Maybe<Scalars['String']['output']>;
  /** 취소 완료일 */
  cancelCompletedDate: Maybe<Scalars['String']['output']>;
  /** 취소 상세 사유 */
  cancelDetailedReason: Maybe<Scalars['String']['output']>;
  /** 클레임 요청 사유 */
  cancelReason: Maybe<Scalars['String']['output']>;
  /** 클레임 요청일 */
  claimRequestDate: Maybe<Scalars['String']['output']>;
  /** ClaimStatus 클레임 상태 */
  claimStatus: Maybe<Scalars['String']['output']>;
  /** 환불 예정일 */
  refundExpectedDate: Maybe<Scalars['String']['output']>;
  /** 환불 대기 사유 */
  refundStandbyReason: Maybe<Scalars['String']['output']>;
  /** 환불 대기 상태 */
  refundStandbyStatus: Maybe<Scalars['String']['output']>;
  /** 접수 채널 */
  requestChannel: Maybe<Scalars['String']['output']>;
};

export type CenterProductOrdersRespone = {
  ProductOrderStatusTracker: Maybe<NaverProductOrder>;
  cancel: Maybe<Cancel>;
  defaultPackageBox: Maybe<Box>;
  delivery: Maybe<Delivery>;
  exchange: Maybe<Exchange>;
  inventory: Maybe<Scalars['Float']['output']>;
  order: Maybe<Order>;
  pickOrder: Maybe<Picking>;
  productOrder: Maybe<ProductOrder>;
  return: Maybe<Return>;
  savedEcountProduct: Maybe<EcountProduct>;
};

export type CenterProuductStatus = {
  ecountProduct: Maybe<EcountProduct>;
  inventory: Maybe<EcountInventory>;
  naverProduct: Maybe<Content>;
  packingCost: Maybe<PackingCost>;
  storeProductCtrl: Maybe<StoreProductCtrl>;
};

export type CenterProuductStatusResponse = {
  centerProuducts: Maybe<Array<CenterProuductStatus>>;
  errors: Maybe<Array<FatchError>>;
  missingEcountProducts: Maybe<Array<ChannelProduct>>;
};

export type CenterSale = {
  /** 패킹 박스 */
  box: Maybe<Box>;
  /** 고객배송료 */
  deliveryFee: Maybe<Scalars['Float']['output']>;
  /** ecountSale */
  ecountSale: Maybe<EcountSale>;
  /** 이카운트 판매입력상태 */
  existEcountNaverSaleDate: Maybe<Scalars['Float']['output']>;
  /** 패킹 박스 */
  isBox: Scalars['Boolean']['output'];
  /** 고객배송료 */
  isDeliveryFee: Scalars['Boolean']['output'];
  /** 네이버오더 */
  isNaverProductOrder: Scalars['Boolean']['output'];
  /** 배송료 */
  isSavedDeliveryFee: Scalars['Boolean']['output'];
  /** 네이버오더 */
  naverProductOrder: Maybe<NaverProductOrderData>;
  /** 배송료 */
  savedDeliveryFee: Maybe<SavedDeliveryFeeRespones>;
};

export type ChangePackageBoxInput = {
  boxId: Scalars['String']['input'];
  packageBoxId: Scalars['String']['input'];
};

export type ChannelProduct = {
  /** 카테고리 ID */
  categoryId: Scalars['String']['output'];
  /** 채널 상품 전시 상태 */
  channelProductDisplayStatusType: Scalars['String']['output'];
  /** 채널 상품번호 */
  channelProductNo: Scalars['String']['output'];
  /** 채널 서비스 타입 */
  channelServiceType: Scalars['String']['output'];
  /** 배송 속성 */
  deliveryAttributeType: Scalars['String']['output'];
  /** 기본 배송비 */
  deliveryFee: Maybe<Scalars['Int']['output']>;
  /** 할인가 */
  discountedPrice: Maybe<Scalars['Int']['output']>;
  /** 교환 배송비 */
  exchangeFee: Maybe<Scalars['Int']['output']>;
  /** 무이자 할부 */
  freeInterest: Maybe<Scalars['Int']['output']>;
  /** 사은품 */
  gift: Maybe<Scalars['String']['output']>;
  /** 네이버쇼핑 등록 */
  knowledgeShoppingProductRegistration: Scalars['Boolean']['output'];
  /** 상품 구매 포인트(관리자) */
  managerPurchasePoint: Maybe<Scalars['Int']['output']>;
  /** 상품 수정일 */
  modifiedDate: Scalars['String']['output'];
  /** 복수 구매 할인 */
  multiPurchaseDiscount: Maybe<Scalars['Int']['output']>;
  /** 복수 구매 할인 단위 */
  multiPurchaseDiscountUnitType: Maybe<Scalars['String']['output']>;
  /** 상품명 */
  name: Scalars['String']['output'];
  /** 원상품번호 */
  originProductNo: Scalars['String']['output'];
  /** 포토/동영상 리뷰 포인트 */
  photoVideoReviewPoint: Maybe<Scalars['Int']['output']>;
  /** 상품 등록일 */
  regDate: Scalars['String']['output'];
  /** 구매평 작성 시 포인트(알림받기) */
  regularCustomerPoint: Maybe<Scalars['Int']['output']>;
  /** 반품 배송비 */
  returnFee: Maybe<Scalars['Int']['output']>;
  /** 판매 종료 일시 */
  saleEndDate: Maybe<Scalars['String']['output']>;
  /** 판매가 */
  salePrice: Scalars['Int']['output'];
  /** 판매 시작 일시 */
  saleStartDate: Maybe<Scalars['String']['output']>;
  /** 판매자 관리 코드 */
  sellerManagementCode: Scalars['String']['output'];
  /** 상품 구매 포인트(판매자) */
  sellerPurchasePoint: Maybe<Scalars['Int']['output']>;
  /** 상품 구매 포인트(판매자) 할인 단위 */
  sellerPurchasePointUnitType: Maybe<Scalars['String']['output']>;
  /** 상품 판매 상태 코드 */
  statusType: StoreStatus;
  /** 재고 수량 */
  stockQuantity: Maybe<Scalars['Int']['output']>;
  /** 텍스트 리뷰 포인트 */
  textReviewPoint: Maybe<Scalars['Int']['output']>;
};

export type CollectAddress = {
  /** 배송지 타입. 250바이트 내외 */
  addressType: Maybe<Scalars['String']['output']>;
  /** 기본 주소. 300바이트 내외 */
  baseAddress: Maybe<Scalars['String']['output']>;
  /** 도시. 국내 주소에는 빈 문자열("")을 입력합니다. 300바이트 내외 */
  city: Maybe<Scalars['String']['output']>;
  /** 국가. 45바이트 내외 */
  country: Maybe<Scalars['String']['output']>;
  /** 상세 주소. 300바이트 내외 */
  detailedAddress: Maybe<Scalars['String']['output']>;
  /** 도로명 주소 여부. 8바이트 내외 */
  isRoadNameAddress: Maybe<Scalars['Boolean']['output']>;
  /** 이름. 150바이트 내외 */
  name: Maybe<Scalars['String']['output']>;
  /** 주(state). 국내 주소에는 빈 문자열("")을 입력합니다. 300바이트 내외 */
  state: Maybe<Scalars['String']['output']>;
  /** 연락처 1. 45바이트 내외 */
  tel1: Maybe<Scalars['String']['output']>;
  /** 연락처 2. 45바이트 내외 */
  tel2: Maybe<Scalars['String']['output']>;
  /** 우편번호. 45바이트 내외 */
  zipCode: Maybe<Scalars['String']['output']>;
};

export type Company = {
  /** 종목 */
  JONGMOK: Maybe<Scalars['String']['output']>;
  /** 업태 */
  UPTAE: Maybe<Scalars['String']['output']>;
  _id: Maybe<Scalars['ID']['output']>;
  addressKrs: Maybe<Array<AddressKr>>;
  addresses: Maybe<Array<Address>>;
  /** 사업자등록번호 */
  businesbRegistration: Maybe<Scalars['String']['output']>;
  ceo: Maybe<Scalars['String']['output']>;
  companyFoundingDate: Scalars['DateTime']['output'];
  companyName: Maybe<Scalars['String']['output']>;
  companySet: Maybe<Scalars['JSON']['output']>;
  contacts: Maybe<Array<Contact>>;
  cpo: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  emails: Maybe<Array<Email>>;
  faxes: Maybe<Array<Phone>>;
  isExternalData: Maybe<Scalars['Boolean']['output']>;
  logo: Maybe<Scalars['String']['output']>;
  /** 국적 */
  nationality: Maybe<Scalars['String']['output']>;
  ownerIds: Maybe<Array<Scalars['String']['output']>>;
  phones: Maybe<Array<Phone>>;
  /** 역활 */
  role: Maybe<Scalars['String']['output']>;
  /** 회사 운영 종목 */
  sectors: Maybe<Scalars['String']['output']>;
  thumbnail: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CompanyResponse = {
  company: Maybe<Company>;
  errors: Maybe<FatchError>;
};

export type ComponySearchType = {
  _id: Scalars['String']['output'];
  companyName: Maybe<Scalars['String']['output']>;
};

export type ConfirmsInput = {
  productOrderIds: Array<Scalars['String']['input']>;
};

export type Contact = {
  _id: Scalars['ID']['output'];
  addressKrs: Maybe<Array<AddressKr>>;
  addresses: Maybe<Array<Address>>;
  createdAt: Scalars['DateTime']['output'];
  emails: Maybe<Array<Email>>;
  /** 메모 */
  memo: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  /** 별칭 */
  nickName: Maybe<Scalars['String']['output']>;
  phones: Maybe<Array<Phone>>;
  /** 직급 */
  position: Maybe<Scalars['String']['output']>;
  thumbnail: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  websites: Maybe<Array<Website>>;
};

export type Content = {
  /** 채널 상품 목록 */
  channelProducts: Maybe<Array<ChannelProduct>>;
  createdAt: Scalars['DateTime']['output'];
  /** 원상품번호 */
  originProductNo: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCalendarDateResponse = {
  error: Maybe<FatchError>;
  event: Maybe<CalendarDate>;
};

export type CreateCalendarDatesInput = {
  end: InputMaybe<Scalars['DateTime']['input']>;
  job: Scalars['String']['input'];
  start: InputMaybe<Scalars['DateTime']['input']>;
  state: InputMaybe<Scalars['Float']['input']>;
};

export type CreateContactInput = {
  addresses: InputMaybe<Array<AddressInput>>;
  emails: InputMaybe<Array<EmailInput>>;
  memo: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  nickName: InputMaybe<Scalars['String']['input']>;
  phones: InputMaybe<Array<PhoneInput>>;
  position: InputMaybe<Scalars['String']['input']>;
  thumbnail: InputMaybe<Scalars['String']['input']>;
  websites: InputMaybe<Array<WebsiteInput>>;
};

export type CreateContactResponse = {
  contact: Maybe<Contact>;
  errors: Maybe<Array<FatchError>>;
};

export type CreateImportItemResponse = {
  errors: Maybe<Array<FatchError>>;
  importOrder: Maybe<ImportOrder>;
};

export type CreateTodoInput = {
  assignedTo: InputMaybe<Array<Scalars['String']['input']>>;
  description: InputMaybe<Scalars['String']['input']>;
  dueDate: InputMaybe<Scalars['DateTime']['input']>;
  /** 관련 항목의 ID */
  modelItemId: InputMaybe<Scalars['String']['input']>;
  modelName: InputMaybe<TodoQueryNameType>;
  priority: InputMaybe<Priority>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateTodoResponse = {
  error: Maybe<FatchError>;
  todo: Maybe<Todo>;
};

/** Available currencies for import orders */
export enum CurrencyType {
  Eur = 'EUR',
  Usd = 'USD'
}

export type CustomerOrders = {
  customerCode: Maybe<Scalars['String']['output']>;
  orders: Maybe<Array<BaljugoProductOrder>>;
};

export type DailyOrder = {
  /** 취소 ex) 주문번호:품목코드:개별번호 */
  cancelLabels: Maybe<Array<Scalars['String']['output']>>;
  code: Maybe<Scalars['String']['output']>;
  inventory: Maybe<Scalars['Float']['output']>;
  location: Maybe<Scalars['String']['output']>;
  /** 발행 ex) 주문번호:품목코드:개별번호+출력된수 */
  printedLabels: Maybe<Array<Scalars['String']['output']>>;
  productDES: Maybe<Scalars['String']['output']>;
  size: Maybe<Scalars['Float']['output']>;
  unit: Maybe<Scalars['String']['output']>;
};

export type DeleteCompanyContactInput = {
  companyId: Scalars['String']['input'];
  id: InputMaybe<Scalars['String']['input']>;
};

export type DeleteContactEmailInput = {
  contactId: Scalars['String']['input'];
  emailId: Scalars['String']['input'];
};

export type DeleteContactPhoneInput = {
  contactId: Scalars['String']['input'];
  phoneId: Scalars['String']['input'];
};

export type DeleteImportTodoInput = {
  /** 관련 항목의 ID */
  modelItemId: InputMaybe<Scalars['String']['input']>;
  modelName: InputMaybe<TodoQueryNameType>;
  todoId: InputMaybe<Scalars['String']['input']>;
};

export type Delivery = {
  /** 배송 완료 일시. 45바이트 내외 */
  deliveredDate: Maybe<Scalars['String']['output']>;
  /** 택배사 코드. 250바이트 내외 */
  deliveryCompany: Maybe<Scalars['String']['output']>;
  /** 배송 방법 코드. 250바이트 내외 */
  deliveryMethod: Maybe<Scalars['String']['output']>;
  /** 배송 상세 상태. 250바이트 내외 */
  deliveryStatus: Maybe<Scalars['String']['output']>;
  /** 오류 송장 여부. true는 송장에 오류가 있음을 의미합니다. 8바이트 내외 */
  isWrongTrackingNumber: Maybe<Scalars['Boolean']['output']>;
  /** 집화 일시. 45바이트 내외 */
  pickupDate: Maybe<Scalars['String']['output']>;
  /** 발송 일시. 45바이트 내외 */
  sendDate: Maybe<Scalars['String']['output']>;
  /** 송장 번호. 100바이트 내외 */
  trackingNumber: Maybe<Scalars['String']['output']>;
  /** 오류 송장 등록 일시. 45바이트 내외 */
  wrongTrackingNumberRegisteredDate: Maybe<Scalars['String']['output']>;
  /** 오류 사유. 300바이트 내외 */
  wrongTrackingNumberType: Maybe<Scalars['String']['output']>;
};

export type DeliveryKgbInput = {
  trackingNumbers: Array<Scalars['String']['input']>;
};

/** 배송 방법 코드 */
export enum DeliveryMethod {
  Delivery = 'DELIVERY',
  DirectDelivery = 'DIRECT_DELIVERY',
  GdfwIssueSvc = 'GDFW_ISSUE_SVC',
  Nothing = 'NOTHING',
  QuickSvc = 'QUICK_SVC',
  ReturnDelivery = 'RETURN_DELIVERY',
  ReturnDesignated = 'RETURN_DESIGNATED',
  ReturnIndividual = 'RETURN_INDIVIDUAL',
  ReturnMerchant = 'RETURN_MERCHANT',
  Unknown = 'UNKNOWN',
  VisitReceipt = 'VISIT_RECEIPT'
}

export type DeliveryPriceTag = {
  _id: Scalars['ID']['output'];
  boxId: Maybe<Box>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  /** 유효기간 종료일 */
  endPriceDate: Maybe<Scalars['DateTime']['output']>;
  logiCompany: Scalars['String']['output'];
  price: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DeliveryPriceTagResponse = {
  deliveryPriceTag: Maybe<DeliveryPriceTag>;
  errors: Maybe<Array<FatchError>>;
};

export type DeliveryPriceTagsResponse = {
  deliveryPriceTags: Maybe<Array<DeliveryPriceTag>>;
  errors: Maybe<Array<FatchError>>;
};

export type DispatchProductOrderInput = {
  deliveryCompanyCode: Scalars['String']['input'];
  deliveryMethod: DeliveryMethod;
  dispatchDate: Scalars['String']['input'];
  productOrderId: Scalars['String']['input'];
  trackingNumber: Scalars['String']['input'];
};

export type DispatchsInput = {
  dispatchs: Array<DispatchProductOrderInput>;
};

export type EcountInventory = {
  /** 재고수량 */
  BAL_QTY: Maybe<Scalars['String']['output']>;
  PROD_CD: Maybe<Scalars['String']['output']>;
  /** 품목명 */
  PROD_DES: Maybe<Scalars['String']['output']>;
  /** 품목명[규격] */
  PROD_SIZE_DES: Maybe<Scalars['String']['output']>;
  /** 단위 */
  UNIT: Maybe<Scalars['String']['output']>;
  WH_CD: Maybe<Scalars['String']['output']>;
  /** 창고명 */
  WH_DES: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EcountInventoryStatusLocation = {
  BAL_QTY: Maybe<Scalars['String']['output']>;
  PROD_CD: Maybe<Scalars['String']['output']>;
  PROD_DES: Maybe<Scalars['String']['output']>;
  PROD_SIZE_DES: Maybe<Scalars['String']['output']>;
  WH_CD: Maybe<Scalars['String']['output']>;
  WH_DES: Maybe<Scalars['String']['output']>;
};

export type EcountInventoryStatusLocationInput = {
  date: InputMaybe<Scalars['String']['input']>;
};

export type EcountInventoryStatusLocationResponse = {
  datas: Maybe<Array<EcountInventoryStatusLocation>>;
  error: Maybe<FatchError>;
};

export type EcountProduct = {
  /** 재고수량관리 */
  BAL_FLAG: Maybe<Scalars['String']['output']>;
  /** 바코드 */
  BAR_CODE: Maybe<Scalars['String']['output']>;
  /** 그룹코드 */
  CLASS_CD: Maybe<Scalars['String']['output']>;
  /** 그룹코드2 */
  CLASS_CD2: Maybe<Scalars['String']['output']>;
  /** 그룹코드3 */
  CLASS_CD3: Maybe<Scalars['String']['output']>;
  /** 문자형추가항목1 */
  CONT1: Maybe<Scalars['String']['output']>;
  /** 문자형추가항목2 */
  CONT2: Maybe<Scalars['String']['output']>;
  /** 문자형추가항목3 */
  CONT3: Maybe<Scalars['String']['output']>;
  /** 문자형추가항목4 */
  CONT4: Maybe<Scalars['String']['output']>;
  /** 문자형추가항목5 */
  CONT5: Maybe<Scalars['String']['output']>;
  /** 문자형추가항목6 */
  CONT6: Maybe<Scalars['String']['output']>;
  /** C-Portal최소주문수량체크 */
  CSORD_C0001: Maybe<Scalars['String']['output']>;
  /** C-Portal최소주문단위 */
  CSORD_C0003: Maybe<Scalars['String']['output']>;
  /** C-Portal최소주문수량 */
  CSORD_TEXT: Maybe<Scalars['Float']['output']>;
  /** C-Portal사용여부 */
  CS_FLAG: Maybe<Scalars['String']['output']>;
  /** 구매처 */
  CUST: Maybe<Scalars['String']['output']>;
  /** 당수량(분모) */
  DENO_RATE: Maybe<Scalars['String']['output']>;
  /** 당수량(분자) */
  EXCH_RATE: Maybe<Scalars['String']['output']>;
  /** 경비가중치 */
  EXPENSES_WEIGHT: Maybe<Scalars['Float']['output']>;
  /** 경비표준원가 */
  EXPENSE_COST: Maybe<Scalars['Float']['output']>;
  /** 품질검사방법 */
  INSPECT_STATUS: Maybe<Scalars['String']['output']>;
  /** 품질검사유형 */
  INSPECT_TYPE_CD: Maybe<Scalars['String']['output']>;
  /** 입고단가 */
  IN_PRICE: Maybe<Scalars['Float']['output']>;
  /** 입고단가Vat포함여부 */
  IN_PRICE_VAT: Maybe<Scalars['String']['output']>;
  /** 조달기간 */
  IN_TERM: Maybe<Scalars['String']['output']>;
  /** 관리항목 */
  ITEM_TYPE: Maybe<Scalars['String']['output']>;
  /** 노무비표준원가 */
  LABOR_COST: Maybe<Scalars['Float']['output']>;
  /** 노무비단가 */
  LABOR_WEIGHT: Maybe<Scalars['Float']['output']>;
  /** 재료비표준원가 */
  MATERIAL_COST: Maybe<Scalars['Float']['output']>;
  /** 최소구매단위 */
  MIN_QTY: Maybe<Scalars['String']['output']>;
  /** 숫자형추가항목1 */
  NO_USER1: Maybe<Scalars['Float']['output']>;
  /** 숫자형추가항목2 */
  NO_USER2: Maybe<Scalars['Float']['output']>;
  /** 숫자형추가항목3 */
  NO_USER3: Maybe<Scalars['Float']['output']>;
  /** 숫자형추가항목4 */
  NO_USER4: Maybe<Scalars['Float']['output']>;
  /** 숫자형추가항목5 */
  NO_USER5: Maybe<Scalars['Float']['output']>;
  /** 숫자형추가항목6 */
  NO_USER6: Maybe<Scalars['Float']['output']>;
  /** 숫자형추가항목7 */
  NO_USER7: Maybe<Scalars['Float']['output']>;
  /** 숫자형추가항목8 */
  NO_USER8: Maybe<Scalars['Float']['output']>;
  /** 숫자형추가항목9 */
  NO_USER9: Maybe<Scalars['Float']['output']>;
  /** 숫자형추가항목10 */
  NO_USER10: Maybe<Scalars['Float']['output']>;
  /** 외주비단가 */
  OUTSIDE_PRICE: Maybe<Scalars['Float']['output']>;
  /** 외주비단가 VAT포함여부 */
  OUTSIDE_PRICE_VAT: Maybe<Scalars['String']['output']>;
  /** 외주비표준원가 */
  OUT_COST: Maybe<Scalars['Float']['output']>;
  /** 출고단가 */
  OUT_PRICE: Maybe<Scalars['Float']['output']>;
  /** 단가A */
  OUT_PRICE1: Maybe<Scalars['Float']['output']>;
  /** 단가A VAT포함여부 */
  OUT_PRICE1_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 단가B */
  OUT_PRICE2: Maybe<Scalars['Float']['output']>;
  /** 단가B VAT포함여부 */
  OUT_PRICE2_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 단가C */
  OUT_PRICE3: Maybe<Scalars['Float']['output']>;
  /** 단가C VAT포함여부 */
  OUT_PRICE3_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 단가D */
  OUT_PRICE4: Maybe<Scalars['Float']['output']>;
  /** 단가D VAT포함여부 */
  OUT_PRICE4_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 단가E */
  OUT_PRICE5: Maybe<Scalars['Float']['output']>;
  /** 단가E VAT포함여부 */
  OUT_PRICE5_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 단가F */
  OUT_PRICE6: Maybe<Scalars['Float']['output']>;
  /** 단가F VAT포함여부 */
  OUT_PRICE6_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 단가G */
  OUT_PRICE7: Maybe<Scalars['Float']['output']>;
  /** 단가G VAT포함여부 */
  OUT_PRICE7_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 단가H */
  OUT_PRICE8: Maybe<Scalars['Float']['output']>;
  /** 단가H VAT포함여부 */
  OUT_PRICE8_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 단가I */
  OUT_PRICE9: Maybe<Scalars['Float']['output']>;
  /** 단가I VAT포함여부 */
  OUT_PRICE9_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 단가J */
  OUT_PRICE10: Maybe<Scalars['Float']['output']>;
  /** 단가J VAT포함여부 */
  OUT_PRICE10_VAT_YN: Maybe<Scalars['String']['output']>;
  /** 출고단가Vat포함여부 */
  OUT_PRICE_VAT: Maybe<Scalars['String']['output']>;
  /** 품목코드 */
  PROD_CD: Maybe<Scalars['String']['output']>;
  /** 품목명 */
  PROD_DES: Maybe<Scalars['String']['output']>;
  /** 생산전표생성-판매 */
  PROD_SELL_TYPE: Maybe<Scalars['String']['output']>;
  /** 품목구분 */
  PROD_TYPE: Maybe<Scalars['String']['output']>;
  /** 생산전표생성-창고이동 */
  PROD_WHMOVE_TYPE: Maybe<Scalars['String']['output']>;
  /** 품질검사요청-구매 */
  QC_BUY_TYPE: Maybe<Scalars['String']['output']>;
  /** 품질검사요청여부 */
  QC_YN: Maybe<Scalars['String']['output']>;
  /** 적요 */
  REMARKS: Maybe<Scalars['String']['output']>;
  /** 검색창내용 */
  REMARKS_WIN: Maybe<Scalars['String']['output']>;
  /** 샘플링비율 */
  SAMPLE_PERCENT: Maybe<Scalars['Float']['output']>;
  /** 시리얼/로트 */
  SERIAL_TYPE: Maybe<Scalars['String']['output']>;
  /** 세트여부 */
  SET_FLAG: Maybe<Scalars['String']['output']>;
  /** 규격 */
  SIZE_DES: Maybe<Scalars['String']['output']>;
  /** 규격구분 */
  SIZE_FLAG: Maybe<Scalars['String']['output']>;
  /** 부가가치세율 */
  TAX: Maybe<Scalars['Float']['output']>;
  /** 단위 */
  UNIT: Maybe<Scalars['String']['output']>;
  /** 부가세율(매입) */
  VAT_RATE_BY: Maybe<Scalars['Float']['output']>;
  /** 부가세율(매입)구분 */
  VAT_RATE_BY_BASE_YN: Maybe<Scalars['String']['output']>;
  /** 부가세율(매출)구분 */
  VAT_YN: Maybe<Scalars['String']['output']>;
  /** 생산공정 */
  WH_CD: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

/** 품목조회의 품목구분 */
export enum EcountProductType {
  Goods = 'Goods',
  IntangibleProduct = 'IntangibleProduct',
  Product = 'Product',
  RawMaterial = 'RawMaterial',
  SemiProduct = 'SemiProduct',
  SubMaterial = 'SubMaterial'
}

export type EcountProfitMargin = {
  _id: Scalars['ID']['output'];
  /** 판매 금액 */
  amount: Maybe<Scalars['Float']['output']>;
  /** 원가 금액 */
  costAmount: Maybe<Scalars['Float']['output']>;
  /** 원가 단가 */
  costUnitPrice: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /**  __EMPTY_2 거래처 코드 */
  customerCode: Maybe<Scalars['String']['output']>;
  /**  __EMPTY_4 지점명 */
  customerName: Maybe<Scalars['String']['output']>;
  /** 이익 금액 */
  marginAmount: Maybe<Scalars['Float']['output']>;
  /**  __EMPTY_4 이익율 */
  marginRate: Maybe<Scalars['String']['output']>;
  /** 이익 단가 */
  marginUnitPrice: Maybe<Scalars['Float']['output']>;
  /** __EMPTY 품목코드 */
  productCode: Maybe<Scalars['String']['output']>;
  /**  __EMPTY_1 품명 */
  productName: Maybe<Scalars['String']['output']>;
  /** 수량 */
  quantity: Maybe<Scalars['Float']['output']>;
  /** 판매 단가 */
  unitPrice: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type EcountProfitMarginResponse = {
  error: Maybe<FatchError>;
  margins: Maybe<Array<EcountProfitMargin>>;
};

export type EcountSale = {
  /** 거래처코드 */
  CUST: Scalars['String']['output'];
  /** 거래처이름 */
  CUST_DES: Scalars['String']['output'];
  /** 주문일자 */
  IO_DATE: Scalars['Float']['output'];
  /** 11:부가세율 적용, 12:부가세율 미적용 */
  IO_TYPE: Scalars['String']['output'];
  /** 단가 */
  PRICE: Scalars['String']['output'];
  /** 상품코드 */
  PROD_CD: Scalars['String']['output'];
  /** 상품주문번호 */
  P_REMARKS1: Scalars['String']['output'];
  /** 주문번호 */
  P_REMARKS2: Scalars['String']['output'];
  /** 수량 */
  QTY: Scalars['String']['output'];
  /** 공급가액(원화) */
  SUPPLY_AMT: Scalars['String']['output'];
  /** 판매묶음번호 - 같으면 묶임 */
  UPLOAD_SER_NO: Scalars['String']['output'];
  /** 주문자 */
  U_MEMO1: Scalars['String']['output'];
  /** 부가세 */
  VAT_AMT: Maybe<Scalars['String']['output']>;
  /** 창고코드 */
  WH_CD: Scalars['String']['output'];
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EcountSaleFatchInput = {
  productOrderCode: Scalars['String']['input'];
};

export type EcountSaleFatchResponce = {
  errors: Maybe<Array<FatchError>>;
  ok: Scalars['Boolean']['output'];
};

export type EcountSaleFatchesInput = {
  productOrderCodes: Array<Scalars['String']['input']>;
};

export type EcountSaleFatchesResponce = {
  errors: Maybe<Array<FatchError>>;
  ok: Scalars['Boolean']['output'];
};

export type EditCompanyMemberInput = {
  _email: InputMaybe<Scalars['String']['input']>;
  _id: InputMaybe<Scalars['String']['input']>;
  department: InputMaybe<Scalars['String']['input']>;
  isSecessed: InputMaybe<Scalars['Boolean']['input']>;
  nickname: InputMaybe<Scalars['String']['input']>;
  phoneNumber: InputMaybe<Scalars['String']['input']>;
  position: InputMaybe<Scalars['String']['input']>;
  roles: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail: InputMaybe<Scalars['String']['input']>;
  username: InputMaybe<Scalars['String']['input']>;
};

export type Email = {
  _id: Scalars['ID']['output'];
  contact: Contact;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  emailAddress: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type EmailInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  emailAddress: InputMaybe<Scalars['String']['input']>;
};

export type EmailVerifyInput = {
  email: Scalars['String']['input'];
};

export type EmailVerifyResponse = {
  errors: Maybe<Array<FieldError>>;
  ok: Maybe<Scalars['Boolean']['output']>;
};

export type Exchange = {
  /** 교환 배송비 청구액 */
  claimDeliveryFeeDemandAmount: Maybe<Scalars['Int']['output']>;
  /** 교환 배송비 할인액 */
  claimDeliveryFeeDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 교환 배송비 결제 수단. 100바이트 내외 */
  claimDeliveryFeePayMeans: Maybe<Scalars['String']['output']>;
  /** 교환 배송비 결제 방법. 100바이트 내외 */
  claimDeliveryFeePayMethod: Maybe<Scalars['String']['output']>;
  /** 교환 배송비 묶음 청구 상품 주문 번호(여러 개면 쉼표로 구분). 4000바이트 내외 */
  claimDeliveryFeeProductOrderIds: Maybe<Scalars['String']['output']>;
  /** 클레임 요청일. 45바이트 내외 */
  claimRequestDate: Maybe<Scalars['String']['output']>;
  /** 클레임 상태. 250바이트 내외 */
  claimStatus: Maybe<Scalars['String']['output']>;
  /** 수거 주소 */
  collectAddress: Maybe<CollectAddress>;
  /** 수거 완료일. 45바이트 내외 */
  collectCompletedDate: Maybe<Scalars['String']['output']>;
  /** 택배사 코드. 250바이트 내외 */
  collectDeliveryCompany: Maybe<Scalars['String']['output']>;
  /** 배송 방법 코드. 250바이트 내외 */
  collectDeliveryMethod: Maybe<Scalars['String']['output']>;
  /** 수거 상태. 250바이트 내외 */
  collectStatus: Maybe<Scalars['String']['output']>;
  /** 수거 송장 번호. 100바이트 내외 */
  collectTrackingNumber: Maybe<Scalars['String']['output']>;
  /** 기타 비용 청구액 */
  etcFeeDemandAmount: Maybe<Scalars['Int']['output']>;
  /** 기타 비용 결제 수단. 100바이트 내외 */
  etcFeePayMeans: Maybe<Scalars['String']['output']>;
  /** 기타 비용 결제 방법. 100바이트 내외 */
  etcFeePayMethod: Maybe<Scalars['String']['output']>;
  /** 교환 상세 사유. 4000바이트 내외 */
  exchangeDetailedReason: Maybe<Scalars['String']['output']>;
  /** ExchangeReason 클레임 요청 사유. 250바이트 내외 */
  exchangeReason: Maybe<Scalars['String']['output']>;
  /** 보류 설정일. 45바이트 내외 */
  holdbackConfigDate: Maybe<Scalars['String']['output']>;
  /** 보류 설정자(구매자/판매자/관리자/시스템). 100바이트 내외 */
  holdbackConfigurer: Maybe<Scalars['String']['output']>;
  /** 보류 상세 사유. 4000바이트 내외 */
  holdbackDetailedReason: Maybe<Scalars['String']['output']>;
  /** 보류 유형. 250바이트 내외 */
  holdbackReason: Maybe<Scalars['String']['output']>;
  /** 보류 해제일. 45바이트 내외 */
  holdbackReleaseDate: Maybe<Scalars['String']['output']>;
  /** 보류 해제자(구매자/판매자/관리자/시스템). 100바이트 내외 */
  holdbackReleaser: Maybe<Scalars['String']['output']>;
  /** 보류 상태. 250바이트 내외 */
  holdbackStatus: Maybe<Scalars['String']['output']>;
  /** 택배사 코드. 250바이트 내외 */
  reDeliveryCompany: Maybe<Scalars['String']['output']>;
  /** 배송 방법 코드. 250바이트 내외 */
  reDeliveryMethod: Maybe<Scalars['String']['output']>;
  /** 재배송 처리일. 45바이트 내외 */
  reDeliveryOperationDate: Maybe<Scalars['String']['output']>;
  /** 배송 상세 상태. 250바이트 내외 */
  reDeliveryStatus: Maybe<Scalars['String']['output']>;
  /** 재배송 송장 번호. 100바이트 내외 */
  reDeliveryTrackingNumber: Maybe<Scalars['String']['output']>;
  /** 교환 도서산간 배송비 */
  remoteAreaCostChargeAmount: Maybe<Scalars['Int']['output']>;
  /** 접수 채널. 100바이트 내외 */
  requestChannel: Maybe<Scalars['String']['output']>;
  /** 반송 수령 주소 */
  returnReceiveAddress: Maybe<CollectAddress>;
};

export type FcCustomer = {
  _id: Scalars['ID']['output'];
  addresses: Address;
  businessRegistration: Maybe<Scalars['String']['output']>;
  contact: Maybe<Contact>;
  createdAt: Scalars['DateTime']['output'];
  customerCode: Maybe<Scalars['String']['output']>;
  deliveryPossibleAmount: Maybe<Scalars['Float']['output']>;
  name: Maybe<Scalars['String']['output']>;
  nickName: Maybe<Scalars['String']['output']>;
  salesChannel: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FcInBound = {
  _id: Scalars['ID']['output'];
  /** 입고 실제 수량 */
  actualQuantity: Scalars['Float']['output'];
  /** 운송 추적 번호 */
  carrierTrackingNumber: Maybe<Scalars['String']['output']>;
  /** 생성 일자 */
  createdAt: Scalars['DateTime']['output'];
  /** 검수자 */
  inspector: Maybe<Scalars['String']['output']>;
  /** 기타 메모 */
  memo: Maybe<Scalars['String']['output']>;
  /** 입고 요청 일자 */
  orderDate: Maybe<Scalars['String']['output']>;
  /** 상대 업체 정보 */
  partnerCompany: Maybe<FcPartnerCompany>;
  product: FcProduct;
  /** 입고 요청 수량 */
  requestQuantity: Scalars['Float']['output'];
  /** 입고 상태 */
  status: Maybe<Scalars['String']['output']>;
  /** 운송업체 */
  transportCompany: Maybe<Scalars['String']['output']>;
  /** 운송 담당자 */
  transportManager: Maybe<Scalars['String']['output']>;
  /** 수정 일자 */
  updatedAt: Scalars['DateTime']['output'];
  warehouse: FcWarehouse;
  /** 창고 위치 */
  warehouseLocation: Maybe<Scalars['String']['output']>;
  /** 입고 완료 일자 */
  warehousingDate: Maybe<Scalars['DateTime']['output']>;
};

export type FcOutBound = {
  customer: FcCustomer;
  orderNumber: Scalars['String']['output'];
  outboundDate: Scalars['DateTime']['output'];
  product: FcProduct;
  quantity: Scalars['Float']['output'];
  supplyPrice: Scalars['Float']['output'];
  transactionType: Scalars['String']['output'];
  unitPrice: Scalars['Float']['output'];
  uploadSerialNumber: Scalars['String']['output'];
  vat: Scalars['Float']['output'];
  warehouse: FcWarehouse;
};

export type FcPartnerCompany = {
  _id: Scalars['ID']['output'];
  /** 업체 주소 */
  address: Maybe<Scalars['String']['output']>;
  /** 연락처 */
  contactNumber: Maybe<Scalars['String']['output']>;
  /** 담당자 */
  contactPerson: Maybe<Scalars['String']['output']>;
  /** 업체 이메일 */
  email: Maybe<Scalars['String']['output']>;
  /** 업체명 */
  name: Maybe<Scalars['String']['output']>;
};

export type FcProduct = {
  ERPProductDES: Maybe<Scalars['String']['output']>;
  /** 상품명 */
  ProductName: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  packageCapacity: Maybe<Scalars['Float']['output']>;
  packageCapacityUnitType: Maybe<PackageCapacityUnitType>;
  packageDepth: Maybe<Scalars['Float']['output']>;
  packageType: Maybe<PackageType>;
  peaceType: Maybe<PackageType>;
  quantityInPackage: Maybe<Scalars['String']['output']>;
  sallerProductDES: Maybe<Scalars['String']['output']>;
  sellerCode: Scalars['String']['output'];
  /** 규격 */
  sizeDES: Maybe<Scalars['String']['output']>;
  /** 보관방식 */
  storageMethod: Maybe<Scalars['String']['output']>;
  /** 보관방식 */
  storageType: Maybe<StorageType>;
  /** 단위 */
  unit: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  /** 창고에서 사용하는 이름 */
  warehouseProductDES: Maybe<Scalars['String']['output']>;
};

/** 상품 주문 상태 */
export enum FcProductOrderStatus {
  Canceled = 'CANCELED',
  CanceledByNopayment = 'CANCELED_BY_NOPAYMENT',
  Delivered = 'DELIVERED',
  Delivering = 'DELIVERING',
  Exchanged = 'EXCHANGED',
  OrderConfirmation = 'ORDER_CONFIRMATION',
  Payed = 'PAYED',
  Picking = 'PICKING',
  PurchaseDecided = 'PURCHASE_DECIDED',
  Returned = 'RETURNED',
  Waiting = 'WAITING'
}

export type FcWarehouse = {
  code: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type FailProductOrderInfos = {
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  productOrderId: Scalars['String']['output'];
};

export type FatchError = {
  message: Scalars['String']['output'];
  query: Scalars['String']['output'];
};

export type FetchUpdatedOrdersResponse = {
  errors: Maybe<Array<FieldError>>;
  ok: Maybe<Scalars['Boolean']['output']>;
};

export type FieldError = {
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type FindEmailResponse = {
  email: Maybe<Scalars['String']['output']>;
  errors: Maybe<Array<FieldError>>;
};

export type GetBoxCostInput = {
  boxname: Scalars['String']['input'];
};

export type GetCalendarDateResponse = {
  dates: Maybe<Array<CalendarDate>>;
  error: Maybe<FatchError>;
};

export type GetCalendarDatesInput = {
  end: InputMaybe<Scalars['String']['input']>;
  job: Scalars['String']['input'];
  start: InputMaybe<Scalars['String']['input']>;
  states: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type GetCompaniesResponse = {
  companies: Maybe<Array<Company>>;
  errors: Maybe<FatchError>;
};

export type GetComponySearchListResponse = {
  errors: Maybe<Array<FatchError>>;
  list: Array<ComponySearchType>;
};

export type GetDeliveryPackagePricesInput = {
  boxId: Scalars['String']['input'];
  deliveryCompany: Scalars['String']['input'];
};

export type GetImageUploadUrlResponse = {
  id: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  url: Maybe<Scalars['String']['output']>;
};

export type GetImageUploadUrLsResponse = {
  getUrls: Maybe<Array<GetImageUrls>>;
};

export type GetImageUrls = {
  id: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GetImportOrderResponse = {
  errors: Maybe<Array<FatchError>>;
  importOrder: Maybe<ImportOrder>;
};

export type GetImportsInput = {
  limit: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
};

export type GetImportsResponse = {
  error: Maybe<FatchError>;
  hasMore: Scalars['Boolean']['output'];
  imports: Maybe<Array<ImportOrder>>;
  total: Scalars['Float']['output'];
};

export type GetPackageBoxCostInput = {
  productCode: Scalars['String']['input'];
};

export type GetProductLocationsInput = {
  productCode: Scalars['String']['input'];
};

export type GetRackInput = {
  location: Scalars['String']['input'];
};

export type GetRacksInput = {
  locationSearch: Scalars['String']['input'];
};

export type GetSpcProudctInput = {
  spcProdId: InputMaybe<Scalars['String']['input']>;
};

export type GetSavedEcountInventoriesResponse = {
  error: Maybe<FatchError>;
  inventories: Maybe<Array<EcountInventory>>;
};

export type GetSavedEcountInventoryResponse = {
  error: Maybe<FatchError>;
  inventory: Maybe<EcountInventory>;
};

export type GetStockItemsInput = {
  stockItemsIds: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetTodosInput = {
  assignedUserIds: InputMaybe<Array<Scalars['String']['input']>>;
  endDate: InputMaybe<Scalars['DateTime']['input']>;
  isCompleted: InputMaybe<Scalars['Boolean']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  loadAll: InputMaybe<Scalars['Boolean']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
  priority: InputMaybe<Priority>;
  queryName: InputMaybe<Scalars['String']['input']>;
  sortBy: InputMaybe<Scalars['String']['input']>;
  sortOrder: InputMaybe<Scalars['String']['input']>;
  startDate: InputMaybe<Scalars['DateTime']['input']>;
};

/** 선물 수락 상태 구분 */
export enum GiftReceivingStatus {
  Received = 'RECEIVED',
  WaitForReceiving = 'WAIT_FOR_RECEIVING'
}

export type HopeDelivery = {
  /** 배송 희망 지역 설정 배송비 */
  additionalFee: Maybe<Scalars['Int']['output']>;
  /** 변경 사유 */
  changeReason: Maybe<Scalars['String']['output']>;
  /** 변경한 사용자 */
  changer: Maybe<Scalars['String']['output']>;
  /** 배송 희망 시간 */
  hopeDeliveryHm: Maybe<Scalars['String']['output']>;
  /** 배송 희망일 */
  hopeDeliveryYmd: Maybe<Scalars['String']['output']>;
  /** 지역 */
  region: Maybe<Scalars['String']['output']>;
};

export type ImportCompanyInput = {
  companyId: InputMaybe<Scalars['String']['input']>;
  importOrderId: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type ImportItem = {
  USDPerKg: Maybe<Scalars['Float']['output']>;
  USDPerPack: Maybe<Scalars['Float']['output']>;
  _id: Scalars['ID']['output'];
  amountUSD: Maybe<Scalars['Float']['output']>;
  arrivedQuantity: Maybe<Scalars['Float']['output']>;
  arrivedWeight: Maybe<Scalars['Float']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  importOrder: ImportOrder;
  note: Maybe<Scalars['String']['output']>;
  priceUSD: Maybe<Scalars['Float']['output']>;
  priceUnit: Maybe<ImportPriceUnit>;
  productCode: Maybe<Scalars['String']['output']>;
  productDES: Maybe<Scalars['String']['output']>;
  quantity: Maybe<Scalars['Float']['output']>;
  sizeDES: Maybe<Scalars['String']['output']>;
  updatedQuantity: Maybe<Scalars['Float']['output']>;
  updatedWeight: Maybe<Scalars['Float']['output']>;
  volume: Maybe<Scalars['Float']['output']>;
  volumeUnit: Maybe<Scalars['String']['output']>;
  weight: Maybe<Scalars['Float']['output']>;
  weightUnit: Maybe<WeightUnit>;
};

export type ImportOrder = {
  _id: Scalars['ID']['output'];
  calendarDate: Maybe<CalendarDate>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  /** 주문에 사용된 통화 */
  currency: Maybe<CurrencyType>;
  /** 관세사 */
  customsBroker: Maybe<Company>;
  /** 수입품목 */
  importItems: Maybe<Array<ImportItem>>;
  isComplete: Maybe<Scalars['Boolean']['output']>;
  /** 생산업체 */
  manufacturer: Maybe<Company>;
  /** 운송사 */
  shippingCompany: Maybe<Company>;
  status: Maybe<ImportStatus>;
  /** 비고 */
  todos: Maybe<Array<Todo>>;
  /** 보세창고 */
  warehouse: Maybe<Company>;
};

export type ImportOrdersInput = {
  inProgress: InputMaybe<Scalars['Boolean']['input']>;
};

export type ImportOrdersResponse = {
  errors: Maybe<Array<FatchError>>;
  importOrders: Maybe<Array<ImportOrder>>;
};

/** 수입품목 개별단가 유닛 */
export enum ImportPriceUnit {
  Box = 'BOX',
  Carton = 'CARTON',
  Container = 'CONTAINER',
  Kg = 'KG',
  Lb = 'LB',
  Piece = 'PIECE',
  Tray = 'TRAY'
}

/** 수입 과정의 상태를 나타내는 enum */
export enum ImportStatus {
  Arrived = 'ARRIVED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  CustomsClearanceCleared = 'CUSTOMS_CLEARANCE_CLEARED',
  Damaged = 'DAMAGED',
  Delayed = 'DELAYED',
  Delivered = 'DELIVERED',
  Initiated = 'INITIATED',
  InCustoms = 'IN_CUSTOMS',
  InTransit = 'IN_TRANSIT',
  InWarehouse = 'IN_WAREHOUSE',
  Lost = 'LOST'
}

/** 산업 종류 */
export enum IndustryType {
  ImportOrder = 'IMPORT_ORDER',
  SpcOrder = 'SPC_ORDER'
}

export type InventoryEaType = {
  productCode: Scalars['String']['output'];
  productDescript: Scalars['String']['output'];
  size: Scalars['Float']['output'];
};

export type InvisivleStockItemInput = {
  rackId: Scalars['String']['input'];
  stockId: Scalars['String']['input'];
};

export type ItemToPickingRespones = {
  errors: Maybe<Array<FatchError>>;
  stockItem: Maybe<Array<StockItem>>;
};

/** 최종 변경 구분 */
export enum LastChangeType {
  ClaimCompleted = 'CLAIM_COMPLETED',
  ClaimHoldbackReleased = 'CLAIM_HOLDBACK_RELEASED',
  ClaimRejected = 'CLAIM_REJECTED',
  ClaimRequested = 'CLAIM_REQUESTED',
  CollectDone = 'COLLECT_DONE',
  DeliveryAddressChanged = 'DELIVERY_ADDRESS_CHANGED',
  Dispatched = 'DISPATCHED',
  ExchangeOption = 'EXCHANGE_OPTION',
  GiftReceived = 'GIFT_RECEIVED',
  HopeDeliveryInfoChanged = 'HOPE_DELIVERY_INFO_CHANGED',
  Payed = 'PAYED',
  PayWaiting = 'PAY_WAITING',
  PurchaseDecided = 'PURCHASE_DECIDED'
}

export type LoginResponse = {
  errors: Maybe<Array<FieldError>>;
  user: Maybe<User>;
};

export type MonthlyProductSale = {
  /** 세금 */
  VAT: Maybe<Scalars['Float']['output']>;
  _id: Maybe<Scalars['ID']['output']>;
  /** 판매월 */
  atDate: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  inventroyManagementException: Maybe<Scalars['Boolean']['output']>;
  productCode: Maybe<Scalars['String']['output']>;
  productName: Maybe<Scalars['String']['output']>;
  /** 판매원금 */
  salesAmount: Maybe<Scalars['Float']['output']>;
  /** 판매수량 */
  salesQuantity: Maybe<Scalars['Float']['output']>;
  /** 총판매금액 */
  total: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type MonthlyProductSaleResponse = {
  errors: Maybe<Array<FatchError>>;
  monthlyProductSale: Maybe<MonthlyProductSale>;
};

export type MonthlyProductSalesResponse = {
  errors: Maybe<Array<FatchError>>;
  monthlyProductSales: Maybe<Array<MonthlyProductSale>>;
};

export type Mutation = {
  addMember: EmailVerifyResponse;
  addProfilePicture: Scalars['Boolean']['output'];
  addTotalOrders: Maybe<AddTotalOrdersRespones>;
  changePackageBox: PackageBoxResponse;
  changePassword: UserResponse;
  cleanEcountSale: Scalars['String']['output'];
  connetPackageBoxMapping: PackageBoxMappingResponse;
  createCalendarDate: CreateCalendarDateResponse;
  createContact: CreateContactResponse;
  createInbound: FcInBound;
  createOutbound: FcOutBound;
  createProduct: Product;
  createStockItem: StockItemRespones;
  createTodo: CreateTodoResponse;
  deleteBaljugoOrder: Maybe<Scalars['Boolean']['output']>;
  deleteCompanyContact: Scalars['Boolean']['output'];
  deleteContactEmail: Scalars['Boolean']['output'];
  deleteContactPhone: Scalars['Boolean']['output'];
  deleteDliveryPriceTag: Scalars['Boolean']['output'];
  deleteImportOrder: Scalars['Boolean']['output'];
  deleteImportTodo: UpdateTodoResponse;
  deleteInbound: Scalars['Boolean']['output'];
  deleteOutbound: Scalars['Boolean']['output'];
  deleteStockItem: Scalars['Boolean']['output'];
  deleteTodo: UpdateTodoResponse;
  ecounRegistCustomer: Scalars['String']['output'];
  ecountLogin: Maybe<Scalars['String']['output']>;
  ecountLoginTest: Maybe<Scalars['String']['output']>;
  ecountProductAllUpsert: Scalars['Boolean']['output'];
  ecountPurchasesSaveTest: Scalars['String']['output'];
  ecountRegistProduct: Scalars['String']['output'];
  ecountSaleFatch: EcountSaleFatchResponce;
  ecountSaleFatches: EcountSaleFatchesResponce;
  ecountSaleOrder: Scalars['String']['output'];
  editCompanyMember: UpdateMemberResponse;
  emailVerifiction: EmailVerifyResponse;
  forgotPassword: Scalars['Boolean']['output'];
  invisibleStockItem: Scalars['Boolean']['output'];
  itemsToPicking: ItemToPickingRespones;
  locationToRackItems: Scalars['Boolean']['output'];
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  naverConfirmProductOrder: NaverConfirmProductOrderQueryResponses;
  naverDirectUploadImages: Array<Scalars['String']['output']>;
  naverDispatchProductOrder: NaverDispatchProductOrderQueryResponses;
  oldEcountProductAllUpsert: Array<EcountProduct>;
  orderState: OrderStateRespones;
  register: UserResponse;
  removeBoxes: Scalars['Boolean']['output'];
  removeImportCompany: Scalars['Boolean']['output'];
  removeImportItem: Scalars['Boolean']['output'];
  removeImportOrder: Scalars['Boolean']['output'];
  removePackageBox: Scalars['Boolean']['output'];
  /** 네이버 정산데이터를 기준으로 이카운트 판매입력 */
  saleBulk: Scalars['Boolean']['output'];
  saleSaveDaily: Scalars['Boolean']['output'];
  setImportOrder: CreateImportItemResponse;
  setOrderArrivalLocation: SetOrderArrivalLocationRespones;
  setPackageBox: PackageBoxResponse;
  setSPCProdCodeMapping: SetSpcProdCodeMappingResponse;
  transitStockItem: Scalars['Boolean']['output'];
  updateCalendarDate: UpdateCalendarDateResponse;
  updateCenterNaverProducts: Scalars['Boolean']['output'];
  updateInventoryEcount: CreateInventoryEcountResponese;
  updatePackageBox: Scalars['Boolean']['output'];
  updateSPCOrder: UpdateSpcOrderResponse;
  updateScheduledUpdateIssues: Scalars['Boolean']['output'];
  updateStockItem: StockItemRespones;
  updateStoreProductCtrls: UpdateStoreProductCtrlsRespons;
  updateTodo: UpdateTodoResponse;
  uploadBaljugoDispatchXLSX: UploadXlsxResponse;
  uploadEcountCustomerXLSX: UploadXlsxResponse;
  uploadExcelEcountProfitMarginXLSX: UploadXlsxResponse;
  uploadExcelExistEcountSaleXLSX: UploadXlsxResponse;
  uploadFileEcountSalesXLSX: UploadXlsxResponse;
  uploadFileNaverSettleXLSX: Scalars['Boolean']['output'];
  uploadLogiHinjin: Scalars['Boolean']['output'];
  uploadLogiKGB: UploadXlsxResponse;
  uploadMissedProductOrderIds: Scalars['Boolean']['output'];
  uploadMissingEcountSalesXLSX: Scalars['Boolean']['output'];
  uploadMissingProductOrdersXLSX: Scalars['Boolean']['output'];
  uploadMonthlyProductSalesXLSX: UploadXlsxResponse;
  uploadNaverDisfatchXLSX: UploadXlsxResponse;
  uploadPackageBox: Scalars['Boolean']['output'];
  uploadProductLocationXLSX: UploadXlsxResponse;
  uploadProductOrdersXLSX: UploadProductOrdersXlsxResponse;
  uploadSPCProductsXLSX: UploadXlsxResponse;
  uploadSPCPurchaseOfQooQooXLSX: UploadXlsxResponse;
  uploadStorageInventoryXLSX: UploadXlsxResponse;
  upsertBox: UpsertBoxResponse;
  upsertCalendarDate: UpdateCalendarDateResponse;
  upsertCompanyContact: UpsertCompanyContactResponse;
  upsertContactEmails: UpsertContactEmailResponse;
  upsertContactPhones: UpsertContactPhoneResponse;
  upsertDeliveryPriceTag: DeliveryPriceTagResponse;
  upsertImportCompany: CompanyResponse;
  upsertImportItem: UpsertImportItemResponse;
  upsertImportOrder: UpsertImportOrderResponse;
  upsertImportTodo: UpsertImportTodoResponse;
  upsertRack: RackRespones;
  upsertStockItem: StockItemRespones;
  userSecession: UpdateUserResponse;
};


export type MutationAddMemberArgs = {
  input: AddMemberInput;
};


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload']['input'];
};


export type MutationAddTotalOrdersArgs = {
  input: AddTotalOrdersInput;
};


export type MutationChangePackageBoxArgs = {
  input: ChangePackageBoxInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationConnetPackageBoxMappingArgs = {
  input: SetPackageBoxInput;
};


export type MutationCreateCalendarDateArgs = {
  input: CreateCalendarDatesInput;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateStockItemArgs = {
  input: StockItemInput;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteBaljugoOrderArgs = {
  input: DeleteBaljugoOrderInput;
};


export type MutationDeleteCompanyContactArgs = {
  input: DeleteCompanyContactInput;
};


export type MutationDeleteContactEmailArgs = {
  input: DeleteContactEmailInput;
};


export type MutationDeleteContactPhoneArgs = {
  input: DeleteContactPhoneInput;
};


export type MutationDeleteDliveryPriceTagArgs = {
  deliveryPriceTagId: Scalars['String']['input'];
};


export type MutationDeleteImportOrderArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteImportTodoArgs = {
  input: DeleteImportTodoInput;
};


export type MutationDeleteStockItemArgs = {
  input: InvisivleStockItemInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String']['input'];
};


export type MutationEcountSaleFatchArgs = {
  input: EcountSaleFatchInput;
};


export type MutationEcountSaleFatchesArgs = {
  input: EcountSaleFatchesInput;
};


export type MutationEditCompanyMemberArgs = {
  input: EditCompanyMemberInput;
};


export type MutationEmailVerifictionArgs = {
  input: EmailVerifyInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationInvisibleStockItemArgs = {
  input: InvisivleStockItemInput;
};


export type MutationItemsToPickingArgs = {
  input: SortingStockItemInput;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  usernameOrEmail: Scalars['String']['input'];
};


export type MutationNaverConfirmProductOrderArgs = {
  input: ConfirmsInput;
};


export type MutationNaverDirectUploadImagesArgs = {
  files: Array<Scalars['Upload']['input']>;
};


export type MutationNaverDispatchProductOrderArgs = {
  input: DispatchsInput;
};


export type MutationOrderStateArgs = {
  input: PickingListInput;
};


export type MutationRegisterArgs = {
  input: UsernamePasswordInput;
};


export type MutationRemoveBoxesArgs = {
  boxIds: Array<Scalars['String']['input']>;
};


export type MutationRemoveImportCompanyArgs = {
  input: ImportCompanyInput;
};


export type MutationRemoveImportItemArgs = {
  input: RemoveImportOrdersInput;
};


export type MutationRemoveImportOrderArgs = {
  importId: Scalars['String']['input'];
};


export type MutationRemovePackageBoxArgs = {
  packageBoxId: Scalars['String']['input'];
};


export type MutationSaleBulkArgs = {
  input: SettleInput;
};


export type MutationSetOrderArrivalLocationArgs = {
  input: SetOrderArrivalLocationInput;
};


export type MutationSetPackageBoxArgs = {
  input: SetPackageBoxInput;
};


export type MutationSetSpcProdCodeMappingArgs = {
  input: SetSpcProdCodeMappingInput;
};


export type MutationTransitStockItemArgs = {
  input: InvisivleStockItemInput;
};


export type MutationUpdateCalendarDateArgs = {
  input: UpdateCalendarDateInput;
};


export type MutationUpdateInventoryEcountArgs = {
  date: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSpcOrderArgs = {
  input: UpdateSpcOrderInput;
};


export type MutationUpdateScheduledUpdateIssuesArgs = {
  input: UpdateOrderMissedPeriodsInput;
};


export type MutationUpdateStockItemArgs = {
  input: StockItemUpdateInput;
};


export type MutationUpdateStoreProductCtrlsArgs = {
  input: UpdateStoreProductCtrlsInput;
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};


export type MutationUploadBaljugoDispatchXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadEcountCustomerXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadExcelEcountProfitMarginXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadExcelExistEcountSaleXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadFileEcountSalesXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadFileNaverSettleXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadLogiHinjinArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadLogiKgbArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadMissedProductOrderIdsArgs = {
  productOrderIds: Array<Scalars['String']['input']>;
};


export type MutationUploadMissingEcountSalesXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadMissingProductOrdersXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadMonthlyProductSalesXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadNaverDisfatchXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadPackageBoxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadProductLocationXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadProductOrdersXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadSpcProductsXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadSpcPurchaseOfQooQooXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUploadStorageInventoryXlsxArgs = {
  file: Array<Scalars['Upload']['input']>;
};


export type MutationUpsertBoxArgs = {
  input: UpsertBoxInput;
};


export type MutationUpsertCalendarDateArgs = {
  input: UpdateCalendarDateInput;
};


export type MutationUpsertCompanyContactArgs = {
  input: UpsertCompanyContactInput;
};


export type MutationUpsertContactEmailsArgs = {
  input: UpsertContactEmailInput;
};


export type MutationUpsertContactPhonesArgs = {
  input: UpsertContactPhoneInput;
};


export type MutationUpsertDeliveryPriceTagArgs = {
  input: UpsertDeliveryPriceTagInput;
};


export type MutationUpsertImportCompanyArgs = {
  input: UpsertImportCompanyInput;
};


export type MutationUpsertImportItemArgs = {
  input: UpsertImportItemInput;
};


export type MutationUpsertImportOrderArgs = {
  input: UpsertImportOrderInput;
};


export type MutationUpsertImportTodoArgs = {
  input: UpsertImportTodoInput;
};


export type MutationUpsertRackArgs = {
  input: UpsertRackInput;
};


export type MutationUpsertStockItemArgs = {
  input: StockItemInput;
};


export type MutationUserSecessionArgs = {
  input: UserSecessionInput;
};

export type NaverAddress = {
  /** 배송지 타입. 250바이트 내외 */
  addressType: Maybe<Scalars['String']['output']>;
  /** 기본 주소. 300바이트 내외 */
  baseAddress: Maybe<Scalars['String']['output']>;
  /** 도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외 */
  city: Maybe<Scalars['String']['output']>;
  /** 국가. 45바이트 내외 */
  country: Maybe<Scalars['String']['output']>;
  /** 상세 주소. 300바이트 내외 */
  detailedAddress: Maybe<Scalars['String']['output']>;
  /** 도로명 주소 여부. 8바이트 내외 */
  isRoadNameAddress: Maybe<Scalars['Boolean']['output']>;
  /** 이름. 150바이트 내외 */
  name: Maybe<Scalars['String']['output']>;
  /** 주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외 */
  state: Maybe<Scalars['String']['output']>;
  /** 연락처 1. 45바이트 내외 */
  tel1: Maybe<Scalars['String']['output']>;
  /** 연락처 2. 45바이트 내외 */
  tel2: Maybe<Scalars['String']['output']>;
  /** 우편번호. 45바이트 내외 */
  zipCode: Maybe<Scalars['String']['output']>;
};

export type NaverConfirmProductOrderQueryResponses = {
  data: Maybe<Array<Naver_ConfirmData>>;
  timestamp: Maybe<Scalars['String']['output']>;
  traceId: Maybe<Scalars['String']['output']>;
};

export type NaverDispatchProductOrderQueryResponses = {
  data: Maybe<Naver_DispatchData>;
  timestamp: Maybe<Scalars['String']['output']>;
  traceId: Maybe<Scalars['String']['output']>;
};

export type NaverProductOrder = {
  _id: Scalars['ID']['output'];
  claimStatus: Maybe<Scalars['String']['output']>;
  claimType: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  giftReceivingStatus: Maybe<GiftReceivingStatus>;
  id: Scalars['String']['output'];
  lastChangedDate: Maybe<Scalars['String']['output']>;
  lastChangedType: Maybe<LastChangeType>;
  orderId: Maybe<Scalars['String']['output']>;
  paymentDate: Maybe<Scalars['String']['output']>;
  productOrderStatus: Maybe<ProductOrderStatus>;
  receiverAddressChanged: Maybe<Scalars['Boolean']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type NaverProductOrderData = {
  cancel: Maybe<Cancel>;
  delivery: Maybe<Delivery>;
  exchange: Maybe<Exchange>;
  order: Maybe<Order>;
  productOrder: Maybe<ProductOrder>;
  return: Maybe<Return>;
};

export type NaverProductOrderIds = {
  data: Maybe<Array<Scalars['String']['output']>>;
  timestamp: Maybe<Scalars['String']['output']>;
  traceId: Scalars['String']['output'];
};

export type NaverProductOrderIdsInput = {
  orderId: Scalars['String']['input'];
};

export type NaverProductOrderLastStatuesInput = {
  orderId: Array<Scalars['String']['input']>;
};

export type NaverProductOrderResponse = {
  errors: Maybe<Array<FieldError>>;
  naverProductOrders: Maybe<Array<ProductOrderLastChangeStatuses>>;
};

export type NaverProductOrdersInput = {
  productOrderId: Array<Scalars['String']['input']>;
};

export type NaverProductOrdersQueryResponses = {
  data: Maybe<Array<NaverProductOrderData>>;
  timestamp: Maybe<Scalars['String']['output']>;
  traceId: Scalars['String']['output'];
};

export type NaverProducts = {
  /** 콘텐츠 목록 */
  contents: Maybe<Array<Content>>;
  /** 첫 번째 페이지 여부 */
  first: Scalars['Boolean']['output'];
  /** 마지막 페이지 여부 */
  last: Scalars['Boolean']['output'];
  /** 페이지 번호 */
  page: Scalars['Int']['output'];
  /** 페이지 크기 */
  size: Scalars['Int']['output'];
  /** 정렬 정보 */
  sort: Maybe<SortInfo>;
  /** 전체 개수 */
  totalElements: Scalars['Int']['output'];
  /** 전체 페이지 수 */
  totalPages: Scalars['Int']['output'];
};

export type NaverProductsDetailInput = {
  lastChangedTypes: Array<LastChangeType>;
};

export type NaverPruductsInput = {
  /** 페이지당 가져올 품목갯수 */
  elementSize: InputMaybe<Scalars['Float']['input']>;
  orderType: OrderType;
  /** 현재 페이지 위치 */
  page: InputMaybe<Scalars['Float']['input']>;
  productStatusType: Array<ProductStatusType>;
};

export type NaverTokenResponse = {
  token: Maybe<Scalars['String']['output']>;
};

export type Naver_ConfirmData = {
  failProductOrderInfos: Array<FailProductOrderInfos>;
  successProductOrderIds: Array<SuccessProductOrderIds>;
};

export type Naver_DispatchData = {
  failProductOrderInfos: Maybe<Array<FailProductOrderInfos>>;
  successProductOrderIds: Maybe<Scalars['String']['output']>;
};

export type Order = {
  /** 충전금 최종 결제 금액 */
  chargeAmountPaymentAmount: Maybe<Scalars['Int']['output']>;
  /** 네이버페이 적립금 최종 결제 금액 */
  checkoutAccumulationPaymentAmount: Maybe<Scalars['Int']['output']>;
  /** 일반 결제 수단 최종 결제 금액 */
  generalPaymentAmount: Maybe<Scalars['Int']['output']>;
  /** 배송 메모 개별 입력 여부. 8바이트 내외 */
  isDeliveryMemoParticularInput: Maybe<Scalars['String']['output']>;
  /** 네이버페이 포인트 최종 결제 금액 */
  naverMileagePaymentAmount: Maybe<Scalars['Int']['output']>;
  /** 주문 일시. 45바이트 내외 */
  orderDate: Maybe<Scalars['String']['output']>;
  /** 주문 할인액 */
  orderDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 주문 번호. 20바이트 내외 */
  orderId: Maybe<Scalars['String']['output']>;
  /** 주문자 ID. 20바이트 내외 */
  ordererId: Maybe<Scalars['String']['output']>;
  /** 주문자 이름. 300바이트 내외 */
  ordererName: Maybe<Scalars['String']['output']>;
  /** 주문자 번호. 20바이트 내외 */
  ordererNo: Maybe<Scalars['String']['output']>;
  /** 주문자 연락처. 45바이트 내외 */
  ordererTel: Maybe<Scalars['String']['output']>;
  /** 후불 결제 최종 결제 금액 */
  payLaterPaymentAmount: Maybe<Scalars['Int']['output']>;
  /** 결제 위치 구분(PC/MOBILE). 300바이트 내외 */
  payLocationType: Maybe<Scalars['String']['output']>;
  /** 결제 일시(최종 결제). 45바이트 내외 */
  paymentDate: Maybe<Scalars['String']['output']>;
  /** 결제 기한. 45바이트 내외 */
  paymentDueDate: Maybe<Scalars['String']['output']>;
  /** 결제 수단. 300바이트 내외 */
  paymentMeans: Maybe<Scalars['String']['output']>;
};

export type OrderCodeLocationType = {
  /** 주문점 이름 */
  customerName: InputMaybe<Scalars['String']['input']>;
  /** 배송요청위치 */
  destinationLocation: InputMaybe<Scalars['String']['input']>;
  /** 주문점 코드 */
  orderCode: Scalars['String']['input'];
};

export enum OrderType {
  AccumulateSale = 'ACCUMULATE_SALE',
  AverageReviewScore = 'AVERAGE_REVIEW_SCORE',
  HighPrice = 'HIGH_PRICE',
  LowDiscountPrice = 'LOW_DISCOUNT_PRICE',
  LowPrice = 'LOW_PRICE',
  ModDate = 'MOD_DATE',
  Name = 'NAME',
  No = 'NO',
  Popularity = 'POPULARITY',
  RegDate = 'REG_DATE',
  SaleEnd = 'SALE_END',
  SaleStart = 'SALE_START',
  SellerCode = 'SELLER_CODE',
  TotalReviewCount = 'TOTAL_REVIEW_COUNT'
}

export type OrdersInput = {
  lastChangedType: LastChangeType;
};

export type OrederUpdateStatusTracker = {
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  end: Scalars['DateTime']['output'];
  ignore: Scalars['Boolean']['output'];
  start: Scalars['DateTime']['output'];
  updated: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PackageBox = {
  _id: Scalars['ID']['output'];
  box: Maybe<Box>;
  boxName: Maybe<Scalars['String']['output']>;
  productCode: Maybe<Scalars['String']['output']>;
};

export type PackageBoxMapping = {
  _id: Scalars['ID']['output'];
  box: Maybe<Box>;
  ecountProduct: Maybe<EcountProduct>;
};

export type PackageBoxMappingResponse = {
  errors: Maybe<Array<FatchError>>;
  packageBoxMapping: Maybe<PackageBoxMapping>;
};

export type PackageBoxMappingsResponse = {
  errors: Maybe<Array<FatchError>>;
  packageBoxMappings: Maybe<Array<PackageBoxMapping>>;
};

export type PackageBoxResponse = {
  errors: Maybe<Array<FatchError>>;
  packageBox: Maybe<PackageBox>;
};

export type PackageBoxed = {
  _id: Scalars['ID']['output'];
  box: Maybe<Box>;
  ecountProduct: Maybe<EcountProduct>;
};

export type PackageBoxesResponse = {
  errors: Maybe<Array<FatchError>>;
  packageBoxed: Maybe<Array<PackageBoxed>>;
};

export enum PackageCapacityUnitType {
  Barrel = 'BARREL',
  Carat = 'CARAT',
  CubicFeet = 'CUBIC_FEET',
  CubicMeter = 'CUBIC_METER',
  FluidOunce = 'FLUID_OUNCE',
  Gallon = 'GALLON',
  Gram = 'GRAM',
  Kilogram = 'KILOGRAM',
  Liter = 'LITER',
  Ounce = 'OUNCE',
  Pint = 'PINT',
  Pound = 'POUND',
  Quart = 'QUART',
  Tonne = 'TONNE'
}

export enum PackageType {
  Bulk = 'BULK',
  PaperPackage = 'PAPER_PACKAGE',
  SealedPack = 'SEALED_PACK',
  VacuumPack = 'VACUUM_PACK'
}

export type PackingCost = {
  boxCost: Maybe<Scalars['Float']['output']>;
  deliveryCost: Maybe<Scalars['Float']['output']>;
  originInPrice: Maybe<Scalars['Float']['output']>;
};

export type Pagination = {
  page: Scalars['Float']['output'];
  size: Scalars['Float']['output'];
  totalElements: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

/** 조회 기간 기준 */
export enum PeriodType {
  SettleCasebycasePayDate = 'SETTLE_CASEBYCASE_PAY_DATE',
  SettleCasebycaseSettleBasisDate = 'SETTLE_CASEBYCASE_SETTLE_BASIS_DATE',
  SettleCasebycaseSettleCompleteDate = 'SETTLE_CASEBYCASE_SETTLE_COMPLETE_DATE',
  SettleCasebycaseSettleScheduleDate = 'SETTLE_CASEBYCASE_SETTLE_SCHEDULE_DATE',
  SettleCasebycaseTaxreturnBasisDate = 'SETTLE_CASEBYCASE_TAXRETURN_BASIS_DATE'
}

export type Phone = {
  _id: Scalars['ID']['output'];
  contact: Contact;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PhoneInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  phoneNumber: InputMaybe<Scalars['String']['input']>;
};

export type Picking = {
  PackageBoxId: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  inspector: Maybe<User>;
  issuedBy: Maybe<User>;
  pickingBy: Maybe<User>;
  pickupDate: Maybe<Scalars['DateTime']['output']>;
  productOrderId: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PickingListInput = {
  /** 주문점 코드 */
  orderCodes: Array<Scalars['String']['input']>;
  /** 피킹일자 */
  pickingDate: Scalars['String']['input'];
};

export type PickingListRespones = {
  customerCode: Maybe<Scalars['String']['output']>;
  customerName: Maybe<Scalars['String']['output']>;
  customerOrders: Maybe<Array<BaljugoProductOrder>>;
  destinationLocation: Maybe<Scalars['String']['output']>;
  nickName: Maybe<Scalars['String']['output']>;
  quantity: Maybe<Scalars['Float']['output']>;
};

export type PickingListsRespones = {
  PickingLists: Maybe<Array<PickingListRespones>>;
  error: Maybe<FatchError>;
};

export type PickingStickerListInput = {
  /** 주문 데이터 */
  orderdata: Array<Scalars['String']['input']>;
};

/** 할 일의 우선순위 레벨 */
export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type ProdLocationRespones = {
  errors: Maybe<Array<FatchError>>;
  inventory: Maybe<Scalars['Float']['output']>;
  lastProdInventory: Maybe<Scalars['Float']['output']>;
  stockItems: Maybe<Array<StockItem>>;
  totalQuantity: Maybe<Scalars['Float']['output']>;
};

export type Product = {
  ERPProductDES: Maybe<Scalars['String']['output']>;
  /** 상품명 */
  ProductName: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  packageCapacity: Maybe<Scalars['Float']['output']>;
  packageCapacityUnitType: Maybe<PackageCapacityUnitType>;
  packageDepth: Maybe<Scalars['Float']['output']>;
  packageType: Maybe<PackageType>;
  peaceType: Maybe<PackageType>;
  quantityInPackage: Maybe<Scalars['String']['output']>;
  sallerProductDES: Maybe<Scalars['String']['output']>;
  sellerCode: Scalars['String']['output'];
  /** 규격 */
  sizeDES: Maybe<Scalars['String']['output']>;
  /** 보관방식 */
  storageMethod: Maybe<Scalars['String']['output']>;
  /** 보관방식 */
  storageType: Maybe<StorageType>;
  /** 단위 */
  unit: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  /** 창고에서 사용하는 이름 */
  warehouseProductDES: Maybe<Scalars['String']['output']>;
};

/** 상품 판매 변경요청 */
export enum ProductDisplayRequestType {
  Close = 'CLOSE',
  None = 'NONE',
  Outofstock = 'OUTOFSTOCK',
  Sale = 'SALE',
  Suspension = 'SUSPENSION'
}

export type ProductLocation = {
  location: Scalars['String']['output'];
  productCode: Scalars['String']['output'];
};

export type ProductLocationsRespons = {
  location: Maybe<Scalars['String']['output']>;
  productCode: Maybe<Scalars['String']['output']>;
};

export type ProductOrder = {
  /** 채널 수수료 */
  channelCommission: Maybe<Scalars['Int']['output']>;
  /** 클레임 번호 */
  claimId: Maybe<Scalars['String']['output']>;
  /** 클레임 상태. 250바이트 내외 */
  claimStatus: Maybe<Scalars['String']['output']>;
  /** 클레임 구분. 250바이트 내외 */
  claimType: Maybe<Scalars['String']['output']>;
  /** 수수료 선결제 상태 구분 */
  commissionPrePayStatus: Maybe<Scalars['String']['output']>;
  /** 수수료 과금 구분(결제 수수료/(구)판매 수수료/채널 수수료) */
  commissionRatingType: Maybe<Scalars['String']['output']>;
  /** 구매 확정일. 45바이트 내외 */
  decisionDate: Maybe<Scalars['String']['output']>;
  /** 발송 지연 상세 사유. 4000바이트 내외 */
  delayedDispatchDetailedReason: Maybe<Scalars['String']['output']>;
  /** 발송 지연 사유 코드. 250바이트 내외 */
  delayedDispatchReason: Maybe<Scalars['String']['output']>;
  /** 배송 속성 타입 코드 */
  deliveryAttributeType: Maybe<Scalars['String']['output']>;
  /** 배송비 최종 할인액 */
  deliveryDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 배송비 합계 */
  deliveryFeeAmount: Maybe<Scalars['Int']['output']>;
  /** 배송비 정책(조건별 무료 등). 250바이트 내외 */
  deliveryPolicyType: Maybe<Scalars['String']['output']>;
  /** 배송 방법 코드. 250바이트 내외 */
  expectedDeliveryMethod: Maybe<Scalars['String']['output']>;
  /** 정산 예정 금액 */
  expectedSettlementAmount: Maybe<Scalars['Int']['output']>;
  /** 사은품. 1000바이트 내외 */
  freeGift: Maybe<Scalars['String']['output']>;
  /** 선물 수락 상태 구분 */
  giftReceivingStatus: Maybe<Scalars['String']['output']>;
  /** 배송 도착 보장 일시 */
  hopeDelivery: Maybe<HopeDelivery>;
  /** 구매자 개인통관고유부호 */
  individualCustomUniqueCode: Maybe<Scalars['String']['output']>;
  /** 유입 경로 */
  inflowPath: Maybe<Scalars['String']['output']>;
  /** 옵션 상품이나 추가 상품 등록 시 자동 생성된 아이템 번호 */
  itemNo: Maybe<Scalars['String']['output']>;
  /** 네이버 쇼핑 매출 연동 수수료 */
  knowledgeShoppingSellingInterlockCommission: Maybe<Scalars['Int']['output']>;
  /** 물류센터 코드 */
  logisticsCenterId: Maybe<Scalars['String']['output']>;
  /** 물류사 코드 */
  logisticsCompanyId: Maybe<Scalars['String']['output']>;
  /** 가맹점 ID. 20바이트 내외 */
  mallId: Maybe<Scalars['String']['output']>;
  /** 채널 번호. 150바이트 내외 */
  merchantChannelId: Maybe<Scalars['String']['output']>;
  /** 옵션 코드. 1000바이트 내외 */
  optionCode: Maybe<Scalars['String']['output']>;
  /** 옵션 상품이나 추가 상품 등록 시 판매자가 별도로 입력한 옵션 관리 코드 */
  optionManageCode: Maybe<Scalars['String']['output']>;
  /** 옵션 금액 */
  optionPrice: Maybe<Scalars['Int']['output']>;
  /** 원상품 번호. 150바이트 내외 */
  originalProductId: Maybe<Scalars['String']['output']>;
  /** 묶음배송 번호. 20바이트 내외 */
  packageNumber: Maybe<Scalars['String']['output']>;
  /** 결제 수수료 */
  paymentCommission: Maybe<Scalars['Int']['output']>;
  /** 발주 확인일. 45바이트 내외 */
  placeOrderDate: Maybe<Scalars['String']['output']>;
  /** 발주 상태. 250바이트 내외 */
  placeOrderStatus: Maybe<Scalars['String']['output']>;
  /** 상품 종류(일반/추가 상품 구분). 250바이트 내외 */
  productClass: Maybe<Scalars['String']['output']>;
  /** 상품별 할인액 */
  productDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 채널 상품 번호. 150바이트 내외 */
  productId: Maybe<Scalars['String']['output']>;
  /** 상품별 즉시 할인 금액 */
  productImediateDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 상품별 복수 구매 할인 금액 */
  productMultiplePurchaseDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 상품명. 4000바이트 내외 */
  productName: Maybe<Scalars['String']['output']>;
  /** 상품 옵션(옵션명). 4000바이트 내외 */
  productOption: Maybe<Scalars['String']['output']>;
  /** 상품 주문 번호. 20바이트 내외 */
  productOrderId: Maybe<Scalars['String']['output']>;
  /** 상품 주문 상태. 250바이트 내외 */
  productOrderStatus: Maybe<Scalars['String']['output']>;
  /** 상품별 상품 할인 쿠폰 금액 */
  productProductDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 수량 */
  quantity: Maybe<Scalars['Int']['output']>;
  /** (구)판매 수수료 */
  saleCommission: Maybe<Scalars['Int']['output']>;
  /** 지역별 추가 배송비 */
  sectionDeliveryFee: Maybe<Scalars['Int']['output']>;
  /** 판매자 부담 할인액 */
  sellerBurdenDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 판매자 부담 상품 할인 쿠폰 금액 */
  sellerBurdenImediateDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 판매자 부담 복수 구매 할인 금액 */
  sellerBurdenMultiplePurchaseDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 판매자 부담 복수 구매 할인 타입 */
  sellerBurdenMultiplePurchaseDiscountType: Maybe<Scalars['String']['output']>;
  /** 판매자 부담 상품 할인 쿠폰 금액 */
  sellerBurdenProductDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 판매자 부담 스토어 할인 금액 */
  sellerBurdenStoreDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 판매자가 내부에서 사용하는 코드 */
  sellerCustomCode1: Maybe<Scalars['String']['output']>;
  /** 판매자가 내부에서 사용하는 코드 */
  sellerCustomCode2: Maybe<Scalars['String']['output']>;
  /** 판매자 상품 코드(판매자가 임의로 지정). 150바이트 내외 */
  sellerProductCode: Maybe<Scalars['String']['output']>;
  /** object (shippingAddress.pay-order-seller) */
  shippingAddress: Maybe<ShippingAddress>;
  /** 발송 기한. 45바이트 내외 */
  shippingDueDate: Maybe<Scalars['String']['output']>;
  /** 배송비 형태(선불/착불/무료). 250바이트 내외 */
  shippingFeeType: Maybe<Scalars['String']['output']>;
  /** 배송 메모. 4000바이트 내외 */
  shippingMemo: Maybe<Scalars['String']['output']>;
  /** object (address.pay-order-seller) */
  takingAddress: Maybe<TakingAddress>;
  /** 총 결제 금액(할인 적용 후 금액) */
  totalPaymentAmount: Maybe<Scalars['Int']['output']>;
  /** 상품 주문 금액(할인 적용 전 금액) */
  totalProductAmount: Maybe<Scalars['Int']['output']>;
  /** 상품 가격 */
  unitPrice: Maybe<Scalars['Int']['output']>;
};

export type ProductOrderLastChangeStatuses = {
  /** 클레임 상태 */
  claimStatus: Maybe<Scalars['String']['output']>;
  /** 클레임 구분 */
  claimType: Maybe<Scalars['String']['output']>;
  /** 선물 수락 상태 구분 */
  giftReceivingStatus: Maybe<Scalars['String']['output']>;
  /** 최종 변경 일시 */
  lastChangedDate: Maybe<Scalars['String']['output']>;
  /** 최종 변경 구분 */
  lastChangedType: Maybe<Scalars['String']['output']>;
  logiPackingId: Maybe<Scalars['Float']['output']>;
  /** 주문 ID */
  orderId: Maybe<Scalars['String']['output']>;
  /** 결제 일시 */
  paymentDate: Maybe<Scalars['String']['output']>;
  /** 상품 주문 ID */
  productOrderId: Maybe<Scalars['String']['output']>;
  /** 상품 주문 상태 */
  productOrderStatus: Maybe<Scalars['String']['output']>;
  /** 배송지 정보 변경 여부 */
  receiverAddressChanged: Maybe<Scalars['Boolean']['output']>;
};

/** 상품 주문 상태 */
export enum ProductOrderStatus {
  Canceled = 'CANCELED',
  CanceledByNopayment = 'CANCELED_BY_NOPAYMENT',
  Delivered = 'DELIVERED',
  Delivering = 'DELIVERING',
  Exchanged = 'EXCHANGED',
  Payed = 'PAYED',
  PaymentWaiting = 'PAYMENT_WAITING',
  PurchaseDecided = 'PURCHASE_DECIDED',
  Returned = 'RETURNED'
}

export enum ProductStatusType {
  Close = 'CLOSE',
  Delete = 'DELETE',
  Outofstock = 'OUTOFSTOCK',
  Prohibition = 'PROHIBITION',
  Rejection = 'REJECTION',
  Sale = 'SALE',
  Suspension = 'SUSPENSION',
  Unadmission = 'UNADMISSION',
  Wait = 'WAIT'
}

export type Query = {
  baljugoOrderCustomer: BaljugoOrderCustomerRespones;
  baljugoOrderCustomers: BaljugoOrderCustomersRespones;
  baljugoOrderCustomersHistory: BaljugoOrderCustomersRespones;
  baljugoPickingList: PickingListsRespones;
  baljugoPickingStickerList: BaljugoPickingStickerListRespones;
  centerEcountProductStatus: CenterProuductStatusResponse;
  centerProductOrders: Array<CenterProductOrdersRespone>;
  company: CompanyResponse;
  companyMember: UserQueryResponse;
  companyMembers: Array<User>;
  deliveryFeeSum: Scalars['Float']['output'];
  deliveryKGB: Scalars['JSON']['output'];
  depositSettles: Scalars['JSON']['output'];
  ecountInventoryStatus: Scalars['String']['output'];
  ecountInventoryStatusLocation: Scalars['String']['output'];
  ecountListInventoryStatus: Scalars['String']['output'];
  ecountProducts: Array<EcountProduct>;
  ecountViewProduct: Maybe<Scalars['String']['output']>;
  ecountViewProducts: Maybe<Scalars['String']['output']>;
  ecountZone: Maybe<Scalars['String']['output']>;
  ecountZoneTest: Maybe<Scalars['String']['output']>;
  fetchUpdatedOrders: Maybe<FetchUpdatedOrdersResponse>;
  generatePDF: Scalars['JSON']['output'];
  getBox: Scalars['JSON']['output'];
  getBoxes: Array<Box>;
  getCalendarDates: GetCalendarDateResponse;
  getCloudflareImgUrl: GetImageUploadUrlResponse;
  getCloudflareImgUrls: GetImageUploadUrLsResponse;
  getCompanies: GetCompaniesResponse;
  getCompany: CompanyResponse;
  getComponySearchList: GetComponySearchListResponse;
  getDeliveryPackagePrices: DeliveryPriceTagsResponse;
  getDeliveryPriceTags: DeliveryPriceTagsResponse;
  getEcountListInventoryStatusLocationTrends: EcountInventoryStatusLocationResponse;
  getEcountProfitMargins: EcountProfitMarginResponse;
  getEmailFromToken: FindEmailResponse;
  getImportOrder: GetImportOrderResponse;
  getImportOrders: ImportOrdersResponse;
  getImports: GetImportsResponse;
  getInventoryAtDate: Scalars['Float']['output'];
  getInventorySnapshot: Scalars['Float']['output'];
  getNaverOriginProducts: Scalars['String']['output'];
  getPackageBoxCost: Scalars['Float']['output'];
  getProductLocations: ProdLocationRespones;
  getRack: RackRespones;
  getRackST: RackRespones;
  getRacks: RacksRespones;
  getSavedEcountInventories: GetSavedEcountInventoriesResponse;
  getSavedEcountInventory: GetSavedEcountInventoryResponse;
  getScheduledUpdateIssues: Maybe<Array<OrederUpdateStatusTracker>>;
  getStockItem: StockItemRespones;
  getStockItems: StockItemsRespones;
  getStorageItemsQuantity: StorageItemsQuantityRespones;
  getTodos: TodosResponse;
  getUploadEcountSalesXLSX: Scalars['JSON']['output'];
  logiOrders: NaverProductOrderResponse;
  me: Maybe<User>;
  monthlyProductSale: MonthlyProductSaleResponse;
  monthlyProductSales: MonthlyProductSalesResponse;
  naverProductOrderIds: Maybe<NaverProductOrderIds>;
  naverProductOrders: Maybe<NaverProductOrdersQueryResponses>;
  naverProducts: Maybe<NaverProducts>;
  naverSettleCase: SettlesCaseResponse;
  naverSettles: SettlesDailyResponse;
  naverToken: Maybe<NaverTokenResponse>;
  orders: Array<NaverProductOrder>;
  packageBoxMapping: PackageBoxMappingsResponse;
  packageBoxes: PackageBoxesResponse;
  picking: Picking;
  pickings: Array<Picking>;
  productLocations: Array<ProductLocation>;
  productLoctions: Array<ProductLocationsRespons>;
  products: Array<Product>;
  sales: Array<CenterSale>;
  savedEcountProduct: EcountProduct;
  settles: Scalars['JSON']['output'];
  spcOrders: SpcOrdersResponse;
  spcProduct: SpcProductResponse;
  spcProducts: SpcProductsResponse;
  userLog: UserLogResponse;
  userLogs: Array<UserLog>;
  warehouseBoard: WarehouseBoardRespones;
  warehouseProducts: Array<EcountProduct>;
};


export type QueryBaljugoOrderCustomerArgs = {
  input: BaljugoCustomerOrderInput;
};


export type QueryBaljugoOrderCustomersHistoryArgs = {
  input: BaljugoOrderCustomersHistoryInput;
};


export type QueryBaljugoPickingListArgs = {
  input: PickingListInput;
};


export type QueryBaljugoPickingStickerListArgs = {
  input: PickingStickerListInput;
};


export type QueryCenterEcountProductStatusArgs = {
  storeCode: Scalars['String']['input'];
};


export type QueryCenterProductOrdersArgs = {
  input: NaverProductsDetailInput;
};


export type QueryCompanyArgs = {
  companyId: Scalars['String']['input'];
};


export type QueryCompanyMemberArgs = {
  userId: Scalars['String']['input'];
};


export type QueryDeliveryFeeSumArgs = {
  input: StartEndDateInput;
};


export type QueryDeliveryKgbArgs = {
  input: DeliveryKgbInput;
};


export type QueryDepositSettlesArgs = {
  input: SettleInput;
};


export type QueryEcountViewProductArgs = {
  productCode: Scalars['String']['input'];
};


export type QueryEcountViewProductsArgs = {
  productType: EcountProductType;
};


export type QueryGetBoxArgs = {
  input: GetBoxCostInput;
};


export type QueryGetCalendarDatesArgs = {
  input: GetCalendarDatesInput;
};


export type QueryGetCloudflareImgUrlsArgs = {
  filesSize: Scalars['Float']['input'];
};


export type QueryGetCompanyArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetDeliveryPackagePricesArgs = {
  input: GetDeliveryPackagePricesInput;
};


export type QueryGetDeliveryPriceTagsArgs = {
  deliveryCompany: Scalars['String']['input'];
};


export type QueryGetEcountListInventoryStatusLocationTrendsArgs = {
  input: EcountInventoryStatusLocationInput;
};


export type QueryGetEmailFromTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryGetImportOrderArgs = {
  importOrderId: Scalars['String']['input'];
};


export type QueryGetImportOrdersArgs = {
  input: ImportOrdersInput;
};


export type QueryGetImportsArgs = {
  input: GetImportsInput;
};


export type QueryGetNaverOriginProductsArgs = {
  originProudctNo: Scalars['String']['input'];
};


export type QueryGetPackageBoxCostArgs = {
  input: GetPackageBoxCostInput;
};


export type QueryGetProductLocationsArgs = {
  input: GetProductLocationsInput;
};


export type QueryGetRackArgs = {
  input: GetRackInput;
};


export type QueryGetRackStArgs = {
  input: GetRackInput;
};


export type QueryGetRacksArgs = {
  input: GetRacksInput;
};


export type QueryGetSavedEcountInventoryArgs = {
  productCode: Scalars['String']['input'];
};


export type QueryGetStockItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetStockItemsArgs = {
  input: GetStockItemsInput;
};


export type QueryGetStorageItemsQuantityArgs = {
  recodedDate: Scalars['String']['input'];
};


export type QueryGetTodosArgs = {
  input: InputMaybe<GetTodosInput>;
};


export type QueryGetUploadEcountSalesXlsxArgs = {
  input: StartEndDateInput;
};


export type QueryLogiOrdersArgs = {
  input: NaverProductOrderLastStatuesInput;
};


export type QueryMonthlyProductSaleArgs = {
  productCode: Scalars['String']['input'];
};


export type QueryMonthlyProductSalesArgs = {
  month: Array<Scalars['String']['input']>;
};


export type QueryNaverProductOrderIdsArgs = {
  input: NaverProductOrderIdsInput;
};


export type QueryNaverProductOrdersArgs = {
  input: NaverProductOrdersInput;
};


export type QueryNaverProductsArgs = {
  input: NaverPruductsInput;
};


export type QueryNaverSettleCaseArgs = {
  input: SettleCaseInput;
};


export type QueryNaverSettlesArgs = {
  input: SettlesDailyInput;
};


export type QueryOrdersArgs = {
  input: OrdersInput;
};


export type QuerySalesArgs = {
  input: StartEndDateInput;
};


export type QuerySavedEcountProductArgs = {
  input: SavedEcountProductInput;
};


export type QuerySettlesArgs = {
  input: SettleInput;
};


export type QuerySpcOrdersArgs = {
  input: SpcOrdersInput;
};


export type QuerySpcProductArgs = {
  input: GetSpcProudctInput;
};


export type QueryUserLogArgs = {
  action: Scalars['String']['input'];
};


export type QueryUserLogsArgs = {
  input: UserLogsInput;
};

export type Rack = {
  ExitDirection: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  location: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  stockItems: Maybe<Array<StockItem>>;
  type: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type RackRespones = {
  errors: Maybe<Array<FatchError>>;
  rack: Maybe<Rack>;
  stockItems: Maybe<Array<StockItem>>;
  totalQuantities: Maybe<Array<TotalQuantity>>;
};

export type RacksRespones = {
  errors: Maybe<Array<FatchError>>;
  racks: Maybe<Array<Rack>>;
};

export type Return = {
  /** 반품 배송비 청구액 */
  claimDeliveryFeeDemandAmount: Maybe<Scalars['Int']['output']>;
  /** 반품 배송비 할인액 */
  claimDeliveryFeeDiscountAmount: Maybe<Scalars['Int']['output']>;
  /** 반품 배송비 결제 수단 */
  claimDeliveryFeePayMeans: Maybe<Scalars['String']['output']>;
  /** 반품 배송비 결제 방법 */
  claimDeliveryFeePayMethod: Maybe<Scalars['String']['output']>;
  /** 반품 배송비 묶음 청구 상품 주문 번호(여러 개면 쉼표로 구분) */
  claimDeliveryFeeProductOrderIds: Maybe<Scalars['String']['output']>;
  /** 클레임 요청일 */
  claimRequestDate: Maybe<Scalars['String']['output']>;
  /** 클레임 상태 */
  claimStatus: Maybe<Scalars['String']['output']>;
  /** 수거 주소 */
  collectAddress: Maybe<NaverAddress>;
  /** 수거 완료일 */
  collectCompletedDate: Maybe<Scalars['String']['output']>;
  /** 택배사 코드 */
  collectDeliveryCompany: Maybe<Scalars['String']['output']>;
  /** 배송 방법 코드 */
  collectDeliveryMethod: Maybe<Scalars['String']['output']>;
  /** 수거 상태 */
  collectStatus: Maybe<Scalars['String']['output']>;
  /** 수거 송장 번호 */
  collectTrackingNumber: Maybe<Scalars['String']['output']>;
  /** 기타 비용 청구액 */
  etcFeeDemandAmount: Maybe<Scalars['Int']['output']>;
  /** 기타 비용 결제 수단 */
  etcFeePayMeans: Maybe<Scalars['String']['output']>;
  /** 기타 비용 결제 방법 */
  etcFeePayMethod: Maybe<Scalars['String']['output']>;
  /** 보류 설정일 */
  holdbackConfigDate: Maybe<Scalars['String']['output']>;
  /** 보류 설정자(구매자/판매자/관리자/시스템) */
  holdbackConfigurer: Maybe<Scalars['String']['output']>;
  /** 보류 상세 사유 */
  holdbackDetailedReason: Maybe<Scalars['String']['output']>;
  /** 보류 유형 */
  holdbackReason: Maybe<Scalars['String']['output']>;
  /** 보류 해제일 */
  holdbackReleaseDate: Maybe<Scalars['String']['output']>;
  /** 보류 해제자(구매자/판매자/관리자/시스템) */
  holdbackReleaser: Maybe<Scalars['String']['output']>;
  /** 보류 상태 */
  holdbackStatus: Maybe<Scalars['String']['output']>;
  /** 환불 예정일 */
  refundExpectedDate: Maybe<Scalars['String']['output']>;
  /** 환불 대기 사유 */
  refundStandbyReason: Maybe<Scalars['String']['output']>;
  /** 환불 대기 상태 */
  refundStandbyStatus: Maybe<Scalars['String']['output']>;
  /** 반품 도서산간 배송비 */
  remoteAreaCostChargeAmount: Maybe<Scalars['Int']['output']>;
  /** 접수 채널 */
  requestChannel: Maybe<Scalars['String']['output']>;
  /** 반품 완료일 */
  returnCompletedDate: Maybe<Scalars['String']['output']>;
  /** 반품 상세 사유 */
  returnDetailedReason: Maybe<Scalars['String']['output']>;
  /** 클레임 요청 사유 */
  returnReason: Maybe<Scalars['String']['output']>;
  /** 반품 주소 */
  returnReceiveAddress: Maybe<NaverAddress>;
};

/** 사용자 권한 설정 */
export enum Role {
  Accounting = 'ACCOUNTING',
  Admin = 'ADMIN',
  Business = 'BUSINESS',
  Design = 'DESIGN',
  Development = 'DEVELOPMENT',
  Guest = 'GUEST',
  Logistics = 'LOGISTICS',
  Management = 'MANAGEMENT',
  Planning = 'PLANNING',
  Sales = 'SALES',
  Transit = 'TRANSIT'
}

/** The Order model */
export type SpcOrder = {
  _id: Scalars['ID']['output'];
  /** 기본단위 */
  basicUnit: Maybe<Scalars['String']['output']>;
  calendarDate: CalendarDate;
  canceled: Maybe<Scalars['Boolean']['output']>;
  /** 마감여부 */
  closingStatus: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** 생성일자 */
  creationDate: Maybe<Scalars['String']['output']>;
  /** 생성시간 */
  creationTime: Maybe<Scalars['String']['output']>;
  /** 생성자 */
  creator: Maybe<Scalars['String']['output']>;
  /** 생성자명 */
  creatorName: Maybe<Scalars['String']['output']>;
  /** 삭제여부 */
  deletionStatus: Maybe<Scalars['String']['output']>;
  directQuantityBOX: Maybe<Scalars['Float']['output']>;
  directQuantityEA: Maybe<Scalars['Float']['output']>;
  /** 입고예정일자 */
  expectedReceiptDate: Maybe<Scalars['String']['output']>;
  /** 입수량 */
  inputQuantity: Maybe<Scalars['Float']['output']>;
  isDirect: Maybe<Scalars['Boolean']['output']>;
  /** 담당자 */
  manager: Maybe<Scalars['String']['output']>;
  /** 담당자구분 */
  managerType: Maybe<Scalars['String']['output']>;
  /** 수정일자 */
  modificationDate: Maybe<Scalars['String']['output']>;
  /** 수정시간 */
  modificationTime: Maybe<Scalars['String']['output']>;
  /** 수정자 */
  modifier: Maybe<Scalars['String']['output']>;
  /** 수정자명 */
  modifierName: Maybe<Scalars['String']['output']>;
  /** 발주변경일자 */
  orderChangeDate: Maybe<Scalars['String']['output']>;
  /** 각 공급자에게 게시 */
  orderPosted: Maybe<Scalars['Boolean']['output']>;
  /** 발주수량(BOX) */
  orderQuantityBOX: Maybe<Scalars['Float']['output']>;
  /** 발주수량(EA) */
  orderQuantityEA: Maybe<Scalars['Float']['output']>;
  /** 발주등록일자 */
  orderRegistrationDate: Maybe<Scalars['String']['output']>;
  /** 발주서비고 */
  orderRemark: Maybe<Scalars['String']['output']>;
  /** 발주전송번호 */
  orderTransferNumber: Maybe<Scalars['String']['output']>;
  /** 발주자이메일 */
  ordererEmail: Maybe<Scalars['String']['output']>;
  /** 발주자팩스번호 */
  ordererFaxNumber: Maybe<Scalars['String']['output']>;
  /** 발주자내선번호 */
  ordererInternalNumber: Maybe<Scalars['String']['output']>;
  /** 발주자명 */
  ordererName: Maybe<Scalars['String']['output']>;
  /** 발주자전화번호 */
  ordererPhoneNumber: Maybe<Scalars['String']['output']>;
  /** 상품코드 */
  productCode: Maybe<Scalars['String']['output']>;
  /** 상품명 */
  productName: Maybe<Scalars['String']['output']>;
  /** 상품규격 */
  productSpecification: Maybe<Scalars['String']['output']>;
  /** 결과메세지 */
  resultMessage: Maybe<Scalars['String']['output']>;
  /** 보관방법 */
  storageMethod: Maybe<Scalars['String']['output']>;
  /** 전송횟수 */
  transmissionCount: Maybe<Scalars['Float']['output']>;
  /** 전송일자 */
  transmissionDate: Maybe<Scalars['String']['output']>;
  /** 전송여부 */
  transmissionStatus: Maybe<Scalars['String']['output']>;
  /** 전송시간 */
  transmissionTime: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SpcOrdersResponse = {
  errors: Maybe<Array<FatchError>>;
  orders: Maybe<Array<SpcOrder>>;
};

export type SpcProduct = {
  _id: Scalars['ID']['output'];
  companyCode: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  productCode: Maybe<Scalars['String']['output']>;
  productName: Maybe<Scalars['String']['output']>;
  spcExclusive: Maybe<Scalars['Boolean']['output']>;
  spcProductCode: Maybe<Scalars['String']['output']>;
  spcProductName: Maybe<Scalars['String']['output']>;
  spcProductSize: Maybe<Scalars['String']['output']>;
  spcProductUnit: Maybe<Scalars['String']['output']>;
  storage: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SpcProductResponse = {
  errors: Maybe<Array<FatchError>>;
  spcProduct: Maybe<SpcProduct>;
};

export type SpcProductsResponse = {
  errors: Maybe<Array<FatchError>>;
  spcProducts: Maybe<Array<SpcProduct>>;
};

export type SavedDeliveryFeeRespones = {
  deliveredDate: Maybe<Scalars['Float']['output']>;
  deliveryCompany: Maybe<Scalars['String']['output']>;
  fee: Maybe<Scalars['Float']['output']>;
  orderName: Maybe<Scalars['String']['output']>;
  productOrderId: Maybe<Scalars['String']['output']>;
  trackingNumber: Maybe<Scalars['String']['output']>;
};

export type SavedEcountProductInput = {
  productCode: Scalars['String']['input'];
};

export type SetOrderArrivalLocationInput = {
  /** 주문점 코드 */
  arrivalLocation: Array<OrderCodeLocationType>;
};

export type SetOrderArrivalLocationRespones = {
  error: Maybe<FatchError>;
  ok: Scalars['Boolean']['output'];
};

export type SetPackageBoxInput = {
  boxId: Scalars['String']['input'];
  productCode: Scalars['String']['input'];
};

export type SetSpcProdCodeMappingInput = {
  ProductName: InputMaybe<Scalars['String']['input']>;
  productCode: InputMaybe<Scalars['String']['input']>;
  spcExclusive: Scalars['Boolean']['input'];
  spcProdId: Scalars['String']['input'];
};

export type SetSpcProdCodeMappingResponse = {
  errors: Maybe<Array<FatchError>>;
  ok: Maybe<Scalars['Boolean']['output']>;
};

export type SettleCase = {
  elements: Maybe<Array<SttleCaseElement>>;
  pagination: Maybe<Pagination>;
};

export type SettleCaseInput = {
  orderId: InputMaybe<Scalars['String']['input']>;
  pageNum: Scalars['Float']['input'];
  pageSize: Scalars['Float']['input'];
  periodType: InputMaybe<PeriodType>;
  productOrderId: InputMaybe<Scalars['String']['input']>;
  searchDate: InputMaybe<Scalars['String']['input']>;
  settleDecisionType: InputMaybe<SettleDecisionType>;
  settleType: InputMaybe<SettleType>;
};

export type SettleDaily = {
  elements: Maybe<Array<SettleDailyElement>>;
  pagination: Maybe<Pagination>;
};

export type SettleDailyElement = {
  /** 계좌 번호 */
  accountNo: Maybe<Scalars['String']['output']>;
  /** 은행 */
  bankType: Maybe<Scalars['String']['output']>;
  /** 혜택 정산 금액 */
  benefitSettleAmount: Maybe<Scalars['Float']['output']>;
  /** 수수료 정산 금액 */
  commissionSettleAmount: Maybe<Scalars['Float']['output']>;
  /** 공제 환급 정산 금액 */
  deductionRestoreSettleAmount: Maybe<Scalars['Float']['output']>;
  /** 예금주 */
  depositorName: Maybe<Scalars['String']['output']>;
  /** 차액 정산 금액 */
  differenceSettleAmount: Maybe<Scalars['Float']['output']>;
  /** 가맹점 ID */
  merchantId: Maybe<Scalars['String']['output']>;
  /** 가맹점명 */
  merchantName: Maybe<Scalars['String']['output']>;
  /** 마이너스 충전금 상계 금액 */
  minusChargeAmount: Maybe<Scalars['Float']['output']>;
  /** 지급 보류 금액 */
  payHoldbackAmount: Maybe<Scalars['Float']['output']>;
  /** 결제 정산 금액 */
  paySettleAmount: Maybe<Scalars['Float']['output']>;
  /** 빠른정산 금액 */
  quickSettleAmount: Maybe<Scalars['Float']['output']>;
  /** 반품안심케어 정산 금액 */
  returnCareSettleAmount: Scalars['Float']['output'];
  /** 정산 금액 */
  settleAmount: Maybe<Scalars['Float']['output']>;
  /** 정산 기준 종료일 */
  settleBasisEndDate: Maybe<Scalars['String']['output']>;
  /** 정산 기준 시작일 */
  settleBasisStartDate: Maybe<Scalars['String']['output']>;
  /** 정산 완료일 */
  settleCompleteDate: Maybe<Scalars['String']['output']>;
  /** 정산 예정일 */
  settleExpectDate: Maybe<Scalars['String']['output']>;
  /** 정산 방법 */
  settleMethodType: Maybe<SettleMethodType>;
};

/** 결제일 구분 */
export enum SettleDecisionType {
  BeforeCancel = 'BEFORE_CANCEL',
  Settled = 'SETTLED',
  Unsettled = 'UNSETTLED'
}

export type SettleInput = {
  endDate: Scalars['Float']['input'];
  startDate: Scalars['Float']['input'];
};

export enum SettleMethodType {
  Account = 'ACCOUNT',
  ChargeAmt = 'CHARGE_AMT'
}

/** 정산 구분(periodType 값이 SETTLE_CASEBYCASE_PAY_DATE이 아닌 경우) */
export enum SettleType {
  NormalSettleAfterCancel = 'NORMAL_SETTLE_AFTER_CANCEL',
  NormalSettleBeforeCancel = 'NORMAL_SETTLE_BEFORE_CANCEL',
  NormalSettleOriginal = 'NORMAL_SETTLE_ORIGINAL',
  QuantityCancelDeduction = 'QUANTITY_CANCEL_DEDUCTION',
  QuantityCancelRestore = 'QUANTITY_CANCEL_RESTORE',
  QuickSettleCancel = 'QUICK_SETTLE_CANCEL',
  QuickSettleOriginal = 'QUICK_SETTLE_ORIGINAL'
}

export type SettlesCaseResponse = {
  errors: Maybe<Array<FieldError>>;
  settles: Maybe<SettleCase>;
};

export type SettlesDailyInput = {
  endDate: Scalars['String']['input'];
  pageNum: Scalars['Float']['input'];
  pageSize: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
};

export type SettlesDailyResponse = {
  errors: Maybe<Array<FieldError>>;
  settles: Maybe<SettleDaily>;
};

export type ShippingAddress = {
  /** 배송지 타입. 250바이트 내외 */
  addressType: Maybe<Scalars['String']['output']>;
  /** 기본 주소. 300바이트 내외 */
  baseAddress: Maybe<Scalars['String']['output']>;
  /** 도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외 */
  city: Maybe<Scalars['String']['output']>;
  /** 국가. 45바이트 내외 */
  country: Maybe<Scalars['String']['output']>;
  /** 상세 주소. 300바이트 내외 */
  detailedAddress: Maybe<Scalars['String']['output']>;
  /** 출입 방법. 250바이트 내외 */
  entryMethod: Maybe<Scalars['String']['output']>;
  /** 출입 방법. 300바이트 내외 */
  entryMethodContent: Maybe<Scalars['String']['output']>;
  /** 도로명 주소 여부. 8바이트 내외 */
  isRoadNameAddress: Maybe<Scalars['Boolean']['output']>;
  /** 이름. 150바이트 내외 */
  name: Maybe<Scalars['String']['output']>;
  /** 수령 위치. 300바이트 내외 */
  pickupLocationContent: Maybe<Scalars['String']['output']>;
  /** 수령 위치. 250바이트 내외 */
  pickupLocationType: Maybe<Scalars['String']['output']>;
  /** 주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외 */
  state: Maybe<Scalars['String']['output']>;
  /** 연락처 1. 45바이트 내외 */
  tel1: Maybe<Scalars['String']['output']>;
  /** 연락처 2. 45바이트 내외 */
  tel2: Maybe<Scalars['String']['output']>;
  /** 우편번호. 45바이트 내외 */
  zipCode: Maybe<Scalars['String']['output']>;
};

/** 정렬 순서 */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortFieldInfo = {
  /** 정렬 순서 */
  direction: SortDirection;
  /** 필드 이름 */
  name: Scalars['String']['output'];
};

export type SortInfo = {
  /** 정렬 적용 필드 정보 */
  fields: Maybe<Array<SortFieldInfo>>;
  /** 데이터 정렬 적용 여부 */
  sorted: Scalars['Boolean']['output'];
};

export type SortingStockItemInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  isPicking: InputMaybe<Scalars['Boolean']['input']>;
  productCode: Scalars['String']['input'];
  quantity: InputMaybe<Scalars['Float']['input']>;
  sortedQuantity: InputMaybe<Scalars['Float']['input']>;
};

export type SpcOrdersInput = {
  calendarDateId: Scalars['String']['input'];
};

export type StartEndDateInput = {
  endDate: Scalars['Float']['input'];
  startDate: Scalars['Float']['input'];
};

export type StockItem = {
  _id: Scalars['ID']['output'];
  accumulatedSalesEstimate: Maybe<Scalars['Float']['output']>;
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  ecountInventory: Maybe<Scalars['Float']['output']>;
  ecountProduct: Maybe<EcountProduct>;
  ecountProductCode: Maybe<Scalars['String']['output']>;
  /** 입고 수량 */
  enterQuantity: Maybe<Scalars['Float']['output']>;
  expirationDate: Maybe<Scalars['String']['output']>;
  isDeleted: Maybe<Scalars['Boolean']['output']>;
  isPicking: Maybe<Scalars['Boolean']['output']>;
  isSorting: Maybe<Scalars['Boolean']['output']>;
  lastProdInventory: Maybe<Scalars['Float']['output']>;
  name: Maybe<Scalars['String']['output']>;
  palletCode: Maybe<Scalars['String']['output']>;
  qrcode: Maybe<Scalars['String']['output']>;
  quantity: Maybe<Scalars['Float']['output']>;
  quantityOfEach: Maybe<Scalars['Float']['output']>;
  rackId: Maybe<Scalars['String']['output']>;
  rackLocation: Maybe<Scalars['String']['output']>;
  recorder: Maybe<User>;
  registerInpector: Maybe<User>;
  /** 보충 정보 */
  replenishment: Maybe<Scalars['JSON']['output']>;
  timestamp: Maybe<Scalars['DateTime']['output']>;
  totalQuantity: Maybe<Scalars['Float']['output']>;
  totalQuantityOfEach: Maybe<Scalars['Float']['output']>;
  warehousingDate: Maybe<Scalars['String']['output']>;
};

export type StockItemInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  enterQuantity: InputMaybe<Scalars['Float']['input']>;
  expirationDate: InputMaybe<Scalars['String']['input']>;
  isDeleted: InputMaybe<Scalars['Boolean']['input']>;
  isPicking: InputMaybe<Scalars['Boolean']['input']>;
  isSorting: InputMaybe<Scalars['Boolean']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  palletCode: InputMaybe<Scalars['String']['input']>;
  productCode: Scalars['String']['input'];
  qrcode: InputMaybe<Scalars['String']['input']>;
  quantity: InputMaybe<Scalars['Float']['input']>;
  quantityOfEach: InputMaybe<Scalars['Float']['input']>;
  rackId: Scalars['String']['input'];
  rackLocation: InputMaybe<Scalars['String']['input']>;
  sortedQuantity: InputMaybe<Scalars['Float']['input']>;
  warehousingDate: InputMaybe<Scalars['String']['input']>;
};

export type StockItemRespones = {
  errors: Maybe<Array<FatchError>>;
  stockItem: Maybe<StockItem>;
};

export type StockItemUpdateInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  enterQuantity: InputMaybe<Scalars['Float']['input']>;
  expirationDate: InputMaybe<Scalars['String']['input']>;
  isDeleted: InputMaybe<Scalars['Boolean']['input']>;
  isPicking: InputMaybe<Scalars['Boolean']['input']>;
  isSorting: InputMaybe<Scalars['Boolean']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  palletCode: InputMaybe<Scalars['String']['input']>;
  productCode: Scalars['String']['input'];
  qrcode: InputMaybe<Scalars['String']['input']>;
  quantity: InputMaybe<Scalars['Float']['input']>;
  quantityOfEach: InputMaybe<Scalars['Float']['input']>;
  rackId: Scalars['String']['input'];
  rackLocation: InputMaybe<Scalars['String']['input']>;
  sortedQuantity: InputMaybe<Scalars['Float']['input']>;
  stockId: Scalars['String']['input'];
  warehousingDate: InputMaybe<Scalars['String']['input']>;
};

export type StockItemsRespones = {
  errors: Maybe<Array<FatchError>>;
  stockItems: Maybe<Array<StockItem>>;
};

export type StorageItemsQuantity = {
  _id: Scalars['ID']['output'];
  description: Maybe<Scalars['String']['output']>;
  location: Maybe<Scalars['String']['output']>;
  nickname: Maybe<Scalars['String']['output']>;
  productCode: Maybe<Scalars['String']['output']>;
  quantity: Maybe<Scalars['Float']['output']>;
  recodedDate: Maybe<Scalars['String']['output']>;
  recoder: Maybe<Scalars['String']['output']>;
  sizeDES: Maybe<Scalars['String']['output']>;
  storage: Maybe<Scalars['String']['output']>;
  unit: Maybe<Scalars['String']['output']>;
};

export type StorageItemsQuantityRespones = {
  errors: Maybe<Array<FieldError>>;
  itemsQuantities: Maybe<Array<StorageItemsQuantity>>;
};

export type StoreProductCtrl = {
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  productCode: Scalars['String']['output'];
  productDisplayRequest: Scalars['String']['output'];
  profitMargin: Scalars['Float']['output'];
  storeCode: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** 스토어 상태표시 */
export enum StoreStatus {
  Close = 'CLOSE',
  Delete = 'DELETE',
  None = 'NONE',
  Outofstock = 'OUTOFSTOCK',
  Prohibition = 'PROHIBITION',
  Rejection = 'REJECTION',
  Sale = 'SALE',
  Suspension = 'SUSPENSION',
  Unadmission = 'UNADMISSION',
  Wait = 'WAIT'
}

export type SttleCaseElement = {
  /** 헤택 금액 */
  benefitSettleAmount: Scalars['Float']['output'];
  /** 계약 번호 */
  contractNo: Maybe<Scalars['String']['output']>;
  /** 판매자 부담 무이자 할부 수수료 */
  freeInstallmentCommissionAmount: Maybe<Scalars['Float']['output']>;
  /** 가맹점 ID */
  merchantId: Maybe<Scalars['String']['output']>;
  /** 가맹점명 */
  merchantName: Maybe<Scalars['String']['output']>;
  /** 주문 번호 */
  orderId: Maybe<Scalars['String']['output']>;
  /** 결제 정산 금액 */
  paySettleAmount: Scalars['Float']['output'];
  /** 상품 번호 */
  productId: Maybe<Scalars['String']['output']>;
  /** 상품명 */
  productName: Maybe<Scalars['String']['output']>;
  /** 상품 주문 번호 */
  productOrderId: Maybe<Scalars['String']['output']>;
  /** 정산 대상 구분 */
  productOrderType: Scalars['String']['output'];
  /** 구매자명 */
  purchaserName: Maybe<Scalars['String']['output']>;
  /** 매출 연동 수수료 */
  sellingInterlockCommissionAmount: Maybe<Scalars['Float']['output']>;
  /** 정산 기준일 */
  settleBasisDate: Maybe<Scalars['String']['output']>;
  /** 정산 완료일 */
  settleCompleteDate: Maybe<Scalars['String']['output']>;
  /** 정산 예정 금액 */
  settleExpectAmount: Scalars['Float']['output'];
  /** 정산 예정일 */
  settleExpectDate: Maybe<Scalars['String']['output']>;
  /** 정산 상태 */
  settleType: Maybe<SettleType>;
  /** 총 네이버페이 관리 수수료 금액 */
  totalPayCommissionAmount: Maybe<Scalars['Float']['output']>;
};

export type SuccessProductOrderIds = {
  isReceiverAddressChanged: Maybe<Scalars['Boolean']['output']>;
  productOrderId: Maybe<Scalars['String']['output']>;
};

export type TakingAddress = {
  /** 배송지 타입. 250바이트 내외 */
  addressType: Maybe<Scalars['String']['output']>;
  /** 기본 주소. 300바이트 내외 */
  baseAddress: Maybe<Scalars['String']['output']>;
  /** 도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외 */
  city: Maybe<Scalars['String']['output']>;
  /** 국가. 45바이트 내외 */
  country: Maybe<Scalars['String']['output']>;
  /** 상세 주소. 300바이트 내외 */
  detailedAddress: Maybe<Scalars['String']['output']>;
  /** 도로명 주소 여부. 8바이트 내외 */
  isRoadNameAddress: Maybe<Scalars['Boolean']['output']>;
  /** 이름. 150바이트 내외 */
  name: Maybe<Scalars['String']['output']>;
  /** 주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외 */
  state: Maybe<Scalars['String']['output']>;
  /** 연락처 1. 45바이트 내외 */
  tel1: Maybe<Scalars['String']['output']>;
  /** 연락처 2. 45바이트 내외 */
  tel2: Maybe<Scalars['String']['output']>;
  /** 우편번호. 45바이트 내외 */
  zipCode: Maybe<Scalars['String']['output']>;
};

export type Todo = {
  _id: Maybe<Scalars['ID']['output']>;
  assignedTo: Maybe<User>;
  attachments: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  dueDate: Maybe<Scalars['DateTime']['output']>;
  isCompleted: Maybe<Scalars['Boolean']['output']>;
  isRecurring: Maybe<Scalars['Boolean']['output']>;
  modelItemId: Maybe<Scalars['String']['output']>;
  modelName: Maybe<TodoQueryNameType>;
  notes: Maybe<Scalars['String']['output']>;
  parentTodo: Maybe<Todo>;
  priority: Maybe<Priority>;
  project: Maybe<Scalars['String']['output']>;
  recurrencePattern: Maybe<Scalars['String']['output']>;
  tags: Maybe<Array<Scalars['String']['output']>>;
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

/** todo 쿼리이름 */
export enum TodoQueryNameType {
  ImportOrder = 'IMPORT_ORDER'
}

export type TodosResponse = {
  error: Maybe<FatchError>;
  hasMore: Scalars['Boolean']['output'];
  todos: Array<Todo>;
  totalCount: Scalars['Int']['output'];
};

export type TotalQuantity = {
  ecountInventory: Scalars['Float']['output'];
  lastProdInventory: Scalars['Float']['output'];
  productCode: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  quantityOfEach: Scalars['Float']['output'];
};

export type UpdateCalendarDateInput = {
  date: InputMaybe<Scalars['DateTime']['input']>;
  dueDate: InputMaybe<Scalars['DateTime']['input']>;
  endDate: InputMaybe<Scalars['DateTime']['input']>;
  finalDate: InputMaybe<Scalars['DateTime']['input']>;
  id: InputMaybe<Scalars['String']['input']>;
  job: InputMaybe<IndustryType>;
  location: InputMaybe<Scalars['String']['input']>;
  modelId: InputMaybe<Scalars['String']['input']>;
  state: InputMaybe<ImportStatus>;
  targetDate: InputMaybe<Scalars['DateTime']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCalendarDateResponse = {
  error: Maybe<FatchError>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateMemberResponse = {
  errors: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateOrderMissedPeriodsInput = {
  _id: Scalars['String']['input'];
  ignore: InputMaybe<Scalars['Boolean']['input']>;
  updated: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateSpcOrderInput = {
  canceled: InputMaybe<Scalars['Boolean']['input']>;
  directQuantityBOX: InputMaybe<Scalars['Float']['input']>;
  directQuantityEA: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  isDirect: InputMaybe<Scalars['Boolean']['input']>;
  orderPosted: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateSpcOrderResponse = {
  errors: Maybe<Array<FatchError>>;
  ok: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateStoreProductCtrlsInput = {
  id: Scalars['String']['input'];
  productCode: InputMaybe<Scalars['String']['input']>;
  productDisplayRequest: InputMaybe<ProductDisplayRequestType>;
  profitMargin: InputMaybe<Scalars['Float']['input']>;
  storeCod: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTodoInput = {
  description: InputMaybe<Scalars['String']['input']>;
  dueDate: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  isCompleted: InputMaybe<Scalars['Boolean']['input']>;
  priority: InputMaybe<Priority>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  title: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTodoResponse = {
  error: Maybe<FatchError>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateUserResponse = {
  errors: Maybe<Array<FatchError>>;
  ok: Scalars['Boolean']['output'];
};

export type UploadProductOrdersXlsxResponse = {
  errors: Maybe<FieldError>;
  result: Maybe<Scalars['String']['output']>;
};

export type UploadXlsxResponse = {
  errors: Maybe<FieldError>;
  ok: Maybe<Scalars['Boolean']['output']>;
  results: Maybe<Array<Scalars['String']['output']>>;
};

export type UpsertCompanyContactInput = {
  companyId: Scalars['String']['input'];
  id: InputMaybe<Scalars['String']['input']>;
  memo: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  nickName: InputMaybe<Scalars['String']['input']>;
  position: InputMaybe<Scalars['String']['input']>;
  thumbnail: InputMaybe<Scalars['String']['input']>;
};

export type UpsertCompanyContactResponse = {
  contact: Maybe<Contact>;
  errors: Maybe<FatchError>;
};

export type UpsertContactEmailInput = {
  contactId: Scalars['String']['input'];
  emails: InputMaybe<Array<EmailInput>>;
};

export type UpsertContactEmailResponse = {
  emails: Maybe<Array<Email>>;
  errors: Maybe<Array<FatchError>>;
};

export type UpsertContactPhoneInput = {
  contactId: Scalars['String']['input'];
  phones: InputMaybe<Array<PhoneInput>>;
};

export type UpsertContactPhoneResponse = {
  errors: Maybe<Array<FatchError>>;
  phones: Maybe<Array<Phone>>;
};

export type UpsertDeliveryPriceTagInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  boxId: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  endPriceDate: InputMaybe<Scalars['DateTime']['input']>;
  logiCompany: Scalars['String']['input'];
  price: InputMaybe<Scalars['Float']['input']>;
};

export type UpsertImportCompanyInput = {
  businesbRegistration: InputMaybe<Scalars['String']['input']>;
  companyName: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['String']['input']>;
  importOrderId: InputMaybe<Scalars['String']['input']>;
  logo: InputMaybe<Scalars['String']['input']>;
  nationality: InputMaybe<Scalars['String']['input']>;
  role: InputMaybe<Scalars['String']['input']>;
  sectors: InputMaybe<Scalars['String']['input']>;
};

export type UpsertImportItemInput = {
  USDPerKg: InputMaybe<Scalars['Float']['input']>;
  USDPerPack: InputMaybe<Scalars['Float']['input']>;
  amountUSD: InputMaybe<Scalars['Float']['input']>;
  arrivedQuantity: InputMaybe<Scalars['Float']['input']>;
  arrivedWeight: InputMaybe<Scalars['Float']['input']>;
  id: InputMaybe<Scalars['String']['input']>;
  importOrderId: InputMaybe<Scalars['String']['input']>;
  note: InputMaybe<Scalars['String']['input']>;
  priceUSD: InputMaybe<Scalars['Float']['input']>;
  priceUnit: InputMaybe<ImportPriceUnit>;
  productCode: InputMaybe<Scalars['String']['input']>;
  productDES: InputMaybe<Scalars['String']['input']>;
  quantity: InputMaybe<Scalars['Float']['input']>;
  sizeDES: InputMaybe<Scalars['String']['input']>;
  updatedQuantity: InputMaybe<Scalars['Float']['input']>;
  updatedWeight: InputMaybe<Scalars['Float']['input']>;
  weight: InputMaybe<Scalars['Float']['input']>;
};

export type UpsertImportItemResponse = {
  errors: Maybe<Array<FatchError>>;
  importItem: Maybe<ImportItem>;
};

export type UpsertImportOrderInput = {
  currency: InputMaybe<CurrencyType>;
  id: InputMaybe<Scalars['String']['input']>;
  isComplete: InputMaybe<Scalars['Boolean']['input']>;
  manufacturer: InputMaybe<Scalars['String']['input']>;
  status: InputMaybe<ImportStatus>;
};

export type UpsertImportOrderResponse = {
  errors: Maybe<Array<FatchError>>;
  importOrder: Maybe<ImportOrder>;
};

export type UpsertImportTodoInput = {
  assignedTo: InputMaybe<Array<Scalars['String']['input']>>;
  description: InputMaybe<Scalars['String']['input']>;
  dueDate: InputMaybe<Scalars['DateTime']['input']>;
  /** 관련 항목의 ID */
  modelItemId: InputMaybe<Scalars['String']['input']>;
  modelName: InputMaybe<TodoQueryNameType>;
  priority: InputMaybe<Priority>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  title: InputMaybe<Scalars['String']['input']>;
  todoId: InputMaybe<Scalars['String']['input']>;
};

export type UpsertImportTodoResponse = {
  error: Maybe<FatchError>;
  todo: Maybe<Todo>;
};

export type UpsertRackInput = {
  description: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: InputMaybe<Scalars['String']['input']>;
  stockItemIds: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  _email: Maybe<Scalars['String']['output']>;
  _id: Maybe<Scalars['ID']['output']>;
  company: Maybe<Company>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  department: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  isSecessed: Maybe<Scalars['Boolean']['output']>;
  nickname: Maybe<Scalars['String']['output']>;
  phoneNumber: Maybe<Scalars['String']['output']>;
  position: Maybe<Scalars['String']['output']>;
  roles: Maybe<Array<Role>>;
  thumbnail: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userSet: Maybe<Scalars['JSON']['output']>;
  username: Maybe<Scalars['String']['output']>;
};

export type UserLog = {
  _id: Scalars['ID']['output'];
  action: Scalars['String']['output'];
  details: Maybe<Scalars['JSON']['output']>;
  timestamp: Scalars['DateTime']['output'];
  userId: Maybe<User>;
};

export type UserQueryResponse = {
  errors: Maybe<Array<FatchError>>;
  user: Maybe<User>;
};

export type UserResponse = {
  errors: Maybe<Array<FieldError>>;
  user: Maybe<User>;
};

export type UserSecessionInput = {
  secessUserId: Scalars['String']['input'];
};

export type UsernamePasswordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: InputMaybe<Scalars['String']['input']>;
  roles: InputMaybe<Array<Role>>;
  username: Scalars['String']['input'];
};

export type WarehouseBoardRespones = {
  errors: Maybe<Array<FatchError>>;
  inventoryBOXSize: Maybe<Scalars['Float']['output']>;
  inventoryEAs: Maybe<Array<InventoryEaType>>;
  inventoryKg: Maybe<Scalars['Float']['output']>;
  inventoryPackSize: Maybe<Scalars['Float']['output']>;
  warehouseBoxSize: Maybe<Scalars['Float']['output']>;
  warehouseEASize: Maybe<Scalars['Float']['output']>;
};

export type Website = {
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type WebsiteInput = {
  description: InputMaybe<Scalars['String']['input']>;
  url: InputMaybe<Scalars['String']['input']>;
};

/** 수입품목 무게 */
export enum WeightUnit {
  Grams = 'GRAMS',
  Kilograms = 'KILOGRAMS',
  LongTons = 'LONG_TONS',
  MetricTons = 'METRIC_TONS',
  Ounces = 'OUNCES',
  Pounds = 'POUNDS',
  ShortTons = 'SHORT_TONS'
}

export type BaljugoPickingStickerListRespones = {
  error: Maybe<FatchError>;
  orders: Maybe<Array<BaljugoProductOrder>>;
};

export type CreateInventoryEcountResponese = {
  error: Maybe<FatchError>;
  total: Maybe<Scalars['Float']['output']>;
};

export type CreateProductInput = {
  packageCapacity: InputMaybe<Scalars['Float']['input']>;
  packageCapacityUnitType: InputMaybe<PackageCapacityUnitType>;
  packageDepth: InputMaybe<Scalars['Float']['input']>;
  packageType: InputMaybe<PackageType>;
  peaceType: InputMaybe<PackageType>;
  quantityInPackage: InputMaybe<Scalars['String']['input']>;
  sellerCode: Scalars['String']['input'];
  storageMethod: InputMaybe<Scalars['String']['input']>;
  storageType: InputMaybe<StorageType>;
};

export type DeleteBaljugoOrderInput = {
  customerCode: Scalars['String']['input'];
  deliveryDate: Scalars['String']['input'];
};

export type OrderStateRespones = {
  error: Maybe<FatchError>;
  result: Maybe<Array<Scalars['String']['output']>>;
};

export type RemoveImportOrdersInput = {
  id: InputMaybe<Scalars['String']['input']>;
  importOrderId: InputMaybe<Scalars['String']['input']>;
};

export enum StorageType {
  Frozen = 'FROZEN',
  Refrigerated = 'REFRIGERATED',
  RoomTemperature = 'ROOM_TEMPERATURE'
}

export type UpdateStoreProductCtrlsRespons = {
  _id: Maybe<Scalars['String']['output']>;
  productCode: Maybe<Scalars['String']['output']>;
  productDisplayRequest: Maybe<ProductDisplayRequestType>;
  profitMargin: Maybe<Scalars['Float']['output']>;
  storeCode: Maybe<Scalars['String']['output']>;
};

export type UpsertBoxInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  boxCost: Scalars['Float']['input'];
  boxName: Scalars['String']['input'];
  boxType: Scalars['String']['input'];
  description: Scalars['String']['input'];
};

export type UpsertBoxResponse = {
  box: Maybe<Box>;
  error: Maybe<FatchError>;
};

export type UserLogResponse = {
  errors: Maybe<Array<FatchError>>;
  log: Maybe<UserLog>;
};

export type UserLogsInput = {
  endDate: InputMaybe<Scalars['String']['input']>;
  limit: InputMaybe<Scalars['Float']['input']>;
  page: InputMaybe<Scalars['Float']['input']>;
  startDate: InputMaybe<Scalars['String']['input']>;
};

export type ProductDisplayRequestFragmentFragment = { productDisplayRequest: string };

export type RegularEcountProductFragment = { _id: string, createdAt: string, updatedAt: string, PROD_CD: string, PROD_DES: string, SIZE_FLAG: string, SIZE_DES: string, UNIT: string, PROD_TYPE: string, SET_FLAG: string, BAL_FLAG: string, WH_CD: string, IN_PRICE: number, IN_PRICE_VAT: string, OUT_PRICE: number, OUT_PRICE_VAT: string, REMARKS_WIN: string, CLASS_CD: string, CLASS_CD2: string, CLASS_CD3: string, BAR_CODE: string, VAT_YN: string, TAX: number, VAT_RATE_BY_BASE_YN: string, VAT_RATE_BY: number, CS_FLAG: string, REMARKS: string, INSPECT_TYPE_CD: string, INSPECT_STATUS: string, SAMPLE_PERCENT: number, CSORD_C0001: string, CSORD_TEXT: number, CSORD_C0003: string, IN_TERM: string, MIN_QTY: string, CUST: string, EXCH_RATE: string, DENO_RATE: string, OUT_PRICE1: number, OUT_PRICE1_VAT_YN: string, OUT_PRICE2: number, OUT_PRICE2_VAT_YN: string, OUT_PRICE3: number, OUT_PRICE3_VAT_YN: string, OUT_PRICE4: number, OUT_PRICE4_VAT_YN: string, OUT_PRICE5: number, OUT_PRICE5_VAT_YN: string, OUT_PRICE6: number, OUT_PRICE6_VAT_YN: string, OUT_PRICE7: number, OUT_PRICE7_VAT_YN: string, OUT_PRICE8: number, OUT_PRICE8_VAT_YN: string, OUT_PRICE9: number, OUT_PRICE9_VAT_YN: string, OUT_PRICE10: number, OUT_PRICE10_VAT_YN: string, OUTSIDE_PRICE: number, OUTSIDE_PRICE_VAT: string, LABOR_WEIGHT: number, EXPENSES_WEIGHT: number, MATERIAL_COST: number, EXPENSE_COST: number, LABOR_COST: number, OUT_COST: number, CONT1: string, CONT2: string, CONT3: string, CONT4: string, CONT5: string, CONT6: string, NO_USER1: number, NO_USER2: number, NO_USER3: number, NO_USER4: number, NO_USER5: number, NO_USER6: number, NO_USER7: number, NO_USER8: number, NO_USER9: number, NO_USER10: number, ITEM_TYPE: string, SERIAL_TYPE: string, PROD_SELL_TYPE: string, PROD_WHMOVE_TYPE: string, QC_BUY_TYPE: string, QC_YN: string };

export type RegularErrorFragment = { field: string, message: string };

export type RegularLoginResponseFragment = { errors: Array<{ field: string, message: string }>, user: { _id: string, username: string, email: string, _email: string, nickname: string, position: string, roles: Array<Role>, thumbnail: string } };

export type RegularStockItemFragment = { _id: string, isPicking: boolean, isSorting: boolean, isDeleted: boolean, timestamp: string, warehousingDate: string, expirationDate: string, qrcode: string, palletCode: string, enterQuantity: number, quantity: number, replenishment: any, quantityOfEach: number, ecountProductCode: string, name: string, description: string, rackLocation: string, rackId: string, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_DES: string, UNIT: string }, recorder: { _id: string, username: string } };

export type RegularUserFragment = { _id: string, username: string, email: string, _email: string, nickname: string, position: string, roles: Array<Role>, thumbnail: string };

export type RegularUserResponseFragment = { errors: Array<{ field: string, message: string }>, user: { _id: string, username: string, email: string, _email: string, nickname: string, position: string, roles: Array<Role>, thumbnail: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { _id: string, username: string, email: string, _email: string, nickname: string, position: string, roles: Array<Role>, thumbnail: string } };

export type AddTotalOrdersMutationVariables = Exact<{
  input: AddTotalOrdersInput;
}>;


export type AddTotalOrdersMutation = { addTotalOrders: { result: Array<string>, error: { query: string, message: string } } };

export type OrderStateMutationVariables = Exact<{
  input: PickingListInput;
}>;


export type OrderStateMutation = { orderState: { result: Array<string>, error: { query: string, message: string } } };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { changePassword: { errors: Array<{ field: string, message: string }>, user: { _id: string, username: string, email: string, _email: string, nickname: string, position: string, roles: Array<Role>, thumbnail: string } } };

export type EcountProductAllUpsertMutationVariables = Exact<{ [key: string]: never; }>;


export type EcountProductAllUpsertMutation = { ecountProductAllUpsert: boolean };

export type EmailVerifictionMutationVariables = Exact<{
  input: EmailVerifyInput;
}>;


export type EmailVerifictionMutation = { emailVerifiction: { errors: Array<{ field: string, message: string }> } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { login: { errors: Array<{ field: string, message: string }>, user: { _id: string, username: string, email: string, _email: string, nickname: string, position: string, roles: Array<Role>, thumbnail: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: boolean };

export type UploadBaljugoDispatchXlsxMutationVariables = Exact<{
  file: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
}>;


export type UploadBaljugoDispatchXlsxMutation = { uploadBaljugoDispatchXLSX: { ok: boolean, results: Array<string>, errors: { field: string, message: string } } };

export type UploadProductLocationXlsxMutationVariables = Exact<{
  file: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
}>;


export type UploadProductLocationXlsxMutation = { uploadProductLocationXLSX: { ok: boolean, results: Array<string>, errors: { field: string, message: string } } };

export type CreateStockItemMutationVariables = Exact<{
  input: StockItemInput;
}>;


export type CreateStockItemMutation = { createStockItem: { errors: Array<{ query: string, message: string }>, stockItem: { _id: string, isPicking: boolean, isSorting: boolean, isDeleted: boolean, timestamp: string, warehousingDate: string, expirationDate: string, qrcode: string, palletCode: string, enterQuantity: number, quantity: number, replenishment: any, quantityOfEach: number, ecountProductCode: string, name: string, description: string, rackLocation: string, rackId: string, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_DES: string, UNIT: string }, recorder: { _id: string, username: string } } } };

export type DeleteStockItemMutationVariables = Exact<{
  input: InvisivleStockItemInput;
}>;


export type DeleteStockItemMutation = { deleteStockItem: boolean };

export type InvisibleStockItemMutationVariables = Exact<{
  input: InvisivleStockItemInput;
}>;


export type InvisibleStockItemMutation = { invisibleStockItem: boolean };

export type ItemsToPickingMutationVariables = Exact<{
  input: SortingStockItemInput;
}>;


export type ItemsToPickingMutation = { itemsToPicking: { errors: Array<{ query: string, message: string }>, stockItem: Array<{ palletCode: string, name: string, isSorting: boolean, isPicking: boolean, replenishment: any, quantity: number }> } };

export type TransitStockItemMutationVariables = Exact<{
  input: InvisivleStockItemInput;
}>;


export type TransitStockItemMutation = { transitStockItem: boolean };

export type UpdateStockItemMutationVariables = Exact<{
  input: StockItemUpdateInput;
}>;


export type UpdateStockItemMutation = { updateStockItem: { errors: Array<{ query: string, message: string }>, stockItem: { _id: string, isPicking: boolean, isSorting: boolean, isDeleted: boolean, timestamp: string, warehousingDate: string, expirationDate: string, qrcode: string, palletCode: string, enterQuantity: number, quantity: number, replenishment: any, quantityOfEach: number, ecountProductCode: string, name: string, description: string, rackLocation: string, rackId: string, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_DES: string, UNIT: string }, recorder: { _id: string, username: string } } } };

export type UpsertRackMutationVariables = Exact<{
  input: UpsertRackInput;
}>;


export type UpsertRackMutation = { upsertRack: { errors: Array<{ query: string, message: string }>, rack: { _id: string, location: string, name: string, description: string, stockItems: Array<{ _id: string }> } } };

export type UpsertStockItemMutationVariables = Exact<{
  input: StockItemInput;
}>;


export type UpsertStockItemMutation = { upsertStockItem: { errors: Array<{ query: string, message: string }>, stockItem: { _id: string, isPicking: boolean, isSorting: boolean, isDeleted: boolean, timestamp: string, warehousingDate: string, expirationDate: string, qrcode: string, palletCode: string, enterQuantity: number, quantity: number, replenishment: any, quantityOfEach: number, ecountProductCode: string, name: string, description: string, rackLocation: string, rackId: string, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_DES: string, UNIT: string }, recorder: { _id: string, username: string } } } };

export type BaljugoOrderCustomerQueryVariables = Exact<{
  input: BaljugoCustomerOrderInput;
}>;


export type BaljugoOrderCustomerQuery = { baljugoOrderCustomer: { error: { query: string, message: string }, customerOrders: Array<{ _id: string, location: string, printedLabels: Array<string>, cancelLabels: Array<string>, totalAmount: number, productOrderStatus: FcProductOrderStatus, customerCode: string, customerName: string, nickName: string, productCode: string, orderCode: string, orderVersion: number, isModify: boolean, baljugoProductDES: string, ecountProductDES: string, warehouseProductDES: string, sizeDES: string, unit: string, storageMethod: string, orderDate: string, orderConfirmDate: string, deliveryRequestDate: string, dispatchDate: string, dispatchedDate: string, dispatchedSize: number, returnDate: string, returnSize: number, destinationLocation: string, quantity: number, productName: string }> } };

export type BaljugoOrderCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type BaljugoOrderCustomersQuery = { baljugoOrderCustomers: { baljugoCustomers: Array<{ customerCode: string, customerName: string, nickName: string, quantity: number, orderDate: string, dispatchDate: string, published: number, canceled: Array<string>, modified: Array<string>, added: Array<string>, totalAmount: number, customerAmount: number, destinationLocation: string }>, dailyOrders: Array<{ code: string, printedLabels: Array<string>, cancelLabels: Array<string>, productDES: string, size: number, location: string, inventory: number, unit: string }>, customerOrders: Array<{ customerCode: string, orders: Array<{ _id: string, location: string, printedLabels: Array<string>, cancelLabels: Array<string>, totalAmount: number, productOrderStatus: FcProductOrderStatus, customerCode: string, customerName: string, nickName: string, productCode: string, orderCode: string, orderVersion: number, isModify: boolean, baljugoProductDES: string, ecountProductDES: string, warehouseProductDES: string, sizeDES: string, unit: string, storageMethod: string, orderDate: string, orderConfirmDate: string, deliveryRequestDate: string, dispatchDate: string, dispatchedDate: string, dispatchedSize: number, returnDate: string, returnSize: number, destinationLocation: string, quantity: number, productName: string }> }> } };

export type BaljugoOrderCustomersHistoryQueryVariables = Exact<{
  input: BaljugoOrderCustomersHistoryInput;
}>;


export type BaljugoOrderCustomersHistoryQuery = { baljugoOrderCustomersHistory: { baljugoCustomers: Array<{ customerCode: string, customerName: string, nickName: string, quantity: number, orderDate: string, dispatchDate: string, published: number, totalAmount: number, destinationLocation: string }>, dailyOrders: Array<{ code: string, printedLabels: Array<string>, cancelLabels: Array<string>, productDES: string, size: number, location: string, inventory: number, unit: string }>, customerOrders: Array<{ customerCode: string, orders: Array<{ _id: string, location: string, printedLabels: Array<string>, cancelLabels: Array<string>, totalAmount: number, productOrderStatus: FcProductOrderStatus, customerCode: string, customerName: string, nickName: string, productCode: string, orderCode: string, orderVersion: number, isModify: boolean, baljugoProductDES: string, ecountProductDES: string, warehouseProductDES: string, sizeDES: string, unit: string, storageMethod: string, orderDate: string, orderConfirmDate: string, deliveryRequestDate: string, dispatchDate: string, dispatchedDate: string, dispatchedSize: number, returnDate: string, returnSize: number, destinationLocation: string, quantity: number, productName: string }> }> } };

export type BaljugoPickingListQueryVariables = Exact<{
  input: PickingListInput;
}>;


export type BaljugoPickingListQuery = { baljugoPickingList: { PickingLists: Array<{ customerCode: string, customerName: string, nickName: string, quantity: number, destinationLocation: string, customerOrders: Array<{ _id: string, location: string, printedLabels: Array<string>, cancelLabels: Array<string>, totalAmount: number, productOrderStatus: FcProductOrderStatus, customerCode: string, customerName: string, nickName: string, productCode: string, orderCode: string, orderVersion: number, isModify: boolean, baljugoProductDES: string, ecountProductDES: string, warehouseProductDES: string, sizeDES: string, unit: string, storageMethod: string, orderDate: string, orderConfirmDate: string, deliveryRequestDate: string, dispatchDate: string, dispatchedDate: string, dispatchedSize: number, returnDate: string, returnSize: number, destinationLocation: string, quantity: number, productName: string }> }> } };

export type SetOrderArrivalLocationMutationVariables = Exact<{
  input: SetOrderArrivalLocationInput;
}>;


export type SetOrderArrivalLocationMutation = { setOrderArrivalLocation: { ok: boolean, error: { query: string, message: string } } };

export type EcountProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type EcountProductsQuery = { ecountProducts: Array<{ _id: string, createdAt: string, updatedAt: string, PROD_CD: string, PROD_DES: string, SIZE_FLAG: string, SIZE_DES: string, UNIT: string, PROD_TYPE: string, SET_FLAG: string, BAL_FLAG: string, WH_CD: string, IN_PRICE: number, IN_PRICE_VAT: string, OUT_PRICE: number, OUT_PRICE_VAT: string, REMARKS_WIN: string, CLASS_CD: string, CLASS_CD2: string, CLASS_CD3: string, BAR_CODE: string, VAT_YN: string, TAX: number, VAT_RATE_BY_BASE_YN: string, VAT_RATE_BY: number, CS_FLAG: string, REMARKS: string, INSPECT_TYPE_CD: string, INSPECT_STATUS: string, SAMPLE_PERCENT: number, CSORD_C0001: string, CSORD_TEXT: number, CSORD_C0003: string, IN_TERM: string, MIN_QTY: string, CUST: string, EXCH_RATE: string, DENO_RATE: string, OUT_PRICE1: number, OUT_PRICE1_VAT_YN: string, OUT_PRICE2: number, OUT_PRICE2_VAT_YN: string, OUT_PRICE3: number, OUT_PRICE3_VAT_YN: string, OUT_PRICE4: number, OUT_PRICE4_VAT_YN: string, OUT_PRICE5: number, OUT_PRICE5_VAT_YN: string, OUT_PRICE6: number, OUT_PRICE6_VAT_YN: string, OUT_PRICE7: number, OUT_PRICE7_VAT_YN: string, OUT_PRICE8: number, OUT_PRICE8_VAT_YN: string, OUT_PRICE9: number, OUT_PRICE9_VAT_YN: string, OUT_PRICE10: number, OUT_PRICE10_VAT_YN: string, OUTSIDE_PRICE: number, OUTSIDE_PRICE_VAT: string, LABOR_WEIGHT: number, EXPENSES_WEIGHT: number, MATERIAL_COST: number, EXPENSE_COST: number, LABOR_COST: number, OUT_COST: number, CONT1: string, CONT2: string, CONT3: string, CONT4: string, CONT5: string, CONT6: string, NO_USER1: number, NO_USER2: number, NO_USER3: number, NO_USER4: number, NO_USER5: number, NO_USER6: number, NO_USER7: number, NO_USER8: number, NO_USER9: number, NO_USER10: number, ITEM_TYPE: string, SERIAL_TYPE: string, PROD_SELL_TYPE: string, PROD_WHMOVE_TYPE: string, QC_BUY_TYPE: string, QC_YN: string }> };

export type GetSavedEcountInventoryQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type GetSavedEcountInventoryQuery = { getSavedEcountInventory: { inventory: { _id: string, createdAt: string, updatedAt: string, WH_CD: string, WH_DES: string, PROD_CD: string, PROD_DES: string, PROD_SIZE_DES: string, BAL_QTY: string, UNIT: string }, error: { query: string, message: string } } };

export type PackageBoxesQueryVariables = Exact<{ [key: string]: never; }>;


export type PackageBoxesQuery = { packageBoxes: { errors: Array<{ query: string, message: string }>, packageBoxed: Array<{ _id: string, box: { _id: string, boxName: string, boxType: string, boxCost: number, description: string }, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_FLAG: string, SIZE_DES: string } }> } };

export type GetProductLocationsQueryVariables = Exact<{
  input: GetProductLocationsInput;
}>;


export type GetProductLocationsQuery = { getProductLocations: { inventory: number, lastProdInventory: number, totalQuantity: number, stockItems: Array<{ _id: string, isPicking: boolean, isSorting: boolean, isDeleted: boolean, timestamp: string, warehousingDate: string, expirationDate: string, qrcode: string, palletCode: string, enterQuantity: number, quantity: number, replenishment: any, quantityOfEach: number, ecountProductCode: string, name: string, description: string, rackLocation: string, rackId: string, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_DES: string, UNIT: string }, recorder: { _id: string, username: string } }> } };

export type GetRackQueryVariables = Exact<{
  input: GetRackInput;
}>;


export type GetRackQuery = { getRack: { errors: Array<{ query: string, message: string }>, rack: { _id: string, location: string, name: string, description: string }, stockItems: Array<{ _id: string, isPicking: boolean, isSorting: boolean, isDeleted: boolean, timestamp: string, warehousingDate: string, expirationDate: string, qrcode: string, palletCode: string, enterQuantity: number, quantity: number, replenishment: any, quantityOfEach: number, ecountProductCode: string, name: string, description: string, rackLocation: string, rackId: string, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_DES: string, UNIT: string }, recorder: { _id: string, username: string } }> } };

export type GetRackStQueryVariables = Exact<{
  input: GetRackInput;
}>;


export type GetRackStQuery = { getRackST: { errors: Array<{ query: string, message: string }>, totalQuantities: Array<{ productCode: string, quantity: number, quantityOfEach: number, ecountInventory: number, lastProdInventory: number }>, rack: { _id: string, location: string, name: string, description: string }, stockItems: Array<{ _id: string, isPicking: boolean, isSorting: boolean, isDeleted: boolean, timestamp: string, warehousingDate: string, expirationDate: string, qrcode: string, palletCode: string, enterQuantity: number, quantity: number, replenishment: any, quantityOfEach: number, ecountProductCode: string, name: string, description: string, rackLocation: string, rackId: string, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_DES: string, UNIT: string }, recorder: { _id: string, username: string } }> } };

export type GetRacksQueryVariables = Exact<{
  input: GetRacksInput;
}>;


export type GetRacksQuery = { getRacks: { errors: Array<{ query: string, message: string }>, racks: Array<{ _id: string, location: string, name: string, description: string, stockItems: Array<{ _id: string, isPicking: boolean, isSorting: boolean, isDeleted: boolean, timestamp: string, warehousingDate: string, expirationDate: string, qrcode: string, palletCode: string, enterQuantity: number, quantity: number, replenishment: any, quantityOfEach: number, ecountProductCode: string, name: string, description: string, rackLocation: string, rackId: string, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_DES: string, UNIT: string }, recorder: { _id: string, username: string } }> }> } };

export type GetStockItemsQueryVariables = Exact<{
  input: GetStockItemsInput;
}>;


export type GetStockItemsQuery = { getStockItems: { errors: Array<{ query: string, message: string }>, stockItems: Array<{ _id: string, isPicking: boolean, isSorting: boolean, isDeleted: boolean, timestamp: string, warehousingDate: string, expirationDate: string, qrcode: string, palletCode: string, enterQuantity: number, quantity: number, replenishment: any, quantityOfEach: number, ecountProductCode: string, name: string, description: string, rackLocation: string, rackId: string, ecountProduct: { PROD_CD: string, PROD_DES: string, SIZE_DES: string, UNIT: string }, recorder: { _id: string, username: string } }> } };

export type ProductLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductLocationsQuery = { productLocations: Array<{ productCode: string, location: string }> };

export type WarehouseBoardQueryVariables = Exact<{ [key: string]: never; }>;


export type WarehouseBoardQuery = { warehouseBoard: { warehouseBoxSize: number, warehouseEASize: number, inventoryPackSize: number, inventoryBOXSize: number, inventoryKg: number, inventoryEAs: Array<{ productCode: string, productDescript: string, size: number }> } };

export type WarehouseProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type WarehouseProductsQuery = { warehouseProducts: Array<{ _id: string, createdAt: string, updatedAt: string, PROD_CD: string, PROD_DES: string, SIZE_FLAG: string, SIZE_DES: string, UNIT: string, PROD_TYPE: string, SET_FLAG: string, BAL_FLAG: string, WH_CD: string, IN_PRICE: number, IN_PRICE_VAT: string, OUT_PRICE: number, OUT_PRICE_VAT: string, REMARKS_WIN: string, CLASS_CD: string, CLASS_CD2: string, CLASS_CD3: string, BAR_CODE: string, VAT_YN: string, TAX: number, VAT_RATE_BY_BASE_YN: string, VAT_RATE_BY: number, CS_FLAG: string, REMARKS: string, INSPECT_TYPE_CD: string, INSPECT_STATUS: string, SAMPLE_PERCENT: number, CSORD_C0001: string, CSORD_TEXT: number, CSORD_C0003: string, IN_TERM: string, MIN_QTY: string, CUST: string, EXCH_RATE: string, DENO_RATE: string, OUT_PRICE1: number, OUT_PRICE1_VAT_YN: string, OUT_PRICE2: number, OUT_PRICE2_VAT_YN: string, OUT_PRICE3: number, OUT_PRICE3_VAT_YN: string, OUT_PRICE4: number, OUT_PRICE4_VAT_YN: string, OUT_PRICE5: number, OUT_PRICE5_VAT_YN: string, OUT_PRICE6: number, OUT_PRICE6_VAT_YN: string, OUT_PRICE7: number, OUT_PRICE7_VAT_YN: string, OUT_PRICE8: number, OUT_PRICE8_VAT_YN: string, OUT_PRICE9: number, OUT_PRICE9_VAT_YN: string, OUT_PRICE10: number, OUT_PRICE10_VAT_YN: string, OUTSIDE_PRICE: number, OUTSIDE_PRICE_VAT: string, LABOR_WEIGHT: number, EXPENSES_WEIGHT: number, MATERIAL_COST: number, EXPENSE_COST: number, LABOR_COST: number, OUT_COST: number, CONT1: string, CONT2: string, CONT3: string, CONT4: string, CONT5: string, CONT6: string, NO_USER1: number, NO_USER2: number, NO_USER3: number, NO_USER4: number, NO_USER5: number, NO_USER6: number, NO_USER7: number, NO_USER8: number, NO_USER9: number, NO_USER10: number, ITEM_TYPE: string, SERIAL_TYPE: string, PROD_SELL_TYPE: string, PROD_WHMOVE_TYPE: string, QC_BUY_TYPE: string, QC_YN: string }> };

export const ProductDisplayRequestFragmentFragmentDoc = gql`
    fragment ProductDisplayRequestFragment on StoreProductCtrl {
  productDisplayRequest
}
    `;
export const RegularEcountProductFragmentDoc = gql`
    fragment RegularEcountProduct on EcountProduct {
  _id
  createdAt
  updatedAt
  PROD_CD
  PROD_DES
  SIZE_FLAG
  SIZE_DES
  UNIT
  PROD_TYPE
  SET_FLAG
  BAL_FLAG
  WH_CD
  IN_PRICE
  IN_PRICE_VAT
  OUT_PRICE
  OUT_PRICE_VAT
  REMARKS_WIN
  CLASS_CD
  CLASS_CD2
  CLASS_CD3
  BAR_CODE
  VAT_YN
  TAX
  VAT_RATE_BY_BASE_YN
  VAT_RATE_BY
  CS_FLAG
  REMARKS
  INSPECT_TYPE_CD
  INSPECT_STATUS
  SAMPLE_PERCENT
  CSORD_C0001
  CSORD_TEXT
  CSORD_C0003
  IN_TERM
  MIN_QTY
  CUST
  EXCH_RATE
  DENO_RATE
  OUT_PRICE1
  OUT_PRICE1_VAT_YN
  OUT_PRICE2
  OUT_PRICE2_VAT_YN
  OUT_PRICE3
  OUT_PRICE3_VAT_YN
  OUT_PRICE4
  OUT_PRICE4_VAT_YN
  OUT_PRICE5
  OUT_PRICE5_VAT_YN
  OUT_PRICE6
  OUT_PRICE6_VAT_YN
  OUT_PRICE7
  OUT_PRICE7_VAT_YN
  OUT_PRICE8
  OUT_PRICE8_VAT_YN
  OUT_PRICE9
  OUT_PRICE9_VAT_YN
  OUT_PRICE10
  OUT_PRICE10_VAT_YN
  OUTSIDE_PRICE
  OUTSIDE_PRICE_VAT
  LABOR_WEIGHT
  EXPENSES_WEIGHT
  MATERIAL_COST
  EXPENSE_COST
  LABOR_COST
  OUT_COST
  CONT1
  CONT2
  CONT3
  CONT4
  CONT5
  CONT6
  NO_USER1
  NO_USER2
  NO_USER3
  NO_USER4
  NO_USER5
  NO_USER6
  NO_USER7
  NO_USER8
  NO_USER9
  NO_USER10
  ITEM_TYPE
  SERIAL_TYPE
  PROD_SELL_TYPE
  PROD_WHMOVE_TYPE
  QC_BUY_TYPE
  QC_YN
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  _id
  username
  email
  _email
  nickname
  position
  roles
  thumbnail
}
    `;
export const RegularLoginResponseFragmentDoc = gql`
    fragment RegularLoginResponse on LoginResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    `;
export const RegularStockItemFragmentDoc = gql`
    fragment RegularStockItem on StockItem {
  _id
  isPicking
  isSorting
  isDeleted
  timestamp
  warehousingDate
  expirationDate
  qrcode
  warehousingDate
  expirationDate
  palletCode
  enterQuantity
  quantity
  replenishment
  quantityOfEach
  ecountProductCode
  name
  description
  rackLocation
  ecountProduct {
    PROD_CD
    PROD_DES
    SIZE_DES
    UNIT
  }
  name
  description
  recorder {
    _id
    username
  }
  rackId
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const AddTotalOrdersDocument = gql`
    mutation AddTotalOrders($input: AddTotalOrdersInput!) {
  addTotalOrders(input: $input) {
    result
    error {
      query
      message
    }
  }
}
    `;
export const OrderStateDocument = gql`
    mutation OrderState($input: PickingListInput!) {
  orderState(input: $input) {
    result
    error {
      query
      message
    }
  }
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export const EcountProductAllUpsertDocument = gql`
    mutation EcountProductAllUpsert {
  ecountProductAllUpsert
}
    `;
export const EmailVerifictionDocument = gql`
    mutation EmailVerifiction($input: EmailVerifyInput!) {
  emailVerifiction(input: $input) {
    errors {
      field
      message
    }
  }
}
    `;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularLoginResponse
  }
}
    ${RegularLoginResponseFragmentDoc}
${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export const UploadBaljugoDispatchXlsxDocument = gql`
    mutation UploadBaljugoDispatchXLSX($file: [Upload!]!) {
  uploadBaljugoDispatchXLSX(file: $file) {
    ok
    results
    errors {
      field
      message
    }
  }
}
    `;
export const UploadProductLocationXlsxDocument = gql`
    mutation UploadProductLocationXLSX($file: [Upload!]!) {
  uploadProductLocationXLSX(file: $file) {
    ok
    results
    errors {
      field
      message
    }
  }
}
    `;
export const CreateStockItemDocument = gql`
    mutation CreateStockItem($input: StockItemInput!) {
  createStockItem(input: $input) {
    errors {
      query
      message
    }
    stockItem {
      ...RegularStockItem
    }
  }
}
    ${RegularStockItemFragmentDoc}`;
export const DeleteStockItemDocument = gql`
    mutation DeleteStockItem($input: InvisivleStockItemInput!) {
  deleteStockItem(input: $input)
}
    `;
export const InvisibleStockItemDocument = gql`
    mutation InvisibleStockItem($input: InvisivleStockItemInput!) {
  invisibleStockItem(input: $input)
}
    `;
export const ItemsToPickingDocument = gql`
    mutation ItemsToPicking($input: SortingStockItemInput!) {
  itemsToPicking(input: $input) {
    errors {
      query
      message
    }
    stockItem {
      palletCode
      name
      isSorting
      isPicking
      replenishment
      quantity
    }
  }
}
    `;
export const TransitStockItemDocument = gql`
    mutation TransitStockItem($input: InvisivleStockItemInput!) {
  transitStockItem(input: $input)
}
    `;
export const UpdateStockItemDocument = gql`
    mutation UpdateStockItem($input: StockItemUpdateInput!) {
  updateStockItem(input: $input) {
    errors {
      query
      message
    }
    stockItem {
      ...RegularStockItem
    }
  }
}
    ${RegularStockItemFragmentDoc}`;
export const UpsertRackDocument = gql`
    mutation UpsertRack($input: UpsertRackInput!) {
  upsertRack(input: $input) {
    errors {
      query
      message
    }
    rack {
      _id
      location
      name
      description
      stockItems {
        _id
      }
    }
  }
}
    `;
export const UpsertStockItemDocument = gql`
    mutation UpsertStockItem($input: StockItemInput!) {
  upsertStockItem(input: $input) {
    errors {
      query
      message
    }
    stockItem {
      ...RegularStockItem
    }
  }
}
    ${RegularStockItemFragmentDoc}`;
export const BaljugoOrderCustomerDocument = gql`
    query BaljugoOrderCustomer($input: BaljugoCustomerOrderInput!) {
  baljugoOrderCustomer(input: $input) {
    error {
      query
      message
    }
    customerOrders {
      _id
      location
      printedLabels
      cancelLabels
      totalAmount
      productOrderStatus
      customerCode
      customerName
      nickName
      productCode
      orderCode
      orderVersion
      isModify
      baljugoProductDES
      ecountProductDES
      warehouseProductDES
      sizeDES
      unit
      storageMethod
      orderDate
      orderConfirmDate
      deliveryRequestDate
      dispatchDate
      dispatchedDate
      dispatchedSize
      returnDate
      returnSize
      destinationLocation
      quantity
      productName
    }
  }
}
    `;
export const BaljugoOrderCustomersDocument = gql`
    query BaljugoOrderCustomers {
  baljugoOrderCustomers {
    baljugoCustomers {
      customerCode
      customerName
      nickName
      quantity
      orderDate
      dispatchDate
      published
      canceled
      modified
      added
      totalAmount
      customerAmount
      destinationLocation
    }
    dailyOrders {
      code
      printedLabels
      cancelLabels
      productDES
      size
      location
      inventory
      unit
    }
    customerOrders {
      customerCode
      orders {
        _id
        location
        printedLabels
        cancelLabels
        totalAmount
        productOrderStatus
        customerCode
        customerName
        nickName
        productCode
        orderCode
        orderVersion
        isModify
        baljugoProductDES
        ecountProductDES
        warehouseProductDES
        sizeDES
        unit
        storageMethod
        orderDate
        orderConfirmDate
        deliveryRequestDate
        dispatchDate
        dispatchedDate
        dispatchedSize
        returnDate
        returnSize
        destinationLocation
        quantity
        productName
      }
    }
  }
}
    `;
export const BaljugoOrderCustomersHistoryDocument = gql`
    query BaljugoOrderCustomersHistory($input: BaljugoOrderCustomersHistoryInput!) {
  baljugoOrderCustomersHistory(input: $input) {
    baljugoCustomers {
      customerCode
      customerName
      nickName
      quantity
      orderDate
      dispatchDate
      published
      totalAmount
      destinationLocation
    }
    dailyOrders {
      code
      printedLabels
      cancelLabels
      productDES
      size
      location
      inventory
      unit
    }
    customerOrders {
      customerCode
      orders {
        _id
        location
        printedLabels
        cancelLabels
        totalAmount
        productOrderStatus
        customerCode
        customerName
        nickName
        productCode
        orderCode
        orderVersion
        isModify
        baljugoProductDES
        ecountProductDES
        warehouseProductDES
        sizeDES
        unit
        storageMethod
        orderDate
        orderConfirmDate
        deliveryRequestDate
        dispatchDate
        dispatchedDate
        dispatchedSize
        returnDate
        returnSize
        destinationLocation
        quantity
        productName
      }
    }
  }
}
    `;
export const BaljugoPickingListDocument = gql`
    query BaljugoPickingList($input: PickingListInput!) {
  baljugoPickingList(input: $input) {
    PickingLists {
      customerCode
      customerName
      nickName
      quantity
      destinationLocation
      customerOrders {
        _id
        location
        printedLabels
        cancelLabels
        totalAmount
        productOrderStatus
        customerCode
        customerName
        nickName
        productCode
        orderCode
        orderVersion
        isModify
        baljugoProductDES
        ecountProductDES
        warehouseProductDES
        sizeDES
        unit
        storageMethod
        orderDate
        orderConfirmDate
        deliveryRequestDate
        dispatchDate
        dispatchedDate
        dispatchedSize
        returnDate
        returnSize
        destinationLocation
        quantity
        productName
      }
    }
  }
}
    `;
export const SetOrderArrivalLocationDocument = gql`
    mutation setOrderArrivalLocation($input: SetOrderArrivalLocationInput!) {
  setOrderArrivalLocation(input: $input) {
    ok
    error {
      query
      message
    }
  }
}
    `;
export const EcountProductsDocument = gql`
    query EcountProducts {
  ecountProducts {
    ...RegularEcountProduct
  }
}
    ${RegularEcountProductFragmentDoc}`;
export const GetSavedEcountInventoryDocument = gql`
    query GetSavedEcountInventory($input: String!) {
  getSavedEcountInventory(productCode: $input) {
    inventory {
      _id
      createdAt
      updatedAt
      WH_CD
      WH_DES
      PROD_CD
      PROD_DES
      PROD_SIZE_DES
      BAL_QTY
      UNIT
    }
    error {
      query
      message
    }
  }
}
    `;
export const PackageBoxesDocument = gql`
    query PackageBoxes {
  packageBoxes {
    errors {
      query
      message
    }
    packageBoxed {
      _id
      box {
        _id
        boxName
        boxType
        boxCost
        description
      }
      ecountProduct {
        PROD_CD
        PROD_DES
        SIZE_FLAG
        SIZE_DES
      }
    }
  }
}
    `;
export const GetProductLocationsDocument = gql`
    query GetProductLocations($input: GetProductLocationsInput!) {
  getProductLocations(input: $input) {
    inventory
    lastProdInventory
    totalQuantity
    stockItems {
      ...RegularStockItem
      ecountProduct {
        PROD_CD
        PROD_DES
        SIZE_DES
        UNIT
      }
    }
  }
}
    ${RegularStockItemFragmentDoc}`;
export const GetRackDocument = gql`
    query GetRack($input: GetRackInput!) {
  getRack(input: $input) {
    errors {
      query
      message
    }
    rack {
      _id
      location
      name
      description
    }
    stockItems {
      ...RegularStockItem
    }
  }
}
    ${RegularStockItemFragmentDoc}`;
export const GetRackStDocument = gql`
    query GetRackST($input: GetRackInput!) {
  getRackST(input: $input) {
    errors {
      query
      message
    }
    totalQuantities {
      productCode
      quantity
      quantityOfEach
      ecountInventory
      lastProdInventory
    }
    rack {
      _id
      location
      name
      description
    }
    stockItems {
      ...RegularStockItem
    }
  }
}
    ${RegularStockItemFragmentDoc}`;
export const GetRacksDocument = gql`
    query GetRacks($input: GetRacksInput!) {
  getRacks(input: $input) {
    errors {
      query
      message
    }
    racks {
      _id
      location
      name
      description
      stockItems {
        ...RegularStockItem
      }
    }
  }
}
    ${RegularStockItemFragmentDoc}`;
export const GetStockItemsDocument = gql`
    query GetStockItems($input: GetStockItemsInput!) {
  getStockItems(input: $input) {
    errors {
      query
      message
    }
    stockItems {
      ...RegularStockItem
    }
  }
}
    ${RegularStockItemFragmentDoc}`;
export const ProductLocationsDocument = gql`
    query ProductLocations {
  productLocations {
    productCode
    location
  }
}
    `;
export const WarehouseBoardDocument = gql`
    query WarehouseBoard {
  warehouseBoard {
    warehouseBoxSize
    warehouseEASize
    inventoryPackSize
    inventoryBOXSize
    inventoryKg
    inventoryEAs {
      productCode
      productDescript
      size
    }
  }
}
    `;
export const WarehouseProductsDocument = gql`
    query WarehouseProducts {
  warehouseProducts {
    ...RegularEcountProduct
  }
}
    ${RegularEcountProductFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Me(variables?: MeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Me', 'query', variables);
    },
    AddTotalOrders(variables: AddTotalOrdersMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddTotalOrdersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddTotalOrdersMutation>(AddTotalOrdersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddTotalOrders', 'mutation', variables);
    },
    OrderState(variables: OrderStateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OrderStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<OrderStateMutation>(OrderStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'OrderState', 'mutation', variables);
    },
    ChangePassword(variables: ChangePasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChangePasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangePasswordMutation>(ChangePasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ChangePassword', 'mutation', variables);
    },
    EcountProductAllUpsert(variables?: EcountProductAllUpsertMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EcountProductAllUpsertMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EcountProductAllUpsertMutation>(EcountProductAllUpsertDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EcountProductAllUpsert', 'mutation', variables);
    },
    EmailVerifiction(variables: EmailVerifictionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EmailVerifictionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EmailVerifictionMutation>(EmailVerifictionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EmailVerifiction', 'mutation', variables);
    },
    ForgotPassword(variables: ForgotPasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ForgotPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ForgotPasswordMutation>(ForgotPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ForgotPassword', 'mutation', variables);
    },
    Login(variables: LoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login', 'mutation', variables);
    },
    Logout(variables?: LogoutMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutMutation>(LogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Logout', 'mutation', variables);
    },
    UploadBaljugoDispatchXLSX(variables: UploadBaljugoDispatchXlsxMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UploadBaljugoDispatchXlsxMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UploadBaljugoDispatchXlsxMutation>(UploadBaljugoDispatchXlsxDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UploadBaljugoDispatchXLSX', 'mutation', variables);
    },
    UploadProductLocationXLSX(variables: UploadProductLocationXlsxMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UploadProductLocationXlsxMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UploadProductLocationXlsxMutation>(UploadProductLocationXlsxDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UploadProductLocationXLSX', 'mutation', variables);
    },
    CreateStockItem(variables: CreateStockItemMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateStockItemMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateStockItemMutation>(CreateStockItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateStockItem', 'mutation', variables);
    },
    DeleteStockItem(variables: DeleteStockItemMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteStockItemMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteStockItemMutation>(DeleteStockItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteStockItem', 'mutation', variables);
    },
    InvisibleStockItem(variables: InvisibleStockItemMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<InvisibleStockItemMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InvisibleStockItemMutation>(InvisibleStockItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InvisibleStockItem', 'mutation', variables);
    },
    ItemsToPicking(variables: ItemsToPickingMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ItemsToPickingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ItemsToPickingMutation>(ItemsToPickingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ItemsToPicking', 'mutation', variables);
    },
    TransitStockItem(variables: TransitStockItemMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TransitStockItemMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TransitStockItemMutation>(TransitStockItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TransitStockItem', 'mutation', variables);
    },
    UpdateStockItem(variables: UpdateStockItemMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateStockItemMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateStockItemMutation>(UpdateStockItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateStockItem', 'mutation', variables);
    },
    UpsertRack(variables: UpsertRackMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpsertRackMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertRackMutation>(UpsertRackDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertRack', 'mutation', variables);
    },
    UpsertStockItem(variables: UpsertStockItemMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpsertStockItemMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertStockItemMutation>(UpsertStockItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertStockItem', 'mutation', variables);
    },
    BaljugoOrderCustomer(variables: BaljugoOrderCustomerQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BaljugoOrderCustomerQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BaljugoOrderCustomerQuery>(BaljugoOrderCustomerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BaljugoOrderCustomer', 'query', variables);
    },
    BaljugoOrderCustomers(variables?: BaljugoOrderCustomersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BaljugoOrderCustomersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BaljugoOrderCustomersQuery>(BaljugoOrderCustomersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BaljugoOrderCustomers', 'query', variables);
    },
    BaljugoOrderCustomersHistory(variables: BaljugoOrderCustomersHistoryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BaljugoOrderCustomersHistoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BaljugoOrderCustomersHistoryQuery>(BaljugoOrderCustomersHistoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BaljugoOrderCustomersHistory', 'query', variables);
    },
    BaljugoPickingList(variables: BaljugoPickingListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BaljugoPickingListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BaljugoPickingListQuery>(BaljugoPickingListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BaljugoPickingList', 'query', variables);
    },
    setOrderArrivalLocation(variables: SetOrderArrivalLocationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetOrderArrivalLocationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetOrderArrivalLocationMutation>(SetOrderArrivalLocationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setOrderArrivalLocation', 'mutation', variables);
    },
    EcountProducts(variables?: EcountProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EcountProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EcountProductsQuery>(EcountProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EcountProducts', 'query', variables);
    },
    GetSavedEcountInventory(variables: GetSavedEcountInventoryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSavedEcountInventoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSavedEcountInventoryQuery>(GetSavedEcountInventoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetSavedEcountInventory', 'query', variables);
    },
    PackageBoxes(variables?: PackageBoxesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PackageBoxesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PackageBoxesQuery>(PackageBoxesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PackageBoxes', 'query', variables);
    },
    GetProductLocations(variables: GetProductLocationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductLocationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductLocationsQuery>(GetProductLocationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProductLocations', 'query', variables);
    },
    GetRack(variables: GetRackQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetRackQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRackQuery>(GetRackDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetRack', 'query', variables);
    },
    GetRackST(variables: GetRackStQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetRackStQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRackStQuery>(GetRackStDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetRackST', 'query', variables);
    },
    GetRacks(variables: GetRacksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetRacksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRacksQuery>(GetRacksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetRacks', 'query', variables);
    },
    GetStockItems(variables: GetStockItemsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetStockItemsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStockItemsQuery>(GetStockItemsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetStockItems', 'query', variables);
    },
    ProductLocations(variables?: ProductLocationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProductLocationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProductLocationsQuery>(ProductLocationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProductLocations', 'query', variables);
    },
    WarehouseBoard(variables?: WarehouseBoardQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<WarehouseBoardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WarehouseBoardQuery>(WarehouseBoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'WarehouseBoard', 'query', variables);
    },
    WarehouseProducts(variables?: WarehouseProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<WarehouseProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WarehouseProductsQuery>(WarehouseProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'WarehouseProducts', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;