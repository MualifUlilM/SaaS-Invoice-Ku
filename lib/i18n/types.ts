export type Locale = 'en' | 'id';
export const locales: Locale[] = ['en', 'id'];
export const defaultLocale: Locale = 'id';

export interface AppTranslations {
  nav: {
    dashboard: string; invoices: string; clients: string; analytics: string;
    businessProfile: string; accountSettings: string; logout: string;
    openMenu: string; closeMenu: string; notifications: string;
  };
  lang: { en: string; id: string; };
  common: {
    save: string; cancel: string; edit: string; delete: string; view: string;
    viewDetail: string; back: string; loading: string; saving: string;
    actions: string; amount: string; date: string; status: string;
    name: string; email: string; phone: string; address: string;
    notes: string; company: string; search: string;
  };
  status: { draft: string; sent: string; paid: string; overdue: string; cancelled: string; };
  dashboard: {
    title: string; description: string; createInvoice: string;
    totalRevenue: string; totalRevenueSub: string;
    totalInvoices: string; totalInvoicesSub: string;
    activeClients: string; activeClientsSub: string;
    overdueInvoices: string; overdueInvoicesSub: string;
    revenueChart: string; revenueChartSub: string;
    recentInvoices: string; quickStats: string;
    collectionRate: string; dueSoon: string;
    noRecentInvoices: string; noRecentInvoicesDesc: string;
  };
  invoices: {
    title: string; description: string; createInvoice: string;
    newTitle: string; newDesc: string;
    invoiceNumber: string; client: string; total: string;
    detailDesc: string; statusSection: string; invoiceInfo: string;
    lineItems: string; itemDescription: string; qty: string;
    unitPrice: string; subtotal: string; discount: string; tax: string;
    paymentInstructions: string; statusHistory: string; printPdf: string;
    selectClient: string; issueDate: string; dueDate: string;
    discountType: string; discountFixed: string; discountPercent: string;
    discountValue: string; taxAmount: string; addItem: string; removeItem: string;
    itemPlaceholder: string; notesLabel: string; notesPlaceholder: string;
    paymentPlaceholder: string;
    sendInvoice: string; markPaid: string; markOverdue: string;
    cancelInvoice: string; restoreDraft: string;
    noInvoices: string; noInvoicesDesc: string;
    createBtn: string; updateBtn: string; saving: string;
    created: string; updated: string; errorGeneral: string;
    issuedOn: string; dueOn: string; amountPaid: string;
    discountNominal: string; discountPercent2: string;
  };
  clients: {
    title: string; description: string; addClient: string;
    addClientTitle: string; clientList: string; clientCount: string;
    clientName: string; companyName: string; namePlaceholder: string;
    companyPlaceholder: string; emailPlaceholder: string; phonePlaceholder: string;
    addressPlaceholder: string; notesLabel: string; notesPlaceholder: string;
    saveClient: string; updateClient: string; saving: string;
    contactInfo: string; invoiceHistory: string;
    noClients: string; noClientsDesc: string;
    noClientInvoices: string; noClientInvoicesDesc: string;
    created: string; updated: string; errorGeneral: string;
  };
  analytics: {
    title: string; description: string;
    invoicesPaid: string; invoicesPaidSub: string;
    revenueRecorded: string; revenueRecordedSub: string;
    activelyBilled: string; activelyBilledSub: string;
    conversionRate: string; conversionRateSub: string;
    monthlyRevenue: string; monthlyRevenueSub: string;
    totalOutstanding: string; totalOutstandingSub: string;
    overdueCount: string; overdueCountSub: string;
    statusBreakdown: string;
  };
  account: {
    title: string; description: string;
    accountInfo: string; accountInfoSub: string;
    fullName: string; phoneNumber: string; emailReadOnly: string;
    saveChanges: string; changePassword: string; changePasswordSub: string;
    newPassword: string; confirmPassword: string; updatePassword: string;
    saved: string; errorGeneral: string;
  };
  business: {
    title: string; description: string;
    businessInfo: string; businessInfoSub: string;
    onboardingInfo: string;
    businessName: string; businessEmail: string; businessPhone: string;
    invoicePrefix: string; invoicePrefixHelper: string;
    city: string; province: string; postalCode: string; country: string;
    businessAddress: string; businessNamePlaceholder: string;
    bankSection: string; bankSectionSub: string;
    bankName: string; bankAccountNumber: string; bankAccountName: string;
    bankNamePlaceholder: string; bankNumberPlaceholder: string; bankOwnerPlaceholder: string;
    saveProfile: string; savingProfile: string;
    enterDashboard: string; saved: string; errorGeneral: string;
  };
  onboarding: {
    welcomeTitle: string; welcomeSub: string; step: string;
  };
  print: {
    back: string; printBtn: string; billedTo: string;
    issueDate: string; dueDate: string; footer: string;
    paymentInstructions: string; notes: string;
    statusLabels: { draft: string; sent: string; paid: string; overdue: string; cancelled: string; };
  };
  empty: {
    noClients: string; noClientsDesc: string;
    noInvoices: string; noInvoicesDesc: string; noInvoicesCta: string;
    noClientsForInvoice: string; noClientsForInvoiceDesc: string; noClientsForInvoiceCta: string;
    noClientInvoices: string; noClientInvoicesDesc: string;
  };
}
