import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesComponent } from "./template/dashboards/sales/sales.component";
import { EcommerceComponent } from "./template/dashboards/ecommerce/ecommerce.component";
import { AnalyticsComponent } from "./template/dashboards/analytics/analytics.component";
import { CrmComponent } from "./template/dashboards/crm/crm.component";
import { ProjectComponent } from "./template/dashboards/project/project.component";
import { InboxComponent } from "./template/dashboards/pages/inbox/inbox.component";
import { ChatComponent } from "./template/dashboards/pages/chat/chat.component";
import { TodosComponent } from "./template/dashboards/pages/todos/todos.component";
import { NotesComponent } from "./template/dashboards/pages/notes/notes.component";
import { SearchComponent } from "./template/dashboards/pages/search/search.component";
import { UiComponentsComponent } from "./template/dashboards/ui-components/ui-components/ui-components.component";
import { UiAlertsComponent } from "./template/dashboards/ui-components/ui-alerts/ui-alerts.component";
import { BadgesComponent } from "./template/dashboards/ui-components/badges/badges.component";
import { ButtonsComponent } from "./template/dashboards/ui-components/buttons/buttons.component";
import { CardsComponent } from "./template/dashboards/ui-components/cards/cards.component";
import { DropdownsComponent } from "./template/dashboards/ui-components/dropdowns/dropdowns.component";
import { FormsComponent } from "./template/dashboards/ui-components/forms/forms.component";
import { ListGroupsComponent } from "./template/dashboards/ui-components/list-groups/list-groups.component";
import { ModalsComponent } from "./template/dashboards/ui-components/modals/modals.component";
import { ProgressBarsComponent } from "./template/dashboards/ui-components/progress-bars/progress-bars.component";
import { TablesComponent } from "./template/dashboards/ui-components/tables/tables.component";
import { TabsComponent } from "./template/dashboards/ui-components/tabs/tabs.component";
import { AuthComponent } from "./template/dashboards/auth/auth/auth.component";
import { SignupComponent } from "./template/dashboards/auth/signup/signup.component";
import { SigninComponent } from "./template/dashboards/auth/signin/signin.component";
import { ForgotPasswordComponent } from "./template/dashboards/auth/forgot-password/forgot-password.component";
import { ForgotPasswordVerifyComponent } from "./template/dashboards/auth/forgot-password-verify/forgot-password-verify.component";
import { ForgotPasswordResetComponent } from "./template/dashboards/auth/forgot-password-reset/forgot-password-reset.component";
import { ChartsComponent } from "./template/dashboards/charts/charts/charts.component";
import { LineChartsComponent } from "./template/dashboards/charts/line-charts/line-charts.component";
import { AreaChartsComponent } from "./template/dashboards/charts/area-charts/area-charts.component";
import { ColumnChartsComponent } from "./template/dashboards/charts/column-charts/column-charts.component";
import { BarChartsComponent } from "./template/dashboards/charts/bar-charts/bar-charts.component";
import { MixedChartsComponent } from "./template/dashboards/charts/mixed-charts/mixed-charts.component";
import { PieDonutsChartsComponent } from "./template/dashboards/charts/pie-donuts-charts/pie-donuts-charts.component";
import { IconsComponent } from "./template/dashboards/icons/icons/icons.component";
import { FeatherIconsComponent } from "./template/dashboards/icons/feather-icons/feather-icons.component";
import { LineIconsComponent } from "./template/dashboards/icons/line-icons/line-icons.component";
import { IcofontIconsComponent } from "./template/dashboards/icons/icofont-icons/icofont-icons.component";
import { OthersComponent } from "./template/dashboards/others/others/others.component";
import { UsersCardComponent } from "./template/dashboards/others/users-card/users-card.component";
import { NotificationsComponent } from "./template/dashboards/others/notifications/notifications.component";
import { TimelineComponent } from "./template/dashboards/others/timeline/timeline.component";
import { InvoiceTemplateComponent } from "./template/dashboards/others/invoice-template/invoice-template.component";
import { GalleryComponent } from "./template/dashboards/others/gallery/gallery.component";
import { FaqComponent } from "./template/dashboards/others/faq/faq.component";
import { PricingComponent } from "./template/dashboards/others/pricing/pricing.component";
import { ProfileComponent } from "./template/dashboards/others/profile/profile.component";
import { ProfileSettingsComponent } from "./template/dashboards/others/profile-settings/profile-settings.component";
import { HeaderComponent } from "./template/header/header.component";
import { CreationComponent } from "./template/creation/creation.component";
import { ErrorComponent } from "./template/dashboards/others/error/error.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ListingInterventionsComponent } from "./components/listing-interventions/listing-interventions.component";
import { CreateInterventionComponent } from "./components/create-intervention/create-intervention.component";
import { ListingUsersComponent } from "./components/listing-users/listing-users.component";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { InterventionDetailsComponent } from "./components/intervention-details/intervention-details.component";
import { ListingServicesComponent } from "./components/listing-services/listing-services.component";
import { CreateServiceComponent } from "./components/create-service/create-service.component";
import { DashboardClientComponent } from "./components/dashboard-client/dashboard-client.component";
import { MesInterventionsComponent } from "./components/mes-interventions/mes-interventions.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { ListingOrdersComponent } from "./components/listing-orders/listing-orders.component";
import { ListingFournisseursComponent } from "./components/listing-fournisseurs/listing-fournisseurs.component";
import { CreateOrderComponent } from "./components/create-order/create-order.component";
import { CreateFournisseurComponent } from "./components/create-fournisseur/create-fournisseur.component";
import { CreateOrderInterventionComponent } from "./components/create-order-intervention/create-order-intervention.component";

const routes: Routes = [
    { path: "", redirectTo: "/auth/signin", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "dashboard-client", component: DashboardClientComponent },
    { path: "services", component: ListingServicesComponent },

    { path: "commandes", component: ListingOrdersComponent },
    { path: "fournisseurs", component: ListingFournisseursComponent },
    { path: "create-order", component: CreateOrderComponent },
    { path: "create-order/:id", component: CreateOrderInterventionComponent },
    { path: "create-fournisseur", component: CreateFournisseurComponent },
    { path: "create-fournisseur/:id", component: CreateFournisseurComponent },
    { path: "interventions", component: ListingInterventionsComponent },
    { path: "mes-interventions", component: MesInterventionsComponent },
    { path: "user-profile", component: UserProfileComponent },
    { path: "users", component: ListingUsersComponent },
    { path: "intervention/:id", component: InterventionDetailsComponent },
    { path: "create-intervention", component: CreateInterventionComponent },
    { path: "create-service", component: CreateServiceComponent },
    { path: "create-service/:id", component: CreateServiceComponent },
    { path: "create-user", component: CreateUserComponent },
    { path: "create-user/:id", component: CreateUserComponent },
    { path: "notifications", component: NotificationsComponent },
    { path: "dashboard-sales", component: SalesComponent },
    { path: "creer", component: CreationComponent },
    { path: "dashboard-eCommerce", component: EcommerceComponent },
    { path: "dashboard-analytics", component: AnalyticsComponent },
    { path: "dashboard-crm", component: CrmComponent },
    { path: "dashboard-project", component: ProjectComponent },
    { path: "inbox", component: InboxComponent },
    { path: "chat", component: ChatComponent },
    { path: "todos", component: TodosComponent },
    { path: "notes", component: NotesComponent },
    { path: "search", component: SearchComponent },
    {
        path: "ui-components",
        component: UiComponentsComponent,
        children: [
            {
                path: "alerts",
                data: { breadcrumb: "Alerts" },
                component: UiAlertsComponent,
            },
            {
                path: "badges",
                data: { breadcrumb: "Badges" },
                component: BadgesComponent,
            },
            {
                path: "buttons",
                data: { breadcrumb: "Buttons" },
                component: ButtonsComponent,
            },
            {
                path: "cards",
                data: { breadcrumb: "Cards" },
                component: CardsComponent,
            },
            {
                path: "dropdowns",
                data: { breadcrumb: "Dropdowns" },
                component: DropdownsComponent,
            },
            {
                path: "forms",
                data: { breadcrumb: "Forms" },
                component: FormsComponent,
            },
            {
                path: "list-groups",
                data: { breadcrumb: "List Groups" },
                component: ListGroupsComponent,
            },
            {
                path: "modals",
                data: { breadcrumb: "Modals" },
                component: ModalsComponent,
            },
            {
                path: "progress-bars",
                data: { breadcrumb: "Progress Bars" },
                component: ProgressBarsComponent,
            },
            {
                path: "tables",
                data: { breadcrumb: "Tables" },
                component: TablesComponent,
            },
            {
                path: "tabs",
                data: { breadcrumb: "Tabs" },
                component: TabsComponent,
            },
        ],
    },
    {
        path: "auth",

        children: [
            {
                path: "signup",

                component: SignupComponent,
            },
            {
                path: "signin",

                component: LoginComponent,
            },
            {
                path: "forgot-password",

                component: ForgotPasswordComponent,
            },
            {
                path: "forgot-password/verify",

                component: ForgotPasswordVerifyComponent,
            },
            {
                path: "forgot-password/reset",

                component: ForgotPasswordResetComponent,
            },
        ],
    },
    {
        path: "charts",
        component: ChartsComponent,
        children: [
            {
                path: "line-charts",
                data: { breadcrumb: "Line Charts" },
                component: LineChartsComponent,
            },
            {
                path: "area-charts",
                data: { breadcrumb: "Area Charts" },
                component: AreaChartsComponent,
            },
            {
                path: "column-charts",
                data: { breadcrumb: "Column Charts" },
                component: ColumnChartsComponent,
            },
            {
                path: "bar-charts",
                data: { breadcrumb: "Bar Charts" },
                component: BarChartsComponent,
            },
            {
                path: "mixed-charts",
                data: { breadcrumb: "Mixed Charts" },
                component: MixedChartsComponent,
            },
            {
                path: "pie-donuts-charts",
                data: { breadcrumb: "Pie Donuts Charts" },
                component: PieDonutsChartsComponent,
            },
        ],
    },
    {
        path: "icons",
        component: IconsComponent,
        children: [
            {
                path: "feather-icons",
                data: { breadcrumb: "Feather Icons" },
                component: FeatherIconsComponent,
            },
            {
                path: "line-icons",
                data: { breadcrumb: "Line Icons" },
                component: LineIconsComponent,
            },
            {
                path: "icofont-icons",
                data: { breadcrumb: "Icofont Icons" },
                component: IcofontIconsComponent,
            },
        ],
    },
    {
        path: "others",
        component: OthersComponent,
        children: [
            {
                path: "users-card",
                data: { breadcrumb: "Users Card" },
                component: UsersCardComponent,
            },
            {
                path: "notifications",
                data: { breadcrumb: "Notifications" },
                component: NotificationsComponent,
            },
            {
                path: "timeline",
                data: { breadcrumb: "Timeline" },
                component: TimelineComponent,
            },
            {
                path: "invoice-template",
                data: { breadcrumb: "Invoice Template" },
                component: InvoiceTemplateComponent,
            },
            {
                path: "gallery",
                data: { breadcrumb: "Gallery" },
                component: GalleryComponent,
            },
            {
                path: "faq",
                data: { breadcrumb: "Faq" },
                component: FaqComponent,
            },
            {
                path: "pricing",
                data: { breadcrumb: "Pricing" },
                component: PricingComponent,
            },
            {
                path: "profile",
                data: { breadcrumb: "Profile" },
                component: ProfileComponent,
            },
            {
                path: "profile-settings",
                data: { breadcrumb: "Profile Settings" },
                component: ProfileSettingsComponent,
            },
            {
                path: "error-404",
                data: { breadcrumb: "Error" },
                component: ErrorComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
