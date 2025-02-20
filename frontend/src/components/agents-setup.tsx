// import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash, Plus, Edit, Download } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Agent {
  input_key: string;
  name: string;
  icon: string;
  type: string;
}

interface AgentsSetupProps {
  agents: Agent[];
  removeAgent: (key: string) => void;
  addAgent: (name: string, description: string, systemMessage: string) => void;
  addRAGAgent: (name: string, description: string, indexName: string) => void;
  getAvatarSrc: (user: string) => string;
  isCollapsed: boolean | true;
}

export function AgentsSetup({ agents, removeAgent, addAgent, addRAGAgent, getAvatarSrc, isCollapsed }: AgentsSetupProps) {
  // const [isCollapsed, setCollapsed] = useState(isCollapsed);

  return (
    // console.log('isCollapsed', isCollapsed),
    // console.log('collapsed', isCollapsed),
    <div className="space-y-4">
      {/* Toggle button */}
      {/* <div className="flex justify-end">
        <Button variant="outline" onClick={() => setCollapsed(!isCollapsed)}>
          {!isCollapsed ? 'Expand' : 'Collapse'}
        </Button>
      </div> */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        {agents.map((agent) => (
          // <div key={agent.input_key} className="rounded-xl bg-muted/50 shadow p-4 duration-300 animate-in fade-in-0 zoom-in-75 origin-bottom-right">
            <div key={agent.input_key} className={`rounded-xl bg-muted/50 shadow ${isCollapsed ? 'p-0 duration-300 animate-in fade-in-0 zoom-in-75 origin-bottom-right' : 'p-4'}`} >
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={getAvatarSrc(agent.name)} />
                <AvatarFallback>{agent.icon}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{agent.name}</p>
                {!isCollapsed && <p className="text-sm text-muted-foreground">{agent.type}</p>}
              </div>
            </div>
            {!isCollapsed && (
              <>
                <Separator className="my-2" />
                <div className="flex space-x-2">
                  <Button size="icon" variant="outline" onClick={() => removeAgent(agent.input_key)}>
                    <Trash />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Edit />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Download />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}

        {!isCollapsed && (
        <div className="rounded-xl bg-muted/50 shadow p-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
                Add agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] sm:max-h-[80%]">
              <DialogHeader>
                <DialogTitle>Add agent</DialogTitle>
                <DialogDescription>
                  Note: Always use unique name with no spaces. Always fill System message and Description.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="MyAgent1" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className="col-span-3"
                    placeholder="Describe the agent capabilities so the orchestrator can use it."
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="system_message" className="text-right">
                    System Message
                  </Label>
                  <Textarea
                    id="system_message"
                    className="col-span-3"
                    placeholder='In the system message use as last sentence: Reply "TERMINATE" in the end when everything is done.'
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    onClick={() => {
                      const name = (document.getElementById('name') as HTMLInputElement).value;
                      const description = (document.getElementById('description') as HTMLTextAreaElement).value;
                      const systemMessage = (document.getElementById('system_message') as HTMLTextAreaElement).value;
                      addAgent(name, description, systemMessage);
                    }}
                    variant="default"
                  >
                    Save & Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Separator className="my-4" />
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
                Add RAG agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] sm:max-h-[80%]">
              <DialogHeader>
                <DialogTitle>Add RAG agent</DialogTitle>
                <DialogDescription>
                  Note: Always use unique name with no spaces. Always fill System message and Description.
                  Index Name must be your existing index in AI Search service which is filled with data. We expect a structure of index:
                  "parent_id", "chunk_id", "chunk","text_vector"
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="MyRAGAgent1" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className="col-span-3"
                    defaultValue="An agent that has access to a knowledge base of International Energy Agency (IEA) Analysis and forecast to 2030 and OPEC Monthly Oil Market Report as of January 2025 and can handle RAG tasks, call this agent if you are getting questions on your knowledge base"
                    placeholder="An agent that has access to internal index and can handle RAG tasks, call this agent if you are getting questions on your internal index."
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="index_name" className="text-right">
                    Index
                  </Label>
                  <Input id="index_name" className="col-span-3" defaultValue="vector-autogen-rag" placeholder="your index name" />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    onClick={() => {
                      const name = (document.getElementById('name') as HTMLInputElement).value;
                      const description = (document.getElementById('description') as HTMLTextAreaElement).value;
                      const indexName = (document.getElementById('index_name') as HTMLTextAreaElement).value;
                      addRAGAgent(name, description, indexName);
                    }}
                    variant="default"
                  >
                    Save & Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        )}
      </div>
    </div>
  );
}