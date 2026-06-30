import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsProvider } from "@/components/SettingsProvider";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <Outlet />
      </SettingsProvider>
    </QueryClientProvider>
  );
}