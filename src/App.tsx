import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './public-site/PublicLayout';
import { HomePage } from './public-site/pages/HomePage';
import { EnquiryPage } from './public-site/pages/EnquiryPage';
import { GalleryPage } from './public-site/pages/GalleryPage';
import { ManagementLayout } from './management/ManagementLayout';
import { DashboardPage } from './management/pages/DashboardPage';
import { CalendarPage } from './management/pages/CalendarPage';
import { EnquiriesPage } from './management/pages/EnquiriesPage';
import { BookingsPage } from './management/pages/BookingsPage';
import { BookingDetailPage } from './management/pages/BookingDetailPage';
import { BookingCreatePage } from './management/pages/BookingCreatePage';
import { CustomersPage } from './management/pages/CustomersPage';
import { PaymentsPage } from './management/pages/PaymentsPage';
import { EventsPage } from './management/pages/EventsPage';
import { PackagesPage } from './management/pages/PackagesPage';
import { ReportsPage } from './management/pages/ReportsPage';
import { SettingsPage } from './management/pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="enquiry" element={<EnquiryPage />} />
          <Route path="gallery" element={<GalleryPage />} />
        </Route>

        {/* Management Website */}
        <Route path="/manage" element={<ManagementLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="enquiries" element={<EnquiriesPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="bookings/new" element={<BookingCreatePage />} />
          <Route path="bookings/:id" element={<BookingDetailPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
