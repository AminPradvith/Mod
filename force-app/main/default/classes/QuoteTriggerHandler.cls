public class QuoteTriggerHandler {
    public static String billedValue;

     public static void updateBilledField(List<SBQQ__Quote__c> newQuotes) {
        // Set of Opportunity Ids related to the new Quotes
        Set<Id> opportunityIds = new Set<Id>();
        for (SBQQ__Quote__c quote : newQuotes) {
            if (quote.SBQQ__Opportunity2__c != null) {
                opportunityIds.add(quote.SBQQ__Opportunity2__c);
                System.debug('opportunityIds' + opportunityIds);
            }
        }

        if (opportunityIds.isEmpty()) {
            return; // No Opportunities related to these Quotes
        }

        // Fetch related Opportunities and their Contacts
        Map<Id, Opportunity> opportunityMap = new Map<Id, Opportunity>([SELECT Id, ContactId FROM Opportunity WHERE Id IN :opportunityIds]);
        System.debug('opportunityMap keys: ' + opportunityMap.keySet());
        System.debug('opportunityMap values: ' + opportunityMap.values());
        
        // Set of Contact Ids to fetch related Opportunities and Quotes
        Set<Id> contactIds = new Set<Id>();
        for (Opportunity opp : opportunityMap.values()) {
            if (opp.ContactId != null) {
                contactIds.add(opp.ContactId);
                System.debug('contactIds' + contactIds);
            }
        }

        if (contactIds.isEmpty()) {
            return; // No Contacts related to these Opportunities
        }

        // Fetch all Opportunities related to the collected Contact Ids
        List<Opportunity> relatedOpportunities = [SELECT Id FROM Opportunity WHERE ContactId IN :contactIds];
        System.debug('relatedOpportunities' + relatedOpportunities);
        Map<Id, Opportunity> opportunityMap1 = new Map<Id, Opportunity>(relatedOpportunities);
        // Set of Opportunity Ids to fetch Quotes
        Set<Id> relatedOpportunityIds = new Set<Id>();
        for (Opportunity opp : relatedOpportunities) {
            relatedOpportunityIds.add(opp.Id);
            System.debug('relatedOpportunityIds' + relatedOpportunityIds);
            
        }

        // Fetch primary Quotes related to these Opportunities
        List<SBQQ__Quote__c> relatedQuotes = [SELECT Id, SBQQ__Opportunity2__c 
                                              FROM SBQQ__Quote__c 
                                              WHERE SBQQ__Opportunity2__c IN :relatedOpportunityIds AND SBQQ__Primary__c = TRUE];
        System.debug('relatedQuotes' + relatedQuotes);
        
        // Set of Quote Ids to fetch Quote Lines
        Set<Id> quoteIds = new Set<Id>();
        for (SBQQ__Quote__c quote : relatedQuotes) {
            quoteIds.add(quote.Id);
            System.debug('quoteIds' + quoteIds);
        }

        // Fetch Quote Lines related to these Quotes
        List<SBQQ__QuoteLine__c> quoteLines = [SELECT Id, SBQQ__Quote__c, SBQQ__ProductName__c 
                                               FROM SBQQ__QuoteLine__c 
                                               WHERE SBQQ__Quote__c IN :quoteIds];
        System.debug('quoteLines' + quoteLines);    //PRIMARY QUOTELINE

        // Map to track which Quotes need to be updated and with which value
        Map<Id, String> quoteUpdateMap = new Map<Id, String>();

        // Process each related Quote
        for (SBQQ__Quote__c quote : relatedQuotes) {
            System.debug('Processing quote: ' + quote.Id + ', Opportunity2__c: ' + quote.SBQQ__Opportunity2__c +'opportunityMap.get(quote.SBQQ__Opportunity2__c)  '+opportunityMap.get(quote.SBQQ__Opportunity2__c));
            Opportunity opp = opportunityMap1.get(quote.SBQQ__Opportunity2__c);
            System.debug('quote.SBQQ__Opportunity2__c ' + quote.SBQQ__Opportunity2__c);
            System.debug('opportunityMap1 ' + opportunityMap1);

            System.debug('opp ' + opp);

            if (opp != null) {
                System.debug('opp' +opp);
               // System.debug('opp.ContactId' +opp.ContactId);                
                Boolean hasBotox = false;
                Boolean hasDysport = false;

                for (SBQQ__QuoteLine__c quoteLine : quoteLines) {
                    if (quoteLine.SBQQ__Quote__c == quote.Id) {
                        System.debug('Processing quote line: ' + quoteLine.Id + ', ProductName: ' + quoteLine.SBQQ__ProductName__c);
                        if (quoteLine.SBQQ__ProductName__c == 'Botox') {
                            hasBotox = true;
                        } else if (quoteLine.SBQQ__ProductName__c == 'Dysport') {
                            hasDysport = true;
                        }
                    }
                }

                if (hasBotox && hasDysport) {
                    billedValue = 'Billed with Dysport/Botox';
                } else if (hasBotox) {
                    billedValue = 'Billed with Botox';
                } else if (hasDysport) {
                    billedValue = 'Billed with Dysport';
                }else{
                    billedValue = 'First Time User';
                }
                
                quoteUpdateMap.put(quote.Id, billedValue);
                System.debug('quoteUpdateMap' + quoteUpdateMap);
            }
        }

        for (SBQQ__Quote__c newQuote : newQuotes) {
            Boolean hasBotox = false;
            Boolean hasDysport = false;
            Boolean isRelatedQuote = false;

            // Check for related quotes and quote lines
            for (SBQQ__Quote__c relatedQuote : relatedQuotes) {
                if (relatedQuote.Id != null) {
                    System.debug('relatedQuote.Id' +relatedQuote.Id);
                    isRelatedQuote = true;
                    System.debug('isRelatedQuote' +isRelatedQuote);
                    
                    for (SBQQ__QuoteLine__c quoteLine : quoteLines) {
                     
                            if (quoteLine.SBQQ__ProductName__c == 'Botox') {
                                hasBotox = true;
                            } else if (quoteLine.SBQQ__ProductName__c == 'Dysport') {
                                hasDysport = true;
                            }
                       
                    }
                }
            }

              if ((!isRelatedQuote) || (!hasBotox && !hasDysport)) {
                System.debug('!isRelatedQuote:  ' + !isRelatedQuote);
                System.debug('hasBotox:  ' + !hasBotox);
                System.debug('hasDysport:  ' + !hasDysport);
                newQuote.Billed__c = 'First Time User';
            } else {
                newQuote.Billed__c = billedValue;
            }

            System.debug('newQuote.ID: ' + newQuote.Id);
            System.debug('newQuote.Billed__c: ' + newQuote.Billed__c);
        }
    
} 

 public static void updateProductLotQuantity(List<SBQQ__Quote__c> newQuotes, Map<Id, SBQQ__Quote__c> oldQuoteMap) {
        Map<Id, Decimal> productLotUpdates = new Map<Id, Decimal>();
        Set<Id> quoteIds = new Set<Id>();

        for(SBQQ__Quote__c newQuote : newQuotes) {
            SBQQ__Quote__c oldQuote = oldQuoteMap.get(newQuote.Id);
            if(newQuote.SBQQ__Primary__c && (oldQuote == null || !oldQuote.SBQQ__Primary__c)) {
                quoteIds.add(newQuote.Id);
            }
        }

        List<SBQQ__QuoteLine__c> qlilist = [SELECT Id, SBQQ__Quantity__c, SBQQ__Quote__c, SBQQ__Product__c 
                                            FROM SBQQ__QuoteLine__c 
                                            WHERE SBQQ__Quote__c IN :quoteIds];

        for (SBQQ__QuoteLine__c qli : qlilist) {
            if (!productLotUpdates.containsKey(qli.SBQQ__Product__c)) {
                productLotUpdates.put(qli.SBQQ__Product__c, 0);
            }
            productLotUpdates.put(qli.SBQQ__Product__c, productLotUpdates.get(qli.SBQQ__Product__c) + qli.SBQQ__Quantity__c);
        }

        List<Product_Lot__c> productLotsToUpdate = new List<Product_Lot__c>();
        Map<Id, Decimal> productLotAvailableQuantities = new Map<Id, Decimal>();
        Boolean hasInsufficientQuantity = false;
        String errorMessage = '';
        String allProducts = '';
	
        for (Id productId : productLotUpdates.keySet()) {
            List<Product_Lot__c> productLots = [SELECT Id, Quantity_Available__c, Product__r.Name 
                                                FROM Product_Lot__c 
                                                WHERE Product__c = :productId];

            
            for (Product_Lot__c productLot : productLots) {
                Decimal newAvailableQuantity = productLot.Quantity_Available__c - productLotUpdates.get(productId);
                system.debug('newAvailableQuantity  '+newAvailableQuantity);
                system.debug('productLot.Quantity_Available__c  '+productLot.Quantity_Available__c);
                system.debug('productLotUpdates.get(productId)  '+newAvailableQuantity);
                if (newAvailableQuantity < 0) {
                    hasInsufficientQuantity = true;
                    if (allProducts != ''){
                        allProducts += ', ';
                    }
                    allProducts += productLot.Product__r.Name;
                    //errorMessage = 'Insufficient quantity available in Inventory: ' + productLot.Product__r.Name;
                } else {
                    productLotAvailableQuantities.put(productLot.Id, newAvailableQuantity);
                }
            }
        }
        

        if (hasInsufficientQuantity) {
            for (SBQQ__Quote__c newQuote : newQuotes) {
                newQuote.addError('Insufficient quantity available in Inventory: '+ allProducts);
            }
        } else {
            for (Id productLotId : productLotAvailableQuantities.keySet()) {
                Product_Lot__c productLotToUpdate = new Product_Lot__c(Id = productLotId, 
                                                                       Quantity_Available__c = productLotAvailableQuantities.get(productLotId));
                productLotsToUpdate.add(productLotToUpdate);
            }
            if (!productLotsToUpdate.isEmpty()) {
                try {
                    update productLotsToUpdate;
                } catch (DmlException e) {
                    System.debug('Error updating product lots: ' + e.getMessage());
                }
            }
        }
    }
}