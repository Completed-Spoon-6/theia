import { Agent, PromptVariantSet } from '@theia/ai-core/lib/common';
import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class CodeChiefAgent implements Agent {
    readonly id = 'code-chief-agent';
    readonly name = 'Code Chief';
    readonly description = 'A general purpose agent that can answer questions.';
    readonly variables = [];
    readonly prompts: PromptVariantSet[] = [];
    readonly languageModelRequirements = [{
        purpose: 'A general purpose LLM for Code Chief.',
        selector: {}
    }];
    readonly agentSpecificVariables = [];
    readonly functions = [];
}
