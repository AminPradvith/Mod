trigger AccountTrigger on Account (after insert, after update) {
    if (Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)) {
        if (Trigger.isInsert) {
            AccountTriggerHandler.handleAfterInsert(Trigger.new);
        } else if (Trigger.isUpdate) {
            AccountTriggerHandler.handleAfterUpdate(Trigger.oldMap, Trigger.new);
        }
    }
}