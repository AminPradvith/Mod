trigger QuoteTrigger on SBQQ__Quote__c (before insert, after update) {
  
      if(Trigger.isBefore && Trigger.isInsert){
       QuoteTriggerHandler.updateBilledField(Trigger.new);
}

      if(Trigger.isAfter && Trigger.isUpdate){
            QuoteTriggerHandler.updateProductLotQuantity(Trigger.new, Trigger.OldMap);
        }
    }