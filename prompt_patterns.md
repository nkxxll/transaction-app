# Prompt Patterns

## Output Automator

1. Whenever you produce an output that has at least one step to take and the following properties
   (alternatively, always do this)
2. Produce an executable artifact of type X that will automate these steps
3. condition for output and automation that should take place before the automation

## Flipped Interaction

1. I would like you to ask me questions to achieve X
2. You should ask questions until this condition is met or to achieve this goal (alternatively,
   forever)
3. (Optional) ask me the questions one at a time, two at a time, etc.

## Question Refinement

1. Within scope X, suggest a better version of the question to use instead
2. (Optional) prompt me if I would like to use the better version instead

## Alternative Approaches

1. Within scope X, if there are alternative ways to accomplish the same thing, list the best
   alternate approaches
2. (Optional) compare/contrast the pros and cons of each approach
3. (Optional) include the original way that I asked
4. (Optional) prompt me for which approach I would like to use

## Cognitive Verifier

1. When you are asked a question, follow these rules
2. Generate a number of additional questions that would help more accurately answer the question
3. Combine the answers to the individual questions to produce the final answer to the overall
   question
