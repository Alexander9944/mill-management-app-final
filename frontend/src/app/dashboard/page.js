import ProtectedLayout from './layout';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
    return (
        <ProtectedLayout>
            <Dashboard />
        </ProtectedLayout>
    );
}
