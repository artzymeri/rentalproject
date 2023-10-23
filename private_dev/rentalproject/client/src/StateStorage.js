import { makeAutoObservable } from "mobx";

class StateStorage {
  filterDialog = false;

  //DashboardRoot tabs

  carsTabOpen = true;
  clientsTabOpen = false;
  reservationsTabOpen = false;
  invoicesTabOpen = false;
  settingsTabOpen = false;
  logoutTabOpen = false;

  //CarsRoot tabs

  carListOpen = true;
  rentedCarsOpen = false;
  availableCarsOpen = false;
  outOfServiceCarsOpen = false;

  carDialogOpen = false;

  //Clients tabs

  clientsListOpen = true;
  clientsHistoryOpen = false;

  clientDialogOpen = false;

  //Reservations tabs

  reservationsCalendarOpen = true;
  reservationsListOpen = false;
  reservationsArchiveOpen = false;

  //Invoices tabs

  makeInvoicesOpen = true;
  invoicesArchiveOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  //DashboardRoot

  updateOverviewTab(state) {
    this.overviewTabOpen = state;
  }
  updateCarsTab(state) {
    this.carsTabOpen = state;
  }
  updateMaintainanceTab(state) {
    this.maintainanceTabOpen = state;
  }
  updateClientsTab(state) {
    this.clientsTabOpen = state;
  }
  updateReservationsTab(state) {
    this.reservationsTabOpen = state;
  }
  updateInvoicesTab(state) {
    this.invoicesTabOpen = state;
  }
  updateSettingsTab(state) {
    this.settingsTabOpen = state;
  }
  updateLogoutTab(state) {
    this.logoutTabOpen = state;
  }

  //Cars Filter

  updateFilterDialog(state) {
    this.filterDialog = state;
  }

  //Cars

  updateCarsList(state) {
    this.carListOpen = state;
  }
  updateRentedCars(state) {
    this.rentedCarsOpen = state;
  }
  updateAvailableCars(state) {
    this.availableCarsOpen = state;
  }
  updateOutOfServiceCars(state) {
    this.outOfServiceCarsOpen = state;
  }

  updateCarDialog(state) {
    this.carDialogOpen = state;
  }

  //Clients

  updateClientsList(state) {
    this.clientsListOpen = state;
  }
  updateClientsHistory(state) {
    this.clientsHistoryOpen = state;
  }
  updateClientDialog(state) {
    this.clientDialogOpen = state;
  }

  //Reservations

  updateReservationsCalendar(state) {
    this.reservationsCalendarOpen = state;
  }
  updateReservationsList(state) {
    this.reservationsListOpen = state;
  }
  updateReservationsArchive(state) {
    this.reservationsArchiveOpen = state;
  }

  //Invoices

  updateMakeInvoices(state) {
    this.makeInvoicesOpen = state;
  }
  updateInvoicesArchive(state) {
    this.invoicesArchiveOpen = state;
  }
}

const stateStorage = new StateStorage();

export default stateStorage;
