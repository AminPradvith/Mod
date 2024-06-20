trigger QuoteLineLimitValidation on SBQQ__QuoteLine__c (before insert,before update) {
    set<string>QuoteId  = new set<string>();
    for(SBQQ__QuoteLine__c quoteLine :trigger.new){
    if(quoteLine.SBQQ__Quote__r.Discount_Type__c == 'Buy 1 SkinPen for $149 (limit 3)' && QuoteLine.SBQQ__ProductName__c == 'SkinPen Treatment Kit'
   &&   quoteLine.SBQQ__Quantity__c >3){
          quoteLine.addError('You cannot add more than 3 of this product ' + 'EEER' + '.');
      }
      
    }
  
}