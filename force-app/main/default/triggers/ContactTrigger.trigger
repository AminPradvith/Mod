trigger ContactTrigger on Contact (after insert, after update) {
    if (Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)) {
        if (Trigger.isInsert) {
            ContactTriggerHandler.handleAfterInsert(Trigger.new);
        } else if (Trigger.isUpdate) {
            ContactTriggerHandler.handleAfterUpdate(Trigger.oldMap, Trigger.new);
        }
    }
}