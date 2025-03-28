declare type NewUserParams = {
    userId: string;
    email: string;
    name: string;
    password: string;
};

declare type LoginUser = {
    email: string;
    password: string;
};

declare type SignUpUser = {
    firstName: string;
    lastName: string;
    confirmPassword: string;
    email: string;
    password: string;
};

interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any; 
}

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare interface HeaderBoxProps {
    type?: "title" | "greeting";
    title: string;
    subtext: string;
    user?: string;
}

declare interface MobileNavProps {
    user: User;
}

declare interface PaginationProps {
    page: number;
    totalPages: number;
}

declare interface AuthFormProps {
    type: "sign-in" | "sign-up";
}

declare interface UrlQueryParams {
    params: string;
    key: string;
    value: string;
}

declare interface IconProps{
    className?: String
}

declare interface SidebarContextProps{
    isMobile: boolean
    state: 'open' | 'closed';
    openMobile: () => void;
    setOpenMobile: (open: boolean) => void;
}

declare interface CreatePostDrawerProps {
    onClose: () => void;
}

declare interface Note {
    id: number;
    content: string;
    timestamp: string;
}

declare interface Subscription {
    id?: string | undefined;
    name: string;
    price: number;
    currency: string;
    frequency: string;
    category: string;
    paymentMethod: string;
    status?: string | undefined;
    startDate: string;
    renewalDate?: string | undefined;
}

declare interface AdditionProps {
    onSubmit: (data: Subscription) => void; 
    form: UseFormReturn<Subscription, any, undefined>;
    loading: boolean;
}

declare interface SubTableProps{
    subscriptions: Subscription[];
    calculateDaysLeft: (renewalDate: string) => number;
    handleEdit: (subscription: Subscription) => void;
    handleDelete: (subscription: Subscription) => void;
}

/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};






declare type Account = {
    id: string;
    availableBalance: number;
    currentBalance: number;
    officialName: string;
    mask: string;
    institutionId: string;
    name: string;
    type: string;
    subtype: string;
    appwriteItemId: string;
    shareableId: string;
};

declare type Transaction = {
    id: string;
    $id: string;
    name: string;
    paymentChannel: string;
    type: string;
    accountId: string;
    amount: number;
    pending: boolean;
    category: string;
    date: string;
    image: string;
    type: string;
    $createdAt: string;
    channel: string;
    senderBankId: string;
    receiverBankId: string;
};

declare type Bank = {
    $id: string;
    accountId: string;
    bankId: string;
    accessToken: string;
    fundingSourceUrl: string;
    userId: string;
    shareableId: string;
};

declare type AccountTypes =
    | "depository"
    | "credit"
    | "loan "
    | "investment"
    | "other";

declare type Category = "Food and Drink" | "Travel" | "Transfer";

declare type CategoryCount = {
    name: string;
    count: number;
    totalCount: number;
};


declare type AddFundingSourceParams = {
    dwollaCustomerId: string;
    processorToken: string;
    bankName: string;
};

declare type NewDwollaCustomerParams = {
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
};

declare interface CreditCardProps {
    account: Account;
    userName: string;
    showBalance?: boolean;
}

declare interface BankInfoProps {
    account: Account;
    appwriteItemId?: string;
    type: "full" | "card";
}

declare interface HeaderBoxProps {
    type?: "title" | "greeting";
    title: string;
    subtext: string;
    user?: string;
}

declare interface MobileNavProps {
    user: User;
}

declare interface PageHeaderProps {
    topTitle: string;
    bottomTitle: string;
    topDescription: string;
    bottomDescription: string;
    connectBank?: boolean;
}

declare interface PaginationProps {
    page: number;
    totalPages: number;
}

declare interface PlaidLinkProps {
    user: User;
    variant?: "primary" | "ghost";
    dwollaCustomerId?: string;
}

// declare type User = sdk.Models.Document & {
//   accountId: string;
//   email: string;
//   name: string;
//   items: string[];
//   accessToken: string;
//   image: string;
// };


declare interface BankDropdownProps {
    accounts: Account[];
    setValue?: UseFormSetValue<any>;
    otherStyles?: string;
}

declare interface BankTabItemProps {
    account: Account;
    appwriteItemId?: string;
}

declare interface TotalBalanceBoxProps {
    accounts: Account[];
    totalBanks: number;
    totalCurrentBalance: number;
}

declare interface FooterProps {
    user: User;
    type?: 'mobile' | 'desktop'
}

declare interface RightSidebarProps {
    user: User;
    transactions: Transaction[];
    banks: Bank[] & Account[];
}

declare interface SiderbarProps {
    user: User;
}

declare interface RecentTransactionsProps {
    accounts: Account[];
    transactions: Transaction[];
    appwriteItemId: string;
    page: number;
}

declare interface TransactionHistoryTableProps {
    transactions: Transaction[];
    page: number;
}

declare interface CategoryBadgeProps {
    category: string;
}

declare interface TransactionTableProps {
    transactions: Transaction[];
}

declare interface CategoryProps {
    category: CategoryCount;
}

declare interface DoughnutChartProps {
    accounts: Account[];
}

declare interface PaymentTransferFormProps {
    accounts: Account[];
}

// Actions
declare interface getAccountsProps {
    userId: string;
}

declare interface getInstitutionProps {
    institutionId: string;
}

declare interface getTransactionsProps {
    accessToken: string;
}

declare interface CreateFundingSourceOptions {
    customerId: string; // Dwolla Customer ID
    fundingSourceName: string; // Dwolla Funding Source Name
    plaidToken: string; // Plaid Account Processor Token
    _links: object; // Dwolla On Demand Authorization Link
}

declare interface CreateTransactionProps {
    name: string;
    amount: string;
    senderId: string;
    senderBankId: string;
    receiverId: string;
    receiverBankId: string;
    email: string;
}

declare interface getTransactionsByBankIdProps {
    bankId: string;
}

declare interface getUserInfoProps {
    userId: string;
}

declare interface exchangePublicTokenProps {
    publicToken: string;
    user: User;
}

declare interface createBankAccountProps {
    accessToken: string;
    userId: string;
    accountId: string;
    bankId: string;
    fundingSourceUrl: string;
    shareableId: string;
}

declare interface getBanksProps {
    userId: string;
}

declare interface getBankProps {
    documentId: string;
}

declare interface getBankByAccountIdProps {
    accountId: string;
}

declare interface UrlQueryParams{
    params: string;
    key: string;
    value: string;
}