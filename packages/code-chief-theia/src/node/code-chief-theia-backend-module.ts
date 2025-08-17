import { ContainerModule, injectable, inject } from '@theia/core/shared/inversify';
import { Agent, AgentService } from '@theia/ai-core/lib/common';
import { CodeChiefAgent } from './code-chief-agent';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common';
import { ChatService } from '@theia/ai-chat/lib/common';

export const CodeChiefCommand: Command = {
    id: 'code-chief.ask',
    label: 'Ask Code Chief'
};

@injectable()
class CodeChiefCommandContribution implements CommandContribution {
    @inject(ChatService)
    private readonly chatService: ChatService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(CodeChiefCommand, {
            execute: async (prompt: string) => {
                if (prompt) {
                    const session = this.chatService.createSession();
                    const request = await this.chatService.sendRequest(session.id, { text: prompt });
                    if (request) {
                        const response = await request.responseCompleted;
                        return response.response.asString();
                    }
                }
            }
        });
    }
}

export default new ContainerModule(bind => {
    bind(Agent).to(CodeChiefAgent).inSingletonScope();
    bind(AgentService).toSelf().inSingletonScope();
    bind(CommandContribution).to(CodeChiefCommandContribution).inSingletonScope();

    bind(CodeChiefAgent).toSelf().inSingletonScope();
    bind(Agent).toService(CodeChiefAgent);
});
