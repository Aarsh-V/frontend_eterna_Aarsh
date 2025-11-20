import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveTab, setSelectedToken } from "@/store/pulseSlice";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { Token, TokenCategory } from "@shared/schema";
import { TokenTable } from "@/components/TokenTable";
import { TokenTableSkeleton } from "@/components/TokenTableSkeleton";
import { TokenDetailsModal } from "@/components/TokenDetailsModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

export default function Pulse() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.pulse.activeTab);
  const selectedToken = useAppSelector((state) => state.pulse.selectedToken);

  useWebSocket();

  const { data: tokens, isLoading, error, refetch } = useQuery<Token[]>({
    queryKey: ['/api/tokens', activeTab],
  });

  const handleTabChange = (value: string) => {
    dispatch(setActiveTab(value as TokenCategory));
  };

  const handleCloseDetails = () => {
    dispatch(setSelectedToken(null));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-title">Pulse</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time token discovery and analytics
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted/50">
              <TabsTrigger
                value="new_pairs"
                className="data-[state=active]:bg-card data-[state=active]:text-foreground"
                data-testid="tab-new-pairs"
              >
                New Pairs
              </TabsTrigger>
              <TabsTrigger
                value="final_stretch"
                className="data-[state=active]:bg-card data-[state=active]:text-foreground"
                data-testid="tab-final-stretch"
              >
                Final Stretch
              </TabsTrigger>
              <TabsTrigger
                value="migrated"
                className="data-[state=active]:bg-card data-[state=active]:text-foreground"
                data-testid="tab-migrated"
              >
                Migrated
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-6">
        {error ? (
          <Alert variant="destructive" data-testid="alert-error">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Failed to load tokens. Please try again.</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="gap-2"
                data-testid="button-retry"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : isLoading ? (
          <TokenTableSkeleton />
        ) : tokens && tokens.length > 0 ? (
          <TokenTable tokens={tokens} />
        ) : (
          <div className="text-center py-12" data-testid="text-empty">
            <p className="text-muted-foreground">No tokens found for this category.</p>
          </div>
        )}
      </div>

      <TokenDetailsModal
        token={selectedToken}
        open={!!selectedToken}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
