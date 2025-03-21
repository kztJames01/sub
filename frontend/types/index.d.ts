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
    _id: string;
    name: string;
    price: number;
    currency: string;
    frequency: string;
    category: string;
    paymentMethod: string;
    status: string;
    startDate: string;
    renewalDate: string;
}

declare interface AdditionProps {
    onSubmit: (data: Subscription) => void; 
}

declare interface SubTableProps{
    subscriptions: Subscription[];
    calculateDaysLeft: (renewalDate: string) => number;
    handleEdit: (subscription: Subscription) => void;
    handleDelete: (subscription: Subscription) => void;
}