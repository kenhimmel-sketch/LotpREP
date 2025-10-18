
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareCodeDialogProps {
  trigger?: React.ReactNode;
}

const codeFiles = [
  {
    name: "Badge Generator",
    path: "client/src/lib/badgeGenerator.ts",
    language: "typescript",
  },
  {
    name: "Auth Hook",
    path: "client/src/hooks/useAuth.ts",
    language: "typescript",
  },
  {
    name: "Park Members Hook",
    path: "client/src/hooks/useParkMembers.ts",
    language: "typescript",
  },
  {
    name: "Bubble Wall Component",
    path: "client/src/components/BubbleWall.tsx",
    language: "typescript",
  },
  {
    name: "Database Schema",
    path: "shared/schema.ts",
    language: "typescript",
  },
  {
    name: "Server Routes",
    path: "server/routes.ts",
    language: "typescript",
  },
];

export default function ShareCodeDialog({ trigger }: ShareCodeDialogProps) {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!selectedFile) return;

    try {
      const response = await fetch(`/api/share-code/${encodeURIComponent(selectedFile)}`);
      const data = await response.json();
      
      if (data.code) {
        await navigator.clipboard.writeText(data.code);
        setCopied(true);
        toast({
          title: "Code copied!",
          description: "Code has been copied to your clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  const shareLink = selectedFile 
    ? `${window.location.origin}/share-code?file=${encodeURIComponent(selectedFile)}`
    : "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Code className="w-4 h-4 mr-2" />
            Share Code
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-montserrat">Share Code</DialogTitle>
          <DialogDescription>
            Select a file to view and share code snippets from the project.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select File</label>
            <Select value={selectedFile} onValueChange={setSelectedFile}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a file to share" />
              </SelectTrigger>
              <SelectContent>
                {codeFiles.map((file) => (
                  <SelectItem key={file.path} value={file.path}>
                    {file.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedFile && (
            <>
              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  className="flex-1"
                  variant="default"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-muted p-2 rounded text-xs break-all">
                <span className="text-muted-foreground">Share URL: </span>
                <span className="font-mono">{shareLink}</span>
              </div>

              <p className="text-xs text-muted-foreground">
                View this code file at: <code className="bg-muted px-1 rounded">{selectedFile}</code>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
