
from autogen_agentchat.agents import AssistantAgent
from autogen_core.models import (
    ChatCompletionClient,
)

# TODO add checks to ususer inputs to make sure it is a valid definition of custom agent
class MagenticOneCustomAgent(AssistantAgent):
    """An agent, used by MagenticOne that provides coding assistance using an LLM model client.

    The prompts and description are sealed, to replicate the original MagenticOne configuration. See AssistantAgent if you wish to modify these values.
    """

    def __init__(
        self,
        name: str,
        model_client: ChatCompletionClient,
        system_message: str,
        description: str,
    ):
        super().__init__(
            name,
            model_client,
            description=description,
            system_message=system_message,
        )
