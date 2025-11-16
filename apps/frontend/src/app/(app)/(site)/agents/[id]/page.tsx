import { Metadata } from 'next';
import { Agent } from '@boto/frontend/components/agents/agent';
import { AgentChat } from '@boto/frontend/components/agents/agent.chat';
export const metadata: Metadata = {
  title: 'Boto - Agent',
  description: '',
};
export default async function Page() {
  return (
    <AgentChat />
  );
}
