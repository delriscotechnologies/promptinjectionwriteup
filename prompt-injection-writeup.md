# Direct and Indirect Prompt Injection

**Direct prompt injection** happens when a user’s message steers a model away from the task or rules set by the application. In **indirect prompt injection**, the instruction comes from material the application asks the model to read, such as a ticket, a webpage, or an email. The person requesting the summary and the person who wrote the material may have entirely different permissions.

Consider what a support application sends to a model. A system message defines the assistant’s job. The user supplies a question. The application may then retrieve a customer record and include it for context. These messages can have distinct roles, but the model still uses their contents to compose one answer. A sentence can look like an instruction even when it belongs to the record being reviewed. Whether that sentence carries any authority is a decision for the application.

A print shop makes the direct case easier to see. A customer can ask its assistant for two posters and choose delivery instead of pickup. Both are choices the shop lets the customer make. The customer can also mention a promotion. That claim might be true, and the assistant could check it. The mistake would be to treat the claim itself as permission to change a price the shop controls.

Suppose a poster costs €5 and delivery costs €3. The assistant quotes €13 for two posters. If the assistant accepts an unverified sale price of €1 per poster, its next quote drops to €5. The quantities and shipping method have stayed the same. The difference comes entirely from the source the assistant used for one unit price.

*Two quotes for the same print order*

| Order item | Catalog price | Revised quote |
| :--- | ---: | ---: |
| Two posters | €10 | €2 |
| Delivery | €3 | €3 |
| **Quoted total** | **€13** | **€5** |

The customer has seen a lower quote. That is enough to explain a pricing complaint, but it doesn’t establish an €8 undercharge. Checkout should calculate its own total from the catalog and discount rules. I’d check the order record for the amount the shop accepted and the payment record for the amount actually charged. Someone who saw €5 and paid €13 still has a reason to contact support.

A response that passes a format check can still contain the wrong price. Both €13 and €5 fit in a numeric field. Conversely, an “Invalid Model Response” error can mean a required field was missing. It establishes that one response was rejected, but it doesn’t tell us which business rules the application enforced. To investigate a pricing issue, I’d check what the server accepted and which price list it used.

Direct injection can also affect what the assistant reveals. Imagine a test chatbot whose system prompt contains an internal routing rule and a made-up reference code. Repeating the rule exposes part of the application’s instructions: **system prompt leakage**. Returning the code to someone who should not see it is **sensitive data disclosure**. A single reply can do both, but learning how the chatbot routes a ticket is different from obtaining the protected value.

In a controlled test, a refusal establishes what happened on that request. A later reply that looks like an encoded version of the reference code has to decode to the known test value before I’d count it as a disclosure. A plausible-looking string is not enough. In a real application, credentials belong in the service that uses them, and the signed-in user’s access to a record should be checked before the record is sent to the model.

Now consider an **indirect injection** during a shift handoff. An analyst asks an assistant to summarize an endpoint ticket. The application retrieves an automated event, the endpoint connector’s status, and comments from several people. A contractor who can comment on the ticket cannot necessarily isolate a laptop or close the case. Their words still reach the model alongside the records that describe those actions.

Suppose the event records an isolation request and the connector is still waiting for the laptop to acknowledge it. A ticket comment tries to steer the handoff into reporting containment as complete. If the assistant follows it, the next analyst may read “endpoint isolated” and move on. The analyst’s request never changed. The new instruction came from the ticket, and the resulting summary upgraded a request into a reported outcome without an acknowledgment from the device.

An incorrect statement alone is not necessarily prompt injection. Someone might honestly believe the laptop is isolated and write that in a comment. Repeating their mistake is a source-verification failure. Treating the comment as an instruction about what conclusion to write is the injection. The distinction also matters in a moderation queue: a generated report can accuse the wrong person. The original post identifies its author, and a moderation audit entry shows whether a ban was applied.

Webpages and email give outside authors the same opportunity. A supplier controls the wording on its maintenance page; the analyst asking for a summary decides what they want to know. If the page tries to influence which outages the assistant reports, the analyst can end up with an incomplete summary. An email sender likewise controls the message body and may never see the summary delivered to the recipient. Read-only access limits what the assistant can change, but a person can still act on a misleading answer.

Keeping the ticket fields separate or labeling a passage as an email body helps trace its source. Those labels grant no permissions. I’d give a summarizer read access and put state changes behind a service that checks the authenticated operator, the requested action, and its target. For an action such as isolating a laptop, the approval screen should name the actual device so a reviewer can compare it with the evidence.

If an assistant summarizes alerts for me, I can compare its claims with event IDs, timestamps, and hostnames. If it can close a case or isolate an endpoint, I also want the authorization decision and the receiving system’s result. A closed ticket confirms a change in the case system. For the laptop, I’d check that the endpoint reported isolation as applied. Acknowledging receipt of a request is a different event.
