import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LotpLanding from "@/pages/LotpLanding";
import ParksPage from "@/pages/ParksPage";
import SignupPage from "@/pages/SignupPage";
import ChooseParkPage from "@/pages/ChooseParkPage";
import BadgePage from "@/pages/BadgePage";
import DiscordHome from "@/pages/DiscordHome";
import TeamPage from "@/pages/TeamPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LotpLanding} />
      <Route path="/parks" component={ParksPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/choose-park" component={ChooseParkPage} />
      <Route path="/badge" component={BadgePage} />
      <Route path="/home" component={DiscordHome} />
      <Route path="/teams/:slug" component={TeamPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
